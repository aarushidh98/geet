import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Scene from '@/components/ThreeD/Scene'

export default function Hero() {
  const sectionRef = useRef()
  const titleRef = useRef()
  const subRef = useRef()
  const videoWrapRef = useRef()
  const scrollCueRef = useRef()

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

  const titleLines = ['GEET indie', 'PROJECT']

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative h-[100svh] w-full overflow-hidden flex items-end"
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

      <div className="relative z-10 section-pad w-full pb-16 md:pb-24">
        <p className="eyebrow mb-6">Live &middot; Original &middot; Loud</p>

        <h1
  ref={titleRef}
  className="font-display text-[13vw] md:text-[8vw] leading-[0.95] tracking-tight text-paper"
>
  {titleLines.map((line, lineIndex) => (
    <div key={lineIndex} className="overflow-hidden flex flex-wrap">
      {line.split('').map((char, i) => (
        <span key={i} className="overflow-hidden inline-block">
          <span className="reveal-char inline-block">
            {char === ' ' ? '\u00A0' : char}
          </span>
        </span>
      ))}
    </div>
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
