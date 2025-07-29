import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import craft_craze_1 from "../images/craft_craze_logo.jpg";
import { useNavigate } from "react-router-dom";

export const DashBoard = () => {
  const navigate = useNavigate();

  return (
    <div className="container-fluid vh-100 d-flex justify-content-center align-items-center">
      <div className="text-center">
        {/* Logo */}
        <div className="mb-4">
          <img
            src={craft_craze_1}
            alt="Craft Craze Logo"
            className="img-fluid"
            style={{ maxWidth: "300px", height: "auto" }}
          />
        </div>

        {/* Tagline */}
        <div className="mb-5">
          <span className="h5 font-italic font-weight-bold" style={{ fontFamily: "serif" }}>
            "Unleash Your Inner Artisan"
          </span>
        </div>

        {/* Button */}
        <div className="mt-5">
          <button
            className="btn text-white px-5 py-2"
            style={{
              backgroundColor: "#501924",
              border: "2px solid black",
              borderRadius: "8px",
              fontSize: "20px",
              fontFamily: "serif",
            }}
            onClick={() => navigate("/login")}
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};
