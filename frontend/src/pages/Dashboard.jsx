import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import LightRays from "../components/LightRays";
import API from "../services/api";
import "./Dashboard.css";

export default function Dashboard() {
  const { user, logout } = useContext(AuthContext);
  const [stats, setStats] = useState({ solved: 0, streak: 0, rating: 1200 });

  useEffect(() => {
    if (user?.id) {
      API.get(`/user/progress/${user.id}`)
        .then((res) => {
          if (res.data.success) {
            setStats(res.data.progress);
          }
        })
        .catch((err) => console.error(err));
    }
  }, [user]);

  // Mock Data for UI
  const recentSubmissions = [
    { id: 1, challenge: "Two Sum", status: "Passed", time: "2 hours ago" },
    { id: 2, challenge: "Reverse String", status: "Failed", time: "5 hours ago" },
    { id: 3, challenge: "Binary Search", status: "Passed", time: "1 day ago" },
  ];

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-rays">
        <LightRays
          raysOrigin="top-center"
          raysColor="#4f46e5"
          raysSpeed={1}
          lightSpread={0.5}
          rayLength={3}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0.5}
          distortion={0}
        />
      </div>

      <div className="dashboard-container">
        {/* Welcome Banner */}
        <div className="welcome-banner">
          <div className="welcome-text">
            <h1>Welcome back, {user?.name?.split(" ")[0] || "Coder"} 👋</h1>
            <p>Ready to keep your streak alive?</p>
          </div>
          <div className="user-stats-row">
            <div className="stat-item">
              <div className="stat-value">{stats.streak} 🔥</div>
              <div className="stat-label">Day Streak</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{stats.solved} ✅</div>
              <div className="stat-label">Solved</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{stats.rating} 🏆</div>
              <div className="stat-label">Rating</div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="dashboard-main">
          {/* Daily Challenge */}
          <div className="dash-card daily-challenge-card">
            <div className="card-header">
              <span className="card-title">📅 Daily Challenge</span>
              <span style={{ color: '#fbbf24', fontWeight: 'bold' }}>Resets in 05:23:10</span>
            </div>
            <div className="daily-info">
              <div className="daily-meta">
                <h3>Maximum Subarray Sum</h3>
                <span>Medium</span>
              </div>
              <Link to="/challenges" className="solve-btn">Solve Now</Link>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="dash-card">
            <div className="card-header">
              <span className="card-title">🚀 Quick Actions</span>
            </div>
            <div className="quick-actions-grid">
              <Link to="/challenges" className="action-btn">Solve New Problem</Link>
              <Link to="/classroom" className="action-btn">Join Classroom</Link>
              <Link to="/leaderboard" className="action-btn">View Leaderboard</Link>
              <Link to="/progress" className="action-btn">Check Progress</Link>
            </div>
          </div>

          {/* Recent Submissions */}
          <div className="dash-card">
            <div className="card-header">
              <span className="card-title">📜 Recent Submissions</span>
            </div>
            <table className="recent-table">
              <thead>
                <tr>
                  <th>Challenge</th>
                  <th>Status</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {recentSubmissions.map((sub) => (
                  <tr key={sub.id}>
                    <td>{sub.challenge}</td>
                    <td className={sub.status === "Passed" ? "status-passed" : "status-failed"}>
                      {sub.status}
                    </td>
                    <td>{sub.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Sidebar */}
        <div className="dashboard-sidebar">
          {/* Progress Graph */}
          <div className="dash-card">
            <div className="card-header">
              <span className="card-title">📊 Activity</span>
            </div>
            <div className="graph-bars">
              {[40, 70, 30, 85, 50, 60, 90].map((h, i) => (
                <div key={i} className="bar" style={{ height: `${h}%` }} title={`${h} problems`}></div>
              ))}
            </div>
            <p style={{ textAlign: 'center', marginTop: '10px', color: '#94a3b8', fontSize: '0.85rem' }}>Last 7 Days</p>
          </div>

          {/* Badges */}
          <div className="dash-card">
            <div className="card-header">
              <span className="card-title">🏅 Badges</span>
            </div>
            <div className="badges-grid">
              <div className="badge-item">
                ⚡
                <span className="badge-name">Fast</span>
              </div>
              <div className="badge-item">
                🔥
                <span className="badge-name">Streak</span>
              </div>
              <div className="badge-item">
                🧠
                <span className="badge-name">Logic</span>
              </div>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={logout}
            style={{
              width: '100%',
              padding: '12px',
              background: 'rgba(239, 68, 68, 0.2)',
              color: '#fca5a5',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: '10px',
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
