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
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import CartPage from "./pages/cart/CartPage";
import SearchResults from "./pages/SearchResults";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: (
          <PublicRoute>
            <LandingPage />
          </PublicRoute>
        ),
      },
      {
        path: "home",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "search",
        element: (
          <ProtectedRoute>
            <SearchResults />
          </ProtectedRoute>
        ),
      },
      {
        path: "seller-dashboard",
        element: (
          <ProtectedRoute>
            <SellerDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "create-product",
        element: (
          <ProtectedRoute>
            <CreateProduct />
          </ProtectedRoute>
        ),
      },
      {
        path: "seller/product/:id",
        element: (
          <ProtectedRoute>
            <ViewSellerProduct />
          </ProtectedRoute>
        ),
      },
      {
        path: "product/:id",
        element: (
          <ProtectedRoute>
            <ViewProduct />
          </ProtectedRoute>
        ),
      },
      {
        path: "edit-product/:id",
        element: (
          <ProtectedRoute>
            <UpdateProduct />
          </ProtectedRoute>
        ),
      },
      {
        path: "category/:categoryName",
        element: (
          <ProtectedRoute>
            <CategoryPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "checkout/:productId",
        element: (
          <ProtectedRoute>
            <CheckoutPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "my-orders",
        element: (
          <ProtectedRoute>
            <MyOrder />
          </ProtectedRoute>
        ),
      },
      {
        path: "seller/requests",
        element: (
          <ProtectedRoute>
            <SellerRequests />
          </ProtectedRoute>
        ),
      },
      {
        path: "chat/:chatRoomId",
        element: (
          <ProtectedRoute>
            <ChatPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <CartPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: (
          <PublicRoute>
            <Login />
          </PublicRoute>
        ),
      },
      {
        path: "register",
        element: (
          <PublicRoute>
            <Register />
          </PublicRoute>
        ),
      },
    ],
  },
]);

export default router;
