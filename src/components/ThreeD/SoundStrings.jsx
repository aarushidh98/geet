import { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * A single "string" — a horizontal strand made of many segments that
 * behaves like a plucked instrument string: it has its own idle sine
 * oscillation, and bulges toward the pointer when the pointer is near.
 * `width` is the real, current viewport width in Three.js units, so
 * the strand always reaches both edges of the screen.
 */
function Strand({ index, count, pointer, color, width }) {
  const segments = 64
  const meshRef = useRef()

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    const positions = new Float32Array((segments + 1) * 3)
    for (let i = 0; i <= segments; i++) {
      const x = (i / segments) * width - width / 2
      positions[i * 3] = x
      positions[i * 3 + 1] = 0
      positions[i * 3 + 2] = 0
    }
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    return geo
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width])

  const baseY = (index / (count - 1) - 0.5) * 6
  const phase = index * 0.7

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    const pos = meshRef.current.geometry.attributes.position
    const px = pointer.current.x * (width / 2)
    const py = pointer.current.y * 3.2

    for (let i = 0; i <= segments; i++) {
      const x = pos.getX(i)
      const idle = Math.sin(t * 0.6 + phase + x * 0.35) * 0.12

      const dx = x - px
      const dy = baseY - py
      const dist = Math.sqrt(dx * dx + dy * dy)
      const influence = Math.exp(-dist * dist * 0.35) * 1.4

      pos.setY(i, idle + influence)
    }
    pos.needsUpdate = true

    meshRef.current.position.y = baseY
    meshRef.current.rotation.z = Math.sin(t * 0.15 + phase) * 0.01
  })

  return (
    <line ref={meshRef} geometry={geometry}>
      <lineBasicMaterial color={color} transparent opacity={0.55} />
    </line>
  )
}

export default function SoundStrings({ pointer }) {
  const groupRef = useRef()
  const strandCount = 9
  const colors = ['#E8A33D', '#C1502E', '#8B8577']

  // viewport.width is already computed by R3F/drei from the camera's
  // fov + distance + canvas aspect ratio, and updates on resize.
  const { viewport } = useThree()
  const strandWidth = viewport.width * 1.05 // slight overshoot past both edges

  useFrame((state) => {
    if (!groupRef.current) return
    const targetRotX = pointer.current.y * 0.08
    const targetRotY = pointer.current.x * 0.12
    groupRef.current.rotation.x += (targetRotX - groupRef.current.rotation.x) * 0.04
    groupRef.current.rotation.y += (targetRotY - groupRef.current.rotation.y) * 0.04
  })

  return (
    <group ref={groupRef}>
      {Array.from({ length: strandCount }).map((_, i) => (
        <Strand
          key={i}
          index={i}
          count={strandCount}
          pointer={pointer}
          color={colors[i % colors.length]}
          width={strandWidth}
        />
      ))}
    </group>
  )
}
