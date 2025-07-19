import React, { useContext } from 'react'
import Login from './pages/Login';
  import { ToastContainer, toast } from 'react-toastify';
import { AdminContext } from './context/AdminContext';
import Navbar from './components/NavBar';
import Sidebar from './components/Sidebar';
import { Route, Routes } from 'react-router';
import Dashboard from './pages/Admin/Dashboard';
import AllAppointments from './pages/Admin/AllAppointments';
import AddDoctor from './pages/Admin/AddDoctor';
import Doctorslist from './pages/Admin/Doctorslist';
import { DoctorContext } from './context/DoctorContext';
import DoctorDashboard from './pages/Doctor/DoctorDashboard';
import DoctorAppointments from './pages/Doctor/doctorAppointments';
import DoctorProfile from './pages/Doctor/DoctorProfile';



const App = () => {

  const {aToken} = useContext(AdminContext);
  const {dToken} = useContext(DoctorContext)

  return aToken  || dToken ? (
    <div className='flex flex-co bg-dotted min-h-screen'>

    <div className='flex-grow'>
      <ToastContainer />
      <Navbar/>
      <div className='flex items-start'>
        <Sidebar/>
        <Routes>
          {/* admin routes */}
          <Route path='/' element={<></>}/>
          <Route path='/admin-dashboard' element={<Dashboard/>}/>
          <Route path='/all-appointments' element={<AllAppointments/>}/>
          <Route path='/add-doctor' element={<AddDoctor/>}/>
          <Route path='/doctor-list' element={<Doctorslist/>}/>

          {/* doctor routes */}
          <Route path='/doctor-dashboard' element={<DoctorDashboard/>}/>
          <Route path='/doctor-appointments' element={<DoctorAppointments/>}/>
          <Route path='/doctor-profile' element={<DoctorProfile/>}/>
        </Routes>
      </div>
    </div>
    </div>
  ) : (
    <div className='flex flex-co bg-dotted min-h-screen'>

    <div className='flex-grow'>
      
       <Login/>
      <ToastContainer />
    </div>
    </div>
  )
}

export default App