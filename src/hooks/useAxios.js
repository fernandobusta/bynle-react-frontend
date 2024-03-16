import axios from "axios";
import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";
import { useAuth } from "./useAuth";

const baseURL = process.env.REACT_APP_API_URL;

const useAxios = () => {
  const { authTokens, setUser, setAuthTokens } = useAuth();

  // Passing the access token in the request header
  const axiosInstance = axios.create({
    baseURL,
    headers: { Authorization: `Bearer ${authTokens?.access}` },
  });
  axiosInstance.interceptors.request.use(async (req) => {
    const user = jwtDecode(authTokens.access);
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

    if (!isExpired) return req;

    // Getting the refresh token and passing it
    const response = await axios.post(`${baseURL}/token/refresh/`, {
      refresh: authTokens.refresh,
    });
    localStorage.setItem("authTokens", JSON.stringify(response.data));
    localStorage.setItem("authTokens", JSON.stringify(response.data));

    setAuthTokens(response.data);
    setUser(jwtDecode(response.data.access));

    req.headers.Authorization = `Bearer ${response.data.access}`;
    return req;
  });

  return axiosInstance;
};

export default useAxios;
