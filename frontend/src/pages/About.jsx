import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

const About = () => {
  return (
    <div className='text-gray-200'>

      {/* About Heading */}
      <div className='text-center text-3xl font-semibold pt-10'>
        <p>ABOUT <span className='text-primary'>US</span></p>
      </div>

      {/* About Section */}
      <div className='my-16 flex flex-col md:flex-row gap-12 items-center md:items-start px-4 sm:px-10'>
        <img
          className='w-full md:max-w-xs rounded-xl shadow-lg shadow-black/40'
          src={assets.about_image}
          alt="About MediEase"
        />

        <div className='flex flex-col justify-center gap-6 md:w-3/5 text-sm text-gray-300'>
          <p>Welcome to <span className='text-primary font-medium'>MediEase</span>, your trusted partner in managing healthcare needs conveniently and efficiently. At MediEase, we understand the challenges individuals face when scheduling appointments and managing health records.</p>
          <p>MediEase is committed to excellence in healthcare technology. We continuously enhance our platform with the latest advancements to improve your experience and deliver superior service. Whether you're booking your first appointment or managing ongoing care, MediEase supports you every step of the way.</p>

          <b className='text-lg text-primary'>Our Vision</b>
          <p>Our vision is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and providers, making it easier to access care whenever you need it.</p>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className='text-center text-2xl font-semibold mb-8'>
        <p>WHY <span className='text-primary'>CHOOSE US</span></p>
      </div>

      <div className='flex flex-col md:flex-row gap-6 md:gap-8 px-4 sm:px-10 mb-20'>

        {[
          {
            title: "EFFICIENCY",
            desc: "Streamlined appointment scheduling that fits your busy lifestyle."
          },
          {
            title: "CONVENIENCE",
            desc: "Access to a network of trusted healthcare professionals in your area."
          },
          {
            title: "PERSONALIZATION",
            desc: "Tailored recommendations and reminders to keep you on top of your health."
          }
        ].map((item, index) => (
          <div
            key={index}
            className='flex-1 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/10 rounded-xl px-8 md:px-10 py-10 flex flex-col gap-4 text-gray-300 hover:bg-primary/80 hover:text-white transition-all duration-300 cursor-pointer shadow-lg shadow-black/30'
          >
            <b className='text-lg'>{item.title}</b>
            <p className='text-sm'>{item.desc}</p>
          </div>
        ))}

      </div>

    </div>
  )
}

export default About
