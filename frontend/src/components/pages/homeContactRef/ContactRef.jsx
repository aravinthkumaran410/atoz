import React, { useContext } from "react";
import "./ContactRef.css";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";
import { FaHeadset } from "react-icons/fa";
import { motion } from "framer-motion";
import { AppContext } from "../../../context/AppContext";

const ContactRef = ({ bookingFormRef }) => {
  const navigate = useNavigate();
  const { AtozInfo } = useContext(AppContext);

  const handleFormButton = () => {
    console.log("check");
    if (bookingFormRef.current) {
      bookingFormRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="home-contact-ref-container">
      <div className="cta-area">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-7 text-center text-lg-start">
              <div className="cta-text cta-divider">
                <h1>Book Your Cab It's Simple And Affordable</h1>
                <p>
                  It is a long established fact that a reader will be distracted
                  by the readable content of a page when looking at its layout
                  point of using is that it has normal distribution of letters.
                </p>
              </div>
            </div>
            <div className="col-lg-5 text-center text-lg-end">
              <div className="mb-5">
                {AtozInfo && AtozInfo.length > 0 && (
                  <>
                    <a
                      className="para me-3 fw-bold fs-3"
                      href={`https://wa.me/91${AtozInfo[0]?.phone}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: "none", color: "white" }}
                    >
                      <FaWhatsapp className="me-4" />
                      +91 {AtozInfo[0]?.phone}
                    </a>
                    <br />
                    <a
                      className="para me-3 fw-bold fs-3"
                      href={`https://wa.me/91${AtozInfo[0]?.phone1}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: "none", color: "white" }}
                    >
                      <FaHeadset className="me-4" />
                      +91 {AtozInfo[0]?.phone1}
                    </a>
                  </>
                )}
              </div>
              <motion.div
                className="cta-btn"
                initial={{ x: -200, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <button
                  className=" home-ref--contact-button"
                  onClick={handleFormButton}
                >
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
