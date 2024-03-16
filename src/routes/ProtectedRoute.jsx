import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const ProtectedRoute = ({ children, ...rest }) => {
  const { user } = useAuth();
  if (user?.user_type === "ticket_scanner") {
    return <Navigate to="/landing" />;
  }
  return user ? <Outlet /> : <Navigate to="landing" />;
};
