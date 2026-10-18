# TEJAS '26 — THE FRESH BLOOM
## V3 Implementation Roadmap (Second Pass — Realistic Sequencing)
**Date:** October 2026 | **Status:** Planning Phase Only | **No Code Modified**

---

> **Honesty about this document:**
> Implementation timelines are professional estimates. They assume one developer working
> at an experienced front-end level. They do not account for unexpected SVG complexity,
> asset generation delays, or client review cycles. Every estimate should be multiplied
> by 1.5x for planning purposes.

---

## Pre-Implementation Checklist

Before writing any V3 code, confirm the following from the audit:

- [ ] `package.json` reviewed — no conflicting dependency updates needed
- [ ] `styles.css` backed up before splitting into component files
- [ ] `INTRO_STORAGE_KEY` change planned: `'tejas_intro_v2_seen'` → `'tejas_intro_v3_seen'`
- [ ] Design option decisions confirmed (see `V3_DECISION_MATRIX.md`)
- [ ] Visual direction confirmed (recommended: Imperial Restraint with selective botanical)
- [ ] Any required SVG illustrations/assets created or sourced before coding begins

---

## Phase 0 — Bug Fixes (Do First, Regardless of Design Choices)
**Estimated effort: 2–4 hours**

These fix confirmed V2 bugs and are independent of any design direction chosen.

### Task 0.1 — Skip Button
**File:** `src/components/CinematicIntro.jsx`
**Change:** Add a visible skip button to JSX. Style it with position fixed, bottom-right, z-index 10001, minimum touch target 44px.
**Evidence:** Bug confirmed at CinematicIntro.jsx lines 261–416.

### Task 0.2 — Audio Timing
**File:** `src/components/CinematicIntro.jsx` and `src/utils/audio.js`
**Change:** Remove `playCinematicSwell()` and `playRibbonMotionSweep()` from `useEffect`. Move to user-triggered handler (first click/tap on the stage).
**Evidence:** Bug confirmed at CinematicIntro.jsx lines 36–37.

### Task 0.3 — Session Storage Key
**File:** `src/main.jsx`
**Change:** Update `INTRO_STORAGE_KEY` from `'tejas_intro_v2_seen'` to `'tejas_intro_v3_seen'`.
**Evidence:** Confirmed at main.jsx line 16.

### Task 0.4 — Ribbon Z-Index / Stamp
**File:** `src/styles.css` (envelope section)
**Change:** Fix ribbon vertical band z-index or stamp position to prevent text overlap.
**Evidence:** Browser-observed overlap confirmed.

### Task 0.5 — Mobile Particle Reduction
**File:** `src/components/CinematicIntro.jsx`
**Change:** `const PARTICLE_COUNT = window.matchMedia('(max-width: 768px)').matches ? 30 : 65;`
**Evidence:** Code-verified (line 96). Performance concern on mobile.

---

## Phase 1 — CSS Architecture Refactor
**Estimated effort: 3–5 hours**

Split `src/styles.css` (4,236 lines, 89KB) into component files. No visual changes — pure organization.

### File Plan
```
src/styles/
  tokens.css          (~100 lines — all :root variables)
  base.css            (~150 lines — reset, html/body, typography globals)
  layout.css          (~100 lines — .section-container, grid utilities)
  components/
    intro.css         (~300 lines)
    hero.css          (~200 lines)
    envelope.css      (~600 lines — largest component)
    milestones.css    (~200 lines)
    agenda.css        (~400 lines)
    gallery.css       (~200 lines)
    cheers.css        (~150 lines)
    footer.css        (~100 lines)
```

### Import Structure
In `main.jsx` or a root CSS entry:
```css
@import './styles/tokens.css';
@import './styles/base.css';
@import './styles/layout.css';
@import './styles/components/intro.css';
/* etc. */
```

**Risk:** Vite handles CSS imports correctly. This change should be zero-risk if done carefully. Verify visually after each file split with a running dev server.

---

## Phase 2 — CinematicIntro V3 Redesign
**Estimated effort: 6–12 hours (depending on chosen option)**

Using the recommended Option A (Kinetic Typography):

### Task 2.1 — Remove Canvas (Optional Simplification)
Remove the canvas element and the `useEffect` canvas loop (lines 67–240 of CinematicIntro.jsx). Replace with:
- CSS-only background: `radial-gradient(ellipse at 50% 38%, #2A0612 0%, #17030A 55%, #0B0105 100%)`
- 2–3 absolutely positioned SVG decorative elements (the existing gold/rose ribbons can be retained)
- **Or**: Keep the canvas but reduce to 30 particles and pre-compute color strings

