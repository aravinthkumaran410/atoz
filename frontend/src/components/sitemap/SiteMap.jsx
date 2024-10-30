import React from "react";
import SubAllbanner from "../pages/subAllBanner/SubAllbanners";
import "./SiteMpa.css";
import { useNavigate } from "react-router-dom";
const SiteMap = () => {
  const navigate = useNavigate();
  const OurCities = [
    "Madurai",
    "Chennai",
    "Hyderabad",
    "Kerala",
    "Mumbai",
    "Delhi",
    "Bangalore",
    "Pune",
    "Jaipur",
    "Kolkata",
    "Ooty",
  ];

  let result = [];

  for (let i = 0; i < OurCities.length; i++) {
    for (let j = 0; j < OurCities.length; j++) {
      if (i !== j) {
        result.push(OurCities[i] + " - " + OurCities[j]);
      }
    }
  }

  const handleSelectedPlace = (place) => {
    navigate("/home#booking-form", { state: { place } });
  };

  return (
    <section>
      <SubAllbanner title="sitemap" />
      <section className="sitemap-city-container">
        {result.map((cityPair, index) => (
          <div
            key={index}
            className="city-pair"
            onClick={() => {
              handleSelectedPlace(cityPair);
            }}
            
          >
            {cityPair}
          </div>
        ))}
      </section>
    </section>
  );
};

export default SiteMap;
