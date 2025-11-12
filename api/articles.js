// Vercel Serverless Function
const axios = require('axios');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const NEWS_API_KEY = process.env.NEWS_API_KEY || '4af079e1e0784f118148812814c2ce41';
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

// In-memory cache for serverless
const cache = new Map();
const CACHE_DURATION = 30 * 60 * 1000;

function analyzeBiasFromSources(sources) {
  const biasMap = {
    'reuters': 'center', 'ap news': 'center', 'bbc': 'center',
    'cnn': 'left', 'msnbc': 'left', 'huffpost': 'left', 'the guardian': 'left',
    'fox news': 'right', 'breitbart': 'right', 'the daily wire': 'right'
  };
  
  let leftCount = 0, centerCount = 0, rightCount = 0;
  
  sources.forEach(source => {
    const name = source.name.toLowerCase();
    const bias = biasMap[name] || 'center';
    if (bias === 'left') leftCount++;
    else if (bias === 'center') centerCount++;
    else if (bias === 'right') rightCount++;
  });
  
  const total = sources.length;
  return {
    biasLeft: (leftCount / total) * 100,
    biasCenter: (centerCount / total) * 100,
    biasRight: (rightCount / total) * 100,
    sourcesAnalyzed: sources
  };
}

async function synthesizeArticle(topic, articles) {
  try {
    const sourceSummaries = articles.map((article, idx) => 
      `Source ${idx + 1} (${article.source.name}):\nTitle: ${article.title}\nContent: ${article.description || article.content || 'No content'}\n`
    ).join('\n---\n\n');
    
    const prompt = `You are an unbiased news synthesizer. Analyze these ${articles.length} news articles about "${topic}" and create a comprehensive, balanced news report.

SOURCES:
${sourceSummaries}

Your task:
1. Identify the CONSENSUS FACTS that all or most sources agree on
2. Identify DISPUTED CLAIMS where sources disagree
3. Note which sources lean left, center, or right in their coverage
4. Create a synthesized article that:
   - Starts with consensus facts
   - Clearly attributes all claims to specific sources
   - Highlights where perspectives differ
   - Remains completely neutral

Format your response as JSON:
{
  "title": "Clear, neutral title",
  "summary": "2-3 sentence summary of consensus",
  "synthesizedContent": "Full article text with source attribution",
  "consensusFacts": ["fact 1", "fact 2"],
  "disputedClaims": [
    {
      "claim": "disputed point",
      "agreeSources": ["Source A"],
      "disputeSources": ["Source B"]
    }
  ],
  "biasAnalysis": "Brief analysis of how different sources framed this story"
}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    let jsonText = text;
    if (text.includes('```json')) {
      jsonText = text.split('```json')[1].split('```')[0].trim();
    } else if (text.includes('```')) {
      jsonText = text.split('```')[1].split('```')[0].trim();
    }
    
    return JSON.parse(jsonText);
  } catch (error) {
    console.error('Synthesis error:', error);
    return {
      title: articles[0]?.title || topic,
      summary: articles[0]?.description || 'Multiple sources reporting on this story',
      synthesizedContent: `Based on ${articles.length} sources, here are the key points: ${articles.slice(0, 3).map(a => a.description).filter(Boolean).join(' ')}`,
      consensusFacts: ['Multiple sources covering this story'],
      disputedClaims: [],
      biasAnalysis: 'Analysis unavailable'
    };
  }
}

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  try {
    const { category, topic, page = 1 } = req.query;
    const searchTopic = topic || category || 'technology';
    
    // Check cache
    const cacheKey = `${searchTopic}-${page}`;
    const cached = cache.get(cacheKey);
    if (cached && (Date.now() - cached.timestamp < CACHE_DURATION)) {
      return res.status(200).json(cached.data);
    }
    
    // Fetch articles from NewsAPI
    const response = await axios.get('https://newsapi.org/v2/top-headlines', {
      params: {
        country: 'us',
        apiKey: NEWS_API_KEY,
        pageSize: 50,
        page,
        language: 'en',
        sortBy: 'relevancy'
      }
    });
    
    const fetchedArticles = response.data.articles.filter(a => a.title && a.description);
    
    if (fetchedArticles.length === 0) {
      return res.status(200).json({ status: 'success', articles: [], totalResults: 0 });
    }
    
    // Group articles by similar topics
    const topicGroups = new Map();
    
    for (const article of fetchedArticles) {
      const words = article.title.toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .split(' ')
        .filter(w => w.length > 4);
      
      let added = false;
      for (const [groupKey, group] of topicGroups) {
        const groupWords = groupKey.split('_');
        const commonWords = words.filter(w => groupWords.includes(w));
        if (commonWords.length >= 2) {
          group.push(article);
          added = true;
          break;
        }
      }
      
      if (!added && words.length > 0) {
        const key = words.slice(0, 3).join('_');
        topicGroups.set(key, [article]);
      }
    }
    
    // Synthesize top story groups
    const synthesizedArticles = [];
    let processedGroups = 0;
    
    for (const [groupKey, articles] of topicGroups) {
      if (processedGroups >= 10) break;
      if (articles.length < 3) continue;
      
      processedGroups++;
      
      const synthesis = await synthesizeArticle(groupKey.replace(/_/g, ' '), articles);
      const biasData = analyzeBiasFromSources(articles.map(a => a.source));
      
      synthesizedArticles.push({
        id: `synthesized-${Date.now()}-${processedGroups}`,
        title: synthesis.title,
        description: synthesis.summary,
        synthesizedContent: synthesis.synthesizedContent,
        url: articles[0].url,
        urlToImage: articles[0].urlToImage,
        publishedAt: articles[0].publishedAt,
        sourceCount: articles.length,
        sources: articles.map(a => ({
          name: a.source.name,
          url: a.url,
          title: a.title
        })),
        ...biasData,
        consensusFacts: synthesis.consensusFacts,
        disputedClaims: synthesis.disputedClaims,
        biasAnalysisText: synthesis.biasAnalysis,
        topic: searchTopic,
        synthesized: true
      });
    }
    
    const result = {
      status: 'success',
      totalResults: synthesizedArticles.length,
      articles: synthesizedArticles
    };
    
    // Cache result
    cache.set(cacheKey, { data: result, timestamp: Date.now() });
    
    res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching/synthesizing news:', error.message);
    res.status(500).json({ 
      error: 'Failed to fetch news',
      message: error.message 
    });
  }
};
