import React, { useContext } from "react";
import "./header.css";
import { Link } from "react-router-dom";
import { MdOutlineEmail } from "react-icons/md";
import { MdPhoneInTalk } from "react-icons/md";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoLinkedin } from "react-icons/io5";
import { FaWhatsapp } from "react-icons/fa";
import Navbar from "./navbar/Navbar";
import { AppContext } from "../../context/AppContext";

const Header = () => {
  const { AtozInfo } = useContext(AppContext);
  return (
    <section className="header-container">
      <div className="header-bg">
        <div className="header-top-info-container">
          {AtozInfo && AtozInfo.length > 0 && (
            <div>
              <a
                className="para me-3 fw-bold"
                href={`tel:+91${AtozInfo[0]?.phone}`}
                style={{ textDecoration: "none", color: "white" }}
              >
                <MdPhoneInTalk className="me-1 header-top-info-icons" />
                <span>+91 {AtozInfo[0]?.phone}</span>
              </a>

              <a
                className="para me-3 fw-bold"
                href={`https://wa.me/91${AtozInfo[0]?.phone1}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none", color: "white" }}
              >
                <FaWhatsapp className="me-1 header-top-info-icons" />
                <span>+91 {AtozInfo[0]?.phone1}</span>
              </a>
              <span>
                {AtozInfo[0]?.email ? (
                  <a
                    href={`mailto:${AtozInfo[0]?.email}`}
                    style={{ color: "#fff" }}
                  >
                    <MdOutlineEmail className="me-1 header-top-info-icons" />{" "}
                    <span className="fw-bold">{AtozInfo[0]?.email}</span>
                  </a>
                ) : (
                  "No email available"
                )}
              </span>
            </div>
          )}

          <div>
            <span className="para fw-bold ">
              follow as :
              <span className="ms-2 header-top-info-social-icons">
                <Link
                  to="https://www.instagram.com/atozdroptaxi/"
                  target="_blank"
                  className="text-white"
                >
                  <FaInstagram />
                </Link>
                <Link
                  to="https://www.facebook.com/atozcalltaxi.dharmapuri"
                  target="_blank"
                  className="text-white"
                >
                  <FaFacebook />
                </Link>
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
