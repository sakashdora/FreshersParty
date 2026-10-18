# TEJAS ’26 — THE FRESH BLOOM
## Evidence-Based AI-Generic Design Audit & Remediation Blueprint
### Document 05: Practical Remediation Blueprint & Implementation Plan

---

### 1. IMPLEMENTATION ROADMAP OVERVIEW

This blueprint transforms all confirmed audit findings into an actionable, phased engineering plan. Every task is documented with exact files to modify, step-by-step logic, potential regression risks, and concrete acceptance criteria.

The work is strictly prioritized into four tiers:
- **Phase 1: P0 Critical Defects** (Security, A11y block, Content truth, Broken links)
- **Phase 2: P1 Architectural & Visual Remediation** (CSS consolidation, AI trope removal, Mobile overflow)
- **Phase 3: P2 Secondary Polish & Ergonomics** (Typography, Micro-copy, Contrast, Calendar A11y)
- **Phase 4: P3 Asset Purge & Final Optimization** (Unused media deletion, Dead code removal)

---

### 2. PHASE 1: CRITICAL DEFECTS & BLOCKING ISSUES (P0)

---

#### Task P0-01: Remove 10-Second Intro Hostage Gate & Enable Immediate Escape
- **Finding IDs Addressed**: `INTRO-01`, `ACC-01`
- **Target Files**:
  - `src/components/CinematicIntro.jsx` (Lines 25, 52–63, 115–130)
- **Exact Intended Change**:
  1. Change `SKIP_THRESHOLD: 10.0` to `SKIP_THRESHOLD: 0.0`.
  2. In `handleKeyDown`, remove the condition `milestoneRef.current >= 10`:
     ```javascript
     if (e.key === 'Escape') {
       e.preventDefault();
       handleFinish();
     }
     ```
  3. Render the "Skip Intro [Esc]" button unconditionally from the moment the intro starts playing (`introState === 'PLAYING'`).
  4. Add an `aria-label="Skip cinematic introduction and open invitation"` to the skip button.
- **Dependencies**: None.
- **Potential Regression Risks**: Premature audio cutoff if user skips immediately (handled by `stopMasterSoundtrack(350)` fadeout).
- **Acceptance Criteria**:
  - Pressing `Escape` at any second of the intro immediately fades audio over 300ms and mounts the invitation.
  - The skip button is clickable from second 0.5.
- **Required Verification Tests**:
  - Keyboard test: Press `Escape` at 1.0s, 3.0s, 7.0s. Verify transition to hero.
  - Screen reader test: Verify button name announced correctly.

---

#### Task P0-02: Fix Open Graph Metadata & Missing Social Share Asset
- **Finding IDs Addressed**: `META-01`, `SEO-01`
- **Target Files**:
  - `index.html` (Lines 20–26)
  - `/public/og-image.jpg` (New asset)
- **Exact Intended Change**:
  1. In `index.html`, replace all instances of `[PUBLIC URL]` with the canonical deployment URL or absolute relative path.
  2. Create a high-res 1200 × 630 px Open Graph banner featuring:
     - Header: "DEPARTMENT OF COMPUTER APPLICATIONS · SRUSTI ACADEMY"
     - Master Title: "TEJAS ’26 — The Fresh Bloom"
     - Subtitle: "MCA Freshers Induction & Welcome · 28 October 2026"
     - Save as `/public/og-image.jpg` (quality 85, <180 KB).
  3. Ensure Twitter card tags match Open Graph properties.
- **Dependencies**: Static asset creation.
- **Potential Regression Risks**: None.
- **Acceptance Criteria**:
  - Facebook Sharing Debugger / Twitter Card Validator returns HTTP 200 with complete title, description, and valid 1200×630px image.
- **Required Verification Tests**:
  - Local inspection of `<head>` DOM via DevTools.

---

#### Task P0-03: Resolve Critical Event Date & Time Contradictions
- **Finding IDs Addressed**: `CNT-01`, `META-02`
- **Target Files**:
  - `index.html` (Lines 7, 31)
  - `src/components/InteractiveEnvelope.jsx` (Lines 380–395)
  - `src/components/AgendaSection.jsx` (Lines 10–58, 63–76)
  - `src/components/DressCodeEssentials.jsx` (Line 37)
- **Exact Intended Change**:
  1. Unify all event references to the confirmed single date:
     - **Date**: Wednesday, 28 October 2026
     - **Reporting Time**: 11:40 AM
     - **Fellowship Lunch**: 12:30 PM – 1:30 PM
     - **Event Conclusion**: 5:00 PM
     - **Venue**: JRD Tata Hall, Srusti Academy of Management & Technology, Bhubaneswar
  2. Update `index.html` meta description:
     `"You're invited to TEJAS '26 — The Fresh Bloom. Official MCA Freshers Welcome on 28 October 2026 at JRD Tata Hall. Reporting at 11:40 AM."`
  3. Update `index.html` `<noscript>` tag to match.
