import React from 'react'
import Home from './Home/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Contact from './components/Contact';
import About from './components/About';
import Courses from './courses/Courses';
function App() {
  return (
    <>

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
  
    </>
  );
}

export default App