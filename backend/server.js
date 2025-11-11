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

// Mock user data
const users = {
  'test@example.com': {
    email: 'test@example.com',
    password: 'password123',
    preferences: {
      theme: 'dark',
      categories: ['technology', 'science', 'business']
    }
  }
};

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'Radical Transparency News API is running!' });
});

// Get news stories with bias analysis
app.get('/api/stories', async (req, res) => {
  try {
    const { category = 'general', page = 1 } = req.query;
    const response = await axios.get('https://newsapi.org/v2/top-headlines', {
      params: {
        category,
        page,
        apiKey: NEWS_API_KEY,
        pageSize: 20
      }
    });

    // Add mock bias analysis
    const articles = response.data.articles.map(article => ({
      ...article,
      biasScore: Math.random() * 100,
      sources: ['AP', 'Reuters', 'BBC', 'CNN'],
      aiAnalysis: 'Article contains neutral reporting.'
    }));

    res.json({
      status: 'success',
      totalResults: response.data.totalResults,
      articles
    });
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

// Search news
app.get('/api/search', async (req, res) => {
  try {
    const { q, page = 1 } = req.query;
    const response = await axios.get('https://newsapi.org/v2/everything', {
      params: {
        q,
        page,
        apiKey: NEWS_API_KEY,
        pageSize: 20,
        sortBy: 'publishedAt'
      }
    });

    res.json({
      status: 'success',
      articles: response.data.articles
    });
  } catch (error) {
    console.error('Error searching news:', error);
    res.status(500).json({ error: 'Search failed' });
  }
});

// Get specific story
app.get('/api/stories/:id', (req, res) => {
  const story = {
    id: req.params.id,
    title: 'Breaking News Story',
    content: 'Full article content here...',
    sources: ['Reuters', 'AP'],
    claims: [
      { text: 'Major claim', status: 'verified' },
      { text: 'Secondary claim', status: 'pending' }
    ]
  };
  res.json(story);
});

// Get claims
app.get('/api/claims', (req, res) => {
  const claims = [
    { id: 1, text: 'Example claim 1', verified: true },
    { id: 2, text: 'Example claim 2', verified: false }
  ];
  res.json(claims);
});

// Get AI constitution
app.get('/api/constitution', (req, res) => {
  const constitution = {
    principles: [
      'Radical Transparency',
      'Multi-source verification',
      'Bias detection'
    ]
  };
  res.json(constitution);
});

// Authentication
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const user = users[email];

  if (user && user.password === password) {
    res.json({
      success: true,
      token: 'mock-jwt-token',
      user: { email: user.email }
    });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// User preferences
app.get('/api/user/preferences', (req, res) => {
  res.json({
    theme: 'dark',
    categories: ['technology', 'science', 'business']
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
  console.log(`Radical Transparency News API running on port ${PORT}`);
  console.log(`NewsAPI Key configured`);
});