- **Dependencies**: Confirmation with student committee (28 October verified as canonical active date).
- **Potential Regression Risks**: None.
- **Acceptance Criteria**:
  - Zero search hits in the entire `src/` or `index.html` for "10:30 onwards", "27 October", or "30 October".
- **Required Verification Tests**:
  - Project-wide grep search for "10:30", "27 October", and "30 October".

---

#### Task P0-04: Fix Google Calendar Timezone & Add Apple/Outlook ICS
- **Finding IDs Addressed**: `AGENDA-01`
- **Target Files**:
  - `src/components/AgendaSection.jsx` (Lines 61–76)
- **Exact Intended Change**:
  1. Update Google Calendar export URL with explicit Indian Standard Time (`ctz=Asia/Kolkata`):
     ```javascript
     const startUtc = "20261028T061000Z"; // 11:40 AM IST
     const endUtc = "20261028T113000Z";   // 05:00 PM IST
     const calUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startUtc}/${endUtc}&details=${details}&location=${location}&ctz=Asia/Kolkata`;
     ```
  2. Add an optional "Download .ics File" handler for iPhone / Outlook users.
- **Dependencies**: None.
- **Potential Regression Risks**: None.
- **Acceptance Criteria**:
  - Clicking "Add to Calendar" opens Google Calendar showing start time as 11:40 AM and end time as 5:00 PM in Indian Standard Time regardless of host OS timezone.
- **Required Verification Tests**:
  - Test URL generation with simulated UTC-5 and UTC+0 browser locales.

---

### 3. PHASE 2: ARCHITECTURAL & VISUAL REMEDIATION (P1)

---

#### Task P1-01: Consolidate Dual Stylesheets (`styles.css` & `styles-v3.css`)
- **Finding IDs Addressed**: `CSS-01`
- **Target Files**:
  - `src/styles.css` (Rewrite & consolidate)
  - `src/styles-v3.css` (Delete or replace with redirect)
  - `src/main.jsx` (Line 9: remove `import './styles-v3.css';`)
- **Exact Intended Change**:
  1. Extract canonical design tokens into `:root` in `src/styles.css`.
  2. Consolidate component rules for Navigation, Hero, Envelope, Card, Essentials, Agenda, and Footer.
  3. Eliminate dead rules for orphaned components (`MilestonesSection`, `CelebrationCheers`, `VisualGallery`).
  4. Remove legacy `sangama-` classes.
  5. Target stylesheet file size: <35 KB (currently 191 KB).
- **Dependencies**: Document 04 Design Token specification.
- **Potential Regression Risks**: Visual regressions on specific class selectors if rules are inadvertently dropped.
- **Acceptance Criteria**:
  - Only one CSS file imported in `main.jsx`.
  - Zero duplicate CSS property definitions in `:root`.
  - Application looks identical or cleaner, with 80% reduction in CSS download size.
- **Required Verification Tests**:
  - Visual regression comparison across Desktop (1440px) and Mobile (390px).

---

#### Task P1-02: Fix Mobile Envelope Card Overflow & Sticky Nav Collision
- **Finding IDs Addressed**: `ENV-03`, `ENV-BUG-01`
- **Target Files**:
  - `src/components/InteractiveEnvelope.jsx` (Lines 134–140, 337–440)
  - `src/styles.css` (`.env-stage`, `.env-card`, `.card-surface`)
- **Exact Intended Change**:
  1. In `InteractiveEnvelope.jsx`, replace fixed pixel translations with responsive percentage/viewport rules:
     ```javascript
     const cardV = {
       sealed: { y: 24, opacity: 0, scale: 0.96 },
       opening: { y: isMobile ? '-48%' : '-55%', opacity: 1, scale: 1 },
       revealed: { y: isMobile ? '-48%' : '-55%', opacity: 1, scale: 1 },
       closing: { y: 24, opacity: 0, scale: 0.96 }
     };
     ```
  2. Set `max-height: 80vh` and `overflow-y: auto` with smooth touch scrolling on `.card-surface`.
  3. Add `scroll-margin-top: 80px` to `#invitation-envelope` so auto-scrolling leaves generous clearance below the sticky navbar.
- **Dependencies**: CSS layout update.
- **Potential Regression Risks**: Flap clipping if card z-index is altered during hinge flip.
- **Acceptance Criteria**:
  - On 360 × 740 px viewport, opening the card does not overlap the sticky navbar.
  - All card action buttons remain visible and easily tappable above the fold.
- **Required Verification Tests**:
  - Emulate 360px (Galaxy S8) and 390px (iPhone 14) in Chrome DevTools.

---

#### Task P1-03: De-Clutter Envelope Flanking Laurels & Streamline Wax Seal
- **Finding IDs Addressed**: `ENV-01`, `ENV-02`
- **Target Files**:
  - `src/components/InteractiveEnvelope.jsx` (Lines 196–282, 483–566)
