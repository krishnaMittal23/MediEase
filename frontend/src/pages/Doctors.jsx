import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate, useParams } from 'react-router'

const Doctors = () => {

  const { speciality } = useParams();
  const [filterDoc, setFilterDoc] = useState([])
  const [showFilter, setShowFilter] = useState(false)
  const navigate = useNavigate();

  const { doctors } = useContext(AppContext)

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality))
    } else {
      setFilterDoc(doctors)
    }
  }

  useEffect(() => {
    applyFilter()
  }, [doctors, speciality])

  const specialities = [
    "General physician",
    "Gynecologist",
    "Dermatologist",
    "Pediatricians",
    "Neurologist",
    "Gastroenterologist"
  ]

  return (
    <div className='mt-10 overflow-hidden'>
      <p className='text-gray-400 text-center mb-8'>Browse through the specialist doctors below and book your appointment easily.</p>

      <div className='flex flex-col md:flex-row items-start gap-5'>

        {/* Filters button for mobile */}
        <button
          onClick={() => setShowFilter(!showFilter)}
          className={`py-2 px-4 border border-gray-700 rounded text-sm bg-gray-800 text-gray-300 hover:bg-gray-700 transition-all md:hidden`}
        >
          {showFilter ? "Hide Filters" : "Show Filters"}
        </button>

        {/* Filters section */}
        <div className={` flex-col gap-3 text-sm ${showFilter ? 'flex' : 'hidden md:flex'} bg-gray-800 rounded-lg p-4`}>
          {specialities.map((spec, idx) => (
            <p
              key={idx}
              onClick={() => speciality === spec ? navigate('/doctors') : navigate(`/doctors/${spec}`)}
              className={`border-b border-gray-600 pl-3 pr-10 py-2 rounded cursor-pointer transition-all text-gray-300 hover:bg-primary hover:text-white ${speciality === spec ? 'bg-primary text-white' : ''}`}
            >
              {spec}
            </p>
          ))}
        </div>

        {/* Doctors grid */}
        <div className='w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5'>
          {filterDoc.map((item, index) => (
            <div
              key={index}
              onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }}
              className='bg-gray-800 rounded-xl overflow-hidden cursor-pointer hover:scale-[1.03] transition-all duration-300 shadow-md hover:shadow-lg'
            >
              <img className='w-full h-48 object-contain bg-gray-700' src={item.image} alt="" />
              <div className='p-4'>
                <div className={`flex items-center gap-2 text-sm ${item.available ? 'text-green-400' : "text-gray-500"}`}>
                  <span className={`w-2 h-2 rounded-full ${item.available ? 'bg-green-400' : "bg-gray-500"}`}></span>
                  <span>{item.available ? 'Available' : "Not Available"}</span>
                </div>
                <p className='text-white text-lg font-medium mt-2'>{item.name}</p>
                <p className='text-gray-400 text-sm'>{item.speciality}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default Doctors
