import React from 'react'

function Login() {
  return (
   <>
   <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 space-y-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 text-center">
          Welcome Back
        </h2>
        <p className="text-center text-gray-500 dark:text-gray-300">
          Sign in to your account
        </p>

        {/* Email & Password */}
        <form className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 dark:text-gray-200 font-medium mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="you@example.com"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 dark:text-gray-200 font-medium mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Sign In
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center justify-center space-x-2">
          <span className="border-b w-1/5 border-gray-300 dark:border-gray-600"></span>
          <span className="text-gray-500 dark:text-gray-300 text-sm">OR</span>
          <span className="border-b w-1/5 border-gray-300 dark:border-gray-600"></span>
        </div>

        {/* Google Sign-In */}
        <button
          className="w-full flex items-center justify-center border border-gray-300 dark:border-gray-600 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors font-medium"
        >
          <FcGoogle className="mr-2 text-lg" />
          Sign in with Google
        </button>

        {/* Footer */}
        <p className="text-center text-gray-500 dark:text-gray-300 text-sm">
          Don't have an account?{" "}
          <a
            href="#"
            className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
          >
            Sign Up
          </a>
        </p>
      </div>
    </div>
   </>
  )
}

export default Login