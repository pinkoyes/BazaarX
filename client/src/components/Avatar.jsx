import { useState, useRef, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { FiLogOut, FiUser } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";

const Avatar = () => {
  const { user, logoutUser } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    logoutUser();
    setDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!user) return null;

  return (
    <div className="relative hidden md:block" ref={dropdownRef}>
      {/* Avatar Circle */}
      <div
        onClick={() => setDropdownOpen((prev) => !prev)}
        className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 text-white font-semibold uppercase cursor-pointer hover:opacity-90 transition"
      >
        {user.fullName ? user.fullName.charAt(0) : "U"}
      </div>

      {/* Dropdown */}
      {dropdownOpen && (
        <div className="absolute right-0 mt-3 w-52 bg-white border border-gray-100 rounded-xl shadow-lg overflow-hidden z-50">
          <div className="p-3 text-sm text-gray-700">
            <p className="font-semibold truncate">{user.fullName || "User"}</p>
            <p className="text-xs text-gray-500 truncate">
              {user.email || "example@email.com"}
            </p>
          </div>
          <hr className="border-gray-100" />
          <NavLink
            to="/profile"
            onClick={() => setDropdownOpen(false)}
            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition"
          >
            <FiUser size={15} /> My Profile
          </NavLink>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition"
          >
            <FiLogOut size={15} /> Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Avatar;
