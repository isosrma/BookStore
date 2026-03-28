import React from 'react'
import Home from './Home/Home'
import { Routes, Route, Navigate } from 'react-router-dom';
import Contact from './components/Contact';
import About from './components/About';
import Courses from './courses/Courses';
import Signup from './components/Signup';
import {Toaster} from 'react-hot-toast'
import { useAuth } from './context/AuthProvider';
function App() {
    const [authUser, setAuthUser] = useAuth();
  return (
    <>
   <div className='dark:bg-slate-500 dark:bg-text-white'>
       <Routes>
        <Route path="/"
         element={<Home />} />

        <Route path="/course"
         element={authUser ? <Courses /> : <Navigate to="/signup" />} />

       <Route path="/contact"
         element={<Contact />} />
         
          <Route path="/about"
         element={<About />} />

          <Route path="/signup"
         element={<Signup />} />
      </Routes>
       <Toaster />
     </div>
  
  
    </>
  );
}

export default App