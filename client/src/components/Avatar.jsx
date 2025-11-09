import { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
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

  const avatarInitial =
    user?.fullName && user.fullName.trim() !== ""
      ? user.fullName.charAt(0).toUpperCase()
      : "U";

  return (
    <div className="relative hidden md:block" ref={dropdownRef}>
      {/* Avatar */}
      <div
        onClick={() => setDropdownOpen((prev) => !prev)}
        className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 text-white font-semibold uppercase cursor-pointer hover:opacity-90 transition"
      >
        {user.profileImage ? (
          <img
            src={user.profileImage}
            alt="Profile"
            className="w-full h-full object-cover rounded-full border border-blue-200"
            onError={(e) => {
              e.target.onerror = null;
              e.target.style.display = "none";
            }}
          />
        ) : (
          avatarInitial
        )}
      </div>

      {/* Dropdown Menu */}
      {dropdownOpen && (
        <div className="absolute right-0 mt-3 w-56 bg-white border border-gray-100 rounded-xl shadow-lg overflow-hidden z-50">
          <div className="p-4 text-sm text-gray-700">
            <div className="flex items-center gap-3">
              {user.profileImage ? (
                <img
                  src={user.profileImage}
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover border border-gray-200"
                />
              ) : (
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 text-white font-semibold uppercase">
                  {avatarInitial}
                </div>
              )}
              <div className="flex flex-col">
                <p className="font-semibold truncate">
                  {user.fullName || "User"}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {user.email || "example@email.com"}
                </p>
              </div>
            </div>
          </div>

          <hr className="border-gray-100" />

          <NavLink
            to="/profile"
            onClick={() => setDropdownOpen(false)}
            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 transition cursor-pointer"
          >
            <FiUser size={15} /> My Profile
          </NavLink>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition cursor-pointer"
          >
            <FiLogOut size={15} /> Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Avatar;
