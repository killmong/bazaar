import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { MdOutlineShoppingBag } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";
import { BsCart2 } from "react-icons/bs";

import { useLocation } from "react-router-dom";
import { Context } from "../context/Context";

const Header = () => {
  const { user, setUser, isLoggedIn, setIsLoggedIn } = useContext(Context);
  const { pathname } = useLocation();
  let [searchedProducts, setSearchedProducts] = useState([]);

  const [query, setQuery] = useState("");
  function handleSearch(e) {
    const searchValue = e.target.value;
    console.log(searchValue);
    setQuery(searchValue);
    const fetchData = async () => {
      const response = await fetch(
        `https://dummyjson.com/products/search?q=${query}&limit=8&skip=0`
      );
      const data = await response.json();
      setSearchedProducts(data.products);
      console.log(searchedProducts);
    };
    fetchData();
  }

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
    fetch("https://dummyjson.com/products/categories").then((res) =>
      res.json()
    );
  }, []);

  const [isHovered, setIsHovered] = useState(false);
  return (
    <div className="wrapper sticky top-0 w-full bg-white z-50 shadow-md   ">
      <header className=" flex md:flex-row flex-col justify-between">
        <div className="w-[100px] h-[50px]">
          <a href="/">
            <img className="w-[50px] h-auto" src="/logo.png" alt="" />
          </a>
        </div>
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
                      <li key={item.slug}>
                        <Link to={`/category/${item.slug}`}>{item.title}</Link>{" "}
                      </li>
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
        <div className="flex  flex-row items-center gap-4">
          {pathname === "/shop" && (
            <div className="text-2xl search relative border rounded-3xl border-black flex">
              <CiSearch className="centre " />
              <input
                className="w-[200px] h-auto border-0 text-base outline-none "
                type="text"
                placeholder="Search..."
                value={query}
                onChange={handleSearch}
              />

              <div className="searchBox bg-white absolute top-12  right-0 z-10">
                <ul className="links">
                  {searchedProducts.length > 0 &&
                    searchedProducts.map((item) => (
                      <Link
                        to={"/"}
                        className="flex hover:scale-x-105"
                        key={item.id}
                      >
                        <img src={item.thumbnail} alt="" className="w-15" />
                        <li className="text-black  text-center">
                          <p>{item.title}</p>
                        </li>
                      </Link>
                    ))}
                </ul>
              </div>
            </div>
          )}
          {pathname !== "/" && (
            <div className="text-2xl hover:scale-110 hover:bg-blue-300">
              <CgProfile />
            </div>
          )}

          {/* <div className="text-2xl">
            <MdOutlineShoppingBag />
          </div>

          <div className="text-2xl relative">
            <BsCart2 />
            <p className="absolute top-[-10px] right-0 text-xs text-black">
              {" "}
              0
            </p>
          </div> */}

          {pathname === "/" && (
            <div className="flex gap-2">
              <Link to={"/login"} className="btn btn-black">
                Login
              </Link>
              <Link
                className="btn text-orange-400 border hover:bg-amber-400 hover:text-white hover:scale-105 border-amber-400"
                to={"/signup"}
              >
                Signup
              </Link>
            </div>
          )}

          {console.log("User:", user)}
          {console.log("Is Logged In:", isLoggedIn)}
          {pathname == "/" && (
            <div className="flex gap-2">
              <Link
                to={"/login"}
                className="btn btn-black"
                onClick={() => {
                  setUser(sessionStorage.removeItem("user"));
                  setIsLoggedIn(sessionStorage.removeItem("isLoggedIn"));
                }}
              >
                Logout
              </Link>
            </div>
          )}
        </div>
      </header>
    </div>
  );
};

export default Header;
