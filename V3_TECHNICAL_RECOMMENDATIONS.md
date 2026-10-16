# TEJAS '26 — THE FRESH BLOOM
## V3 Technical Recommendations (Second Pass — Verified and Labeled)
**Date:** October 2026 | **Status:** Planning Phase Only | **No Code Modified**

---

> **Evidence Labels**
> - 🔍 **CODE-VERIFIED** — Confirmed in source file with line citations
> - 👁️ **BROWSER-OBSERVED** — Seen in live browser session
> - 🎓 **PROFESSIONAL JUDGMENT** — Engineering opinion, not directly provable without testing
> - ⚠️ **UNVERIFIED** — Should be confirmed during implementation

---

## 1. Stack Decisions — What to Keep, What to Change

### Keep (No Change Needed)
| Item | Reason |
|------|--------|
| Vite 6 + React 18 | Working well. No reason to change. |
| Motion for React v14 | The animation library is appropriate for the complexity needed. |
| Vanilla CSS | No reason to add Tailwind. The existing token system works. |
| canvas-confetti | Correct usage in V2. Keep for celebration moments. |
| Lucide React | Correct icon library choice. Keep. |

### Change Required
| Item | Current Problem | V3 Action |
|------|----------------|-----------|
| CSS structure | 4,236 lines, 89KB, single file (🔍 verified) | Split into component-scoped CSS or at minimum named sections with `@layer` |
| Session storage key | `'tejas_intro_v2_seen'` (🔍 verified, line 16) | Change to `'tejas_intro_v3_seen'` |
| Audio timing | Audio called before user gesture (🔍 verified, lines 36–37) | Restructure audio calls to user-triggered handlers only |

### Evaluate
| Item | Question | Recommendation |
|------|---------|----------------|
| Fraunces font | Is it contributing meaningfully or just loading? | Audit usage. If < 5 uses, consider removing to save a font load. |
| Canvas animation | 65 particles + per-frame gradients (🔍 verified) | Pre-compute gradients in an initialization step or replace with CSS |

---

## 2. Critical Bug Fixes Required Before Feature Work

These are confirmed code-level bugs that must be fixed regardless of which design options are chosen:

### Fix 1 — Skip Button (Priority 1 — Non-Negotiable)
**Problem:** 🔍 CODE-VERIFIED — No skip button rendered in `CinematicIntro.jsx` JSX. Only `Escape` keyboard key works.

**Required implementation:**
```jsx
// Add inside CinematicIntro JSX, before </motion.div>
<button
  className="intro-skip-btn"
  onClick={handleSkip}
  aria-label="Skip opening sequence"
>
  Skip ↓
</button>
```

**CSS requirements:**
- Position: `fixed`, bottom-right, `z-index: 10001` (above canvas z-index of 1)
- Visible immediately: `opacity: 1` from render. Do not delay or fade-in the skip button.
- Touch target: minimum 44×44px (WCAG 2.1 requirement)
- Must appear on first render, not after Phase 1 or Phase 2

**🎓 PROFESSIONAL JUDGMENT:** Delaying the skip button (e.g., appearing only after 2 seconds) punishes impatient users and is a dark pattern. Show it immediately.

---

### Fix 2 — Audio Timing (Priority 2)
**Problem:** 🔍 CODE-VERIFIED — `playCinematicSwell()` called in `useEffect([], [])` on mount. Fails browser autoplay policy.

