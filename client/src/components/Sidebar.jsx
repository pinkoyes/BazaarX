import { NavLink, Link } from "react-router-dom";
import {
  FiHome,
  FiCompass,
  FiPlusSquare,
  FiList,
  FiUser,
  FiSettings,
  FiHeart,
} from "react-icons/fi";

const Sidebar = ({ isOpen, onClose }) => {
  const menuItems = [
    { path: "/", label: "Dashboard", icon: FiHome },
    { path: "/browse", label: "Browse Items", icon: FiCompass },
    { path: "/categories", label: "Categories", icon: FiList },
    { path: "/sell", label: "Sell Item", icon: FiPlusSquare, badge: "New" },
    { path: "/my-listings", label: "My Listings", icon: FiList },
    { path: "/favorites", label: "Saved Items", icon: FiHeart, count: "5" },
  ];

  const accountItems = [
    { path: "/profile", label: "My Profile", icon: FiUser },
    { path: "/settings", label: "Account Settings", icon: FiSettings },
  ];

  const renderNavItem = ({ path, label, icon: Icon, badge }) => (
    <NavLink
      key={path}
      to={path}
      onClick={onClose}
      className={({ isActive }) =>
        `flex items-center px-4 py-2 rounded-lg text-base font-medium transition-all duration-200 group ${
          isActive
            ? "text-blue-600 bg-blue-50 border border-blue-100"
            : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
        }`
      }
    >
      <Icon
        className={`w-5 h-5 mr-3 text-gray-400 group-hover:text-blue-600 transition-colors`}
      />
      {label}
      {badge && (
        <span className="ml-auto px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full font-medium">
          {badge}
        </span>
      )}
    </NavLink>
  );

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden transition-opacity duration-300 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Sidebar Panel */}
      <div
        className={`fixed top-0 left-0 h-full w-[280px] max-w-full bg-white shadow-xl z-50 transform transition-transform duration-300 lg:translate-x-0 lg:static lg:shadow-none ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6">
            <Link
              to="/"
              className="flex items-center space-x-3"
              onClick={onClose}
            >
              <div className="w-10 h-10 bg-linear-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">BS</span>
              </div>
              <span className="text-xl font-bold text-blue-600">BuySell</span>
            </Link>
            <button
              onClick={onClose}
              className="lg:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors"
              aria-label="Close sidebar"
            >
              <svg
                className="w-6 h-6 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Main Navigation */}
          <nav className="flex-1 px-4 py-6 overflow-y-auto">
            {/* Main Menu */}
            <div className="mb-8">
              <h3 className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
                Main Menu
              </h3>
              <div className="space-y-1">
                {menuItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `flex items-center px-3 py-2.5 rounded-xl text-base font-medium transition-all duration-200 group relative ${
                        isActive
                          ? "text-blue-600 bg-blue-50"
                          : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                      }`
                    }
                  >
                    <item.icon className="w-5 h-5 mr-3 transition-colors" />
                    {item.label}
                    {item.badge && (
                      <span className="ml-auto px-2 py-0.5 text-xs bg-green-500 text-white rounded-full font-medium">
                        {item.badge}
                      </span>
                    )}
                    {item.count && (
                      <span className="ml-auto px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded-full font-medium">
                        {item.count}
                      </span>
                    )}
                  </NavLink>
                ))}
              </div>
            </div>

            {/* Account Section */}
            <div className="mb-6">
              <h3 className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
                Account
              </h3>
              <div className="space-y-1">
                {accountItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `flex items-center px-3 py-2.5 rounded-xl text-base font-medium transition-all duration-200 ${
                        isActive
                          ? "text-blue-600 bg-blue-50"
                          : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                      }`
                    }
                  >
                    <item.icon className="w-5 h-5 mr-3 transition-colors" />
                    {item.label}
                  </NavLink>
                ))}
              </div>
            </div>
          </nav>

          {/* Auth Actions */}
          <div className="p-4 space-y-3 bg-gray-50">
            <Link
              to="/login"
              onClick={onClose}
              className="block w-full text-center px-4 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-all hover:border-gray-300"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              onClick={onClose}
              className="block w-full text-center px-4 py-2.5 bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-medium transition-all shadow-md"
            >
              Get Started Free
            </Link>
          </div>

          {/* User Info (Optional) */}
          <div className="p-4 bg-gray-50 mt-auto">
            <div className="flex items-center space-x-3 p-3 rounded-xl bg-white border border-gray-100 hover:border-gray-200 transition-colors cursor-pointer">
              <div className="w-10 h-10 bg-linear-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
                <span className="text-white font-semibold">JD</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  John Doe
                </p>
                <p className="text-xs text-gray-500 truncate">
                  john@example.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