- **Exact Intended Change**:
  1. Remove `.env-flank-laurel.flank-left` and `.env-flank-laurel.flank-right` SVG trees completely.
  2. Refactor the wax seal SVG:
     - Keep the rich crimson wax disc (`#rubySealGrad`) and outer beveled gold rim.
     - Replace the Soviet 5-point star and Roman wreath with an embossed **Tejas Lotus** icon (matching the divider lotus in `main.jsx:195-200`).
- **Dependencies**: None.
- **Potential Regression Risks**: None.
- **Acceptance Criteria**:
  - Envelope DOM node count reduced by ~80 SVG elements.
  - Wax seal displays a crisp, thematic lotus emblem.
- **Required Verification Tests**:
  - Check rendered visual balance at 1440px and 390px.

---

#### Task P1-04: Replace AI-Generic SaaS Feature Bar in Hero with Event Facts
- **Finding IDs Addressed**: `HERO-01`, `CW-04`
- **Target Files**:
  - `src/main.jsx` (Lines 212–233)
- **Exact Intended Change**:
  Replace `hero-pillars-bar` (`NEW BEGINNINGS`, `BRIGHTER BONDS`, `MEMORIES AHEAD`, `A JOURNEY TOGETHER`) with **Event Quick-Facts Bar**:
  - Fact 1: Calendar icon · `Wednesday, 28 October 2026`
  - Fact 2: MapPin icon · `JRD Tata Hall, Campus`
  - Fact 3: Clock icon · `11:40 AM to 5:00 PM`
  - Fact 4: Utensils icon · `Grand Fellowship Lunch`
- **Dependencies**: None.
- **Potential Regression Risks**: Mobile wrapping on narrow screens (solved via `display: flex; flex-wrap: wrap; justify-content: center`).
- **Acceptance Criteria**:
  - No generic corporate platitudes in hero.
  - All four essential event logistics immediately legible above the fold.
- **Required Verification Tests**:
  - Verify layout stability on 360px, 390px, 768px, and 1440px.

---

### 4. PHASE 3: SECONDARY POLISH & ERGONOMICS (P2)

---

#### Task P2-01: Manage Keyboard Focus on Envelope Reveal & Close
- **Finding IDs Addressed**: `ENV-04`, `ENV-BUG-02`
- **Target Files**:
  - `src/components/InteractiveEnvelope.jsx`
- **Exact Intended Change**:
  1. Create a `cardRef = useRef(null)` and `resealBtnRef = useRef(null)`.
  2. In `doOpen`, upon transition to `S.REVEALED`, invoke `resealBtnRef.current?.focus()`.
  3. In `doClose`, upon transition to `S.SEALED`, restore focus to `containerRef.current?.focus()`.
- **Dependencies**: None.
- **Potential Regression Risks**: Focus jumping unexpectedly if user is actively scrolling with mouse.
- **Acceptance Criteria**:
  - Tabbing through the page with envelope open focuses directly onto the "Fold Back" button and card CTAs.
- **Required Verification Tests**:
  - Full keyboard-only navigation run-through (Tab, Shift+Tab, Enter, Space, Escape).

#### Task P2-02: Authentic Voice Copywriting Revision
- **Finding IDs Addressed**: `CW-03`, `CW-05`, `CW-06`, `CW-07`, `CW-08`, `CW-09`, `CW-10`
- **Target Files**:
  - `src/main.jsx`, `src/components/InteractiveEnvelope.jsx`, `src/components/AgendaSection.jsx`, `src/components/ClosingSignOff.jsx`
- **Exact Intended Change**:
  - Apply all verified replacements from Document 02 (`02_COPYWRITING_AUDIT.md`).
  - Change "Cheer for us" to "Can't Wait to Celebrate! 🎉".
  - Change "OPEN LETTER DIRECTLY" to "Open Your Invitation ↓".
  - Change "THE SENIOR-JUNIOR CONFLUENCE" to "Welcome & Batch Icebreakers".
- **Dependencies**: None.
- **Potential Regression Risks**: None.
- **Acceptance Criteria**:
  - Tone feels genuine, warm, and distinctly student-authored.

---

### 5. PHASE 4: ASSET PURGE & CODE CLEANUP (P3)

---

#### Task P3-01: Archive Orphaned Components & Purge Unused Public Media
- **Finding IDs Addressed**: `ORPH-01`
- **Target Files**:
  - Move to `src/archive/`: `MilestonesSection.jsx`, `CelebrationCheers.jsx`, `VisualGallery.jsx`, `registration.js`.
  - Delete from `public/`: `freshers-editorial.png` (2.47 MB), `sangam-hero.png` (1.94 MB), duplicate MP4 video (5.15 MB).
  - Update `package.json`: rename `"name": "sangama-26"` to `"name": "tejas-26"`.
- **Dependencies**: None.
- **Potential Regression Risks**: Broken imports if any file referenced them (verified: zero imports).
- **Acceptance Criteria**:
  - Repository size reduced by >15 MB.
  - `npm run build` succeeds cleanly without warnings.
