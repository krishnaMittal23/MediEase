import React, { useContext, useEffect } from 'react'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'

const Dashboard = () => {

  const { aToken, getDashData, cancelAppointment, dashData } = useContext(AdminContext)
  const { slotDateFormat } = useContext(AppContext)

  useEffect(() => {
    if (aToken) {
      getDashData()
    }
  }, [aToken])

  return dashData && (
    <div className='m-5 mt-10'>

      {/* Overview Cards */}
      <div className='flex flex-wrap gap-5 mb-8'>
        {[
          { label: "Doctors", value: dashData.doctors, icon: assets.doctor_icon },
          { label: "Appointments", value: dashData.appointments, icon: assets.appointments_icon },
          { label: "Patients", value: dashData.patients, icon: assets.patients_icon }
        ].map((card, idx) => (
          <div
            key={idx}
            className='flex items-center gap-3 bg-gradient-to-br from-white/10 to-white/5 dark:from-gray-800 dark:to-gray-900 backdrop-blur-md shadow-lg p-5 rounded-2xl min-w-[200px] border border-gray-200 dark:border-gray-700 hover:scale-105 transition-transform cursor-pointer'
          >
            <img className='w-12' src={card.icon} alt={card.label} />
            <div>
              <p className='text-2xl font-bold text-gray-800 dark:text-gray-100'>{card.value}</p>
              <p className='text-gray-500 dark:text-gray-400'>{card.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Latest Bookings */}
      <div className='bg-gradient-to-br from-white/10 to-white/5 dark:from-gray-800 dark:to-gray-900 backdrop-blur-md rounded-2xl shadow-lg'>
        <div className='flex items-center gap-3 px-6 py-4 border-b border-gray-200 dark:border-gray-700'>
          <img src={assets.list_icon} alt="list" className='w-5 h-5' />
          <p className='font-semibold text-gray-700 dark:text-gray-200'>Latest Bookings</p>
        </div>

        <div className='divide-y divide-gray-200 dark:divide-gray-700'>
          {dashData.latestAppointments.slice(0, 5).map((item, index) => (
            <div
              key={index}
              className='flex items-center px-6 py-4 gap-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors'
            >
              <img className='rounded-full w-10 h-10 object-cover' src={item.docData.image} alt={item.docData.name} />
              <div className='flex-1 text-sm'>
                <p className='text-gray-800 dark:text-gray-100 font-medium'>{item.docData.name}</p>
                <p className='text-gray-600 dark:text-gray-400'>Booking on {slotDateFormat(item.slotDate)}</p>
              </div>
              {item.cancelled ? (
                <p className='text-red-400 text-xs font-medium'>Cancelled</p>
              ) : item.isCompleted ? (
                <p className='text-green-500 text-xs font-medium'>Completed</p>
              ) : (
                <button
                  onClick={() => cancelAppointment(item._id)}
                  className='focus:outline-none'
                >
                  <img
                    className='w-8 cursor-pointer opacity-80 hover:opacity-100 hover:scale-110 active:scale-95 transition-transform duration-200 ease-in-out'
                    src={assets.cancel_icon}
                    alt="Cancel"
                  />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default Dashboard
