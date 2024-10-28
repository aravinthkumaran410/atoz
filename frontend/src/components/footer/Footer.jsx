import React from "react";
import "./Footer.css";
import { RiFacebookFill } from "react-icons/ri";
import { FaInstagram } from "react-icons/fa6";

import image_1 from "../../assets/footer/img-1.jpg";
import image_2 from "../../assets/footer/img-2.jpg";
import image_3 from "../../assets/footer/img-3.jpg";
import image_4 from "../../assets/footer/img-4.jpg";
import image_5 from "../../assets/footer/img-5.jpg";
import image_6 from "../../assets/footer/img-6.jpg";

const Footer = () => {
  return (
    <section className="footer-main-container">
      <div className="footer">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-lg-3">
              <div className="footer-about">
                <h3>About Us</h3>
                <p>
                  Lorem ipsum dolor sit amet elit. Quisque eu lectus a leo
                  dictum nec non quam. Tortor eu placerat rhoncus, lorem quam
                  iaculis felis, sed lacus neque id eros
                </p>
                <div className="footer-social">
                  <a href className="me-2">
                    <RiFacebookFill className="fs-5" />
                  </a>
                  <a href className="me-2">
                    <FaInstagram className="fs-5" />
                  </a>
                  <a href className="me-2">
                    <RiFacebookFill className="fs-5" />
                  </a>
                  <a href className="me-2">
                    <RiFacebookFill className="fs-5" />
                  </a>
                  <a href className="me-2">
                    <RiFacebookFill className="fs-5" />
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="footer-contact">
                <h3>Get In Touch</h3>
                <p>
                  <i className="fa fa-map-marker-alt" />
                  123 Street, New York, USA
                </p>
                <p>
                  <i className="fa fa-phone-alt" />
                  +012 345 67890
                </p>
                <p>
                  <i className="fa fa-envelope" />
                  info@example.com
                </p>
                <p>
                  <i className="far fa-clock" />
                  Mon - Fri, 9AM - 10PM
                </p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="footer-links">
                <h3>Useful Links</h3>
                <a href>Lorem ipsum</a>
                <a href>tempus posuere </a>
                <a href>velit id accumsan</a>
                <a href>ut porttitor</a>
                <a href>Nam pretium</a>
                <a href>accumsan</a>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="footer-project">
                <h3>Latest Projects</h3>
                <a href>
                  <img src={image_1} alt="Image" />
                </a>
                <a href>
                  <img src={image_2} alt="Image" />
                </a>
                <a href>
                  <img src={image_3} alt="Image" />
                </a>
                <a href>
                  <img src={image_4} alt="Image" />
                </a>
                <a href>
                  <img src={image_5} alt="Image" />
                </a>
                <a href>
                  <img src={image_6} alt="Image" />
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
                    © <a href="#">Your Site Name</a>. All Rights Reserved
                  </p>
                </div>
              </div>
              <div className="col-md-6">
                <div className="copy-menu">
                  <a href>Terms</a>
                  <a href>Privacy</a>
                  <a href>Contact</a>
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
