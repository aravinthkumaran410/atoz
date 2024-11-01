import React, { useEffect } from "react";
import "./HomeFeatures.css";

import safetyImage from "../../../assets/features/Group.png";
import fastPickUp from "../../../assets/features/pickup.png";
import rateImage from "../../../assets/features/money.png";
import supportImage from "../../../assets/features/support.png";

import AOS from "aos";
import { motion } from "framer-motion";

const Homefeatures = () => {
  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  return (
    <section>
      <section className="home-feature-container">
        <div className="feature-area feature-bg py-120">
          <div className="container mt-5">
            <div className="row">
              <div className="col-lg-6 mx-auto">
                <div className="site-heading text-center">
                  <span className="site-title-tagline">Feature</span>
                  <h2 className="site-title text-white fs-1">
                    Our Awesome Features
                  </h2>
                  <div className="heading-divider" />
                </div>
              </div>
            </div>
            <motion.div
              className="row"
              style={{ marginBottom: "100px" }}
              initial={{ opacity: 0, y: 200 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <motion.div
                className="col-md-6 col-lg-3"
                initial={{ opacity: 0, x: -200 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <div className="feature-item">
                  <div className="feature-icon">
                    <img src={safetyImage} alt="Safety Guarantee" />
                  </div>
                  <div className="feature-content">
                    <h4>Safety First</h4>
                    <p>
                      Your safety is our priority. Our drivers are trained to
                      ensure a secure and comfortable ride.
                    </p>
                  </div>
                </div>
              </motion.div>
              <motion.div
                className="col-md-6 col-lg-3"
                initial={{ opacity: 0, x: -200 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <div className="feature-item mt-lg-5">
                  <div className="feature-icon">
                    <img src={fastPickUp} alt="Fast Pickup" />
                  </div>
                  <div className="feature-content">
                    <h4>Quick Pickup</h4>
                    <p>
                      Enjoy prompt pick-up services, ensuring you never miss
                      your schedule. We value your time!
                    </p>
                  </div>
                </div>
              </motion.div>
              <motion.div
                className="col-md-6 col-lg-3"
                initial={{ opacity: 0, x: -200 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
              >
                <div className="feature-item">
                  <div className="feature-icon">
                    <img src={rateImage} alt="Affordable Rates" />
                  </div>
                  <div className="feature-content">
                    <h4>Affordable Rates</h4>
                    <p>
                      We offer competitive pricing with no hidden charges. Enjoy
                      transparent pricing for all rides.
                    </p>
                  </div>
                </div>
              </motion.div>
              <motion.div
                className="col-md-6 col-lg-3"
                initial={{ opacity: 0, x: -200 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="feature-item mt-lg-5">
                  <div className="feature-icon">
                    <img src={supportImage} alt="24/7 Support" />
                  </div>
                  <div className="feature-content">
                    <h4>24/7 Customer Support</h4>
                    <p>
                      Our support team is available around the clock to assist
                      you with any queries or concerns.
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Homefeatures;
