'use client'
import React, { useState } from 'react';
import {Menu, BarChart3, FileText, ChevronDown, ChevronUp, Scale } from 'lucide-react';

function DashbordSidebar() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null); // Track active submenu

    const sidebarItems = [
        { icon: BarChart3, label: 'Dashboard', active: true },
        { 
          icon: FileText, 
          label: 'Blogs', 
          submenu: [
            { label: 'All Posts', link: '/admin/blogs' },
            { label: 'All Category', link: '/admin/blogs-category' },
            { label: 'Add Category', link: '/admin/add-category' },
            { label: 'Add Post', link: '/admin/add-blogs' },
          ]
        },
        { 
          icon: FileText, 
          label: 'Pages', 
          submenu: [
            { label: 'All Pages', link: '#button' },
            { label: 'Add New', link: '#form' },
          ]
        },

        { icon: FileText, label: 'Enquiry Data' },
        { icon: FileText, label: 'Settings' },
        // { icon: FileText, label: 'Editors' },
        // { icon: BarChart3, label: 'Charts' },
        // { icon: FileText, label: 'Tables' },
     
    ];

    const handleSubmenuToggle = (label: string) => {
        setActiveSubmenu(activeSubmenu === label ? null : label); // Toggle active submenu
    }

    return (
        <>
            {/* Sidebar */}
            <div className={`${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:relative w-64 h-full bg-white shadow-lg z-30 transition-transform duration-300`}>
                <div className="flex items-center justify-between p-4 shadow-md">
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-sm"><Scale /></span>
                        </div>
                        <span className="font-bold text-2xl">ANVM</span>
                    </div>
                    <button
                        onClick={() => setIsSidebarOpen(false)}
                        className="lg:hidden"
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                </div>

                <nav className="mt-4">
                    {sidebarItems.map((item, index) => (
                        <div key={index}>
                            <a
                                href="#"
                                onClick={item.submenu ? (e) => { e.preventDefault(); handleSubmenuToggle(item.label); } : undefined}
                                className={`flex items-center px-6 py-3 text-sm transition-colors ${item.active
                                    ? 'bg-orange-50 text-orange-600 border-r-2 border-orange-600'
                                    : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                            >
                                <item.icon className="w-5 h-5 mr-3" />
                                {item.label}
                                {item.submenu && (
                                    <span className="ml-auto">
                                        {activeSubmenu === item.label ? (
                                            <ChevronUp className="w-4 h-4" />
                                        ) : (
                                            <ChevronDown className="w-4 h-4" />
                                        )}
                                    </span>
                                )}
                            </a>

                            {/* Submenu */}
                            {item.submenu && activeSubmenu === item.label && (
                                <div className="pl-8">
                                    {item.submenu.map((subItem, subIndex) => (
                                        <a
                                            key={subIndex}
                                            href={subItem.link}
                                            className="block px-6 py-2 text-sm text-gray-600 hover:bg-gray-100"
                                        >
                                            {subItem.label}
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </nav>
            </div>

            {/* Overlay for mobile */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}
        </>
    )
}

export default DashbordSidebar;
