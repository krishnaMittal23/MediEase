import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets_frontend/assets'
import RelatedDoctors from '../components/RelatedDoctors'
import {toast} from "react-toastify"
import axios from 'axios'

const Appointment = () => {

  const { docId } = useParams()
  const { doctors, currencySymbol,backendUrl,token,getDoctorsData } = useContext(AppContext)
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

  const [docInfo, setDocInfo] = useState(null)
  const [docSlots, setDocSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState('')

  const navigate = useNavigate()

  const fetchDocInfo = () => {
    const doc = doctors.find((d) => d._id === docId)
    setDocInfo(doc)
  }

  const getAvailableSolts = () => {
    setDocSlots([])

    let today = new Date()
    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today)
      currentDate.setDate(today.getDate() + i)

      let endTime = new Date()
      endTime.setDate(today.getDate() + i)
      endTime.setHours(22, 0, 0, 0)

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
      } else {
        currentDate.setHours(10)
        currentDate.setMinutes(0)
      }

      let timeSlots = []

      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

        let day = currentDate.getDate()
        let month = currentDate.getMonth()+1
        let year = currentDate.getFullYear()

        const slotDate = day+"_"+month+"_"+year;
        const slotTime = formattedTime

        const isSlotAvailable = docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(slotTime) ? false : true

        if(isSlotAvailable){
          timeSlots.push({
          datetime: new Date(currentDate),
          time: formattedTime
        })
        }
        

        currentDate.setMinutes(currentDate.getMinutes() + 30)
      }

      setDocSlots(prev => ([...prev, timeSlots]))
    }
  }

  const bookAppointment = async()=>{
    if(!token){
      toast.warn('Login to book appointment')
      return navigate('/login')
    }
    try {
      const date = docSlots[slotIndex][0].datetime;

      let day = date.getDate()
      let month = date.getMonth()+1;
      let year = date.getFullYear()

      const slotDate = day+"_"+month+"_"+year

      const {data} = await axios.post(backendUrl+'/api/user/book-appointment', {docId,slotDate,slotTime}, {headers: {token}})
      if(data.success){
        toast.success(data.message)
        getDoctorsData()
        navigate('/my-appointments')
      }
      else{
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (doctors.length > 0) fetchDocInfo()
  }, [doctors, docId])

  useEffect(() => {
    if (docInfo) getAvailableSolts()
  }, [docInfo])

  return docInfo ? (
    <div className='text-gray-200'>

      {/* Doctor Details */}
      <div className='flex flex-col sm:flex-row gap-6 mb-10 mx-40'>
        <img className='bg-gray-800 w-full sm:max-w-72 rounded-xl shadow-lg shadow-black/40' src={docInfo.image} alt={docInfo.name} />

        <div className='flex-1 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6'>
          <div className='flex items-center gap-2 text-3xl font-semibold'>
            {docInfo.name}
            <img className='w-5' src={assets.verified_icon} alt="verified" />
          </div>
          <div className='flex items-center gap-2 mt-1 text-gray-400'>
            <p>{docInfo.degree} - {docInfo.speciality}</p>
            <span className='py-0.5 px-2 border border-gray-600 text-xs rounded-full'>{docInfo.experience}</span>
          </div>

          <div className='mt-4'>
            <p className='flex items-center gap-1 text-sm font-medium text-gray-300'>
              About <img className='w-3' src={assets.info_icon} alt="info" />
            </p>
            <p className='text-sm text-gray-400 mt-1'>{docInfo.about}</p>
          </div>

          <p className='text-gray-300 font-medium mt-4'>
            Appointment fee: <span className='text-white'>{currencySymbol}{docInfo.fees}</span>
          </p>
        </div>
      </div>

      {/* Booking slots */}
      <div className='font-medium  gap-5 ml-120'>
        <p className='text-lg mb-3 border border-gray-500 p-1 rounded-lg bg-gray-500 max-w-[115px] opacity-50'>Booking slots</p>

        <div className='flex gap-3 overflow-x-auto py-2 '>
          {docSlots.length > 0 ? docSlots.map((item, index) => (
            item.length > 0 ? (
              <div
                onClick={() => setSlotIndex(index)}
                key={index}
                className={`min-w-16 text-center py-4 rounded-full cursor-pointer transition-all
                ${slotIndex === index ? 'bg-primary text-white' : 'bg-white/10 backdrop-blur-md border border-white/10 text-gray-300 hover:bg-primary hover:text-white'}`}>
                <p>{daysOfWeek[item[0].datetime.getDay()]}</p>
                <p>{item[0].datetime.getDate()}</p>
              </div>
            ) : null
          )) : (
            <p className='text-gray-400'>No slots available</p>
          )}
        </div>

        <div className='flex gap-3 overflow-x-auto mt-4 max-w-[800px]'>
          {docSlots[slotIndex]?.length > 0 ? docSlots[slotIndex].map((item, index) => (
            <p
              onClick={() => setSlotTime(item.time)}
              key={index}
              className={`text-sm px-5 py-2 rounded-full cursor-pointer transition-all flex-shrink-0
              ${item.time === slotTime ? 'bg-primary text-white' : 'bg-white/10 backdrop-blur-md border border-white/10 text-gray-300 hover:bg-primary hover:text-white'}`}>
              {item.time.toLowerCase()}
            </p>
          )) : (
            <p className='text-gray-400'>No times available</p>
          )}
        </div>

        <button onClick={bookAppointment}
          className='bg-primary text-white text-sm px-8 py-3 rounded-full mt-6 hover:scale-105 transition-all cursor-pointer'
        >
          Book an appointment
        </button>
      </div>

      {/* Related Doctors */}
      <RelatedDoctors speciality={docInfo.speciality} docId={docId} />
    </div>
  ) : null
}

export default Appointment
