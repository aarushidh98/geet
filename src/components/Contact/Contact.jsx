import { useEffect, useRef, useState } from 'react'
import { revealChildren, parallaxY } from '@/lib/scrollReveal'
import SectionAccent from '@/components/ThreeD/SectionAccent'

const initialForm = {
  name: '',
  email: '',
  venue: '',
  date: '',
  message: '',
}

function Field({ label, name, type = 'text', value, onChange, error, textarea }) {
  const Component = textarea ? 'textarea' : 'input'
  return (
    <label className="block">
      <span className="font-mono text-[11px] uppercase tracking-widest2 text-muted">
        {label}
      </span>
      <Component
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        rows={textarea ? 4 : undefined}
        className={`mt-2 w-full bg-transparent border-b py-3 font-body text-paper placeholder:text-muted/50 focus:outline-none focus:border-amber-signal transition-colors resize-none ${
          error ? 'border-ember' : 'border-line'
        }`}
      />
      {error && (
        <span className="mt-1 block font-mono text-[10px] uppercase tracking-widest2 text-ember">
          {error}
        </span>
      )}
    </label>
  )
}

export default function Contact() {
  const sectionRef = useRef()
  const accentRef = useRef()
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | submitting | success

  useEffect(() => {
    const anim = revealChildren(sectionRef.current, '.contact-reveal')
    const accentParallax = parallaxY(accentRef.current, sectionRef.current, 65)
    return () => {
      anim?.scrollTrigger?.kill()
      anim?.kill()
      accentParallax?.scrollTrigger?.kill()
      accentParallax?.kill()
    }
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const validate = () => {
    const next = {}
    if (!form.name.trim()) next.name = 'Required'
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = 'Enter a valid email'
    if (!form.venue.trim()) next.venue = 'Required'
    if (!form.date.trim()) next.date = 'Required'
    if (!form.message.trim()) next.message = 'Tell us a little more'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    setStatus('submitting')
    // Wire this up to your backend / form service of choice
    // (e.g. Formspree, Resend, a serverless function, etc.)
    await new Promise((res) => setTimeout(res, 900))
    setStatus('success')
    setForm(initialForm)
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative z-10 section-pad py-28 md:py-40"
    >
      <div ref={accentRef}>
        <SectionAccent
          shape="mic"
          color="#E8A33D"
          className="top-8 right-4 w-44 h-44 md:w-56 md:h-56 hidden lg:block"
        />
      </div>

      <div className="grid md:grid-cols-12 gap-12 md:gap-8">
        <div className="md:col-span-5">
          <p className="eyebrow mb-6 contact-reveal">Booking</p>
          <h2 className="contact-reveal font-display text-4xl md:text-6xl text-paper leading-[1.05] mb-6">
            Bring us
            <br />
            to your room.
          </h2>
          <p className="contact-reveal text-paper/60 max-w-sm">
            Bars, festivals, private sets, radio sessions — if there's a
            room and a plug socket, we're interested. Tell us the date and
            the space, and we'll get back within a few days.
          </p>

          <div className="contact-reveal mt-10 font-mono text-xs uppercase tracking-widest2 text-muted space-y-2">
            <p>booking@geetband.in</p>
            <p>+91 98xxx xxxxx</p>
          </div>
        </div>

        <div className="md:col-span-6 md:col-start-7">
          {status === 'success' ? (
            <div className="contact-reveal border border-amber-signal/40 p-8 md:p-10">
              <p className="font-display text-2xl md:text-3xl text-paper mb-2">
                Got it.
              </p>
              <p className="text-paper/60">
                Thanks for reaching out — we read every message and reply
                from booking@geetband.in.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="contact-reveal flex flex-col gap-8"
              noValidate
            >
              <div className="grid sm:grid-cols-2 gap-8">
                <Field
                  label="Your Name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  error={errors.name}
                />
                <Field
                  label="Email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  error={errors.email}
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-8">
                <Field
                  label="Venue / City"
                  name="venue"
                  value={form.venue}
                  onChange={handleChange}
                  error={errors.venue}
                />
                <Field
                  label="Preferred Date"
                  name="date"
                  type="date"
                  value={form.date}
                  onChange={handleChange}
                  error={errors.date}
                />
              </div>

              <Field
                label="Tell us about the show"
                name="message"
                textarea
                value={form.message}
                onChange={handleChange}
                error={errors.message}
              />

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="mt-2 self-start border border-amber-signal/60 text-amber-signal font-mono text-xs uppercase tracking-widest2 px-8 py-3.5 hover:bg-amber-signal hover:text-void disabled:opacity-50 disabled:cursor-wait"
              >
                {status === 'submitting' ? 'Sending…' : 'Send Booking Request'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
