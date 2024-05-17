import { createBrowserRouter } from "react-router-dom";
import Profile from "../pages/Profile";
import Signin from "../pages/Signin";
import Signup from "../pages/Signup";
import Home from "../pages/Home";
import ErrorAndRedirect from "../pages/ErrorAndRedirect";
import { Layout, ProtectedRoute, AntiProtectedRoute } from "./Layout";
import Chat from "../pages/Chat/Chat";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
        children: [
          {
            path: "room/:roomId",
            element: <Chat />,
          },
        ],
        
      },
      {
        path: "/",
        element: <ProtectedRoute />,
        children: [
          {
            path: "profile",
            element: <Profile />,
          },
        ],
      },
      {
        path: "/",
        element: <AntiProtectedRoute />,
        children: [
          {
            path: "signin",
            element: <Signin />,
          },
          {
            path: "signup",
            element: <Signup />,
          },
        ],
      },
      {
        path: "/*",
        element: <ErrorAndRedirect />,
      },
    ],
  },
]);

export default router;
