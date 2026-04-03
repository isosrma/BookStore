import React, { useState, useEffect } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  // ── Sync with Navbar dark mode ─────────────────────────────────
  const [isDark, setIsDark] = useState(() =>
    document.documentElement.classList.contains("dark")
  );
  useEffect(() => {
    const observer = new MutationObserver(() =>
      setIsDark(document.documentElement.classList.contains("dark"))
    );
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  const onSubmit = async (data) => {
    const userInfo = {
      fullname: data.fullname,
      email: data.email,
      password: data.password,
    };
    setLoading(true);
    await axios
      .post("http://localhost:4001/user/signup", userInfo)
      .then((res) => {
        if (res.data) {
          toast.success("Signup Successfully");
          localStorage.setItem("Users", JSON.stringify(res.data.user));
          navigate("/");
        }
      })
      .catch((err) => {
        if (err.response) {
          toast.error("Error: " + err.response.data.message);
        }
      })
      .finally(() => setLoading(false));
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      toast.success(`Welcome ${result.user.displayName} 🎉`);
      navigate("/#home");
    } catch (error) {
      toast.error("Google login failed. Please try again.");
    } finally {
      setGoogleLoading(false);
    }
  };

  // ── Colour tokens ──────────────────────────────────────────────
  const pageBg    = isDark ? "bg-slate-700"   : "bg-base-200";
  const cardBg    = isDark ? "bg-slate-800 border-slate-600" : "bg-white border-base-300";
  const textBase  = isDark ? "text-white"     : "text-base-content";
  const textMuted = isDark ? "text-slate-400" : "text-base-content/60";
  const labelCls  = isDark ? "text-slate-300" : "text-base-content/70";
  const inputCls  = isDark
    ? "bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:border-pink-400 focus:ring-pink-400/20"
    : "bg-base-200 border-base-300 text-base-content placeholder-base-content/40 focus:border-pink-500 focus:ring-pink-200";
  const googleBtn = isDark
    ? "border-slate-600 bg-slate-700 hover:bg-slate-600 text-slate-200"
    : "border-base-300 bg-white hover:bg-base-200 text-base-content";

  const Field = ({ label, name, type = "text", placeholder, icon, rightSlot, validation }) => (
    <div className="mb-4">
      <label className={`block text-xs font-semibold uppercase tracking-wide mb-1.5 ${labelCls}`}>
        {label}
      </label>
      <div className="relative">
        <span className={`absolute left-3 top-1/2 -translate-y-1/2 ${isDark ? "text-slate-400" : "text-base-content/40"}`}>
          {icon}
        </span>
        <input
          type={type}
          placeholder={placeholder}
          className={`w-full pl-10 ${rightSlot ? "pr-10" : "pr-4"} py-2.5 rounded-xl text-sm border outline-none
            transition-all duration-200 focus:ring-2 ${inputCls}`}
          {...register(name, validation)}
        />
        {rightSlot && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">{rightSlot}</div>
        )}
      </div>
      {errors[name] && (
        <p className="text-xs text-red-400 mt-1">⚠ {errors[name].message || `${label} is required`}</p>
      )}
    </div>
  );

  return (
    <div className={`min-h-screen pt-20 pb-12 flex items-center justify-center transition-colors duration-300 ${pageBg}`}>
      <div className={`w-full max-w-md rounded-2xl border shadow-2xl overflow-hidden ${cardBg}`}>

        {/* ── Top accent bar ── */}
        <div className="h-1.5 w-full bg-gradient-to-r from-pink-400 via-pink-500 to-rose-500" />

        <div className="px-8 pt-8 pb-8">

          {/* ── Header ── */}
          <div className="text-center mb-7">
            <div className="text-4xl mb-2">📖</div>
            <h3 className={`text-2xl font-extrabold ${textBase}`}>Create Account</h3>
            <p className={`text-xs mt-1 ${textMuted}`}>
              Join <span className="text-pink-500 font-semibold">KitabGhar</span> and start your reading journey
            </p>
          </div>

          {/* ── Close Button ── */}
          <button
            type="button"
            onClick={() => navigate("/")}
            className={`absolute top-14 right-4 w-8 h-8 flex items-center justify-center rounded-full text-lg font-bold transition-all
              ${isDark
                ? "bg-slate-700 text-slate-400 hover:bg-red-500/20 hover:text-red-400"
                : "bg-base-200 text-base-content/50 hover:bg-red-100 hover:text-red-500"
              }`}
          >
            ×
          </button>

          <form onSubmit={handleSubmit(onSubmit)}>

            {/* Full Name */}
            <Field
              label="Full Name"
              name="fullname"
              placeholder="Ishwor Sharma"
              validation={{ required: "Full name is required" }}
              icon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              }
            />

            {/* Email */}
            <Field
              label="Email Address"
              name="email"
              type="email"
              placeholder="you@example.com"
              validation={{ required: "Email is required" }}
              icon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              }
            />

            {/* Password */}
            <Field
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Create a strong password"
              validation={{ required: "Password is required", minLength: { value: 6, message: "Min 6 characters" } }}
              icon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0110 0v4" />
                </svg>
              }
              rightSlot={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`transition-colors ${isDark ? "text-slate-400 hover:text-pink-400" : "text-base-content/40 hover:text-pink-500"}`}
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
              }
            />

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-xl font-bold text-sm tracking-widest uppercase text-white
                bg-pink-500 hover:bg-pink-600 transition-all duration-200 shadow-lg shadow-pink-500/30
                ${loading ? "opacity-60 cursor-not-allowed" : "hover:scale-[1.01] active:scale-[0.98]"}`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Creating account...
                </span>
              ) : "Sign Up →"}
            </button>
          </form>

          {/* ── Divider ── */}
          <div className="flex items-center gap-3 my-5">
            <div className={`flex-1 h-px ${isDark ? "bg-slate-600" : "bg-base-300"}`} />
            <span className={`text-xs ${isDark ? "text-slate-500" : "text-base-content/30"}`}>OR</span>
            <div className={`flex-1 h-px ${isDark ? "bg-slate-600" : "bg-base-300"}`} />
          </div>

          {/* ── Google Button ── */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={googleLoading}
            className={`w-full flex items-center justify-center gap-3 border py-3 rounded-xl text-sm font-semibold
              transition-all duration-200 hover:scale-[1.01] active:scale-[0.98]
              ${googleLoading ? "opacity-60 cursor-not-allowed" : ""}
              ${googleBtn}`}
          >
            {googleLoading ? (
              <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
            ) : (
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="google"
                className="w-5 h-5"
              />
            )}
            {googleLoading ? "Connecting..." : "Continue with Google"}
          </button>

          {/* ── Login redirect ── */}
          <p className={`text-center text-sm mt-6 ${textMuted}`}>
            Already have an account?{" "}
            <Link
              to="/"
              className="text-pink-500 font-semibold hover:text-pink-600 hover:underline underline-offset-2 transition-colors"
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;