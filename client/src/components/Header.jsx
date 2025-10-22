import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";

const Header = () => {
  return (
    <header className="w-full fixed top-0 left-0 right-0 flex items-center h-16 px-2 md:px-24 justify-between bg-white dark:bg-black md:h-20 shadow-md">
      {/* left side */}
      <div className="relative flex items-center space-x-3">
        <img
          src="https://i.pinimg.com/736x/2b/7f/9e/2b7f9eddd519169ca29481f370667a52.jpg"
          alt="OpenMarket Logo"
          className="object-cover h-16 w-16 hover:scale-120 transition-all duration-300"
        />
        <Link
          to="/"
          className="text-2xl md:text-3xl font-extrabold text-black/90 hover:text-black hidden md:block"
        >
          OpenShop
        </Link>
      </div>

      {/* right side - desktop */}
      <div className="hidden md:flex items-center space-x-10">
        <button
          className="
            text-[1.2rem] cursor-pointer
            relative
            after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-green-700
            after:transition-all after:duration-300
            hover:after:w-full
          "
        >
          Login
        </button>
        <Button className="cursor-pointer px-8 py-6">Get Started</Button>
      </div>

      {/* mobile menu */}
      <div className="md:hidden px-2">
        <Sidebar />
      </div>
    </header>
  );
};

export default Header;
