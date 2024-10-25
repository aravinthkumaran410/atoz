import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";
import { RiMenu5Fill } from "react-icons/ri";
import { IoCallOutline } from "react-icons/io5";
import logo from "../../../assets/logo_1 2.svg";
// import ScrollBar from "../farmorMotion/ScrollBar";

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => (location.pathname === path ? "active" : "");

  const handleLinkClick = () => {
    const navbarCollapse = document.getElementById("navbarCollapse");
    if (navbarCollapse.classList.contains("show")) {
      navbarCollapse.classList.remove("show");
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="navbar-section sticky-top ">
      <nav
        className="navbar navbar-expand-lg  py-lg-0 px-lg-5 wow fadeIn"
        data-wow-delay="0.1s"
      >
        <Link to="#" className="navbar-brand ms-4 ms-lg-0">
          <img
            src={logo}
            alt="United Air Travels"
            className="header-nav-logo"
          />
        </Link>
        <button
          type="button"
          className="navbar-toggler me-4"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
        >
          <RiMenu5Fill className="fs-1 fw-bold" style={{ color: "#ffcc00" }} />
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <div className="navbar-nav mx-auto p-lg-0">
            <Link
              // to="/#home"
              to="/"
              className={`nav-item nav-link ${isActive("/")}`}
              onClick={handleLinkClick}
            >
              Home
            </Link>
            <Link
              // to="/about#about"
              to="/about"
              className={`nav-item nav-link ${isActive("/about")}`}
              onClick={handleLinkClick}
            >
              About
            </Link>
            <Link
              to="/tariff"
              // to="/package#package"
              className={`nav-item nav-link ${isActive("/tariff")}`}
              onClick={handleLinkClick}
            >
              Tariff
            </Link>
            {/* <div className="nav-item dropdown">
              <Link
                to="/packages"
                className={`nav-link dropdown-toggle ${isActive("/packages")}`}
                // onClick={handleLinkClick}
                // data-bs-toggle="dropdown"
              >
                Packages
              </Link>
              <ul className="dropdown-menu">
                <li>
                  <Link to="/package1" className="dropdown-item">
                    Package 1
                  </Link>
                </li>
                <li>
                  <Link to="/package2" className="dropdown-item">
                    Package 2
                  </Link>
                </li>
                <li>
                  <Link to="/package3" className="dropdown-item">
                    Package 3
                  </Link>
                </li>
              </ul>
            </div> */}

            <Link
              to="/contact"
              // to="/contact#form"
              className={`nav-item nav-link ${isActive("/contact")}`}
              onClick={handleLinkClick}
            >
              Contact
            </Link>
          </div>

          <div>
            <button className=" nav-contact-button">contact</button>
          </div>
        </div>
      </nav>
      {/* <ScrollBar /> */}
    </header>
  );
};

export default Navbar;
