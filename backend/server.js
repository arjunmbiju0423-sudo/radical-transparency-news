const express = require('express');
const cors = require('cors');
const axios = require('axios');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const NEWS_API_KEY = process.env.NEWS_API_KEY || '4af079e1e0784f118148812814c2ce41';
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

// Middleware
app.use(cors());
app.use(express.json());

// Cache for synthesized articles
const articleCache = new Map();
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

// Helper function to generate bias analysis from sources
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

// Synthesize article from multiple sources using Gemini
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
    
    // Parse JSON response (handle code blocks)
    let jsonText = text;
    if (text.includes('```json')) {
      jsonText = text.split('```json')[1].split('```')[0].trim();
    } else if (text.includes('```')) {
      jsonText = text.split('```')[1].split('```')[0].trim();
    }
    
    return JSON.parse(jsonText);
  } catch (error) {
    console.error('Synthesis error:', error);
    // Fallback: return a basic synthesis
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

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'FactLens Synthesis API is running!',
    synthesisEnabled: !!GEMINI_API_KEY
  });
});

// Get synthesized articles
app.get('/api/articles', async (req, res) => {
  try {
    const { category, topic, page = 1 } = req.query;
    const searchTopic = topic || category || 'technology';
    
    // Check cache
    const cacheKey = `${searchTopic}-${page}`;
    const cached = articleCache.get(cacheKey);
    if (cached && (Date.now() - cached.timestamp < CACHE_DURATION)) {
      return res.json(cached.data);
    }
    
    // Fetch articles from NewsAPI
    const response = await axios.get('https://newsapi.org/v2/everything', {
      params: {
        q: searchTopic,
        apiKey: NEWS_API_KEY,
        pageSize: 50, // Get more articles for better synthesis
        page,
        language: 'en',
        sortBy: 'relevancy'
      }
    });
    
    const fetchedArticles = response.data.articles.filter(a => a.title && a.description);
    
    if (fetchedArticles.length === 0) {
      return res.json({ status: 'success', articles: [], totalResults: 0 });
    }
    
    // Group articles by similar topics (simple clustering by title similarity)
    const topicGroups = new Map();
    
    for (const article of fetchedArticles) {
      // Extract key terms from title
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
      if (processedGroups >= 10) break; // Limit to 10 synthesized articles
      if (articles.length < 3) continue; // Need at least 3 sources
      
      processedGroups++;
      
      const synthesis = await synthesizeArticle(groupKey.replace(/_/g, ' '), articles);
      const biasData = analyzeBiasFromSources(articles.map(a => a.source));
      
      synthesizedArticles.push({
        id: `synthesized-${Date.now()}-${processedGroups}`,
        title: synthesis.title,
        description: synthesis.summary,
        synthesizedContent: synthesis.synthesizedContent,
        url: articles[0].url, // Link to first source
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
    articleCache.set(cacheKey, { data: result, timestamp: Date.now() });
    
    res.json(result);
  } catch (error) {
    console.error('Error fetching/synthesizing news:', error.message);
    res.status(500).json({ 
      error: 'Failed to fetch news',
      message: error.message 
    });
  }
});

// Search articles
app.get('/api/articles/search', async (req, res) => {
  try {
    const { q, page = 1 } = req.query;
    
    if (!q) {
      return res.status(400).json({ error: 'Search query required' });
    }
    
    // Similar to /api/articles but with search query
    req.query.topic = q;
    req.query.page = page;
    
    // Reuse the main articles endpoint logic
    return app._router.handle(req, res);
  } catch (error) {
    console.error('Error searching news:', error.message);
    res.status(500).json({ 
      error: 'Search failed',
      message: error.message 
    });
  }
});

// Get specific story
app.get('/api/stories/:id', async (req, res) => {
  try {
    // Find in cache
    for (const [key, cached] of articleCache) {
      const article = cached.data.articles?.find(a => a.id === req.params.id);
      if (article) {
        return res.json(article);
      }
    }
    
    res.status(404).json({ error: 'Story not found' });
  } catch (error) {
    console.error('Error fetching story:', error.message);
    res.status(500).json({ error: 'Failed to fetch story' });
  }
});

// Get AI constitution
app.get('/api/constitution', (req, res) => {
  const constitution = {
    principles: [
      {
        id: 1,
        title: 'Prioritize Consensus',
        description: 'The AI must always lead with facts that all sources agree on before introducing points of conflict.',
        example: 'If 28 sources agree an event happened, state that first. Then explain where sources disagree on details.'
      },
      {
        id: 2,
        title: 'Never Hide Sources',
        description: 'Every claim must be traceable to specific sources. The AI cannot synthesize information without attribution.',
        example: 'If a statement cannot be linked to at least one named source, it must not be included.'
      },
      {
        id: 3,
        title: 'Acknowledge Bias',
        description: 'The AI must identify and label the political lean of sources, making bias transparent to readers.',
        example: 'When presenting coverage, explicitly note: "Left-leaning sources emphasize X, while right-leaning sources focus on Y."'
      },
      {
        id: 4,
        title: 'Synthesize, Don\'t Summarize',
        description: 'Create a new, balanced article from multiple perspectives rather than just listing what each source says.',
        example: 'Instead of "CNN says X, Fox says Y," write "The event occurred [consensus], though coverage differs on [specific points with attribution]"'
      }
    ]
  };
  res.json(constitution);
});

// Start server
app.listen(PORT, () => {
  console.log(`\n🔍 FactLens Synthesis API running on port ${PORT}`);
  console.log(`📰 NewsAPI Key: ${NEWS_API_KEY ? 'Configured' : 'Missing'}`);
  console.log(`🤖 Gemini AI: ${GEMINI_API_KEY ? 'Enabled' : 'Disabled'}`);
  console.log(`🌐 Ready to synthesize transparent news\n`);
});
