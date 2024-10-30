import React from "react";
import TaxiService from "../pages/taxiService/TaxiService";
import SubAllbanners from "../pages/subAllBanner/SubAllbanners";

const Tariff = () => {
  return (
    <section className="tariff-container">
      <SubAllbanners title="tariff" />
      <TaxiService />
    </section>
  );
};

export default Tariff;
