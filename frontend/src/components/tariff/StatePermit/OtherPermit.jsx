import React, { useEffect, useState } from "react";
import AxiosInstance from "../../../api/AxiosInstance";
import "./StatePermit.css";
import { VscArrowSwap } from "react-icons/vsc";

const OtherPermit = () => {
  const [OtherPermit, setOtherPermit] = useState([]);

  useEffect(() => {
    const fetchStatePermits = async () => {
      try {
        const res = await AxiosInstance.get("/otherrate/get-other-rate");
        console.log(res.data);
        setOtherPermit(res.data);
      } catch (error) {
        console.error("Error fetching Other permit data:", error);
      }
    };

    fetchStatePermits();
  }, []);

  return (
    <div className="state-permit-container container-fluid ">
      <h2 className="mb-2 text-center">Other Permit</h2>
      {OtherPermit.length > 0 ? (
        <table className="state-permit-table">
          <thead>
            <tr>
              <th>Type</th>
              <th>Rate</th>
              <th>Comment</th>
            </tr>
          </thead>
          <tbody>
            {OtherPermit.map((OtherPermit) => {
              return (
                <tr key={OtherPermit.id}>
                  <td>{OtherPermit.type}</td>
                  <td>{OtherPermit.rate}</td>
                  <td>{OtherPermit.comment}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p>No Other Permits details available.</p>
      )}
    </div>
  );
};

export default OtherPermit;
