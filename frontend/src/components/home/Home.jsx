import React from "react";

import HeroCarousel from "../pages/homeHeroSection/HeroCarousel";
import BookingForm from "../homeBookingForm/BookingForm";
import VehicleCard from "../VehicleCard/VehicleCard";
import HomeAboutUs from "../pages/homeAboutus/HomeAboutUs";
import Homefeatures from "../pages/homefeatures/Homefeatures";
import Service from "../pages/homeService/Service";
import ContactRef from "../pages/homeContactRef/ContactRef";


const Home = () => {
  return (
    <section>
      <HeroCarousel />
      <BookingForm />
      <VehicleCard/>
      <HomeAboutUs />
      <Homefeatures />
      <Service />
      <ContactRef />

    </section>
  );
};

export default Home;
