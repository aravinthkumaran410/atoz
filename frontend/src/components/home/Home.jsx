import React from "react";
import Header from "../header/Header";
import HeroCarousel from "../pages/homeHeroSection/HeroCarousel";
import BookingForm from "../homeBookingForm/BookingForm";
import VehicleCard from "../VehicleCard/VehicleCard";

const Home = () => {
  return (
    <section>
      <Header />
      <HeroCarousel />
      <BookingForm />
      <VehicleCard/>
    </section>
  );
};

export default Home;
