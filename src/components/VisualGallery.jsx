import React, { useRef, useState } from 'react';
import {
  Play, Pause, Flame, Image as ImageIcon, Film,
  Heart, Sparkles, Maximize2, X, ChevronRight, Compass,
  Users, Code2, Music
} from 'lucide-react';
import { playMicroTap } from '../utils/audio';

const GALLERY_STORIES = [
  {
    id: 'video',
    type: 'video',
    src: '/crowd-cheering.mp4',
    poster: '/freshers-editorial.png',
    badge: 'GRAND FINALE · DJ ARENA',
    eyebrow: 'ACT III · CELEBRATION CLIMAX',
    title: 'The Celebration Floor',
    quote: '“When the formalities end, the celebration takes over.”',
    desc: 'When the formal proceedings conclude, the auditorium transforms into an electric arena. Pumping bass, dynamic laser illuminations, and collective euphoria celebrating your official induction into the MCA family.',
    tags: ['Live Student DJ', 'Laser Illuminations', 'Open Dance Arena']
  },
  {
    id: 'fellowship',
    type: 'image',
    src: '/freshers-editorial.png',
    badge: 'CAMPUS COMMUNITY',
    eyebrow: 'FELLOWSHIP & LIFELONG BONDS',
    title: 'The Fresh Bloom Cohort',
    quote: '“People who become teammates, hackathon partners, and friends for life.”',
    desc: 'More than lectures and algorithms — the MCA journey is defined by the peers standing beside you. Future hackathon teammates, research partners, and lifelong confidants connecting on day one.',
    tags: ['Batch 2026–2028', 'Senior Mentorship', 'Academic Camaraderie']
  },
  {
    id: 'culture',
    type: 'image',
    src: '/odissi-dance.jpg',
    badge: 'SACRED TRADITION',
    eyebrow: 'INAUGURAL BENEDICTION',
    title: 'Odissi & Cultural Heritage',
    quote: '“Inaugural lamp lighting & classical Odissi invocations welcoming the freshers.”',
    desc: 'Steeped in timeless Odia artistic heritage, the celebration begins with auspicious Mangalacharan lamp lighting and a spellbinding Odissi recital invoking divine wisdom for the academic chapter ahead.',
    tags: ['Classical Mangalacharan', 'Traditional Brass Diyas', 'Cultural Benediction']
  },
  {
    id: 'tech',
    type: 'image',
    src: '/mca-builders.jpg',
    badge: 'INNOVATION & CODE',
    eyebrow: 'DEPARTMENT OF COMPUTER APPLICATIONS',
    title: 'Builders of Tomorrow',
    quote: '“A fraternity of problem solvers, creative minds, and future tech leaders.”',
    desc: 'Where analytical discipline meets creative engineering. Collaborative computer labs, algorithmic brainstorming, and cutting-edge software craft preparing curious minds to lead India’s tech future.',
    tags: ['Collaborative Labs', 'Software Architects', 'Creative Engineering']
  }
];

export default function VisualGallery() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [lightboxItem, setLightboxItem] = useState(null);

  const toggleVideo = (e) => {
    e.stopPropagation();
    playMicroTap();
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const openLightbox = (item) => {
    playMicroTap();
    setLightboxItem(item);
  };

  const closeLightbox = () => {
    playMicroTap();
    setLightboxItem(null);
  };

  return (
    <section className="visual-gallery-section" id="gallery" aria-label="Campus Spirit and Culture Gallery">
      <div className="section-container">
        {/* Curated Editorial Header */}
        <div className="gallery-master-header">
          <div className="gallery-eyebrow-pill">
            <span className="pill-dot">◆</span>
            <span>CAMPUS SPIRIT &amp; CULTURE</span>
            <span className="pill-dot">◆</span>
          </div>

          <h2 className="gallery-master-title">
            The Spirit of TEJAS
          </h2>

          <p className="gallery-master-description">
            A celebration of new beginnings, student camaraderie, timeless stagecraft, and the vibrant intellectual life of the MCA family at Srusti Academy.
          </p>
        </div>

        {/* 2x2 Art-Directed Curated Grid */}
        <div className="gallery-curated-grid">
          {GALLERY_STORIES.map((item) => {
            const isVideo = item.type === 'video';

            return (
              <article
                key={item.id}
                className={`gallery-card card-${item.id}`}
                onClick={() => openLightbox(item)}
              >
                {/* Media Wrapper */}
                <div className="gallery-media-wrapper">
                  {isVideo ? (
                    <>
                      <video
                        ref={videoRef}
                        src={item.src}
                        poster={item.poster}
                        loop
                        muted
                        playsInline
                        className="gallery-media-asset"
                      />
                      <div className="gallery-video-overlay" onClick={toggleVideo}>
                        <button
                          className="video-play-btn"
                          aria-label={isPlaying ? "Pause celebration video" : "Play celebration video"}
                        >
                          {isPlaying ? <Pause size={20} /> : <Play size={20} className="icon-play" />}
                        </button>
                        <div className="video-meta-tag">
                          <Film size={13} />
                          <span>Click to {isPlaying ? 'Pause' : 'Play'} Video</span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <img
                        src={item.src}
                        alt={item.title}
                        className="gallery-media-asset"
                        loading="lazy"
                      />
                      <div className="gallery-image-overlay" />
                    </>
                  )}

                  {/* Floating Gilded Badge */}
                  <div className="gallery-badge-overlay">
                    <span>{item.badge}</span>
                  </div>

                  {/* Expand / Inspect Indicator */}
                  <div className="gallery-zoom-indicator" aria-hidden="true">
                    <Maximize2 size={14} />
                  </div>
                </div>

                {/* Content Area */}
                <div className="gallery-card-content">
                  <span className="gallery-card-eyebrow">{item.eyebrow}</span>
                  <h3 className="gallery-card-heading">{item.title}</h3>

                  <blockquote className="gallery-card-quote">
                    {item.quote}
                  </blockquote>

                  <p className="gallery-card-text">
                    {item.desc}
                  </p>

                  {/* Curated Highlight Tags */}
                  <div className="gallery-tags-row">
                    {item.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="gallery-tag-pill">
                        <span className="tag-gem">✦</span>
                        <span>{tag}</span>
                      </span>
                    ))}
                  </div>

                  <div className="gallery-card-footer">
                    <span className="view-story-link">
                      <span>View full visual story</span>
                      <ChevronRight size={13} className="story-arrow" />
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxItem && (
        <div
          className="gallery-lightbox-backdrop"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label={lightboxItem.title}
        >
          <div
            className="gallery-lightbox-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="lightbox-close-btn"
              onClick={closeLightbox}
              aria-label="Close modal"
            >
              <X size={18} />
            </button>

            <div className="lightbox-media-box">
              {lightboxItem.type === 'video' ? (
                <video
                  src={lightboxItem.src}
                  controls
                  autoPlay
                  className="lightbox-media-asset"
                />
              ) : (
                <img
                  src={lightboxItem.src}
                  alt={lightboxItem.title}
                  className="lightbox-media-asset"
                />
              )}
            </div>

            <div className="lightbox-details-box">
              <span className="lightbox-badge">{lightboxItem.badge}</span>
              <h3 className="lightbox-title">{lightboxItem.title}</h3>
              <p className="lightbox-quote">{lightboxItem.quote}</p>
              <p className="lightbox-description">{lightboxItem.desc}</p>
              <div className="lightbox-tags">
                {lightboxItem.tags.map((tag, i) => (
                  <span key={i} className="gallery-tag-pill">
                    <span className="tag-gem">✦</span>
                    <span>{tag}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
