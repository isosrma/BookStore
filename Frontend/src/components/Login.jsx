import React from 'react'
import { Link } from 'react-router-dom'

function Login() {
  return (
   <>
  <dialog id="my_modal_3" className="modal">
  <div className="modal-box">
    <form method="dialog">
      {/* if there is a button in form, it will close the modal */}
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    </form>
    <h3 className="font-bold text-lg">Login</h3>
    <div className='mt-4 space-y-2'>
      <span>Email</span>
      <br />
      <input type="email" placeholder='Enter your email' className='w-80 px-3 py-2 outline-none border rounded-md  ' />
    </div>
    <div className='mt-4 space-y-2'>
      <span>Password</span>
      <br />
      <input type="password" placeholder='Enter your password' className='w-80 px-3 py-2 outline-none border rounded-md  '/>
    </div>
   <div className='flex justify-between'>
     <button className='btn  bg-pink-400 mt-4 rounded text-white hover:bg-pink-600 transition duration-200'>Login</button>
    <p className='mt-5'>Not registered?
       <Link to="/signup" className="text-blue-500 hover:underline">SignUp</Link>
        </p>
   </div>
  </div>
</dialog>
   </>
  )
}

export default Login