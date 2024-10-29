import React from "react";
import SubAllbanners from "../pages/subAllBanner/SubAllbanners";
import HomeAboutUs from "../pages/homeAboutus/HomeAboutUs";
import WhyChoose from "../pages/whyChooseAbout/WhyChoose";

const About = () => {
  return (
    <section className="about-container m-0">
      <SubAllbanners title="About us" />
      <HomeAboutUs bgColor="#fff" />
      <WhyChoose />
    </section>
  );
};

export default About;
