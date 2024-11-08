import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import { HelmetProvider } from "react-helmet-async";
import Spinner from "./components/spinner/Spinner";

// Lazy load components
const Layout = React.lazy(() => import("./Layout"));
const Home = React.lazy(() => import("./components/home/Home"));
const About = React.lazy(() => import("./components/about/About"));
const MainService = React.lazy(() =>
  import("./components/service/MainService")
);
const Contact = React.lazy(() => import("./components/contact/Contact"));
const Tariff = React.lazy(() => import("./components/tariff/Tariff"));
const SiteMap = React.lazy(() => import("./components/sitemap/SiteMap"));
const PrivacyPolicy = React.lazy(() =>
  import("./components/TermsandPrivacyPolicy/PrivacyPolicy")
);
const TermsAndCondtions = React.lazy(() =>
  import("./components/TermsandPrivacyPolicy/TermsAndCondtions")
);
const NotFound = React.lazy(() => import("./components/NotFound/NotFound"));

const App = () => {
  return (
    <AppProvider>
      <HelmetProvider>
        <Router>
          <Suspense fallback={<Spinner />}>
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
          </Suspense>
        </Router>
      </HelmetProvider>
    </AppProvider>
  );
};

export default App;
