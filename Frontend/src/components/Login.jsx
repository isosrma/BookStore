import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from "react-hook-form"
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'


function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

const onSubmit = async (data) => {
  const userInfo = {
    email: data.email,
    password: data.password,
  };

  try {
    const res = await axios.post("http://localhost:4001/user/login", userInfo);
    if (res.data) {
      localStorage.setItem("Users", JSON.stringify(res.data.user));
      toast.success("Successfully logged in!");
      navigate("/");
    }
  } catch (error) {
    if (error.response) {
      console.log(error.response.data);
      toast.error(`Login failed: ${error.response.data.message}`);
    } else {
      console.error("Error during login:", error);
      toast.error("Login failed. Please try again.");
    }
  }
};

  return (
    <>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">

          {/* Close button — standalone, outside the form */}
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={() => document.getElementById('my_modal_3').close()}
          >
            ✕
          </button>

          <h3 className="font-bold text-lg">Login</h3>

          {/* Single form wrapping all inputs + submit */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='mt-4 space-y-2'>
              <span>Email</span>
              <br />
              <input
                type="email"
                placeholder='Enter your email'
                className='w-80 px-3 py-2 outline-none border rounded-md'
                {...register("email", { required: true })}
              />
              <br />
              {errors.email && (
                <span className='text-sm text-red-500'>This field is required</span>
              )}
            </div>

            <div className='mt-4 space-y-2'>
              <span>Password</span>
              <br />
              <input
                type="password"
                placeholder='Enter your password'
                className='w-80 px-3 py-2 outline-none border rounded-md'
                {...register("password", { required: true })}
              />
              <br />
              {errors.password && (
                <span className='text-sm text-red-500'>This field is required</span>
              )}
            </div>

            <div className='flex justify-between'>
              <button
                type='submit'
                className='btn bg-pink-400 mt-4 rounded text-white hover:bg-pink-600 transition duration-200'
              >
                Login
              </button>
              <p className='mt-5'>
                Not registered?{' '}
                <Link to="/signup" className="text-blue-500 hover:underline">SignUp</Link>
              </p>
            </div>
          </form>

        </div>
      </dialog>
    </>
  )
}

export default Login