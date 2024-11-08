import React from "react";
import "./whyChoose.css";

import taxiCarImage from "../../../assets/about/choose/car.png";
import taxiPng from "../../../assets/about/choose/taxi-1 1.png";
import taxiLocation from "../../../assets/about/choose/taxi-location.png";
import driverImage from "../../../assets/about/choose/driver.png";

import { motion } from "framer-motion";

const WhyChoose = () => {
  return (
    <section className="why-choose-container">
      <div className="choose-area py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="choose-content">
                <div
                  className="site-heading wow fadeInDown mb-4"
                  data-wow-delay=".25s"
                >
                  <motion.span
                    className="site-title-tagline"
                    initial={{ y: -200, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                  >
                    <i className="flaticon-drive" /> Why Choose Us
                  </motion.span>
                  <motion.h2
                    className="site-title text-white mb-5"
                    initial={{ y: -200, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                  >
                    We are dedicated <span>to provide</span> quality service
                  </motion.h2>
                  <motion.p
                    className="text-white"
                    initial={{ y: 200, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                  >
                    Our commitment to excellence ensures that you receive the
                    best service possible. Trust us to get you where you need to
                    go safely and efficiently.
                  </motion.p>
                </div>
                <motion.div
                  className="choose-img "
                  style={{}}
                  initial={{ y: 100, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                >
                  <img src={taxiCarImage} alt="car" style={{ width: "100%" }}  loading="lazy"/>
                </motion.div>
              </div>
            </div>
            <div className="col-lg-6">
              <div
                className="choose-content-wrapper wow fadeInRight"
                data-wow-delay=".25s"
              >
                <motion.div
                  className="choose-item"
                  initial={{ opacity: 0, y: 200 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <span className="choose-count">01</span>
                  <div className="choose-item-icon">
                    <img src={taxiPng} alt="taxi"  loading="lazy" />
                  </div>
                  <div className="choose-item-info">
                    <h3>Best Quality Taxi</h3>
                    <p>
                      Our fleet is maintained to the highest standards to ensure
                      a safe and comfortable ride for all our customers.
                    </p>
                  </div>
                </motion.div>
                <motion.div
                  className="choose-item ms-lg-5"
                  initial={{ opacity: 0, y: 200 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <span className="choose-count">02</span>
                  <div className="choose-item-icon">
                    <img src={driverImage} alt="driver"  loading="lazy"/>
                  </div>
                  <div className="choose-item-info">
                    <h3>Expert Drivers</h3>
                    <p>
                      Our drivers are experienced professionals, trained to
                      provide you with the best service possible.
                    </p>
                  </div>
                </motion.div>
                <motion.div
                  className="choose-item mb-lg-0"
                  initial={{ opacity: 0, y: 200 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <span className="choose-count">03</span>
                  <div className="choose-item-icon">
                    <img src={taxiLocation} alt="taxi location"  loading="lazy" />
                  </div>
                  <div className="choose-item-info">
                    <h3>Many Locations</h3>
                    <p>
                      We serve a wide range of locations, ensuring that you can
                      get to where you need to go.
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
