import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./TaxiService.css";
import { IoArrowForward } from "react-icons/io5";
import { IoArrowBack } from "react-icons/io5";
import AxiosInstance from "../../../api/AxiosInstance";

const TaxiService = () => {
  const [isSelectCity, setIsSelectCity] = useState(null);
  const [selectedCitiesData, setSelectedCitiesData] = useState([]);
  const [mergeCitiesData, setMergeCitiesData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const citiesPerPage = 20;

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ourCities, setOurCities] = useState([]);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const res = await AxiosInstance.get("/traffic/gettraffic");
        setOurCities(res.data);
      } catch (err) {
        setError("Failed to fetch cities. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchCities();
  }, []);

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
    "ooty",
  ];

  useEffect(() => {
    if (isSelectCity) {
      const filteredCities = OurCities.filter((city) => city !== isSelectCity);
      setSelectedCitiesData(filteredCities);
      setMergeCitiesData(
        filteredCities.map((place) => `${isSelectCity} - ${place}`)
      );
    }
  }, [isSelectCity]);

  const handleSelectedPlace = (place) => {
    navigate("/home#booking-form", { state: { place } });
  };

  // Pagination logic
  const indexOfLastCity = currentPage * citiesPerPage;
  const indexOfFirstCity = indexOfLastCity - citiesPerPage;
  const currentCities = OurCities.slice(indexOfFirstCity, indexOfLastCity);
  const totalPages = Math.ceil(OurCities.length / citiesPerPage);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <section className="cities-service-container">
      <div className="cities-header mt-5">
        <div className="site-heading text-center">
          <motion.span
            className="site-title-tagline"
            initial={{ y: -100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            Taxi Service
          </motion.span>
          <h2 className="site-title">One Way Taxi Service in Cities</h2>
          <div className="heading-divider" />
        </div>
      </div>
      {isSelectCity ? (
        <article>
          {mergeCitiesData.length > 0 ? (
            <div className="merge-cities-list">
              {mergeCitiesData.map((item, index) => (
                <div key={index} className="merge-city-item">
                  <p
                    style={{ cursor: "pointer" }}
                    className="m-2 fw-bold"
                    onClick={() => handleSelectedPlace(item)}
                  >
                    {item}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            "No data"
          )}
        </article>
      ) : (
        <article className="all-cities-container mb-5">
          <div className="cities-grid">
            {currentCities.map((city, index) => (
              <div key={index} className="city-item">
                <p
                  style={{ cursor: "pointer" }}
                  onClick={() => setIsSelectCity(city)}
                >
                  {city}
                </p>
              </div>
            ))}
          </div>
          <div className="pagination">
            <IoArrowBack
              className="fs-4 me-3"
              style={{ cursor: "pointer" }}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            />

            <span>
              {currentPage} of {totalPages}
            </span>

            <IoArrowForward
              className="fs-4 ms-3"
              style={{ cursor: "pointer" }}
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            />
          </div>
        </article>
      )}
    </section>
  );
};

export default TaxiService;
