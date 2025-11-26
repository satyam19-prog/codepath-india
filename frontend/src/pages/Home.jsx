import React from "react";
import { Link } from "react-router-dom";
import LightRays from "../components/LightRays";
import "./Home.css";

export default function Home() {
  return (
    <div className="home-container">
      <div className="light-rays-wrapper">
        <LightRays
          raysOrigin="top-center"
          raysColor="#4f46e5"
          raysSpeed={3}
          lightSpread={2}
          rayLength={3}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0.5}
          distortion={1}
        />
      </div>

      <div className="home-content">
        <h1 className="home-title">CodePath India</h1>
        <p className="home-subtitle">Learn. Build. Grow. Become industry-ready.</p>

        <div className="home-btn-group">
          <Link to="/register" className="home-btn filled">Register</Link>
          <Link to="/login" className="home-btn outline">Login</Link>
        </div>
      </div>

    </div>
  );
}