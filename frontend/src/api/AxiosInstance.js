import axios from "axios";
// common
const AxiosInstance = axios.create({
  // baseURL: "http://localhost:8000",
  baseURL: "https://ato-z-drop-taxi-backend.vercel.app",
  withCredentials: true,
  timeout: 100000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default AxiosInstance;
