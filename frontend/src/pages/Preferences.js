import React, { useState } from 'react';
import './Preferences.css';

function Preferences() {
  const [topics, setTopics] = useState({
    politics: true,
    technology: true,
    finance: false,
    science: true,
    world: true,
    environment: false,
    health: false,
    sports: false
  });

  const toggleTopic = (topic) => {
    setTopics({ ...topics, [topic]: !topics[topic] });
  };

  const handleSave = () => {
    alert('Preferences saved! (This would save to backend in production)');
  };

  return (
    <div className="preferences-page">
      <div className="preferences-header">
        <h1>⚙️ Your Preferences</h1>
        <p>Customize your news feed and experience</p>
      </div>

      <div className="preferences-content">
        <section className="pref-section">
          <h2>Topics to Follow</h2>
          <p className="section-desc">Select the topics you want to see in your main feed</p>
          <div className="topics-checkboxes">
            {Object.entries(topics).map(([topic, enabled]) => (
              <label key={topic} className="checkbox-label">
                <input
                  type="checkbox"
                  checked={enabled}
                  onChange={() => toggleTopic(topic)}
                />
                <span>{topic.charAt(0).toUpperCase() + topic.slice(1)}</span>
              </label>
            ))}
          </div>
        </section>

        <section className="pref-section">
          <h2>Display Options</h2>
          <label className="checkbox-label">
            <input type="checkbox" defaultChecked />
            <span>Show Conflict Score on each story</span>
          </label>
          <label className="checkbox-label">
            <input type="checkbox" defaultChecked />
            <span>Display Narrative Spectrum visualization</span>
          </label>
          <label className="checkbox-label">
            <input type="checkbox" defaultChecked />
            <span>Enable interactive source popups</span>
          </label>
        </section>

        <section className="pref-section">
          <h2>Feed Preferences</h2>
          <label className="radio-label">
            <input type="radio" name="feed" value="conflict" defaultChecked />
            <span>Show Conflict Feed (stories with most disagreement)</span>
          </label>
          <label className="radio-label">
            <input type="radio" name="feed" value="consensus" />
            <span>Show Consensus Feed (stories with agreement)</span>
          </label>
          <label className="radio-label">
            <input type="radio" name="feed" value="mixed" />
            <span>Show Mixed Feed (balanced view)</span>
          </label>
        </section>

        <button className="save-button" onClick={handleSave}>
          Save Preferences
        </button>
      </div>
    </div>
  );
}

export default Preferences;
