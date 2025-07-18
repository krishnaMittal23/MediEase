import React from 'react'
import { Link } from 'react-router'
import { specialityData } from '../assets/assets_frontend/assets'

const SpecialityMenu = () => {
  return (
    <div 
      id='speciality' 
      className='flex flex-col items-center gap-6 py-16 mt-7 
                 bg-gray-900 bg-dots-pattern text-gray-200 rounded-lg shadow-lg'
      style={{
        backgroundImage: `radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)`,
        backgroundSize: '20px 20px',
      }}
    >
      <h1 className='text-3xl font-semibold'>Find by Speciality</h1>
      <p className='sm:w-1/3 text-center text-sm text-gray-300'>
        Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.
      </p>

      <div className='flex sm:justify-center gap-6 pt-5 w-full overflow-x-auto scrollbar-thin scrollbar-thumb-primary scrollbar-track-gray-800 px-4'>
        {specialityData.map((item, index) => (
          <Link 
            to={`/doctors/${item.speciality}`} 
            onClick={() => scrollTo(0, 0)} 
            className='flex flex-col items-center text-xs cursor-pointer flex-shrink-0 
                       hover:-translate-y-2 transition-transform duration-400'
            key={index}
          >
            <img 
              className='w-16 sm:w-24 mb-2 rounded-full border-2 border-primary shadow-md' 
              src={item.image} 
              alt={item.speciality} 
            />
            <p className='text-primary font-medium'>{item.speciality}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default SpecialityMenu
