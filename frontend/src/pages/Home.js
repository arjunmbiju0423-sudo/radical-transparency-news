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

  useEffect(() => {
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
    
    fetchArticles();
  }, [category]);

  if (loading) return <div className="loading">Loading news...</div>;

  return (
    <div className="home">
      <div className="feed-toggle">
        <button
          className={view === 'conflict' ? 'active' : ''}
          onClick={() => setView('conflict')}
        >
          Conflict Feed
        </button>
        <button
          className={view === 'consensus' ? 'active' : ''}
          onClick={() => setView('consensus')}
        >
          Consensus View
        </button>
      </div>

      <div className="articles-grid">
        {articles.map((article) => (
          <Link to={`/story/${article.id}`} key={article.id} className="article-card">
            <div className="glass-box-label">
              <span className="transparency-score">{article.transparencyScore}%</span>
            </div>
            <h3>{article.title}</h3>
            <p className="article-snippet">{article.snippet}</p>
            <div className="article-meta">
              <span className="sources-count">{article.sourcesCount} sources</span>
              <span className="conflicts-count">{article.conflictsCount} conflicts</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;
