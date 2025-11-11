import React from 'react';
import { Link } from 'react-router-dom';
import './Topics.css';

function Topics() {
  const topics = [
    { name: 'Politics', icon: '🏛', color: '#e74c3c', description: 'Government, elections, and policy' },
    { name: 'Technology', icon: '💻', color: '#3498db', description: 'Tech industry, innovation, and gadgets' },
    { name: 'Finance', icon: '💰', color: '#2ecc71', description: 'Markets, economy, and business' },
    { name: 'Science', icon: '🔬', color: '#9b59b6', description: 'Research, discoveries, and breakthroughs' },
    { name: 'World', icon: '🌍', color: '#1abc9c', description: 'International news and global events' },
    { name: 'Environment', icon: '🌳', color: '#27ae60', description: 'Climate, nature, and sustainability' },
    { name: 'Health', icon: '⚕️', color: '#e67e22', description: 'Medicine, wellness, and public health' },
    { name: 'Sports', icon: '⚽', color: '#f39c12', description: 'Athletics, competitions, and teams' },
  ];

  return (
    <div className="topics-page">
      <div className="topics-header">
        <h1>📚 Browse by Topic</h1>
        <p>Find transparency reports organized by subject matter</p>
      </div>

      <div className="topics-grid">
        {topics.map((topic, index) => (
          <Link 
            key={index}
            to={`/topics/${topic.name.toLowerCase()}`}
            className="topic-card"
            style={{ borderColor: topic.color }}
          >
            <div className="topic-icon" style={{ background: topic.color }}>
              {topic.icon}
            </div>
            <h3>{topic.name}</h3>
            <p>{topic.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Topics;
