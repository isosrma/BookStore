import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

function Course() {
  const [book, setBook] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')

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

  // ── Fetch books ────────────────────────────────────────────────
  useEffect(() => {
    const getBook = async () => {
      try {
        const res = await axios.get('http://localhost:4001/book')
        setBook(res.data)
      } catch (error) {
        console.error('Error fetching book:', error)
      } finally {
        setLoading(false)
      }
    }
    getBook()
  }, [])

  // ── Filter + Search ────────────────────────────────────────────
  const categories = ['All', ...new Set(book.map((b) => b.category).filter(Boolean))]
  const filtered = book.filter((b) => {
    const matchCat = filter === 'All' || b.category === filter
    const matchSearch =
      b.name?.toLowerCase().includes(search.toLowerCase()) ||
      b.title?.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  // ── Colour tokens ──────────────────────────────────────────────
  const pageBg    = isDark ? 'bg-slate-700'   : 'bg-base-200'
  const textBase  = isDark ? 'text-white'     : 'text-base-content'
  const textMuted = isDark ? 'text-slate-400' : 'text-base-content/60'
  const cardBg    = isDark ? 'bg-slate-800 border-slate-600' : 'bg-white border-base-300'
  const inputCls  = isDark
    ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:border-pink-400'
    : 'bg-white border-base-300 text-base-content placeholder-base-content/40 focus:border-pink-500'
  const badgeBg   = isDark ? 'bg-pink-500/15 text-pink-300 border-pink-500/30' : 'bg-pink-50 text-pink-600 border-pink-200'
  const skeletonBg = isDark ? 'bg-slate-600' : 'bg-base-300'

  return (
    <div className={`min-h-screen pt-20 pb-16 transition-colors duration-300 ${pageBg} ${textBase}`}>
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4">

        {/* ── Hero Header ─────────────────────────────────── */}
        <div className="text-center py-14">
          <div className="flex justify-center mb-5">
            <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold border tracking-wide ${badgeBg}`}>
              <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-pulse inline-block" />
              Our Collection
            </span>
          </div>

          <h1 className={`text-3xl md:text-5xl font-extrabold mb-4 ${textBase}`}>
            We're delighted to have you{' '}
            <span className="text-pink-500">here! 🎉</span>
          </h1>

          <p className={`text-sm md:text-base max-w-2xl mx-auto leading-relaxed mb-8 ${textMuted}`}>
            Welcome to <span className="font-semibold text-pink-500">KitabGhar</span> — your personal library in the cloud!
            Explore countless books, discover new stories, and enjoy a world of knowledge at your fingertips.
          </p>

          <Link to="/">
            <button className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-pink-500 hover:bg-pink-600
              text-white font-bold text-sm tracking-wide transition-all duration-200
              hover:scale-105 active:scale-95 shadow-lg shadow-pink-500/30">
              ← Back to Home
            </button>
          </Link>
        </div>

        {/* ── Search + Filter Bar ──────────────────────────── */}
        <div className="flex flex-col sm:flex-row gap-4 mb-10 items-center">
          {/* Search */}
          <div className={`flex items-center gap-2 flex-1 px-4 py-2.5 rounded-xl border transition-all duration-200 ${inputCls}`}>
            <svg className="w-4 h-4 opacity-50 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
            </svg>
            <input
              type="text"
              placeholder="Search books by name or title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent outline-none text-sm w-full"
            />
          </div>

          {/* Category filter pills */}
          <div className="flex gap-2 flex-wrap justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold border transition-all duration-200
                  ${filter === cat
                    ? 'bg-pink-500 text-white border-pink-500 shadow-md shadow-pink-500/30'
                    : isDark
                      ? 'border-slate-600 text-slate-300 hover:border-pink-400 hover:text-pink-400'
                      : 'border-base-300 text-base-content/60 hover:border-pink-400 hover:text-pink-500'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* ── Results count ────────────────────────────────── */}
        {!loading && (
          <p className={`text-xs mb-6 ${textMuted}`}>
            Showing <span className="font-bold text-pink-500">{filtered.length}</span> book{filtered.length !== 1 ? 's' : ''}
            {filter !== 'All' && ` in "${filter}"`}
            {search && ` for "${search}"`}
          </p>
        )}

        {/* ── Book Grid ────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {/* Loading skeletons */}
          {loading && Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className={`rounded-2xl border overflow-hidden animate-pulse ${cardBg}`}>
              <div className={`w-full h-52 ${skeletonBg}`} />
              <div className="p-4 space-y-3">
                <div className={`h-4 rounded-full w-3/4 ${skeletonBg}`} />
                <div className={`h-3 rounded-full w-1/2 ${skeletonBg}`} />
                <div className={`h-3 rounded-full w-full ${skeletonBg}`} />
                <div className="flex justify-between pt-2">
                  <div className={`h-6 rounded-full w-16 ${skeletonBg}`} />
                  <div className={`h-6 rounded-full w-20 ${skeletonBg}`} />
                </div>
              </div>
            </div>
          ))}

          {/* No results */}
          {!loading && filtered.length === 0 && (
            <div className="col-span-full text-center py-20">
              <div className="text-5xl mb-4">📭</div>
              <p className={`text-lg font-bold mb-1 ${textBase}`}>No books found</p>
              <p className={`text-sm ${textMuted}`}>Try a different search or category.</p>
            </div>
          )}

          {/* Book cards */}
          {!loading && filtered.map((item) => (
            <BookCard key={item._id} item={item} isDark={isDark} cardBg={cardBg} textBase={textBase} textMuted={textMuted} />
          ))}
        </div>
      </div>
    </div>
  )
}

/* ── BookCard component ───────────────────────────────────────── */
function BookCard({ item, isDark, cardBg, textBase, textMuted }) {
  const [hovered, setHovered] = useState(false)
  const isFree = item.category === 'Free' || item.price === 0

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`rounded-2xl border overflow-hidden shadow-sm transition-all duration-300 flex flex-col
        ${cardBg}
        ${hovered ? 'shadow-xl shadow-pink-500/20 -translate-y-1.5 scale-[1.02]' : ''}`}
    >
      {/* Image */}
      <div className="relative overflow-hidden h-52 bg-base-300">
        <img
          src={item.image}
          alt={item.name}
          className={`w-full h-full object-cover transition-transform duration-500 ${hovered ? 'scale-110' : 'scale-100'}`}
        />

        {/* Overlay on hover */}
        <div className={`absolute inset-0 bg-pink-500/10 transition-opacity duration-300 ${hovered ? 'opacity-100' : 'opacity-0'}`} />

        {/* Free badge */}
        {isFree && (
          <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-black bg-green-500 text-white shadow-md">
            FREE
          </span>
        )}

        {/* New badge */}
        <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-black bg-pink-500 text-white shadow-md">
          NEW
        </span>
      </div>

      {/* Card Body */}
      <div className="p-4 flex flex-col flex-1">
        <h2 className={`font-bold text-base leading-snug mb-1 line-clamp-2 ${textBase}`}>
          {item.name}
        </h2>

        {item.category && (
          <span className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full mb-2 w-fit
            ${isDark ? 'bg-slate-700 text-slate-300' : 'bg-base-200 text-base-content/60'}`}>
            {item.category}
          </span>
        )}

        <p className={`text-xs leading-relaxed line-clamp-2 flex-1 mb-4 ${textMuted}`}>
          {item.title}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t
          ${isDark ? 'border-slate-700' : 'border-base-200'}">
          <span className="text-lg font-extrabold text-pink-500">
            {isFree ? 'Free' : `$${item.price}`}
          </span>
          <button className="px-4 py-1.5 rounded-xl bg-pink-500 hover:bg-pink-600 text-white text-xs font-bold
            transition-all duration-200 hover:scale-105 active:scale-95 shadow-md shadow-pink-500/20">
            Buy Now →
          </button>
        </div>
      </div>
    </div>
  )
}

export default Course