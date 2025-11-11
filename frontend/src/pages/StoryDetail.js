import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './StoryDetail.css';

const API_BASE = 'https://radical-transparency-news-production.up.railway.app';

function StoryDetail() {
  const { id } = useParams();
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedClaim, setSelectedClaim] = useState(null);
  const [showClaimExplorer, setShowClaimExplorer] = useState(false);

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

  const openClaimExplorer = (claim) => {
    setSelectedClaim(claim);
    setShowClaimExplorer(true);
  };

  const closeClaimExplorer = () => {
    setShowClaimExplorer(false);
    setSelectedClaim(null);
  };

  if (loading) return <div className="loading">Loading FactLens analysis...</div>;
  if (!story) return <div className="error">Story not found</div>;

  // Mock data for demonstration
  const glassBoxData = {
    sourcesScanned: 47,
    biasDistribution: { left: 15, center: 20, right: 12 },
    consensusFacts: 12,
    disputedClaims: 5
  };

  const narrativeSpectrumData = [
    { term: 'investigation', left: 8, center: 15, right: 5 },
    { term: 'allegations', left: 12, center: 10, right: 3 },
    { term: 'evidence', left: 10, center: 18, right: 8 }
  ];

  const claims = [
    {
      id: 1,
      text: 'The investigation was launched in March 2024',
      status: 'consensus',
      sources: [
        { outlet: 'CNN', bias: 'center-left', snippet: 'Investigation began March 2024...' },
        { outlet: 'Fox News', bias: 'right', snippet: 'Probe started in March...' },
        { outlet: 'Reuters', bias: 'center', snippet: 'March 2024 marked the start...' }
      ]
    },
    {
      id: 2,
      text: 'Multiple witnesses have come forward',
      status: 'disputed',
      sources: [
        { outlet: 'MSNBC', bias: 'left', snippet: '15 witnesses testified...' },
        { outlet: 'Wall Street Journal', bias: 'center-right', snippet: 'Only 3 credible witnesses...' }
      ]
    }
  ];

  return (
    <div className="story-detail">
      <Link to="/" className="back-link">← Back to Feed</Link>
      
      <div className="story-header">
        <h1 className="story-title">{story.title}</h1>
        <div className="story-meta">
          <span className="date">{new Date(story.publishedAt).toLocaleDateString()}</span>
        </div>
      </div>

      {/* Glass Box Transparency Dashboard */}
      <div className="glass-box">
        <h2>🔍 Glass Box Transparency</h2>
        <div className="glass-metrics">
          <div className="metric-card">
            <div className="metric-value">{glassBoxData.sourcesScanned}</div>
            <div className="metric-label">Sources Scanned</div>
          </div>
          <div className="metric-card">
            <div className="metric-value">{glassBoxData.consensusFacts}</div>
            <div className="metric-label">Consensus Facts</div>
          </div>
          <div className="metric-card">
            <div className="metric-value">{glassBoxData.disputedClaims}</div>
            <div className="metric-label">Disputed Claims</div>
          </div>
        </div>
        
        <div className="bias-distribution">
          <h3>Source Bias Distribution</h3>
          <div className="bias-bars">
            <div className="bias-bar">
              <span className="bias-label">Left</span>
              <div className="bar-container">
                <div className="bar left" style={{width: `${(glassBoxData.biasDistribution.left / glassBoxData.sourcesScanned) * 100}%`}}></div>
              </div>
              <span className="bias-count">{glassBoxData.biasDistribution.left}</span>
            </div>
            <div className="bias-bar">
              <span className="bias-label">Center</span>
              <div className="bar-container">
                <div className="bar center" style={{width: `${(glassBoxData.biasDistribution.center / glassBoxData.sourcesScanned) * 100}%`}}></div>
              </div>
              <span className="bias-count">{glassBoxData.biasDistribution.center}</span>
            </div>
            <div className="bias-bar">
              <span className="bias-label">Right</span>
              <div className="bar-container">
                <div className="bar right" style={{width: `${(glassBoxData.biasDistribution.right / glassBoxData.sourcesScanned) * 100}%`}}></div>
              </div>
              <span className="bias-count">{glassBoxData.biasDistribution.right}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Narrative Spectrum Visualization */}
      <div className="narrative-spectrum">
        <h2>📊 Narrative Spectrum</h2>
        <p className="spectrum-description">How different outlets frame this story</p>
        <div className="spectrum-chart">
          {narrativeSpectrumData.map((item, idx) => (
            <div key={idx} className="spectrum-row">
              <div className="term-label">{item.term}</div>
              <div className="spectrum-bars">
                <div className="spectrum-bar left" style={{width: `${item.left * 5}px`}}>
                  <span className="bar-value">{item.left}</span>
                </div>
                <div className="spectrum-bar center" style={{width: `${item.center * 5}px`}}>
                  <span className="bar-value">{item.center}</span>
                </div>
                <div className="spectrum-bar right" style={{width: `${item.right * 5}px`}}>
                  <span className="bar-value">{item.right}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="spectrum-legend">
          <span className="legend-item"><span className="dot left"></span> Left-leaning</span>
          <span className="legend-item"><span className="dot center"></span> Center</span>
          <span className="legend-item"><span className="dot right"></span> Right-leaning</span>
        </div>
      </div>

      {/* Story Content with Interactive Claims */}
      <div className="story-content">
        <h2>Story Summary</h2>
        <p>{story.snippet || story.description}</p>
        
        <div className="interactive-claims">
          <h3>Key Claims</h3>
          {claims.map((claim) => (
            <div 
              key={claim.id} 
              className={`claim-item ${claim.status}`}
              onClick={() => openClaimExplorer(claim)}
            >
              <span className={`claim-badge ${claim.status}`}>
                {claim.status === 'consensus' ? '✓' : '⚠'}
              </span>
              <span className="claim-text">{claim.text}</span>
              <span className="claim-sources">({claim.sources.length} sources)</span>
            </div>
          ))}
        </div>
      </div>

      {/* Source Attribution */}
      <div className="source-attribution">
        <h2>📚 Full Source List</h2>
        <div className="sources-grid">
          {['CNN', 'Fox News', 'Reuters', 'MSNBC', 'Wall Street Journal', 'BBC', 'Associated Press'].map((source, idx) => (
            <div key={idx} className="source-badge">
              {source}
            </div>
          ))}
        </div>
      </div>

      {/* Claim Explorer Modal */}
      {showClaimExplorer && selectedClaim && (
        <div className="modal-overlay" onClick={closeClaimExplorer}>
          <div className="claim-explorer-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={closeClaimExplorer}>×</button>
            <h2>Claim Explorer</h2>
            <div className="claim-detail">
              <div className={`claim-status ${selectedClaim.status}`}>
                {selectedClaim.status === 'consensus' ? '✓ Consensus' : '⚠ Disputed'}
              </div>
              <p className="claim-text-large">{selectedClaim.text}</p>
            </div>
            <div className="claim-sources">
              <h3>Source Comparison</h3>
              {selectedClaim.sources.map((source, idx) => (
                <div key={idx} className="source-snippet">
                  <div className="source-header">
                    <span className="source-name">{source.outlet}</span>
                    <span className={`source-bias ${source.bias}`}>{source.bias}</span>
                  </div>
                  <p className="snippet-text">"{source.snippet}"</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StoryDetail;
