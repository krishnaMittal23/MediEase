import React, { useContext, useEffect, useState } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { AppContext } from '../../context/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const DoctorProfile = () => {
  const { dToken, profileData, setProfileData, getProfileData, backendUrl } = useContext(DoctorContext);
  const { currency } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);

  const updateProfile = async () => {
    try {
      const updateData = {
        address: profileData.address,
        fees: profileData.fees,
        about: profileData.about,
        available: profileData.available,
      };

      const { data } = await axios.post(backendUrl + '/api/doctor/update-profile', updateData, { headers: { dToken } });

      if (data.success) {
        toast.success(data.message);
        setIsEdit(false);
        getProfileData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  useEffect(() => {
    if (dToken) {
      getProfileData();
    }
  }, [dToken]);

  return profileData && (
    <div className="m-5 flex flex-col  gap-6">

      {/* Left: Profile Image */}
      <div className="flex-shrink-0">
        <img
          className="w-full sm:max-w-xs rounded-xl shadow-md border border-gray-200"
          src={profileData.image}
          alt={profileData.name}
        />
      </div>

      {/* Right: Profile Details */}
      <div className="flex-1 bg-gray-300/70 rounded-xl shadow p-6 border border-gray-100">

        {/* Name and Degree */}
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{profileData.name}</h1>
        <div className="flex items-center gap-3 text-gray-600 mb-4">
          <p>{profileData.degree} - {profileData.speciality}</p>
          <span className="bg-primary text-white text-xs rounded-full px-2 py-0.5">{profileData.experience}</span>
        </div>

        {/* About */}
        <div className="mb-5">
          <h2 className="text-sm font-semibold text-gray-700 mb-1">About</h2>
          {isEdit ? (
            <textarea
              rows={5}
              className="w-full border rounded-lg p-2 focus:outline-primary text-sm"
              value={profileData.about}
              onChange={(e) => setProfileData(prev => ({ ...prev, about: e.target.value }))}
            />
          ) : (
            <p className="text-gray-600 text-sm">{profileData.about}</p>
          )}
        </div>

        {/* Appointment Fee */}
        <div className="mb-4">
          <h2 className="text-sm font-semibold text-gray-700 mb-1">Appointment Fee</h2>
          {isEdit ? (
            <input
              type="number"
              className="border rounded px-2 py-1 w-32 focus:outline-primary text-sm"
              value={profileData.fees}
              onChange={(e) => setProfileData(prev => ({ ...prev, fees: e.target.value }))}
            />
          ) : (
            <p className="text-gray-600 text-sm">{currency} {profileData.fees}</p>
          )}
        </div>

        {/* Address */}
        <div className="mb-4">
          <h2 className="text-sm font-semibold text-gray-700 mb-1">Address</h2>
          {isEdit ? (
            <>
              <input
                type="text"
                className="border rounded px-2 py-1 w-full mb-2 focus:outline-primary text-sm"
                value={profileData.address.line1}
                onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))}
              />
              <input
                type="text"
                className="border rounded px-2 py-1 w-full focus:outline-primary text-sm"
                value={profileData.address.line2}
                onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))}
              />
            </>
          ) : (
            <p className="text-gray-600 text-sm">{profileData.address.line1}, {profileData.address.line2}</p>
          )}
        </div>

        {/* Availability */}
        <div className="flex items-center gap-2 mb-4">
          <input
            type="checkbox"
            checked={profileData.available}
            onChange={() => isEdit && setProfileData(prev => ({ ...prev, available: !prev.available }))}
          />
          <label className="text-gray-700 text-sm">Available</label>
        </div>

        {/* Action Button */}
        <button
          onClick={isEdit ? updateProfile : () => setIsEdit(true)}
          className="px-5 py-2 rounded-full bg-primary cursor-pointer text-white text-sm hover:bg-primary-dark transition"
        >
          {isEdit ? 'Save Changes' : 'Edit Profile'}
        </button>

      </div>
    </div>
  );
};

export default DoctorProfile;
