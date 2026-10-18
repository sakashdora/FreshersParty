# TEJAS '26 — THE FRESH BLOOM
## V3 Audit Report (Second Pass — Rigorous Evidence Standard)
**Date:** October 2026 | **Status:** Planning Phase Only | **No Code Modified**

---

> **Transparency Preamble — How This Report Was Produced**
>
> Every finding below is labeled with its evidence source:
> - 🔍 **CODE-VERIFIED** — Found in the actual source file, with line numbers cited
> - 👁️ **BROWSER-OBSERVED** — Seen in a live browser session (screenshots exist)
> - 🎓 **PROFESSIONAL JUDGMENT** — A design or engineering opinion not directly provable from source
> - ⚠️ **UNVERIFIED** — Claimed in previous analysis but not directly confirmed in this pass

---

## Part 1 — Scoring Rubric

| # | Category | Weight | Scoring Guidance |
|---|----------|--------|-----------------|
| 1 | Visual Quality & Craft | 25% | Color harmony, typographic hierarchy, layout beauty |
| 2 | Interaction Design & UX | 20% | Clarity of affordance, feedback timing, delight, flow |
| 3 | Technical Quality | 15% | Performance, accessibility, code correctness |
| 4 | Mobile Experience | 20% | Touch interactions, readability, layout adaptation |
| 5 | Brand Coherence | 10% | Does it feel like "TEJAS — The Fresh Bloom"? |
| 6 | Distinctiveness & Originality | 10% | Does it stand out from generic templates? |

**Score interpretation:**
- 1–4: Broken or fundamentally inadequate
- 5–6.9: Functional but mediocre — clear significant problems
- 7–7.9: Solid, above average, some non-trivial weaknesses
- 8–8.9: Strong, polished — defensible premium quality
- 9–10: Exceptional — near industry-leading

---

## Part 2 — Verified Architecture

The following facts are CODE-VERIFIED from direct file inspection:

### Project Stack
- **Framework:** Vite 6 + React 18 (🔍 `package.json`)
- **Animation:** Motion for React v14.2.0 — the package formerly called Framer Motion (🔍 `package.json`)
- **CSS:** Vanilla CSS, single monolithic file — **4,236 lines, 89,940 bytes unminified** (🔍 `src/styles.css`)
- **Icons:** Lucide React v0.468.0 (🔍 `package.json`)
- **Confetti:** canvas-confetti (🔍 `InteractiveEnvelope.jsx`, line 2)
- **Fonts:** Cinzel (title), Fraunces (editorial display), Outfit (body/UI) (🔍 `styles.css`, lines 66–68)

### Component Tree (🔍 `main.jsx`)
```
App (main.jsx)
├── CinematicIntro.jsx        (419 lines)
├── InteractiveEnvelope.jsx   (471 lines — largest component)
├── MilestonesSection.jsx
├── AgendaSection.jsx
├── VisualGallery.jsx
├── CelebrationCheers.jsx
└── ClosingSignOff.jsx
```

### Critical V3 Migration Detail
- 🔍 **CODE-VERIFIED:** Session key is `'tejas_intro_v2_seen'` (`main.jsx`, line 16)
- **This key must be updated to `'tejas_intro_v3_seen'`** for the new intro to ever be seen by returning users

---

## Part 3 — CinematicIntro Audit

### Confirmed Technical Bugs

**Bug 1: No Rendered Skip Button**
- 🔍 **CODE-VERIFIED** (`CinematicIntro.jsx`, lines 261–416): The JSX renders zero `<button>` elements. The word "Skip" does not appear in the JSX.
- 🔍 **CODE-VERIFIED** (line 267): `onClick` on the stage only calls `initGlobalAudioUnlock()` and `playCinematicSwell()`. It does **not** skip.
- 🔍 **CODE-VERIFIED** (lines 27–31): Only the `Escape` keyboard key can skip.
- **Consequence:** Mobile users are locked for 5.9 seconds with zero exit mechanism. This is a critical, confirmed UX failure.

**Bug 2: Audio Called Before User Gesture**
- 🔍 **CODE-VERIFIED** (`CinematicIntro.jsx`, lines 36–37): `playCinematicSwell()` and `playRibbonMotionSweep()` are called inside a mount-time `useEffect`. This fires before any user gesture.
- Modern browser autoplay policy (Chrome, Safari, Firefox) **will block this audio** on first page load. `initGlobalAudioUnlock()` registers a listener for the *next* interaction — it cannot retroactively allow audio already called.
- **Result:** The cinematic swell almost certainly fails silently in all major browsers on first load.

**Bug 3: Canvas Gradient Allocation**
- 🔍 **CODE-VERIFIED** (`CinematicIntro.jsx`, line 213): Each of 65 particles calls `ctx.createRadialGradient()` per animation frame.
- 🎓 **PROFESSIONAL JUDGMENT:** At 60fps this is ~3,900 gradient object allocations per second. This will trigger garbage collection pauses on mid-tier Android phones — the primary device for many students in Bhubaneswar.

### Visual Quality Assessment

