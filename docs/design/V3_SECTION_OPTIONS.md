# TEJAS '26 — THE FRESH BLOOM
## V3 Section Design Options (Second Pass — Genuinely Distinct Concepts)
**Date:** October 2026 | **Status:** Planning Phase Only | **No Code Modified**

---

> **Design Distinctiveness Standard**
>
> Each set of five options must differ in **underlying composition logic**, not surface decoration.
> A gold color vs. rose color is NOT a distinct option. A full-bleed typography sequence vs. a botanical
> illustration reveal IS a distinct option — because they differ in: visual language, layout structure,
> technical approach, emotional register, and implementation method.
>
> If two options could be described as "the same layout with different colors," they fail this standard
> and are not counted as distinct.

---

## Section 1 — Cinematic Intro

### The Core Problem Being Solved
The V2 intro (4.83/10) traps mobile users for 5.9 seconds, plays audio before user gesture, and uses a cosmic/celestial aesthetic that does not reference "The Fresh Bloom." V3 must fix all three issues.

**Non-negotiable requirement across all five options:**
- A visible, touch-accessible skip button must appear within 1 second of the intro starting.
- All audio must wait for user interaction.

---

### Option A — Pure Kinetic Typography (Film Title Sequence)
**Concept:** The screen is completely dark. No canvas, no particles, no atmospheric decoration. Pure typographic power — influenced by David Fincher film title sequences and editorial magazine opening spreads.

**What happens:**
1. 0–0.5s: Black. Silence. 
2. 0.5–1.2s: "TEJAS" stamps onto the screen letter by letter, each letter appearing with a punched-in hard-edge reveal (clip-path from bottom). Typeface: Cinzel, 140px, tracking +0.08em.
3. 1.2–2.0s: A thin horizontal gold rule (1px) draws itself across the full viewport width, cleaving the space.
4. 2.0–2.6s: "'26" drops from above, overlapping the rule, in a 100px Fraunces italic. A brief overshoot (spring physics).
5. 2.6–3.4s: "THE FRESH BLOOM" fades up in Outfit 13px, tracked at +0.35em. Below it, a single botanical line illustration — a stem with 3 buds (SVG, 80px wide) — draws itself in 0.6s.
6. 3.4–4.2s: Two date coordinates appear in a side-by-side arrangement: "27 OCT" and "30 OCT" in small tabular figures.
7. 4.2–5.0s: Hold. Skip button appears at bottom right throughout. Auto-dismiss at 5.0s.

**Why this is distinct from other options:** No atmosphere, no canvas, no particles, no environmental simulation. Every pixel of screen space is either empty (negative space doing work) or deliberate typographic content.

**Technical approach:**
- Motion for React `variants` for staggered text reveal
- CSS `clip-path: inset(100% 0 0 0)` → `inset(0)` for letter stamps
- SVG `stroke-dasharray`/`stroke-dashoffset` for botanical line draw
- Single SVG element (the botanical stem) — no canvas
- Zero audio dependency

**Estimated implementation:** 1 component, ~120 lines JSX, ~80 lines CSS

**Honest weaknesses:**
- Requires strong typography from web fonts loading in time (FOUT risk if Cinzel/Fraunces not preloaded)
- The botanical line illustration requires SVG path creation skill — cannot be stock
- Less "wow" on first half-second vs. atmospheric options — user must wait for the sequence to build
- Depends entirely on typography — if the font doesn't load, the option fails entirely

**Score ceiling:** 8.2/10 if executed with discipline. Can feel cold and austere if the typefaces don't have enough personality.

---

### Option B — Botanical Petal Reveal (Direct "Bloom" Reference)
**Concept:** The screen starts as deep forest-green (`#1C2D1E`). At the center, a single flower bud — an SVG path animated bloom — unfurls petal by petal until it fills ~40% of the viewport. As it opens, it reveals the TEJAS wordmark within the petals. The flower's colors are crimson, gold, and ivory. The background shifts from forest green → deep burgundy → warm cream as the flower opens.

**What happens:**
1. 0–0.6s: Dark green ground. A single seed point glows at center.
2. 0.6–2.4s: SVG petals unfold one by one (8 petals, 0.22s stagger each), using `path` morph animation. Each petal is a different opacity and slightly different crimson-to-gold gradient.
3. 2.4–3.0s: Background cross-fades from green to the familiar deep burgundy.
4. 3.0–3.6s: "TEJAS '26" appears inside/above the fully opened flower, rising up from the center on a `y: 20 → 0` animation.
5. 3.6–4.2s: "THE FRESH BLOOM" and date coordinates fade in below the flower.
6. 4.2–5.0s: Hold. Flower very gently breathes (scale 1.0 → 1.02 → 1.0, 3s loop).

