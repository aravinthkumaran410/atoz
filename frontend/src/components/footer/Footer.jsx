import React, { useContext } from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import { RiFacebookFill } from "react-icons/ri";
import { FaInstagram } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";
import { MdPhoneInTalk } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { MdTimer } from "react-icons/md";
import { RiArrowRightSFill } from "react-icons/ri";

import { AppContext } from "../../context/AppContext";

import image_1 from "../../assets/footer/img-1.jpg";
import image_2 from "../../assets/footer/img-2.jpg";
import image_3 from "../../assets/footer/img-3.jpg";
import image_4 from "../../assets/footer/img-4.jpg";
import image_5 from "../../assets/footer/img-5.jpg";
import image_6 from "../../assets/footer/img-6.jpg";

const Footer = () => {
  const { AtozInfo } = useContext(AppContext);
  const handleLinkClick = () => {
    window.scrollTo({ top: "0 !important ", behavior: "smooth" });
  };
  return (
    <section className="footer-main-container">
      <div className="footer">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-lg-3">
              <div className="footer-about">
                <h3>About Us</h3>
                <p>
                  At A to Z Drop Taxi, we are committed to providing a seamless
                  transportation experience. Our dedicated team ensures that you
                  receive safe, reliable, and efficient cab services.
                </p>
                <div className="footer-social">
                  <Link
                    to="https://www.facebook.com/atozcalltaxi.dharmapuri"
                    target="_blank"
                    className="me-3"
                  >
                    <RiFacebookFill className="fs-5" />
                  </Link>
                  <Link
                    to="https://www.instagram.com/atozdroptaxi"
                    target="_blank"
                    className="me-2"
                  >
                    <FaInstagram className="fs-5" />
                  </Link>
                  {/* <Link href className="me-2">
                    <RiFacebookFill className="fs-5" />
                  </Link>
                  <Link href className="me-2">
                    <RiFacebookFill className="fs-5" />
                  </Link>
                  <Link href className="me-2">
                    <RiFacebookFill className="fs-5" />
                  </Link> */}
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              {AtozInfo && AtozInfo.length > 0 && (
                <div className="footer-contact">
                  <h3>Get In Touch</h3>
                  <p>
                    <MdLocationOn className="me-1" />
                    {AtozInfo[0]?.address}
                  </p>
                  <p>
                    <a
                      href={`tel:+91${AtozInfo[0]?.phone}`}
                      style={{ textDecoration: "none", color: "white" }}
                    >
                      <MdPhoneInTalk className="me-1 header-top-info-icons" />
                      <span>+91 {AtozInfo[0]?.phone}</span>
                    </a>
                  </p>
                  <p>
                    <a
                      href={`https://wa.me/91${AtozInfo[0]?.phone1}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: "none", color: "white" }}
                    >
                      <FaWhatsapp className="me-1 header-top-info-icons" />
                      <span>+91 {AtozInfo[0]?.phone1}</span>
                    </a>
                  </p>

                  <span>
                    {AtozInfo[0]?.email ? (
                      <a
                        href={`mailto:${AtozInfo[0]?.email}`}
                        style={{ color: "#fff" }}
                      >
                        <MdOutlineEmail className="me-1 header-top-info-icons" />{" "}
                        <span>{AtozInfo[0]?.email}</span>
                      </a>
                    ) : (
                      "No email available"
                    )}
                  </span>
                  <p className="mt-2">
                    <MdTimer className="me-1" />
                    Open 24 Hours
                  </p>
                </div>
              )}
            </div>

            <div className="col-md-6 col-lg-2">
              <div className="footer-links">
                <h3>Our Links</h3>
                <Link to="/Home" onClick={handleLinkClick}>
                  <RiArrowRightSFill /> Home
                </Link>
                <Link to="/about" onClick={handleLinkClick}>
                  <RiArrowRightSFill /> About
                </Link>
                <Link to="/service" onClick={handleLinkClick}>
                  <RiArrowRightSFill /> Service
                </Link>
                <Link to="/tariff" onClick={handleLinkClick}>
                  <RiArrowRightSFill /> Tariff
                </Link>
                <Link to="/contact" onClick={handleLinkClick}>
                  <RiArrowRightSFill /> Contact
                </Link>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="footer-project">
                <h3>Our Gallery</h3>
                <a href>
                  <img src={image_1} alt="Image" loading="lazy" />
                </a>
                <a href>
                  <img src={image_2} alt="Image"  loading="lazy"/>
                </a>
                <a href>
                  <img src={image_3} alt="Image"  loading="lazy"/>
                </a>
                <a href>
                  <img src={image_4} alt="Image" loading="lazy" />
                </a>
                <a href>
                  <img src={image_5} alt="Image" loading="lazy" />
                </a>
                <a href>
                  <img src={image_6} alt="Image"  loading="lazy" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="copyright">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-6">
                <div className="copy-text">
                  <p>
                    ©{" "}
                    <span className="text-danger fs-5 fw-bold">
                      A to Z Drop Taxi
                    </span>
                    . All Rights Reserved
                  </p>
                </div>
              </div>
              <div className="col-md-6">
                <div className="copy-menu">
                  <Link to="/term" onClick={handleLinkClick}>
                    Terms
                  </Link>
                  <Link to="/privacypolicy" onClick={handleLinkClick}>
                    Privacy
                  </Link>
                  <Link to="/sitemap" onClick={handleLinkClick}>
                    SiteMap
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
