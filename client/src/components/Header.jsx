import { NavLink, Link } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Sidebar from "./Sidebar";
import Avatar from "./Avatar";

const Header = () => {
  const { user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const activeLink =
    "text-blue-600 font-semibold relative after:content-[''] after:absolute after:left-0 after:bottom-[-6px] after:w-full after:h-[2px] after:bg-blue-600 after:rounded-full";
  const normalLink =
    "text-gray-700 font-medium hover:text-blue-600 transition-colors duration-200";

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-5 md:px-10 flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="flex items-center gap-2">
          <img
            src="https://i.pinimg.com/736x/2b/7f/9e/2b7f9eddd519169ca29481f370667a52.jpg"
            alt="BazaarX Logo"
            className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover border border-gray-300 hover:scale-110 transition-transform duration-300"
          />
          <span className="text-2xl md:text-3xl font-bold text-blue-600 hover:text-blue-700 transition-colors">
            BazaarX
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8 text-[1.05rem]">
          <NavLink
            to="/home"
            className={({ isActive }) => (isActive ? activeLink : normalLink)}
          >
            Home
          </NavLink>
          <NavLink
            to="/seller-dashboard"
            className={({ isActive }) => (isActive ? activeLink : normalLink)}
          >
            Seller Dashboard
          </NavLink>
          <NavLink
            to="/my-orders"
            className={({ isActive }) => (isActive ? activeLink : normalLink)}
          >
            My Orders
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) => (isActive ? activeLink : normalLink)}
          >
            Cart
          </NavLink>
        </nav>

        <div className="flex items-center gap-4 relative">
          {user ? (
            <Avatar />
          ) : (
            <div className="hidden md:flex items-center gap-6">
              <NavLink
                to="/auth/login"
                className={({ isActive }) =>
                  isActive ? activeLink : normalLink
                }
              >
                Login
              </NavLink>
              <Link
                to="/auth/register"
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-all duration-300"
              >
                Register
              </Link>
            </div>
          )}

          <button
            className="lg:hidden flex items-center justify-center p-2 rounded-md hover:bg-gray-100 transition"
            onClick={() => setMenuOpen(true)}
          >
            <RxHamburgerMenu className="w-7 h-7 text-gray-700" />
          </button>
        </div>
      </div>

      <Sidebar isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
};

export default Header;
