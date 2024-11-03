import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import "./WhatsaApp.css"; // Ensure this includes your styles
import { FaWhatsapp } from "react-icons/fa"; // Using a WhatsApp icon from react-icons

export default function WhatsApp() {
  const { AtozInfo } = useContext(AppContext);
  const phoneNumber = AtozInfo[0]?.phone1 || "919876543210";

  const handleClick = () => {
    const message = "Hello, how can we help you?"; // Default message
    const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappLink, "_blank");
  };

  return (
    <div className="whatsapp-container">
      <button className="whatsapp-button" onClick={handleClick}>
        <FaWhatsapp size={34} />
      </button>
    </div>
  );
}
