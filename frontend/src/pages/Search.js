import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Search.css';

function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();
    // Mock search results
    setResults([
      { id: 1, title: 'Sample story about ' + query, description: 'Search results will appear here once backend search is implemented' }
    ]);
  };

  return (
    <div className="search-page">
      <div className="search-header">
        <h1>🔍 Search Transparency Reports</h1>
        <p>Search our archive of fact-checked, bias-analyzed news</p>
      </div>

      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for topics, keywords, or events..."
          className="search-input"
        />
        <button type="submit" className="search-button">Search</button>
      </form>

      <div className="search-results">
        {results.length > 0 ? (
          results.map((result) => (
            <Link key={result.id} to={`/story/${result.id}`} className="search-result-card">
              <h3>{result.title}</h3>
              <p>{result.description}</p>
            </Link>
          ))
        ) : query && (
          <p className="no-results">No results found. Try a different search term.</p>
        )}
      </div>
    </div>
  );
}

export default Search;