**Why this is distinct:** The botanical metaphor is literal and intentional. The visual directly answers "what is The Fresh Bloom?" Unlike options A, C, D, E — this option makes the theme visible, not just described.

**Technical approach:**
- SVG path animation using Motion for React `animate` on `d` attribute (path morphing)
- Each petal is a separate `<path>` element with its own `initial`/`animate` variant
- Background color transition via CSS custom property animation
- Canvas: none required

**Honest weaknesses:**
- SVG path morphing for 8 petals requires custom-designed SVG paths — not trivially generated
- The "flower at center" composition is visually expected / clichéd for themes involving "bloom"
- If the petals are not drawn with high craft, this becomes kitsch quickly
- Forest green starting background may confuse users who see a color not in the TEJAS brand palette
- Motion for React's `d` attribute morphing can have interpolation artifacts if paths don't have equal vertex counts

**Score ceiling:** 8.5/10 if SVG art quality is high. 6.0/10 if petals look generated or rough.

---

### Option C — Theatre Curtain Rise (Celebration Frame)
**Concept:** Two velvet curtains — one from the left edge, one from the right — pull apart horizontally, revealing a lit stage behind them. The curtains have CSS-simulated fabric fold shadows. As they open, stage spotlights appear (radial gradients on the background), and "TEJAS '26" is illuminated center-stage. This uses the "performance" and "celebration" context of freshers day directly.

**What happens:**
1. 0–0.0s: Curtains cover the full screen. Left curtain: deep crimson CSS gradient with fold shadows. Right curtain: same.
2. 0–1.8s: Both curtains slide apart simultaneously (left curtain translateX 0 → -52vw, right curtain translateX 0 → +52vw) with a spring ease (overshoot, settle).
3. 1.8–2.4s: Spotlights bloom from above (2–3 radial gradients, warm cream color, animating from opacity 0 → 0.7).
4. 2.4–3.0s: "TEJAS '26" drops from above (theatrical reveal — like a cue card descending).
5. 3.0–3.8s: Tagline and dates appear at lower stage.
6. 3.8–5.0s: Hold. Applause sound effect (user-triggered only).

**Why this is distinct:** Frame-within-frame composition. The intro is literally a theatre curtain opening on a stage — the metaphor directly references the performance and ceremony aspect of freshers day. None of the other four options use spatial framing.

**Technical approach:**
- CSS `transform: translateX()` for curtain slide with cubic-bezier spring
- CSS gradient with vertical banding for curtain fold simulation (no texture image needed)
- Radial gradient divs for spotlights
- No canvas required

**Honest weaknesses:**
- Theatre metaphor is a well-worn animation trope (used on countless PowerPoint presentations and Keynotes)
- CSS-simulated fabric folds are plausible but will never look as good as real fabric photography
- The opening direction (horizontal split) is the only natural curtain motion — there is no variation in composition
- May feel more "school play" than "premium event" depending on execution quality
- The dark curtain colors fill the screen for 1.8 seconds before anything is revealed — users might perceive this as a slow load

**Score ceiling:** 7.8/10. The concept is legible and technically clean but the trope risk limits its ceiling.

---

### Option D — Photographic Background Reveal (Grounded Realism)
**Concept:** A full-bleed, conceptual photograph (AI-generated to look like JRD Tata Hall or a celebration space) fills the screen in a heavily blurred, dark state. Over 3–4 seconds, the blur clears and the exposure lifts, revealing the venue. Text overlays appear sequentially. This is deliberately not abstract — it grounds the invitation in the real physical space where the event will happen.

**What happens:**
1. 0–0.5s: Full-bleed image at `filter: blur(40px) brightness(0.2)`. Text: "27–30 OCT 2026" in top-left corner in tiny Outfit monospace.
2. 0.5–2.5s: `blur(40px)` → `blur(0)` and `brightness(0.2)` → `brightness(0.7)`. Transition: slow, deliberate. The space reveals itself.
3. 2.5–3.0s: TEJAS '26 text appears over the image with a large drop-shadow and brand-colored background block behind it (legibility treatment).
4. 3.0–4.0s: Event details appear in an overlay card at bottom-left (newspaper-style caption treatment).
5. 4.0–5.0s: Hold. Vignette intensifies slightly to frame the text.

