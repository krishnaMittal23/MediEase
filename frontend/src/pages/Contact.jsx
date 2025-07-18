import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

const Contact = () => {
  return (
    <div className='text-gray-200'>

      {/* Heading */}
      <div className='text-center text-3xl font-semibold pt-10'>
        <p>CONTACT <span className='text-primary'>US</span></p>
      </div>

      {/* Content */}
      <div className='my-16 flex flex-col md:flex-row gap-10 mb-28 px-4 sm:px-10'>

        {/* Image */}
        <img
          className='w-full md:max-w-xs rounded-xl shadow-lg shadow-black/40 object-cover'
          src={assets.contact_image}
          alt="Contact Us"
        />

        {/* Info Card */}
        <div className='flex flex-col justify-center gap-6 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/10 rounded-xl p-8 md:w-2/3 shadow-lg shadow-black/30'>

          <div>
            <p className='font-semibold text-lg text-primary'>OUR OFFICE</p>
            <p className='text-gray-300 mt-1'> MNNIT Allahabad<br /> Prayagraj, M.P</p>
          </div>

          <div>
            <p className='text-gray-300'>Tel: (91) 9999999999 <br /> Email: krimit2306@gmail.com</p>
          </div>

          <div>
            <p className='font-semibold text-lg text-primary'>CAREERS AT PRESCRIPTO</p>
            <p className='text-gray-300 mt-1'>Learn more about our teams and job openings.</p>
          </div>

          <button className='bg-primary text-white px-8 py-3 rounded-full text-sm hover:scale-105 transition-all duration-300'>Explore Jobs</button>

        </div>

      </div>

    </div>
  )
}

export default Contact
