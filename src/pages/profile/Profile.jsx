import React, { useContext, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import PersonalDetails from "./components/PersonalDetails";
import BankDetails from "./components/BankDetails";
import Address from "./components/Address";
import { Context } from "../../context/Context";
const Profile = () => {
  const { slug } = useParams();
  const { user } = useContext(Context);

  const { id, firstName, lastName, maidenName, age, email, address } =
    user || {}; // Add `|| {}` to prevent destructuring null on first render

  const renderTab = () => {
    switch (slug) {
      case "personal":
        return <PersonalDetails />;
      case "bank":
        return <BankDetails />;
      case "address":
        return <Address />;
      case "orders":
        return <Orders />;
      default:
        return <PersonalDetails />;
    }
  };

  const activeClass =
    "inline-block p-4 text-blue-600 bg-gray-100 rounded-t-lg font-semibold";
  const inactiveClass = "inline-block p-4 rounded-t-lg hover:text-blue-500";

  return (
    <div className="flex flex-col items-center">
      <ul className="flex flex-wrap justify-center text-sm font-medium text-center text-gray-800 border-b dark:text-gray-400">
        <li className="me-2">
          <NavLink
            to="/profile/personal"
            className={({ isActive }) =>
              isActive ? activeClass : inactiveClass
            }
          >
            Personal Details
          </NavLink>
        </li>
        <li className="me-2">
          <NavLink
            to="/profile/bank"
            className={({ isActive }) =>
              isActive ? activeClass : inactiveClass
            }
          >
            Bank Details
          </NavLink>
        </li>
        <li className="me-2">
          <NavLink
            to="/profile/address"
            className={({ isActive }) =>
              isActive ? activeClass : inactiveClass
            }
          >
            Address
          </NavLink>
        </li>
        <li className="me-2">
          <NavLink
            to="/profile/orders"
            className={({ isActive }) =>
              isActive ? activeClass : inactiveClass
            }
          >
            Orders
          </NavLink>
        </li>
      </ul>

      <div className="w-full p-4">{renderTab()}</div>
    </div>
  );
};

export default Profile;
