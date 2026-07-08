import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

/* ---------------------------------- Vinyl Record ---------------------------------- */
function VinylRecord({ color }) {
  const groupRef = useRef()
  const grooves = [0.98, 0.85, 0.72, 0.59, 0.46]

  useFrame((_, delta) => {
    groupRef.current.rotation.z += delta * 0.5
  })

  return (
    <group ref={groupRef} rotation={[Math.PI / 2.6, 0, 0]}>
      <mesh>
        <cylinderGeometry args={[1.15, 1.15, 0.05, 64]} />
        <meshStandardMaterial color="#121018" transparent opacity={0.9} />
      </mesh>
      {grooves.map((r, i) => (
        <mesh key={i} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[r, r + 0.012, 80]} />
          <meshBasicMaterial color={color} transparent opacity={0.35} side={THREE.DoubleSide} />
        </mesh>
      ))}
      <mesh position={[0, 0.03, 0]}>
        <cylinderGeometry args={[0.24, 0.24, 0.06, 32]} />
        <meshStandardMaterial color={color} transparent opacity={0.85} />
      </mesh>
      <mesh position={[0, 0.06, 0]}>
        <cylinderGeometry args={[0.035, 0.035, 0.08, 12]} />
        <meshStandardMaterial color="#0B0A10" />
      </mesh>
    </group>
  )
}

/* ---------------------------------- Audio Equalizer ---------------------------------- */
function Equalizer({ color }) {
  const barCount = 7
  const barsRef = useRef([])

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    barsRef.current.forEach((bar, i) => {
      if (!bar) return
      const h = 0.35 + Math.abs(Math.sin(t * (1.6 + i * 0.35) + i * 1.3)) * 1.5
      bar.scale.y = h
      bar.position.y = h / 2 - 0.7
    })
  })

  return (
    <group rotation={[0, 0.35, 0]}>
      {Array.from({ length: barCount }).map((_, i) => (
        <mesh
          key={i}
          ref={(el) => (barsRef.current[i] = el)}
          position={[(i - (barCount - 1) / 2) * 0.32, 0, 0]}
        >
          <boxGeometry args={[0.16, 1, 0.16]} />
          <meshStandardMaterial color={color} transparent opacity={0.8} />
        </mesh>
      ))}
    </group>
  )
}

/* ---------------------------------- Guitar Pick ---------------------------------- */
function GuitarPick({ color }) {
  const meshRef = useRef()

  const geometry = useMemo(() => {
    const shape = new THREE.Shape()
    shape.moveTo(0, 1.05)
    shape.bezierCurveTo(0.78, 1.0, 0.92, 0.3, 0.5, -0.55)
    shape.bezierCurveTo(0.3, -1.0, -0.3, -1.0, -0.5, -0.55)
    shape.bezierCurveTo(-0.92, 0.3, -0.78, 1.0, 0, 1.05)
    return new THREE.ExtrudeGeometry(shape, {
      depth: 0.14,
      bevelEnabled: true,
      bevelThickness: 0.04,
      bevelSize: 0.04,
      bevelSegments: 3,
    })
  }, [])

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    meshRef.current.rotation.y = Math.sin(t * 0.4) * 0.7
    meshRef.current.rotation.x = Math.sin(t * 0.25) * 0.15
  })

  return (
    <mesh ref={meshRef} geometry={geometry} scale={0.85}>
      <meshStandardMaterial color={color} transparent opacity={0.7} />
    </mesh>
  )
}

/* ---------------------------------- Floating Music Notes ---------------------------------- */
function Note({ color, position, scale = 1, phase = 0 }) {
  const groupRef = useRef()

  const headGeo = useMemo(() => new THREE.CircleGeometry(0.16, 24), [])
  const stemGeo = useMemo(() => new THREE.BoxGeometry(0.035, 0.55, 0.035), [])
  const flagGeo = useMemo(() => {
    const shape = new THREE.Shape()
    shape.moveTo(0, 0)
    shape.bezierCurveTo(0.18, -0.05, 0.2, -0.25, 0, -0.4)
    shape.bezierCurveTo(0.12, -0.22, 0.1, -0.08, 0, 0)
    return new THREE.ExtrudeGeometry(shape, { depth: 0.03, bevelEnabled: false })
  }, [])

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    groupRef.current.position.y = position[1] + Math.sin(t * 0.8 + phase) * 0.18
    groupRef.current.rotation.z = Math.sin(t * 0.5 + phase) * 0.12
  })

  return (
    <group ref={groupRef} position={position} scale={scale}>
      <mesh geometry={headGeo} rotation={[0, 0, -0.3]}>
        <meshStandardMaterial color={color} transparent opacity={0.85} />
      </mesh>
      <mesh geometry={stemGeo} position={[0.15, 0.28, 0]}>
        <meshStandardMaterial color={color} transparent opacity={0.85} />
      </mesh>
      <mesh geometry={flagGeo} position={[0.15, 0.55, 0]}>
        <meshStandardMaterial color={color} transparent opacity={0.85} />
      </mesh>
    </group>
  )
}

function MusicNotes({ color }) {
  return (
    <group>
      <Note color={color} position={[-0.5, 0.3, 0]} scale={1.1} phase={0} />
      <Note color={color} position={[0.4, -0.3, -0.3]} scale={0.75} phase={1.4} />
      <Note color={color} position={[0.15, 0.65, 0.2]} scale={0.6} phase={2.6} />
    </group>
  )
}

/* ---------------------------------- Microphone ---------------------------------- */
function Microphone({ color }) {
  const groupRef = useRef()

  useFrame((state) => {
    groupRef.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.12
  })

  return (
    <group ref={groupRef} rotation={[0, 0, 0.15]}>
      <mesh position={[0, 0.65, 0]}>
        <sphereGeometry args={[0.4, 20, 20]} />
        <meshStandardMaterial color={color} wireframe transparent opacity={0.65} />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.2, 0.24, 1.05, 24]} />
        <meshStandardMaterial color={color} transparent opacity={0.5} />
      </mesh>
      <mesh position={[0, -0.75, 0]}>
        <cylinderGeometry args={[0.035, 0.035, 0.6, 8]} />
        <meshStandardMaterial color={color} transparent opacity={0.4} />
      </mesh>
    </group>
  )
}

/* ---------------------------------- Shape Registry ---------------------------------- */
const SHAPES = {
  vinyl: VinylRecord,
  equalizer: Equalizer,
  pick: GuitarPick,
  notes: MusicNotes,
  mic: Microphone,
}

/**
 * Decorative, non-interactive music-themed 3D element scoped to a
 * single section. Absolutely positioned by the parent via `className`.
 */
export default function SectionAccent({ shape = 'vinyl', color = '#E8A33D', className = '' }) {
  const Shape = SHAPES[shape] ?? SHAPES.vinyl

  return (
    <div
      className={`pointer-events-none absolute z-0 opacity-80 ${className}`}
      aria-hidden="true"
    >
      <Canvas camera={{ position: [0, 0, 4], fov: 40 }} gl={{ alpha: true, antialias: true }}>
        <ambientLight intensity={0.7} />
        <pointLight position={[3, 3, 3]} intensity={0.9} />
        <Float speed={1.5} rotationIntensity={0.7} floatIntensity={1.2}>
          <Shape color={color} />
        </Float>
      </Canvas>
    </div>
  )
}
