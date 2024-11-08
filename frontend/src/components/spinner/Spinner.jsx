import React from "react";
import "./Spinner.css";
import logo from "../../assets/logo_1 2.png";

const Spinner = () => {
  return (
    <div className="spinner-container">
      <div className="spinner">
        <img src={logo} alt="Loading" className="spinner-image" />
        <div className="spinner-border"></div>
      </div>
    </div>
  );
};

export default Spinner;
