import Image from "next/image";
import React from "react";

function WhatWeDo() {
  const whatWeDo = [
    {
      id: 1,
      image: "/images/Legal-Action-&-Complaints.webp",
      title: "Legal Action & Complaints",
      discription:
        "We file RTIs, PILs, and complaints with municipal corporations, RERA, and environmental tribunals to stop ongoing illegal constructions.",
      bgColor: "bg-orange-400",
    },
    {
      id: 2,
      image: "/images/Ground-Surveys-&-Investigations.webp",
      title: "Ground Surveys & Investigations",
      discription:
        "Our teams conduct physical verification of suspicious construction activities and document violations.",
      bgColor: "bg-teal-500",
    },
    {
      id: 3,
      image: "/images/Public-Awareness-Campaigns.jpg",
      title: "Public Awareness Campaigns",
      discription:
        "Through community meetings, digital campaigns, and media outreach, we educate citizens about the dangers of Avaidh Nirman.",
      bgColor: "bg-gray-300",
    },
    {
      id: 4,
      image: "/images/loss-public-land.webp",
      title: "Collaboration with Authorities",
      discription:
        "We partner with civic agencies, resident welfare associations (RWAs), and NGOs to ensure legal follow-up and demolition of illegal structures.",
      bgColor: "bg-gray-700",
    },
  ];
  return (
    <div className="bg-white p-4 md:p-8 mt-2">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mt-10 mb-10 text-center">
          What We Do?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {whatWeDo.map((card) => (
            <div
              key={card.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:-translate-y-2 cursor-pointer group flex"
            >
              {/* Image Section on Left */}
              <div
                className={`${card.bgColor} w-2/3 min-w-[140px] h-auto flex items-center justify-center overflow-hidden`}
              >
                <Image
                  width={100}
                  height={100}
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Content Section on Right */}
              <div className="p-6 flex flex-col justify-center w-2/3">
                <h3 className="text-lg font-bold text-[#1a4767] mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors duration-300">
                  {card.title}
                </h3>
                <p className="text-gray-900 hover:text-gray-800 transition-colors duration-200">
                  {card.discription}
                </p>
              </div>

              {/* Subtle Glow Effect */}
              <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default WhatWeDo;
