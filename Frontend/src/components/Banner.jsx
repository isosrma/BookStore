import React from 'react'
import banner from '../assets/banner.jpg'

function Banner() {
  return (
    <>
      <div className="max-w-screen-2xl container mx-auto px-4 sm:px-8 md:px-20 flex flex-col-reverse md:flex-row items-center ">
        
        {/* Text Section */}
        <div className=" w-full md:w-1/2 mt-10  md:mt-32 text-center md:text-left">
          <div className="space-y-8">
            
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
              Hello, welcome to bookstore to learn something{" "}
              <span className="text-pink-500">every minute!!!</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl">
              Welcome to a KitabGhar built for curious minds and ambitious thinkers. 
              From timeless classics to cutting-edge reads, we curate books that challenge 
              perspectives, spark creativity, and fuel growth. Whether you’re a student, 
              a professional, or a lifelong learner, this is where stories meet strategy 
              and knowledge turns into power.
            </p>

            {/* Email Subscribe Section */}
            <div className="join w-full sm:w-auto justify-center md:justify-start">
              <div className="w-full">
                <label className="input validator join-item w-full">
                  <svg
                    className="h-[1em] opacity-50"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <g
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2.5"
                      fill="none"
                      stroke="currentColor"
                    >
                      <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                    </g>
                  </svg>
                  <input
                    type="email"
                    placeholder="mail@site.com"
                    required
                    className="w-full"
                  />
                </label>
                <div className="validator-hint hidden">
                  Enter valid email address
                </div>
              </div>

              <button className="btn btn-neutral join-item">
                Subscribe
              </button>
            </div>

          </div>
        </div>

        {/* Image Section */}
        <div className="w-full md:w-1/2 mt-8 md:mt-0">
          <img
            src={banner}
            alt="Banner"
            className="w-full h-auto object-cover md:ml-5 rounded-lg"
          />
        </div>

        
      </div>
      <div>
     </div>


      
    </>
  )
}

export default Banner