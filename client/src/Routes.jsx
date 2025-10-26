import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import LandingPage from "./pages/LandingPage";
import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import CreateProduct from "./pages/product/CreateProduct";
import SellerDashboard from "./pages/dashboard/SellerDashboard";
import ViewProduct from "./pages/product/ViewProduct";
import UpdateProduct from "./pages/product/UpdateProduct";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "seller-dashboard",
        element: <SellerDashboard />,
      },
      {
        path: "product/create",
        element: <CreateProduct />,
      },
      {
        path: "product/:id",
        element: <ViewProduct />,
      },
      {
        path: "edit-product/:id",
        element: <UpdateProduct />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
]);

export default router;
