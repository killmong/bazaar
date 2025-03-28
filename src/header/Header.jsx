import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { MdOutlineShoppingBag } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";

const Header = () => {
  const category = [
    {
      title: "Grocery",
      slug: "grocery",
    },
    {
      title: "Beauty",
      slug: "beauty",
    },
    { title: "smartphones", slug: "smartphones" },
    {
      title: "Home Decoration",
      slug: "home-decoration",
    },
    {
      title: "Fragrances",
      slug: "fragrances",
    },

    {
      title: "Furniture",
      slug: "furniture",
    },

    {
      title: "tops",
      slug: "tops",
    },
  ];

  useEffect(() => {
    fetch("https://dummyjson.com/products/categories")
      .then((res) => res.json())
      .then(console.log);
  }, []);

  const [isHovered, setIsHovered] = useState(false);
  return (
    <div className="wrapper">
      <div className=" flex md:flex-row flex-col justify-between">
        <nav>
          <ul className="list-none flex ">
            <li>
              <Link to="/shop">Shop</Link>
            </li>

            <li className="parent ">
              <p
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="relative  flex pd-2  "
              >
                Categories{" "}
                <span
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  className="text-xl  parent  absolute right-[-20px] bottom-1"
                >
                  <MdKeyboardArrowDown />
                </span>
              </p>
              <div
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="   child w-[400px] pd-1 h-auto  "
              >
                {isHovered && (
                  <ul className="links">

                    {category.map((item) => (
                    <li key={item.slug} ><Link to={`/category/${item.slug}`}>{item.title}</Link> </li>
                    ))}
                  </ul>
                )}
              </div>
            </li>

            <li>
              <Link to="">Contact</Link>
            </li>

            <li>
              <Link>Reviews</Link>
            </li>
          </ul>
        </nav>
        <div className="w-[100px] h-[50px]">
          <a href="/">
            <img className="w-[50px] h-auto" src="/logo.png" alt="" />
          </a>
        </div>
        <div className="flex flex-row gap-4">
          <div className="text-2xl">
            <CiSearch />
          </div>
          <div className="text-2xl">
            <CgProfile />
          </div>

          <div className="text-2xl">
            <MdOutlineShoppingBag />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
