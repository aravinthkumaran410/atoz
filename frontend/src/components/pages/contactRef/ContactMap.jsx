import React from "react";
import "./ContactMap.css";

const ContactMap = () => {
  return (
    <section className="contact-map-container">
      <div className="contact-map">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3900.806452891923!2d78.1574345!3d12.125391400000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bac17386e2aa42d%3A0x37b7218ec48cf28b!2sA%20To%20Z%20Drop%20Taxi%20service%20in%20Dharamapuri%20%2CChennai%2C%20Hosur%2C%20Salem%2C%20Coimbatore!5e0!3m2!1sen!2sin!4v1730119025519!5m2!1sen!2sin"
          width="600"
          height="450"
          style={{ border: "none" }}
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </section>
  );
};

export default ContactMap;
