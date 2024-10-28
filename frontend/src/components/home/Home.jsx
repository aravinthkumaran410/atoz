import React from "react";

import HeroCarousel from "../pages/homeHeroSection/HeroCarousel";
import BookingForm from "../homeBookingForm/BookingForm";
import HomeAboutUs from "../pages/homeAboutus/HomeAboutUs";
import Homefeatures from "../pages/homefeatures/Homefeatures";
import Service from "../pages/homeService/Service";
import ContactRef from "../pages/homeContactRef/ContactRef";

const Home = () => {
  return (
    <section>
      <HeroCarousel />
      <BookingForm />
      <HomeAboutUs />
      <Homefeatures />
      <Service />
      <ContactRef />
    </section>
  );
};

export default Home;
