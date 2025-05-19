// components/CardS.jsx
import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const renderStars = (rating) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  const stars = [];

  for (let i = 0; i < fullStars; i++) {
    stars.push(<FaStar key={`full-${i}`} className="text-yellow-500" />);
  }

  if (hasHalfStar) {
    stars.push(<FaStarHalfAlt key="half" className="text-yellow-500" />);
  }

  for (let i = 0; i < emptyStars; i++) {
    stars.push(<FaRegStar key={`empty-${i}`} className="text-yellow-400" />);
  }

  return stars;
};

const CardS = ({ product }) => {
  return (
    <div className="max-w-xs p-3 rounded-xl overflow-hidden hover:shadow-lg bg-white hover:shadow-gray-500 transition-transform ">
      <Link href={`/products/${product._id}`}>
        <img
          className="w-full h-48 object-cover rounded-md mb-4"
          src={product.thumbnail}
          alt={product.title}
        />
        <div className="space-y-2">
          <h2 className="font-bold text-xl text-orange-700">{product.title}</h2>
          {/* <p className="text-sm text-gray-700">{product.description}</p> */}
          <p className="text-sm">
            <span className="font-semibold text-orange-600">Brand:</span>{" "}
            {product.brand}
          </p>
          <p className="text-sm ">
            <span className="font-semibold text-green-700">Price:</span> $
            {product.price}
          </p>
          <div className="flex items-center space-x-1">
            <span className="font-semibold text-yellow-700">Rating:</span>
            {renderStars(product.rating)}
            <span className="text-sm text-gray-600">({product.rating})</span>
          </div>
          
        </div>
      </Link>
      <button
        className="mt-4 w-full bg-blue-400 text-white py-2 px-4 rounded-lg
      hover:scale-105 active:scale-95
      hover:bg-blue-500 transition duration-300 font-semibold"
      >
        Add to Cart 🛒
      </button>
    </div>
  );
};

export default CardS;
