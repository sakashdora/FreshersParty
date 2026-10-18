# TEJAS ’26 — THE FRESH BLOOM
## Master Execution Plan: De-AIfication, Experiential Refinement & Implementation
### Document 08: Consolidated Execution Plan

---

### 1. EXECUTIVE SUMMARY & TARGET EXPERIENCE

#### 1.1 The Target Experience
The objective of this implementation is to transform **TEJAS ’26 — The Fresh Bloom** from an AI-generic, hyper-inflated corporate gala template into an authentic, deeply memorable, and technically flawless digital invitation.

The resulting website must feel:
1. **Genuinely Student-Authored**: Written from the heart of the MCA Senior batch (2025–2027) welcoming their incoming juniors (2026–2028) to Srusti Academy of Management & Technology in Bhubaneswar.
2. **Culturally Grounded**: Infused with the warm, radiant aesthetic of "Tejas" (Radiance/Light) and Odisha’s artistic heritage (delicate lotus motifs, warm marigold & solar gold tones, rich imperial burgundy parchment), devoid of Roman laurel wreaths, Soviet star medallions, or crypto-tech orbital lines.
3. **Technically Reliable & Accessible**: Unblocking the 10-second intro gate (WCAG 2.2.2/2.1.1 compliant), eliminating mobile envelope clipping on compact screens, ensuring keyboard focus traps, correcting calendar timezones, and providing valid Open Graph social share assets.
4. **Cohesive & High-Performance**: Eliminating CSS duplication and legacy cruft to deliver smooth 60fps animations across all mobile and desktop devices.

---

### 2. CONSOLIDATED VERIFIED ISSUES & FINDING-TO-TASK MAPPING

| Finding ID | Priority | Category | Core Problem | Implementation Task | Target File(s) |
| :--- | :---: | :--- | :--- | :--- | :--- |
| **INTRO-01 / ACC-01** | **P0** | Accessibility | 10s mandatory intro delay; `<kbd>Esc</kbd>` suppressed | **TASK-P0-1** | `src/components/CinematicIntro.jsx` |
| **CNT-01 / META-02** | **P0** | Content Truth | Contradictory schedules (10:30 vs 11:40; 27/30 vs 28 Oct) | **TASK-P0-2** | `index.html`, `AgendaSection.jsx`, `InteractiveEnvelope.jsx` |
| **META-01 / SEO-01** | **P0** | Social/SEO | Unreplaced `[PUBLIC URL]` placeholders & missing OG image | **TASK-P0-3** | `index.html`, `public/og-image.svg` / `.jpg` |
| **AGENDA-01** | **P0** | Functional | Google Calendar link lacks `&ctz=Asia/Kolkata` | **TASK-P0-4** | `src/components/AgendaSection.jsx` |
| **ENV-03 / BUG-01** | **P0** | Mobile Layout | Hardcoded card offset (`-290px`) causes sticky nav collision | **TASK-P0-5** | `src/components/InteractiveEnvelope.jsx`, `src/styles/` |
| **HERO-01 / CW-04** | **P1** | Copy/Design | 4 generic SaaS feature capsules (`NEW BEGINNINGS`, etc.) | **TASK-P1-1** | `src/main.jsx` |
| **ENV-01** | **P1** | Aesthetics | Flanking Roman imperial laurel SVG clutter | **TASK-P1-2** | `src/components/InteractiveEnvelope.jsx`, `src/styles/` |
| **ENV-02** | **P1** | Aesthetics | 83-line wax seal with Soviet star and double wreaths | **TASK-P1-3** | `src/components/InteractiveEnvelope.jsx` |
| **CARD-01 / CW-07** | **P1** | Copy/Design | 45-word run-on itinerary sentence inside invitation card | **TASK-P1-4** | `src/components/InteractiveEnvelope.jsx` |
| **AGENDA-02 / CW-09** | **P1** | Copywriting | Over-thesaurized corporate schedule titles ("Confluence", etc.)| **TASK-P1-5** | `src/components/AgendaSection.jsx` |
| **FOOTER-01 / CW-10** | **P1** | Copywriting | "True Inspire" agency badge with neon `.badge-shine` | **TASK-P1-6** | `src/components/ClosingSignOff.jsx`, `src/styles/` |
| **CSS-01** | **P1** | Architecture | 191 KB dual-stylesheet collision (`styles.css` + `styles-v3.css`) | **TASK-P1-7** | `src/styles/styles.css`, `src/styles/styles-v3.css` |
| **ENV-04 / BUG-02** | **P2** | Accessibility | Keyboard focus lost when envelope opens | **TASK-P2-1** | `src/components/InteractiveEnvelope.jsx` |
| **CARD-02 / CW-08** | **P2** | Copywriting | Button says "Cheer for us" (hosts asking guests to cheer) | **TASK-P2-2** | `src/components/InteractiveEnvelope.jsx` |
| **HERO-02** | **P2** | Aesthetics | Faux-celestial space-tech dashed orbital SVG lines | **TASK-P2-3** | `src/main.jsx` |
| **NAV-01 / NAV-02** | **P2** | Responsive | Tablet nav links wrapping; drawer lacking `aria-modal` | **TASK-P2-4** | `src/main.jsx`, `src/styles/` |
| **DRESS-02** | **P2** | Responsive | Corner filigree SVG overflow on small screens | **TASK-P2-5** | `src/components/DressCodeEssentials.jsx` |
| **ENV-BUG-03** | **P2** | Performance | Confetti canvas DOM accumulation memory leak | **TASK-P2-6** | `src/components/InteractiveEnvelope.jsx` |

