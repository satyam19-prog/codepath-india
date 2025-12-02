import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../services/api";
import "./ChallengeDetails.css";

export default function ChallengeDetails() {
  const { id } = useParams();
  const [challenge, setChallenge] = useState(null);

  useEffect(() => {
    API.get(`/challenges/${id}`).then((res) => setChallenge(res.data.challenge));
  }, [id]);

  if (!challenge) return <div>Loading...</div>;

  return (
    <div className="page challenge-details-container">
      <div className="challenge-details-card">
        <h1 className="challenge-details-title">{challenge.title}</h1>

        <div className="challenge-meta">
          <div className="meta-item">
            <span className="meta-label">Difficulty</span>
            <span className="meta-value">{challenge.difficulty}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Tags</span>
            <span className="meta-value">{challenge.tags}</span>
          </div>
        </div>

        {challenge.type === "manual" && (
          <div className="statement-box">
            <h3>Problem Statement</h3>
            <p>{challenge.statement}</p>
          </div>
        )}

        <Link to={`/challenge/${id}/solve`}>
          <button className="solve-btn">Solve Challenge</button>
        </Link>
      </div>
    </div>
  );
}
