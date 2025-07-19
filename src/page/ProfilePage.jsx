import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const ProfilePage = () => {
  const { firstName, lastName, email } = useSelector((state) => {
    return state.loginReducer;
  });

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Profile</h1>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <div className="mt-1 p-2 bg-gray-50 rounded-lg">
              <p className="text-gray-900  text-lg sm:text-2xl">{firstName}</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 ">
              Last Name
            </label>
            <div className="mt-1 p-2 bg-gray-50 rounded-lg">
              <p className="text-gray-900 text-lg sm:text-2xl">{lastName}</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <div className="mt-1 p-2 bg-gray-50 rounded-lg">
              <p className="text-gray-900 text-lg sm:text-2xl">{email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