### Task 2.2 — Rebuild JSX Sequence
New phase structure:
- Phase 0 (0–0.5s): Background only
- Phase 1 (0.5–1.5s): "TEJAS" letter-by-letter stamp with clip-path reveal
- Phase 2 (1.5–2.5s): Gold rule draws across full width + "'26" drops in
- Phase 3 (2.5–3.5s): "THE FRESH BLOOM" fades up + botanical stem SVG draws itself
- Phase 4 (3.5–4.5s): Date coordinates appear (27 OCT / 30 OCT)
- Phase 5 (4.5–5.0s): Hold + skip button has been visible since 0.8s

### Task 2.3 — Botanical Stem SVG
Create a simple botanical line illustration SVG: a stem with 3 buds/leaves.
- Path: can be hand-coded or generated
- Animation: `stroke-dasharray` + `stroke-dashoffset` animated 0 → length
- Size: approximately 80px wide

### Task 2.4 — Verify Audio Fix
After phase restructuring, verify that `playCinematicSwell()` is NOT called on mount. Confirm it fires only on first user interaction.

---

## Phase 3 — Hero Section Refinement
**Estimated effort: 3–5 hours**

Using recommended Option B (Refined Split Diptych):

### Task 3.1 — Reduce Text Hierarchy
In `main.jsx` hero section:
- Remove: The 63-word invitation context paragraph (lines 98–100 of main.jsx)
- Remove: All 5 nav chips from the hero (lines 103–149 of main.jsx)
- Add: A single CTA button "Open Invitation ↓" that triggers the envelope or scrolls to it

Result: Hero left column has 3 levels: H1 → tagline → one CTA.

### Task 3.2 — Navigation Alternative
If nav chips are removed from the hero, add a minimal sticky navigation bar that appears after scrolling past the hero:
```jsx
// Sticky nav with 4 section links — appears at scroll position > hero height
```

### Task 3.3 — Hero Spacing
Increase negative space in the hero. The hero should not begin immediately — add `padding-top: 10vh` minimum.

---

## Phase 4 — Letter Layout Fix
**Estimated effort: 2–3 hours**

Using recommended Option A (Newspaper Column):

### Task 4.1 — Left-Align Letter Body
In envelope CSS (`envelope.css` after refactor):
- `.letter-body-copy` → `text-align: left`
- Set `max-width: 520px` and `margin: 0 auto` for centering the column, but text inside is left-aligned

### Task 4.2 — Two-Column Letter Layout (Desktop)
On desktop (≥ 768px):
```css
.env-letter-inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}
.letter-body-copy { grid-column: 1; }
.letter-event-coords { grid-column: 2; }
.letter-signature-block { grid-column: 1 / -1; }
```

### Task 4.3 — Drop Cap
Add a CSS drop cap for the "D" in "Dear Juniors":
```css
.letter-heading::first-letter {
  font-size: 3.5em;
  font-family: var(--font-display);
  float: left;
  line-height: 0.85;
  margin-right: 0.08em;
  color: var(--c-gold);
}
```

---

## Phase 5 — Milestones Redesign
**Estimated effort: 3–4 hours**

Using recommended Option A (Large Numeral Pair):

### Task 5.1 — Numeral Layout
```jsx
<section className="milestones-section">
  <div className="milestones-numeral-pair">
    <div className="milestone-numeral-block">
      <span className="milestone-big-date">27</span>
      <span className="milestone-month">OCTOBER</span>
      <div className="milestone-info">
        <h3>Theme & Banner Reveal</h3>
        <p>Prelude Kickoff · Department of MCA</p>
      </div>
    </div>
    <div className="milestone-separator" aria-hidden="true">◆</div>
    <div className="milestone-numeral-block highlight">
      <span className="milestone-big-date">30</span>
      <span className="milestone-month">OCTOBER</span>
      <div className="milestone-info">
        <h3>Freshers Day Gala</h3>
        <p>JRD Tata Hall · 10:00 AM</p>
      </div>
    </div>
  </div>
</section>
```

### Task 5.2 — Numeral Typography
`.milestone-big-date`: Cinzel, `font-size: clamp(120px, 18vw, 200px)`, color `rgba(212,175,55,0.15)` (near-transparent, used as decorative background type). The event info text sits on top in solid color.

---

## Phase 6 — Agenda Accordion
**Estimated effort: 4–6 hours**

Using recommended Option B (Accordion):

### Task 6.1 — Accordion Component Structure
```jsx
function AgendaSection() {
  const [openId, setOpenId] = useState(null);
  return (
    <section className="agenda-section">
      {sessions.map(session => (
        <div key={session.id} className={`agenda-accordion-item ${openId === session.id ? 'is-open' : ''}`}>
          <button
            className="agenda-accordion-trigger"
            onClick={() => setOpenId(openId === session.id ? null : session.id)}
            aria-expanded={openId === session.id}
          >
            <span className="session-time">{session.time}</span>
            <span className="session-title">{session.title}</span>
            <span className="accordion-chevron" aria-hidden="true">↓</span>
          </button>
          <div className="agenda-accordion-body">
            <p>{session.description}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
```

