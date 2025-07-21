'use client';
import React, { useState } from 'react';
import {
  Menu,
  BarChart3,
  FileText,
  ChevronDown,
  ChevronUp,
  Scale,
  Folder,
  BookOpen,
  Layout,
  MessageCircle,
  Settings,
} from 'lucide-react';

function DashbordSidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);

  const sidebarItems = [
    {
      label: 'Dashboard',
      icon: BarChart3,
      link: '/admin/dashboard',
    },
    {
      label: 'Categories',
      icon: Folder,
      submenu: [
        { label: 'All Categories', link: '/admin/blogs-category' },
        { label: 'Add Category', link: '/admin/add-category' },
      ],
    },
    {
      label: 'Blogs',
      icon: BookOpen,
      submenu: [
        { label: 'All Blogs', link: '/admin/blogs' },
        { label: 'Add Blog', link: '/admin/add-blogs' },
      ],
    },
    {
      label: 'Pages',
      icon: Layout,
      submenu: [
        { label: 'All Pages', link: '/admin/pages' },
        { label: 'Add New', link: '/admin/add-page' },
      ],
    },
    {
      label: 'Enquiry Data',
      icon: MessageCircle,
      link: '/admin/enquiries',
    },
    {
      label: 'Settings',
      icon: Settings,
      link: '/admin/settings',
    },
  ];

  const handleSubmenuToggle = (label: string) => {
    setActiveSubmenu(activeSubmenu === label ? null : label);
  };

  return (
    <>
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 fixed lg:relative w-64 h-full bg-white shadow-lg z-30 transition-transform duration-300`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 shadow-md">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center">
              <Scale className="text-white w-5 h-5" />
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

        {/* Sidebar Content */}
        <nav className="mt-4">
          {sidebarItems.map((item, index) => (
            <div key={index}>
              <a
                href={item.link || '#'}
                onClick={
                  item.submenu
                    ? (e) => {
                        e.preventDefault();
                        handleSubmenuToggle(item.label);
                      }
                    : undefined
                }
                className={`flex items-center px-6 py-3 text-sm font-medium transition-all duration-200 cursor-pointer group
                  ${
                    activeSubmenu === item.label
                      ? 'bg-orange-50 text-orange-600'
                      : 'text-gray-700 hover:text-orange-600 hover:bg-orange-50'
                  }`}
              >
                <item.icon className="w-5 h-5 mr-3 group-hover:text-orange-600 transition" />
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
                <div className="pl-10 bg-orange-50 py-2 space-y-1">
                  {item.submenu.map((subItem, subIndex) => (
                    <a
                      key={subIndex}
                      href={subItem.link}
                      className="block px-4 py-2 rounded-md text-sm text-gray-600 hover:text-orange-600 hover:bg-white transition-all"
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

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </>
  );
}

export default DashbordSidebar;
