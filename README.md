# GEET — Band Website

An immersive, dark-premium single-page site for the indie live band GEET.
Built with React + Vite, Tailwind CSS, React Three Fiber/Drei/Three.js,
GSAP + ScrollTrigger, Lenis smooth scroll, and Framer Motion.

## Getting started

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```

## Adding your media

The site references video/image paths that aren't included in this
repo. See `public/MEDIA_README.md` for the exact paths to drop your
hero video, live performance clips, gallery photos, and band portraits
into.

## Structure

```
src/
  components/
    Hero/       fullscreen video hero
    About/      band story + parallax image
    Band/       meet-the-band interactive list
    Videos/     live performance player + grid
    Gallery/    instagram-style photo grid + lightbox
    Contact/    booking form
    Layout/     navbar, footer
    ThreeD/     R3F canvas + reactive "sound string" background
  hooks/        useLenis, usePointer
  lib/          shared GSAP scroll-reveal helpers
  styles/       Tailwind entry + global CSS
```

## Notes

- The 3D background lives behind all content (`Scene.jsx`, fixed,
  `z-0`) and reacts to pointer position without triggering React
  re-renders — it eases toward the pointer inside the R3F frame loop.
- Lenis drives all scrolling and is kept in sync with GSAP's ticker so
  `ScrollTrigger` animations track the smoothed scroll position.
- `prefers-reduced-motion` is respected globally in `styles/index.css`.
