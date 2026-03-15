import React from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import Login from "./Login";

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
    
    <div className="flex items-center justify-center mt-20">
    
  <div id="signup_modal" className="border-2 border-gray-300 rounded p-6 bg-white shadow">
  
  <div>
     
    <form method="dialog">
      {/* Close button */}
  <div className="relative">
  <button
    onClick={() => navigate("/")}
    className="absolute top-0 right-0 w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 hover:bg-red-400 hover:text-white text-lg font-bold"
  >
    ×
  </button>
</div>
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
<div>
  <h1 className="flex justify-center">or</h1>
    {/* Google Signup from firebase */}

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
        </button></div>

</div>

    </div>
  
    </>
   
  );
}

export default Signup;