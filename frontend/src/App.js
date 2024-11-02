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
import PrivacyPolicy from "./components/TermsandPrivacyPolicy/PrivacyPolicy";
// import Terms from "./components/TermsandPrivacyPolicy/terms";
import TermsAndCondtions from "./components/TermsandPrivacyPolicy/TermsAndCondtions";
import NotFound from "./components/NotFound/NotFound";

import { HelmetProvider } from "react-helmet-async";

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
              <Route path="/home/:route" element={<Home />} />
              <Route path="/sitemap" element={<SiteMap />} />
              <Route path="/privacypolicy" element={<PrivacyPolicy />} />
              <Route path="/term" element={<TermsAndCondtions />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </AppProvider>

  );
};

export default App;
