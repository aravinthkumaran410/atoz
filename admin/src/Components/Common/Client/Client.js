import axios from "axios";

const client = axios.create({
  // baseURL: "http://localhost:8000",
  baseURL: "https://atoz-backend.vercel.app",
});

export default client;
