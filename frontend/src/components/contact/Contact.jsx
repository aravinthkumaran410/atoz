import React from "react";
import SubAllbanners from "../pages/subAllBanner/SubAllbanners";
import ContactRef from "../pages/contactRef/ContactRef";
import ContactMap from "../pages/contactRef/ContactMap";

const Contact = () => {
  return (
    <section className="contact-container">
      <SubAllbanners title="contact" />
      <ContactRef />
      <ContactMap />
    </section>
  );
};

export default Contact;
