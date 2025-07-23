"use client";

import React, { useState } from 'react';
import { Phone, Menu, X } from 'lucide-react';
import { MdOutlineEmail } from 'react-icons/md';
import Link from 'next/link';
import Image from 'next/image';
  import { FaWhatsapp } from 'react-icons/fa';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // const [activeDropdown, setActiveDropdown] = useState(null);

  const mainMenuItems = [
    { label: 'Home', link: '/' },
    { label: 'About Us', link: '/about-us' },
    { label: 'Avaidh Nirman', link: '/avaidh-nirman' },
    { label: 'Result', link: '#' },
    { label: 'Gallery', link: '/gallery' },
    { label: 'Blog', link: '/blogs' },
    { label: 'Complaints Request', link: '/complain-request' },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // const ToggleDropdown = (index) => {
  //   setActiveDropdown(activeDropdown === index ? null : index);
  // };

  return (
    <div className="w-full sticky top-0 z-50 bg-white">
      {/* Main Header */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between md:h-24">
            {/* Logo */}
            <div className="flex items-center">
              <Image width={400} height={300} src="/images/avaidh-nirman-virodhi-morcha-logo.webp" alt="Logo" className="h-15 md:h-20 w-auto" />
            </div>

            {/* Contact Numbers - Desktop */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Phone className="w-6 h-6 text-red-600" />
                <span className="text-lg font-medium">011-3322139, 2240930, 2224689</span>
              </div>
              <div className="flex items-center space-x-2">
                <MdOutlineEmail className="w-6 h-6 text-red-800" />
                <span className="text-lg font-medium">avaidhnirman@gmail.com</span>
              </div>
            <button className="
              bg-orange-500 text-white px-6 py-3 rounded-lg
              text-lg uppercase font-medium
              hover:bg-orange-600 transition-all duration-300
              flex items-center justify-center gap-2
              shadow-md hover:shadow-lg
            ">
              <FaWhatsapp className="w-5 h-5" />
              Whatsapp Now
            </button>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2" onClick={toggleMobileMenu}>
              {isMobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="bg-[#1a4767] border-t border-gray-200 shadow-md">
        <div className="max-w-7xl mx-auto">
          {/* Desktop Menu */}
          <div className="hidden md:flex text-lg md:flex-row items-center justify-end">
            {mainMenuItems.map((item, index) => (
              <div key={index} className="relative group">
                <Link
                  href={item.link}
                  className={`flex items-center px-8 py-4 text-base font-medium 
                  ${index === mainMenuItems.length - 1 ? 'bg-white !text-[#111]' : 'text-white'} 
                  hover:text-white transition-all relative overflow-hidden`}
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 ease-in-out group-hover:w-full"></span>
                </Link>
              </div>
            ))}
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
              <div className="px-4 py-2 space-y-1">
                {/* Contact Info Mobile */}
                <div className="flex flex-col items-start space-y-3 py-4 border-b border-gray-200">
                  {/* <div className="flex items-center space-x-2">
                    <FaWhatsapp className="w-6 h-6 text-green-500" />
                    <span className="text-lg font-semibold">9625961599</span>
                  </div> */}
                  <div className="flex items-center space-x-2">
                    <Phone className="w-6 h-6 text-red-600" />
                    <span className="text-lg font-semibold">011-3322139, 2240930, 2224689</span>
                  </div>
                </div>

                {/* Action Buttons Mobile */}
                <div className="flex space-x-2 py-2">
                  <button className="flex-1 bg-orange-500 text-white py-2 uppercase rounded text-sm font-medium hover:bg-orange-600 transition-colors">
                    Whatsapp Now
                  </button>
                </div>

                {/* Main Menu Items */}
                {mainMenuItems.map((item, index) => (
                  <div key={index}>
                    <a
                      href={item.link}
                      className={`block px-4 py-3 text-sm font-medium text-gray-700 
                        hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200
                        rounded-md ${index === mainMenuItems.length - 1 ? 'bg-orange-50 text-orange-600' : ''}`}
                    >
                      {item.label}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
