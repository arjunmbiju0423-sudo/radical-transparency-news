import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './StoryDetail.css';

const API_BASE = 'https://radical-transparency-news-production.up.railway.app';

function StoryDetail() {
  const { id } = useParams();
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);
  // const [activeSentence, setActiveSentence] = useState(null);

  useEffect(() => {
    const fetchStory = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_BASE}/api/stories`);
        const articles = response.data.articles || [];
        setStory(articles[parseInt(id)] || articles[0]);
      } catch (error) {
        console.error('Error fetching story:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchStory();
  }, [id]);

  // const showSourcePopup = (sentenceIndex) => {
    // setActiveSentence(sentenceIndex);
  // };

  if (loading) return <div className="loading">Loading transparency report...</div>;
  if (!story) return <div className="error">Story not found</div>;

  return (
    <div className="story-detail">
      <Link to="/" className="back-link">← Back to Feed</Link>
      
      <h1>{story.title}</h1>
      
      <div className="glass-box">
        <h2>Glass Box Metrics</h2>
        <div className="metric">
          <span className="label">Transparency Score:</span>
          <span className="value">{story.transparencyScore}%</span>
        </div>
        <div className="metric">
          <span className="label">Sources:</span>
          <span className="value">{story.sourcesCount}</span>
        </div>
        <div className="metric">
          <span className="label">Conflicts:</span>
          <span className="value">{story.conflictsCount}</span>
        </div>
      </div>

      <div className="story-content">
        <p>{story.snippet}</p>
      </div>

      <div className="points-of-conflict">
        <h2>Points of Conflict</h2>
        <ul>
          <li>Source A claims X, Source B claims Y</li>
          <li>Timeline discrepancy between reports</li>
        </ul>
      </div>
    </div>
  );
}

export default StoryDetail;
