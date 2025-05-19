import React, { useState, useEffect } from "react";
import HeroSection from "./components/HeroSection";
import Display from "./components/Display";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/product/getProducts");
        const data = await res.json();
        console.log(data); // this should log an array
        setProducts(data); // ✅ directly use the array
      } catch (err) {
        console.log("Fetch error:", err);
      }
    };

    fetchProducts();
  }, []);

  const getRandomSubset = (arr, count) =>
    arr.sort(() => 0.5 - Math.random()).slice(0, count);

  if (products.length === 0) {
    return <div className="p-6 text-center">Loading products...</div>;
  }

  return (
    <div>
      <HeroSection />
      <Display
        trending={getRandomSubset(products, 8)}
        newArrivals={getRandomSubset(products, 8)}
        deals={getRandomSubset(products, 8)}
      />
    </div>
  );
};

export default Home;
