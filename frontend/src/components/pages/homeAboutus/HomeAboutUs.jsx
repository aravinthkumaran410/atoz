import React from "react";
import "./HomeAboutUs.css";
import homeAboutImage from "../../../assets/about/01.png";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import { motion } from "framer-motion";

const HomeAboutUs = ({ bgColor }) => {
  return (
    <section style={{ backgroundColor: bgColor }}>
      <div className="container HomeAboutUsContainer">
        <motion.div
          className="HomeAboutUsLeftContainer"
          initial={{ x: -200, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <img src={homeAboutImage} alt="About Us" className="img-fluid" />
        </motion.div>
        <div className="HomeAboutUsRightContainer">
          <div className="HomeAboutHeaderContainer">
            <motion.h6
              className="HomeAboutHeader text-left mt-3"
              initial={{ y: -100, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              ABOUT US
            </motion.h6>
            <h2 className="site-title mt-3">
              We Provide Trusted <span>Cab Service</span> Across India
            </h2>
          </div>
          <motion.div
            initial={{ y: 200, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <p className="text-justify mt-3">
              <br />
              <span className="fw-bold">Welcome to A to Z Drop Taxi</span>, we
              believe that transportation is more than just getting from point A
              to point B – it’s about providing a seamless and enjoyable
              experience. Whether you're commuting to work, heading to the
              airport, or exploring the city, we are dedicated to making your
              journey comfortable and convenient.
            </p>
            <div className="about-list-wrapper">
              <ul className="about-list list-unstyled">
                <li>
                  <IoCheckmarkCircleSharp className="home-list-icons me-2" />
                  Reliable and punctual service for all your transportation
                  needs.
                </li>
                <li>
                  <IoCheckmarkCircleSharp className="home-list-icons me-2" />
                  Professional drivers committed to ensuring your safety and
                  comfort.
                </li>
                <li>
                  <IoCheckmarkCircleSharp className="home-list-icons me-2" />
                  Affordable rates without compromising on quality.
                </li>
                <li>
                  <IoCheckmarkCircleSharp className="home-list-icons me-2" />
                  24/7 availability for all your travel requirements.
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HomeAboutUs;
