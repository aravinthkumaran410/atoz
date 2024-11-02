import React from "react";
import TaxiService from "../pages/taxiService/TaxiService";
import SubAllbanners from "../pages/subAllBanner/SubAllbanners";
import TripTables from "./trip/TripTables";
import StatePermit from "./StatePermit/StatePermit";
import OtherPermit from "./StatePermit/OtherPermit";

const Tariff = () => {
  return (
    <section className="tariff-container">
      <SubAllbanners title="tariff" />
      <TripTables />
      <StatePermit />

      <TaxiService />
    </section>
  );
};

export default Tariff;
