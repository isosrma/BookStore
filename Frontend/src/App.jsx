import React from 'react'
import Home from './Home/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Contact from './components/Contact';
import About from './components/About';
import Courses from './courses/Courses';
function App() {
  return (
    <>
   <div className='dark:bg-slate-500 dark:bg-text-white'>
       <Routes>
        <Route path="/"
         element={<Home />} />

        <Route path="/course"
         element={<Courses />} />

       <Route path="/contact"
         element={<Contact />} />
         
          <Route path="/about"
         element={<About />} />
      </Routes>
     </div>
  
  
    </>
  );
}

export default App