import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

const Footer = () => {
  return (
    <div className=' bg-gray-900 text-gray-300 w-full mt-30'>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10   text-sm px-6 '>

        <div>
          <img className='mb-5 w-40' src={assets.text} alt="Logo" />
          <p className='w-full md:w-2/3 leading-6 text-gray-400'>
            MediEase is your trusted healthcare partner, making doctor appointments easy, reliable, and secure. We ensure your health is always a priority with our seamless booking system and expert medical network.
          </p>
        </div>

        <div>
          <p className='text-xl font-semibold mb-5 text-primary'>COMPANY</p>
          <ul className='flex flex-col gap-2 text-gray-400'>
            <li className='hover:text-primary cursor-pointer'>Home</li>
            <li className='hover:text-primary cursor-pointer'>About us</li>
            <li className='hover:text-primary cursor-pointer'>Delivery</li>
            <li className='hover:text-primary cursor-pointer'>Privacy policy</li>
          </ul>
        </div>

        <div>
          <p className='text-xl font-semibold mb-5 text-primary'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-2 text-gray-400'>
            <li className='hover:text-primary cursor-pointer'>+91-8468938745</li>
            <li className='hover:text-primary cursor-pointer'>krimit@gmail.com</li>
          </ul>
        </div>

      </div>

      <div>
        <hr className='border-gray-700'/>
        <p className='py-5 text-sm text-center text-gray-500'>Copyright 2024 @ MediEase.com - All Right Reserved.</p>
      </div>

    </div>
  )
}

export default Footer