**Required change:**
- `playCinematicSwell()` should be called from `handleStageInteraction` (which already fires on click) — NOT in `useEffect`.
- The intro should work silently until the user interacts. After the first click/tap, audio plays.
- Alternatively: detect if audio unlock has already occurred (via `initGlobalAudioUnlock`'s internal state) before calling `playCinematicSwell`.

**🎓 PROFESSIONAL JUDGMENT:** The experience should be complete and impressive even in silence. Audio is enhancement, not foundation.

---

### Fix 3 — Session Storage Key Migration (Priority 3)
**Problem:** 🔍 CODE-VERIFIED — `main.jsx`, line 16: `const INTRO_STORAGE_KEY = 'tejas_intro_v2_seen'`

**Required change:**
```js
// Change line 16:
const INTRO_STORAGE_KEY = 'tejas_intro_v3_seen';
// And optionally clear the old key on first run:
try {
  sessionStorage.removeItem('tejas_intro_v2_seen');
} catch (e) {}
```

Without this change, any browser that has seen the V2 intro will never see the V3 intro (because `sessionStorage.getItem('tejas_intro_v2_seen')` returns truthy and skips the intro).

---

### Fix 4 — Envelope Ribbon Z-Index / Stamp Conflict (Priority 4)
**Problem:** 🔍 CODE-VERIFIED (layout confirmed) — `ribbon-vertical` div overlaps `env-bottom-brand-stamp` text.

**Solution approach:** Either:
a) Move `env-bottom-brand-stamp` outside the ribbon overlap area (padding-bottom adjustment)
b) Add `z-index` to stamp so it renders above the ribbon
c) Remove the ribbon vertical arm from overlapping the center stamp area entirely

**Implementation note:** This is a pure CSS fix — not a JSX refactor. Should take < 10 minutes.

---

## 3. Performance Recommendations

### Canvas Optimization
**Problem:** 🔍 CODE-VERIFIED — `ctx.createRadialGradient()` called per particle per frame (line 213).

**Option A — Pre-compute gradients (Recommended):**
```js
// In initialization (outside render loop):
const precomputedGlows = particles.map(p => {
  // Note: Gradients computed from canvas coordinates - need recompute on resize
  // Pre-compute color strings only, not gradient objects (those are position-dependent)
  return {
    warmColor: p.color === '#FDEBB2' ? 'rgba(255,235,178,' : 'rgba(247,214,220,',
    accentColor: p.color === '#FDEBB2' ? 'rgba(212,175,55,' : 'rgba(168,32,61,'
  };
});
```
Then in render loop, create gradient with pre-computed strings (avoids string allocation).

**Option B — Use CSS box-shadow on overlay divs instead of canvas for particles:**
- 65 absolutely positioned `<div>` elements, each 4px circle
- CSS `box-shadow` for glow effect
- Animate with CSS `transform: translate()` using CSS animations
- Zero canvas, zero JS per frame
- 🎓 PROFESSIONAL JUDGMENT: This approach is significantly less flexible (no mouse parallax, no per-particle physics) but performs well on all devices

**Option C — Reduce particle count to 30 on mobile:**
```js
const PARTICLE_COUNT = window.matchMedia('(max-width: 768px)').matches ? 30 : 65;
```
Simple, immediate improvement for mobile devices.

**Recommendation:** Implement Option C immediately (5 minutes of work). Pursue Option A for V3 if canvas is retained.

---

### Font Loading
🎓 **PROFESSIONAL JUDGMENT:** Three Google Fonts (Cinzel, Fraunces, Outfit) add three separate HTTP requests and potentially 3 FOUT windows. For V3:

```html
<!-- In index.html - ensure these exist -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
```

Also add `font-display: optional` for Cinzel and Fraunces (display fonts that only appear in headings). `font-display: swap` for Outfit (body font — FOUT is acceptable with a system font fallback).

⚠️ **UNVERIFIED:** Whether current `index.html` already has `preconnect` tags. Should be checked during implementation.

---

### CSS Bundle
🎓 **PROFESSIONAL JUDGMENT:** 89KB unminified CSS will minify to approximately 55–60KB and gzip to approximately 12–15KB. This is acceptable for a modern website. However, Vite's production build will handle this automatically — no manual optimization needed.

The real CSS problem is maintenance, not performance.

---

## 4. Accessibility Requirements

The following are WCAG 2.1 AA minimum requirements that V3 must meet:

