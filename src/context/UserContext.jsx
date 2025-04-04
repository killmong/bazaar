import React, { useState } from "react";
import { Context } from "./Context";

const UserContext = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cart, setCart] = useState([]);

  const value = {
    user,
    setUser,
    isLoggedIn,
    setIsLoggedIn,
    cart,
    setCart,
  };
  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default UserContext;
