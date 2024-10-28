import React from "react";
import "./ContactRef.css";
import { Link } from "react-router-dom";

const ContactRef = () => {
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
                <Link to="#" className="cta-number ">
                  <i className="far fa-headset" />
                  +2 123 654 7898
                </Link>
              </div>
              <div className="cta-btn">
                <button className=" home-ref--contact-button">
                  Book Your Cab <i className="fas fa-arrow-right" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactRef;
