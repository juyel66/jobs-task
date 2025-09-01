"use client";

import { useUser } from "../context/UserContext";
import { useState } from "react";
import { Menu, X, User, Calendar, ClipboardList } from "lucide-react";

const HomePage = () => {
  const user = useUser();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed z-20 inset-y-0 left-0 w-64 bg-white shadow-md transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-2xl font-bold text-blue-600">Dashboard</h2>
          <button
            className="lg:hidden text-gray-600"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={24} />
          </button>
        </div>
        <nav className="mt-4">
          <a
            href="#profile"
            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-blue-100"
          >
            <User size={18} /> Profile
          </a>
          <a
            href="#appointments"
            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-blue-100"
          >
            <Calendar size={18} /> My Appointments
          </a>
          <a
            href="#reports"
            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-blue-100"
          >
            <ClipboardList size={18} /> Reports
          </a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="flex items-center justify-between bg-white px-4 py-3 shadow-md lg:hidden">
          <button
            className="text-gray-600"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={24} />
          </button>
          <h1 className="text-xl font-semibold">Dashboard</h1>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-6 overflow-y-auto">
          <h1 className="text-2xl font-bold mb-6">
            Welcome, {user?.name || "User"} 👋
          </h1>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg">
              <h3 className="text-lg font-semibold text-gray-800">
                Total Appointments
              </h3>
              <p className="text-3xl font-bold text-blue-600 mt-2">12</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg">
              <h3 className="text-lg font-semibold text-gray-800">
                Pending Requests
              </h3>
              <p className="text-3xl font-bold text-yellow-500 mt-2">3</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg">
              <h3 className="text-lg font-semibold text-gray-800">
                Completed
              </h3>
              <p className="text-3xl font-bold text-green-600 mt-2">8</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default HomePage;
