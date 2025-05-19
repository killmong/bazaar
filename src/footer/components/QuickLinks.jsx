import React from "react";
import { Link } from "react-router-dom";

const QuickLinks = () => {
  return (
    <div className="quick-links">
      <h5 className="pd1">Quick Links</h5>
      <ul className="list-unstyled text-gray-200  flex flex-col gap-2 ">
        <li className="text-gray-300 hover:text-white transition">
          <Link to="/">Home</Link>
        </li>
        <li className="text-gray-300 hover:text-white transition">
          <Link to="/shop">Shop</Link>
        </li>
        <li className="text-gray-300 hover:text-white transition">
          <Link to="/about">About Us</Link>
        </li>
        <li className="text-gray-300 hover:text-white transition">
          <Link to="/contact">Contact</Link>
        </li>
        <li className="text-gray-300 hover:text-white transition">
          <Link to="/faq">FAQs</Link>
        </li>
        <li className="text-gray-300 hover:text-white transition">
          <Link to="/terms">Terms & Conditions</Link>
        </li>
      </ul>
    </div>
  );
};

export default QuickLinks;
