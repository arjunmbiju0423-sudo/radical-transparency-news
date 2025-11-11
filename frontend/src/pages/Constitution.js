import React from 'react';
import './Constitution.css';

function Constitution() {
  return (
    <div className="constitution-page">
      <div className="hero">
        <h1>🏛 Our Public AI Constitution</h1>
        <p className="subtitle">The rules that govern our AI journalist - fully transparent, permanently public</p>
      </div>

      <div className="constitution-content">
        <div className="intro">
          <p>We don't sell "unbiased news" because truly unbiased journalism is impossible.</p>
          <p><strong>Instead, we sell "provably honest synthesis."</strong></p>
          <p>Our AI journalist follows these rules - always. You can hold us accountable.</p>
        </div>

        <div className="rules-list">
          <div className="rule-card">
            <div className="rule-number">Rule 1</div>
            <h3>Prioritize Consensus</h3>
            <p>The AI must always lead with facts that all sources agree on before introducing points of conflict.</p>
            <div className="example">
              <strong>Example:</strong> If 28 sources agree an event happened, state that first. Then explain where sources disagree on details.
            </div>
          </div>

          <div className="rule-card">
            <div className="rule-number">Rule 2</div>
            <h3>Show Your Work</h3>
            <p>Every sentence in our synthesis must be traceable to specific source articles.</p>
            <div className="example">
              <strong>Example:</strong> Users can click any sentence to see which sources were used to generate it.
            </div>
          </div>

          <div className="rule-card">
            <div className="rule-number">Rule 3</div>
            <h3>Label Conflicts Explicitly</h3>
            <p>When sources disagree, the AI must clearly state the disagreement and attribute each position.</p>
            <div className="example">
              <strong>Example:</strong> "Organizers (Source A, B) claim 10,000 attendees, while police (Source C) report 2,000."
            </div>
          </div>

          <div className="rule-card">
            <div className="rule-number">Rule 4</div>
            <h3>Expose Narrative Framing</h3>
            <p>The AI must analyze and display the different language used by different ideological sources.</p>
            <div className="example">
              <strong>Example:</strong> Show that left sources use "investment" while right sources use "spending" for the same bill.
            </div>
          </div>

          <div className="rule-card">
            <div className="rule-number">Rule 5</div>
            <h3>Never Hide Sources</h3>
            <p>The complete list of sources for every story must be publicly available and linkable.</p>
            <div className="example">
              <strong>Example:</strong> Every transparency report includes all 28+ source articles used in analysis.
            </div>
          </div>
        </div>

        <div className="accountability">
          <h2>Hold Us Accountable</h2>
          <p>If you ever find us violating these rules, report it. These aren't guidelines - they're promises.</p>
          <p>Our AI's "bias" is in its programming, and that programming is public and unchanging.</p>
        </div>
      </div>
    </div>
  );
}

export default Constitution;
