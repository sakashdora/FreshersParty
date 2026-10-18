# TEJAS ’26 — THE FRESH BLOOM
## Evidence-Based AI-Generic Design Audit & Remediation Blueprint
### Document 06: Quality Assurance & Regression Test Checklist

---

### 1. TESTING FRAMEWORK & PROTOCOL

This checklist defines rigorous, testable verification procedures across functional, responsive, accessibility, visual, and performance vectors.

Each test is designated with:
- **Phase**: `[AUDIT-EXECUTED]` (Tested and verified during the audit phase) or `[REMEDIATION-TARGET]` (To be executed post-implementation).
- **Status**: `PASS`, `FAIL`, or `PENDING`.
- **Criteria**: Clear objective pass/fail condition.

---

### 2. CORE INTERACTION & INTRO OVERTURE TESTS

| Test ID | Description | Phase & Status | Test Procedure | Expected Result |
| :--- | :--- | :---: | :--- | :--- |
| **QA-INT-01** | Intro Auto-Display on First Visit | `[AUDIT-EXECUTED]`<br>**PASS** | Clear `sessionStorage` and reload page without URL flags. | Cinematic intro gate renders with "Open Invitation" prompt. |
| **QA-INT-02** | Intro Suppression on `?nointro` | `[AUDIT-EXECUTED]`<br>**PASS** | Load `http://localhost:5173/?nointro`. | Intro is completely skipped; hero displays immediately. |
| **QA-INT-03** | Immediate Escape Key Operability | `[REMEDIATION-TARGET]`<br>**PENDING** | Trigger intro, wait 1.0s, press `Escape`. | Intro closes immediately; audio fades out; hero appears. *(Currently FAILS due to 10s delay)*. |
| **QA-INT-04** | Immediate Skip Button Click | `[REMEDIATION-TARGET]`<br>**PENDING** | Trigger intro, click "Skip" at second 0.5. | Intro transitions smoothly to hero without waiting. |
| **QA-INT-05** | Intro Audio Mute Toggle | `[AUDIT-EXECUTED]`<br>**PASS** | Click volume button during intro. | Audio mutes; icon updates to `VolumeX`; unmute restores audio. |
| **QA-INT-06** | Replay Opening Button | `[AUDIT-EXECUTED]`<br>**PASS** | Click "Replay Opening" in sticky navbar. | Page scrolls to top; intro remounts and restarts cleanly. |

---

### 3. INTERACTIVE ENVELOPE & INVITATION CARD TESTS

| Test ID | Description | Phase & Status | Test Procedure | Expected Result |
| :--- | :--- | :---: | :--- | :--- |
| **QA-ENV-01** | Desktop 3D Parallax Tilt | `[AUDIT-EXECUTED]`<br>**PASS** | Hover mouse across sealed envelope on 1440px viewport. | Envelope subtly tilts (max ±6° rotateX/Y) following cursor. |
| **QA-ENV-02** | Wax Seal Click Opening | `[AUDIT-EXECUTED]`<br>**PASS** | Click center wax seal medallion. | Flap unfolds (-180°); card slides up; chime plays; confetti fires. |
| **QA-ENV-03** | Envelope Chassis Click Opening | `[AUDIT-EXECUTED]`<br>**PASS** | Click anywhere on the sealed envelope pocket. | Triggers identical open sequence cleanly. |
| **QA-ENV-04** | Hero CTA Button Synchronization | `[AUDIT-EXECUTED]`<br>**PASS** | Click "Open Letter Directly" button in hero. | Envelope opens and scrolls smoothly into center view. |
| **QA-ENV-05** | Mobile Card Header Clearance (360px) | `[REMEDIATION-TARGET]`<br>**PENDING** | Open envelope on 360 × 740 px mobile viewport. | Card top header sits below sticky nav; no overlap occurs. *(Currently FAILS)*. |
| **QA-ENV-06** | Mobile Card CTA Accessibility | `[REMEDIATION-TARGET]`<br>**PENDING** | Inspect opened card on 390 × 844 px viewport. | Both "View Programme" and "Cheer" buttons are 100% visible and tappable. |
| **QA-ENV-07** | Fold Back Button Resealing | `[AUDIT-EXECUTED]`<br>**PASS** | Click "Fold Back" inside opened card. | Card retracts into envelope; flap closes; seal restores. |
| **QA-ENV-08** | Escape Key Card Resealing | `[AUDIT-EXECUTED]`<br>**PASS** | Press `Escape` while card is open. | Card retreats and reseals cleanly. |
| **QA-ENV-09** | Repeated Rapid Open/Close Cycles | `[AUDIT-EXECUTED]`<br>**PASS** | Rapidly click envelope 10 times in 5 seconds. | FSM state guards (`isBusy`) prevent animation desync or freezing. |
| **QA-ENV-10** | Confetti Memory Leak Prevention | `[REMEDIATION-TARGET]`<br>**PENDING** | Open/close envelope 15 times; inspect DevTools Elements DOM. | No zombie canvas elements linger in document root. |

