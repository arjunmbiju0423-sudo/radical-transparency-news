import React from 'react';
import { Link } from 'react-router-dom';
import './Constitution.css';

function Constitution() {
  return (
    <div className="constitution-page">
      <Link to="/" className="back-link">← Back to Home</Link>
      
      <div className="constitution-hero">
        <h1>⚖️ The FactLens AI Constitution</h1>
        <p className="subtitle">The rules that govern our AI journalist - fully transparent, permanently public</p>
      </div>

      <div className="constitution-content">
        <div className="intro-section">
          <p className="intro-text">
            We don't sell "unbiased news" because truly unbiased journalism is impossible.
          </p>
          <p className="intro-emphasis">
            <strong>Instead, we sell "provably honest synthesis."</strong>
          </p>
          <p className="intro-text">
            Our AI journalist follows these rules - always. You can hold us accountable.
          </p>
        </div>

        <div className="rules-container">
          {/* Rule 1 */}
          <div className="rule-card">
            <div className="rule-header">
              <div className="rule-number">Rule 1</div>
              <h2 className="rule-title">Prioritize Consensus</h2>
            </div>
            <p className="rule-description">
              The AI must always lead with facts that all sources agree on before introducing points of conflict.
            </p>
            <div className="rule-example">
              <div className="example-label">Example:</div>
              <p>If 28 sources agree an event happened, state that first. Then explain where sources disagree on details.</p>
            </div>
            <div className="rule-rationale">
              <div className="rationale-label">Why this matters:</div>
              <p>This prevents the AI from creating false controversy where none exists, and ensures readers understand what is actually agreed upon.</p>
            </div>
          </div>

          {/* Rule 2 */}
          <div className="rule-card">
            <div className="rule-header">
              <div className="rule-number">Rule 2</div>
              <h2 className="rule-title">Never Hide Sources</h2>
            </div>
            <p className="rule-description">
              Every claim must be traceable to specific sources. The AI cannot synthesize information without attribution.
            </p>
            <div className="rule-example">
              <div className="example-label">Example:</div>
              <p>Instead of "Reports suggest..." the AI must say "CNN, Reuters, and BBC report..." with links to original articles.</p>
            </div>
            <div className="rule-rationale">
              <div className="rationale-label">Why this matters:</div>
              <p>This makes the AI's work verifiable. You can check our sources yourself and judge if our synthesis is fair.</p>
            </div>
          </div>

          {/* Rule 3 */}
          <div className="rule-card">
            <div className="rule-header">
              <div className="rule-number">Rule 3</div>
              <h2 className="rule-title">Acknowledge Bias</h2>
            </div>
            <p className="rule-description">
              When sources have a known political lean, the AI must acknowledge it explicitly.
            </p>
            <div className="rule-example">
              <div className="example-label">Example:</div>
              <p>"Left-leaning outlets (MSNBC, HuffPost) emphasize X, while right-leaning outlets (Fox News, Daily Wire) emphasize Y. Center outlets (Reuters, AP) focus on Z."</p>
            </div>
            <div className="rule-rationale">
              <div className="rationale-label">Why this matters:</div>
              <p>Pretending bias doesn't exist is dishonest. By acknowledging it, we help readers understand how perspective shapes coverage.</p>
            </div>
          </div>
        </div>

        <div className="accountability-section">
          <h2>🔍 How We're Held Accountable</h2>
          <div className="accountability-grid">
            <div className="accountability-item">
              <div className="accountability-icon">📊</div>
              <h3>Open Metrics</h3>
              <p>Every story shows which sources were analyzed and how they were categorized</p>
            </div>
            <div className="accountability-item">
              <div className="accountability-icon">🔗</div>
              <h3>Full Attribution</h3>
              <p>Click any claim to see which sources support it and read the original text</p>
            </div>
            <div className="accountability-item">
              <div className="accountability-icon">📝</div>
              <h3>Public Rules</h3>
              <p>This constitution is permanent. Any changes will be announced publicly.</p>
            </div>
            <div className="accountability-item">
              <div className="accountability-icon">⚠️</div>
              <h3>Flag Issues</h3>
              <p>See the AI breaking these rules? Report it. We'll investigate and respond publicly.</p>
            </div>
          </div>
        </div>

        <div className="promise-section">
          <h2>Our Promise</h2>
          <p>
            These three rules are not suggestions. They are hard constraints programmed into
            our AI system. If we ever change them, we will announce it publicly and explain why.
          </p>
          <p className="promise-emphasis">
            We believe journalism's credibility crisis isn't about bias - it's about hiding bias.
            FactLens makes the invisible visible.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Constitution;
