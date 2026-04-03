import React, { useState, useEffect } from 'react'

const skills = [
  { name: 'MongoDB',    icon: '🍃', level: 90 },
  { name: 'Express.js', icon: '⚡', level: 85 },
  { name: 'React.js',   icon: '⚛️', level: 92 },
  { name: 'Node.js',    icon: '🟢', level: 88 },
  { name: 'Tailwind',   icon: '🎨', level: 87 },
  { name: 'REST APIs',  icon: '🔗', level: 85 },
]

const stats = [
  { value: '10+', label: 'Projects Built' },
  { value: '2+',  label: 'Years Experience' },
  { value: '50+', label: 'Books Curated' },
  { value: '∞',   label: 'Cups of Tea ☕' },
]

const socialLinks = [
  {
    name: 'GitHub',
    href: '#',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.749 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
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
    name: 'Email',
    href: 'mailto:ishwor@kitabghar.com',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
]

function About() {
  // ── Sync with Navbar's dark mode (MutationObserver on <html>) ──
  const [isDark, setIsDark] = useState(() =>
    document.documentElement.classList.contains('dark')
  )
  useEffect(() => {
    const observer = new MutationObserver(() =>
      setIsDark(document.documentElement.classList.contains('dark'))
    )
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })
    return () => observer.disconnect()
  }, [])

  // ── Animate skill bars on mount ────────────────────────────────
  const [animate, setAnimate] = useState(false)
  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 300)
    return () => clearTimeout(timer)
  }, [])

  // ── Colour tokens — matches Navbar + Contact page ──────────────
  const bgPage    = isDark ? 'bg-slate-700'                  : 'bg-base-200'
  const card      = isDark ? 'bg-slate-800 border-slate-600' : 'bg-white border-base-300'
  const textBase  = isDark ? 'text-white'                    : 'text-base-content'
  const textMuted = isDark ? 'text-slate-400'                : 'text-base-content/60'
  const accent    = isDark ? 'text-pink-400'                 : 'text-pink-500'
  const accentBg  = isDark ? 'bg-pink-500/10'                : 'bg-pink-50'
  const accentBorder = isDark ? 'border-pink-400/30'         : 'border-pink-200'
  const divider   = isDark ? 'border-slate-600'              : 'border-base-300'
  const iconBtn   = isDark
    ? 'border-slate-600 text-slate-400 hover:text-pink-400 hover:border-pink-400/50 hover:bg-pink-400/10'
    : 'border-base-300 text-base-content/50 hover:text-pink-500 hover:border-pink-300 hover:bg-pink-50'
  const skillBg   = isDark ? 'bg-slate-700'                  : 'bg-base-200'
  const skillBar  = isDark ? 'bg-slate-600'                  : 'bg-base-300'

  return (
    <div className={`min-h-screen pt-20 pb-12 transition-colors duration-300 ${bgPage} ${textBase}`}>
      <div className="max-w-screen-2xl mx-auto container md:px-20 px-4">

        {/* ── Page Header ───────────────────────────── */}
        <div className="text-center py-12">
          <p className={`text-xs font-bold tracking-[0.3em] uppercase mb-3 ${accent}`}>
            — About the Project —
          </p>
          <h1 className={`text-4xl md:text-5xl font-extrabold mb-3 ${textBase}`}>
            About <span className={accent}>KitabGhar</span>
          </h1>
          <p className={`text-base max-w-2xl mx-auto ${textMuted}`}>
            A modern online bookstore built with the MERN stack — bringing
            books closer to readers across Nepal and beyond.
          </p>
        </div>

        {/* ── Mission Card ──────────────────────────── */}
        <div className={`rounded-2xl border p-8 mb-10 shadow-md ${card}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className={`text-2xl font-bold mb-4 ${textBase}`}>Our Mission</h2>
              <p className={`text-sm leading-relaxed mb-4 ${textMuted}`}>
                <span className={`font-semibold ${accent}`}>KitabGhar</span> (meaning "Book House" in Nepali)
                was created to make reading more accessible for everyone. Whether
                you're a student, a professional, or a casual reader — we have something for you.
              </p>
              <p className={`text-sm leading-relaxed ${textMuted}`}>
                From textbooks to fiction, we aim to be Nepal's go-to destination
                for discovering and purchasing books online — with a seamless, fast,
                and modern experience.
              </p>
            </div>
            {/* Mission highlights */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((s) => (
                <div key={s.label}
                  className={`rounded-xl border p-5 text-center transition-all duration-200 hover:shadow-md ${accentBg} ${accentBorder}`}>
                  <p className={`text-3xl font-black mb-1 ${accent}`}>{s.value}</p>
                  <p className={`text-xs font-semibold ${textMuted}`}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Developer Section ─────────────────────── */}
        <div className={`rounded-2xl border shadow-lg overflow-hidden mb-10 ${card}`}>
          <div className={`px-8 pt-8 pb-4 border-b ${divider}`}>
            <p className={`text-xs font-bold tracking-[0.3em] uppercase mb-1 ${accent}`}>
              — Meet the Developer —
            </p>
            <h2 className={`text-2xl font-bold ${textBase}`}>The Person Behind KitabGhar</h2>
          </div>

          <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8 items-start">

            {/* ── Developer Photo ── */}
            <div className="flex flex-col items-center gap-4">
              {/* Avatar with initials fallback */}
              <div className={`relative w-44 h-44 rounded-2xl overflow-hidden border-4 shadow-xl
                ${isDark ? 'border-pink-400/40' : 'border-pink-200'}`}>
                {/* Replace src with actual image path e.g. "/images/ishwor.jpg" */}
                <img
                  src="/images/developer.jpg"
                  alt="Ishwor Sharma"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback: show initials avatar if image not found
                    e.target.style.display = 'none'
                    e.target.nextSibling.style.display = 'flex'
                  }}
                />
                {/* Initials fallback — hidden by default */}
                <div
                  className={`absolute inset-0 items-center justify-center text-4xl font-black hidden
                    ${isDark ? 'bg-slate-700 text-pink-400' : 'bg-pink-50 text-pink-500'}`}>
                  IS
                </div>
              </div>

              {/* Name & Title */}
              <div className="text-center">
                <h3 className={`text-xl font-bold ${textBase}`}>Ishwor Sharma</h3>
                <p className={`text-sm font-semibold mt-0.5 ${accent}`}>MERN Stack Developer</p>
                <div className={`flex items-center justify-center gap-1 mt-1.5 text-xs ${textMuted}`}>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                    <circle cx="12" cy="9" r="2.5" />
                  </svg>
                  Pokhara, Nepal 🇳🇵
                </div>
              </div>

              {/* Social Links */}
              <div className="flex gap-2">
                {socialLinks.map((s) => (
                  <a key={s.name} href={s.href} title={s.name}
                    className={`p-2 rounded-lg border transition-all duration-200 ${iconBtn}`}>
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* ── Developer Bio ── */}
            <div className="md:col-span-2 flex flex-col gap-6">
              <div>
                <h4 className={`text-sm font-bold uppercase tracking-widest mb-3 ${textMuted}`}>About Me</h4>
                <p className={`text-sm leading-relaxed mb-3 ${textMuted}`}>
                  Hi! I'm <span className={`font-semibold ${accent}`}>Ishwor Sharma</span>, a passionate
                  MERN Stack Developer based in the beautiful city of Pokhara, Nepal.
                  I love building full-stack web applications that solve real-world problems.
                </p>
                <p className={`text-sm leading-relaxed ${textMuted}`}>
                  KitabGhar is one of my passion projects — inspired by my love for books and
                  the desire to create a modern, fast, and user-friendly bookstore experience
                  for Nepali readers. Every line of code is written with care and purpose.
                </p>
              </div>

              {/* Tech Stack / Skills */}
              <div>
                <h4 className={`text-sm font-bold uppercase tracking-widest mb-4 ${textMuted}`}>Tech Stack</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between items-center mb-1">
                        <span className={`text-xs font-semibold flex items-center gap-1.5 ${textBase}`}>
                          <span>{skill.icon}</span> {skill.name}
                        </span>
                        <span className={`text-xs ${textMuted}`}>{skill.level}%</span>
                      </div>
                      <div className={`w-full rounded-full h-2 ${skillBar}`}>
                        <div
                          className="h-2 rounded-full bg-pink-500 transition-all duration-1000 ease-out"
                          style={{ width: animate ? `${skill.level}%` : '0%' }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {['Full Stack', 'REST API', 'JWT Auth', 'Git & GitHub', 'Tailwind CSS', 'DaisyUI'].map((tag) => (
                  <span key={tag}
                    className={`px-3 py-1 rounded-full text-xs font-semibold border ${accentBg} ${accentBorder} ${accent}`}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Tech Used in KitabGhar ────────────────── */}
        <div className={`rounded-2xl border p-8 mb-10 shadow-md ${card}`}>
          <p className={`text-xs font-bold tracking-[0.3em] uppercase mb-1 ${accent}`}>
            — Built With —
          </p>
          <h2 className={`text-2xl font-bold mb-6 ${textBase}`}>Technology Stack</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {[
              { name: 'MongoDB',    emoji: '🍃', desc: 'Database' },
              { name: 'Express',    emoji: '⚡', desc: 'Backend' },
              { name: 'React',      emoji: '⚛️', desc: 'Frontend' },
              { name: 'Node.js',    emoji: '🟢', desc: 'Runtime' },
              { name: 'Tailwind',   emoji: '🎨', desc: 'Styling' },
              { name: 'DaisyUI',    emoji: '🌸', desc: 'UI Kit' },
            ].map((tech) => (
              <div key={tech.name}
                className={`rounded-xl border p-4 text-center transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 ${accentBg} ${accentBorder}`}>
                <div className="text-3xl mb-2">{tech.emoji}</div>
                <p className={`text-xs font-bold ${textBase}`}>{tech.name}</p>
                <p className={`text-xs ${textMuted}`}>{tech.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── CTA ───────────────────────────────────── */}
        <div className={`rounded-2xl border p-10 text-center shadow-md ${card}`}>
          <div className="text-4xl mb-4">📚</div>
          <h2 className={`text-2xl font-bold mb-2 ${textBase}`}>
            Want to Collaborate or Give Feedback?
          </h2>
          <p className={`text-sm mb-6 max-w-md mx-auto ${textMuted}`}>
            I'm always open to new ideas, collaborations, or a friendly chat about tech and books!
          </p>
          <a href="/contact"
            className="inline-block px-8 py-3 rounded-xl bg-pink-500 hover:bg-pink-600 text-white font-bold text-sm tracking-widest uppercase transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg">
            Get in Touch →
          </a>
        </div>

        {/* ── Footer Strip ──────────────────────────── */}
        <div className={`mt-16 pt-6 border-t text-center text-xs ${textMuted} ${divider}`}>
          © {new Date().getFullYear()} KitabGhar — Crafted with ❤️ by Ishwor Sharma, Pokhara, Nepal
        </div>
      </div>
    </div>
  )
}

export default About