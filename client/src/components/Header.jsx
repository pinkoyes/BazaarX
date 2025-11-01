import { NavLink, Link } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { user, logoutUser } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const handleLogout = () => {
    logoutUser();
    setMenuOpen(false);
    setProfileOpen(false);
  };

  const activeLink =
    "text-blue-600 font-semibold relative after:content-[''] after:absolute after:left-0 after:bottom-[-6px] after:w-full after:h-[2px] after:bg-blue-600 after:rounded-full";
  const normalLink =
    "text-gray-700 font-medium hover:text-blue-600 transition-colors duration-200";

  return (
    <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-white/80 border-b border-gray-200 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-5 md:px-10 flex items-center justify-between h-16 md:h-20">
        {/* ===== Logo ===== */}
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2">
            <img
              src="https://i.pinimg.com/736x/2b/7f/9e/2b7f9eddd519169ca29481f370667a52.jpg"
              alt="AgoraX Logo"
              className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover border border-gray-300 hover:scale-110 transition-transform duration-300"
            />
            <span className="text-2xl md:text-3xl font-bold text-blue-600 hover:text-blue-700 transition-colors">
              BazaarX
            </span>
          </Link>
        </div>

        {/* ===== Desktop Nav ===== */}
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

        {/* ===== Right Section ===== */}
        <div className="flex items-center gap-4 relative">
          {/* === If user logged in === */}
          {user ? (
            <div className="relative">
              {/* Profile Circle */}
              <div
                onClick={() => setProfileOpen((prev) => !prev)}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 text-white font-semibold uppercase cursor-pointer select-none hover:opacity-90 transition"
              >
                {user.name ? user.name.charAt(0) : "U"}
              </div>

              {/* Dropdown */}
              {profileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-xl overflow-hidden transition-all duration-300">
                  <div className="p-3 text-sm text-gray-700">
                    <p className="font-semibold truncate">
                      {user.name || "User"}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {user.email || "example@email.com"}
                    </p>
                  </div>
                  <hr className="border-gray-100" />
                  <Link
                    to="/profile"
                    onClick={() => setProfileOpen(false)}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    My Profile
                  </Link>
                  <Link
                    to="/my-orders"
                    onClick={() => setProfileOpen(false)}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    My Orders
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            // === If user not logged in ===
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

          {/* === Mobile Hamburger === */}
          <button
            className="lg:hidden flex items-center justify-center p-2 rounded-md hover:bg-gray-100 transition"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <RxHamburgerMenu className="w-7 h-7 text-gray-700" />
          </button>
        </div>
      </div>

      {/* ===== Mobile Menu ===== */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-md">
          <nav className="flex flex-col px-6 py-4 space-y-4">
            <NavLink
              to="/"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) => (isActive ? activeLink : normalLink)}
            >
              Home
            </NavLink>
            <NavLink
              to="/categories"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) => (isActive ? activeLink : normalLink)}
            >
              Categories
            </NavLink>
            <NavLink
              to="/products"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) => (isActive ? activeLink : normalLink)}
            >
              Products
            </NavLink>
            <NavLink
              to="/contact"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) => (isActive ? activeLink : normalLink)}
            >
              Contact
            </NavLink>

            {!user ? (
              <>
                <NavLink
                  to="/auth/login"
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    isActive ? activeLink : normalLink
                  }
                >
                  Login
                </NavLink>
                <NavLink
                  to="/auth/register"
                  onClick={() => setMenuOpen(false)}
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
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    isActive ? activeLink : normalLink
                  }
                >
                  My Profile
                </NavLink>
                <NavLink
                  to="/my-orders"
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    isActive ? activeLink : normalLink
                  }
                >
                  My Orders
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="text-red-600 font-medium hover:text-red-700 transition"
                >
                  Logout
                </button>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
