import React, { useEffect, useState,useContext } from "react";
import { Link } from "react-router-dom";
import { FaLongArrowAltRight, FaLongArrowAltLeft } from "react-icons/fa";
import {Context} from "../../context/Context";
import "./Shop.css";

const Shop = () => {

  const { user, setUser, isLoggedIn, setIsLoggedIn } = useContext(Context);
  console.log("Shop - User Context:", { user, isLoggedIn }); // Test log

  const [data, setData] = useState({ products: [] });
  const limit = 10;
  const [skip, setSkip] = useState(0);

  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `https://dummyjson.com/products/?skip=${skip}&limit=${limit}&`
      );
      const fetchedData = await res.json();
      setData(fetchedData);
    };
    fetchData();
  }, [skip]);

  const products = data.products;

  const addToCart = () => {
   
    
  };
  return (
    <div className="innerWrapper h-screen">
      <div className="cardWrapper  flex flex-wrap justify-center gap-5">
        {products.length > 0 ? (
          products.map((item) => (
            <div>
              <div
                key={item.id}
                className=" pd-5 rounded-4xl bg-violet-400 border-0 w-[250px] h-[300px] "
              >
                <div className="hover:scale-105 w-[250px] h-[300px] b ">
                  <img
                    className="w-full h-full object-contain"
                    src={item.images[0]}
                    alt={item.title}
                  />
                </div>
              </div>

              <div className="flex flex-col pd-5 w-[250px] h-auto justify-between">
                <h3 className="text-black text-center">{item.title}</h3>

                <h3 className="text-gray-600 text-center line-through ">
                  {" "}
                  $ {item.price}
                </h3>
                <h3 className="text-black flex justify-center text-center">
                  <span className="capitalize text-2xl text-black ">$</span>
                  <p className="text-2xl text-lime-500">
                    {" "}
                    {item.discountPercentage}
                  </p>
                </h3>
                <Link
                  key={item.id}
                  to="#"
                  onClick={addToCart}
                  className=" btn-black text-center rounded-2xl"
                >
                  Add to Cart
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p>Loading products...</p>
        )}
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
