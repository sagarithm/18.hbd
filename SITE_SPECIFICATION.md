# 🏛️ ERA Residence (Sagar Residence) — Complete Architecture, Design System & Animation Specification

> **Project:** Ultra-Luxury Contemporary Mediterranean Boutique Residences (Estepona, Spain)  
> **Repository:** [https://github.com/sagarithm/18.hbd](https://github.com/sagarithm/18.hbd)  
> **Original Reference:** [https://www.era-residence.com/](https://www.era-residence.com/)  
> **Document Purpose:** An exhaustive, single-source-of-truth manual detailing every single technical token, CSS variable, typography rule, SVG geometry, easing formula, and micro-interaction to rebuild this exact site with 100% precision.

---

## 1. Technology Stack & Core Engineering

| Layer | Technology | Version | Purpose |
| :--- | :--- | :--- | :--- |
| **Framework** | Next.js (App Router) | 15.x / 16.x | React 19 SSR, static prerendering, SEO head management |
| **Language** | TypeScript | 5.x | Full type safety for props, states, and event listeners |
| **Styling** | Vanilla CSS + Tailwind CSS v4 | v4.x | Fluid `1vw` responsive scaling, design tokens, utility classes |
| **Motion Engine** | GSAP (GreenSock) | 3.15.0 | Timeline scrubbing, text splitting, 3D transforms, SVG masks |
| **Scroll Trigger** | GSAP `ScrollTrigger` | 3.15.0 | Pinned sections, scroll scrubbing, background theme transitions |
| **Text Motion** | GSAP `SplitText` | 3.15.0 | Character/word/line splitting with 3D rotateX and rotateY reveals |
| **Easing Math** | GSAP `CustomEase` | 3.15.0 | Custom Bézier curves matching editorial timing curves |
| **Smooth Inertia** | Lenis (`@studio-freight/lenis`) | 1.3.21 | Velvety, inertia-based mousewheel and touch scroll physics |
| **Vector Animation** | Lottie Web | 5.12.2 | Interactive JSON-based micro-animations (footer credits) |
| **Transitions** | Barba.js | Core | Lifecycle hooks for page enter/leave without full page reload |

---

## 2. Complete Design System & Design Tokens

### A. Color Palette & Theming Tokens
The site uses 3 primary runtime theme modes (`theme_on-color`, `theme_on-light`, `theme_on-dark`). As the user scrolls, `ScrollTrigger` automatically adds/removes these classes on persistent UI elements (navigation header, scrollbar, logo):

```css
:root {
  /* Brand Master Tones */
  --_colors---base-1000--primary: #340C24; /* Brand Plum / Deep Wine */
  --_colors---base-1000--bg: #340C24;      /* Plum Background */
  --_colors---base-1000--100: #FFFFFF;     /* Pure White on Dark */
  
  /* Theme Night (Hero Facade Mode) */
  --_colors---theme-night--bg: #17233B;    /* Midnight Navy Facade */
  --_colors---theme-night--primary: #FFFFFF;
  
  /* Theme Light (Editorial Background) */
  --_colors---base-0--primary: #F3F3EC;    /* Warm Linen / Off-White */
  --_colors---other--bg: #F3F3EC;          /* Card Background */
  
  /* Accent & Utility */
  --_colors---ice-blue: #B5C9DB;           /* Architectural Ice Tint */
  --_colors---other--transparent: rgba(0, 0, 0, 0);
  
  /* Hairline Border Vectors */
  --border-hairline-dark: rgba(52, 12, 36, 0.12);
  --border-hairline-light: rgba(255, 255, 255, 0.2);
}
```

---

### B. Fluid Typography System
The typography uses a **fluid `1vw` baseline scaling system**. At 1920px viewport, `1vw = 19.2px`. On mobile devices (`< 991px`), it falls back to explicit rem scaling with breakpoint ratios:

```css
html {
  font-size: 1vw;
  background-color: var(--_colors---base-0--primary);
}

@media (max-width: 991px) {
  html {
    font-size: 16px;
    --_special-units---scale-ratio: 1;
  }
}
```

#### Font Families:
1. **Editorial Display Serif (`--_fonts---font-display`):**
   * *Primary:* `Ambroise Francois Std` (Adobe Typekit `pig8glj.js`)
   * *Fallback:* `Playfair Display`, `Didot`, `Bodoni MT`, serif
   * *Styles:* Ultra-high contrast Didone serif, razor-sharp serifs, dramatic vertical stress. Used for `.h1`, `.h2`, `.h3`, section headers, and unit titles.
2. **Calligraphic Script (`--_fonts---font-accent`):**
   * *Primary:* `Sloop Script Three` (Adobe Typekit)
   * *Fallback:* `Great Vibes`, `Alex Brush`, cursive
   * *Styles:* Freehand cursive script. Used for regional accent subtitles (e.g. `Estepona`, `A place to return to`, `Costa del Sol`).
3. **Sans-Serif Grotesque (`--_fonts---font-body`):**
   * *Primary:* `Maison Neue Extended` (Light 300, Book 400, Bold 700)
   * *Fallback:* `Plus Jakarta Sans`, `Syne`, -apple-system, sans-serif
   * *Styles:* Extended geometric Swiss grotesque. Used for navigation, buttons, metrics (`124 m²`, `3 Bedrooms`), data tables, and body copy.

---

### C. Spacing Scale & Grid Units
```css
:root {
  --_units---u-0: 0rem;
  --_units---u-4: 0.208vw;   /* 4px at 1920 */
  --_units---u-8: 0.416vw;   /* 8px at 1920 */
  --_units---u-16: 0.833vw;  /* 16px at 1920 */
  --_units---u-24: 1.25vw;   /* 24px at 1920 */
  --_units---u-32: 1.667vw;  /* 32px at 1920 */
  --_units---u-48: 2.5vw;    /* 48px at 1920 */
  --_units---u-64: 3.333vw;  /* 64px at 1920 */
  --_units---u-160: 8.333vw; /* 160px at 1920 */
}
```

---

### D. Architectural Non-Scaling Stroke Frames
Every card and section block uses hairline vector SVG frames with `vector-effect="non-scaling-stroke"`. This ensures border lines remain exactly 1 pixel thick regardless of display scaling or zoom level:

```html
<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
  <line x1="0%" y1="0%" x2="100%" y2="100%" stroke-width="1" stroke="currentColor" vector-effect="non-scaling-stroke" />
</svg>
```

---

### E. Layered Shadow Occlusion
```css
.cookies_card,
.floating-tip-card,
.filter_select_drop-down,
.apart-card_shadow {
  box-shadow:
    0 224px 63px 0 rgba(0, 0, 0, 0),
    0 143px 57px 0 rgba(0, 0, 0, 0.01),
    0 81px 48px 0 rgba(0, 0, 0, 0.04),
    0 36px 36px 0 rgba(0, 0, 0, 0.07),
    0 9px 20px 0 rgba(0, 0, 0, 0.08);
}
```

---

## 3. Motion System & Easing Curves

### A. Timing & CSS Easing Variables
```css
:root {
  --dur-s: 0.4s;
  --dur-m: 0.8s;
  --dur-l: 1.2s;

  --ease-in-out: cubic-bezier(0.76, 0, 0.24, 1);
  --ease-out: cubic-bezier(0.25, 1, 0.5, 1);
  --ease-in: cubic-bezier(0.5, 0, 0.75, 0);
  --ease: cubic-bezier(0.25, 0.1, 0.25, 1);
  --ease-write: cubic-bezier(0.333, 0, 0.667, 1);
}
```

### B. Custom GSAP Curves (`CustomEase.create`)
1. **Preloader Track:**  
   `CustomEase.create("loaderEase", "M0,0,C0,0,0.13,0.34,0.238,0.442,0.305,0.506,0.322,0.514,0.396,0.54,0.478,0.568,0.468,0.56,0.522,0.584,0.572,0.606,0.61,0.719,0.714,0.826,0.798,0.912,1,1,1,1")`
2. **Dive In Reveal:** `CustomEase.create("diveIn", "0.6,0,0,1")`
3. **Horizontal Scrub:** `CustomEase.create("horScroll", "0.25,0,0.75,1")`
4. **General InOut:** `CustomEase.create("InOut", "0.76,0,0.24,1")`
5. **General Out:** `CustomEase.create("Out", "0.25,1,0.5,1")`

### C. Lenis Smooth Scroll Formula
```javascript
const lenis = new Lenis({
  wrapper: window,
  duration: 1.2,
  smoothWheel: true,
  touchMultiplier: 2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  infinite: false,
});
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);
```

---

## 4. Detailed Section-by-Section Animation Breakdown

### Section 0: Architectural Preloader
* **DOM Selector:** `[data-preloader]` and `[data-master-preloader]`
* **Visual Effect:** An architectural arch SVG mask starts at the bottom of the viewport and sweeps upward, framing the central logo emblem before scaling to 125vw to reveal the hero section.
* **Timeline Choreography:**
  1. Initial CSS Variables: `--arch-w: 24vw`, `--arch-y: 104vh`.
  2. Subtitles reveal with `animateTextA` (stagger 0.1s, rotateX from 90° to 0°).
  3. Progress track (`.preloader_progress_track`) fills from -100% to 0% over 4.0s with `loaderEase`.
  4. Arch expands from `--arch-w: 24vw, --arch-y: 104vh` to `--arch-w: 36vw, --arch-y: 15vh` (duration: 1.5s, ease: InOut).
  5. Arch blows out to `--arch-w: 125vw, --arch-y: -100vh` (duration: 2.4s, ease: diveIn).
  6. Hero building facade zooms from `scale: 1.15` down to `scale: 1.0`.
  7. Scroll is unlocked (`lenis.start()`) and preloader element is set to `display: none`.
  8. `sessionStorage.setItem("hasVisited", "true")` ensures subsequent reloads trigger a shorter 1.2s preloader version.

---

### Section 1: Fixed Navigation & Rotating Logo
* **Rotating Logo Emblem (`.header-logo_bg`):**
  * Rotating circular badge SVG containing `SAGARITHM • SAGAR RESIDENCE • ESTEPONA •` around a 4-point star emblem.
  * Base idle spin speed: `30 deg/sec`.
  * Velocity-linked scroll boost:
    ```javascript
    lenis.on("scroll", ({ velocity }) => {
      const targetSpeed = Math.sign(velocity) * (30 + 10 * Math.abs(velocity));
      gsap.to(logoConfig, { speed: targetSpeed, duration: 0.3, ease: "Out" });
    });
    ```
* **Dual-Line Button Roll (`hover-nav-item`):**
  * Text is duplicated into two lines: Line 1 (`y: 0%`), Line 2 (`y: 100%`).
  * On mouse enter: Line 1 translates to `y: -100%` (`opacity: 0`), Line 2 translates to `y: 0%` (`opacity: 1`) with staggered letter easing.
  * On mouse leave: Reverses with identical spring easing.
* **Scroll Progress Bar (`[data-s-bar]`):**
  * Positioned on the right edge of the viewport.
  * Measures `ScrollTrigger` scroll progress (`0.0` to `1.0`).
  * Updates thumb position (`top: var(--progress)`), fill height (`clip-path: rect(...)`), and numeric counter from `00` to `10`.
  * Fully draggable: Pointer capture lets user scrub down the page with smooth Lenis interpolation.

---

### Section 2: Interactive Hero Section
* **Typography:**
  * `Era / Sagar Residence` (.h1): High-contrast Didone Serif.
  * `Estepona` (.a2): Flowing cursive accent positioned right below the main title.
* **By Day / By Night Facade Switcher:**
  * Controlled by `[data-tab-trigger="day"]` and `[data-tab-trigger="night"]`.
  * `.hero-s_tabs_divider` contains an animated horizontal linear gradient that slides `background-position: 100% 0%` (Day) to `0% 0%` (Night).
  * Smooth opacity crossfade between Day render (`era-residence_gated-community_day.webp`) and Night render (`era-residence_gated-community_night.webp`) over 0.8s with `easeInOut`.
* **Facade Hotspot Radar Pins (`[data-pin]`):**
  * Hotspot coordinates on the building facade:
    * Pin 1 (`crafted-to-endure`): `top: 62.5%`, `left: 57.5%`
    * Pin 2 (`light-flow`): `top: 58.3%`, `left: 26.9%`
    * Pin 3 (`your-private-sanctuary`): `top: 73.2%`, `left: 76.6%`
  * Each pin features two continuous pulsating radar rings (`.pin_bg_pulse`) expanding from `scale: 1.0` to `scale: 1.6` with infinite fade loop.
  * On mouse hover:
    * Center plus icon rotates `0deg -> -90deg -> -180deg`.
    * Corresponding tooltip card pops up with spring physics (`scale: 0.75 -> 1.0`, `opacity: 0 -> 1`, duration: 0.4s).
* **Magnetic Circular CTA ("View available apartments"):**
  * Circular SVG perimeter button with mouse physics.
  * Follows mouse cursor within a 25px radius using `elastic.out(1, 0.3)`.
  * SVG circle stroke animates dasharray on hover (`hover-btn-circle`).

---

### Section 3: Concept & Setting ("Costa del Sol")
* **Scroll-Triggered Image Parallax:**
  * Marked with `[data-parallax="img"]`.
  * GSAP scrubs `yPercent: -15` to `yPercent: +15` as the card traverses the viewport.
* **Text Reveal Masks:**
  * Character-by-character SplitText animation.
  * Each character is wrapped in an inline-block clipping mask (`.split-char-mask`) sliding upward with subtle rotation.

---

### Section 4: The 3 Core Pillars
1. **01 Architecture & Natural Materials** (Solid travertine, thermal floor-to-ceiling glass, acoustic baffles)
2. **02 Wellbeing & Resort Living** (Private spa, Nordic sauna, outdoor saltwater pools)
3. **03 Strategic Location** (New Golden Mile, 10 min to Estepona, 20 min to Puerto Banús)
* **Animation:**
  * Hairline border drawing animation via `clipPath: inset(0% 0% 100% 0%) -> inset(0% 0% 0% 0%)`.
  * Staggered sequence: Number counter reveals -> Header slides up -> Description lines unfold.

---

### Section 5: Residences & Apartment Showcase
* **Unit Types:**
  * **Penthouse Duplex:** 2–3 Beds | 124–243 m² | Double-height ceilings, private solarium.
  * **Ground Floor + Basement:** 3 Beds | 178–202 m² | Private garden integration, lower leisure level.
  * **Ground Floor:** 2 Beds | 97–104 m² | Direct garden access, seamless indoor-outdoor transition.
* **Tab Interaction (`initTabs`):**
  * Active tab highlighted with sliding indicator.
  * Outgoing tab contents animate: text slides down (`yPercent: -110%`), image slide collapses with `clipPath: polygon(...)`.
  * Incoming tab contents animate: text slides up (`yPercent: 110% -> 0%`), image zooms from `scale: 1.5` down to `scale: 1.0`.
* **Floor Plan Lightbox (`initLightbox`):**
  * Clicking any unit floor plan opens a full-screen zoomable lightbox.
  * Mouse movement pans across ultra-high-resolution architectural drawings.

---

### Section 6: Resort Amenities & Wellness Club
* **Amenities Grid:**
  * Saltwater swimming pool & children's pool.
  * Finnish sauna & hydrotherapy jacuzzi.
  * Private gym studio overlooking lush Mediterranean landscaping.
* **Sibling Dimming Effect (`[data-hover-group]`):**
  * When hovering over any amenity card, all other cards in the group smoothly transition to `opacity: 0.2` over 0.8s (`--dur-m`).
  * The hovered card scales up slightly (`scale: 1.03`) with intensified drop shadow.

---

### Section 7: Interior Finishes & Specifications
* **Interactive Accordion Specs (`initAccordion`):**
  * Underfloor heating throughout.
  * Schneider Electric DLIFE mechanisms.
  * Intelligent aerothermal climate control.
  * Underground garage with pre-installed EV fast-charging.
* **Animation:**
  * Clicking an accordion row animates height from `0` to `auto` with `ease: Out`.
  * Plus icon rotates `0deg -> -45deg -> -90deg`.
  * Specifications paragraph lines stagger in. Only one accordion row remains open at any given time.

---

### Section 8: Interactive Map & Travel Milestones
* **Travel Milestones:**
  * Kempinski Hotel: **5 min**
  * Estepona Old Town: **10 min**
  * Puerto Banús: **20 min**
  * Marbella Center: **25 min**
  * Málaga Airport (AGP): **45 min**
* **Animation:**
  * SVG route line (`loc_path.svg`) draws along its stroke using `strokeDashoffset` linked to scroll scrub.
  * Location badges pop in with spring scale as their scroll threshold is crossed.

---

### Section 9: Consultation & "Book a Call" Modal
* **Trigger:** Header nav button `[data-modal-cta-btn="book-a-call"]`.
* **Modal Window (`[data-modal-cta="book-a-call"]`):**
  * 3D entry animation: `scale: 0 -> 1`, `rotateX: -90deg -> 0deg`, `rotate: -25deg -> 0deg` with `perspective: 1000px`.
  * Full backdrop blur (`backdrop-filter: blur(20px)`).
  * Form inputs with floating labels (`.focused` state).
  * Real-time telephone regex sanitizer (strips non-numeric/plus characters).
  * Real-time name sanitizer (prevents special character injections).
  * 24-hour response guarantee SLA badge.
  * Closes via Close button (`×`), backdrop click, or `Escape` key.

---

### Section 10: Editorial Footer & Legal
* **Sales Inquiries:** `+34 (655) 408-648`
* **Address:** *Avenida Litoral, 29680 Estepona, Málaga, Spain*
* **Credits:** Designed & Developed by THEFIRSTTHELAST / Ivan Chopei / Maks Stepenko.
* **Micro-Interactions:**
  * Hovering agency logo triggers interactive Lottie vector morph.
  * Back to top link smoothly scrolls window to `y: 0` with Lenis inertia.
  * Year counter automatically updates dynamically (`new Date().getFullYear()`).
  * Cookie consent card slides up from bottom after 1.5s delay and stores preference in `localStorage`.

---

## 5. File Structure of Rebuilt Clone

```
sagarithm-hbd-18/
├── public/
│   └── assets/                    # All extracted fonts, WebP renders, vector SVGs, and JS libraries
│       ├── 6a25da81dce540a251389928_era-residence_gated-community_day.webp
│       ├── 6a25da802c253b9e5e3d44f5_era-residence_gated-community_night.webp
│       ├── gsap.min.js
│       ├── ScrollTrigger.min.js
│       ├── SplitText.min.js
│       ├── CustomEase.min.js
│       ├── lenis.min.js
│       ├── lottie.min.js
│       └── bundle.js              # Complete original GSAP motion choreography bundle
├── src/
│   ├── app/
│   │   ├── globals.css            # Tailwind CSS v4, Webflow shared tokens, and custom animations
│   │   ├── custom.css             # Embedded masks, cubic-bezier timing tokens, and hover states
│   │   ├── era.css                # Base Webflow typography and responsive 1vw layout grid
│   │   ├── layout.tsx             # Root layout with Typekit, Google Fonts, and runtime scripts
│   │   ├── page.tsx               # Server component prerendering complete HTML structure
│   │   └── page_content.html      # Rebranded Sagarithm DOM with direct CDN server pathways
│   └── components/
│       └── EraPageClient.tsx      # Client component managing Day/Night, Hotspots, and Modal
├── SITE_SPECIFICATION.md          # This comprehensive architecture & design system manual
└── package.json                   # Next.js 15+, React 19, GSAP, Lenis, Tailwind CSS v4
```

---

*Document finalized & maintained by Sagarithm.*
