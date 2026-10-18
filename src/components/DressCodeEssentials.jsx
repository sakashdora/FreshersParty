import React from 'react';
import { motion } from 'motion/react';
import { Info, Calendar, MapPin, Clock, Utensils } from 'lucide-react';

export default function DressCodeEssentials() {
  const dressCodeItems = [
    {
      id: 'junior-boys',
      title: 'Juniors Boys',
      outfit: 'White Shirts & Blue Jeans',
      image: '/dress_junior_boy.jpg'
    },
    {
      id: 'junior-girls',
      title: 'Juniors Girls',
      outfit: 'Anarkali',
      image: '/dress_junior_girl.jpg'
    },
    {
      id: 'senior-boys',
      title: 'Seniors Boys',
      outfit: 'Kurta',
      image: '/dress_senior_boy.jpg'
    },
    {
      id: 'senior-girls',
      title: 'Seniors Girls',
      outfit: 'Saree',
      image: '/dress_senior_girl_v2.jpg'
    }
  ];

  const essentials = [
    {
      id: 'date',
      icon: Calendar,
      title: '28 October 2026',
      subtitle: 'Event Date'
    },
    {
      id: 'venue',
      icon: MapPin,
      title: 'JRD Tata Hall',
      subtitle: 'Venue'
    },
    {
      id: 'time',
      icon: Clock,
      title: '11:40 AM',
      subtitle: 'Reporting Time'
    },
    {
      id: 'lunch',
      icon: Utensils,
      title: '12:30 PM',
      subtitle: 'Lunch Break'
    }
  ];

  return (
    <section 
      id="dress-code-essentials" 
      className="essentials-section" 
      aria-label="Dress Code and Event Essentials"
    >
      {/* Decorative Golden Floral Corner Filigrees */}
      <div className="essentials-corner-ornament top-left" aria-hidden="true">
        <svg viewBox="0 0 160 160" fill="none" className="corner-filigree-svg">
          <path d="M 0 0 C 40 10 90 20 120 60 C 135 80 150 120 160 160" stroke="url(#essentialsGoldGrad)" strokeWidth="1.2" opacity="0.4" />
          <path d="M 0 30 C 50 40 80 60 100 110" stroke="url(#essentialsGoldGrad)" strokeWidth="0.8" opacity="0.3" />
          <path d="M 30 0 C 40 50 60 80 110 100" stroke="url(#essentialsGoldGrad)" strokeWidth="0.8" opacity="0.3" />
          <path d="M 60 35 C 80 25 90 40 70 50 C 60 45 60 38 60 35 Z" fill="url(#essentialsGoldGrad)" opacity="0.35" />
          <path d="M 35 60 C 25 80 40 90 50 70 C 45 60 38 60 35 60 Z" fill="url(#essentialsGoldGrad)" opacity="0.35" />
          <path d="M 95 65 C 115 55 125 70 105 80 C 95 75 95 68 95 65 Z" fill="url(#essentialsGoldGrad)" opacity="0.4" />
          <path d="M 65 95 C 55 115 70 125 80 105 C 75 95 68 95 65 95 Z" fill="url(#essentialsGoldGrad)" opacity="0.4" />
          <defs>
            <linearGradient id="essentialsGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF2CC" />
              <stop offset="50%" stopColor="#D4A030" />
              <stop offset="100%" stopColor="#7A5010" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="essentials-corner-ornament top-right" aria-hidden="true">
        <svg viewBox="0 0 160 160" fill="none" className="corner-filigree-svg">
          <path d="M 160 0 C 120 10 70 20 40 60 C 25 80 10 120 0 160" stroke="url(#essentialsGoldGrad)" strokeWidth="1.2" opacity="0.4" />
          <path d="M 160 30 C 110 40 80 60 60 110" stroke="url(#essentialsGoldGrad)" strokeWidth="0.8" opacity="0.3" />
          <path d="M 130 0 C 120 50 100 80 50 100" stroke="url(#essentialsGoldGrad)" strokeWidth="0.8" opacity="0.3" />
          <path d="M 100 35 C 80 25 70 40 90 50 C 100 45 100 38 100 35 Z" fill="url(#essentialsGoldGrad)" opacity="0.35" />
          <path d="M 125 60 C 135 80 120 90 110 70 C 115 60 122 60 125 60 Z" fill="url(#essentialsGoldGrad)" opacity="0.35" />
          <path d="M 65 65 C 45 55 35 70 55 80 C 65 75 65 68 65 65 Z" fill="url(#essentialsGoldGrad)" opacity="0.4" />
          <path d="M 95 95 C 105 115 90 125 80 105 C 85 95 92 95 95 95 Z" fill="url(#essentialsGoldGrad)" opacity="0.4" />
        </svg>
      </div>

      <div className="essentials-inner">
        {/* Section Header */}
        {/* Section Header */}
        <div className="essentials-header-block">
          <div className="essentials-eyebrow">
            <span className="eyebrow-bullet">·</span>
            <span>DRESS CODE &amp; EVENT ESSENTIALS</span>
            <span className="eyebrow-bullet">·</span>
          </div>

          <h2 className="essentials-main-title">
            DRESS CODE &amp; EVENT ESSENTIALS
          </h2>

          <p className="essentials-lead">
            Come dressed in your best and be a part of this memorable celebration.<br />
            Here’s everything you need to know for a seamless experience.
          </p>
        </div>

        {/* Master Two-Panel Showcase Grid */}
        <div className="essentials-grid">
          {/* Left Panel: DRESS CODE */}
          <div className="essentials-panel dress-code-panel">
            <div className="panel-header">
              <div className="panel-title-row">
                {/* Custom Hanger Icon */}
                <svg className="panel-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a3 3 0 0 0-3 3c0 .8.3 1.5.8 2.1L2.4 15.6A2 2 0 0 0 4 19h16a2 2 0 0 0 1.6-3.4L14.2 7.1c.5-.6.8-1.3.8-2.1a3 3 0 0 0-3-3z"/>
                  <line x1="2" y1="19" x2="22" y2="19"/>
                </svg>
                <h3 className="panel-title">DRESS CODE</h3>
              </div>
              <p className="panel-subtitle">
                Let’s keep it elegant, traditional and picture-perfect.
              </p>
            </div>

            {/* 4 Dress Cards */}
            <div className="dress-cards-row">
              {dressCodeItems.map((item) => (
                <div 
                  key={item.id}
                  className="dress-card"
                >
                  <div className="dress-card-arch">
                    <div className="dress-card-inner-frame" />
                    <img 
                      src={item.image} 
                      alt={`${item.title} outfit: ${item.outfit}`} 
                      className="dress-character-img"
                      loading="eager"
                    />
                    <div className="dress-card-scrim" />
                  </div>

                  <div className="dress-card-info">
                    <h4 className="dress-card-title">{item.title}</h4>
                    <p className="dress-card-outfit">{item.outfit}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Panel: EVENT ESSENTIALS */}
          <div className="essentials-panel event-details-panel">
            <div className="panel-header">
              <div className="panel-title-row">
                <div className="panel-info-circle">
                  <Info size={17} />
                </div>
                <h3 className="panel-title">EVENT ESSENTIALS</h3>
              </div>
              <p className="panel-subtitle">
                Key details at a glance.
              </p>
            </div>

            {/* 4 Vertical Info Rows */}
            <div className="essentials-rows-list">
              {essentials.map((item) => {
                const IconComponent = item.icon;
                return (
                  <div 
                    key={item.id}
                    className="essential-info-tile"
                  >
                    <div className="tile-icon-box">
                      <IconComponent size={20} className="tile-icon" />
                    </div>
                    <div className="tile-content">
                      <strong className="tile-value">{item.title}</strong>
                      <span className="tile-label">{item.subtitle}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
