import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const LINKS = [
  { href: '#about', label: 'About' },
  { href: '#band', label: 'The Band' },
  { href: '#live', label: 'Live' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#contact', label: 'Booking' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavClick = (e, href) => {
    e.preventDefault()
    setOpen(false)
    const el = document.querySelector(href)
    el?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-void/80 backdrop-blur-md border-b border-line' : 'bg-transparent'
      }`}
    >
      <nav className="section-pad flex items-center justify-between h-20">
        <a
          href="#top"
          onClick={(e) => handleNavClick(e, '#top')}
          className="font-display text-xl tracking-[0.2em] text-paper hover:text-amber-signal"
        >
          GEET
        </a>

        <ul className="hidden md:flex items-center gap-10 font-mono text-xs uppercase tracking-widest2">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-muted hover:text-amber-signal"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          onClick={(e) => handleNavClick(e, '#contact')}
          className="hidden md:inline-block border border-amber-signal/60 text-amber-signal font-mono text-xs uppercase tracking-widest2 px-5 py-2.5 hover:bg-amber-signal hover:text-void"
        >
          Book Us
        </a>

        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden flex flex-col gap-1.5 w-8 h-8 items-end justify-center"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span
            className={`block h-px bg-paper transition-all duration-300 ${
              open ? 'w-6 rotate-45 translate-y-[3px]' : 'w-6'
            }`}
          />
          <span
            className={`block h-px bg-paper transition-all duration-300 ${
              open ? 'w-6 -rotate-45 -translate-y-[3px]' : 'w-4'
            }`}
          />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
            className="md:hidden overflow-hidden bg-void border-b border-line"
          >
            <ul className="section-pad py-6 flex flex-col gap-5 font-mono text-sm uppercase tracking-widest2">
              {LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-paper/90 hover:text-amber-signal"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, '#contact')}
                  className="inline-block mt-2 border border-amber-signal/60 text-amber-signal px-5 py-2.5"
                >
                  Book Us
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
