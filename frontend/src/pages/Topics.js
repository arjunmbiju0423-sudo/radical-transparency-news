import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import './Topics.css';

function Topics() {
  const { category } = useParams();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState(null);

  const topics = [
    { name: 'Politics', icon: '🏛', color: '#e74c3c', description: 'Government, elections, and policy', slug: 'politics' },
    { name: 'Technology', icon: '💻', color: '#3498db', description: 'Tech industry, innovation, and gadgets', slug: 'technology' },
    { name: 'Finance', icon: '💰', color: '#2ecc71', description: 'Markets, economy, and business', slug: 'finance' },
    { name: 'Science', icon: '🔬', color: '#9b59b6', description: 'Research, discoveries, and breakthroughs', slug: 'science' },
    { name: 'World', icon: '🌍', color: '#1abc9c', description: 'International news and global events', slug: 'world' },
    { name: 'Environment', icon: '🌳', color: '#27ae60', description: 'Climate, nature, and sustainability', slug: 'environment' },
    { name: 'Health', icon: '⚕️', color: '#e67e22', description: 'Medicine, wellness, and public health', slug: 'health' },
    { name: 'Sports', icon: '⚽', color: '#f39c12', description: 'Athletics, competitions, and teams', slug: 'sports' },
  ];

  useEffect(() => {
    if (category) {
      const topic = topics.find(t => t.slug === category);
      setSelectedTopic(topic);
      fetchArticlesByTopic(category);
    }
  }, [category]);

  const fetchArticlesByTopic = async (topicSlug) => {
    setLoading(true);
    try {
      const response = await fetch(`https://radical-transparency-news-production.up.railway.app/api/articles?topic=${topicSlug}`);
      const data = await response.json();
      setArticles(data || []);
    } catch (error) {
      console.error('Error fetching articles:', error);
      setArticles([]);
    }
    setLoading(false);
  };

  const getBiasColor = (bias) => {
    const biasMap = {
      left: '#3498db',
      center: '#95a5a6',
      right: '#e74c3c'
    };
    return biasMap[bias?.toLowerCase()] || '#95a5a6';
  };

  if (category && selectedTopic) {
    return (
      <div className="topics-page">
        <div className="topic-detail-header" style={{ borderColor: selectedTopic.color }}>
          <Link to="/topics" className="back-button">← Back to Topics</Link>
          <div className="topic-detail-icon" style={{ background: selectedTopic.color }}>
            {selectedTopic.icon}
          </div>
          <h1>{selectedTopic.name}</h1>
          <p>{selectedTopic.description}</p>
        </div>

        <div className="topic-articles">
          {loading ? (
            <div className="loading-state">Loading articles...</div>
          ) : articles.length > 0 ? (
            articles.map((article, index) => (
              <Link to={`/story/${article.id}`} key={index} className="topic-article-card">
                <div className="article-meta">
                  <span className="article-topic" style={{ color: selectedTopic.color }}>
                    {selectedTopic.icon} {selectedTopic.name}
                  </span>
                  <span className="article-date">{new Date(article.date).toLocaleDateString()}</span>
                </div>
                <h3>{article.title}</h3>
                <p className="article-summary">{article.summary}</p>
                <div className="article-bias-preview">
                  <div className="bias-bar-container">
                    <div className="bias-bar" style={{ width: '33%', background: getBiasColor('left') }}></div>
                    <div className="bias-bar" style={{ width: '33%', background: getBiasColor('center') }}></div>
                    <div className="bias-bar" style={{ width: '34%', background: getBiasColor('right') }}></div>
                  </div>
                  <span className="sources-count">{article.sourceCount || 0} sources analyzed</span>
                </div>
              </Link>
            ))
          ) : (
            <div className="no-articles">
              <p>No articles found for this topic yet.</p>
              <p>Check back soon for transparency reports on {selectedTopic.name}.</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="topics-page">
      <div className="topics-header">
        <h1>🔍 Browse by Topic</h1>
        <p>Find transparency reports organized by subject matter</p>
      </div>

      <div className="topics-grid">
        {topics.map((topic, index) => (
          <Link 
            key={index}
            to={`/topics/${topic.slug}`}
            className="topic-card"
            style={{ borderColor: topic.color }}
          >
            <div className="topic-icon" style={{ background: topic.color }}>
              {topic.icon}
            </div>
            <h3>{topic.name}</h3>
            <p>{topic.description}</p>
            <div className="topic-arrow">→</div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Topics;
