import React from 'react';
import { Calendar, ArrowRight, Flag, Star } from 'lucide-react';

export default function MilestonesSection() {
  return (
    <section className="milestones-section" id="milestones">
      <div className="section-container">
        <div className="section-header-centered">
          <div className="accent-tag">
            <Calendar size={13} />
            <span>CELEBRATION MILESTONES</span>
          </div>
          <h2 className="section-title">Two Moments, One Confluence</h2>
          <p className="section-description">
            The road to TEJAS ’26 unfolds in two distinct chapters. Mark your calendar for both milestones.
          </p>
        </div>

        <div className="milestones-grid">
          {/* Milestone 1: 27 October 2026 — Theme & Banner Reveal */}
          <div className="milestone-card milestone-reveal">
            <div className="milestone-badge-row">
              <span className="milestone-phase-tag">PRELUDE MILESTONE</span>
              <span className="milestone-date-pill">27 OCTOBER 2026</span>
            </div>

            <div className="milestone-icon-bubble bubble-pink">
              <Flag size={24} />
            </div>

            <h3 className="milestone-card-title">Theme &amp; Banner Reveal</h3>
            
            <p className="milestone-tagline-quote">
              “The name is unveiled. The celebration begins.”
            </p>

            <p className="milestone-card-body">
              The ceremonial kickoff where the official identity, theme, and ceremonial banners for TEJAS '26 are unveiled across campus to commence the fresher festivities.
            </p>

            <div className="milestone-footer-status">
              <span className="status-dot dot-pink" />
              <span>Campus Banner Unveiling &amp; Teaser Launch</span>
            </div>
          </div>

          {/* Milestone 2: 30 October 2026 — Main Freshers Day */}
          <div className="milestone-card milestone-main">
            <div className="milestone-badge-row">
              <span className="milestone-phase-tag primary">GRAND CELEBRATION</span>
              <span className="milestone-date-pill primary">30 OCTOBER 2026</span>
            </div>

            <div className="milestone-icon-bubble bubble-wine">
              <Star size={24} />
            </div>

            <h3 className="milestone-card-title">TEJAS ’26 — Freshers Day</h3>
            
            <p className="milestone-tagline-quote primary">
              “The Fresh Bloom.”
            </p>

            <p className="milestone-card-body">
              The official welcoming gala at <strong>JRD Tata Hall</strong>. A full day of camaraderie, traditional inauguration, cultural performances, fellowship lunch, title contests, and DJ celebration.
            </p>

            <div className="milestone-footer-status">
              <span className="status-dot dot-wine" />
              <span>Doors open 10:00 AM · Inauguration 10:30 AM</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
