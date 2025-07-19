import React, { useEffect, useContext } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';

const AllAppointments = () => {

  const { aToken, appointments, getAllAppointments,cancelAppointment } = useContext(AdminContext);
  const { slotDateFormat, calculateAge, currency } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
  }, [aToken]);

  return (
    <div className="w-full max-w-6xl mx-auto my-8 px-4">

      <p className="mb-4 text-xl font-semibold text-primary">All Appointments</p>

      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-md overflow-hidden max-h-[80vh] overflow-y-scroll">
        
        <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] py-4 px-6 border-b border-white/20 text-gray-300 bg-gradient-to-r from-gray-800 to-gray-700">
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Action</p>
        </div>

        {appointments.map((item, index) => (
          <div
            key={index}
            className="flex flex-wrap justify-between sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-200 py-4 px-6 border-b border-white/10 hover:bg-white/10 transition-all"
          >
            <p className="max-sm:hidden">{index + 1}</p>

            <div className="flex items-center gap-3">
              <img src={item.userData.image} className="w-10 h-10 rounded-full object-cover border border-gray-500" alt="patient" />
              <p className="font-medium">{item.userData.name}</p>
            </div>

            <p className="max-sm:hidden">{calculateAge(item.userData.dob)}</p>

            <p>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>

            <div className="flex items-center gap-3">
              <img src={item.docData.image} className="w-10 h-10 rounded-full object-cover border border-gray-500" alt="doctor" />
              <p className="font-medium">{item.docData.name}</p>
            </div>

            <p className="font-semibold">{currency}{item.amount}</p>

            {item.cancelled ? (
              <p className="text-red-400 text-xs font-semibold">Cancelled</p>
            ) : item.isCompleted ? (
              <p className="text-green-400 text-xs font-semibold">Completed</p>
            ) : (
              <img
                onClick={() => cancelAppointment(item._id)}
                className="w-6 cursor-pointer opacity-80 hover:opacity-100 transition "
                src={assets.remove_icon}
                alt="cancel"
              />
            )}
          </div>
        ))}
      </div>

    </div>
  );
};

export default AllAppointments;
