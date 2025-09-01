"use client";

import { useState } from "react";
import { Menu, X, Home, Calendar, User, ClipboardList } from "lucide-react";

// Import your actual Dashboard component
 // tumar existing Dashboard component
import DoctorDashboard from "./dashboard/page";
import Appointment from "./appointment/page";

const HomePage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeContent, setActiveContent] = useState("dashboard"); // default Dashboard

  // Sidebar routes
  const doctorRoutes = [
    { name: "Dashboard", key: "dashboard", icon: Home, component: <DoctorDashboard></DoctorDashboard> },
    { name: "Appointments", key: "doctorAppointments", icon: Calendar, component: <Appointment /> },
    { name: "Profile", key: "doctorProfile", icon: User, component: <h1>Doctor Profile (Dummy)</h1> },
  ];

  const patientRoutes = [
    { name: "My Appointments", key: "patientAppointments", icon: Calendar, component: <h1>Patient Appointments (Dummy)</h1> },
    { name: "Doctors", key: "patientDoctors", icon: ClipboardList, component: <h1>Patient Doctors (Dummy)</h1> },
    { name: "Profile", key: "patientProfile", icon: User, component: <h1>Patient Profile (Dummy)</h1> },
  ];

 
  const renderContent = () => {
    const allRoutes = [...doctorRoutes, ...patientRoutes];
    const activeRoute = allRoutes.find((route) => route.key === activeContent);
    return activeRoute ? activeRoute.component : null;
  };

  const renderRoutes = (routes) =>
    routes.map((route) => {
      const Icon = route.icon;
      const active = activeContent === route.key;
      return (
        <button
          key={route.key}
          onClick={() => setActiveContent(route.key)}
          className={`flex items-center gap-2 px-4 py-2 mb-1 w-full text-left ${
            active ? "font-bold" : ""
          }`}
        >
          <Icon size={18} /> {route.name}
        </button>
      );
    });

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`fixed z-20 inset-y-0 left-0 w-64 bg-gray-100 p-4 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Dashboard</h2>
          <button className="lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <div>
          <h3 className="text-gray-500 uppercase text-xs mb-2">Doctor</h3>
          {renderRoutes(doctorRoutes)}
        </div>

        <div className="mt-4">
          <h3 className="text-gray-500 uppercase text-xs mb-2">Patient</h3>
          {renderRoutes(patientRoutes)}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar for mobile */}
        <header className="flex items-center justify-between bg-white px-4 py-3 shadow-md lg:hidden">
          <button onClick={() => setSidebarOpen(true)}>
            <Menu size={24} />
          </button>
          <h1 className="text-xl font-semibold">Dashboard</h1>
        </header>

        <main className="flex-1 p-6 overflow-y-auto">{renderContent()}</main>
      </div>
    </div>
  );
};

export default HomePage;
