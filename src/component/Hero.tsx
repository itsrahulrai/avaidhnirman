import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
// import required modules
import { Pagination } from "swiper/modules";
import Image from "next/image";

export default function Hero() {
  return (
    <>
      <div className="flex flex-col md:flex-row w-full">
        {/* Left Content */}
        <div className="bg-[#235c85] text-center md:text-center border-b-4 md:border-b-0 md:border-r-4 border-white w-full md:w-[35%] p-6 md:py-20 md:px-8 flex flex-col justify-center items-center md:items-center">
          <h1 className="text-white text-4xl md:text-6xl font-bold uppercase leading-tight">
            Stop
            <br />
            Avaidh
            <br />
            Nirman
          </h1>

          <p className="text-white text-base md:text-xl mt-5 mb-5 max-w-[350px]">
            Fighting against illegal construction, preserving public resources,
            and promoting sustainable urban development across India.
          </p>

          <button className="bg-orange-500 text-white px-5 py-2 text-lg uppercase font-medium hover:bg-orange-600 transition-colors">
            Contact us
          </button>
        </div>

        {/* Right Swiper Section */}
        <div className="w-full md:w-[65%]">
          <Swiper
            pagination={{ dynamicBullets: true }}
            modules={[Pagination]}
            className="mySwiper"
          >
            <SwiperSlide>
              <Image
                width={1600}
                height={800}
                src="/images/hero-slider-1.jpg"
                alt="slide 1"
                className="w-full h-full object-cover"
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
                width={1600}
                height={800}
                src="/images/hero-slider-2.webp"
                alt="slide 2"
                className="w-full h-full object-cover"
              />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </>
  );
}
