import React from "react";
import { Link } from "react-router-dom";

const QuickLinksAlt = () => {
  const links = [
    { path: "/", label: "Home" },
    { path: "/categories", label: "Categories" },
    { path: "/wishlist", label: "Wishlist" },
    { path: "/cart", label: "Cart" },
    { path: "/account", label: "My Account" },
  ];

  return (
    <nav className="quick-links text-center my-6">
      <h5 className="text-lg font-semibold text-white mb-3">
        ShopHive Quick Links
      </h5>
      <ul className="list-inline flex justify-center flex-wrap gap-4 text-gray-300">
        {links.map((link, index) => (
          <li key={index} className="list-inline-item">
            <Link
              to={link.path}
              className="hover:underline hover:text-white transition"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default QuickLinksAlt;
