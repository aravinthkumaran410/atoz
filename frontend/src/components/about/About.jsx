import React from "react";
import SubAllbanners from "../pages/subAllBanner/SubAllbanners";
import HomeAboutUs from "../pages/homeAboutus/HomeAboutUs";
import WhyChoose from "../pages/whyChooseAbout/WhyChoose";
import SEO from "../SEO";

// check

const About = () => {
  return (
    <>
      <SEO
        title="A to Z Drop Taxi-about"
        description="Beginner friendly page for learning React Helmet."
        name="wwwwwww"
        type="article"
        linkk="https://ato-z-drop-taxi.vercel.app/about"
      />
      <section className="about-container m-0">
        <SubAllbanners title="About us" />
        <HomeAboutUs bgColor="#fff" />
        <WhyChoose />
      </section>
    </>
  );
};

export default About;
