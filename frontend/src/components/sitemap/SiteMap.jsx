import React, { useState, useEffect } from "react";
import SubAllbanner from "../pages/subAllBanner/SubAllbanners";
import "./SiteMpa.css";
import AxiosInstance from "../../api/AxiosInstance";
import { useNavigate } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const SiteMap = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [OurCities, setOurCities] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(50);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const res = await AxiosInstance.get("/traffic/gettraffic");
        setOurCities(res.data.Traffiname);
        console.log(res.data.Traffiname);
      } catch (err) {
        setError("Failed to fetch cities. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchCities();
  }, []);

  let result = [];

  for (let i = 0; i < OurCities.length; i++) {
    for (let j = 0; j < OurCities.length; j++) {
      if (i !== j) {
        result.push(OurCities[i] + " - " + OurCities[j]);
      }
    }
  }

  const totalPages = Math.ceil(result.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentResults = result.slice(startIndex, startIndex + rowsPerPage);

  const handleSelectedPlace = (place) => {
    navigate("/home#booking-form", { state: { place } });
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <section>
      <SubAllbanner title="sitemap" />
      <section className="sitemap-city-container">
        {currentResults.map((cityPair, index) => (
          <div
            key={index}
            className="city-pair"
            style={{ textTransform: "capitalize" }}
            onClick={() => handleSelectedPlace(cityPair)}
          >
            {cityPair}
          </div>
        ))}
      </section>
      <div className="pagination my-3">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="me-3"
          style={{
            backgroundColor: "transparent",
            border: "none",
            fontSize: "20px",
          }}
        >
          <FaChevronLeft />
        </button>
        <span>
          {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="ms-3"
          style={{
            backgroundColor: "transparent",
            border: "none",
            fontSize: "20px",
          }}
        >
          <FaChevronRight />
        </button>
      </div>
    </section>
  );
};

export default SiteMap;
