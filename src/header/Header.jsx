import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { MdOutlineShoppingBag } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";
import { BsCart2 } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";
import { Context } from "../context/Context";
const Header = () => {
  const {
    setUser,
    user,
    isLoggedIn,
    cart,
    cartCount,
    setCartCount,
    setIsLoggedIn,
  } = useContext(Context);

  const { pathname } = useLocation();
  let [searchedProducts, setSearchedProducts] = useState([]);

  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/product/getProducts").then((res) =>
      res.json()
    );

    const userLoggedIn = sessionStorage.getItem("isLoggedIn");
    setIsLoggedIn(userLoggedIn);

    setCartCount(() => cart.length);
  }, [cart, setCartCount, setIsLoggedIn]);
 

  console.log("user", user);
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

            <li>
              <Link to="/category">Shop By Category</Link>
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
          {isLoggedIn && user.role === "admin" && (
            <p
              onClick={() => navigate("/adminDashboard")}
              className="text-black cursor-pointer hover:scale-105 hover:text-blue-500 hover:underline"
            >
              Admin Dashboard
            </p>
          )}
          <div
            onClick={() => navigate("/profile/personaldetails")}
            className="text-2xl hover:scale-110 hover:bg-blue-300"
          >
            <CgProfile />
          </div>

          <div className="text-2xl">
            <MdOutlineShoppingBag />
          </div>
          {isLoggedIn && (
            <div
              onClick={() => navigate("/Cart")}
              className="text-2xl relative"
            >
              <BsCart2 />
              <p className="absolute top-[-10px] right-0 text-xs text-black">
                {cartCount}
                {console.log(cartCount)}
              </p>
            </div>
          )}
          {!isLoggedIn && pathname === "/" && (
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

          {}
          {isLoggedIn && pathname === "/" && (
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
          {isLoggedIn && <p className="text-3xl"> </p>}
        </div>
      </header>
    </div>
  );
};

export default Header;
