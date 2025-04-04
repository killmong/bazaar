import React from "react";
import { useParams } from "react-router-dom";
const Product = () => {
  const { id, name } = useParams();
  console.log(id, name);
  return (
    <div>
      <h1 className="text-3xl font-bold text-center">Product</h1>
      <h2 className="text-2xl font-bold text-center">{name}</h2>
      <h3 className="text-xl font-bold text-center">{id}</h3>

      <p>Hello</p>
    </div>
  );
};

export default Product;
