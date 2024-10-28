import React, { useState, useEffect } from "react";
import "./VehicleCard.css";
import AxiosInstance from "../../api/AxiosInstance";

const VehicleCard = () => {
  const [vehicle, setVehicle] = useState();

  useEffect(() => {
    getVehicle()
  }, []);



  const getVehicle = async () => {
    try {
      const responseVehicle = await AxiosInstance.get(
        "/onewaytrip/getAllVechicles"
      );
      console.log(responseVehicle);
    } catch (error) {
      console.log(error);
      
    }
  };
  return (
    <>
      <div className="container mt-3 mb-3">
        <div className="row">
          <div className="col-md-4">
            <div className="vehicle-card">
              <div className="vehicle-details">
                <div className="vehicle-img-wrapper">
                  <img
                    className="vehicle-img"
                    src="assets/image/innova.png"
                    alt="vehicles"
                  />
                </div>
                <div className="vehicle-name-wrapper">
                  <p className="vehicle-name">Innova Crysta</p>
                </div>

                <div className="vehicle-fare-details-card">
                  <div className="rate-icon">
                    <img src="assets/image/taxi.png" />
                  </div>
                  <div className="vehicle-fare-details">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <span>One way Tariff :</span>
                      <span>15/km</span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <span>Two way Tariff :</span>
                      <span>13/km</span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <span>Passengers :</span>
                      <span>4 + 1</span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <span>Air-Conditioner :</span>
                      <span>AC</span>
                    </div>
                  </div>

                  <div>
                    <button className="booking-btn">CHOOSE PLAN</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VehicleCard;
