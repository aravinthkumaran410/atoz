import React from "react";
import "./ContactRef.css";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";
import { FaHeadset } from "react-icons/fa";
import { motion } from "framer-motion";

const ContactRef = () => {
  return (
    <section className="home-contact-ref-container">
      <div className="cta-area">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-7 text-center text-lg-start">
              <div className="cta-text cta-divider">
                <motion.h1
                  initial={{ y: -200, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  Book Your Cab It's Simple And Affordable
                </motion.h1>
                <p>
                  It is a long established fact that a reader will be distracted
                  by the readable content of a page when looking at its layout
                  point of using is that it has normal distribution of letters.
                </p>
              </div>
            </div>
            <div className="col-lg-5 text-center text-lg-end">
              <div className="mb-5">
                <Link to="#" className="cta-number ">
                  <FaHeadset className="me-4" />
                  +2 123 654 7898
                </Link>
              </div>
              <motion.div
                className="cta-btn"
                initial={{ x: -200, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <button className=" home-ref--contact-button">
                  Book Your Cab <FaArrowRight className="ms-2" />
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactRef;
