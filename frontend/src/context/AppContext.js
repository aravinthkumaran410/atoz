import React, { createContext, useState, useEffect } from "react";
import AxiosInstance from "../api/AxiosInstance";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [AtozInfo, setAtozInfo] = useState([]);

  useEffect(() => {
    const fetchAtozInfo = async () => {
      try {
        const response = await AxiosInstance.get("/admin/getAdmins");
        const data = response.data;
        setAtozInfo(data);
        console.log("data", data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAtozInfo();
  }, []);

  return (
    <AppContext.Provider value={{ AtozInfo }}>{children}</AppContext.Provider>
  );
};
