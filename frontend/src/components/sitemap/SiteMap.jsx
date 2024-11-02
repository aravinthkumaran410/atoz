import React, { useState, useEffect } from "react";
import SubAllbanner from "../pages/subAllBanner/SubAllbanners";
import "./SiteMpa.css";
import AxiosInstance from "../../api/AxiosInstance";
import { useNavigate } from "react-router-dom";

const SiteMap = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const res = await AxiosInstance.get("/traffic/gettraffic");
        setCities(res.data.Traffiname || []);
      } catch (err) {
        setError("Failed to fetch cities. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchCities();
  }, []);

  const generateCityPairs = (cities) => {
    return cities
      .flatMap((cityA) =>
        cities.map((cityB) => (cityA !== cityB ? `${cityA} - ${cityB}` : null))
      )
      .filter(Boolean);
  };

  const result = generateCityPairs(cities);

  const handleSelectedPlace = (place) => {
    const placeName = place.replace(/\s+-\s+/g, "-").toLowerCase();
    navigate(`/home/${placeName}`, { state: { place } });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <section>
      <SubAllbanner title="Site Map" />
      <section className="sitemap-city-container">
        {result.map((cityPair, index) => (
          <div
            key={index}
            className="city-pair"
            style={{ textTransform: "capitalize" }}
            onClick={() => handleSelectedPlace(cityPair)}
            role="button"
            tabIndex={0}
            onKeyPress={(e) =>
              e.key === "Enter" && handleSelectedPlace(cityPair)
            }
          >
            {cityPair}
          </div>
        ))}
      </section>
    </section>
  );
};

export default SiteMap;
