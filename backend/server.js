const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const NEWS_API_KEY = process.env.NEWS_API_KEY || '4af079e1e0784f118148812814c2ce41';

// Middleware
app.use(cors());
app.use(express.json());

// Helper function to simulate bias analysis
function generateBiasAnalysis() {
  const biases = ['left', 'center', 'right'];
  const left = Math.random() * 100;
  const right = Math.random() * 100;
  const center = Math.max(0, 100 - (left + right) / 2);
  
  return {
    biasLeft: left,
    biasCenter: center,
    biasRight: right,
    dominantBias: left > right && left > center ? 'left' : right > left && right > center ? 'right' : 'center'
  };
}

// Helper function to generate Glass Box data
function generateGlassBoxData(articlesCount = 30) {
  return {
    sourcesScanned: articlesCount,
    consensusFacts: Math.floor(articlesCount * 0.6),
    disputedClaims: Math.floor(articlesCount * 0.3),
    unverifiedClaims: Math.floor(articlesCount * 0.1),
    biasDistribution: {
      left: Math.floor(Math.random() * 40) + 20,
      center: Math.floor(Math.random() * 30) + 20,
      right: Math.floor(Math.random() * 40) + 20
    }
  };
}

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'FactLens API is running!' });
});

// Get news articles
app.get('/api/articles', async (req, res) => {
  try {
    const { category, topic, page = 1 } = req.query;
    
    const params = {
      apiKey: NEWS_API_KEY,
      pageSize: 20,
      page
    };

    // If topic/category is specified, use it
    if (topic || category) {
      params.category = topic || category;
    }

    const response = await axios.get('https://newsapi.org/v2/top-headlines', {
      params: {
        ...params,
        country: 'us'
      }
    });

    // Enhance articles with FactLens data
    const articles = response.data.articles.map((article, index) => {
      const bias = generateBiasAnalysis();
      return {
        id: `article-${Date.now()}-${index}`,
        title: article.title,
        description: article.description,
        summary: article.description || article.content?.substring(0, 200),
        content: article.content,
        url: article.url,
        urlToImage: article.urlToImage,
        publishedAt: article.publishedAt,
        date: article.publishedAt,
        source: article.source,
        sourceName: article.source.name,
        topic: category || topic || 'general',
        ...bias,
        sourceCount: Math.floor(Math.random() * 20) + 10,
        glassBox: generateGlassBoxData(Math.floor(Math.random() * 20) + 10)
      };
    });

    res.json({
      status: 'success',
      totalResults: response.data.totalResults,
      articles
    });
  } catch (error) {
    console.error('Error fetching news:', error.message);
    res.status(500).json({ 
      error: 'Failed to fetch news',
      message: error.message 
    });
  }
});

// Search articles
app.get('/api/articles/search', async (req, res) => {
  try {
    const { q, bias, topic, sortBy = 'relevance', page = 1 } = req.query;
    
    if (!q) {
      return res.status(400).json({ error: 'Search query required' });
    }

    const response = await axios.get('https://newsapi.org/v2/everything', {
      params: {
        q,
        page,
        apiKey: NEWS_API_KEY,
        pageSize: 20,
        sortBy: sortBy === 'date' ? 'publishedAt' : sortBy === 'sources' ? 'relevancy' : 'relevancy'
      }
    });

    // Enhance and filter articles
    let articles = response.data.articles.map((article, index) => {
      const biasData = generateBiasAnalysis();
      return {
        id: `article-${Date.now()}-${index}`,
        title: article.title,
        description: article.description,
        summary: article.description || article.content?.substring(0, 200),
        url: article.url,
        urlToImage: article.urlToImage,
        publishedAt: article.publishedAt,
        date: article.publishedAt,
        source: article.source,
        topic: topic || 'general',
        ...biasData,
        sourceCount: Math.floor(Math.random() * 20) + 10
      };
    });

    // Filter by bias if specified
    if (bias && bias !== 'all') {
      articles = articles.filter(article => article.dominantBias === bias);
    }

    // Filter by topic if specified
    if (topic && topic !== 'all') {
      // For now, keep all since NewsAPI doesn't support topic filtering in everything endpoint
    }

    res.json(articles);
  } catch (error) {
    console.error('Error searching news:', error.message);
    res.status(500).json({ 
      error: 'Search failed',
      message: error.message 
    });
  }
});

// Get specific story with full Glass Box data
app.get('/api/stories/:id', async (req, res) => {
  try {
    // Generate comprehensive story data
    const glassBox = generateGlassBoxData(30);
    const bias = generateBiasAnalysis();
    
    const story = {
      id: req.params.id,
      title: 'Breaking: Major News Story Developing',
      summary: 'This is a comprehensive analysis of the news story from multiple perspectives.',
      content: 'Full article content here with detailed analysis...',
      date: new Date().toISOString(),
      topic: 'politics',
      ...bias,
      sourceCount: glassBox.sourcesScanned,
      glassBox,
      narrativeSpectrum: {
        terms: [
          { term: 'climate', left: 85, center: 60, right: 30 },
          { term: 'economy', left: 45, center: 70, right: 90 },
          { term: 'policy', left: 65, center: 75, right: 60 }
        ]
      },
      claims: [
        { 
          id: 1, 
          text: 'Major claim about the event', 
          status: 'consensus',
          agreeSources: 25,
          disputeSources: 2,
          sources: [
            { name: 'Reuters', stance: 'agree', excerpt: 'According to official reports...' },
            { name: 'AP News', stance: 'agree', excerpt: 'Multiple sources confirm...' },
            { name: 'BBC', stance: 'agree', excerpt: 'Evidence suggests that...' }
          ]
        },
        { 
          id: 2, 
          text: 'Secondary claim with some dispute', 
          status: 'disputed',
          agreeSources: 15,
          disputeSources: 12,
          sources: [
            { name: 'CNN', stance: 'agree', excerpt: 'Experts believe...' },
            { name: 'Fox News', stance: 'dispute', excerpt: 'However, some analysts disagree...' }
          ]
        }
      ],
      sources: [
        { name: 'Reuters', bias: 'center', url: 'https://reuters.com' },
        { name: 'AP News', bias: 'center', url: 'https://apnews.com' },
        { name: 'BBC', bias: 'center', url: 'https://bbc.com' },
        { name: 'CNN', bias: 'left', url: 'https://cnn.com' },
        { name: 'Fox News', bias: 'right', url: 'https://foxnews.com' }
      ]
    };
    
    res.json(story);
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
      }
    ]
  };
  res.json(constitution);
});

// User preferences
app.get('/api/user/preferences', (req, res) => {
  res.json({
    theme: 'dark',
    categories: ['technology', 'science', 'politics']
  });
});

app.post('/api/user/preferences', (req, res) => {
  res.json({
    success: true,
    preferences: req.body
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`\n🔍 FactLens API running on port ${PORT}`);
  console.log(`📰 NewsAPI Key configured`);
  console.log(`🌐 Ready to serve transparency reports\n`);
});
