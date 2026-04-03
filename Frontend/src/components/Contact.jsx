import React, { useState, useEffect } from 'react'

const socialLinks = [
  {
    name: 'Facebook',
    href: '#',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
      </svg>
    ),
  },
  {
    name: 'Twitter / X',
    href: '#',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    href: '#',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    href: '#',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
]

function Contact() {
  // ── Sync with Navbar's localStorage dark mode ──────────────────
  // Navbar toggles 'dark' class on <html>. We watch it via MutationObserver.
  const [isDark, setIsDark] = useState(() =>
    document.documentElement.classList.contains('dark')
  )

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'))
    })
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })
    return () => observer.disconnect()
  }, [])

  // ── Form state ─────────────────────────────────────────────────
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', subject: '', message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [focused, setFocused] = useState('')

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    // 🔁 Replace this with: await axios.post('/api/contact', formData)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 1800)
  }

  const resetForm = () => {
    setSubmitted(false)
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
  }

  // ── Colour tokens — mirrors DaisyUI base + slate-500 dark (your Navbar) ──
  const bgPage    = isDark ? 'bg-slate-700'                     : 'bg-base-200'
  const card      = isDark ? 'bg-slate-800 border-slate-600'    : 'bg-white border-base-300'
  const textBase  = isDark ? 'text-white'                       : 'text-base-content'
  const textMuted = isDark ? 'text-slate-400'                   : 'text-base-content/60'
  const accent    = isDark ? 'text-pink-400'                    : 'text-pink-500'
  const inputBg   = isDark
    ? 'bg-slate-700 text-white placeholder-slate-500 border-slate-600'
    : 'bg-base-200 text-base-content placeholder-base-content/40 border-base-300'
  const focusRing = isDark
    ? 'border-pink-400 ring-2 ring-pink-400/20'
    : 'border-pink-500 ring-2 ring-pink-200'
  const btnPrimary = 'bg-pink-500 hover:bg-pink-600 text-white'
  const iconBtn = isDark
    ? 'border-slate-600 text-slate-400 hover:text-pink-400 hover:border-pink-400/50 hover:bg-pink-400/10'
    : 'border-base-300 text-base-content/50 hover:text-pink-500 hover:border-pink-300 hover:bg-pink-50'
  const divider = isDark ? 'border-slate-600' : 'border-base-300'

  return (
    <div className={`min-h-screen pt-20 pb-12 transition-colors duration-300 ${bgPage} ${textBase}`}>
      <div className="max-w-screen-2xl mx-auto container md:px-20 px-4">

        {/* ── Page Header ───────────────────────────── */}
        <div className="text-center py-12">
          <p className={`text-xs font-bold tracking-[0.3em] uppercase mb-3 ${accent}`}>
            — Get in Touch —
          </p>
          <h1 className={`text-4xl md:text-5xl font-extrabold mb-3 ${textBase}`}>
            Contact <span className={accent}>KitabGhar</span>
          </h1>
          <p className={`text-base max-w-xl mx-auto ${textMuted}`}>
            Have a question about a book, a course, or a collaboration?
            We're happy to hear from you.
          </p>
        </div>

        {/* ── Main Grid ─────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 mt-4">

          {/* ── Left: Info Cards ──────────────────── */}
          <div className="lg:col-span-2 flex flex-col gap-5">

            <InfoCard card={card} accent={accent} textMuted={textMuted} icon="✉️" title="Email Us">
              <a href="mailto:hello@kitabghar.com"
                className={`text-sm hover:underline underline-offset-2 ${accent}`}>
                hello@kitabghar.com
              </a>
              <p className={`text-xs mt-1 ${textMuted}`}>We reply within 24 hours.</p>
            </InfoCard>

            <InfoCard card={card} accent={accent} textMuted={textMuted} icon="📞" title="Call Us">
              <a href="tel:+9779800000000"
                className={`text-sm hover:underline underline-offset-2 ${accent}`}>
                +977 98-0000-0000
              </a>
              <p className={`text-xs mt-1 ${textMuted}`}>Sun – Fri, 9 AM – 6 PM (NPT)</p>
            </InfoCard>

            <InfoCard card={card} accent={accent} textMuted={textMuted} icon="📍" title="Visit Us">
              <p className={`text-sm leading-relaxed ${textMuted}`}>
                Newroad, Kathmandu<br />Bagmati Province, Nepal
              </p>
            </InfoCard>

            <InfoCard card={card} accent={accent} textMuted={textMuted} icon="🌐" title="Follow Us">
              <div className="flex gap-2 mt-2 flex-wrap">
                {socialLinks.map((s) => (
                  <a key={s.name} href={s.href} title={s.name}
                    className={`p-2 rounded-lg border transition-all duration-200 ${iconBtn}`}>
                    {s.icon}
                  </a>
                ))}
              </div>
            </InfoCard>
          </div>

          {/* ── Right: Contact Form ────────────────── */}
          <div className={`lg:col-span-3 rounded-2xl border p-8 shadow-lg transition-colors duration-300 ${card}`}>

            {submitted ? (
              /* ── Success State ── */
              <div className="flex flex-col items-center justify-center min-h-[420px] text-center gap-5">
                <div className="text-6xl animate-bounce">📚</div>
                <h2 className={`text-2xl font-bold ${accent}`}>Message Received!</h2>
                <p className={`text-sm max-w-xs ${textMuted}`}>
                  Thank you for reaching out to KitabGhar.
                  We'll get back to you shortly.
                </p>
                <button onClick={resetForm}
                  className={`mt-2 px-6 py-2 rounded-full text-sm font-semibold border transition-all
                    ${isDark
                      ? 'border-pink-400 text-pink-400 hover:bg-pink-400/10'
                      : 'border-pink-500 text-pink-500 hover:bg-pink-50'
                    }`}>
                  Send Another Message
                </button>
              </div>
            ) : (
              <>
                <h2 className={`text-2xl font-bold mb-1 ${textBase}`}>Send a Message</h2>
                <p className={`text-xs mb-7 ${textMuted}`}>All fields are required.</p>

                <form onSubmit={handleSubmit} className="space-y-5">

                  {/* Name + Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Field label="Full Name" name="name" type="text"
                      placeholder="Ramesh Sharma" value={formData.name}
                      onChange={handleChange} focused={focused} setFocused={setFocused}
                      inputBg={inputBg} focusRing={focusRing} textMuted={textMuted} />
                    <Field label="Phone Number" name="phone" type="tel"
                      placeholder="+977 98XXXXXXXX" value={formData.phone}
                      onChange={handleChange} focused={focused} setFocused={setFocused}
                      inputBg={inputBg} focusRing={focusRing} textMuted={textMuted} />
                  </div>

                  {/* Email */}
                  <Field label="Email Address" name="email" type="email"
                    placeholder="you@example.com" value={formData.email}
                    onChange={handleChange} focused={focused} setFocused={setFocused}
                    inputBg={inputBg} focusRing={focusRing} textMuted={textMuted} />

                  {/* Subject */}
                  <Field label="Subject" name="subject" type="text"
                    placeholder="Book inquiry, course help, etc." value={formData.subject}
                    onChange={handleChange} focused={focused} setFocused={setFocused}
                    inputBg={inputBg} focusRing={focusRing} textMuted={textMuted} />

                  {/* Message */}
                  <div>
                    <label className={`block text-xs font-semibold mb-1.5 tracking-wide uppercase ${textMuted}`}>
                      Message
                    </label>
                    <textarea
                      name="message" rows={5} required
                      placeholder="Write your message here..."
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setFocused('message')}
                      onBlur={() => setFocused('')}
                      className={`w-full px-4 py-3 rounded-xl text-sm border outline-none resize-none transition-all duration-200
                        ${inputBg} ${focused === 'message' ? focusRing : ''}`}
                    />
                  </div>

                  {/* Submit Button */}
                  <button type="submit" disabled={loading}
                    className={`w-full py-3.5 rounded-xl font-bold text-sm tracking-widest uppercase transition-all duration-300
                      ${loading ? 'opacity-60 cursor-not-allowed' : 'hover:scale-[1.01] active:scale-[0.99]'}
                      ${btnPrimary}`}>
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10"
                            stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                        </svg>
                        Sending...
                      </span>
                    ) : 'Send Message →'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>

        {/* ── Footer Strip ──────────────────────────── */}
        <div className={`mt-16 pt-6 border-t text-center text-xs ${textMuted} ${divider}`}>
          © {new Date().getFullYear()} KitabGhar — Where Every Page Tells a Story
        </div>
      </div>
    </div>
  )
}

/* ── Reusable InfoCard ────────────────────────────────────────── */
function InfoCard({ card, accent, textMuted, icon, title, children }) {
  return (
    <div className={`rounded-xl border p-5 flex gap-4 transition-all duration-200 hover:shadow-md ${card}`}>
      <span className="text-2xl mt-0.5">{icon}</span>
      <div>
        <p className={`text-xs font-bold tracking-widest uppercase mb-1 ${accent}`}>{title}</p>
        {children}
      </div>
    </div>
  )
}

/* ── Reusable Input Field ─────────────────────────────────────── */
function Field({ label, name, type, placeholder, value, onChange,
  focused, setFocused, inputBg, focusRing, textMuted }) {
  return (
    <div>
      <label className={`block text-xs font-semibold mb-1.5 tracking-wide uppercase ${textMuted}`}>
        {label}
      </label>
      <input
        type={type} name={name} required
        placeholder={placeholder} value={value}
        onChange={onChange}
        onFocus={() => setFocused(name)}
        onBlur={() => setFocused('')}
        className={`w-full px-4 py-3 rounded-xl text-sm border outline-none transition-all duration-200
          ${inputBg} ${focused === name ? focusRing : ''}`}
      />
    </div>
  )
}

export default Contact