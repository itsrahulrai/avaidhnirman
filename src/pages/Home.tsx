"use client";
import AboutHome from "@/component/AboutHome";
import GetInvoled from "@/component/GetInvoled";
import Hero from "@/component/Hero";
import HomeComplaint from "@/component/HomeComplaint";
import WhatWeDo from "@/component/WhatWeDo";
import WhyAvaidhNirmanTreat from "@/component/WhyAvaidhNirmanTreat";
import React from "react";

function HomePage() {
  return (
    <>
      <div>
        <Hero />
        <AboutHome />
        <WhyAvaidhNirmanTreat />
        <WhatWeDo />
        <GetInvoled />
        {/* success story */}

        <div className="flex flex-col md:flex-row w-full items-center mt-10 mb-10">
          {/* Left Content */}
          <div className="text-center md:text-center border-b-4 md:border-b-0 md:border-r-4 border-white w-full md:w-[35%] p-6 md:py-20 md:px-8 flex flex-col justify-center items-center md:items-center">
            <h2 className="text-[#111] text-4xl md:text-6xl font-bold uppercase leading-tight">
              Success Stories
            </h2>
          </div>

          {/* Right Swiper Section */}
          <div className="w-full md:w-[65%]">
            <div className="flex flex-col md:flex-row w-[100%] h-full justify-center gap-4 p-6 pr-24">
              <div className="w-[100%] md:w-[33%] xl:h-[210px] md:h-[300px] bg-blue-100 p-4 rounded-lg flex flex-col items-center justify-center text-center">
                <span className='w-[70px] h-[100px] rounded-full bg-orange-600 text-3xl text-gray-50 font-bold mb-3 mt-2 items-center p-4'>1</span>
                <h3 className="font-bold text-[#235c85] text-xl uppercase">Delhi Case</h3>
                <p>Our legal intervention prevented illegal construction on a designated green belt in Delhi, restoring the area for public use.</p>
              </div>

              <div className="w-[100%] md:w-[33%] xl:h-[210px] md:h-[300px] bg-blue-100 p-7 rounded-lg flex flex-col items-center justify-center text-center">
              <span className='w-[70px] h-[100px] rounded-full bg-orange-600 text-3xl text-gray-50 font-bold mb-3 mt-2 items-center p-4'>2</span>
                <h3 className="font-bold text-[#235c85] text-xl uppercase">Uttarakhand Hills</h3>
                <p>In 2023, we stopped unauthorized commercial development in a sensitive ecological zone.</p>
              </div>  

              <div className="w-[100%] md:w-[33%] xl:h-[210px] md:h-[300px] bg-blue-100 p-6 rounded-lg flex flex-col items-center justify-center text-center">
              <span className='w-[70px] h-[100px] rounded-full bg-orange-600 text-3xl text-gray-50 font-bold mb-3 mt-2 items-center p-4'>3</span>
                <h3 className="font-bold text-[#235c85] text-xl uppercase">High Court Victory</h3>
                <p>Multiple court rulings in favor of ANVM have set precedents for stricter action on illegal builders.</p>
              </div>
              
            </div>
          </div>
        </div>
      </div>

      {/* complaint form */}

      <HomeComplaint />
    </>
  );
}

export default HomePage;
