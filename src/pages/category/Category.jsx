import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
const Category = () => {
  const [data, setData] = useState([]);

  const { slug } = useParams();
  useEffect(() => {
    const fetchData = () => {
      fetch(`https://dummyjson.com/products/category/${slug}`)
        .then((res) => res.json())
        .then(setData);
    };
    fetchData();
  }, [slug]);

  console.log(data);

  const products = data.products || [];

  return (
    <div>
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
                    <motion.img
                      whileHover={{
                        scale: 1.2,
                        transition: { duration: 1 },
                      }}
                      whileTap={{ scale: 0.9 }}
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
                  <h3 className="text-black text-center">
                    <span className="capitalize text-black text-xl">
                      dicounted price $
                    </span>
                    {item.discountPercentage}
                  </h3>
                  <Link to="#" className=" btn-black text-center rounded-2xl">
                    Add to Cart
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p>Loading products...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Category;
