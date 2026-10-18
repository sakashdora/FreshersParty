# TEJAS ’26 — THE FRESH BLOOM
## Evidence-Based AI-Generic Design Audit & Remediation Blueprint
### Document 04: Design System, Typography & Asset Audit

---

### 1. CSS ARCHITECTURE & STYLESHEET COLLISION

#### 1.1 The Dual-Monolith Crisis
The application imports two enormous, divergent CSS stylesheets in `src/main.jsx`:
- Line 8: `import './styles.css';` (4,350 lines · 93.9 KB)
- Line 9: `import './styles-v3.css';` (4,603 lines · 97.3 KB)
- **Combined Volume**: **8,953 lines · 191.2 KB of unminified CSS**.

This architecture arose from an AI-driven "rewrite everything in a new v3 file without deleting the old file" workflow. Because both files are active, hundreds of CSS selectors target the exact same DOM elements with competing properties, creating a chaotic cascade where rule precedence depends purely on import order and CSS specificity hacks.

#### 1.2 Color Token Divergence Matrix
The root token definitions in both stylesheets directly contradict each other:

| Token Concept | `styles.css` Definition | `styles-v3.css` Definition | Conflict & Visual Consequence |
| :--- | :--- | :--- | :--- |
| **Primary Burgundy** | `--c-burgundy: #5B0E23`<br>`--c-burgundy-hover: #430919` | `--c-burgundy-rich: #6E122E`<br>`--c-wine-velvet: #520D22` | Buttons and badges shift between dark brown-maroon and brighter red depending on which stylesheet selector wins. |
| **Deep Wine** | `--c-wine: #380716`<br>`--c-wine-deep: #1A030A` | `--c-wine-oxblood: #360815`<br>`--c-ink-midnight: #060B14` | Envelope background tone jumps from rich plum to charcoal navy. |
| **Solar Gold** | `--c-gold: #D4AF37`<br>`--c-gold-light: #FDEBB2` | `--c-gold-metallic: #C89B38`<br>`--c-gold-radiant: #E5B957` | Gold borders and foil highlights appear dull mustard in some sections and brass in others. |
| **Parchment Surface**| `--c-offwhite: #FAF7F2`<br>`--surface-cream: #FAF6EE` | `--c-parchment-white: #FCFAF6`<br>`--c-parchment-cream: #F7F1E5` | Card backgrounds mismatch section backdrops, creating muddy border seams. |
| **Typography Dark** | `--t-heading: #24050F`<br>`--t-body: #3B2A2F` | `--t-ink-primary: #0A1220`<br>`--t-ink-secondary: #2E3D52` | Headings alternate between warm burgundy-black and cold slate-navy. |

---

### 2. TYPOGRAPHY SYSTEM AUDIT

#### 2.1 Loaded Web Fonts (`index.html:14`)
```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700;800;900&family=Fraunces:ital,opsz,wght@0,9..144,400..700;1,9..144,300..600&family=Outfit:wght@300;400;500;600;700&display=swap" />
```

#### 2.2 Typographic Incoherence Analysis
1. **Font Family Clash (`Cinzel` vs `Fraunces`)**:
   - `Cinzel` is a Roman-inscriptional, all-caps monumental serif based on classical Roman proportions.
   - `Fraunces` is an expressive, organic, 19th-century "wonky" soft serif with high-contrast ball terminals.
   - **Problem**: In `main.jsx` and `InteractiveEnvelope.jsx`, `Cinzel` is used for `.hero-master-title` and card headers, while `Fraunces` is applied to `.card-event-name`, subtitles, and section headers. Jumping between Roman stone-carved capitals and whimsical editorial curves produces jarring aesthetic friction.
2. **Font Loading Payload**:
   - Loading 5 weights of `Cinzel`, variable optical sizes + weights + italics of `Fraunces`, and 5 weights of `Outfit` consumes over **180 KB of compressed WOFF2 web fonts** across 3 network requests, triggering severe layout shifts (CLS) on 3G/4G connections.