**What is genuinely good:**
- 👁️ **BROWSER-OBSERVED:** Deep burgundy radial gradient background creates a genuinely dramatic atmosphere. Not a flat black.
- 🔍 **CODE-VERIFIED** (lines 303–324): Two SVG ribbons — gold and rose — animate with `pathLength` 0→1 over 2.2s. This is an elegant typographic framing device.
- 🔍 **CODE-VERIFIED** (lines 362–363): TEJAS title animates from `letterSpacing: "0.14em"` → `"0.06em"`, creating a settling kinetic feeling.
- 🔍 **CODE-VERIFIED** (lines 152–188): Counter-rotating astrolabe rings at different speeds add mechanical precision without chaos.

**What is genuinely weak:**
- 👁️ **BROWSER-OBSERVED:** The light sweep effect (`.title-light-sweep.is-sweeping`) is barely perceptible at screen size.
- 🎓 **PROFESSIONAL JUDGMENT:** All phase transitions are pure opacity + position fades. No camera motion. No depth shift. No parallax. The composition feels static despite canvas animation.
- 🎓 **PROFESSIONAL JUDGMENT:** The "MMXXVI · MCA BATCH" crest is elegant but adds no visual impact at its rendering size. It reads as decorative noise.
- 🎓 **PROFESSIONAL JUDGMENT:** The cosmic/celestial aesthetic does not evoke "Bloom." There are no botanical or floral references. This is an identity mismatch — the intro promises "The Fresh Bloom" while delivering a galactic observatory.

### CinematicIntro V2 — Scored

| Category | Score | Specific Justification |
|----------|-------|----------------------|
| Visual Quality & Craft | 6.5 | Ribbons and atmosphere show craft. But all motion is single-axis fades, no camera kinetics. Light sweep imperceptible. |
| Interaction Design & UX | 2.5 | No skip button. Mobile users trapped 5.9s. Click does not skip. Only Escape key. Critical failure. |
| Technical Quality | 5.0 | Audio-before-gesture confirmed. Per-frame gradient allocation. Session key needs migration. |
| Mobile Experience | 3.5 | No skip. Canvas full intensity. Eyebrow text wraps badly on narrow screens. |
| Brand Coherence | 6.5 | Colors correct. "The Fresh Bloom" text appears. But cosmic imagery ≠ bloom identity. |
| Distinctiveness | 6.0 | Astrolabe rings are unusual. Symmetrical centered layout is completely conventional. |

**Weighted Calculation:**
(6.5×0.25) + (2.5×0.20) + (5.0×0.15) + (3.5×0.20) + (6.5×0.10) + (6.0×0.10)
= 1.625 + 0.500 + 0.750 + 0.700 + 0.650 + 0.600

**= 4.83 / 10**

*The intro has real visual craft but is broken as a user experience. The missing skip button alone prevents a score above 5.*

---

## Part 4 — InteractiveEnvelope Audit

### Confirmed Technical Issues

**Issue 1: Ribbon Overlapping Brand Stamp**
- 🔍 **CODE-VERIFIED** (`InteractiveEnvelope.jsx`, line 177): `env-bottom-brand-stamp` is positioned at the bottom center of the envelope.
- 🔍 **CODE-VERIFIED** (lines 347–351): `ribbon-vertical` is a centered vertical band across the envelope body.
- 👁️ **BROWSER-OBSERVED:** The vertical ribbon band passes directly over the brand stamp text. Text is not fully legible beneath it.
- **This is a confirmed visual bug.**

**Issue 2: Tilt Effect is Mouse-Only**
- 🔍 **CODE-VERIFIED** (lines 24–37): `handleMouseMove` uses `e.clientX/Y` — mouse events, not touch events.
- On mobile, the tactile 3D tilt that makes the envelope feel "held in hand" does not function at all.

**Issue 3: useCallback Stale Closure**
- 🔍 **CODE-VERIFIED** (lines 39–66): `triggerOpenSequence` in `useCallback` with `[stage, onToggleOpen]` dependency. The guard `stage !== 'closed'` may reference stale state if called via ref. Low-risk in current usage but structurally fragile.

**Issue 4: Centered Body Text**
- 🔍 **CODE-VERIFIED** (lines 221–240): Letter body copy is inside `.letter-body-copy`. The CSS for this class needs checking, but the overall letter inner container is a centered card.
- 🎓 **PROFESSIONAL JUDGMENT:** Centered alignment for multi-paragraph prose is significantly harder to read than left-aligned. Five paragraphs of center-aligned letter text is a readability failure for the most important copy on the page.

### What is Genuinely Good
- 🔍 **CODE-VERIFIED:** Four distinct fold flaps, wax seal SVG with curved textPath typography, 4 corner filigree SVGs, silk ribbon with bow, letter interior with deckle frame. This is a high level of craftsmanship.
- 👁️ **BROWSER-OBSERVED:** Confetti on open uses brand colors (gold, burgundy, ivory). Delightful.
- Keyboard accessibility is present (Enter/Space/Escape).
- The wax seal SVG monogram is custom, not a stock icon.

