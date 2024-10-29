import React, { useRef,useState } from "react";

import HeroCarousel from "../pages/homeHeroSection/HeroCarousel";
import BookingForm from "../homeBookingForm/BookingForm";
import VehicleCard from "../VehicleCard/VehicleCard";
import HomeAboutUs from "../pages/homeAboutus/HomeAboutUs";
import Homefeatures from "../pages/homefeatures/Homefeatures";
import Service from "../pages/homeService/Service";
import ContactRef from "../pages/homeContactRef/ContactRef";

const Home = () => {
  const bookingFormRef = useRef(null);
  const [selVeh, setSelVeh] = useState();
  return (
    <section>
      <HeroCarousel />
      <div ref={bookingFormRef}>
        <BookingForm selVeh={selVeh}/>
      </div>

      <HomeAboutUs bgColor="#fff5de" />
      <VehicleCard setSelVeh={setSelVeh} bookingFormRef={bookingFormRef} />
      <Homefeatures />
      <Service />
      <ContactRef bookingFormRef={bookingFormRef} />
    </section>
  );
};

export default Home;
