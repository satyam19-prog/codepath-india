import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "./Navbar.css";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">
          <Link to="/">CodePath India</Link>
        </div>

        <div className="nav-links">
          {user?.isAdmin && <Link to="/admin/add-challenge">Admin</Link>}
          {user ? (
            <>
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/challenges">Challenges</Link>
              <Link to="/classroom" className="nav-link">Classroom</Link>
              <Link to="/leaderboard" className="nav-link">Leaderboard</Link>
              <Link to="/progress">Progress</Link>
              <button onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
