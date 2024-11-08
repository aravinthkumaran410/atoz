import React from "react";
import "./NotFound.css";
import notFoundGif from "../../assets/gif/Error.gif";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="not-found-container mt-4">
      <img
        src={notFoundGif}
        alt="Page Not Found"
        className="not-found-gif"
        width="100%"
        height="auto"
        loading="lazy"
      />
      <h2>Oops! Page Not Found</h2>
      <p>The page you are looking for does not exist.</p>
      <Link to="/" className="go-home-button">
        Go to Home
      </Link>
    </div>
  );
};

export default NotFound;
