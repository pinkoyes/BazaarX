import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-900 text-white py-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About */}
        <div>
          <h2 className="text-2xl font-bold mb-3">AgoraX</h2>
          <p className="text-gray-400 text-sm">
            A modern marketplace to buy, sell, and connect with your community.
            Discover treasures easily.
          </p>
        </div>

        {/* Quick Links */}
        <div className="hidden md:block">
          <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li className="hover:text-yellow-400 transition">Home</li>
            <li className="hover:text-yellow-400 transition">Login</li>
            <li className="hover:text-yellow-400 transition">Register</li>
            <li className="hover:text-yellow-400 transition">Products</li>
          </ul>
        </div>

        {/* Socials */}
        <div className="flex flex-col items-start md:items-end">
          <h3 className="text-xl font-semibold mb-3">Follow Us</h3>
          <div className="flex space-x-3 mb-3">
            <a
              href="#"
              className="bg-blue-600 p-2 rounded-full hover:bg-blue-500 transition"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              className="bg-blue-400 p-2 rounded-full hover:bg-blue-300 transition"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              className="bg-pink-500 p-2 rounded-full hover:bg-pink-400 transition"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              className="bg-blue-700 p-2 rounded-full hover:bg-blue-600 transition"
            >
              <FaLinkedinIn />
            </a>
          </div>
          <p className="text-gray-500 text-sm text-center md:text-right">
            &copy; {new Date().getFullYear()} AgoraX. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
