import { useEffect, useState } from "react";
import { Navigate, Outlet, useParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";

export const ClubAdminRoute = ({ children, ...rest }) => {
  const { user } = useAuth();
  const api = useAxios();
  const { clubId } = useParams();
  const [isClubAdmin, setIsClubAdmin] = useState(null);
  // Check if the user admins this club

  const fetchClubAdmin = async () => {
    try {
      const response = await api.get(`user/${user.user_id}/admins/${clubId}`);
      setIsClubAdmin(response.data);
    } catch (error) {
      setIsClubAdmin(false);
    }
  };

  useEffect(() => {
    fetchClubAdmin();
  }, [clubId]);

  // If the user is a club admin, render the children
  if (isClubAdmin && user) {
    return <Outlet />;
  }
  // If the user is not a club admin, redirect to the home page
  else if (isClubAdmin === false) {
    return <Navigate to="/" />;
  }
  // If it's null (still loading), return null
  else {
    return null;
  }
};
