import React from 'react';
import { BsBuildingGear } from 'react-icons/bs';
import { FiUser } from 'react-icons/fi';
import { LiaDonateSolid } from 'react-icons/lia';

const GetInvoled = () => {
  const cards = [
    {
      id: 1,
      icon: <FiUser className="w-6 h-6 text-[#1a4767]" />,
      title: 'Become a Member',
      description:
        'Join the morcha as a volunteer, advisor, or local coordinator in your city or district.',
    },
    {
      id: 2,
      icon: <BsBuildingGear className="w-6 h-6 text-[#1a4767]" />,
      title: 'Report Illegal Construction',
      description:
        'Have you seen suspicious construction? Report it to us confidentially. We’ll take the next steps legally and ethically.',
    },
    {
      id: 3,
      icon: <LiaDonateSolid className="w-6 h-6 text-[#1a4767]" />,
      title: 'Donate',
      description:
        'Support our legal campaigns, awareness drives, and public interest litigation efforts.',
    },
  ];

  return (
    <div
      className="relative bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/images/get-invold-bg.webp')",
      }}
    >
      {/* Dark overlay */}
      {/* <div className="absolute inset-0 bg-black bg-opacity-90"></div> */}

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-16">
        <div className="flex flex-col items-end gap-6 sm:gap-8">
          {cards.map((card) => (
            <div
              key={card.id}
              className="bg-white rounded-lg shadow-md p-5 max-w-md w-full sm:w-[80%] md:w-[60%] lg:w-[40%] flex items-start gap-4"
            >
              {/* Icon */}
              <div className="flex-shrink-0">{card.icon}</div>

              {/* Text */}
              <div>
                <h3 className="text-[#1a4767] font-bold text-lg mb-1">
                  {card.title}
                </h3>
                <p className="text-gray-900">{card.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GetInvoled;
