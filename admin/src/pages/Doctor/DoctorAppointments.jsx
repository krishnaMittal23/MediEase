import React, { useContext, useEffect } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';

const DoctorAppointments = () => {
  const { dToken, appointments, getAppointments, cancelAppointment, completeAppointment } = useContext(DoctorContext);
  const { slotDateFormat, calculateAge, currency } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getAppointments();
    }
  }, [dToken]);

  return (
    <div className="w-full max-w-6xl mx-auto my-8 px-4">
      <p className="mb-4 text-2xl font-bold text-primary">Your Appointments</p>

      <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-gray-800 rounded-lg text-sm max-h-[80vh] overflow-y-scroll shadow-lg">
        <div className="hidden sm:grid grid-cols-[0.3fr_2fr_1fr_1fr_2fr_1fr_1fr] gap-4 py-3 px-6 border-b border-gray-700 text-gray-300 bg-gray-900/40 rounded-t-lg">
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>

        {appointments.reverse().map((item, index) => (
          <div
            key={index}
            className="flex flex-wrap sm:grid sm:grid-cols-[0.3fr_2fr_1fr_1fr_2fr_1fr_1fr] gap-4 items-center text-gray-400 py-3 px-6 border-b border-gray-800 hover:bg-gray-800/40 transition"
          >
            <p className="max-sm:hidden font-medium text-gray-500">{index + 1}</p>

            <div className="flex items-center gap-3">
              <img
                src={item.userData.image}
                alt={item.userData.name}
                className="w-10 h-10 rounded-full border border-gray-600 object-cover"
              />
              <p className="font-semibold">{item.userData.name}</p>
            </div>

            <div>
              <p
                className={`text-xs text-center px-2 py-1 rounded-full font-semibold ${
                  item.payment ? 'bg-green-600/20 text-green-400 border border-green-600' : 'bg-yellow-600/20 text-yellow-400 border border-yellow-600'
                }`}
              >
                {item.payment ? 'Online' : 'CASH'}
              </p>
            </div>

            <p className="max-sm:hidden">{calculateAge(item.userData.dob)}</p>

            <p>
              {slotDateFormat(item.slotDate)}, <span className="font-medium">{item.slotTime}</span>
            </p>

            <p className="font-semibold text-primary">{currency}{item.amount}</p>

            <div className="flex items-center gap-3">
              {item.cancelled ? (
                <p className="text-red-400 text-xs font-bold">Cancelled</p>
              ) : item.isCompleted ? (
                <p className="text-green-500 text-xs font-bold">Completed</p>
              ) : (
                <div className="flex items-center gap-2">
                  <img
                    onClick={() => cancelAppointment(item._id)}
                    src={assets.cancel_icon}
                    alt="Cancel"
                    className="w-8 cursor-pointer opacity-80 hover:opacity-100 hover:scale-110 transition"
                  />
                  <img
                    onClick={() => completeAppointment(item._id)}
                    src={assets.tick_icon}
                    alt="Complete"
                    className="w-8 cursor-pointer opacity-80 hover:opacity-100 hover:scale-110 transition"
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorAppointments;
