import React from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";
import { Link, useNavigate } from "react-router-dom";

function Signup() {

  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);

      console.log(result.user);

      alert(`Welcome ${result.user.displayName}`);

      // redirect after signup
      navigate("/#home");

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
    {/* signup using gmail */}
    
<div id="signup_modal" className="modal">
  <div className="modal-box">
    <form method="dialog">
      {/* Close button */}
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    </form>

    <h3 className="font-bold text-lg">Sign Up</h3>

    <div className="mt-4 space-y-2">
      <span>Full Name</span>
      <br />
      <input
        type="text"
        placeholder="Enter your full name"
        className="w-80 px-3 py-2 outline-none border rounded-md"
      />
    </div>

    <div className="mt-4 space-y-2">
      <span>Email</span>
      <br />
      <input
        type="email"
        placeholder="Enter your email"
        className="w-80 px-3 py-2 outline-none border rounded-md"
      />
    </div>

    <div className="mt-4 space-y-2">
      <span>Password</span>
      <br />
      <input
        type="password"
        placeholder="Enter your password"
        className="w-80 px-3 py-2 outline-none border rounded-md"
      />
    </div>

    <div className="mt-4 flex flex-col gap-3">
      {/* Signup Button */}
      <button className="btn bg-green-400 rounded text-white hover:bg-green-600 transition duration-200">
        Sign Up
      </button>
      
    </div>

    <p className="mt-5 text-center">
      Already have an account?{" "}
      <Link to="/" className="text-blue-500 hover:underline">
        Login
      </Link>
    </p>
  </div>
</div>

    {/* Google Signup from firebase */}
    <div>
        <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-xl shadow-lg w-96">

        <h2 className="text-2xl font-bold text-center mb-6">
          Sign Up
        </h2>

        <button
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