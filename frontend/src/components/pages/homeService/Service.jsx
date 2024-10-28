import React from "react";
import "./Service.css";

import image_1 from "../../../assets/service/01.jpg";
import image_2 from "../../../assets/service/02.jpg";
import image_3 from "../../../assets/service/04.jpg";
import image_4 from "../../../assets/service/03.jpg";
import image_5 from "../../../assets/service/06.jpg";
import image_6 from "../../../assets/service/05.jpg";

//icons
import icon_1 from "../../../assets/service/Group (2).png";
import icon_2 from "../../../assets/service/Group (3).png";
import icon_3 from "../../../assets/service/Group (4).png";
import icon_4 from "../../../assets/service/Group (5).png";
import icon_5 from "../../../assets/service/Group (6).png";

import { motion } from "framer-motion";

const Service = () => {
  return (
    <section className="service-container">
      <div className="service-area bg py-120">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 mx-auto">
              <div className="site-heading text-center">
                <motion.span
                  className="site-title-tagline"
                  initial={{ y: -100, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                >
                  Services
                </motion.span>
                <h2 className="site-title">Our Best Services For You</h2>
                <div className="heading-divider" />
              </div>
            </div>
          </div>
          <motion.div
            className="row"
            initial={{ opacity: 0, y: 200 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <motion.div
              className="col-md-6 col-lg-4"
              initial={{ opacity: 0, x: 200 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div
                className="service-item wow fadeInUp"
                data-wow-delay=".25s"
                style={{
                  visibility: "visible",
                  animationDelay: "0.25s",
                  animationName: "fadeInUp",
                }}
              >
                <div className="service-img">
                  <img src={image_1} alt />
                </div>
                <div className="service-icon">
                  <img src={icon_1} alt />
                </div>
                <div className="service-content">
                  <h3 className="service-title my-3 fw-bold">Online Booking</h3>
                  <p className="service-text">
                    There are many variations of passages orem psum available
                    but the majority have suffered alteration in some form by
                    injected.
                  </p>
                </div>
              </div>
            </motion.div>
            <motion.div
              className="col-md-6 col-lg-4"
              initial={{ opacity: 0, x: 200 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div
                className="service-item wow fadeInUp"
                data-wow-delay=".25s"
                style={{
                  visibility: "visible",
                  animationDelay: "0.25s",
                  animationName: "fadeInUp",
                }}
              >
                <div className="service-img">
                  <img src={image_2} alt />
                </div>
                <div className="service-icon">
                  <img src={icon_3} alt />
                </div>
                <div className="service-content">
                  <h3 className="service-title my-3 fw-bold">City Transport</h3>
                  <p className="service-text">
                    There are many variations of passages orem psum available
                    but the majority have suffered alteration in some form by
                    injected.
                  </p>
                </div>
              </div>
            </motion.div>
            <motion.div
              className="col-md-6 col-lg-4"
              initial={{ opacity: 0, x: 200 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <div
                className="service-item wow fadeInUp"
                data-wow-delay=".25s"
                style={{
                  visibility: "visible",
                  animationDelay: "0.25s",
                  animationName: "fadeInUp",
                }}
              >
                <div className="service-img">
                  <img src={image_4} alt />
                </div>
                <div className="service-icon">
                  <img src={icon_2} alt />
                </div>
                <div className="service-content">
                  <h3 className="service-title my-3 fw-bold">
                    Airport Transport
                  </h3>
                  <p className="service-text">
                    There are many variations of passages orem psum available
                    but the majority have suffered alteration in some form by
                    injected.
                  </p>
                </div>
              </div>
            </motion.div>
            <motion.div
              className="col-md-6 col-lg-4"
              initial={{ opacity: 0, x: 200 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div
                className="service-item wow fadeInUp"
                data-wow-delay=".25s"
                style={{
                  visibility: "visible",
                  animationDelay: "0.25s",
                  animationName: "fadeInUp",
                }}
              >
                <div className="service-img">
                  <img src={image_3} alt />
                </div>
                <div className="service-icon">
                  <img src={icon_3} alt />
                </div>
                <div className="service-content">
                  <h3 className="service-title my-3 fw-bold">
                    Business Transport
                  </h3>
                  <p className="service-text">
                    There are many variations of passages orem psum available
                    but the majority have suffered alteration in some form by
                    injected.
                  </p>
                </div>
              </div>
            </motion.div>
            <motion.div
              className="col-md-6 col-lg-4"
              initial={{ opacity: 0, x: 200 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div
                className="service-item wow fadeInUp"
                data-wow-delay=".25s"
                style={{
                  visibility: "visible",
                  animationDelay: "0.25s",
                  animationName: "fadeInUp",
                }}
              >
                <div className="service-img">
                  <img src={image_5} alt />
                </div>
                <div className="service-icon">
                  <img src={icon_5} alt />
                </div>
                <div className="service-content">
                  <h3 className="service-title my-3 fw-bold">
                    Regular Transport
                  </h3>
                  <p className="service-text">
                    There are many variations of passages orem psum available
                    but the majority have suffered alteration in some form by
                    injected.
                  </p>
                </div>
              </div>
            </motion.div>
            <motion.div
              className="col-md-6 col-lg-4"
              initial={{ opacity: 0, x: 200 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <div
                className="service-item wow fadeInUp"
                data-wow-delay=".25s"
                style={{
                  visibility: "visible",
                  animationDelay: "0.25s",
                  animationName: "fadeInUp",
                }}
              >
                <div className="service-img">
                  <img src={image_6} alt />
                </div>
                <div className="service-icon">
                  <img src={icon_4} alt />
                </div>
                <div className="service-content">
                  <h3 className="service-title my-3 fw-bold">Tour Transport</h3>
                  <p className="service-text">
                    There are many variations of passages orem psum available
                    but the majority have suffered alteration in some form by
                    injected.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Service;
