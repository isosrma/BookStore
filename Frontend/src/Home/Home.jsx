import React from 'react'
import Navbar from '../components/Navbar'
import Freebook from '../components/FreeBook'
import Banner from '../components/Banner'
import Footer from '../components/Footer'


function Home() {
  return (
   <>
      <Navbar />
      <Banner />
      <Freebook />
      <Footer />
   </>
  )
}

export default Home