import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../components/Constants";

const swal = require("sweetalert2");

const AuthContext = createContext();

export default AuthContext;

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

  const [loading, setLoading] = useState(true);

  const [userType, setUserType] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwtDecode(localStorage.getItem("authTokens")).user_type
      : null
  );

  const navigate = useNavigate();

  const loginUser = async (email, password) => {
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
      setUserType("user");
      localStorage.setItem("authTokens", JSON.stringify(data));
      navigate("/");
      swal.fire({
        title: "Login Successful",
        icon: "success",
        toast: true,
        timer: 3000,
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
  const registerUser = async (
    email,
    username,
    student_id,
    first_name,
    last_name,
    course,
    year,
    description,
    password,
    password2
  ) => {
    const response = await fetch(`${API_URL}/register/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        username,
        student_id,
        first_name,
        last_name,
        password,
        password2,
        profile: {
          course,
          year,
          description,
        },
      }),
    });
    const data = await response.json();
    console.log(data);
    if (response.status === 201) {
      navigate("/login");
      swal.fire({
        title: "Registration Successful, Login Now.",
        icon: "success",
        toast: true,
        timer: 3000,
        position: "top-right",
        timerProgressBar: true,
        showConfirmButton: false,
      });
    } else {
      console.log("Registration failed");
      swal.fire({
        title:
          data.email ||
          data.username ||
          data.student_id ||
          data.password ||
          data.password2 ||
          data.course ||
          data.year ||
          data.description ||
          "Registration failed",
        icon: "error",
        toast: true,
        timer: 3000,
        position: "top-right",
        timerProgressBar: true,
        showConfirmButton: false,
      });
    }
  };
  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    setUserType(null);
    localStorage.removeItem("authTokens");
    navigate("/login");
    swal.fire({
      title: "You have been logged out...",
      icon: "success",
      toast: true,
      timer: 3000,
      position: "top-right",
      timerProgressBar: true,
      showConfirmButton: false,
    });
  };

  const loginTicketScanner = async (email, password) => {
    const response = await fetch(`${API_URL}/token/ticket-scanner/`, {
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
      setUserType("ticket_scanner");
      localStorage.setItem("authTokens", JSON.stringify(data));
      navigate("/scan-ticket");
      swal.fire({
        title: "Scanner Login Successful",
        icon: "success",
        toast: true,
        timer: 3000,
        position: "top-right",
        timerProgressBar: true,
        showConfirmButton: false,
      });
    } else {
      console.log("Login failed");
      swal.fire({
        title: "Username or password of Scanner does not exists.",
        icon: "error",
        toast: true,
        timer: 3000,
        position: "top-right",
        timerProgressBar: true,
        showConfirmButton: false,
      });
    }
  };
  const contextData = {
    user,
    setUser,
    authTokens,
    setAuthTokens,
    registerUser,
    loginUser,
    logoutUser,
    loginTicketScanner,
    userType,
  };

  // Check if there is an auth token and decode it immediately
  useEffect(() => {
    if (authTokens) {
      setUser(jwtDecode(authTokens.access));
    }
    setLoading(false);
  }, [authTokens, loading]);

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
