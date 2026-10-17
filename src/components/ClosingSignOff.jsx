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
        {/* Subtle Brand Hallmark Pill */}
        <div className="signoff-hallmark-wrap">
          <div className="crest-insignia-pill" aria-hidden="true">
            <span className="crest-star">◆</span>
            <span className="crest-cohort">TEJAS ’26</span>
            <span className="crest-sep">·</span>
            <span className="crest-sub">THE FRESH BLOOM</span>
            <span className="crest-star">◆</span>
          </div>
        </div>

        {/* Minimalist Prestige Attribution Card */}
        <div className="signoff-attribution-card">
          <div className="attribution-ambient-glow" aria-hidden="true" />
          
          <div className="attribution-content">
            <p className="attribution-label">
              Designed &amp; Developed with <Heart size={14} className="heart-icon" /> by
            </p>

            <div className="attribution-creators">
              <div className="creator-badge true-inspire">
                <span className="badge-shine" aria-hidden="true" />
                <span className="creator-text">True Inspire</span>
              </div>
              <span className="creator-ampersand">&amp;</span>
              <div className="creator-badge tejas-team">
                <span className="badge-shine" aria-hidden="true" />
                <span className="creator-text">Tejas The Fresh Bloom Team</span>
              </div>
            </div>
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
      </div>
    </footer>
  );
}



