import React from 'react';
import { Calendar, Flag, Clock, MapPin } from 'lucide-react';
import { playMicroTap } from '../utils/audio';

export default function MilestonesSection() {
  return (
    <section className="milestones-section" id="milestones" aria-label="Celebration Milestones">
      <div className="section-container">
        {/* Curated Editorial Header */}
        <div className="milestones-header-block">
          <div className="milestones-eyebrow">
            <span className="eyebrow-diamond">✦</span>
            <span>CHAPTERS OF CELEBRATION</span>
            <span className="eyebrow-diamond">✦</span>
          </div>
          <h2 className="milestones-master-title">Two Moments, One Confluence</h2>
          <p className="milestones-master-subtitle">
            The path to TEJAS ’26 unfolds across two ceremonial dates — from the preliminary campus banner reveal to the grand celebratory gala.
          </p>
        </div>

        {/* Large Numeral Pair Showcase */}
        <div className="milestones-numeral-grid">
          {/* Milestone 1: 27 October */}
          <div className="milestone-numeral-card prelude" onMouseEnter={() => playMicroTap()}>
            {/* Colossal Typographic Ghost Numeral */}
            <div className="numeral-ghost-backdrop" aria-hidden="true">27</div>

            <div className="milestone-content-layer">
              <div className="milestone-date-header">
                <span className="milestone-roman-tag">CHAPTER I · PRELUDE</span>
                <span className="milestone-date-stamp">27 OCTOBER 2026</span>
              </div>

              <h3 className="milestone-headline">Theme &amp; Banner Reveal</h3>

              <p className="milestone-epigraph">
                “The identity is unveiled. The celebration begins.”
              </p>

              <p className="milestone-narrative">
                The official ceremonial launch where the artistic theme, handcrafted campus banners, and teaser identity for TEJAS '26 are unveiled across Srusti Academy to initiate the freshers festivities.
              </p>

              <div className="milestone-meta-pill">
                <MapPin size={13} className="meta-icon" />
                <span>Department of MCA Campus · 11:00 AM</span>
              </div>
            </div>
          </div>

          {/* Central Confluence Hairline Divider */}
          <div className="milestones-confluence-divider" aria-hidden="true">
            <span className="divider-line top" />
            <span className="divider-node">◆</span>
            <span className="divider-line bottom" />
          </div>

          {/* Milestone 2: 30 October (Grand Gala) */}
          <div className="milestone-numeral-card grand-gala" onMouseEnter={() => playMicroTap()}>
            {/* Colossal Typographic Ghost Numeral */}
            <div className="numeral-ghost-backdrop highlight" aria-hidden="true">30</div>

            <div className="milestone-content-layer">
              <div className="milestone-date-header">
                <span className="milestone-roman-tag gold">CHAPTER II · GRAND GALA</span>
                <span className="milestone-date-stamp gold">30 OCTOBER 2026</span>
              </div>

              <h3 className="milestone-headline gold-glow">TEJAS ’26 — Freshers Day</h3>

              <p className="milestone-epigraph gold">
                “The Fresh Bloom.”
              </p>

              <p className="milestone-narrative">
                The grand welcoming gala hosted at <strong>JRD Tata Hall</strong>. A full-day convergence featuring traditional Odissi Mangalacharan, student talent showcases, ceremonial titles, festive lunch, and open dance arena.
              </p>

              <div className="milestone-meta-pill highlight">
                <Clock size={13} className="meta-icon gold" />
                <span>JRD Tata Hall · Doors 10:00 AM · Inaugural 10:30 AM</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
