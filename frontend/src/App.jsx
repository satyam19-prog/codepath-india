import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

import Challenges from "./pages/Challenges";
import ChallengeDetails from "./pages/ChallengeDetails";
import EditorPage from "./pages/EditorPage";
import Progress from "./pages/Progress";
import Classroom from "./pages/Classroom";
import Leaderboard from "./pages/Leaderboard";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

import AdminAddChallenge from "./pages/AdminAddChallenge";

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-layout">
        <Navbar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />

            <Route path="/challenges" element={<Challenges />} />
            <Route path="/challenge/:id" element={<ChallengeDetails />} />

            <Route
              path="/challenge/:id/solve"
              element={
                <ProtectedRoute>
                  <EditorPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/progress"
              element={
                <ProtectedRoute>
                  <Progress />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/add-challenge"
              element={
                <ProtectedRoute adminOnly={true}>
                  <AdminAddChallenge />
                </ProtectedRoute>
              }
            />

            <Route
              path="/classroom"
              element={
                <ProtectedRoute>
                  <Classroom />
                </ProtectedRoute>
              }
            />

            <Route
              path="/leaderboard"
              element={
                <ProtectedRoute>
                  <Leaderboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}