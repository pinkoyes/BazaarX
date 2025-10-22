import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

const RootLayout = () => {
  return (
    <>
      <Header />
      <main className="pt-16 md:pt-20">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default RootLayout;
