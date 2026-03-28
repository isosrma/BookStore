import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Course from '../components/Course'


import { useEffect } from 'react'
function Courses() {

  return (
   <>
   <Navbar />
<div className='dark:bg-slate-500 dark:text-white'>
    <Course />
  </div>
   <Footer />
   </>
  )
}

export default Courses