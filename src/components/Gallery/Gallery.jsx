import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { revealChildren, parallaxY } from '@/lib/scrollReveal'
import SectionAccent from '@/components/ThreeD/SectionAccent'
import { asset } from '@/lib/asset'

const IMAGES = Array.from({ length: 8 }).map((_, i) => ({
  id: i + 1,
  src: asset(`gallery/${String(i + 1).padStart(2, '0')}.jpg`),
  alt: `GEET on stage, photo ${i + 1}`,
}))

export default function Gallery() {
  const sectionRef = useRef()
  const accentRef = useRef()
  const [lightbox, setLightbox] = useState(null)

  useEffect(() => {
    const anim = revealChildren(sectionRef.current, '.gallery-item', {
      y: 30,
      stagger: 0.06,
    })
    const accentParallax = parallaxY(accentRef.current, sectionRef.current, 75)
    return () => {
      anim?.scrollTrigger?.kill()
      anim?.kill()
      accentParallax?.scrollTrigger?.kill()
      accentParallax?.kill()
    }
  }, [])

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="relative z-10 section-pad py-28 md:py-40"
    >
      <div ref={accentRef}>
        <SectionAccent
          shape="notes"
          color="#C1502E"
          className="top-4 left-2 w-48 h-48 md:w-60 md:h-60 hidden md:block"
        />
      </div>

      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
        <div>
          <p className="eyebrow mb-6">From the Floor</p>
          <h2 className="font-display text-4xl md:text-6xl text-paper leading-[1.05]">
            Shot by the
            <br />
            crowd, mostly.
          </h2>
        </div>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noreferrer"
          className="font-mono text-xs uppercase tracking-widest2 text-amber-signal border-b border-amber-signal/40 pb-1 w-fit hover:border-amber-signal"
        >
          Follow @geetband
        </a>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {IMAGES.map((img) => (
          <button
            key={img.id}
            onClick={() => setLightbox(img)}
            className="gallery-item relative aspect-square overflow-hidden group"
          >
            <img
              src={img.src}
              alt={img.alt}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-void/0 group-hover:bg-void/20 transition-colors duration-500" />
          </button>
        ))}
      </div>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-[60] bg-void/95 flex items-center justify-center p-6 cursor-zoom-out"
          >
            <motion.img
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              src={lightbox.src}
              alt={lightbox.alt}
              className="max-h-[85vh] max-w-full object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
