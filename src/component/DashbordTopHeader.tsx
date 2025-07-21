'use client'
import React, { useState } from 'react';
import { ChevronDown, Search, Bell, Settings, User, LogOut } from 'lucide-react';
import Image from 'next/image';
import { signOut } from 'next-auth/react';
function DashbordTopHeader() {
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
    return (
        <>
            <header className="bg-white px-4 py-3 shadow-lg ">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        {/* <button
                            onClick={() => setIsSidebarOpen(true)}
                            className="lg:hidden"
                        >
                            <Menu className="w-6 h-6" />
                        </button> */}
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search now"
                                className="pl-10 pr-4 py-2 bg-gray-50 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <div className="text-sm text-gray-600">
                            Today (10 Jan 2023)
                            <ChevronDown className="w-4 h-4 inline ml-1" />
                        </div>
                        <Bell className="w-6 h-6 text-gray-600" />
                        <div className="relative">
                            <button
                                onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                                className="flex items-center space-x-2 focus:outline-none"
                            >
                                <Image width={100} height={100}
                                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face&auto=format"
                                    alt="User"
                                    className="w-8 h-8 rounded-full"
                                />
                                <ChevronDown className="w-4 h-4 text-gray-600" />
                            </button>

                            {isUserDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                                    <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                                        <User className="w-4 h-4 mr-2" />
                                        Profile
                                    </a>
                                    <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                                        <Settings className="w-4 h-4 mr-2" />
                                        Settings
                                    </a>
                                    <hr className="my-2" />
                                    <button
                                        onClick={() => signOut({ callbackUrl: '/login' })}
                                        className="flex items-center w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-50"
                                    >
                                        <LogOut className="w-4 h-4 mr-2" />
                                        Logout
                                    </button>
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}

export default DashbordTopHeader