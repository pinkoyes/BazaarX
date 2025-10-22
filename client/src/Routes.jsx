import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import LandingPage from "./pages/LandingPage";
import Home from "./pages/Home";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <div>error!</div>,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: "home",
        element: <Home />,
      },
    ],
  },
]);

export default appRouter;
