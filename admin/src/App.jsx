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



const App = () => {

  const {aToken} = useContext(AdminContext);

  return aToken ?  (
    <div className='flex flex-co bg-dotted min-h-screen'>

    <div className='flex-grow'>
      <ToastContainer />
      <Navbar/>
      <div className='flex items-start'>
        <Sidebar/>
        <Routes>
          <Route path='/' element={<></>}/>
          <Route path='/admin-dashboard' element={<Dashboard/>}/>
          <Route path='/all-appointments' element={<AllAppointments/>}/>
          <Route path='/add-doctor' element={<AddDoctor/>}/>
          <Route path='/doctor-list' element={<Doctorslist/>}/>
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