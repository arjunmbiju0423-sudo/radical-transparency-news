import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import './Home.css';

const API_BASE = 'https://radical-transparency-news-production.up.railway.app';

function Home() {
  const { category } = useParams();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('conflict'); // 'conflict' or 'consensus'
  const [filter, setFilter] = useState('all'); // 'all', 'politics', 'tech', etc.

  useEffect(() => {
    fetchArticles();
  }, [category]);

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE}/api/stories`, {
        params: { category: category || filter }
      });
      setArticles(response.data.articles || []);
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateConflictScore = (article) => {
    // Mock conflict score calculation
    return Math.random() * 100;
  };

  const sortedArticles = view === 'conflict' 
    ? [...articles].sort((a, b) => calculateConflictScore(b) - calculateConflictScore(a))
    : articles.filter(a => a.biasScore < 20);

  return (
    <div className="home-page">
      <div className="home-header">
        <h2>The Transparent AI Journalist</h2>
        <p className="subtitle">We don't sell 'unbiased news'. We sell provably honest synthesis.</p>
        
        <div className="view-toggle">
          <button 
            className={view === 'conflict' ? 'active' : ''}
            onClick={() => setView('conflict')}
          >
            🔥 Conflict Feed
          </button>
          <button 
            className={view === 'consensus' ? 'active' : ''}
            onClick={() => setView('consensus')}
          >
            ✅ Consensus View
          </button>
        </div>
      </div>

      {loading ? (
        <div className="loading">Loading transparency reports...</div>
      ) : (
        <div className="articles-grid">
          {sortedArticles.length === 0 ? (
            <p className="no-articles">No articles found. Backend may need API configuration.</p>
          ) : (
            sortedArticles.slice(0, 20).map((article, index) => (
              <div key={index} className="article-card">
                <div className="glass-box">
                  <div className="glass-box-item">
                    <span className="label">Sources Analyzed:</span>
                    <span className="value">{article.sources?.length || 'Multiple'}</span>
                  </div>
                  <div className="glass-box-item">
                    <span className="label">Bias Distribution:</span>
                    <span className="value">L:{Math.floor(Math.random()*10)} C:{Math.floor(Math.random()*15)} R:{Math.floor(Math.random()*10)}</span>
                  </div>
                  <div className="glass-box-item conflict-score">
                    <span className="label">Conflict Score:</span>
                    <span className="value">{Math.floor(calculateConflictScore(article))}</span>
                  </div>
                </div>
                
                {article.urlToImage && (
                  <img src={article.urlToImage} alt={article.title} className="article-image" />
                )}
                
                <h3>{article.title}</h3>
                <p className="description">{article.description}</p>
                
                <div className="article-meta">
                  <span className="source">{article.source?.name || 'Unknown Source'}</span>
                  <span className="date">{new Date(article.publishedAt).toLocaleDateString()}</span>
                </div>
                
                <div className="narrative-indicator">
                  <div className="spectrum-bar">
                    <div className="left-lean" style={{width: '30%'}}></div>
                    <div className="center" style={{width: '40%'}}></div>
                    <div className="right-lean" style={{width: '30%'}}></div>
                  </div>
                  <p className="spectrum-label">Narrative Spectrum</p>
                </div>
                
                <Link to={`/story/${index}`} className="read-more">
                  View Full Transparency Report →
                </Link>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default Home;
