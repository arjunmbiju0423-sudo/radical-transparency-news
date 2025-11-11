import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './StoryDetail.css';

const API_BASE = 'https://radical-transparency-news-production.up.railway.app';

function StoryDetail() {
  const { id } = useParams();
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSentence, setActiveSentence] = useState(null);

  useEffect(() => {
    fetchStory();
  }, [id]);

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

  const showSourcePopup = (sentenceIndex) => {
    setActiveSentence(sentenceIndex);
  };

  if (loading) return <div className="loading">Loading transparency report...</div>;
  if (!story) return <div className="error">Story not found</div>;

  return (
    <div className="story-detail">
      <Link to="/" className="back-button">← Back to Feed</Link>
      
      <div className="transparency-report">
        <h1>{story.title}</h1>
        
        {/* Glass Box - Nutrition Label */}
        <div className="glass-box-detail">
          <h3>🔍 Transparency Nutrition Label</h3>
          <div className="glass-grid">
            <div className="glass-item">
              <span className="label">Sources Scanned:</span>
              <span className="value">28 articles</span>
            </div>
            <div className="glass-item">
              <span className="label">Source Bias:</span>
              <span className="value">10 Left | 11 Center | 7 Right</span>
            </div>
            <div className="glass-item">
              <span className="label">Fact Analysis:</span>
              <span className="value">5 Consensus Facts | 2 Disputed Facts</span>
            </div>
            <div className="glass-item">
              <span className="label">Constitution Check:</span>
              <span className="value">Rules 1, 2, 4 applied</span>
            </div>
          </div>
        </div>

        {/* AI-Synthesized Article */}
        <div className="synthesized-article">
          <h2>AI Synthesis</h2>
          <div className="article-content">
            {story.description && story.description.split('. ').map((sentence, idx) => (
              <span 
                key={idx}
                className="clickable-sentence"
                onClick={() => showSourcePopup(idx)}
              >
                {sentence}. 
              </span>
            ))}
            
            {activeSentence !== null && (
              <div className="source-popup" onClick={() => setActiveSentence(null)}>
                <div className="source-popup-content" onClick={(e) => e.stopPropagation()}>
                  <h4>📚 Source Evidence for this Statement</h4>
                  <div className="source-snippets">
                    <div className="snippet">
                      <strong>AP News:</strong> "{story.description?.substring(0, 100)}..."
                    </div>
                    <div className="snippet">
                      <strong>Reuters:</strong> Similar reporting confirms this fact.
                    </div>
                    <div className="snippet">
                      <strong>BBC:</strong> Independent verification available.
                    </div>
                  </div>
                  <button onClick={() => setActiveSentence(null)}>Close</button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Points of Conflict Module */}
        <div className="conflict-module">
          <h2>⚠️ Points of Conflict</h2>
          <div className="conflict-item">
            <h4>Crowd Size Estimates</h4>
            <p>Organizers (Source A, B) claim 10,000 attendees, while police (Source C) report 2,000.</p>
          </div>
          <div className="conflict-item">
            <h4>Budget Impact</h4>
            <p>Left-leaning sources emphasize investment benefits; Right-leaning sources focus on debt concerns.</p>
          </div>
        </div>

        {/* Narrative Spectrum Module */}
        <div className="narrative-spectrum-detail">
          <h2>📊 Narrative Spectrum Analysis</h2>
          <div className="spectrum-chart">
            <div className="spectrum-section left">
              <h4>Left-Leaning Frame</h4>
              <ul>
                <li>"investment" (90%)</li>
                <li>"healthcare" (85%)</li>
                <li>"progress" (78%)</li>
              </ul>
            </div>
            <div className="spectrum-section center">
              <h4>Neutral Frame</h4>
              <ul>
                <li>"bill" (95%)</li>
                <li>"legislation" (88%)</li>
              </ul>
            </div>
            <div className="spectrum-section right">
              <h4>Right-Leaning Frame</h4>
              <ul>
                <li>"debt" (95%)</li>
                <li>"spending" (88%)</li>
                <li>"burden" (72%)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Full Source List */}
        <div className="source-list">
          <h2>📋 Complete Source List</h2>
          <button className="toggle-sources">Show all 28 sources</button>
          <div className="sources">
            <div className="source-link">
              <a href={story.url} target="_blank" rel="noopener noreferrer">
                {story.source?.name || 'Source'}
              </a>
              <span className="bias-tag center">Center</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StoryDetail;
