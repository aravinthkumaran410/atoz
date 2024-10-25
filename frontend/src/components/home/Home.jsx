import React from "react";
import Header from "../header/Header";
import HeroCarousel from "../pages/homeHeroSection/HeroCarousel";
import BookingForm from "../homeBookingForm/BookingForm";

const Home = () => {
  return (
    <section>
      <Header />
      <HeroCarousel />
      <BookingForm />
    </section>
  );
};

export default Home;
