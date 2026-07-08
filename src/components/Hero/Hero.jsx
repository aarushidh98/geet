import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Scene from '@/components/ThreeD/Scene'

export default function Hero() {
  const sectionRef = useRef()
  const titleRef = useRef()
  const subRef = useRef()
  const videoWrapRef = useRef()
  const scrollCueRef = useRef()
  const cdRef = useRef()
  const photoDuoRef = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.fromTo(
        videoWrapRef.current,
        { scale: 1.15, autoAlpha: 0 },
        { scale: 1, autoAlpha: 1, duration: 1.6 }
      )
        .fromTo(
          titleRef.current.querySelectorAll('.reveal-char'),
          { yPercent: 120 },
          { yPercent: 0, duration: 1.1, stagger: 0.04 },
          '-=0.9'
        )
        .fromTo(
          subRef.current,
          { autoAlpha: 0, y: 20 },
          { autoAlpha: 1, y: 0, duration: 0.8 },
          '-=0.5'
        )
        .fromTo(
          scrollCueRef.current,
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.6 },
          '-=0.3'
        )
        .fromTo(
          photoDuoRef.current,
          { autoAlpha: 0, x: 40 },
          { autoAlpha: 1, x: 0, duration: 1 },
          '-=0.8'
        )
        .fromTo(
          cdRef.current,
          { xPercent: 0 },
          { xPercent: -50, duration: 1.1, ease: 'power3.out' },
          '-=0.4'
        )

      // the disc itself spins continuously once revealed, independent
      // of the slide-out — it just starts right after the reveal
      gsap.to(cdRef.current, {
        rotation: 360,
        duration: 7,
        repeat: -1,
        ease: 'none',
        delay: 1.2,
      })

      // scroll parallax: video drifts, title lifts away faster than scroll
      gsap.to(videoWrapRef.current, {
        yPercent: 18,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.6,
        },
      })

      gsap.to(titleRef.current, {
        yPercent: -40,
        autoAlpha: 0.2,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.6,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const title = 'GEET'

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative h-[100svh] w-full overflow-hidden flex items-center"
    >
      <div ref={videoWrapRef} className="absolute inset-0">
        <video
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster="/video/hero-poster.jpg"
        >
          <source src="/video/hero-loop.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/70 to-void/30" />
        <div className="absolute inset-0 bg-void/30" />
        <div className="grain-overlay" />
      </div>

      <Scene />

      <div className="relative z-10 section-pad w-full">
        <p className="eyebrow mb-6">Live &middot; Original &middot; Loud</p>

        <h1
          ref={titleRef}
          className="font-display text-[20vw] md:text-[13vw] leading-[0.85] tracking-tight text-paper overflow-hidden flex"
        >
          {title.split('').map((char, i) => (
            <span key={i} className="overflow-hidden inline-block">
              <span className="reveal-char inline-block">{char}</span>
            </span>
          ))}
        </h1>

        <p
          ref={subRef}
          className="mt-6 max-w-md font-body text-paper/70 text-base md:text-lg"
        >
          Four players, one room, songs written to be heard live before
          they're heard anywhere else.
        </p>
      </div>

      <div
        ref={photoDuoRef}
        className="hidden lg:block absolute right-14 xl:right-24 top-1/2 -translate-y-1/2 z-20"
        style={{ width: '24rem', height: '24rem' }}
      >
        <div
          ref={cdRef}
          className="absolute inset-0 rounded-full"
          style={{
            background:
              'conic-gradient(from 90deg, #2a2733, #C1502E, #E8A33D, #8B8577, #2a2733)',
          }}
        >
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                'repeating-conic-gradient(rgba(255,255,255,0.06) 0deg 2deg, transparent 2deg 6deg)',
            }}
          />
          <div className="absolute inset-[36%] rounded-full bg-void border border-amber-signal/50" />
          <div className="absolute inset-[46%] rounded-full bg-void" />
        </div>

        <div
          className="absolute inset-0 overflow-hidden border border-line"
          style={{ boxShadow: '10px 10px 0 rgba(0,0,0,0.35)' }}
        >
          <img
            src="/band/hero-photo.jpg"
            alt="GEET performing live on stage"
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
      </div>

      <div
        ref={scrollCueRef}
        className="absolute bottom-8 right-6 md:right-12 z-10 flex items-center gap-3 font-mono text-[11px] uppercase tracking-widest2 text-paper/60"
      >
        <span className="hidden sm:inline">Scroll</span>
        <span className="relative h-10 w-px bg-paper/30 overflow-hidden">
          <span className="absolute top-0 left-0 h-3 w-px bg-amber-signal animate-pulseLine" />
        </span>
      </div>
    </section>
  )
}
