import React, { useContext } from "react";
import { FloatingWhatsApp } from "react-floating-whatsapp";
import "./WhatsaApp.css";
import { AppContext } from "../../context/AppContext";
export default function WhatsApp() {
  const { AtozInfo } = useContext(AppContext);
  const phoneNumber = AtozInfo[0]?.phone1 || "919876543210";
  const onMessageReceived = (message) => {
    const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappLink, "_blank");
  };
  return (
    <div className="whatsapp-container">
      <FloatingWhatsApp
        phoneNumber={phoneNumber}
        accountName="A to Z Drop Taxi"
        messageText="Hello, how can we help you?"
        onMessageReceived={onMessageReceived}
        style={{ width: "93", height: "93" }}
      />
    </div>
  );
}
