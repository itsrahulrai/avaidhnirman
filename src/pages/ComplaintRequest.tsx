"use client"
import React from "react";
import { useState } from "react";
import { Upload, X, AlertCircle } from "lucide-react";
import Image from "next/image";


interface ErrorInterface {
  fullName?: string;
  email?: string;
  phone?: string;
  location?: string;
  subject?: string;
  message?: string;
  name?: string
}
interface FormData {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  subject: string;
  message: string;
}

export default function ComplaintRequestPage() {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    subject: "",
    message: "",
  });

  const [files, setFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<ErrorInterface>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors: ErrorInterface = {};

    // Full Name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = "Full name must be at least 2 characters";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Phone validation
    const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    // Location validation
    if (!formData.location.trim()) {
      newErrors.location = "Location is required";
    }

    // Subject validation
    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    } else if (formData.subject.trim().length < 5) {
      newErrors.subject = "Subject must be at least 5 characters";
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));


    if (errors[name as keyof ErrorInterface]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    const validFiles = selectedFiles.filter((file) => {
      const isImage = file.type.startsWith("image/");
      const isValidSize = file.size <= 10 * 1024 * 1024; // 10MB limit
      return isImage && isValidSize;
    });

    if (validFiles.length !== selectedFiles.length) {
      alert("Please select only image files under 10MB each");
    }

    setFiles((prev) => [...prev, ...validFiles].slice(0, 5)); // Max 5 files
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      alert("Complaint submitted successfully! We'll get back to you soon.");
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        location: "",
        subject: "",
        message: "",
      });
      setFiles([]);
      setIsSubmitting(false);
    }, 2000);
  };

  const inputClass = `w-full bg-transparent border-b border-gray-600 py-3 px-0 text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none transition-colors duration-300 ${errors ? "border-gray-500" : ""
    }`;
  const textareaClass = `w-full bg-transparent border border-gray-600 rounded-lg py-3 px-4 text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none transition-colors duration-300 resize-none ${errors ? "border-gray-500" : ""
    }`;

  return (
    <div className="bg-[#1a4767] py-8 px-4 ">
      <div className="max-w-6xl mx-auto mt-12 mb-12">
        <div className="grid lg:grid-cols-2 gap-15 items-center">
          {/* Info Section */}
          <div className="order-1 lg:order-2 text-center lg:text-left">
            <div className="relative">
              <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-8">
                File a
                <br />
                <span className="bg-gradient-to-r from-orange-500 to-blue-500 bg-clip-text text-transparent">
                  Complaint
                </span>
              </h1>

              <div className="absolute -top-4 -left-4 w-32 h-32 border-2 border-blue-500 rounded-full opacity-20"></div>
            </div>

            <p className="text-gray-300 text-lg leading-relaxed max-w-md mx-auto lg:mx-0">
              We take your concerns seriously and are committed to resolving
              them promptly. Please provide detailed information about your
              complaint so we can assist you better.
            </p>

            <div className="mt-8 space-y-4 text-gray-400">
              <div className="flex items-center justify-center lg:justify-start">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                <span>Response within 24-48 hours</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start">
                <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                <span>Confidential and secure handling</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                <span>Professional resolution process</span>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="order-2 lg:order-1 ">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#1f5175] p-10 rounded-lg">
              {/* Full Name */}
              <div>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className={inputClass}
                />
                {errors.fullName && (
                  <div className="flex items-center mt-2 text-gray-400 text-sm">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.fullName}
                  </div>
                )}
              </div>

              {/* Email */}
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={inputClass}
                />
                {errors.email && (
                  <div className="flex items-center mt-2 text-red-400 text-sm">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.email}
                  </div>
                )}
              </div>

              {/* Phone */}
              <div>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={inputClass}
                />
                {errors.phone && (
                  <div className="flex items-center mt-2 text-red-400 text-sm">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.phone}
                  </div>
                )}
              </div>

              {/* Location */}
              <div>
                <input
                  type="text"
                  name="location"
                  placeholder="Location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className={inputClass}
                />
                {errors.location && (
                  <div className="flex items-center mt-2 text-red-400 text-sm">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.location}
                  </div>
                )}
              </div>

              {/* Subject */}
              <div className="md:col-span-2">
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className={inputClass}
                />
                {errors.subject && (
                  <div className="flex items-center mt-2 text-red-400 text-sm">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.subject}
                  </div>
                )}
              </div>

              {/* Message */}
              <div className="md:col-span-2">
                <textarea
                  name="message"
                  placeholder="Share your complaint details"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className={textareaClass}
                />
                {errors.message && (
                  <div className="flex items-center mt-2 text-red-400 text-sm">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.message}
                  </div>
                )}
              </div>

              {/* File Upload */}
              <div className="md:col-span-2">
                <label className="block text-gray-300 text-sm mb-3">
                  Upload Images (Optional - Max 5 files, 10MB each)
                </label>
                <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center hover:border-gray-500 transition-colors">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-400">Click to upload images</p>
                  </label>
                </div>

                {/* File Preview */}
                {files.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
                    {files.map((file, index) => (
                      <div key={index} className="relative group">
                        <Image
                          width={20}
                          height={20}
                          src={URL.createObjectURL(file)}
                          alt={`Upload ${index + 1}`}
                          className="w-full h-20 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-4 h-4" />
                        </button>
                        <p className="text-xs text-gray-400 mt-1 truncate">
                          {file?.name}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="md:col-span-2">
                <button
                  type="button"
                  onClick={() => handleSubmit}
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-orange-500 to-blue-500 text-white py-3 px-6 rounded-lg font-semibold hover:from-orange-600 hover:to-blue-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
                >
                  {isSubmitting ? "SUBMITTING..." : "SUBMIT COMPLAINT"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
