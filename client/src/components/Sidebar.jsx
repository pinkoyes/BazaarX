import React from "react";
import { Link, useLocation } from "react-router-dom";
import { X, Home, Package, PlusCircle, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  const { theme } = useTheme();

  const links = [
    { to: "/", icon: <Home size={22} />, label: "Home" },
    {
      to: "/seller-dashboard",
      icon: <Package size={22} />,
      label: "Dashboard",
    },
    {
      to: "/add-product",
      icon: <PlusCircle size={22} />,
      label: "Add Product",
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Sidebar */}
          <motion.aside
            className={`fixed top-0 right-0 h-full w-[300px] bg-white dark:bg-black z-50 shadow-lg flex flex-col`}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
              <h2 className="text-xl font-semibold text-green-700 dark:text-green-400">
                Menu
              </h2>
              <button
                onClick={onClose}
                className="p-1 text-gray-700 dark:text-gray-200"
              >
                <X size={24} />
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="flex flex-col p-4 gap-4">
              {links.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={onClose}
                  className={`flex items-center gap-3 px-3 py-3 rounded-lg text-gray-700 dark:text-gray-200 transition ${
                    location.pathname === link.to
                      ? "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-400 font-medium"
                      : "hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  {link.icon}
                  <span className="text-lg">{link.label}</span>
                </Link>
              ))}

              {/* Logout */}
              <button className="flex items-center gap-3 px-3 py-3 text-gray-700 dark:text-gray-200 hover:bg-red-100 dark:hover:bg-red-900 hover:text-red-700 dark:hover:text-red-400 rounded-lg transition mt-4">
                <LogOut size={22} />
                Logout
              </button>
            </nav>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;