3. **Recommended Typographic Hierarchy**:
   - **Primary Display & Title**: `Fraunces` (Semi-bold, elegant, celebratory).
   - **Supporting UI & Body**: `Outfit` (Clean, modern, highly legible geometric sans).
   - **Drop `Cinzel`**: Eliminates font clashes and saves ~60 KB of network weight.

---

### 3. ICONOGRAPHY & DECORATIVE GLYPH AUDIT

#### 3.1 Pervasive Glyph Overuse (`✦` and `◆`)
- The four-pointed diamond sparkle (`✦` U+2726) appears **24 times** in DOM text nodes across the homepage:
  - Hero eyebrow: `✦ DEPARTMENT OF COMPUTER APPLICATIONS ✦ SRUSTI ACADEMY ✦`
  - Envelope header: `✦ OFFICIAL CORRESPONDENCE ✦`
  - Agenda badges: `✦ THE CONFLUENCE`, `✦ 12:30 LUNCH`, `✦ MR. & MRS. FRESHER`, `✦ UNTIL 5:00 PM`
  - Footers: `◆ TEJAS ’26 · THE FRESH BLOOM ◆`
- **Critique**: This is a classic hallmark of AI-generated copywriting trying to simulate "magic" and "luxury". When every badge, button, and header is peppered with diamond stars, the ornament loses all meaning and becomes visual static.
- **Remediation**: Remove 90% of decorative Unicode sparkles. Use clean micro-spacing, typography weight, and subtle hairline borders for hierarchy.

#### 3.2 Icon Consistency
- Lucide React icons are used with arbitrary stroke widths (`strokeWidth={1.5}`, default `2.0`, `size={12}`, `size={16}`, `size={24}`).
- Normalize all UI icons to standard 16px/20px sizes with a unified `1.75px` stroke weight.

---

### 4. ASSET & MEDIA INVENTORY AUDIT

#### 4.1 Asset Inventory Table (`public/`)

| File Name | File Size | Dimensions / Format | Status in Codebase | Recommended Action |
| :--- | :---: | :---: | :---: | :--- |
| `freshers-editorial.png` | **2.47 MB** | 2048 × 2048 PNG | **Unused in DOM** | Delete from repository (Save 2.47 MB) |
| `sangam-hero.png` | **1.94 MB** | 1920 × 1080 PNG | **Legacy Unused** | Delete from repository (Save 1.94 MB) |
| `tejas-campus-editorial.jpg` | **1.38 MB** | 2400 × 1600 JPG | Unused in DOM | Compress to WebP or delete (Save 1.38 MB) |
| `tejas-bloom-editorial.jpg` | **1.15 MB** | 2048 × 1365 JPG | Unused in DOM | Compress to WebP or delete (Save 1.15 MB) |
| `mca-builders.jpg` | 846 KB | 1600 × 1066 JPG | Unused in DOM | Move to archive or delete |
| `odissi-dance.jpg` | 777 KB | 1600 × 1066 JPG | Unused in DOM | Retain if used for cultural section |
| `tejas-hero-frame.jpg` | 677 KB | 1600 × 900 JPG | Unused in DOM | Delete or optimize |
| `confluence_full_mockup_bg.jpg`| 665 KB | 1800 × 1200 JPG | Unused in DOM | Delete |
| `dress_junior_boy.jpg` | 622 KB | 1024 × 1536 JPG | **Active** (`DressCodeEssentials`) | Compress to WebP (Target <90 KB) |
| `dress_junior_girl.jpg` | 778 KB | 1024 × 1536 JPG | **Active** (`DressCodeEssentials`) | Compress to WebP (Target <90 KB) |
| `dress_senior_boy.jpg` | 678 KB | 1024 × 1536 JPG | **Active** (`DressCodeEssentials`) | Compress to WebP (Target <90 KB) |
| `dress_senior_girl_v2.jpg` | 110 KB | 800 × 1200 JPG | **Active** (`DressCodeEssentials`) | Optimized WebP |
| `crowd-cheering.mp4` | **5.15 MB** | 1080p MP4 | Unused in DOM | Delete from `/public` (Save 5.15 MB) |
| `Crowd_cheering... - Trim.mp4` | **5.15 MB** | 1080p MP4 | Root duplicate | Delete root duplicate (Save 5.15 MB) |
| `og-image.jpg` | **0 B** | **MISSING FILE** | Referenced in `index.html` | **Create authentic 1200×630px JPG** |