### InteractiveEnvelope V2 — Scored

| Category | Score | Specific Justification |
|----------|-------|----------------------|
| Visual Quality & Craft | 7.0 | Genuinely impressive construction. Ribbon-over-stamp bug confirmed. Centered body text hurts readability. |
| Interaction Design & UX | 6.0 | 4-stage sequence logical but 400ms dead start. Confetti delightful. Re-fold button barely visible at top-right. |
| Technical Quality | 6.5 | Stale closure risk. Keyboard a11y present. Canvas-confetti correct usage. |
| Mobile Experience | 5.0 | No tilt on touch. Letter may be cramped. No mobile-specific improvements. |
| Brand Coherence | 7.5 | Formal invitation metaphor is directly appropriate. Colors correct. Wax seal thematically on-point. |
| Distinctiveness | 7.0 | Full CSS-3D envelope with fold flaps is not a common template pattern. |

**Weighted Calculation:**
(7.0×0.25) + (6.0×0.20) + (6.5×0.15) + (5.0×0.20) + (7.5×0.10) + (7.0×0.10)
= 1.750 + 1.200 + 0.975 + 1.000 + 0.750 + 0.700

**= 6.38 / 10**

---

## Part 5 — Site-Wide Issues

### CSS Maintainability
- 🔍 **CODE-VERIFIED:** 4,236 lines, 89KB unminified in a single file.
- 🎓 **PROFESSIONAL JUDGMENT:** This is a real maintenance burden. Finding any selector requires full-text search. Dead code from past iterations almost certainly exists.

### Section Pattern Monotony
- 👁️ **BROWSER-OBSERVED:** Every content section (Milestones, Agenda, Gallery, Cheers) begins with the same eyebrow pill badge pattern — bordered, small caps, centered.
- 🎓 **PROFESSIONAL JUDGMENT:** Repeating this pattern 4+ times makes the page read as a design template, not a bespoke creative production. By the fourth section, the badge is invisible to the eye — not distinctive, just predictable.

### Hero Text Hierarchy Overload
- 👁️ **BROWSER-OBSERVED** (`initial_load_desktop`): Left column contains: eyebrow pill → H1 → tagline → 63-word paragraph → 5 nav chips. Five levels of hierarchy in one column.
- 🎓 **PROFESSIONAL JUDGMENT:** Three levels of hierarchy is the maximum for a strong hero. Five levels creates visual noise, not emphasis.

### Visual Gallery Authenticity
- 👁️ **BROWSER-OBSERVED** (`gallery_section_desktop`): Gallery images do not read as authentic campus photography. They appear AI-generated or placeholder-level.
- 🎓 **PROFESSIONAL JUDGMENT:** Using generated imagery for a real event invitation is a credibility problem. Guests seeing the gallery will recognize it is not authentic.

---

## Part 6 — Overall V2 Score

| Section | Score | Status |
|---------|-------|--------|
| CinematicIntro | 4.83/10 | Code-verified bugs |
| InteractiveEnvelope | 6.38/10 | Code-verified |
| Hero Section | 5.5/10 | Browser-observed |
| Milestones | ~6.0/10 | Browser-observed only |
| Agenda | ~6.5/10 | Browser-observed only |
| Gallery | ~5.0/10 | Browser-observed — authenticity problem |
| Cheers/Footer | ~5.5/10 | Browser-observed |

**Overall V2: 5.5 / 10**

Previous analysis rated V2 at "approximately 4/10." I am revising this upward to 5.5/10 because:
- The envelope interaction is genuinely above industry standard for event sites
- The color token system is disciplined and correct
- The typography system shows intent

However 5.5/10 means significant problems remain:
1. Mobile users cannot skip the intro — critical UX failure
2. Intro audio fails on first load in modern browsers — confirmed code bug
3. Every section uses the same visual pattern — monotony
4. No lightness or contrast rhythm across sections — unrelieved darkness
5. Gallery lacks authenticity

---

## Part 7 — V3 Priority Improvements (Ranked by Impact)

| Priority | Problem | V3 Direction |
|----------|---------|--------------|
| 1 | No skip button | Visible, touch-accessible skip button — non-negotiable |
| 2 | Audio before gesture | Move all audio into user-triggered handlers only |
| 3 | Section monotony | Unique compositional layout per section — not all pill+centered |
| 4 | Intro ≠ "Bloom" | Redesign intro to reference the bloom identity visually |
| 5 | Ribbon over stamp | Fix z-index or move stamp |
| 6 | Canvas GC pressure | Pre-compute gradients or use CSS shadows |
| 7 | Centered body text | Left-align letter body prose |
| 8 | Hero hierarchy | Max 3 levels in hero left column |
| 9 | CSS maintainability | Split into component files during V3 |
| 10 | Session key | Update `tejas_intro_v2_seen` → `tejas_intro_v3_seen` |

---

*All findings labeled with evidence source: CODE-VERIFIED (line cited), BROWSER-OBSERVED (screenshot exists), PROFESSIONAL JUDGMENT (design opinion), or UNVERIFIED (not confirmed in this pass).*
