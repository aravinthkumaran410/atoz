import React, { useState, useEffect } from "react";
import "./VehicleCard.css";
import AxiosInstance from "../../api/AxiosInstance";
import { motion } from "framer-motion";

const VehicleCard = ({ setSelVeh, bookingFormRef }) => {
  const [vehicle, setVehicle] = useState();

  useEffect(() => {
    getVehicle();
  }, []);

  const getVehicle = async () => {
    try {
      const responseVehicle = await AxiosInstance.get(
        "/onewaytrip/getAllVechicles"
      );
      setVehicle(responseVehicle.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const selectedVehicle = (vehicle) => {
    setSelVeh(vehicle);
    bookingFormRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="container mt-3 mb-3">
      <div className="row">
        <div className="col-lg-12 mt-5 mb-5">
          <div className="site-heading text-center">
            <motion.span
              className="site-title-tagline"
              initial={{ y: -100, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              Vehicles
            </motion.span>
            <h2 className="site-title">Our Best Vehicles For You</h2>
            <div className="heading-divider" />
          </div>
        </div>
        {vehicle &&
          vehicle.map((eachVehicle) => (
            <div
              className="col-lg-4 col-md-6 col-sm-12 mb-4"
              key={eachVehicle._id}
            >
              <motion.div
                className="vehicle-card"
                initial={{ y: 100, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <div className="vehicle-details">
                  <div className="vehicle-img-wrapper">
                    <img
                      className="vehicle-img"
                      src={eachVehicle.image}
                      alt="vehicles"
                      width="100%"
                      height="100%"
                      loading="lazy"
                    />
                  </div>
                  <div className="vehicle-name-wrapper">
                    <p className="vehicle-name">{eachVehicle.carname}</p>
                  </div>
                  <div className="vehicle-fare-details-card">
                    <div className="rate-icon">
                      <img
                        src="assets/image/taxi.png"
                        alt="Rate Icon"
                        width="100%"
                        height="100%"
                        loading="lazy"
                      />
                    </div>
                    <div className="vehicle-fare-details">
                      <div className="d-flex justify-content-between">
                        <span>One way Tariff :</span>
                        <span>{eachVehicle.oneWayRate}/km</span>
                      </div>
                      <div className="d-flex justify-content-between">
                        <span>Two way Tariff :</span>
                        <span>{eachVehicle.twoWayRate}/km</span>
                      </div>
                      <div className="d-flex justify-content-between">
                        <span>Passengers :</span>
                        <span>{eachVehicle.passenger} + 1</span>
                      </div>
                      <div className="d-flex justify-content-between">
                        <span>Air-Conditioner :</span>
                        <span>{eachVehicle.acType}</span>
                      </div>
                    </div>
                    <div>
                      <button
                        onClick={() => selectedVehicle(eachVehicle)}
                        className="booking-btn booking-btn1"
                      >
                        CHOOSE PLAN
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default VehicleCard;
