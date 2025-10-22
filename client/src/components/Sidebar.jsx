import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Menu,
  Home,
  Package,
  ShoppingCart,
  User,
  Settings,
  LogIn,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Sidebar = () => {
  const location = useLocation();

  const navLinks = [
    { to: "/home", label: "Home", icon: Home },
    { to: "/products", label: "Products", icon: Package },
    { to: "/orders", label: "Orders", icon: ShoppingCart },
    { to: "/profile", label: "Profile", icon: User },
  ];

  const themes = [
    { name: "Light", value: "light" },
    { name: "Dark", value: "dark" },
    { name: "Blue", value: "blue" },
    { name: "Green", value: "green" },
  ];

  return (
    <Sheet>
      {/* Menu Trigger */}
      <SheetTrigger asChild>
        <Menu className="w-7 h-7 text-gray-700 dark:text-gray-200" />
      </SheetTrigger>

      {/* Sheet Content */}
      <SheetContent
        side="right"
        className="w-68 flex flex-col px-6 pb-8 bg-white dark:bg-gray-950"
      >
        {/* Header */}
        <SheetHeader className="text-left">
          <SheetTitle className="text-2xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            OpenDesk
          </SheetTitle>
          <p className="border-b-2 py-1"></p>
          <SheetDescription className="text-sm text-gray-500 dark:text-gray-400"></SheetDescription>
        </SheetHeader>

        {/* Navigation Links */}
        <nav className="flex-1 space-y-2">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.to;
            const Icon = link.icon;

            return (
              <Link
                key={link.label}
                to={link.to}
                className={`flex items-center gap-3 px-3 py-3 rounded-lg text-base font-medium transition-all ${
                  isActive
                    ? "bg-linear-to-r from-blue-50 to-blue-100 text-blue-700 border border-blue-200 dark:from-blue-950 dark:to-blue-900 dark:text-blue-300 dark:border-blue-800"
                    : "text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
                }`}
              >
                <Icon className="h-5 w-5" />
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Buttons */}
        <div className="space-y-3 pt-4 border-t border-gray-200 dark:border-gray-800">
          <Button className="w-full gap-2 bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            <LogIn className="h-4 w-4" />
            Login
          </Button>
          <Button variant="outline" className="w-full gap-2">
            <Settings className="h-4 w-4" />
            Settings
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Sidebar;
