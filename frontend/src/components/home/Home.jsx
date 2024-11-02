import React, { useRef, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import HeroCarousel from "../pages/homeHeroSection/HeroCarousel";
import BookingForm from "../homeBookingForm/BookingForm";
import VehicleCard from "../VehicleCard/VehicleCard";
import HomeAboutUs from "../pages/homeAboutus/HomeAboutUs";
import Homefeatures from "../pages/homefeatures/Homefeatures";
import Service from "../pages/homeService/Service";
import ContactRef from "../pages/homeContactRef/ContactRef";
import TaxiService from "../pages/taxiService/TaxiService";

import SEO from "../SEO";

const Home = () => {
  const bookingFormRef = useRef(null);
  const [selVeh, setSelVeh] = useState();

  const location = useLocation();
  const selectedPlace = location.state?.place;

  useEffect(() => {
    if (location.hash === "#booking-form") {
      bookingFormRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);
  return (
    <section>
      <SEO
        title="A to Z Drop Taxi"
        description="Beginner friendly page for learning React Helmet."
        name="wwwwwww"
        type="article"
      />
      <HeroCarousel />
      {selectedPlace ? (
        <div ref={bookingFormRef} id="booking-form">
          <BookingForm selVeh={selVeh} selectedPlace={selectedPlace} />
        </div>
      ) : (
        <div ref={bookingFormRef} id="booking-form">
          <BookingForm selVeh={selVeh} selectedPlace={selectedPlace} />
        </div>
      )}

      <HomeAboutUs bgColor="#fff5de" />
      <VehicleCard setSelVeh={setSelVeh} bookingFormRef={bookingFormRef} />
      <TaxiService />
      <Homefeatures />
      <Service />
      <ContactRef bookingFormRef={bookingFormRef} />
    </section>
  );
};

export default Home;