---

### 3. EXACT FILES & COMPONENTS TO MODIFY

1. **`index.html`**:
   - Fix metadata, description, title, noscript fallback, and Open Graph social sharing tags.
   - Reference valid `og-image.jpg` or responsive SVG fallback.
2. **`src/main.jsx`**:
   - Re-engineer Hero section: replace 4 SaaS feature capsules with practical **Event Quick Facts**.
   - Refine hero headline, tagline, and CTA button copy (`Open Your Invitation ↓`).
   - Clean celestial SVG geometry into delicate cultural lotus/hairline accents.
   - Add accessible keyboard management and `aria-modal="true"` to mobile drawer.
3. **`src/components/CinematicIntro.jsx`**:
   - Set `SKIP_THRESHOLD: 0.0`.
   - Enable immediate exit on `<kbd>Esc</kbd>` and render the skip button immediately.
   - Ensure clean audio fadeout.
4. **`src/components/InteractiveEnvelope.jsx`**:
   - Eliminate heavy flanking laurel branch SVGs.
   - Replace complex Soviet-star seal with custom **Tejas Lotus Wax Seal**.
   - Redesign card content: rewrite welcome letter into warm senior voice.
   - Change "Cheer for us" button to `"Can't Wait to Celebrate! 🎉"`.
   - Fix mobile vertical translation and envelope chassis height so card never collides with sticky navbar.
   - Implement focus trap shifting to the "Fold Back" button upon opening.
5. **`src/components/AgendaSection.jsx`**:
   - Rename timeline items into engaging college freshers events.
   - Append `&ctz=Asia/Kolkata` to Google Calendar link and add timezone clarity.
6. **`src/components/ClosingSignOff.jsx`**:
   - Remove "True Inspire" agency shine badge.
   - Format sincere academic dedication from MCA Seniors (Batch 2025–2027).
7. **`src/styles/styles.css` & `src/styles/styles-v3.css`**:
   - Unify and harmonize design tokens.
   - Remove dead keyframe animations (`.badge-shine`, over-glows).
   - Ensure responsive containment across 360px–1440px viewports.

---

### 4. CONTENT REPLACEMENT MASTER TABLE

