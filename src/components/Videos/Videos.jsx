import { useEffect, useRef, useState } from 'react'
import { asset } from '@/lib/asset'
import { revealChildren, parallaxY } from '@/lib/scrollReveal'
import SectionAccent from '@/components/ThreeD/SectionAccent'

const PERFORMANCES = [
  { id: 'v1', title: 'Ashen Roads', venue: 'The Attic, Delhi', src: '/videos/live-1.mp4', poster: asset('gallery/hri.jpg') },
  { id: 'v2', title: 'Paper Boats', venue: 'Blue Tokai Sessions', src: '/videos/live-2.mp4', poster: asset('/gallery/sha.jpg') },
  { id: 'v3', title: 'Static & Streetlight', venue: 'Summer House Cafe', src: '/videos/live-3.mp4', poster: asset('/gallery/bhd.jpg') },
  { id: 'v4', title: 'Slow Weather', venue: 'Fandom Fest', src: '/videos/live-4.mp4', poster: asset('/gallery/hin.jpg') },
]

export default function Videos() {
  const sectionRef = useRef()
  const accentRef = useRef()
  const [featured, setFeatured] = useState(PERFORMANCES[0])
  const [playing, setPlaying] = useState(false)
  const videoRef = useRef()

  useEffect(() => {
    const anim = revealChildren(sectionRef.current, '.video-reveal')
    const accentParallax = parallaxY(accentRef.current, sectionRef.current, 70)
    return () => {
      anim?.scrollTrigger?.kill()
      anim?.kill()
      accentParallax?.scrollTrigger?.kill()
      accentParallax?.kill()
    }
  }, [])

  const handleSelect = (track) => {
    setFeatured(track)
    setPlaying(false)
  }

  const togglePlay = () => {
    const el = videoRef.current
    if (!el) return
    if (playing) {
      el.pause()
    } else {
      el.play().catch(() => {})
    }
    setPlaying((v) => !v)
  }

  return (
    <section
      id="live"
      ref={sectionRef}
      className="relative z-10 section-pad py-28 md:py-40"
    >
      <div ref={accentRef}>
        <SectionAccent
          shape="pick"
          color="#E8A33D"
          className="top-2 right-4 w-52 h-52 md:w-72 md:h-72 hidden lg:block"
        />
      </div>

      <p className="eyebrow mb-6 video-reveal">Live Performances</p>
      <h2 className="video-reveal font-display text-4xl md:text-6xl text-paper leading-[1.05] mb-14 md:mb-16">
        Captured live,
        <br />
        no overdubs.
      </h2>

      <div className="video-reveal relative aspect-video w-full bg-void-soft overflow-hidden border border-line group">
        <video
          ref={videoRef}
          key={featured.id}
          className="h-full w-full object-cover"
          poster={featured.poster}
          muted
          loop
          playsInline
          onClick={togglePlay}
        >
          <source src={featured.src} type="video/mp4" />
        </video>

        <button
          onClick={togglePlay}
          className="absolute inset-0 flex items-center justify-center bg-void/30 opacity-100 group-hover:opacity-100 transition-opacity"
          aria-label={playing ? 'Pause performance video' : 'Play performance video'}
        >
          <span className="h-16 w-16 md:h-20 md:w-20 rounded-full border border-paper/60 flex items-center justify-center backdrop-blur-sm bg-void/40">
            {playing ? (
              <span className="flex gap-1.5">
                <span className="w-1.5 h-6 bg-paper" />
                <span className="w-1.5 h-6 bg-paper" />
              </span>
            ) : (
              <span className="w-0 h-0 border-y-[10px] border-y-transparent border-l-[16px] border-l-paper ml-1.5" />
            )}
          </span>
        </button>

        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 bg-gradient-to-t from-void/90 to-transparent">
          <p className="font-display text-2xl md:text-3xl text-paper">{featured.title}</p>
          <p className="font-mono text-xs uppercase tracking-widest2 text-muted mt-1">
            {featured.venue}
          </p>
        </div>
      </div>

      <div className="video-reveal grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        {PERFORMANCES.map((track) => (
          <button
            key={track.id}
            onClick={() => handleSelect(track)}
            className={`relative aspect-video overflow-hidden border transition-colors ${
              featured.id === track.id ? 'border-amber-signal' : 'border-line hover:border-paper/40'
            }`}
          >
            <img
              src={track.poster}
              alt={track.title}
              className="h-full w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-void/30" />
            <span className="absolute bottom-2 left-2 font-mono text-[10px] uppercase tracking-widest2 text-paper">
              {track.title}
            </span>
          </button>
        ))}
      </div>
    </section>
  )
}
