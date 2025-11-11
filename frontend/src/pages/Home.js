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
  const filter = 'all'; // 'all', 'politics', 'tech', etc.

  // eslint-disable-next-line react-hooks/exhaustive-deps
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

  if (loading) return <div className="loading">Loading articles...</div>;

  return (
    <div className="home-page">
      <h1>Radical Transparency News</h1>
      
      <div className="feed-toggle">
        <button 
          className={`toggle-button ${view === 'conflict' ? 'active' : ''}`}
          onClick={() => setView('conflict')}
        >
          Conflict Feed
        </button>
        <button 
          className={`toggle-button ${view === 'consensus' ? 'active' : ''}`}
          onClick={() => setView('consensus')}
        >
          Consensus View
        </button>
      </div>

      <div className="articles-grid">
        {articles.length === 0 ? (
          <p>No articles found.</p>
        ) : (
          articles.map((article, index) => (
            <Link to={`/story/${article.id || index}`} key={index} className="article-card">
              <h3 className="article-title">{article.title}</h3>
              <p className="article-description">{article.description || article.summary}</p>
              <div>
                <span className="glass-box-label">Sources: {article.sources?.length || 0}</span>
                <span className="glass-box-label">Conflict: {Math.round(calculateConflictScore(article))}%</span>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

export default Home;
