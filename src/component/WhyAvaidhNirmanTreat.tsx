import Image from 'next/image';
import React from 'react';

const WhyAvaidhNirmanTreat = () => {
  const cardData = [
    {
      id: 1,
      image: "/images/public-safty-hazard.webp",
      title: "Public Safety Hazard",
      discription: "Unauthorized buildings often ignore structural safety norms, putting lives at risk in case of natural calamities like earthquakes or fire.",
      bgColor: "bg-orange-400"
    },
    {
      id: 2,
      image: "/images/Environmental-Destruction.webp",
      title: "Environmental Destruction",
      discription: "Illegal construction leads to deforestation, destruction of wetlands, blockage of natural drainage systems, and increased pollution.",
      bgColor: "bg-teal-500"
    },
    {
      id: 3,
      image: "/images/trafic-infrastructure.webp",
      title: "Traffic and Infrastructure",
      discription: "Overbuilt and unauthorized colonies burden civic infrastructure—causing traffic congestion, water shortages, and power failures.",
      bgColor: "bg-gray-300"
    },
    {
      id: 4,
      image: "/images/loss-public-land.webp",
      title: "Loss of Public Land",
      discription: "Public parks, roads, footpaths, and community spaces are illegally occupied, diminishing the quality of life.",
      bgColor: "bg-gray-700"
    }
  ];

  return (
    <>
      <div className=" bg-slate-100 p-4 md:p-8 mt-10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mt-8 mb-10 text-center">
            Why Avaidh Nirman is a Threat?
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-18">
            {cardData.map((card) => (
              <div key={card.id}
                className="bg-white rounded-lg shadow-lg text-center overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:-translate-y-2 cursor-pointer group"
              >
                {/* Image Section */}
                <div className={`${card.bgColor} h-48 flex items-center justify-center relative overflow-hidden`}>
                  <div className="relative w-full h-full overflow-hidden group-hover:scale-110 transition-transform duration-500">
                    <Image
                      width={100}
                      height={100}
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-cover rounded-lg shadow-md"
                    />
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6">
                  {/* Title */}
                  <h3 className="text-lg font-bold text-[#1a4767] mb-3 line-clamp-2 group-hover:text-orange-600 transition-colors duration-300">
                    {card.title}
                  </h3>

                  {/* Description/Meta */}
                  <div className="space-y-2">
                    <p className="text-gray-900  hover:text-gray-800 transition-colors duration-200">
                      {card.discription}
                    </p>

                  </div>

                  {/* Hover Effect Line */}

                </div>

                {/* Subtle Glow Effect on Hover */}
                <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"></div>

              </div>
            ))}
          </div>
        </div>
      </div>

    </>
  );
};

export default WhyAvaidhNirmanTreat;