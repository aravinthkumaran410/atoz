import React, { useEffect, useState } from "react";
import AxiosInstance from "../../../api/AxiosInstance";
import "./TripTables.css";
import { VscDebugBreakpointLog } from "react-icons/vsc";
import { FaIndianRupeeSign } from "react-icons/fa6";

const TripTables = () => {
  const [oneWayTrips, setOneWayTrips] = useState([]);
  const [roundTrips, setRoundTrips] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const oneWayResponse = await AxiosInstance.get(
          "/onewaytrip/get-one-way-trip"
        );
        const roundTripResponse = await AxiosInstance.get(
          "/roundtrip/get-round-way-trip"
        );

        setOneWayTrips(oneWayResponse.data);
        setRoundTrips(roundTripResponse.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, []);

  return (
    <section className="trip-table-container mt-5">
      <div className="trip-tables">
        <div className="table-responsive">
          <h2 className="text-center mb-3">One-Way Trips</h2>
          <table className="oneway-table">
            <thead>
              <tr>
                <th>Car Name</th>
                {/* <th>Passengers</th> */}
                {/* <th>AC Type</th> */}
                <th>One-Way Rate</th>
                <th>Driver Fare</th>
                <th>Additional Charges</th>
              </tr>
            </thead>
            <tbody>
              {oneWayTrips.map((trip) => (
                <tr key={trip._id}>
                  <td className="fs-5 ">{trip.carname}</td>
                  {/* <td>{trip.passenger}</td> */}
                  {/* <td>{trip.acType}</td> */}
                  <td>
                    <FaIndianRupeeSign style={{ fontSize: "10px" }} />
                    {trip.oneWayRate}
                  </td>
                  <td>
                    {" "}
                    <FaIndianRupeeSign style={{ fontSize: "10px" }} />
                    {trip.driverfare}
                  </td>
                  <td>
                    <ul>
                      {trip.additionalcharge.map((charge, index) => (
                        <li key={index}>
                          <VscDebugBreakpointLog className="me-2 text-warning" />
                          {charge}
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="table-responsive">
          <h2 className="text-center mb-3">Round-Trips</h2>
          <table className="roundtrip-table">
            <thead>
              <tr>
                <th>Car Name</th>
                {/* <th>Passengers</th> */}
                {/* <th>AC Type</th> */}
                <th>Round-Trip Rate</th>
                <th>Driver Fare</th>
                <th>Additional Charges</th>
              </tr>
            </thead>
            <tbody>
              {roundTrips.map((trip) => (
                <tr key={trip._id}>
                  <td className="fs-5 "> {trip.carname}</td>
                  {/* <td>{trip.passenger}</td> */}
                  {/* <td>{trip.acType}</td> */}
                  <td>
                    {" "}
                    <FaIndianRupeeSign style={{ fontSize: "10px" }} />
                    {trip.roundWayRate}
                  </td>
                  <td>
                    {" "}
                    <FaIndianRupeeSign style={{ fontSize: "10px" }} />
                    {trip.driverfare}
                  </td>
                  <td>
                    <ul>
                      {trip.additionalcharge.map((charge, index) => (
                        <li key={index}>
                          {" "}
                          <VscDebugBreakpointLog className="me-2 text-warning" />
                          {charge}
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default TripTables;
