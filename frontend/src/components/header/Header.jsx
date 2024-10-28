import React from "react";
import "./header.css";

import { MdOutlineEmail } from "react-icons/md";
import { MdPhoneInTalk } from "react-icons/md";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoLinkedin } from "react-icons/io5";
import Navbar from "./navbar/Navbar";

const Header = () => {
  return (
    <section className="header-container">
      <div className="header-bg">
        <div className="header-top-info-container">
          <div>
            <span className="para me-3 fw-bold">
              <MdOutlineEmail className="me-1 header-top-info-icons" />
              surya@gmial.com
            </span>
            <span className="para fw-bold">
              <MdPhoneInTalk className="me-1 header-top-info-icons" />
              +91 6382712627
            </span>
          </div>
          <div>
            <span className="para fw-bold ">
              follow as :
              <span className="ms-2 header-top-info-social-icons">
                <FaFacebook />
                <FaInstagram />
                <FaXTwitter />
                <IoLogoLinkedin />
              </span>
            </span>
          </div>
        </div>
      </div>
      <section className="header-navbar-sticky-container">
        <Navbar />
      </section>
    </section>
  );
};

export default Header;
