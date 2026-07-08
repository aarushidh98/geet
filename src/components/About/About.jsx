import { useEffect, useRef } from 'react'
import { asset } from '@/lib/asset'
import { revealChildren, parallaxY } from '@/lib/scrollReveal'
import SectionAccent from '@/components/ThreeD/SectionAccent'

export default function About() {
  const sectionRef = useRef()
  const imgWrapRef = useRef()
  const accentRef = useRef()

  useEffect(() => {
    const anim = revealChildren(sectionRef.current, '.about-reveal')
    const parallax = parallaxY(imgWrapRef.current, sectionRef.current, 60)
    const accentParallax = parallaxY(accentRef.current, sectionRef.current, 90)
    return () => {
      anim?.scrollTrigger?.kill()
      anim?.kill()
      parallax?.scrollTrigger?.kill()
      parallax?.kill()
      accentParallax?.scrollTrigger?.kill()
      accentParallax?.kill()
    }
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative z-10 section-pad py-28 md:py-40"
    >
      <div ref={accentRef}>
        <SectionAccent
          shape="vinyl"
          color="#C1502E"
          className="top-4 right-2 w-56 h-56 md:w-72 md:h-72 hidden md:block"
        />
      </div>
      <div className="grid md:grid-cols-12 gap-12 md:gap-8 items-start">
        <div className="md:col-span-5">
          <p className="eyebrow mb-6 about-reveal">Our Story</p>
          <h2 className="about-reveal font-display text-4xl md:text-6xl leading-[1.05] text-paper mb-8">
            Formed in a
            <br />
            garage, kept alive
            <br />
            on a stage.
          </h2>
        </div>

        <div className="md:col-span-6 md:col-start-7 flex flex-col gap-6 text-paper/70 text-base md:text-lg leading-relaxed">
          <p className="about-reveal">
            GEET started as three friends trading verses over chai after
            college, and a drummer who wandered in looking for a rehearsal
            room and never left. What we write comes from the same place —
            the noise of a city, the quiet after it, and the songs that
            live in between.
          </p>
          <p className="about-reveal">
            We don't chase a studio version of ourselves. Every song is
            built to survive a small room, a bad monitor mix, and a crowd
            close enough to sing the wrong words back at us. That's the
            take we keep.
          </p>
          <p className="about-reveal font-mono text-xs uppercase tracking-widest2 text-amber-signal/90 pt-4">
            Formed 2019 &middot; Based out of Delhi &middot; 120+ shows played
          </p>
        </div>
      </div>

      <div
        ref={imgWrapRef}
        className="about-reveal mt-20 md:mt-28 relative h-[50vh] md:h-[70vh] w-full overflow-hidden"
      >
        <img
          src="/geet/band/hero-photo.jpg"
          alt="GEET rehearsing together in a small room"
          className="h-full w-full object-cover grayscale-[20%]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-void/60 via-transparent to-transparent" />
      </div>
    </section>
  )
}
