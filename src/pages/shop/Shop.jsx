import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { FaLongArrowAltRight, FaLongArrowAltLeft } from "react-icons/fa";
import { Context } from "../../context/Context";
import "./Shop.css";
import ProductCard from "../../common/ProductCard";
const Shop = () => {
  const { addToCart } = useContext(Context);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const limit = 10;
  const [skip, setSkip] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:5000/api/product/getProducts", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const fetchedData = await res.json();
      setData(fetchedData);
      console.log(fetchedData);

      setIsLoading(false);
    };
    fetchData();
  }, [skip]);
  console.log(data);

  if (isLoading == true) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center mt-10">
          <div class="newtons-cradle">
            <div class="newtons-cradle__dot"></div>
            <div class="newtons-cradle__dot"></div>
            <div class="newtons-cradle__dot"></div>
            <div class="newtons-cradle__dot"></div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="innerWrapper h-screen">
      <div className="innerWrapper min-h-screen">
        <div className="cardWrapper flex flex-wrap justify-center gap-5">
          {data.map((item) => (
            <ProductCard key={item.id} item={item} addToCart={addToCart} />
          ))}
        </div>
      </div>
      <div className="flex justify-center gap-5">
        <button
          onClick={() => setSkip(skip - limit)}
          disabled={skip === 0}
          className="btn-white   text-center rounded-2xl"
        >
          <span className="text-2xl">
            <FaLongArrowAltLeft />
          </span>
          Previous
        </button>
        <button
          onClick={() => setSkip(skip + 10)}
          className="btn-white text-center rounded-2xl"
        >
          Next{" "}
          <span className="text-2xl">
            <FaLongArrowAltRight />
          </span>
        </button>
      </div>
    </div>
  );
};

export default Shop;
