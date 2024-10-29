import React from "react";
import SubAllbanners from "../pages/subAllBanner/SubAllbanners";
import Service from "../pages/homeService/Service";

const MainService = () => {
  return (
    <section className="serviceMainContainer">
      <SubAllbanners title="Our Service" />
      <Service />
    </section>
  );
};

export default MainService;
