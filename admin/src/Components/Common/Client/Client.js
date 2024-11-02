import axios from "axios";

const client = axios.create({
  //baseURL: "http://localhost:8000",
    baseURL: "https://ato-z-drop-taxi-backend.vercel.app",
});

export default client;
