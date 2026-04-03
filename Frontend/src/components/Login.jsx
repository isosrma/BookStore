import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from "react-hook-form"
import axios from 'axios'
import toast from 'react-hot-toast'

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

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

  const onSubmit = async (data) => {
    const userInfo = { email: data.email, password: data.password }
    setLoading(true)
    await axios
      .post("http://localhost:4001/user/login", userInfo)
      .then((res) => {
        if (res.data) {
          toast.success("Logged in Successfully")
          document.getElementById("my_modal_3").close()
          localStorage.setItem("Users", JSON.stringify(res.data.user))
          setTimeout(() => window.location.reload(), 1000)
        }
      })
      .catch((err) => {
        if (err.response) {
          toast.error("Error: " + err.response.data.message)
        }
      })
      .finally(() => setLoading(false))
  }

  // ── Colour tokens ──────────────────────────────────────────────
  const modalBg   = isDark ? 'bg-slate-800 text-white'         : 'bg-white text-base-content'
  const inputCls  = isDark
    ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:border-pink-400 focus:ring-pink-400/20'
    : 'bg-base-200 border-base-300 text-base-content placeholder-base-content/40 focus:border-pink-500 focus:ring-pink-200'
  const labelCls  = isDark ? 'text-slate-300' : 'text-base-content/70'
  const errorCls  = 'text-xs text-red-400 mt-1'
  const divider   = isDark ? 'border-slate-600' : 'border-base-200'

  return (
    <div>
      <dialog id="my_modal_3" className="modal modal-bottom sm:modal-middle">
        <div className={`modal-box p-0 overflow-hidden rounded-2xl shadow-2xl max-w-md w-full ${modalBg}`}>

          {/* ── Top accent bar ── */}
          <div className="h-1.5 w-full bg-gradient-to-r from-pink-400 via-pink-500 to-rose-500" />

          {/* ── Close Button ── */}
          <Link
            to="/"
            className={`btn btn-sm btn-circle btn-ghost absolute right-3 top-3 z-10
              ${isDark ? 'text-slate-400 hover:text-white' : 'text-base-content/50 hover:text-base-content'}`}
            onClick={() => document.getElementById("my_modal_3").close()}
          >
            ✕
          </Link>

          <form onSubmit={handleSubmit(onSubmit)} className="px-8 pt-8 pb-8">

            {/* ── Header ── */}
            <div className="text-center mb-7">
              <div className="text-4xl mb-2">📚</div>
              <h3 className={`text-2xl font-extrabold ${isDark ? 'text-white' : 'text-base-content'}`}>
                Welcome Back
              </h3>
              <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-base-content/50'}`}>
                Login to your <span className="text-pink-500 font-semibold">KitabGhar</span> account
              </p>
            </div>

            {/* ── Email ── */}
            <div className="mb-4">
              <label className={`block text-xs font-semibold uppercase tracking-wide mb-1.5 ${labelCls}`}>
                Email Address
              </label>
              <div className="relative">
                <span className={`absolute left-3 top-1/2 -translate-y-1/2 ${isDark ? 'text-slate-400' : 'text-base-content/40'}`}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </span>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-sm border outline-none transition-all duration-200
                    focus:ring-2 ${inputCls}`}
                  {...register("email", { required: true })}
                />
              </div>
              {errors.email && <p className={errorCls}>⚠ Email is required</p>}
            </div>

            {/* ── Password ── */}
            <div className="mb-6">
              <label className={`block text-xs font-semibold uppercase tracking-wide mb-1.5 ${labelCls}`}>
                Password
              </label>
              <div className="relative">
                <span className={`absolute left-3 top-1/2 -translate-y-1/2 ${isDark ? 'text-slate-400' : 'text-base-content/40'}`}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0110 0v4" />
                  </svg>
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className={`w-full pl-10 pr-10 py-2.5 rounded-xl text-sm border outline-none transition-all duration-200
                    focus:ring-2 ${inputCls}`}
                  {...register("password", { required: true })}
                />
                {/* Show/Hide toggle */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute right-3 top-1/2 -translate-y-1/2 transition-colors
                    ${isDark ? 'text-slate-400 hover:text-pink-400' : 'text-base-content/40 hover:text-pink-500'}`}
                >
                  {showPassword ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && <p className={errorCls}>⚠ Password is required</p>}
            </div>

            {/* ── Submit ── */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-xl font-bold text-sm tracking-widest uppercase text-white
                bg-pink-500 hover:bg-pink-600 transition-all duration-200 shadow-lg shadow-pink-500/30
                ${loading ? 'opacity-60 cursor-not-allowed' : 'hover:scale-[1.01] active:scale-[0.98]'}`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10"
                      stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Logging in...
                </span>
              ) : 'Login →'}
            </button>

            {/* ── Divider ── */}
            <div className={`flex items-center gap-3 my-5`}>
              <div className={`flex-1 h-px ${isDark ? 'bg-slate-600' : 'bg-base-300'}`} />
              <span className={`text-xs ${isDark ? 'text-slate-500' : 'text-base-content/30'}`}>OR</span>
              <div className={`flex-1 h-px ${isDark ? 'bg-slate-600' : 'bg-base-300'}`} />
            </div>

            {/* ── Signup redirect ── */}
            <p className={`text-center text-sm ${isDark ? 'text-slate-400' : 'text-base-content/60'}`}>
              Not registered yet?{' '}
              <Link
                to="/signup"
                className="text-pink-500 font-semibold hover:text-pink-600 hover:underline underline-offset-2 transition-colors"
                onClick={() => document.getElementById("my_modal_3").close()}
              >
                Create an account
              </Link>
            </p>
          </form>
        </div>

        {/* Click outside to close */}
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  )
}

export default Login