---

### 4. RESPONSIVE DESIGN & VIEWPORT RENDERING TESTS

| Test ID | Description | Phase & Status | Test Procedure | Expected Result |
| :--- | :--- | :---: | :--- | :--- |
| **QA-RSP-01** | Desktop Wide Canvas (1440 × 900 px) | `[AUDIT-EXECUTED]`<br>**PASS** | Inspect full page layout at 1440px width. | Balanced margins; 4 essentials cards inline; 4 agenda rows centered. |
| **QA-RSP-02** | Tablet Canvas (768 × 1024 px) | `[REMEDIATION-TARGET]`<br>**PENDING** | Inspect navigation bar and cards at 768px. | Sticky nav links do not wrap or overflow horizontally. *(Currently FAILS)*. |
| **QA-RSP-03** | Standard Mobile (390 × 844 px) | `[AUDIT-EXECUTED]`<br>**PASS** | Inspect hero, dress code, and agenda at 390px. | Grid stacks to 2×2 or 1-column; typography remains readable. |
| **QA-RSP-04** | Small Mobile (360 × 740 px) | `[AUDIT-EXECUTED]`<br>**PASS** | Inspect horizontal scrollbar at 360px. | Zero horizontal scrollbar leakage; `window.innerWidth === document.body.clientWidth`. |
| **QA-RSP-05** | Mobile Hamburger Menu Open/Close | `[AUDIT-EXECUTED]`<br>**PASS** | Tap hamburger button in hero top bar. | Drawer slides down; displays 3 navigation links and Replay Intro button. |
| **QA-RSP-06** | Sticky Navbar Appearance on Scroll | `[AUDIT-EXECUTED]`<br>**PASS** | Scroll down past 320px vertical offset. | Sticky navbar transitions from `opacity: 0` to `opacity: 1` smoothly. |

---

### 5. ACCESSIBILITY & MOTION COMPLIANCE (WCAG 2.1 AA)

