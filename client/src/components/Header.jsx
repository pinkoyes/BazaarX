import { Link } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";

const Header = () => {
  return (
    <header className="w-full fixed top-0 left-0 z-50 bg-white shadow-md h-16 md:h-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-full">
        {/* Left side - Logo */}
        <div className="flex items-center space-x-4">
          <img
            src="https://i.pinimg.com/736x/2b/7f/9e/2b7f9eddd519169ca29481f370667a52.jpg"
            alt="logo"
            className="w-12 h-12 md:w-14 md:h-14 object-cover rounded-full hover:scale-140 transition-transform duration-300"
          />
          <Link
            to="/"
            className="hidden md:block text-3xl font-bold text-blue-600"
          >
            AgoraX
          </Link>
        </div>

        {/* Right side - Desktop links */}
        <div className="hidden md:flex items-center space-x-12">
          <Link
            to="/auth/login"
            className="relative text-gray-700 font-medium transition-all duration-200
            after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-0.5 
            after:bg-blue-500 after:transition-all after:duration-300 hover:after:w-full text-[1.2rem]"
          >
            Login
          </Link>
          <Link
            to="/auth/register"
            className="px-5 py-2.5 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 text-[1.1rem]"
          >
            Register
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <RxHamburgerMenu className="w-7 h-7 text-gray-700 cursor-pointer" />
        </div>
      </div>
    </header>
  );
};

export default Header;
