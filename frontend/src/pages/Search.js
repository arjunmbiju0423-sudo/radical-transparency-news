import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Search.css';

function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [filters, setFilters] = useState({
    bias: 'all',
    topic: 'all',
    sortBy: 'relevance'
  });

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('q');
    if (searchQuery) {
      setQuery(searchQuery);
      performSearch(searchQuery);
    }
  },performSearch]);]);

  const performSearch = async (searchQuery = query, currentFilters = filters) => {
    if (!searchQuery.trim()) return;
    
    setLoading(true);
    setSearchPerformed(true);
    
    try {
      const queryParams = new URLSearchParams({
        q: searchQuery,
        bias: currentFilters.bias,
        topic: currentFilters.topic,
        sortBy: currentFilters.sortBy
      });
      
      const response = await fetch(
        `https://radical-transparency-news-production.up.railway.app/api/articles/search?${queryParams}`
      );
      const data = await response.json();
      setResults(data || []);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    }
    
    setLoading(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    performSearch();
  };

  const handleFilterChange = (filterType, value) => {
    const newFilters = { ...filters, [filterType]: value };
    setFilters(newFilters);
    if (searchPerformed && query.trim()) {
      performSearch(query, newFilters);
    }
  };

  const getBiasColor = (bias) => {
    const biasMap = {
      left: '#3498db',
      center: '#95a5a6',
      right: '#e74c3c'
    };
    return biasMap[bias?.toLowerCase()] || '#95a5a6';
  };

  const highlightText = (text, searchQuery) => {
    if (!searchQuery.trim()) return text;
    const regex = new RegExp(`(${searchQuery})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, index) => 
      regex.test(part) ? <mark key={index}>{part}</mark> : part
    );
  };

  return (
    <div className="search-page">
      <div className="search-header">
        <h1>🔍 Search Transparency Reports</h1>
        <p>Search our archive of fact-checked, bias-analyzed news</p>
      </div>

      <form onSubmit={handleSearch} className="search-form">
        <div className="search-input-container">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles, topics, claims..."
            className="search-input"
          />
          <button type="submit" className="search-button">
            🔍 Search
          </button>
        </div>
      </form>

      {searchPerformed && (
        <div className="search-filters">
          <div className="filter-group">
            <label>Bias Filter:</label>
            <select 
              value={filters.bias} 
              onChange={(e) => handleFilterChange('bias', e.target.value)}
              className="filter-select"
            >
              <option value="all">All Sources</option>
              <option value="left">Left-Leaning</option>
              <option value="center">Center</option>
              <option value="right">Right-Leaning</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Topic:</label>
            <select 
              value={filters.topic} 
              onChange={(e) => handleFilterChange('topic', e.target.value)}
              className="filter-select"
            >
              <option value="all">All Topics</option>
              <option value="politics">Politics</option>
              <option value="technology">Technology</option>
              <option value="finance">Finance</option>
              <option value="science">Science</option>
              <option value="world">World</option>
              <option value="environment">Environment</option>
              <option value="health">Health</option>
              <option value="sports">Sports</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Sort By:</label>
            <select 
              value={filters.sortBy} 
              onChange={(e) => handleFilterChange('sortBy', e.target.value)}
              className="filter-select"
            >
              <option value="relevance">Relevance</option>
              <option value="date">Newest First</option>
              <option value="sources">Most Sources</option>
            </select>
          </div>
        </div>
      )}

      {loading ? (
        <div className="loading-state">Searching...</div>
      ) : searchPerformed ? (
        results.length > 0 ? (
          <div className="search-results">
            <div className="results-count">
              Found {results.length} result{results.length !== 1 ? 's' : ''} for "{query}"
            </div>
            {results.map((article, index) => (
              <Link 
                to={`/story/${article.id}`} 
                key={index} 
                className="search-result-card"
              >
                <div className="result-header">
                  <h3>{highlightText(article.title, query)}</h3>
                  <span className="result-date">
                    {new Date(article.date).toLocaleDateString()}
                  </span>
                </div>
                <p className="result-summary">
                  {highlightText(article.summary || article.description, query)}
                </p>
                <div className="result-meta">
                  <div className="result-topic">
                    {article.topic || 'General'}
                  </div>
                  <div className="result-bias-indicator">
                    <div className="bias-dots">
                      <span 
                        className="bias-dot" 
                        style={{ background: getBiasColor('left'), opacity: article.biasLeft > 0 ? 1 : 0.2 }}
                      ></span>
                      <span 
                        className="bias-dot" 
                        style={{ background: getBiasColor('center'), opacity: article.biasCenter > 0 ? 1 : 0.2 }}
                      ></span>
                      <span 
                        className="bias-dot" 
                        style={{ background: getBiasColor('right'), opacity: article.biasRight > 0 ? 1 : 0.2 }}
                      ></span>
                    </div>
                    <span className="sources-count">{article.sourceCount || 0} sources</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="no-results">
            <div className="no-results-icon">🔍</div>
            <h3>No results found for "{query}"</h3>
            <p>Try adjusting your search terms or filters</p>
            <ul className="search-tips">
              <li>Use different keywords or synonyms</li>
              <li>Check for spelling errors</li>
              <li>Try more general search terms</li>
              <li>Adjust your bias or topic filters</li>
            </ul>
          </div>
        )
      ) : (
        <div className="search-welcome">
          <div className="welcome-icon">📚</div>
          <h3>Start your transparency search</h3>
          <p>Search through our collection of fact-checked, bias-analyzed news articles</p>
          <div className="search-examples">
            <p>Popular searches:</p>
            <div className="example-tags">
              <button onClick={() => { setQuery('climate change'); performSearch('climate change'); }} className="example-tag">
                climate change
              </button>
              <button onClick={() => { setQuery('election'); performSearch('election'); }} className="example-tag">
                election
              </button>
              <button onClick={() => { setQuery('technology'); performSearch('technology'); }} className="example-tag">
                technology
              </button>
              <button onClick={() => { setQuery('economy'); performSearch('economy'); }} className="example-tag">
                economy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Search;
