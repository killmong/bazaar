// pages/products/[id].jsx
import React, { useEffect, useState } from "react";

import axios from "axios";
import { useParams } from "react-router-dom";
const ProductDetail = () => { 

  const { id } = useParams();
  
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/product/getProduct/${id}`
        );
        setProduct(res.data);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div className="p-4">Loading product details...</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
      <img
        src={product.thumbnail}
        alt={product.title}
        className="w-full max-w-md rounded shadow mb-4"
      />
      <p className="text-lg text-gray-700 mb-2">Brand: {product.brand}</p>
      <p className="text-md text-gray-600 mb-2">Category: {product.category}</p>
      <p className="text-xl font-semibold mb-2">₹ {product.price}</p>
      <p className="text-md text-gray-800 mb-2">{product.description}</p>
      <p className="text-sm text-gray-500 mb-2">Rating: {product.rating} ⭐</p>
      <p className="text-sm text-gray-500 mb-2">Stock: {product.stock}</p>
      <div className="flex flex-wrap gap-2 mt-4">
        {product.images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`img-${index}`}
            className="w-24 h-24 object-cover border rounded"
          />
        ))}
      </div>
    </div>
  );
};

export default ProductDetail;