**Why this is distinct:** Every other option is abstract (typography, botany, theatre, letter). This option is real. It uses a photograph of the actual or representative venue, which creates an emotional anchor — "this is happening in a real place." The blur-to-reveal is a photographic technique (rack focus in cinematography), not a UI animation.

**Technical approach:**
- CSS `filter` transition (blur + brightness) on a single `<img>` or `<div>` with background-image
- High-quality AI-generated venue image (generated via tool during implementation)
- Overlay text uses CSS backdrop-filter on a frosted card for legibility
- No canvas required

**Honest weaknesses:**
- Depends entirely on image quality — a poor image choice or poor composition makes this flat
- Generates no sense of motion or kinetic energy — the blur-to-reveal is atmospheric, not dramatic
- On slow connections, the image may not load before the animation begins (FOUC risk)
- A generated image of a venue that doesn't look exactly like JRD Tata Hall may read as misleading to people who know the real space

**Score ceiling:** 7.5/10. Emotionally grounded but not kinetically exciting. Depends heavily on photo art direction.

---

### Option E — Letter Origin Story (Narrative Loop)
**Concept:** The intro is the birth of the envelope. A blank piece of ivory paper floats into view from off-screen. Text types itself onto the paper — "Dear Juniors..." then the key invitation line. The paper then folds itself into an envelope (SVG morphing). The sealed envelope slides off-screen, and simultaneously the main site's hero appears — where that same envelope is waiting to be opened. The intro and the first section are narratively connected.

**What happens:**
1. 0–0.8s: Blank parchment paper slides into view from bottom, settles at center. Subtle paper texture in CSS.
2. 0.8–2.0s: A typewriter cursor blinks. Then text types: "Dear Juniors, You are warmly invited..." — only 2 lines of copy.
3. 2.0–3.0s: Paper folds (SVG path morph: flat rectangle → envelope shape). This is the main technical challenge.
4. 3.0–3.8s: The resulting envelope shape — complete with the wax seal icon — floats to the right edge of screen.
5. 3.8–4.2s: The envelope disappears off-screen right, and simultaneously the hero's envelope (in the main site) appears with a `scaleY: 0.8 → 1.0` pop.
6. 4.2s: Transition complete. Main site visible.

**Why this is distinct:** This is the only option that treats the intro and the first section as one continuous story. The envelope in the main site is not a separate element — it is the same envelope the user just watched being written and sealed. This creates genuine narrative continuity.

**Technical approach:**
- CSS paper texture (using CSS gradients — no image file)
- CSS typewriter effect using `ch` unit animation or character-by-character JS
- SVG clip-path morph for the folding animation (paper → envelope) — technically the hardest element
- Coordinate pass: the folded envelope's end position in the intro should visually align with the envelope section's starting position in the main site. This requires careful layout planning.

**Honest weaknesses:**
- SVG paper-to-envelope morphing is complex — simple path morphing will look mechanical, not like real folding
- Timing must be precisely coordinated with the main site's envelope render — a mismatch in position/size breaks the illusion
- The typewriter text typing at 2.0–3.0s is a popular cliché (every "personal message" animation uses typewriter effect)
- If the user has already seen the intro (session storage), the envelope in the main site appears without the origin story — the narrative only works on first visit

**Score ceiling:** 8.8/10 if the folding animation is beautifully executed and the narrative continuity lands. 6.0/10 if the fold is mechanical or the coordinate handoff fails.

---

### Intro Options Comparison

| Criterion | A: Typography | B: Botanical | C: Theatre | D: Photo | E: Letter Origin |
|-----------|-------------|------------|-----------|---------|----------------|
| "Bloom" reference | Implicit (botanical line) | Explicit (literal flower) | None | None | None |
| Kinetic energy | High | Medium | High | Low | Medium |
| Technical complexity | Low | Medium-High | Low | Low | High |
| Mobile-friendliness | High | High | High | Medium | Medium |
| Risk of kitsch | Low | High if art is poor | Medium | Low | Medium |
| Narrative connection to site | None | None | None | None | Strong |
| **Best for** | Premium restraint | Identity alignment | Celebration energy | Emotional anchor | Story coherence |

**Recommended for V3:** Option A or Option E. Option A is safer (lower technical risk, higher design quality floor). Option E has the highest potential ceiling but requires precise SVG animation execution.

---

## Section 2 — Hero Section

