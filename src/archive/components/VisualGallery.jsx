import React, { useRef, useState } from 'react';
import {
  Play, Pause, Flame, Image as ImageIcon, Film,
  Heart, Sparkles, Maximize2, X, ChevronRight, Compass,
  Users, Code2, Music
} from 'lucide-react';
import { playMicroTap } from '../utils/audio';

const GALLERY_STORIES = [
  {
    id: 'bloom',
    type: 'image',
    src: '/tejas-bloom-editorial.jpg',
    badge: 'BOTANICAL HERITAGE · THE FRESH BLOOM',
    title: 'The Fresh Bloom Emblem',
    quote: '“A flower does not think of competing with the flower next to it. It just blooms.”',
    desc: 'Handcrafted botanical woodcut centerpiece celebrating the spirit of renewal, fresh camaraderie, and radiant intellectual growth welcoming the incoming MCA batch.',
    tags: ['Botanical Emblem', 'Rose Filigree', 'The Fresh Bloom']
  },
  {
    id: 'video',
    type: 'video',
    src: '/crowd-cheering.mp4',
    poster: '/tejas-bloom-editorial.jpg',
    badge: 'GRAND FINALE · DJ ARENA',
    title: 'The Celebration Floor',
    quote: '“When the formalities end, the celebration takes over.”',
    desc: 'Dynamic club beats, pulsating laser illuminations, and collective euphoria celebrating your official induction into the MCA family.',
    tags: ['Live Student DJ', 'Dance Floor Arena', 'Laser Light Show']
  },
  {
    id: 'campus',
    type: 'image',
    src: '/tejas-campus-editorial.jpg',
    badge: 'CAMPUS SANCTUARY · SRUSTI ACADEMY',
    title: 'The Campus Sanctuary',
    quote: '“A sanctuary of learning, creative curiosity, and lasting mentorship.”',
    desc: 'The architectural entrance of Srusti Academy framed in classical botanical filigree, where students gather across lecture halls, collaborative hubs, and serene courtyards.',
    tags: ['Patia Campus', 'JRD Tata Hall', 'Academic Life']
  },
  {
    id: 'culture',
    type: 'image',
    src: '/tejas-culture-editorial.jpg',
    badge: 'SACRED TRADITION · INVOCATION',
    title: 'Odissi Heritage & Sacred Benediction',
    quote: '“Classical grace and auspicious beginnings rooted in Odia heritage.”',
    desc: 'Steeped in timeless Odia artistic heritage, the Freshers Day opens with traditional Mangalacharan brass lamp lighting and classical Odissi recital invoking divine wisdom.',
    tags: ['Classical Mangalacharan', 'Brass Diyas', 'Cultural Benediction']
  },
  {
    id: 'tech',
    type: 'image',
    src: '/mca-builders.jpg',
    badge: 'INNOVATION & CODE · MCA CRAFT',
    title: 'Builders of Tomorrow',
    quote: '“A fraternity of problem solvers, creative minds, and future tech leaders.”',
    desc: 'Where analytical discipline meets creative engineering. Collaborative computer labs, algorithmic brainstorming, and cutting-edge software craft preparing curious minds to lead India’s tech future.',
    tags: ['Software Architects', 'Creative Engineering', 'Future Leaders']
  },
  {
    id: 'fellowship',
    type: 'image',
    src: '/freshers-editorial.png',
    badge: 'FELLOWSHIP · LIFELONG BONDS',
    title: 'The Senior-Junior Confluence',
    quote: '“People who become teammates, hackathon partners, and friends for life.”',
    desc: 'More than classrooms and lectures — the MCA journey is defined by the peers standing beside you. Future hackathon teammates, research partners, and lifelong confidants connecting on day one.',
    tags: ['Batch 2026–2028', 'Senior Mentorship', 'Academic Camaraderie']
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
    <section className="visual-gallery-section" id="gallery" aria-label="Visual Gallery: A Glimpse of What Awaits">
      <div className="section-container">
        {/* Curated Editorial Header */}
        <div className="gallery-master-header">
          <div className="gallery-eyebrow-pill">
            <span className="pill-dot">✦</span>
            <span>VISUAL INTELLIGENCE · THE FRESH BLOOM</span>
            <span className="pill-dot">✦</span>
          </div>

          <h2 className="gallery-master-title">
            A Glimpse of What Awaits
          </h2>

          <p className="gallery-master-description">
            An artistic editorial preview capturing the spirit of renewal, classical stagecraft, fellowship, and celebration welcoming Batch 2026–2028 into the MCA family.
          </p>
        </div>

        {/* 3-Column Art-Directed Curated Grid */}
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

                {/* Card Editorial Caption Block */}
                <div className="gallery-card-content">
                  <h3 className="gallery-card-title">
                    {item.title}
                  </h3>

                  <p className="gallery-card-quote">
                    {item.quote}
                  </p>

                  <p className="gallery-card-desc">
                    {item.desc}
                  </p>

                  <div className="gallery-tags-row">
                    {item.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="gallery-tag-pill">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Interactive Lightbox Modal */}
      {lightboxItem && (
        <div
          className="gallery-lightbox-backdrop"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label={lightboxItem.title}
        >
          <div className="lightbox-container" onClick={(e) => e.stopPropagation()}>
            <button
              className="lightbox-close-btn"
              onClick={closeLightbox}
              aria-label="Close modal viewer"
            >
              <X size={20} />
            </button>

            <div className="lightbox-media-col">
              {lightboxItem.type === 'video' ? (
                <video
                  src={lightboxItem.src}
                  controls
                  autoPlay
                  playsInline
                  className="lightbox-media-element"
                />
              ) : (
                <img
                  src={lightboxItem.src}
                  alt={lightboxItem.title}
                  className="lightbox-media-element"
                />
              )}
            </div>

            <div className="lightbox-info-col">
              <span className="lightbox-badge-pill">{lightboxItem.badge}</span>
              <h3 className="lightbox-title">{lightboxItem.title}</h3>
              <p className="lightbox-quote">{lightboxItem.quote}</p>
              <p className="lightbox-desc">{lightboxItem.desc}</p>

              <div className="lightbox-tags-block">
                {lightboxItem.tags.map((tag, idx) => (
                  <span key={idx} className="lightbox-tag-pill">✦ {tag}</span>
                ))}
              </div>

              <div className="lightbox-footer-note">
                <span>DEPARTMENT OF MCA · TEJAS ’26 ARCHIVE</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
