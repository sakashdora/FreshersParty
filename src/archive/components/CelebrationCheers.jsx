import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { playMicroTap } from '../utils/audio';

const STORAGE_KEY = 'tejas_reactions_v3';

const DEFAULT_REACTIONS = [
  {
    id: 'celebrate',
    emoji: '🎉',
    label: "Can't wait to attend!",
    sublabel: 'Count me in for 30th October',
    count: 218
  },
  {
    id: 'bloom',
    emoji: '🌸',
    label: 'The Fresh Bloom vibe',
    sublabel: 'Royal ethnic wear ready',
    count: 264
  },
  {
    id: 'memories',
    emoji: '✨',
    label: 'Making batch memories',
    sublabel: 'New college chapter begins',
    count: 231
  },
  {
    id: 'seniors',
    emoji: '💛',
    label: 'Meeting the seniors',
    sublabel: 'Mentorship & camaraderie',
    count: 295
  }
];

export default function CelebrationCheers() {
  const [reactions, setReactions] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return DEFAULT_REACTIONS.map((r) => ({
          ...r,
          count: parsed[r.id] !== undefined ? parsed[r.id] : r.count
        }));
      }
    } catch (e) {}
    return DEFAULT_REACTIONS;
  });

  const [clickedMap, setClickedMap] = useState(() => {
    try {
      const savedClicked = localStorage.getItem(`${STORAGE_KEY}_clicked`);
      if (savedClicked) return JSON.parse(savedClicked);
    } catch (e) {}
    return {};
  });

  const [floatingEmotes, setFloatingEmotes] = useState([]);

  const totalCheers = reactions.reduce((sum, r) => sum + r.count, 0);

  const spawnFloatingEmotes = (emoji) => {
    const burstCount = 3;
    const newItems = Array.from({ length: burstCount }, (_, i) => ({
      id: `${Date.now()}_${Math.random()}_${i}`,
      emoji,
      left: 20 + Math.random() * 60,
      drift: (Math.random() - 0.5) * 60,
      size: 22 + Math.random() * 14,
      delay: i * 80
    }));

    setFloatingEmotes((prev) => [...prev.slice(-12), ...newItems]);

    setTimeout(() => {
      const itemIds = new Set(newItems.map((n) => n.id));
      setFloatingEmotes((prev) => prev.filter((e) => !itemIds.has(e.id)));
    }, 1800);
  };

  const handleCheer = (id, emoji) => {
    playMicroTap();

    // Trigger palette confetti burst with Imperial Velvet Wine & Solar Gold
    confetti({
      particleCount: 55,
      spread: 70,
      origin: { y: 0.78 },
      colors: ['#C89B38', '#520D22', '#E5B957', '#FCE7A2', '#FAF8F4', '#941D3E']
    });

    // Spawn floating reaction particle geyser
    spawnFloatingEmotes(emoji);

    const updated = reactions.map((r) =>
      r.id === id ? { ...r, count: r.count + 1 } : r
    );
    setReactions(updated);

    const updatedClicked = { ...clickedMap, [id]: (clickedMap[id] || 0) + 1 };
    setClickedMap(updatedClicked);

    try {
      const countMap = updated.reduce((acc, r) => ({ ...acc, [r.id]: r.count }), {});
      localStorage.setItem(STORAGE_KEY, JSON.stringify(countMap));
      localStorage.setItem(`${STORAGE_KEY}_clicked`, JSON.stringify(updatedClicked));
    } catch (e) {}
  };

  return (
    <section className="celebration-cheers-section" id="celebration-cheers" aria-label="Student Excitement & Reactions">
      {/* Background Ambient Spotlight */}
      <div className="cheers-ambient-spotlight" aria-hidden="true" />

      {/* Floating Reaction Emote Particles */}
      <div className="cheers-particles-canvas" aria-hidden="true">
        {floatingEmotes.map((item) => (
          <span
            key={item.id}
            className="floating-emote-particle"
            style={{
              left: `${item.left}%`,
              fontSize: `${item.size}px`,
              '--drift': `${item.drift}px`,
              animationDelay: `${item.delay}ms`
            }}
          >
            {item.emoji}
          </span>
        ))}
      </div>

      <div className="section-container">
        <div className="cheers-card-wrap">
          {/* Section Header */}
          <div className="cheers-header">
            <div className="cheers-eyebrow">
              <span className="accent-tag-diamond">◆</span>
              <span>LIVE CELEBRATION PULSE</span>
              <span className="accent-tag-diamond">◆</span>
            </div>

            <h3 className="cheers-title">Send Your Excitement</h3>

            <p className="cheers-desc">
              Tap any reaction to share your energy for Freshers Day. Every tap updates the collective campus excitement tally in real time.
            </p>

            <div className="cheers-live-counter">
              <span className="live-dot" aria-hidden="true" />
              <span><strong>{totalCheers.toLocaleString()}</strong> cheers sent by MCA freshers &amp; seniors</span>
            </div>
          </div>

          {/* Interactive Excitement Reaction Pods */}
          <div className="cheers-buttons-grid">
            {reactions.map((reaction) => {
              const clickCount = clickedMap[reaction.id] || 0;
              const hasClicked = clickCount > 0;
              const percentage = totalCheers > 0 ? Math.round((reaction.count / totalCheers) * 100) : 25;

              return (
                <button
                  key={reaction.id}
                  type="button"
                  className={`cheer-badge-btn ${hasClicked ? 'is-clicked' : ''}`}
                  onClick={() => handleCheer(reaction.id, reaction.emoji)}
                  aria-label={`${reaction.label}, ${reaction.count} cheers recorded`}
                >
                  <div className="cheer-btn-top">
                    <div className="cheer-emoji-box" aria-hidden="true">
                      <span>{reaction.emoji}</span>
                    </div>

                    <div className="cheer-text-col">
                      <div className="cheer-title-row">
                        <span className="cheer-label">{reaction.label}</span>
                        {clickCount > 0 && (
                          <span className="user-tap-badge" title="Your taps">+{clickCount}</span>
                        )}
                      </div>
                      <span className="cheer-sublabel">{reaction.sublabel}</span>
                    </div>
                  </div>

                  {/* Energy Barometer Meter */}
                  <div className="cheer-meter-wrap" aria-hidden="true">
                    <div className="cheer-meter-track">
                      <div
                        className="cheer-meter-fill"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <div className="cheer-meter-meta">
                      <span className="cheer-count-text">{reaction.count} cheers</span>
                      <span className="cheer-percent-text">{percentage}% energy</span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

