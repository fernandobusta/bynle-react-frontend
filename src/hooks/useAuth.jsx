import { createContext, useState, useEffect, useContext } from "react";
import { jwtDecode } from "jwt-decode";
import { API_URL } from "../components/Constants";

const swal = require("sweetalert2");

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );

  const [user, setUser] = useState(() =>
    localStorage.getItem("authTokens")
      ? // If there is a token in localStorage, decode it
        jwtDecode(localStorage.getItem("authTokens"))
      : null
  );

  const loginUser = async (email, password, onLoginSuccess) => {
    const response = await fetch(`${API_URL}/token/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await response.json();
    if (response.status === 200) {
      console.log("Login successful");
      setAuthTokens(data);
      setUser(jwtDecode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
      onLoginSuccess(); // Call the callback function
      swal.fire({
        title: "Login Successful",
        icon: "success",
        toast: true,
        timer: 2000,
        position: "top-right",
        timerProgressBar: true,
        showConfirmButton: false,
      });
    } else {
      console.log("Login failed");
      swal.fire({
        title: "Username or password does not exists.",
        icon: "error",
        toast: true,
        timer: 3000,
        position: "top-right",
        timerProgressBar: true,
        showConfirmButton: false,
      });
    }
  };

  const logoutUser = (onLogout) => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    onLogout(); // Call the callback function
    swal.fire({
      title: "You have been logged out...",
      icon: "success",
      toast: true,
      timer: 2000,
      position: "top-right",
      timerProgressBar: true,
      showConfirmButton: false,
    });
  };

  // Check if there is an auth token and decode it immediately
  useEffect(() => {
    if (authTokens) {
      setUser(jwtDecode(authTokens.access));
    }
  }, [authTokens]);

  const contextData = {
    user,
    setUser,
    authTokens,
    setAuthTokens,
    loginUser,
    logoutUser,
  };
  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
