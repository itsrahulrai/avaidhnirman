'use client';
import React from 'react';
import { Sun } from 'lucide-react';

const AdminDashbord = () => {
  const statsCards = [
    { title: "Today's Bookings", value: "4006", change: "+5.00% (30 days)", color: "bg-blue-500" },
    { title: "Total Bookings", value: "61344", change: "+22.00% (30 days)", color: "bg-purple-600" },
    { title: "Number of Meetings", value: "34040", change: "+2.00% (30 days)", color: "bg-cyan-600" },
    { title: "Number of Clients", value: "47033", change: "+0.22% (30 days)", color: "bg-rose-500" },
  ];

  return (
    <main className="flex-1 overflow-y-auto p-6 bg-gray-50 min-h-screen">
      {/* Header */}
     <div className="mb-8">
  <h1 className="text-4xl font-bold text-gray-900 leading-tight">Welcome to ANVM Dashboard</h1>
  <p className="mt-2 text-lg text-gray-600">
    All systems are <span className="text-green-600 font-semibold">operational</span>. You have{' '}
    <span className="text-orange-600 font-semibold">3 unread alerts</span>.
  </p>
</div>

      {/* Top Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Weather Card */}
        <div className="rounded-2xl p-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <Sun className="w-7 h-7" />
              </div>
              <div>
                <div className="text-3xl font-bold">31°</div>
                <div className="text-sm opacity-90">Bangalore, India</div>
              </div>
            </div>
            <Sun className="w-6 h-6 opacity-70" />
          </div>
          <div className="flex gap-2">
            <div className="w-4 h-4 rounded-full bg-yellow-300"></div>
            <div className="w-3.5 h-3.5 rounded-full bg-blue-300"></div>
            <div className="w-3 h-3 rounded-full bg-green-300"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-red-300"></div>
          </div>
        </div>

        {/* Stat Cards */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {statsCards.map((card, i) => (
            <div
              key={i}
              className={`rounded-2xl p-5 text-white shadow-md hover:shadow-xl transition-shadow duration-300 ${card.color}`}
            >
              <p className="text-sm opacity-90 mb-1">{card.title}</p>
              <p className="text-3xl font-bold mb-1">{card.value}</p>
              <p className="text-sm opacity-80">{card.change}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default AdminDashbord;
