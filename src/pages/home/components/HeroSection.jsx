import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import {
  Navigation,
  Pagination,
  Scrollbar,
  Autoplay,
  A11y,
} from "swiper/modules";

import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const HeroSection = () => {
  const heroImages = [
    "/Swipes/img1.jpg",
 
    // Add more image paths here
  ];

  return (
    <div className="innerWrapper background">
      <div className="heroText"></div>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        slidesPerView={1}
        navigation
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
      >
        {heroImages.map((img, idx) => (
          <SwiperSlide key={idx}>
            <div className="w-full h-full">
              <img
                src={img}
                className="w-full h-full object-contain"
                alt={`Slide ${idx + 1}`}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSection;