### The Core Problem Being Solved
The V2 hero has 5 levels of text hierarchy (eyebrow → H1 → tagline → 63-word paragraph → nav chips). This creates visual noise, not emphasis. The envelope and hero text sit side by side, but the relationship between them is compositional, not narrative.

---

### Option A — Stacked Editorial (Typography-Forward)
**Concept:** The hero abandons the split grid. Instead, a single-column editorial layout with massive display text. "TEJAS '26" at 96–120px across the full width, with "THE FRESH BLOOM" as a second line in a contrasting typeface (Fraunces italic vs. Cinzel upright). Below: a single line of metadata (date · venue), then a large, prominent "Open Invitation" CTA. The envelope is not shown in the hero — it slides in from below as the first section.

**Hierarchy (3 levels max):** Display title → Metadata line → CTA button

**Layout:** Full-width single column. TEJAS title bleeds edge-to-edge with slight negative letter-spacing.

**Honest weakness:** Removing the envelope from the hero reduces immediate visual interest. The hero becomes entirely typographic — which works if the typography is outstanding, but is risky if font loading fails.

---

### Option B — Split Diptych (Current Pattern, Refined)
**Concept:** Retain the left/right split but fix the V2 problems. Left: reduce to 3 hierarchy levels (H1 → one-line tagline → minimal CTA). Right: the envelope, but presented as the only right-column element — no competing text. The two columns are separated by a single vertical gold rule.

**Key difference from V2:** Remove the 63-word paragraph entirely from the hero. Move it inside the envelope letter. Remove all nav chips from the hero — navigation belongs in a scroll-triggered sticky header.

**Honest weakness:** This is an evolution of V2, not a reinvention. It will look similar to V2 on first impression.

---

### Option C — Immersive Full-Bleed (Poster Composition)
**Concept:** The hero takes the full viewport height. A large background image (generated: abstract floral watercolor wash in burgundy and gold tones) fills the hero. All text overlays the image with a semi-transparent backdrop panel. The envelope is not in the hero — it is revealed as users scroll.

**Honest weakness:** Image dependency. Generated art in the background risks feeling "wallpaper" — decorative but meaningless.

---

### Option D — Horizontal Scroll Entry
**Concept:** The hero is the only section that does not scroll vertically. It is a horizontal scroll carousel: first panel = TEJAS title; second panel = event details; third panel = envelope entry (sealed). After the user reaches the third panel, the layout locks into vertical scroll for all subsequent sections.

**Honest weakness:** Horizontal scroll is disorienting and fights the browser's natural scroll direction. Accessibility tools do not handle horizontal scroll well. This is a high-risk pattern.

---

### Option E — Countdown Integration
**Concept:** The hero centerpiece is a live countdown to 30 October 2026. Large digits (Fraunces, tabular numbers, large). Below the countdown: "TEJAS '26 — The Fresh Bloom." The envelope is secondary, accessible via a CTA. The countdown creates urgency and time-sensitivity that the current hero lacks.

**Honest weakness:** After 30 October, the countdown becomes negative and the hero breaks. Requires conditional logic. The countdown may also create anxiety rather than excitement if the event feels far away.

---

## Section 3 — Invitation Letter (Envelope Opened State)

### The Core Problem Being Solved
When the V2 envelope opens, the letter body is centered-aligned prose which is harder to read. The re-fold button is tiny and buried at top-right. The letter does not feel like a premium printed letter.

---

### Option A — Left-Aligned Newspaper Column Letter
**Layout:** The opened letter renders as a two-column newspaper-style layout. Left column: the letter body copy (left-aligned, 16px Fraunces, line-height 1.8). Right column: the event coordinate card (date, time, venue). A decorative drop cap "D" for "Dear Juniors."

**Why distinct:** This is the only option that uses multi-column layout inside the letter.

---

### Option B — Handwritten Script Overlay
**Layout:** The printed letter body stays, but overlaid is a CSS-animated "handwritten" signature that draws itself with SVG stroke animation. The letter feels hand-addressed by a senior who actually signed it. A signature SVG path (a stylized "Your Seniors" in script) animates after opening.

**Why distinct:** The only option that adds personalization through simulated handwriting.

---

### Option C — Folded Paper Reveal (Step-by-Step Unfold)
**Layout:** The letter physically unfolds in 3 steps: first fold reveals the salutation; second fold reveals the body; third fold reveals the coordinates and signature. Each fold is a CSS rotateX animation, like unfolding a real piece of paper. The user can swipe or click to unfold each section.

**Why distinct:** The only option with interactive sequential revelation inside the letter.