| Section & Element | Existing AI-Generic Text | Proposed Human & Authentic Replacement | Rationale |
| :--- | :--- | :--- | :--- |
| **Head Description** | `"... 10:30 onwards."` | `"Join us for TEJAS ’26 — The Fresh Bloom. Official MCA Freshers celebration on Wednesday, 28 October 2026 at JRD Tata Hall, Srusti Academy. Reporting at 11:40 AM."` | Precise, unambiguous schedule facts. |
| **Hero Eyebrow** | `✦ DEPARTMENT OF COMPUTER APPLICATIONS ✦ SRUSTI ACADEMY ✦` | `DEPARTMENT OF COMPUTER APPLICATIONS · SRUSTI ACADEMY OF MANAGEMENT & TECHNOLOGY` | Dignified collegiate typography without emoji sparkle clutter. |
| **Hero Lead** | `"The Senior Welcome & Ceremonial Induction for Incoming MCA Batch (2026–2028)"` | `"Hosted with love by your Seniors for the incoming MCA Batch of 2026–2028"` | Warm, welcoming student voice. |
| **Hero 4 Pillars** | `NEW BEGINNINGS` · `BRIGHTER BONDS` · `MEMORIES AHEAD` · `A JOURNEY TOGETHER` | `📅 Wednesday, 28 Oct 2026` · `📍 JRD Tata Hall` · `⏰ 11:40 AM to 5:00 PM` · `🍽️ Fellowship Lunch Included` | Replaces vacuous corporate SaaS platitudes with essential event facts. |
| **Hero CTA** | `OPEN LETTER DIRECTLY` | `Open Your Invitation ↓` | Natural, inviting button text. |
| **Envelope Header** | `✦ OFFICIAL CORRESPONDENCE · MCA BATCH 2026–2028 ✦` | `A SPECIAL WELCOME · MCA BATCH 2026–2028` | Replaces cold bureaucratic phrasing with personal warmth. |
| **Invitation Salutation** | Dense 45-word run-on itinerary | *"Dear Juniors, Welcome to Srusti Academy! Today, you become an irreplaceable part of our MCA family. We’ve planned a day full of fun icebreakers, heartfelt performances, and great food. Leave your nervousness at the door, dress in your finest, and come celebrate with us."* | Real personal letter from seniors addressing juniors' first-day jitters. |
| **Card Cheer Button** | `Cheer for us` | `Can't Wait to Celebrate! 🎉` | Corrects perspective reversal. |
| **Agenda Event 1** | `THE SENIOR-JUNIOR CONFLUENCE` · `Batch Induction & Camaraderie` | `Welcome & Batch Icebreakers` · `First bonds & campus introductions` | Relatable college terminology. |
| **Agenda Event 2** | `GRAND FELLOWSHIP LUNCH` · `Fellowship Feast` | `Grand Freshers Lunch` · `Festive meal with batchmates & faculty` | Removes pseudo-medieval "feast" phrasing. |
| **Agenda Event 3** | `MR. & MRS. FRESHER ’26` · `Premier Honours & Accolades` | `Mr. & Mrs. Fresher ’26` · `Talent showcase, ramp walk & crowning` | Accurate event description. |
| **Agenda Event 4** | `CELEBRATION FINALE & OPEN DJ FLOOR` · `Grand Finale` | `Open DJ Floor & Celebration Dance` · `Music, dancing & batch memories` | Energetic student finale. |
| **Footer Attribution** | `"Designed & Developed with Heart by True Inspire & Tejas Team"` | `"Organized with pride by the Seniors of MCA (Batch 2025–2027) · Srusti Academy of Management & Technology, Bhubaneswar"` | Authentic student cohort pride. |

---

### 5. ENVELOPE REDESIGN & RESPONSIVE STRATEGY