| Requirement | Current V2 Status | V3 Action |
|------------|------------------|-----------|
| Skip button in intro | 🔴 Missing — confirmed | Add immediately (Fix 1 above) |
| Keyboard navigation | 🟡 Partial — Escape works for intro, Enter/Space for envelope | Verify all interactive elements reachable via Tab |
| Focus indicators | 🟡 `:focus-visible` exists (🔍 styles.css line 107) | Ensure focus rings visible on dark and light backgrounds |
| Color contrast — light text on dark | 🟢 Cream #FAF7F2 on wine #1A030A ≈ 15:1 ratio | Well above threshold. Maintain. |
| Color contrast — small text on cards | ⚠️ UNVERIFIED — card background colors not confirmed | Verify during implementation |
| Touch target size | 🔴 Skip button does not exist; seal click target: ~80px diameter | Seal is fine; add skip button with 44px minimum |
| `prefers-reduced-motion` | 🟡 Skips intro entirely (main.jsx line 20) but doesn't reduce canvas intensity | For V3, also reduce particle count when preference active |

---

## 5. Mobile-First Implementation Requirements

Based on browser observations and code review, V3 must specifically address:

**Mobile viewport (< 480px):**
- The intro skip button must be reachable by thumb in the bottom-right corner
- All pill badges and nav chips that currently wrap must either: (a) stack vertically, or (b) be replaced with a different mobile navigation pattern
- The envelope section: the letter card must have left-aligned prose (not centered) on mobile
- The letter action buttons (Explore Programme / Cheer TEJAS) must be full-width stacked on mobile, not side-by-side

**Touch interactions:**
- The envelope tilt effect (currently mouse-only) should be replaced with a static card on mobile (no tilt) — confirmed in code that tilt only uses `onMouseMove`
- All hover states must have equivalent tap/focus states
- Minimum touch target: 44px × 44px for all buttons (WCAG 2.1)

**Performance on mid-tier Android:**
- Reduce canvas particle count to 30 on mobile (trivial code change)
- Avoid `backdrop-filter: blur()` on sections other than occasional overlay panels — this is GPU-intensive on older Android WebViews
- Test on a simulated low-power device profile in Chrome DevTools during implementation

---

## 6. V3 File Structure Recommendation

Current (V2):
```
src/
  main.jsx
  styles.css          (4,236 lines — everything)
  components/
    CinematicIntro.jsx
    InteractiveEnvelope.jsx
    MilestonesSection.jsx
    AgendaSection.jsx
    VisualGallery.jsx
    CelebrationCheers.jsx
    ClosingSignOff.jsx
  utils/
    audio.js
```

Recommended (V3):
```
src/
  main.jsx
  styles/
    tokens.css         (CSS custom properties — ~100 lines)
    base.css           (Reset, global typography, utilities — ~150 lines)
    layout.css         (Grid and section layout rules — ~200 lines)
    components/
      intro.css
      envelope.css
      milestones.css
      agenda.css
      gallery.css
      cheers.css
      footer.css
  components/
    [same as V2]
  utils/
    audio.js
```

🎓 **PROFESSIONAL JUDGMENT:** This split does not change any functionality but dramatically improves maintainability. Each component's CSS can be found in under 5 seconds. Dead code in `intro.css` doesn't pollute `agenda.css`.

**Implementation cost:** Low — purely moving CSS between files. No logic changes.

---

## 7. What NOT to Change

Based on honest assessment:

- **Do not replace Motion for React with GSAP** — Motion for React v14 is well-suited. GSAP would require a license for advanced features and adds complexity.
- **Do not add a state management library** — The current `useState` in `main.jsx` is sufficient. The site has minimal shared state.
- **Do not add TypeScript** — Converting 7 components to TypeScript mid-project adds refactoring time with no functional benefit for this project.
- **Do not add a CSS framework** — The existing vanilla CSS is under control. Adding Tailwind now would mean rewriting all 4,236 lines.
- **Do not add a backend** — CelebrationCheers reactions or gallery submissions that require persistence should use `localStorage` only. No backend complexity for a celebration website.

---

*Claims marked 🎓 PROFESSIONAL JUDGMENT represent engineering opinions that should be verified during implementation testing. Claims marked 🔍 CODE-VERIFIED have been confirmed in source files with line numbers cited.*