| Test ID | Criteria / Guideline | Phase & Status | Test Procedure | Expected Result |
| :--- | :--- | :---: | :--- | :--- |
| **QA-A11Y-01**| WCAG 2.1.1: Keyboard Nav | `[REMEDIATION-TARGET]`<br>**PENDING** | Navigate entire page using only `Tab`, `Enter`, and `Escape`. | Every interactive element has visible focus ring; no focus drops. |
| **QA-A11Y-02**| WCAG 2.4.3: Focus on Card Reveal | `[REMEDIATION-TARGET]`<br>**PENDING** | Press `Enter` to open envelope; press `Tab`. | Focus shifts directly to "Fold Back" button. *(Currently FAILS)*. |
| **QA-A11Y-03**| WCAG 2.2.2: Pause/Stop/Hide | `[REMEDIATION-TARGET]`<br>**PENDING** | Verify user can stop cinematic intro immediately. | Skip button accessible from timestamp 0.0s. *(Currently FAILS)*. |
| **QA-A11Y-04**| WCAG 1.4.3: Text Contrast | `[REMEDIATION-TARGET]`<br>**PENDING** | Audit contrast on parchment cards and gold text using axe DevTools. | All normal text >= 4.5:1; large text >= 3.0:1. |
| **QA-A11Y-05**| WCAG 2.3.3: Reduced Motion | `[AUDIT-EXECUTED]`<br>**PASS** | Enable "prefers-reduced-motion: reduce" in OS. | Intro is bypassed; 3D tilt disabled; envelope opens instantly without delay. |
| **QA-A11Y-06**| Screen Reader ARIA Semantics | `[AUDIT-EXECUTED]`<br>**PASS** | Inspect ARIA attributes on envelope, drawer, and buttons. | `aria-expanded`, `aria-label`, and `role="button"` present on key controls. |

---

### 6. CONTENT, COPYWRITING & METADATA VERIFICATION

| Test ID | Description | Phase & Status | Test Procedure | Expected Result |
| :--- | :--- | :---: | :--- | :--- |
| **QA-CNT-01** | Single Event Date Consistency | `[REMEDIATION-TARGET]`<br>**PENDING** | Grep codebase for dates. | Exactly "28 October 2026" in all components; zero "27" or "30 Oct". |
| **QA-CNT-02** | Single Reporting Time Consistency| `[REMEDIATION-TARGET]`<br>**PENDING** | Check `index.html`, card, and agenda. | Exactly "11:40 AM" across all files; zero "10:30 onwards". |
| **QA-CNT-03** | Open Graph Social Preview Card | `[REMEDIATION-TARGET]`<br>**PENDING** | Verify `<meta property="og:image">`. | Resolves to existing 1200×630px image; no `[PUBLIC URL]` placeholders. |
| **QA-CNT-04** | Google Calendar Timezone Accuracy| `[REMEDIATION-TARGET]`<br>**PENDING** | Click "Add to Calendar" button in Agenda. | Opens Google Calendar with correct IST start time (11:40 AM) and end time (5:00 PM). |
| **QA-CNT-05** | De-Jargonized Authentic Voice | `[REMEDIATION-TARGET]`<br>**PENDING** | Review copy across hero, card, and timeline. | No "SaaS feature pillars", "Confluence" over-repetition, or "Cheer for us" reversals. |

---

### 7. CODE INTEGRITY, PERFORMANCE & REGRESSION CHECKS

| Test ID | Description | Phase & Status | Test Procedure | Expected Result |
| :--- | :--- | :---: | :--- | :--- |
| **QA-PRF-01** | Production Build Cleanliness | `[AUDIT-EXECUTED]`<br>**PASS** | Run `npm run build` in PowerShell. | Vite build succeeds with 0 errors; bundles output to `dist/`. |
| **QA-PRF-02** | Stylesheet Consolidation | `[REMEDIATION-TARGET]`<br>**PENDING** | Inspect network tab CSS transfer size. | CSS payload reduced from ~191 KB to <35 KB. |
| **QA-PRF-03** | Unused Media Asset Purge | `[REMEDIATION-TARGET]`<br>**PENDING** | Check `/public` directory size. | Over 15 MB of unreferenced assets deleted. |
| **QA-PRF-04** | Console Log Cleanliness | `[AUDIT-EXECUTED]`<br>**PASS** | Inspect browser DevTools Console during full visit. | Zero red errors, zero unhandled promise rejections. |
| **QA-PRF-05** | Package Name Sanitation | `[REMEDIATION-TARGET]`<br>**PENDING** | Check `package.json`. | `"name": "tejas-26"` (eliminating legacy `"sangama-26"`). |
