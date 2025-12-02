import React, { useEffect, useState, useContext } from "react";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";
import "./Progress.css";

export default function Progress() {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (user?.id) {
      API.get(`/user/profile/${user.id}`).then((res) =>
        setProfile(res.data)
      ).catch(err => console.error(err));
    }
  }, [user]);

  if (!profile) return <div className="loading">Loading Profile...</div>;

  const { user: userInfo, progress } = profile;

  return (
    <div className="page progress-container">
      <div className="profile-header">
        <div className="profile-avatar">
          {userInfo.name.charAt(0).toUpperCase()}
        </div>
        <div className="profile-info">
          <h1>{userInfo.name}</h1>
          <span className={`role-badge ${userInfo.role}`}>{userInfo.role}</span>
          <p className="join-date">Joined {new Date(userInfo.createdAt).toLocaleDateString()}</p>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Rating</h3>
          <div className="stat-value rating">{progress.rating}</div>
        </div>
        <div className="stat-card">
          <h3>Solved</h3>
          <div className="stat-value">{progress.solved}</div>
        </div>
        <div className="stat-card">
          <h3>Streak</h3>
          <div className="stat-value">{progress.streak} <span className="unit">days</span></div>
        </div>
      </div>

      {/* Placeholder for Rating Graph */}
      <div className="glass-card graph-section">
        <h3>Rating History</h3>
        <div className="graph-placeholder">
          <div className="graph-bar" style={{ height: '40%' }}></div>
          <div className="graph-bar" style={{ height: '50%' }}></div>
          <div className="graph-bar" style={{ height: '45%' }}></div>
          <div className="graph-bar" style={{ height: '60%' }}></div>
          <div className="graph-bar" style={{ height: '55%' }}></div>
          <div className="graph-bar" style={{ height: '70%' }}></div>
          <div className="graph-bar" style={{ height: '80%' }}></div>
        </div>
        <p className="graph-note">Activity over last 7 days</p>
      </div>
    </div>
  );
}
