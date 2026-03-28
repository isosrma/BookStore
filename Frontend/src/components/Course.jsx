import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react';
function Course() {
  const [book, setBook] = useState([]);


useEffect(() => {
  const getBook = async () => {
    try {
      const res = await axios.get("http://localhost:4001/book");
      console.log(res.data);
      setBook(res.data);
    } catch (error) {
      console.error("Error fetching book:", error);
    }
  };

  getBook();
}, []);
  return (
   <>
  <div className='max-w-screen-2xl container mx-auto md:px-20 px-4'>
    <div className='mt-28 items-center justify-center text-center ' >
      <h1 className='text-2xl  md:text-4xl' >We're delighted to have you 
        <span className='text-pink-500'>here!)</span>
      </h1>
      <p className='mt-12'> Welcome to <span className="font-semibold text-pink-500">KitabGhar</span>, your personal library in the cloud! 
          Explore countless books, discover new stories, and enjoy a world of knowledge at your fingertips. 
          Whether you're here to read, learn, or just wander through pages, we've got something special for you.
      </p>
    <Link to="/">
      <button className='bg-pink-500 cursor-pointer text-white px-4 py-2 rounded-md mt-6 hover:bg-pink-800  duration-300'>Back </button>
    </Link>
    </div>

    <div className=' m-auto  auto-fit  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6  '>
      
      {
        book.map((item)=>(
          <div className="card  bg-base-auto w-full h-auto shadow-sm  mt-8 m-auto hover:shadow-red-700 duration-300 transition-shadow hover:scale-105 duration-300 transition-transform">
  <figure>
    <img
      src= {item.image}
      alt={item.name} />  
  </figure>
  <div className="card-body">
    <h2 className="card-title">
      {item.name}
      {item.category === "Free" && (
              <div className="badge badge-secondary">FREE</div>
            )}
            </h2>

      <div className="badge badge-secondary">NEW</div>
  
    <p>{item.title}</p>
   <div className="card-actions justify-end">
      <div className="badge badge-outline">${item.price}</div>
      <div className="badge badge-outline text-black-500  cursor-pointer  hover:bg-red-500 duration-500 hover:text-white hover:rounded-2xl hover:px-4 hover:py-2 duration -200 ">Buy Now</div>
    </div>
  </div>
</div>
        )
        )
      }
      
    </div>


  </div>
   </>
  )
}

export default Course