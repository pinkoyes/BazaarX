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
import ViewSellerProduct from "./pages/product/ViewSellerProduct";
import UpdateProduct from "./pages/product/UpdateProduct";
import CategoryPage from "./pages/product/CategoryPage";
import ViewProduct from "./pages/product/ViewProduct";
import CheckoutPage from "./pages/product/CheckoutPage";
import MyOrder from "./pages/orders/MyOrder";
import SellerRequests from "./pages/dashboard/SellerRequests";
import ChatPage from "./pages/chat/ChatPage";

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
        path: "create-product",
        element: <CreateProduct />,
      },
      {
        path: "seller/product/:id",
        element: <ViewSellerProduct />,
      },
      {
        path: "product/:id",
        element: <ViewProduct />,
      },
      {
        path: "edit-product/:id",
        element: <UpdateProduct />,
      },
      {
        path: "/category/:categoryName",
        element: <CategoryPage />,
      },
      {
        path: "/checkout/:productId",
        element: <CheckoutPage />,
      },
      {
        path: "/my-orders",
        element: <MyOrder />,
      },
      {
        path: "/seller/requests",
        element: <SellerRequests />,
      },
      {
        path: "/chat/:chatRoomId",
        element: <ChatPage />,
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
