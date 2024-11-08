import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import WhatsApp from "./components/socialMedia/Whatsapp";
import ScrollToTopButton from "./components/scrollToTop/ScrollToTopButton";

//common

const Layout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <WhatsApp />
      <ScrollToTopButton />
      <Footer />
    </>
  );
};

export default Layout;
