import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import LightRays from "../components/LightRays";
import "./dashboard.css";

export default function Dashboard() {
  const { user } = useContext(AuthContext);

  return (
    <div className="dashboard-wrapper">

      <div className="dashboard-rays">
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

      <div className="dashboard-card">
        <p>Welcome, {user?.name || user?.email} 🎉</p>
        <p>You have successfully logged in 🎉</p>

        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
