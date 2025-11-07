import { motion, AnimatePresence } from "framer-motion";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  FiX,
  FiUser,
  FiShoppingCart,
  FiHome,
  FiLogOut,
  FiPackage,
  FiBarChart2,
} from "react-icons/fi";
import { useEffect, useRef } from "react";

const Sidebar = ({ isOpen, onClose }) => {
  const { user, logoutUser } = useAuth();
  const sidebarRef = useRef(null);

  const activeLink =
    "flex items-center gap-3 text-blue-600 font-semibold bg-blue-50 rounded-lg px-5 py-2.5 transition";
  const normalLink =
    "flex items-center gap-3 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg px-5 py-2.5 transition";

  const handleLogout = () => {
    logoutUser();
    onClose();
  };

  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.aside
            ref={sidebarRef}
            className="fixed top-0 left-0 z-50 h-screen w-[72%] max-w-sm bg-white shadow-xl flex flex-col overflow-hidden rounded-r-md"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 85, damping: 18 }}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <Link
                to="/"
                onClick={onClose}
                className="flex items-center gap-2 group"
              >
                <img
                  src="https://i.pinimg.com/736x/2b/7f/9e/2b7f9eddd519169ca29481f370667a52.jpg"
                  alt="BazaarX Logo"
                  className="w-10 h-10 rounded-full border border-gray-200 object-cover group-hover:scale-105 transition"
                />
                <span className="text-xl font-bold text-blue-600 tracking-tight group-hover:text-blue-700">
                  BazaarX
                </span>
              </Link>
              <button
                onClick={onClose}
                className="p-2 rounded-md hover:bg-gray-100 transition"
              >
                <FiX size={22} className="text-gray-700" />
              </button>
            </div>
            <nav className="flex flex-col px-4 py-5 space-y-2 overflow-y-auto grow text-[1rem]">
              <NavLink
                to="/home"
                onClick={onClose}
                className={({ isActive }) =>
                  isActive ? activeLink : normalLink
                }
              >
                <FiHome size={18} /> Home
              </NavLink>
              <NavLink
                to="/seller-dashboard"
                onClick={onClose}
                className={({ isActive }) =>
                  isActive ? activeLink : normalLink
                }
              >
                <FiBarChart2 size={18} /> Seller Dashboard
              </NavLink>
              <NavLink
                to="/my-orders"
                onClick={onClose}
                className={({ isActive }) =>
                  isActive ? activeLink : normalLink
                }
              >
                <FiPackage size={18} /> My Orders
              </NavLink>
              <NavLink
                to="/cart"
                onClick={onClose}
                className={({ isActive }) =>
                  isActive ? activeLink : normalLink
                }
              >
                <FiShoppingCart size={18} /> Cart
              </NavLink>
              <hr className="border-gray-200 my-3" />
              {!user ? (
                <>
                  <NavLink
                    to="/auth/login"
                    onClick={onClose}
                    className={({ isActive }) =>
                      isActive ? activeLink : normalLink
                    }
                  >
                    Login
                  </NavLink>
                  <NavLink
                    to="/auth/register"
                    onClick={onClose}
                    className={({ isActive }) =>
                      isActive ? activeLink : normalLink
                    }
                  >
                    Register
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink
                    to="/profile"
                    onClick={onClose}
                    className={({ isActive }) =>
                      isActive ? activeLink : normalLink
                    }
                  >
                    <FiUser size={18} /> My Profile
                  </NavLink>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 text-left text-red-600 font-medium hover:bg-red-50 px-5 py-2.5 rounded-lg transition"
                  >
                    <FiLogOut size={18} /> Logout
                  </button>
                </>
              )}
            </nav>
            {user && (
              <div className="px-6 py-3 border-2 border-gray-300 rounded-md bg-gray-50">
                <p className="font-semibold text-gray-800 truncate">
                  {user.fullName}
                </p>
                <p className="text-xs text-gray-500 truncate">{user.email}</p>
              </div>
            )}
            <div className="px-6 py-3 border-t border-gray-100 text-xs text-gray-500 bg-white">
              © {new Date().getFullYear()} BazaarX. All rights reserved.
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;