### Task 6.2 — Accordion Animation
Use Motion for React `AnimatePresence` + `motion.div` for height animation:
```jsx
<AnimatePresence>
  {openId === session.id && (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* body content */}
    </motion.div>
  )}
</AnimatePresence>
```

### Task 6.3 — Remove Filter Chips (Optional)
If the accordion is sufficiently scannable, the category filter chips may be removed entirely. Evaluate during implementation whether they add value or visual clutter.

---

## Phase 7 — Gallery Redesign
**Estimated effort: 4–6 hours + image generation time**

Using recommended Option A (Illustrated Gallery):

### Task 7.1 — Generate Illustrations
Create 6 editorial illustrations using the image generation tool:
- Celebration composition in burgundy/gold/ivory
- Campus aerial or architectural illustration
- Group celebration silhouette
- Botanical arrangement in TEJAS colors
- Performance/stage moment illustration
- Friendship/welcome moment illustration

Each should be clearly illustrative (not photorealistic) and in a consistent style.

### Task 7.2 — Gallery Layout
Use a 3-column CSS Grid (masonry-style) with varying heights to break the monotony of equal-size tiles.

### Task 7.3 — Section Header
Change header copy from "Campus Spirit" or similar to "A Glimpse of What Awaits" — honestly framing the images as illustrations of future moments.

---

## Phase 8 — Cheers Reaction Bar
**Estimated effort: 2–3 hours**

Using recommended Option D (Reaction Bar):

### Task 8.1 — Component
```jsx
const REACTIONS = [
  { id: 'celebration', icon: '🎉', label: 'Celebrate' },
  { id: 'bloom', icon: '🌸', label: 'Bloom' },
  { id: 'shine', icon: '✨', label: 'Shine' },
  { id: 'heart', icon: '💛', label: 'Love' },
];

function CelebrationCheers() {
  const [counts, setCounts] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('tejas_reactions') || '{}');
    } catch { return {}; }
  });

  const handleReact = (id) => {
    const newCounts = { ...counts, [id]: (counts[id] || 0) + 1 };
    setCounts(newCounts);
    try { localStorage.setItem('tejas_reactions', JSON.stringify(newCounts)); } catch {}
    // Trigger small confetti burst
  };
  // ... render
}
```

---

## Phase 9 — Closing Footer
**Estimated effort: 1–2 hours**

Using recommended Option A (Warm Letter Closure):

Minimal change — apply the same ivory parchment background color (`var(--surface-cream)`) and add warm letter sign-off text. No new components needed.

---

## Phase 10 — QA and Polish
**Estimated effort: 4–6 hours**

### Acceptance Criteria

| Area | Criteria |
|------|---------|
| Intro skip | Skip button visible within 1s on all devices |
| Intro audio | No audio plays without user gesture |
| Mobile intro | Skip button reachable at all viewport widths ≥ 320px |
| Envelope | Ribbon does not overlap brand text |
| Letter body | Left-aligned prose on all viewports |
| Hero hierarchy | Maximum 3 levels of text hierarchy |
| Accordion | All 13 sessions accessible via keyboard |
| Reaction bar | Counts persist across page refresh |
| Closing | Footer sign-off matches letter visual language |
| Contrast | All text elements pass WCAG 4.5:1 ratio |
| Performance | Lighthouse score ≥ 85 on mobile (Performance category) |
| Session key | `tejas_intro_v2_seen` no longer used |

### Testing Devices / Viewports
- iPhone SE (375×667) — smallest common mobile
- iPhone 14 (390×844) — representative mid-size mobile
- Samsung Galaxy A-series (360×800) — common Indian Android
- iPad (768×1024) — tablet breakpoint
- Desktop 1280px — standard laptop
- Desktop 1920px — large monitor

---

## Estimated Total Effort

| Phase | Hours (realistic) |
|-------|------------------|
| 0: Bug Fixes | 2–4 |
| 1: CSS Architecture | 3–5 |
| 2: CinematicIntro V3 | 6–12 |
| 3: Hero Refinement | 3–5 |
| 4: Letter Fix | 2–3 |
| 5: Milestones | 3–4 |
| 6: Agenda Accordion | 4–6 |
| 7: Gallery | 4–6 |
| 8: Cheers | 2–3 |
| 9: Footer | 1–2 |
| 10: QA | 4–6 |
| **Total** | **34–56 hours** |

**With 1.5x planning buffer: 51–84 hours**

This is a realistic estimate for a complete V3 rebuild of all sections. If time is limited, Phase 0 (Bug Fixes) delivers the highest impact per hour invested.

---

*This roadmap is organized by impact priority. Phase 0 should always be done first because it fixes confirmed functional bugs that make V2 unusable on mobile. The remaining phases can be done in any order, though Phase 1 (CSS architecture) ideally comes before Phase 2+ to avoid making changes in a monolithic 4,236-line file.*
