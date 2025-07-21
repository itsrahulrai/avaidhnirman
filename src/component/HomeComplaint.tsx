"use client";
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Upload, Linkedin, Instagram, X } from 'lucide-react';
import { FaXTwitter } from 'react-icons/fa6';
interface FormData {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  subject: string;
  message: string;
}
const HomeComplaint = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setSelectedFiles(prev => [...prev, ...files]);
  };

  const removeFile = (index:number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    console.log('Form Data:', formData);
    console.log('Selected Files:', selectedFiles);
    // Handle form submission here
  };

  return (
    <div className="h-auto mg:min-h-screen bg-gradient-to-br from-[#1a4767] via-[#266a9b] to-[#1a4767]">
      {/* Desktop Layout */}
      <div className="lg:flex">
        {/* Left Side - Content */}
        <div className="flex-1 flex flex-col justify-center px-12 xl:px-10">
          <div className="max-w-4xl mt-8 pl-5 lg:pl-20">
            <h1 className="text-4xl xl:text-6xl font-bold text-white mb-8 leading-tight">
              Let&apos;s talk<br />
              on something <span className="text-orange-600">great</span><br />
              together
            </h1>

            <div className="space-y-6 mb-12">
              <div className="flex items-center space-x-4">
                <Mail className="w-6 h-6 text-orange-600" />
                <span className="text-white text-lg font-regular">avaidhnirman@gmail.com</span>
              </div>
              <div className="flex items-center space-x-4">
                <Phone className="w-6 h-6 text-orange-600" />
                <span className="text-white text-lg font-regular">011-3322139, 2240930, 2224689</span>
              </div>
              <div className="flex items-center space-x-4">
                <MapPin className="w-6 h-6 text-orange-600" />
                <span className="text-white text-lg font-regular">C - 4/1 Connaught Place, New Delhi-110001</span>
              </div>
            </div>

            <div className="flex space-x-6">
              <Linkedin className="w-8 h-8 text-orange-600 hover:text-white cursor-pointer transition-colors" />
              <FaXTwitter className="w-8 h-8 text-orange-600 hover:text-white cursor-pointer transition-colors" />
              <Instagram className="w-8 h-8 text-orange-600 hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="bg-white rounded-3xl p-8 w-full max-w-2xl shadow-2xl">
            <div className="space-y-6">
              {/* Input Fields in Two Columns */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full name</label>
                  <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} placeholder="Vinay Pandey" className="w-full px-4 py-3 border-b-2 border-gray-200 focus:border-sky-600 outline-none transition-colors bg-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="vinay@gmail.com" className="w-full px-4 py-3 border-b-2 border-gray-200 focus:border-sky-600 outline-none transition-colors bg-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="+91-9868717273" className="w-full px-4 py-3 border-b-2 border-gray-200 focus:border-sky-600 outline-none transition-colors bg-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <input type="text" name="location" value={formData.location} onChange={handleInputChange} placeholder="delhi" className="w-full px-4 py-3 border-b-2 border-gray-200 focus:border-sky-600 outline-none transition-colors bg-transparent" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                  <input type="text" name="subject" value={formData.subject} onChange={handleInputChange} placeholder="Subject" className="w-full px-4 py-3 border-b-2 border-gray-200 focus:border-sky-600 outline-none transition-colors bg-transparent" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Your message</label>
                  <textarea name="message" value={formData.message} onChange={handleInputChange} rows={4} placeholder="Tell me about your area..." className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-sky-600 outline-none transition-colors resize-none"></textarea>
                </div>
              </div>

              {/* File Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Attach images (optional)</label>
                <div className="relative">
                  <input type="file" onChange={handleFileChange} className="hidden" id="file-upload" accept="image/*" multiple />
                  <label htmlFor="file-upload" className="flex items-center justify-center w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-teal-600 transition-colors">
                    <Upload className="w-5 h-5 text-gray-400 mr-2" />
                    <span className="text-gray-600">Choose images to upload</span>
                  </label>
                </div>
                {selectedFiles.length > 0 && (
                  <div className="mt-3 space-y-2">
                    <p className="text-sm text-gray-600">Selected files:</p>
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {selectedFiles.map((file, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded">
                          <span className="text-sm text-gray-700 truncate">{file?.name}</span>
                          <button type="button" onClick={() => removeFile(index)} className="ml-2 text-red-500 hover:text-red-700">
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <button type="button" onClick={handleSubmit} className="w-full bg-orange-600 uppercase text-white py-4 rounded-xl font-semibold hover:bg-[#1a4767] transition-colors shadow-lg">
                Send message
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeComplaint;
