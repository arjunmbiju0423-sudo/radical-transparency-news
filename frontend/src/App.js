import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/stories');
      setArticles(response.data.articles || []);
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="header">
        <h1>Radical Transparency News</h1>
        <p>Real-time News with Bias Analysis</p>
      </header>
      <main className="container">
        {loading && <p>Loading articles...</p>}
        {!loading && articles.length === 0 && <p>No articles found</p>}
        {!loading && articles.length > 0 && (
          <div className="articles-grid">
            {articles.slice(0, 20).map((article, index) => (
              <article key={index} className="article-card">
                {article.urlToImage && <img src={article.urlToImage} alt={article.title} />}
                <h3>{article.title}</h3>
                <p>{article.description}</p>
                <a href={article.url} target="_blank" rel="noopener noreferrer">Read More</a>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
