import React, { useState, useEffect } from 'react'
import banner from '../assets/banner.jpg'

function Banner() {
  // ── Sync with Navbar dark mode ─────────────────────────────────
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

  // ── Animate on mount ───────────────────────────────────────────
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100)
    return () => clearTimeout(t)
  }, [])

  // ── Colour tokens ──────────────────────────────────────────────
  const pageBg    = isDark ? 'bg-slate-700'   : 'bg-base-200'
  const textBase  = isDark ? 'text-white'     : 'text-base-content'
  const textMuted = isDark ? 'text-slate-300' : 'text-base-content/70'
  const inputBg   = isDark
    ? 'bg-slate-700 border-slate-500 text-white placeholder-slate-400 focus-within:border-pink-400'
    : 'bg-white border-base-300 text-base-content placeholder-base-content/40 focus-within:border-pink-400'
  const badgeBg   = isDark ? 'bg-pink-500/15 text-pink-300 border-pink-500/30' : 'bg-pink-50 text-pink-600 border-pink-200'
  const statCard  = isDark ? 'bg-slate-800/60 border-slate-600' : 'bg-white/80 border-base-300'

  return (
    <div className={`transition-colors duration-300 ${pageBg} ${textBase}`}>
      <div className="max-w-screen-2xl container mx-auto px-4 sm:px-8 md:px-20 pt-8 pb-16">
        <div className="flex flex-col-reverse md:flex-row items-center gap-10 md:gap-16">

          {/* ── Left: Text Section ──────────────────────────── */}
          <div className={`w-full md:w-1/2 md:mt-16 text-center md:text-left transition-all duration-700
            ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>

            {/* Badge */}
            <div className="flex justify-center md:justify-start mb-5">
              <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold border tracking-wide ${badgeBg}`}>
                <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-pulse inline-block" />
                Nepal's Modern Bookstore 📚
              </span>
            </div>

            {/* Heading */}
            <h1 className={`text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-5 ${textBase}`}>
              Hello, welcome to{' '}
              <span className="text-pink-500 relative inline-block">
                KitabGhar
                {/* Underline accent */}
                <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 200 8" preserveAspectRatio="none">
                  <path d="M0 6 Q50 0 100 5 Q150 10 200 4" stroke="#ec4899" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
                </svg>
              </span>
              {' '}— Learn something{' '}
              <span className="text-pink-500">every minute!</span>
            </h1>

            {/* Description */}
            <p className={`text-sm sm:text-base leading-relaxed mb-8 max-w-lg mx-auto md:mx-0 ${textMuted}`}>
              Built for curious minds and ambitious thinkers. From timeless classics to cutting-edge reads,
              we curate books that challenge perspectives, spark creativity, and fuel growth — for students,
              professionals, and lifelong learners alike.
            </p>

            {/* Email Subscribe */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start mb-10">
              <div className={`flex items-center gap-2 flex-1 max-w-sm px-4 py-2.5 rounded-xl border transition-all duration-200 ${inputBg}`}>
                <svg className="w-4 h-4 opacity-50 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  required
                  className="bg-transparent outline-none text-sm w-full"
                />
              </div>
              <button className="px-6 py-2.5 rounded-xl bg-pink-500 hover:bg-pink-600 text-white font-bold text-sm
                tracking-wide transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg shadow-pink-500/30 shrink-0">
                Subscribe ✉️
              </button>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-3 max-w-sm mx-auto md:mx-0">
              {[
                { value: '10K+', label: 'Books' },
                { value: '5K+',  label: 'Readers' },
                { value: '50+',  label: 'Subjects' },
              ].map((s) => (
                <div key={s.label}
                  className={`rounded-xl border p-3 text-center transition-all duration-200 hover:shadow-md ${statCard}`}>
                  <p className="text-lg font-extrabold text-pink-500">{s.value}</p>
                  <p className={`text-xs font-medium ${textMuted}`}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: Image Section ─────────────────────────── */}
          <div className={`w-full md:w-1/2 transition-all duration-700 delay-200
            ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <div className="relative">

              {/* Decorative ring behind image */}
              <div className={`absolute -inset-3 rounded-2xl blur-xl opacity-30
                ${isDark ? 'bg-pink-500' : 'bg-pink-300'}`} />

              {/* Floating badge — top left */}
              <div className={`absolute -top-4 -left-4 z-10 px-3 py-2 rounded-xl shadow-lg text-xs font-bold border
                ${isDark ? 'bg-slate-800 border-slate-600 text-white' : 'bg-white border-base-300 text-base-content'}`}>
                📖 New Arrivals Weekly
              </div>

              {/* Floating badge — bottom right */}
              <div className={`absolute -bottom-4 -right-4 z-10 px-3 py-2 rounded-xl shadow-lg text-xs font-bold border
                ${isDark ? 'bg-slate-800 border-slate-600 text-pink-400' : 'bg-white border-base-300 text-pink-500'}`}>
                ⭐ Top Rated Books
              </div>

              {/* Main image */}
              <img
                src={banner}
                alt="KitabGhar Banner"
                className="relative z-0 w-full h-auto object-cover rounded-2xl shadow-2xl"
              />
            </div>
          </div>

        </div>

        {/* ── Scroll hint ─────────────────────────────────────── */}
        <div className="flex justify-center mt-14">
          <div className={`flex flex-col items-center gap-1 text-xs font-medium animate-bounce ${textMuted}`}>
            <span>Explore Books</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Banner