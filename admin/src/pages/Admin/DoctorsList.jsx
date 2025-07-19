import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'

const DoctorsList = () => {

  const { doctors , aToken , getAllDoctors, changeAvailability} = useContext(AdminContext)

  useEffect(() => {
    if (aToken) {
        getAllDoctors()
    }
}, [aToken])

  return (
    <div className='m-5 max-h-[90vh] overflow-y-scroll'>
      
      <div className='w-full flex flex-wrap gap-4 pt-5 gap-y-6'>
        {doctors.map((item, index) => (
          <div className='border border-gray-700 rounded-xl max-w-56 overflow-hidden cursor-pointer group bg-gray-900/70' key={index}>
            <img className='bg-[#EAEFFF] group-hover:bg-gray-800 transition-all duration-500 h-[60%] object-cover w-full' src={item.image} alt="" />
            <div className='p-4'>
              <p className='text-gray-400 text-lg font-medium'>{item.name}</p>
              <p className='text-gray-400 text-sm'>{item.speciality}</p>
              <div className='mt-2 flex items-center gap-1 text-sm'>
                <input onChange={()=>changeAvailability(item._id)} type="checkbox" checked={item.available} />
                <p className='text-gray-400'>Available</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DoctorsList