---

### Option D — Telegram / Invite Card Format
**Layout:** The letter is presented not as A4 prose but as a premium invite card — landscape orientation, center-aligned (appropriate for a card, not for prose), with a decorative border and RSVP section at the bottom. Style inspiration: luxury wedding invitation cards.

**Why distinct:** Changes the document format entirely from letter → card. Short copy, maximum visual weight per word.

---

### Option E — Scroll-Activated Letter (Revealed as User Reads)
**Layout:** When the envelope opens, the letter is partially visible. As the user scrolls within the letter, each paragraph fades in progressively. The event coordinate card appears only after the user has "read" to the end of the letter. This rewards reading vs. skimming.

**Why distinct:** Only option that uses scroll-within-letter as a narrative device.

---

## Section 4 — Milestones (27 Oct / 30 Oct)

### The Core Problem Being Solved
V2 milestones uses the same eyebrow pill badge + centered content pattern as every other section. There is no visual differentiation between a milestone and any other content block.

---

### Option A — Large-Numeral Editorial Pair
**Layout:** Two dates displayed as extremely large numerals — "27" and "30" at 180px in a condensed display font — flanking a center column of event details. The numbers act as background/decorative elements while the event info sits between them.

---

### Option B — Horizontal Timeline Rail
**Layout:** A horizontal hairline runs the full viewport width. Two nodes sit on the line — one at 27%, one at 73%. Each node has a date above and event name below. Hovering a node expands it with full details. This is the only section that implies progression through time on a spatial axis.

---

### Option C — Stacked Full-Bleed Panels
**Layout:** Two full-width, full-height panels stacked vertically. "27 OCT" fills the first panel with a background treated differently (lighter, blush-toned). "30 OCT" fills the second with the primary burgundy treatment. No pill badges. Each panel is a single-purpose composition.

---

### Option D — Reveal-on-Hover Card Pair
**Layout:** Two large cards, initially showing only the date and event name. On hover (desktop) or tap (mobile), the card flips to reveal the full event details on the reverse. CSS 3D card flip — similar to the envelope mechanic but applied to rectangular milestone cards.

---

### Option E — Newspaper Front Page
**Layout:** Styled as a newspaper front page — masthead "THE TEJAS HERALD" at top, then two newspaper articles below: "OCTOBER 27: THEME & BANNER REVEAL — DEPARTMENT OF MCA ANNOUNCES..." and "OCTOBER 30: FRESHERS DAY GALA AT JRD TATA HALL." With decorative column rules and a vintage serif typeface for the body.

---

## Section 5 — Agenda (13 Sessions)

### The Core Problem Being Solved
The agenda has 13 sessions. The V2 solution is a list of cards with filter chips. The challenge is making 13 items feel scannable and elegant, not like a data table.

---

### Option A — Timeline Spine (Current-Like, Refined)
A single vertical line down the center of the section. Sessions hang off the line as nodes. Odd-numbered sessions on the left, even on the right. The current time (if within the event window) glows on the timeline. Very visual "it's happening in sequence" representation.

---

### Option B — Accordion with Visual Dividers
13 sessions as collapsed accordion rows. Each row shows: time + title. Expanding shows: description, speaker, location. Beautiful accordion with spring animation. Decorative gold dividers between rows. No filter chips needed — the accordion is its own navigation.

---

### Option C — Masonry Grid Cards
A 3-column masonry grid (1 column on mobile) where each session is a card of varying height based on content. Sessions with more details have taller cards. Light gold card backgrounds. Scroll reveal for each card row.

---

### Option D — Horizontal Schedule Scroll
A horizontally scrollable timeline — like a Gantt chart. Time on the X-axis, sessions as blocks. Users swipe left-right to see the full day. On mobile: thumb-friendly horizontal scroll. On desktop: mouse-wheel horizontal scroll.

**Honest weakness:** Horizontal scroll fights browser behavior. Only justified if the time-axis is genuinely important to the agenda's readability.

---

### Option E — Magazine Feature Layout
The agenda is presented as a magazine feature spread — editorial photography (generated) for the key sessions, with the full programme listed in a sidebar. The top 3 sessions get visual hero treatment. The remaining 10 are in a compact typeset list. More like a printed programme than a web component.

---

## Section 6 — Visual Gallery

### The Core Problem Being Solved
V2 gallery uses generated placeholder images that don't read as authentic campus photography. Any gallery for an event website must either use real photos or make the fictional-image context clear.

---

