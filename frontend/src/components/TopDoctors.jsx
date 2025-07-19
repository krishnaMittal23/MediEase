import React, { useContext } from 'react'
import { useNavigate } from 'react-router'
import { AppContext } from '../context/AppContext'

const TopDoctors = () => {

    const navigate = useNavigate()

    const { doctors } = useContext(AppContext)

    return (
        <div className='flex flex-col items-center gap-4 my-16 md:mx-10 relative  rounded-lg py-10 px-4 '>


            <h1 className='text-3xl font-medium text-white relative z-10'>Top Doctors to Book</h1>
            <p className='sm:w-1/3 text-center text-sm text-gray-300 relative z-10'>Simply browse through our extensive list of trusted doctors.</p>

            <div className='w-full grid grid-cols-4 gap-4 pt-5 gap-y-6 px-3 sm:px-0 '>
                {doctors.slice(0, 8).map((item, index) => (
                    <div
                        onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }}
                        className='bg-gray-800 rounded-xl overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300 shadow-md'
                        key={index}
                    >
                        <img className='bg-blue-50 h-[60%] object-cover w-full' src={item.image} alt={item.name} />
                        <div className='p-4'>
                            <div className={`flex items-center gap-2 text-sm ${item.available ? 'text-green-400' : "text-gray-500"}`}>
                                <p className={`w-2 h-2 rounded-full ${item.available ? 'bg-green-400' : "bg-gray-500"}`}></p>
                                <p>{item.available ? 'Available' : "Not Available"}</p>
                            </div>
                            <p className='text-white text-lg font-medium mt-1'>{item.name}</p>
                            <p className='text-gray-400 text-sm'>{item.speciality}</p>
                        </div>
                    </div>
                ))}
            </div>

            <button
                onClick={() => { navigate('/doctors'); scrollTo(0, 0) }}
                className='bg-primary text-white px-12 py-3 rounded-full mt-10 relative z-10 hover:bg-indigo-800 transition-colors cursor-pointer'
            >
                More
            </button>
        </div>
    )
}

export default TopDoctors
