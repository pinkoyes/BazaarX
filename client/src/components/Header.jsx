import { NavLink, Link, useLocation } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { useState, useEffect } from "react";

const navItems = [
  { path: "/", label: "Home" },
  { path: "/browse", label: "Browse", badge: "New" },
  { path: "/sell", label: "Sell" },
  { path: "/my-listings", label: "My Listings" },
  { path: "/categories", label: "Categories" },
];

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMenu = () => setIsMobileMenuOpen(false);

  // Close menu on route change
  useEffect(() => {
    closeMenu();
  }, [location]);

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getNavLinkClass = ({ isActive }) =>
    `px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
      isActive
        ? "text-blue-600 bg-blue-50"
        : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
    }`;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md transition-all duration-300 z-50 ${
          isScrolled ? "shadow-lg" : ""
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between px-4 md:px-6 h-20">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center space-x-3 group"
              onClick={closeMenu}
            >
              <div className="w-10 h-10 bg-linear-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">BS</span>
              </div>
              <span className="text-2xl font-bold bg-linear-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent group-hover:from-blue-700 group-hover:to-blue-900 transition-all">
                BuySell
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-lg font-medium transition-all duration-200 relative ${
                      isActive
                        ? "text-blue-600 bg-blue-50/80"
                        : "text-gray-600 hover:text-blue-600 hover:bg-gray-50/80"
                    }`
                  }
                >
                  {item.label}
                  {item.badge && (
                    <span className="absolute -top-1 -right-1 px-2 py-0.5 text-xs bg-green-500 text-white rounded-full font-medium">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              ))}
            </nav>

            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <Link
                to="/login"
                className="px-5 py-2.5 text-gray-700 font-medium hover:text-blue-600 transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="px-6 py-2.5 bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg font-medium transition-all shadow-md hover:shadow-lg active:shadow-inner"
              >
                Get Started
              </Link>
            </div>

            {/* Mobile Hamburger Icon */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <IoClose className="text-2xl text-gray-700" />
              ) : (
                <GiHamburgerMenu className="text-2xl text-gray-700" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black/30 backdrop-blur-sm z-40 md:hidden transition-all duration-300 ${
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={closeMenu}
      />

      {/* Mobile Slide-in Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-[320px] max-w-full bg-white shadow-2xl z-50 md:hidden transform transition-transform duration-300 ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6">
            <Link
              to="/"
              className="flex items-center space-x-3"
              onClick={closeMenu}
            >
              <div className="w-10 h-10 bg-linear-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">BS</span>
              </div>
              <span className="text-xl font-bold text-blue-600">BuySell</span>
            </Link>
            <button
              onClick={closeMenu}
              className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
              aria-label="Close menu"
            >
              <IoClose className="text-2xl text-gray-700" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 rounded-xl font-medium transition-all duration-200 relative ${
                    isActive
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                  }`
                }
                onClick={closeMenu}
              >
                {item.label}
                {item.badge && (
                  <span className="ml-2 px-2 py-0.5 text-xs bg-green-500 text-white rounded-full font-medium">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Auth Buttons */}
          <div className="p-4 space-y-3 bg-gray-50">
            <Link
              to="/login"
              className="block w-full text-center px-4 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-all hover:border-gray-300 active:bg-gray-100"
              onClick={closeMenu}
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="block w-full text-center px-4 py-3 bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-medium transition-all shadow-md active:shadow-inner"
              onClick={closeMenu}
            >
              Get Started Free
            </Link>
          </div>
        </div>
      </div>

      {/* Spacer to prevent layout shift due to fixed header */}
      <div className="h-16" />
    </>
  );
};

export default Header;