- **Total Wastage**: Over **18 MB** of unreferenced images and videos in `/public` and root!
- **Active Images**: The 4 dress code photos total 2.18 MB when unoptimized JPEGs. Converting to WebP at 800×1200px reduces this payload to under 320 KB total.

---

### 5. PROPOSED CANONICAL DESIGN SYSTEM

To eliminate the 191 KB dual-stylesheet collision, we propose a single unified, clean CSS design token architecture (`src/styles.css`, target size: <35 KB).

```css
/* ==========================================================================
   TEJAS ’26 — CANONICAL DESIGN TOKENS (UNIFIED SYSTEM)
   ========================================================================== */
:root {
  /* 1. Core Heritage Hues (Imperial Wine & Velvet Burgundy) */
  --tejas-wine-900: #20040B;       /* Deepest velvet shadow */
  --tejas-wine-800: #380716;       /* Primary envelope chassis tone */
  --tejas-wine-700: #520D22;       /* Active card frame / dark headers */
  --tejas-burgundy: #6E122E;       /* Flagship badge & accent tone */
  --tejas-crimson:  #941D3E;       /* Radiant button hover tone */

  /* 2. Solar Gold Accents (Warm, Radiant, Non-Neon) */
  --tejas-gold-base:    #C89B38;   /* True brushed metallic gold */
  --tejas-gold-radiant: #E5B957;   /* Bright foil highlight */
  --tejas-gold-butter:  #FCE7A2;   /* Text accent / date callout */
  --tejas-gold-soft:    rgba(229, 185, 87, 0.16);

  /* 3. Parchment & Ivory Canvas */
  --tejas-parchment-white: #FCFAF6; /* Pristine invitation card ground */
  --tejas-parchment-cream: #F8F3E8; /* Page background / warm sections */
  --tejas-parchment-sand:  #EFE5D3; /* Subtle card borders */

  /* 4. High-Contrast Typography Inks */
  --tejas-ink-title:     #1A050D;   /* WCAG AAA text on cream */
  --tejas-ink-body:      #341E26;   /* High-readability body text */
  --tejas-ink-muted:     #6E5860;   /* Secondary metadata */
  --tejas-text-on-dark:  #FAF6F0;   /* Text on wine/burgundy surfaces */

  /* 5. Typography */
  --font-display: 'Fraunces', Georgia, serif;
  --font-body:    'Outfit', -apple-system, BlinkMacSystemFont, sans-serif;

  /* 6. Spacing Scale (8pt Grid) */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-6: 24px;
  --space-8: 32px;
  --space-12: 48px;
  --space-16: 64px;

  /* 7. Elevation Shadows (Soft Ambient, No Harsh Blurs) */
  --shadow-card:   0 8px 32px -8px rgba(32, 4, 11, 0.12);
  --shadow-env:    0 16px 48px -12px rgba(32, 4, 11, 0.45);
  --shadow-lift:   0 12px 28px -6px rgba(110, 18, 46, 0.25);
}
```

#### Key Architectural Benefits:
1. **Single Source of Truth**: Completely deletes `styles-v3.css` and rewrites `styles.css` with clean, modular BEM/scoped selectors.
2. **Zero Color Divergence**: Eliminates conflicting HEX codes across components.
3. **Bandwidth Savings**: Cuts CSS bundle size from **191.2 KB down to ~32 KB** (an 83% reduction).
4. **Performance & Battery**: Removes non-stop continuous CSS keyframe animations (`.badge-shine`, heavy SVG box-shadow filters) that drain mobile battery.
