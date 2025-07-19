import React, { useContext, useEffect } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';

const DoctorDashboard = () => {
  const { dToken, dashData, getDashData, cancelAppointment, completeAppointment } = useContext(DoctorContext);
  const { slotDateFormat, currency } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getDashData();
    }
  }, [dToken]);

  return dashData && (
    <div className="m-5 mt-10">

      <div className="flex flex-wrap gap-4">
        {/* Earnings Card */}
        <div className="flex items-center gap-4 bg-gradient-to-br from-gray-800/80 to-gray-700/80 p-5 rounded-xl shadow hover:scale-[1.02] transition cursor-pointer min-w-[200px]">
          <img className="w-14" src={assets.earning_icon} alt="Earnings" />
          <div>
            <p className="text-2xl font-bold text-gray-200">{currency} {dashData.earnings}</p>
            <p className="text-gray-200">Earnings</p>
          </div>
        </div>

        {/* Appointments Card */}
        <div className="flex items-center gap-4 bg-gradient-to-br from-gray-800/80 to-gray-700/80 p-5 rounded-xl shadow hover:scale-[1.02] transition cursor-pointer min-w-[200px]">
          <img className="w-14" src={assets.appointments_icon} alt="Appointments" />
          <div>
            <p className="text-2xl font-bold text-gray-200">{dashData.appointments}</p>
            <p className="text-gray-200">Appointments</p>
          </div>
        </div>

        {/* Patients Card */}
        <div className="flex items-center gap-4 bg-gradient-to-br from-gray-800/80 to-gray-700/80 p-5 rounded-xl shadow hover:scale-[1.02] transition cursor-pointer min-w-[200px]">
          <img className="w-14" src={assets.patients_icon} alt="Patients" />
          <div>
            <p className="text-2xl font-bold text-gray-200">{dashData.patients}</p>
            <p className="text-gray-200">Patients</p>
          </div>
        </div>
      </div>

      {/* Latest Bookings */}
      <div className="bg-gray-600/80 shadow rounded-xl mt-10">
        <div className="flex items-center gap-3 px-6 py-4 border-b">
          <img src={assets.list_icon} alt="Latest Bookings" className="w-6" />
          <p className="text-lg font-semibold text-gray-300">Latest Bookings</p>
        </div>

        <div className="divide-y">
          {dashData.latestAppointments.slice(0, 5).map((item, index) => (
            <div
              key={index}
              className="flex items-center px-6 py-4 hover:bg-gray-800/50 transition"
            >
              <img className="rounded-full w-10 h-10 object-cover" src={item.userData.image} alt={item.userData.name} />
              <div className="flex-1 ml-4">
                <p className="font-medium text-gray-300">{item.userData.name}</p>
                <p className="text-gray-300 text-sm">Booking on {slotDateFormat(item.slotDate)}</p>
              </div>

              {item.cancelled ? (
                <p className="text-red-500 text-xs font-semibold">Cancelled</p>
              ) : item.isCompleted ? (
                <p className="text-green-500 text-xs font-semibold">Completed</p>
              ) : (
                <div className="flex gap-2">
                  <img
                    onClick={() => cancelAppointment(item._id)}
                    className="w-8 cursor-pointer hover:scale-110 transition"
                    src={assets.cancel_icon}
                    alt="Cancel"
                  />
                  <img
                    onClick={() => completeAppointment(item._id)}
                    className="w-8 cursor-pointer hover:scale-110 transition"
                    src={assets.tick_icon}
                    alt="Complete"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default DoctorDashboard;
