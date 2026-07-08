# Media assets

Drop your real files in here (or update the paths in the components) before shipping:

- `/public/video/hero-loop.mp4` — muted looping hero background video (H.264, ~1920x1080, 10–20s, no audio track needed)
- `/public/video/hero-poster.jpg` — poster frame shown before the video decodes
- `/public/videos/live-1.mp4` ... `live-4.mp4` — live performance clips used in the Videos section (or swap in YouTube embed ids in `src/components/Videos/Videos.jsx`)
- `/public/gallery/01.jpg` ... `12.jpg` — Instagram-style gallery images (square, 1080x1080 recommended)
- `/public/band/<member-slug>.jpg` — band member portraits referenced in `src/components/Band/bandData.js`

All paths referenced in the components point at `/video/...`, `/videos/...`, `/gallery/...` and `/band/...` — anything placed in `public/` is served from the site root, so `public/gallery/01.jpg` becomes `/gallery/01.jpg`.
