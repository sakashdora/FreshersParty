import React from 'react';
import {
  ArrowUp, Calendar, MapPin, ExternalLink,
  Clock, Compass, Award, Mail, Phone, ChevronRight
} from 'lucide-react';
import { playMicroTap } from '../utils/audio';

export default function ClosingSignOff() {
  const scrollToTop = () => {
    playMicroTap();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = () => {
    playMicroTap();
  };

  return (
    <footer className="closing-signoff-section" role="contentinfo" aria-label="Department Sign-off & Footer">
      {/* Top Ambient Glow Line */}
      <div className="signoff-top-border" aria-hidden="true" />

      <div className="section-container">
        {/* Master Seal & Crest Centerpiece */}
        <div className="signoff-brand-marquee">
          <div className="signoff-hallmark-crest" aria-hidden="true">
            <div className="crest-hairline left" />
            <div className="crest-insignia-pill">
              <span className="crest-roman">MMXXVI</span>
              <span className="crest-star">◆</span>
              <span className="crest-cohort">MCA SENIOR COUNCIL</span>
              <span className="crest-star">◆</span>
              <span className="crest-city">BHUBANESWAR</span>
            </div>
            <div className="crest-hairline right" />
          </div>

          <h2 className="signoff-grand-title">
            TEJAS <span className="signoff-year-gold">’26</span>
          </h2>
          <p className="signoff-thematic-tagline">
            The Fresh Bloom · Senior Welcoming Gala
          </p>
          <p className="signoff-dedication-note">
            Presented with affection, honor, and solidarity by the senior MCA batch for our incoming juniors of Batch 2026–2028.
          </p>
        </div>

        {/* Multi-Column Architectural Footer Grid */}
        <div className="signoff-editorial-grid">
          {/* Column 1: Institution & Patronage */}
          <div className="signoff-grid-col col-institution">
            <span className="col-eyebrow">HOST INSTITUTION</span>
            <h3 className="col-heading">Department of Computer Applications</h3>
            <p className="col-subheading">
              Srusti Academy of Management &amp; Technology
            </p>
            <p className="col-meta-text">
              Approved by AICTE, New Delhi · Affiliated to Biju Patnaik University of Technology (BPUT), Odisha.
            </p>

            <div className="institution-address-card">
              <MapPin size={14} className="address-icon" />
              <div className="address-lines">
                <span>Plot No. 38/1, Chandaka Industrial Estate</span>
                <span>Near Infocity, Patia, Bhubaneswar, Odisha 751024</span>
              </div>
            </div>

            <a
              href="https://maps.google.com/?q=Srusti+Academy+of+Management+Bhubaneswar"
              target="_blank"
              rel="noopener noreferrer"
              className="signoff-map-link"
              onClick={handleNavClick}
            >
              <span>View Campus on Google Maps</span>
              <ExternalLink size={12} />
            </a>
          </div>

          {/* Column 2: Event Coordinates & Protocol */}
          <div className="signoff-grid-col col-coordinates">
            <span className="col-eyebrow">CELEBRATION DATES</span>
            <h3 className="col-heading">Event Schedule &amp; Protocol</h3>

            <div className="footer-coord-card">
              <div className="coord-date-badge">27 OCT</div>
              <div className="coord-info">
                <strong>Theme &amp; Banner Reveal</strong>
                <span>Official Prelude &amp; Campus Campaign Kickoff</span>
              </div>
            </div>

            <div className="footer-coord-card primary">
              <div className="coord-date-badge gold">30 OCT</div>
              <div className="coord-info">
                <strong>Freshers Day Grand Gala</strong>
                <span>10:00 AM – 5:00 PM · JRD Tata Hall</span>
              </div>
            </div>

            <div className="footer-dress-code">
              <Award size={14} className="dress-icon" />
              <span><strong>Dress Code:</strong> Royal Ethnic / Formal Elegance</span>
            </div>
          </div>

          {/* Column 3: Quick Navigation */}
          <div className="signoff-grid-col col-navigation">
            <span className="col-eyebrow">EXPLORE INVITATION</span>
            <h3 className="col-heading">Experience Navigation</h3>

            <nav className="signoff-nav-list" aria-label="Footer quick navigation">
              <a href="#invitation-envelope" className="footer-nav-link" onClick={handleNavClick}>
                <ChevronRight size={12} className="link-arrow" />
                <span>The Royal Invitation Letter</span>
              </a>
              <a href="#milestones" className="footer-nav-link" onClick={handleNavClick}>
                <ChevronRight size={12} className="link-arrow" />
                <span>Two Celebration Milestones</span>
              </a>
              <a href="#agenda-flow" className="footer-nav-link" onClick={handleNavClick}>
                <ChevronRight size={12} className="link-arrow" />
                <span>Master Programme Itinerary (13 Sessions)</span>
              </a>
              <a href="#gallery" className="footer-nav-link" onClick={handleNavClick}>
                <ChevronRight size={12} className="link-arrow" />
                <span>Campus Spirit &amp; Moments</span>
              </a>
              <a href="#celebration-cheers" className="footer-nav-link" onClick={handleNavClick}>
                <ChevronRight size={12} className="link-arrow" />
                <span>Sound the Batch Cheers</span>
              </a>
            </nav>

            <button
              className="signoff-scroll-top-btn"
              onClick={scrollToTop}
              aria-label="Scroll back to top of invitation"
            >
              <span>Back to Top of Page</span>
              <ArrowUp size={14} />
            </button>
          </div>
        </div>

        {/* Gilded Divider */}
        <div className="signoff-bottom-hairline">
          <span className="hairline-rail" />
          <span className="hairline-gem">◆</span>
          <span className="hairline-rail" />
        </div>

        {/* Bottom Architectural Credential Row */}
        <div className="signoff-bottom-bar">
          <p className="copyright-statement">
            © 2026 Department of Computer Applications · Srusti Academy of Management &amp; Technology.
            <span className="sep-dot">·</span>
            Curated by the Senior MCA Batch for Incoming Juniors (2026–2028).
          </p>

          <div className="signoff-cohort-tag">
            <span>TEJAS ’26 · BHUBANESWAR, ODISHA</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
