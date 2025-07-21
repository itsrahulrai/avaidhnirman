"use client";
import React from "react";
import {
  Facebook,
  Twitter,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ArrowUp,
} from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <footer className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
          {/* Main footer content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Company Info */}
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-50 bg-clip-text mb-4">
                  Avaidh Nirman Virodhi Morcha
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Avaidh Nirman Virodhi Morcha (ANVM) is a non-political,
                  community-driven initiative committed to combating
                  unauthorized construction activities (avaidh nirman) in
                  cities, towns, and rural areas across India.
                </p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors">
                  <MapPin size={20} className="text-orange-500" />
                  <span>C - 4/1 Connaught Place, New Delhi-110001</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors">
                  <Phone size={18} className="text-orange-500" />
                  <span>011-3322139</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors">
                  <Mail size={18} className="text-orange-500" />
                  <span>avaidhnirman@gmail.com</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-white">
                Quick Links
              </h3>
              <ul className="space-y-3">
                {[
                  { label: "Home", href: "/" },
                  { label: "About Us", href: "/about-us" },
                  { label: "Avaidh Nirman", href: "/avaidh-nirman" },
                  { label: "Result", href: "/result" },
                  { label: "Gallery", href: "/gallery" },
                  { label: "Blog", href: "/blog" },
                ].map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="text-gray-300 hover:text-orange-500 transition-all duration-300 hover:translate-x-1 inline-block"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-white">Support</h3>
              <ul className="space-y-3">
                {[
                  { label: "Help Center", href: "#" },
                  { label: "Contact Us", href: "#" },
                  { label: "Get Involved", href: "#" },
                  { label: "Volunteer", href: "#" },
                  { label: "Donate", href: "#" },
                ].map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="text-gray-300 hover:text-blue-400 transition-all duration-300 hover:translate-x-1 inline-block"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect & Newsletter */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-white">
                Stay Connected
              </h3>

              {/* Social Media */}
              <div className="flex space-x-4 mb-6">
                {[
                  { icon: Facebook, href: "#", label: "Facebook" },
                  { icon: Twitter, href: "#", label: "Twitter" },
                  { icon: Linkedin, href: "#", label: "LinkedIn" },
                ].map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center hover:bg-blue-600 transition-all duration-300 hover:scale-110 group"
                    aria-label={label}
                  >
                    <Icon
                      size={18}
                      className="text-gray-300 group-hover:text-white"
                    />
                  </a>
                ))}
              </div>

              {/* Newsletter */}
              <div>
                <p className="text-gray-300 mb-4 text-sm">
                  Subscribe to our newsletter
                </p>
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-3 py-2 bg-slate-700 border border-slate-600 rounded-l-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-colors"
                  />
                  <button className="px-4 py-2 bg-orange-600 hover:bg-orange-500 rounded-r-lg transition-colors">
                    <Mail size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-slate-700 mb-8"></div>

          {/* Bottom section */}
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Avaidh Nirman Virodhi Morcha. All
              rights reserved. | Manage By Hover Business Services LLP
            </div>

            <div className="flex space-x-6 text-sm">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
                (item) => (
                  <a
                    key={item}
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {item}
                  </a>
                )
              )}
            </div>
          </div>
        </div>

        {/* Scroll to top button */}
        <button
          onClick={scrollToTop}
          className="absolute bottom-6 right-6 w-12 h-12 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg"
          aria-label="Scroll to top"
        >
          <ArrowUp size={20} className="text-white" />
        </button>
      </footer>
    </>
  );
};

export default Footer;
