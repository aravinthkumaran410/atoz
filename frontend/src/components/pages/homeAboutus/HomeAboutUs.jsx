import React, { useEffect } from "react";
import "./HomeAboutUs.css";
// import homeAboutImage from "../../assets/banner/aboutusGallery.png";
import homeAboutImage from "../../../assets/about/01.png";

import { IoCheckmarkCircleSharp } from "react-icons/io5";

// motion
import { motion } from "framer-motion";

//variants
import { fadeIn } from "../../framer/Varients";

const HomeAboutUs = ({ bgColor }) => {
  return (
    <section style={{ backgroundColor: bgColor }}>
      <div className="container HomeAboutUsContainer ">
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
            {/* <hr className="text-warning" /> */}
            <h2 class="site-title mt-3">
              We Provide Trusted <span>Cab Service</span> In The World
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
            <div class="about-list-wrapper">
              <ul class="about-list list-unstyled">
                <li>
                  <IoCheckmarkCircleSharp className="home-list-icons me-2" /> At
                  vero eos et accusamus et iusto odio.
                </li>
                <li>
                  <IoCheckmarkCircleSharp className="home-list-icons me-2" />{" "}
                  Established fact that a reader will be distracted.
                </li>
                <li>
                  <IoCheckmarkCircleSharp className="home-list-icons me-2" />{" "}
                  Sed ut perspiciatis unde omnis iste natus sit.
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
