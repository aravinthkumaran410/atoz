import React, { useEffect, useState } from "react";
import AxiosInstance from "../../../api/AxiosInstance";
import "./StatePermit.css";
import { VscArrowSwap } from "react-icons/vsc";
import OtherPermit from "./OtherPermit";

const StatePermit = () => {
  const [statePermits, setStatePermits] = useState([]);

  useEffect(() => {
    const fetchStatePermits = async () => {
      try {
        const res = await AxiosInstance.get("/statepermit/get-state-permit");
        console.log(res.data);
        setStatePermits(res.data);
      } catch (error) {
        console.error("Error fetching state permit data:", error);
      }
    };

    fetchStatePermits();
  }, []);

  return (
    <section className="trip-table-container mt-5">
      <div className="trip-tables">
        <div className="state-permit-container container-fluid ">
          <h2 className="mb-2 text-center">State Permit</h2>
          {statePermits.length > 0 ? (
            <table className="state-permit-table">
              <thead>
                <tr>
                  <th>Between States</th>
                  <th>Vehicle Types</th>
                  <th>Permit Rate</th>
                </tr>
              </thead>
              <tbody>
                {statePermits.map((statePermit) => {
                  const vehicleDetails = statePermit.vehicleDetails;

                  return vehicleDetails.map((vehicle, index) => (
                    <tr key={vehicle._id}>
                      {index === 0 ? (
                        <>
                          <td rowSpan={vehicleDetails.length} className="fs-5 ">
                            {statePermit.startLocation}
                            <VscArrowSwap className="mx-2" />{" "}
                            {statePermit.endLocation}
                          </td>
                          <td>{vehicle.type}</td>
                          <td>Rs. {vehicle.rate}</td>
                        </>
                      ) : (
                        <>
                          <td>{vehicle.type}</td>
                          <td>Rs. {vehicle.rate}</td>
                        </>
                      )}
                    </tr>
                  ));
                })}
              </tbody>
            </table>
          ) : (
            <p>No vehicle details available.</p>
          )}
        </div>
        <OtherPermit />
      </div>
    </section>
  );
};

export default StatePermit;
