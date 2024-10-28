import axios from "axios";
const AxiosInstance = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
  timeout: 100000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default AxiosInstance;