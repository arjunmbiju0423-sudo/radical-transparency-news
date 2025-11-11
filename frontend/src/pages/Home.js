import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import './Home.css';

const API_BASE = 'https://radical-transparency-news-production.up.railway.app';

function Home() {
  const { category } = useParams();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('conflict');
  const filter = 'all';

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
  }, [category, filter]);

  if (loading) return <div className="loading">Loading FactLens analysis...</div>;

  return (
    <div className="home">
      {/* FactLens Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">🔍 FactLens</h1>
          <p className="hero-subtitle">News Through the Lens of Transparency</p>
          <p className="hero-description">
            See beyond the headlines. Track bias, explore claims, and discover
            the full story from multiple perspectives.
          </p>
        </div>
      </div>

      {/* Feed Toggle */}
      <div className="feed-toggle">
        <button
          className={view === 'conflict' ? 'active' : ''}
          onClick={() => setView('conflict')}
        >
          ⚠️ Conflict Feed
        </button>
        <button
          className={view === 'consensus' ? 'active' : ''}
          onClick={() => setView('consensus')}
        >
          ✓ Consensus View
        </button>
      </div>

      {/* Articles Grid */}
      {articles.length === 0 ? (
        <div className="no-articles">
          <p>No articles found. The backend may be starting up.</p>
        </div>
      ) : (
        <div className="articles-grid">
          {articles.map((article, index) => (
            <Link to={`/story/${index}`} key={index} className="article-card">
              <div className="card-header">
                <span className="transparency-badge">
                  🔍 {article.transparencyScore || 85}% Transparency
                </span>
              </div>
              
              <h3 className="article-title">{article.title}</h3>
              <p className="article-snippet">{article.snippet || article.description}</p>
              
              <div className="article-meta">
                <div className="meta-item">
                  <span className="meta-icon">📰</span>
                  <span>{article.sourcesCount || 12} sources</span>
                </div>
                <div className="meta-item conflict">
                  <span className="meta-icon">⚠️</span>
                  <span>{article.conflictsCount || 3} conflicts</span>
                </div>
              </div>

              {/* Bias Preview */}
              <div className="bias-preview">
                <div className="bias-bar-mini">
                  <div className="bar-section left" style={{width: '35%'}}></div>
                  <div className="bar-section center" style={{width: '40%'}}></div>
                  <div className="bar-section right" style={{width: '25%'}}></div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Features Section */}
      <div className="features-section">
        <h2>Why FactLens?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🔍</div>
            <h3>Glass Box Transparency</h3>
            <p>See exactly which sources were analyzed and how they align</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Narrative Spectrum</h3>
            <p>Visualize how different outlets frame the same story</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔎</div>
            <h3>Claim Explorer</h3>
            <p>Dig into specific claims with source-by-source comparison</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⚖️</div>
            <h3>Bias Detection</h3>
            <p>Understand the political lean of every source</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
