'use client'
import React from 'react';
import { Sun } from 'lucide-react';


const AdminDashbord = () => {

  const statsCards = [
    { title: "Today's Bookings", value: "4006", change: "+5.00% (30 days)", color: "bg-blue-500" },
    { title: "Total Bookings", value: "61344", change: "22.00% (30 days)", color: "bg-purple-600" },
    { title: "Number of Meetings", value: "34040", change: "2.00% (30 days)", color: "bg-blue-400" },
    { title: "Number of Clients", value: "47033", change: "0.22% (30 days)", color: "bg-red-400" },
  ];

  const orderStats = [
    { label: "Sessions", value: "12.3k", color: "text-blue-500" },
    { label: "Users", value: "14k", color: "text-green-500" },
    { label: "Bounce Rate", value: "71.56%", color: "text-orange-500" },
    { label: "Session Duration", value: "34040", color: "text-purple-500" },
  ];

  return (

    <>
      {/* Dashboard Content */}
      <main className="flex-1 overflow-y-auto p-6" >
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">Welcome To Avaidh Nirman Virodhi Morcha</h1>
          <p className="text-gray-600">All systems are running smoothly! You have 3 unread alerts!</p>
        </div>

        {/* Weather and Stats Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Weather Card */}
          <div className="bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <Sun className="w-8 h-8" />
                </div>
                <div>
                  <div className="text-3xl font-bold">31°</div>
                  <div className="text-sm opacity-80">Bangalore</div>
                  <div className="text-sm opacity-80">India</div>
                </div>
              </div>
              <div className="text-right">
                <Sun className="w-6 h-6 mb-2" />
              </div>
            </div>
            <div className="flex space-x-4">
              <div className="w-12 h-12 bg-yellow-400 rounded-full"></div>
              <div className="w-8 h-8 bg-blue-300 rounded-full"></div>
              <div className="w-6 h-6 bg-green-400 rounded-full"></div>
              <div className="w-4 h-4 bg-red-400 rounded-full"></div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {statsCards.map((card, index) => (
                <div key={index} className={`${card.color} rounded-lg p-6 text-white`}>
                  <div className="text-sm opacity-80 mb-2">{card.title}</div>
                  <div className="text-3xl font-bold mb-2">{card.value}</div>
                  <div className="text-sm opacity-80">{card.change}</div>
                </div>
              ))}
            </div>
          </div>
        </div>


      </main >
    </>
  );
};

export default AdminDashbord;