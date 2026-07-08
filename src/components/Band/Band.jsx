import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { revealChildren, parallaxY } from '@/lib/scrollReveal'
import SectionAccent from '@/components/ThreeD/SectionAccent'
import bandData from './bandData'
import { asset } from '@/lib/asset'

function MemberRow({ member, isActive, onHover }) {
  return (
    <div
      onMouseEnter={() => onHover(member.id)}
      className="band-reveal group relative border-b border-line py-8 md:py-10 cursor-pointer"
    >
      <div className="flex items-center justify-between gap-6">
        <div className="flex items-baseline gap-6 md:gap-10">
          <span className="font-mono text-xs text-muted">{member.id}</span>
          <h3
            className={`font-display text-3xl md:text-6xl transition-colors duration-300 ${
              isActive ? 'text-amber-signal' : 'text-paper'
            }`}
          >
            {member.name}
          </h3>
        </div>
        <span className="hidden md:block font-mono text-xs uppercase tracking-widest2 text-muted text-right max-w-[220px]">
          {member.role}
        </span>
      </div>
      <p className="mt-3 md:mt-4 md:ml-16 max-w-md text-sm text-paper/60 font-body">
        {member.note}
      </p>
    </div>
  )
}

export default function Band() {
  const sectionRef = useRef()
  const accentRef = useRef()
  const [activeId, setActiveId] = useState(bandData[0].id)
  const activeMember = bandData.find((m) => m.id === activeId)

  useEffect(() => {
    const anim = revealChildren(sectionRef.current, '.band-reveal', { stagger: 0.1 })
    const accentParallax = parallaxY(accentRef.current, sectionRef.current, 80)
    return () => {
      anim?.scrollTrigger?.kill()
      anim?.kill()
      accentParallax?.scrollTrigger?.kill()
      accentParallax?.kill()
    }
  }, [])

  return (
    <section
      id="band"
      ref={sectionRef}
      className="relative z-10 section-pad py-28 md:py-40"
    >
      <div ref={accentRef}>
        <SectionAccent
          shape="equalizer"
          color="#8B8577"
          className="top-8 left-2 w-48 h-48 md:w-64 md:h-64 hidden md:block"
        />
      </div>

      <div className="grid md:grid-cols-12 gap-12 mb-16">
        <div className="md:col-span-6">
          <p className="eyebrow mb-6 band-reveal">Meet the Band</p>
          <h2 className="band-reveal font-display text-4xl md:text-6xl text-paper leading-[1.05]">
            Four parts,
            <br />
            one sound.
          </h2>
        </div>
      </div>

      <div className="grid md:grid-cols-12 gap-8 md:gap-16 items-start">
        <div className="md:col-span-7 lg:col-span-8">
          {bandData.map((member) => (
            <MemberRow
              key={member.id}
              member={member}
              isActive={activeId === member.id}
              onHover={setActiveId}
            />
          ))}
        </div>

        <div className="hidden md:block md:col-span-5 lg:col-span-4 sticky top-32 h-[60vh] overflow-hidden">
          <motion.div
            key={activeMember.id}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="h-full w-full"
          >
            <img
              src={activeMember.image}
              alt={activeMember.name}
              className="h-full w-full object-cover grayscale-[15%]"
              loading="lazy"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
