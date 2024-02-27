import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const PrivateRoute = ({ children, ...rest }) => {
  let { user, userType } = useContext(AuthContext);
  if (userType === "ticket_scanner") {
    return <Navigate to="/scan-ticket" />;
  }
  return user && userType === "user" ? <Outlet /> : <Navigate to="/landing" />;
};

const PrivateRouteForScanners = ({ children, ...rest }) => {
  let { user, userType } = useContext(AuthContext);
  return user && userType === "ticket_scanner" ? (
    <Outlet />
  ) : (
    <Navigate to="/landing" />
  );
};

export { PrivateRoute, PrivateRouteForScanners };
