import React from "react";
import { Link } from "react-router-dom";
import { IoArrowForward } from "react-icons/io5";
import { Carousel } from "react-bootstrap";
import "./heroCarousel.css";

import { FaArrowRight } from "react-icons/fa6";

import banner_1 from "../../../assets/heroCarousel/godSlider.png";
import banner_2 from "../../../assets/heroCarousel/slider-1.jpg";
import banner_3 from "../../../assets/heroCarousel/slider-3.jpg";

import { motion } from "framer-motion";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa6";

const HeroCarousel = ({ selectedPlace }) => {
  return (
    <div className="home-container-carousel">
      <Carousel
        fade
        interval={3000}
        prevIcon={
          <div className="carousel-control-icon">
            <FaArrowLeft />
          </div>
        }
        nextIcon={
          <div className="carousel-control-icon">
            <FaArrowRight />
          </div>
        }
      >
        <Carousel.Item>
          <div className="image-container">
            <img className="d-block w-100" src={banner_1} alt="First slide" />
            <div className="gradient-overlay"></div>
          </div>
          <Carousel.Caption>
            <motion.div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "20px",
              }}
              initial={{ y: -50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <span
                className="hero-carousel-highlight text-center "
                style={{ fontSize: "20px" }}
              >
                <span style={{ color: "#fff" }}>WELCOME TO </span>
                <span className="animated-text fs-4">A TO Z DROP TAXI</span>
              </span>
            </motion.div>

            <motion.h3
              className="hero-carousel-title "
              initial={{ x: 200, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              BOOK
              <span> TAXI</span> FOR YOUR RIDE
            </motion.h3>
            {/* <p>Explore our curated collection of the season's must-haves.</p> */}
            {selectedPlace ? (
              <motion.div
                className="my-3"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: "20px",
                  gap: "20px",
                }}
                initial={{ y: -50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <span className="hero-carousel-selected-highlight">
                  {selectedPlace}
                  <FaMapMarkerAlt className="ms-3" />
                </span>
                <h4 className="fs-3 fw-bold animated-text ">@ Just ₹14/km</h4>
              </motion.div>
            ) : (
              <motion.p
                className="mt-3"
                initial={{ x: 200, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                style={{ fontSize: "14px", textAlign: "center" }}
              >
                There are many variations of passages available the majority
                have suffered alteration in some form generators on the Internet
                tend to repeat predefined chunks injected humour randomised
                words look even slightly believable.
              </motion.p>
            )}

            {/* <div className="d-flex justify-content-center">
              <button className="btn btn-dark text-light mt-4">
                <Link to="/home#booking-form" className="text-light">
                  Book Now <IoArrowForward />
                </Link>
              </button>
            </div> */}
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <div className="image-container">
            <img className="d-block w-100" src={banner_2} alt="First slide" />
            <div className="gradient-overlay"></div>
          </div>
          <Carousel.Caption>
            <motion.div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "20px",
              }}
              initial={{ y: -50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <span
                className="hero-carousel-highlight text-center"
                style={{ fontSize: "20px" }}
              >
                <span style={{ color: "#fff" }}>WELCOME TO </span>
                <span className="animated-text fs-4">A TO Z DROP TAXI</span>
              </span>
            </motion.div>

            <motion.h3
              className="hero-carousel-title "
              initial={{ x: 200, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              BOOK
              <span> FAST AND RELIABLE</span> SERVICE
            </motion.h3>
            {/* <p>Explore our curated collection of the season's must-haves.</p> */}
            {selectedPlace ? (
              <motion.div
                className="my-3"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: "20px",
                  gap: "20px",
                }}
                initial={{ y: -50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <span className="hero-carousel-selected-highlight">
                  {selectedPlace}
                  <FaMapMarkerAlt className="ms-3" />
                </span>
                <h4 className="fs-3 fw-bold animated-text ">@ Just ₹14/km</h4>
              </motion.div>
            ) : (
              <motion.p
                className="mt-3"
                initial={{ x: 200, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                style={{ fontSize: "14px", textAlign: "center" }}
              >
                Experience the convenience of booking your taxi online. Our
                reliable drivers ensure you reach your destination safely and on
                time, every time.
              </motion.p>
            )}

            {/* <div className="d-flex justify-content-center">
              <button className="btn btn-dark text-light mt-4">
                <Link to="/tariff" className="text-light">
                  View Tariff <IoArrowForward />
                </Link>
              </button>
            </div> */}
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <div className="image-container">
            <img className="d-block w-100" src={banner_3} alt="First slide" />
            <div className="gradient-overlay"></div>
          </div>
          <Carousel.Caption>
            <motion.div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "20px",
              }}
              initial={{ y: -50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <span
                className="hero-carousel-highlight text-center"
                style={{ fontSize: "20px" }}
              >
                <span style={{ color: "#fff" }}>WELCOME TO </span>
                <span className="animated-text fs-4">A TO Z DROP TAXI</span>
              </span>
            </motion.div>

            <motion.h3
              className="hero-carousel-title "
              initial={{ x: 200, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              BOOK
              <span> YOUR COMFORT </span>IS OUR PRIORITY
            </motion.h3>
            {/* <p>Explore our curated collection of the season's must-haves.</p> */}
            {selectedPlace ? (
              <motion.div
                className="my-3"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: "20px",
                  gap: "20px",
                }}
                initial={{ y: -50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <span className="hero-carousel-selected-highlight">
                  {selectedPlace}
                  <FaMapMarkerAlt className="ms-3" />
                </span>
                <h4 className="fs-3 fw-bold animated-text ">@ Just ₹14/km</h4>
              </motion.div>
            ) : (
              <motion.p
                className="mt-3"
                initial={{ x: 200, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                style={{ fontSize: "14px", textAlign: "center" }}
              >
                Enjoy a comfortable ride with our well-maintained vehicles. We
                prioritize your comfort and safety to make your journey
                enjoyable.
              </motion.p>
            )}

            {/* <div className="d-flex justify-content-center">
              <button className="btn btn-dark text-light mt-4">
                <Link to="/service" className="text-light">
                  view service <IoArrowForward />
                </Link>
              </button>
            </div> */}
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default HeroCarousel;
