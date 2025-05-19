import React, { useState, useEffect } from "react";
import { Context } from "./Context";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserContext = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = sessionStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [isLoggedIn, setIsLoggedIn] = useState(!!user);
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  // Load cart on mount
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      try {
        const parsedCart = JSON.parse(storedCart);
        setCart(parsedCart);
        setCartCount(parsedCart.length);
      } catch (err) {
        console.error("Error parsing cart from localStorage", err);
      }
    }
  }, []);

  const notify = (type, message) => {
    toast[type](message, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const addToCart = async (id, quantity) => {
    if (!user) {
      notify("error", "User not logged in.");
      return;
    }

    const existingItem = cart.find((item) => item.id === id);

    try {
      if (existingItem) {
        // Update product quantity in cart
        const res = await fetch(`http://localhost:5000/api/cart/${user._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id, quantity }),
        });

        const data = await res.json();

        if (res.ok) {
          const updatedCart = cart.map((item) =>
            item.id === id ? { ...item, quantity } : item
          );
          setCart(updatedCart);
          setCartCount(updatedCart.length);
          localStorage.setItem("cart", JSON.stringify(updatedCart));
          localStorage.setItem("cartCount", updatedCart.length);
          notify("success", "Product quantity updated in cart");
        } else {
          notify("error", data.message || "Failed to update cart");
        }
      } else {
        // Add product to cart
        const res = await fetch("http://localhost:5000/api/cart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: user._id,
            product: { id, quantity },
          }),
        });

        const data = await res.json();

        if (res.ok && data.product) {
          const updatedCart = [...cart, data.product];
          setCart(updatedCart);
          setCartCount(updatedCart.length);
          localStorage.setItem("cart", JSON.stringify(updatedCart));
          localStorage.setItem("cartCount", updatedCart.length);
          notify("success", "Product added to cart");
        } else {
          notify("error", data.message || "Failed to add to cart");
        }
      }
    } catch (err) {
      console.error("Error:", err);
      notify("error", "Something went wrong while adding to cart");
    }
  };

  const value = {
    user,
    setUser,
    isLoggedIn,
    setIsLoggedIn,
    cart,
    setCart,
    addToCart,
    cartCount,
    setCartCount,
  };

  return (
    <Context.Provider value={value}>
      {children}
      <ToastContainer />
    </Context.Provider>
  );
};

export default UserContext;
