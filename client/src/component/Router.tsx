import { createBrowserRouter } from "react-router-dom";
import Profile from "../pages/Profile";
import Signin from "../pages/Signin";
import Signup from "../pages/Signup";
import Home from "../pages/Home";
import ErrorAndRedirect from "../pages/ErrorAndRedirect";
import { Layout, ProtectedRoute, AntiProtectedRoute } from "./Layout";
import Chat from "../pages/Chat/Chat";
import LandingPage from "./LandingPage/LandingPage";
import AcceptInvite from "./AcceptInvite";
import Calender from "./calender/Calender";
import MyEvents from "@/pages/MyEvents";
import FloorPlan from "@/pages/FloorPlan";
import MyEvent from "./MyEvent/MyEvent";
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
        path: "/myevents",
        element: <MyEvent />,
      },
      
      {
        path: "/landing",
        element: <LandingPage />,
      },
      {
        path: "/",
        element: <ProtectedRoute />,
        children: [
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "myProfile",
            element: <Profile />,
          },
          {
            path: "/calender",
            element: <Calender />,
          },
          {
            path: "/myEvents",
            element: <MyEvents />,
          },
          {
            path: "/floorPlan",
            element: <FloorPlan />,
          },
          {
            path: "join/:inviteId",
            element: <AcceptInvite />,
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
