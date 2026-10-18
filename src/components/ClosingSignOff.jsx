import React from 'react';
import { ArrowUp, Heart } from 'lucide-react';
import { playMicroTap } from '../utils/audio';

export default function ClosingSignOff() {
  const scrollToTop = () => {
    playMicroTap();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="closing-signoff-section" role="contentinfo" aria-label="Footer & Credits">
      {/* Top Ambient Glow Line */}
      <div className="signoff-top-border" aria-hidden="true" />

      <div className="section-container signoff-container">
        {/* Authentic Academic & Senior Cohort Sign-Off */}
        <div className="signoff-attribution-card">
          <div className="attribution-ambient-glow" aria-hidden="true" />
          
          <div className="attribution-content">
            <p className="attribution-quote">
              “Every great journey begins with a single step — welcome to the MCA family.”
            </p>
            <p className="attribution-dedication">
              Organized with pride by the <strong>Seniors of MCA (Batch 2025–2027)</strong>
            </p>
            <p className="attribution-dept">
              Department of Computer Applications · Srusti Academy of Management &amp; Technology, Bhubaneswar
            </p>
          </div>
        </div>

        {/* Back to Top Navigation */}
        <div className="signoff-actions">
          <button
            type="button"
            className="signoff-scroll-top-btn"
            onClick={scrollToTop}
            aria-label="Scroll back to top of invitation"
          >
            <span>Back to Top</span>
            <ArrowUp size={14} />
          </button>
        </div>

        {/* Gilded Divider */}
        <div className="signoff-bottom-hairline" aria-hidden="true">
          <span className="hairline-rail" />
          <span className="hairline-gem">◆</span>
          <span className="hairline-rail" />
        </div>

        {/* Authentic Campus & Senior Initiative Footer */}
        <div className="signoff-bottom-bar">
          <span className="signoff-event-stamp">
            Tejas ’26 · Hosted by MCA Seniors
          </span>
          <span className="signoff-campus-stamp">
            Srusti Academy of Management &amp; Technology
          </span>
        </div>

        {/* True Inspire Credit with Official Asset */}
        <div className="signoff-creator-credit">
          <img 
            src="/true_inspire.jpeg" 
            alt="True Inspire logo" 
            className="creator-credit-logo"
            width="24"
            height="24"
            loading="lazy"
          />
          <span className="creator-credit-text">
            Designed &amp; developed by <strong>True Inspire</strong>
          </span>
        </div>
      </div>
    </footer>
  );
}



