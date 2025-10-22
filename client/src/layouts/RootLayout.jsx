import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Outlet } from "react-router-dom";
import Sidebar from "@/components/Sidebar";

const RootLayout = () => {
  return (
    <>
      <div>
        <Header />
        <div className="flex">
          <Sidebar className="w-64 border-r" />
          <main className="flex-1">
            <Outlet />
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default RootLayout;
