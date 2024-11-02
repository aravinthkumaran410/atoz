import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./Layout";

import Home from "./components/home/Home";
import About from "./components/about/About";
import MainService from "./components/service/MainService";
import Contact from "./components/contact/Contact";
import { AppProvider } from "./context/AppContext";
import Tariff from "./components/tariff/Tariff";
import SiteMap from "./components/sitemap/SiteMap";

const App = () => {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/service" element={<MainService />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/tariff" element={<Tariff />} />
            <Route path="/sitemap" element={<SiteMap />} />
          </Route>
          <Route path="*" element={<h2>404 page</h2>} />
        </Routes>
      </Router>
    </AppProvider>
  );
};

export default App;
