import React from "react";

const DoctorDashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Doctor Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg">
          <h3 className="text-lg font-semibold text-gray-800">Total Appointments</h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">12</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg">
          <h3 className="text-lg font-semibold text-gray-800">Pending Requests</h3>
          <p className="text-3xl font-bold text-yellow-500 mt-2">3</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg">
          <h3 className="text-lg font-semibold text-gray-800">Completed</h3>
          <p className="text-3xl font-bold text-green-600 mt-2">8</p>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
