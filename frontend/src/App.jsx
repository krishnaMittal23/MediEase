import React from 'react'
import { Route, Routes } from 'react-router'
import Home from './pages/Home';
import Doctors from './pages/Doctors';
import Login from './pages/Login';
import About from './pages/About';
import Contact from './pages/Contact';
import Myprofile from './pages/Myprofile';
import MyAppointments from './pages/MyAppointments';
import Appointment from './pages/Appointment';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const App = () => {
  return (
    <div className="min-h-screen bg-dotted text-gray-200 flex flex-col">
      <div className='flex-grow mx-[8%]'>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/doctors' element={<Doctors/>}/>
          <Route path='/doctors/:speciality' element={<Doctors/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/contact' element={<Contact/>}/>
          <Route path='/my-profile' element={<Myprofile/>}/>
          <Route path='/my-appointments' element={<MyAppointments/>}/>
          <Route path='/appointment/:docId' element={<Appointment/>}/>
        </Routes>
        
        
      </div>
      <Footer/>
    </div>
  )
}

export default App
