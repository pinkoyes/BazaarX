import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
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
import { ScrollArea } from "@/components/ui/scroll-area";

const Sidebar = () => {
  const location = useLocation();

  const navLinks = [
    { to: "/home", label: "Home", icon: Home },
    { to: "/products", label: "Products", icon: Package },
    { to: "/orders", label: "Orders", icon: ShoppingCart },
    { to: "/profile", label: "Profile", icon: User },
  ];

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          aria-label="Open Menu"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px] p-0">
        <SheetHeader className="p-4 border-b">
          <SheetTitle className="text-2xl font-bold bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            OpenMarket
          </SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-10rem)] px-4 py-6">
          <nav className="space-y-2">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.to;
              const Icon = link.icon;

              return (
                <Link
                  key={link.label}
                  to={link.to}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Bottom Actions */}
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-background">
            <div className="space-y-2">
              <Button className="w-full gap-2" variant="default">
                <LogIn className="h-4 w-4" />
                Login
              </Button>
              <Button variant="outline" className="w-full gap-2">
                <Settings className="h-4 w-4" />
                Settings
              </Button>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default Sidebar;
