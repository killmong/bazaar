import React from "react";
import { Link } from "react-router-dom";
import Cards from "./components/Cards";
import QuickLinks from "./components/QuickLinks";
import QuickLinksAlt from "./components/OurLinks";
import SocialLinks from "./components/SocialLinks";
import USP from "./components/USP";

const Footer = () => {
  const benefits = [
    { id: 1, src: "/Free-Delivery.svg", label: "Free Delivery" },
    { id: 2, src: "svg/Replacement-icon.svg", label: "Easy Replacement" },
    { id: 3, src: "svg/cash-Delivery.svg", label: "Cash on Delivery" },
    { id: 4, src: "svg/Original-Products.svg", label: "Original Products" },
  ];

  return (
    <footer className="bg-[#2D2F36] text-[#ecf0f4] font-sans">
      {/* Top Benefits Icons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 px-6 py-8 text-center">
        {benefits.map((item) => (
          <div key={item.id} className="flex flex-col items-center gap-2 services">
            <img src={item.src} alt={item.label} className="h-10 hover:scale-110 transition" />
            <p className="text-sm font-medium">{item.label}</p>
          </div>
        ))}
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10 border-t border-gray-600">
        {/* Social Section */}
        <div className="space-y-6">
          <h4 className="text-xl font-semibold text-[#F97316]">Connect With Us</h4>
          <SocialLinks />
          <USP />
        </div>

        {/* Quick Links */}
        <div className="space-y-6">
          <h4 className="text-xl font-semibold text-[#F97316]">Quick Links</h4>
          <QuickLinks />
        </div>

        {/* Our Links */}
        <div className="space-y-6">
          <h4 className="text-xl font-semibold text-[#F97316]">Explore</h4>
          <QuickLinksAlt />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-600 px-6 py-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400 gap-4">
        <div className="flex flex-col sm:flex-row gap-4 text-center md:text-left">
          <p>© 2025 ShopHive. All rights reserved.</p>
          <Link to="/privacy" className="animated-underline">Privacy Policy</Link>
          <Link to="/terms" className="animated-underline">Terms of Service</Link>
        </div>
        <Cards />
      </div>
    </footer>
  );
};

export default Footer;
