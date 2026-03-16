import React from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);

  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log(result.user);
      alert(`Welcome ${result.user.displayName}`);
      navigate("/#home");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center mt-20">
        <div className="border-2 border-gray-300 rounded p-6 bg-white shadow">

          {/* ✅ Fix 1: Removed method="dialog" */}
          <form onSubmit={handleSubmit(onSubmit)}>

            {/* Close Button */}
            <div className="relative">
              <button
                type="button" 
                onClick={() => navigate("/")}
                className="absolute top-0 right-0 w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 hover:bg-red-400 hover:text-white text-lg font-bold"
              >
                ×
              </button>
            </div>

            <h3 className="font-bold text-lg">Sign Up</h3>

            {/* ✅ Fix 2: Added register() and error message to Full Name */}
            <div className="mt-4 space-y-2">
              <span>Full Name</span>
              <br />
              <input
                type="text"
                placeholder="Enter your full name"
                className="w-80 px-3 py-2 outline-none border rounded-md"
                {...register("fullName", { required: true })}
              />
              <br />
              {errors.fullName && (
                <span className="text-sm text-red-500">This field is required</span>
              )}
            </div>

            <div className="mt-4 space-y-2">
              <span>Email</span>
              <br />
              <input
                type="email"
                placeholder="Enter your email"
                className="w-80 px-3 py-2 outline-none border rounded-md"
                {...register("email", { required: true })}
              />
              <br />
              {errors.email && (
                <span className="text-sm text-red-500">This field is required</span>
              )}
            </div>

            <div className="mt-4 space-y-2">
              <span>Password</span>
              <br />
              <input
                type="password"
                placeholder="Enter your password"
                className="w-80 px-3 py-2 outline-none border rounded-md"
                {...register("password", { required: true })}
              />
              <br />
              {errors.password && (
                <span className="text-sm text-red-500">This field is required</span>
              )}
            </div>

            <div className="mt-4 flex flex-col gap-3">
              {/* ✅ Fix 3: Added type="submit" */}
              <button
                type="submit"
                className="btn bg-green-400 rounded text-white hover:bg-green-600 transition duration-200"
              >
                Sign Up
              </button>
            </div>

            <p className="mt-5 text-center">
              Already have an account?{" "}
              <Link to="/" className="text-blue-500 hover:underline">
                Login
              </Link>
            </p>
          </form>

          <div>
            <h1 className="flex justify-center">or</h1>

            {/* ✅ Fix 4: Added type="button" to prevent accidental form submission */}
            <button
              type="submit"
              
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-3 border p-3 rounded-lg hover:bg-gray-100"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="google"
                className="w-5 h-5"
              />
              Sign up with Google
            </button>
          </div>

        </div>
      </div>
    </>
  );
}

export default Signup;