import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import SoundStrings from './SoundStrings'
import usePointer from '@/hooks/usePointer'

/**
 * Eases the raw pointer target toward a smoothed current value every
 * frame, inside the R3F render loop, so React never re-renders on
 * mouse move — only the GPU-side scene updates.
 */
function PointerEase({ pointer }) {
  useFrame(() => {
    pointer.current.x += (pointer.current.targetX - pointer.current.x) * 0.06
    pointer.current.y += (pointer.current.targetY - pointer.current.y) * 0.06
  })
  return null
}

export default function Scene() {
  const pointer = usePointer()
  const containerRef = useRef()

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0"
      aria-hidden="true"
    >
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 9], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={['#0B0A10']} />
        <fog attach="fog" args={['#0B0A10', 8, 18]} />
        <ambientLight intensity={0.4} />
        <Suspense fallback={null}>
          <PointerEase pointer={pointer} />
          <SoundStrings pointer={pointer} />
        </Suspense>
      </Canvas>
    </div>
  )
}
