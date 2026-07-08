import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Fades + rises a set of elements in as they enter the viewport.
 * Pass a ref to a container and a selector for the children to stagger.
 */
export function revealChildren(container, selector, opts = {}) {
  if (!container) return null

  const targets = container.querySelectorAll(selector)
  if (!targets.length) return null

  return gsap.fromTo(
    targets,
    { autoAlpha: 0, y: opts.y ?? 48 },
    {
      autoAlpha: 1,
      y: 0,
      duration: opts.duration ?? 1.1,
      ease: opts.ease ?? 'power3.out',
      stagger: opts.stagger ?? 0.12,
      scrollTrigger: {
        trigger: container,
        start: opts.start ?? 'top 80%',
        toggleActions: 'play none none reverse',
      },
    }
  )
}

/**
 * Simple parallax: moves `target` vertically relative to scroll progress
 * through its own trigger element (defaults to itself).
 */
export function parallaxY(target, trigger, distance = 120) {
  if (!target) return null

  return gsap.fromTo(
    target,
    { y: -distance },
    {
      y: distance,
      ease: 'none',
      scrollTrigger: {
        trigger: trigger || target,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.6,
      },
    }
  )
}
