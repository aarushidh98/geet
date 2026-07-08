const SOCIALS = [
  { label: 'Instagram', href: 'https://instagram.com' },
  { label: 'YouTube', href: 'https://youtube.com' },
  { label: 'Spotify', href: 'https://spotify.com' },
]

export default function Footer() {
  return (
    <footer className="relative z-10 section-pad pt-20 pb-10 border-t border-line">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-12">
        <div>
          <p className="eyebrow mb-4">Next up</p>
          <h3 className="font-display text-3xl md:text-5xl text-paper leading-tight">
            Saturday shows,
            <br />
            songs that stay.
          </h3>
        </div>

        <div className="flex gap-8 font-mono text-xs uppercase tracking-widest2">
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="text-muted hover:text-amber-signal"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>

      <div className="waveform-rule my-10" />

      <div className="flex flex-col md:flex-row justify-between gap-4 font-mono text-[11px] uppercase tracking-widest2 text-muted">
        <span>&copy; {new Date().getFullYear()} GEET. All songs original.</span>
        <span>Built for the stage, not the algorithm.</span>
      </div>
    </footer>
  )
}