### Option A — Honest Illustrated Concept Gallery
**Concept:** Explicitly illustrated — not pretending to be photographs. A curated set of digital illustrations (generated) showing campus scenes, celebration moments, and the TEJAS color palette. Each illustration has a caption explaining what it depicts. The section header reads "A Glimpse of What Awaits" — framing them as illustrations, not photos.

---

### Option B — Placeholder Photography with Real-Photo CTA
**Concept:** The gallery has 6 placeholder image slots, each with a clear overlay: "Photo coming soon — [Description]." A prominent CTA invites seniors to submit photos: "Share your moments." This is honest about the pre-event state.

---

### Option C — Typography-Only Gallery
**Concept:** No images at all. Instead, a gallery of pull-quote moments: large-typeset statements from imagined attendees, set in editorial poster format. "The moment you walked in and knew you were home." Each quote is full-width with a background color. This acknowledges that the event hasn't happened yet.

---

### Option D — Mood Board Collage
**Concept:** A tightly packed collage of brand colors, textures (fabric swatch visual, petal close-up, gold foil texture), typography specimens from the event, and abstract geometric shapes. Like a brand mood board. Honest: it is clearly not photography but clearly purposeful.

---

### Option E — Video/Animation Teaser
**Concept:** The gallery section becomes a single full-width video embed or CSS animation — a 30-second looping "what to expect" teaser. Not photos, but motion. Can be created from generated images in a slideshow with Ken Burns effects.

---

## Section 7 — Cheers / Celebration

### The Core Problem Being Solved
V2's CelebrationCheers section is the weakest in terms of visual ambition. It is a generic confetti-trigger section.

---

### Option A — Wall of Good Wishes (Interactive Message Board)
Students can type and "post" a celebration message. Messages appear as floating sticky notes on a cork board. Pre-populated with 8-10 warm messages. This creates social engagement.

---

### Option B — Name Reveal Interaction
A grid of 20-30 name cards (the incoming juniors' batch, represented generically as "Fresher 2026"). Each card reveals a celebration wish when tapped. For privacy: use generic "To the Class of 2026" cards rather than real names.

---

### Option C — Confetti Lab (Interactive Physics)
A canvas-based confetti interaction where the user can choose the confetti style (petals, stars, ribbons) and click to launch. Satisfying physics simulation. Pure delight with no functional purpose — which is appropriate for a celebration section.

---

### Option D — Cheers Reaction Bar (Social Media Style)
A row of large emoji/icon reactions: 🎉 🌸 ✨ 💛. Each shows a count. Users tap to add their reaction. The count increments in real-time (local-only — no backend required; persists in localStorage). Creates a sense of collective participation.

---

### Option E — Handwritten Dedication Wall
A simulated corkboard with handwritten-style text cards (using a handwriting CSS font like Caveat from Google Fonts). Pre-populated with warm dedications from fictional seniors. Users can add one more card (client-side only, appears just for their session). Warm, intimate, personal.

---

## Section 8 — Closing Sign-Off / Footer

### The Core Problem Being Solved
V2's ClosingSignOff is a minimal departmental credit. A closing section should provide emotional resolution, not just administrative information.

---

### Option A — Warm Letter Closure
The closing section is styled as the final page of the invitation letter — same ivory parchment background as the envelope. "With warm wishes and excitement, Your Seniors, Department of MCA, Srusti Academy." A calligraphic dash at the end.

---

### Option B — Full-Width Department Seal
A large (300px) SVG of the Department of MCA seal centered on a deep burgundy background. Beneath it: department name, institution name, and "TEJAS '26." Minimal, architectural, authoritative.

---

### Option C — Countdown to Event Day (If Pre-Event)
A gentle live countdown in the footer: "30 October 2026 · JRD Tata Hall · [X days] [Y hours] [Z minutes] [W seconds]." Gives the footer a reason to be visited repeatedly.

---

### Option D — Social Share CTA
Clean closing with a large "Share This Invitation" button that generates a shareable link or uses the Web Share API. Encourages students to spread the word. Followed by department credits.

---

### Option E — Acknowledgment Credit Typeset
Footer styled as a typeset end-of-programme acknowledgment — like the credits at the end of a theatre programme. "Presented by the Senior Batch of MCA. Designed and hosted by [name]. Special thanks to [faculty name]." Elegant serif text with careful leading. No design decoration — pure typography.

---

*All options are genuinely distinct in composition logic, visual language, technical approach, and emotional register. Options within each section cannot be produced by simply restyling one another.*
