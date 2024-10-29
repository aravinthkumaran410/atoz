import React from "react";
import { Link } from "react-router-dom";
import { GrHomeRounded } from "react-icons/gr";
import "./SubAllBanner.css";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

const SubAllbanners = ({ title }) => {
  return (
    <div className="SubAllbanners-hero-image-container">
      <div className="SubAllbanners-hero-image d-flex justify-content-center align-items-center">
        <div className="text-center">
          <h1 className="text-light fw-bold">
            {title.toString().toUpperCase()}
          </h1>

          <nav aria-label="breadcrumb ">
            <Link to="/" className="text-light fs-5 me-2">
              Home
            </Link>
            <span className="text-light fs-5 me-2">
              <MdKeyboardDoubleArrowRight />{" "}
            </span>
            <span className="text-warning fs-5">
              {title.charAt(0).toUpperCase() + title.slice(1).toLowerCase()}
            </span>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default SubAllbanners;
