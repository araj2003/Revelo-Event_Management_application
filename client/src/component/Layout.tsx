import { Outlet, useLocation, Navigate } from "react-router-dom";
// import Navbar from "./Navbar.tsx";
import { useAppSelector } from "../hooks";
import { toast } from "react-toastify";

const Layout = () => {
  const location = useLocation();
  const hideNavbarRoutes = ["/verify", "/forgot-password", "/"];
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);
  return (
    <div>
      {/* {!shouldHideNavbar && <Navbar />} */}
      <div>
        <Outlet />
      </div>
    </div>
  );
};

const ProtectedRoute = () => {
  const { isAuthenticated } = useAppSelector((state) => state.user);

  if (!isAuthenticated) {
    toast.error("You need to be logged in to access this page", {
      toastId: "protected-route",
    });
    return <Navigate to="/signin" />;
  }
  return <Outlet />;
};

const AntiProtectedRoute = () => {
  const { isAuthenticated } = useAppSelector((state) => state.user);
  // console.log(token);

  if (isAuthenticated) return <Navigate to="/dashboard" />;
  return <Outlet />;
};

export { Layout, ProtectedRoute, AntiProtectedRoute };