```
+-------------------------------------------------------+
|  Sticky Navbar (z-index: 1000)                        |
+-------------------------------------------------------+
   | (Adequate scroll margin: 80px)
   v
+-------------------------------------------------------+
|  .env-stage                                           |
|                                                       |
|  +-------------------------------------------------+  |
|  | .env-card (Revealed: max-height: 80vh)          |  |
|  | - Srusti Academy Header & "Fold Back" Button     |  |
|  | - Clean Tejas '26 Lotus Title                   |  |
|  | - Genuine Senior Welcome Message                 |  |
|  | - Key Coordinates: 28 Oct · 11:40 AM · JRD Hall  |  |
|  | - Actions: [View Programme ↓] [Can't Wait! 🎉]  |  |
|  +-------------------------------------------------+  |
|                                                       |
|  +-------------------------------------------------+  |
|  | .env-chassis (Rich Burgundy Velvet Texture)     |  |
|  | - Gold Seam Trim (Subtle, Non-Neon)             |  |
|  | - Debossed Tejas Lotus Wax Seal                 |  |
|  |   (Zero Roman laurels; elegant card frame)      |  |
|  +-------------------------------------------------+  |
+-------------------------------------------------------+
```

1. **Flap & Seal Geometry**:
   - Streamline the wax seal to a 48px circle featuring the custom sculpted **Tejas Lotus** emblem with a realistic beveled wax rim.
   - Remove the two flanking Roman laurel branches entirely.
2. **Card Geometry & Overflow**:
   - Change translation to relative/responsive units: `isMobile ? -230px : -380px` with `max-height: 82vh` and internal smooth scroll if screen height is constrained.
   - Give the envelope stage `scroll-margin-top: 90px` to guarantee zero overlap with the sticky navbar.
3. **Accessibility**:
   - Upon card reveal, auto-focus moves to the `.card-reseal-btn` ("Fold Back").
   - Pressing `Escape` at any time cleanly folds the card back into the pocket and returns focus to the chassis.

---

### 6. IMPLEMENTATION ORDER & STAGES

- **STAGE 1**: Critical Fixes (P0) — A11y gate, date synchronization, social meta, calendar timezone.
- **STAGE 2**: Hero & Navigation Refinement — Quick facts, de-AI copy, mobile drawer A11y.
- **STAGE 3**: Envelope & Invitation Card Redesign — Flanking laurels removal, lotus wax seal, responsive card layout, focus trap.
- **STAGE 4**: Schedule, Dress Code & Footer Refinement — Genuine copywriting, credit cleanup, filigree overflow fixes.
- **STAGE 5**: Stylesheet Harmonization — Clean design tokens, remove dead CSS rules, test builds.
- **STAGE 6**: Responsive & Multi-Viewport Verification — Test across 360px, 390px, 768px, 1440px.

---

### 7. ACCEPTANCE CRITERIA

1. **Functional**:
   - Cinematic intro skippable immediately from 0.0s via click or `<kbd>Esc</kbd>`.
   - Envelope opens/closes cleanly with zero stuck states, smooth audio chimes, and no canvas confetti leaks.
   - Google Calendar opens with 11:40 AM – 5:00 PM IST.
2. **Visual & Copywriting**:
   - Zero AI buzzwords ("Confluence", "Sacred Bonds", "Fellowship Feast", "True Inspire").
   - Exactly one event date throughout: **Wednesday, 28 October 2026**.
   - Exactly one reporting time throughout: **11:40 AM**.
   - Clean, elegant lotus insignia replaces Roman laurel branches and Soviet star.
3. **Accessibility**:
   - Passes WCAG 2.1 Level AA for contrast on card text (minimum 4.5:1).
   - Full keyboard navigation loop operates seamlessly without focus drops.
   - Respects `prefers-reduced-motion: reduce`.
4. **Responsive**:
   - Flawless display across 360×800, 390×844, 768×1024, and 1440×900 without horizontal overflow or clipped card elements.
5. **Build**:
   - `npm run build` succeeds in <5s with 0 errors.

---

### 8. DEFINITION OF COMPLETION

The implementation is complete when:
- All source files are updated.
- Automated `npm run build` succeeds.
- Browser subagent verifies all 4 viewports with screenshot evidence.
- `docs/ai-generic-audit/09_IMPLEMENTATION_REPORT.md` is compiled with verified outcomes.
