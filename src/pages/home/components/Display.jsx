import React from "react";
import { useNavigate } from "react-router-dom"; // For routing
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Display = ({ trending, newArrivals, deals }) => {
  const navigate = useNavigate();

  const renderSwiper = (title, products) => (
    <div className="mb-10">
      <h2 className="text-2xl font-bold mb-4 text-orange-600">{title}</h2>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
        navigation
        pagination={{ clickable: true }}
        className="p-2"
      >
        {products.map((product) => (
          <SwiperSlide key={product._id}>
            <div
              className="cursor-pointer bg-white rounded shadow p-2 hover:shadow-lg transition"
              onClick={() => navigate(`/products/${product._id}`)}
            >
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-48 object-cover rounded hover:scale-105 transition duration-300"
              />
              <p className="text-center mt-2 text-sm">{product.title}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {renderSwiper("🔥 Trending Products", trending)}
      {renderSwiper("🆕 New Arrivals", newArrivals)}
      {renderSwiper("💰 Best Deals", deals)}
    </div>
  );
};

export default Display;
