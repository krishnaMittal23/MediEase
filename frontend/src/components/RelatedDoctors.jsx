import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { AppContext } from '../context/AppContext'

const RelatedDoctors = ({ speciality, docId }) => {

  const navigate = useNavigate()
  const { doctors } = useContext(AppContext)

  const [relDoc, setRelDoc] = useState([])

  useEffect(() => {
    if (doctors.length > 0 && speciality) {
      const doctorsData = doctors.filter((doc) => doc.speciality === speciality && doc._id !== docId)
      setRelDoc(doctorsData)
    }
  }, [doctors, speciality, docId])

  return (
    <div className='flex flex-col items-center gap-4 my-16 text-gray-200'>
      <h1 className='text-3xl font-semibold'>Related Doctors</h1>
      <p className='sm:w-1/3 text-center text-sm text-gray-400'>Browse through trusted doctors related to your needs.</p>

      <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-5 px-3 sm:px-0'>
        {relDoc.length > 0 ? relDoc.map((item, index) => (
          <div
            onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }}
            key={index}
            className='bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-xl overflow-hidden cursor-pointer hover:scale-105 transform transition-all duration-300 shadow-lg shadow-black/40 mx-5 w-[280px] border border-white/10'
          >
            <img className='w-full h-48 object-contain bg-white/10' src={item.image} alt={item.name} />
            <div className='p-4'>
              <div className={`flex items-center gap-2 text-sm ${item.available ? 'text-green-400' : "text-gray-500"}`}>
                <span className={`w-2 h-2 rounded-full ${item.available ? 'bg-green-400' : "bg-gray-500"}`}></span>
                <p>{item.available ? 'Available' : "Not Available"}</p>
              </div>
              <p className='text-lg font-medium mt-1'>{item.name}</p>
              <p className='text-gray-400 text-sm'>{item.speciality}</p>
            </div>
          </div>
        )) : (
          <p className='text-gray-400 text-center col-span-full'>No related doctors found.</p>
        )}
      </div>

    </div>
  )
}

export default RelatedDoctors
