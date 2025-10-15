import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

// ✅ Create a secure axios instance
const axiosSecure = axios.create({
  baseURL: "https://bistro-boss-server-one-green.vercel.app",
});

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { logOut } = useAuth();

  // ✅ Request interceptor: attach JWT token to every secure request
  axiosSecure.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("access-token");
      if (token) {
        // ⚠️ FIX #1: Capital "A" in 'Authorization' (backend is case-sensitive sometimes)
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // ✅ Response interceptor: auto logout if unauthorized (token invalid or expired)
  axiosSecure.interceptors.response.use(
    (response) => response,
    async (error) => {
      const status = error?.response?.status;

      // ⚠️ FIX #2: Safely check error.response before accessing .status
      if (status === 401 || status === 403) {
        await logOut();
        navigate("/login");
      }

      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;
