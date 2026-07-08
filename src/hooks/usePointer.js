import { useEffect, useRef } from 'react'

/**
 * Tracks pointer position normalized to [-1, 1] on both axes, with a
 * lightweight lerp target/current pair so consumers (R3F scenes) can
 * ease toward it in their own render loop instead of re-rendering React.
 */
export default function usePointer() {
  const pointer = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 })

  useEffect(() => {
    const handleMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = -(e.clientY / window.innerHeight) * 2 + 1
      pointer.current.targetX = x
      pointer.current.targetY = y
    }

    const handleTouch = (e) => {
      if (!e.touches?.[0]) return
      const touch = e.touches[0]
      const x = (touch.clientX / window.innerWidth) * 2 - 1
      const y = -(touch.clientY / window.innerHeight) * 2 + 1
      pointer.current.targetX = x
      pointer.current.targetY = y
    }

    window.addEventListener('pointermove', handleMove, { passive: true })
    window.addEventListener('touchmove', handleTouch, { passive: true })
    return () => {
      window.removeEventListener('pointermove', handleMove)
      window.removeEventListener('touchmove', handleTouch)
    }
  }, [])

  return pointer
}
