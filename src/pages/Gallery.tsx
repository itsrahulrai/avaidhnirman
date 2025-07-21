"use client"
import Image from 'next/image';
import React, { useState } from 'react';

const images = [
  '/images/Collaboration-with-Authorities.webp',
  '/images/Environmental-Destruction.webp',
  '/images/Legal-Action-&-Complaints.webp',
  '/images/loss-public-land.webp',
  '/images/Public-Awareness-Campaigns.jpg',
  '/images/public-safty-hazard.webp',
];

const GalleryPage = () => {
  const [selectedImage, setSelectedImage] = useState<string>('');

  return (
    <div className="max-w-7xl mx-auto p-4 mt-12 mb-12">
      <h2 className="text-3xl font-bold mb-4 text-center text-gray-800">Our Gallery</h2>

      {/* Image Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {images.map((img, idx) => (
          <div
            key={idx}
            className="overflow-hidden rounded-lg border-8 border-white shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            <Image
              width={500}
              height={400}
              src={img}
              alt={`gallery-${idx}`}
              className="w-full h-65 object-cover cursor-pointer"
              onClick={() => setSelectedImage(img)}
            />
          </div>
        ))}
      </div>

      {/* Fullscreen Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4 transition-all duration-300 ease-in-out animate-fadeIn">
          <div className="relative max-w-full max-h-full animate-zoomIn">
            {/* Close Button */}
            <button
              onClick={() => setSelectedImage('')}
              className="absolute -top-4 -right-4 bg-white text-black rounded-full p-2 shadow-lg hover:bg-red-600 hover:text-white transition-all z-50"
            >
              &times;
            </button>

            <Image
              width={250}
              height={250}
              src={selectedImage}
              alt="Full View"
              className="max-w-full max-h-screen object-contain rounded-lg border-4 border-white shadow-2xl transition-all duration-300"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryPage;
