import React, { useEffect, useState } from "react";
import API from "../services/api";
import "./Leaderboard.css";

export default function Leaderboard() {
    const [leaderboard, setLeaderboard] = useState([]);

    useEffect(() => {
        API.get("/user/leaderboard").then((res) =>
            setLeaderboard(res.data.leaderboard)
        ).catch(err => console.error(err));
    }, []);

    return (
        <div className="page leaderboard-container">
            <h1 className="leaderboard-title">Leaderboard</h1>

            <div className="glass-card leaderboard-table-container">
                <table className="leaderboard-table">
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th>User</th>
                            <th>Rating</th>
                            <th>Solved</th>
                            <th>Streak</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leaderboard.map((entry, index) => (
                            <tr key={entry.userId} className={`rank-${index + 1}`}>
                                <td className="rank-cell">#{index + 1}</td>
                                <td className="user-cell">
                                    <div className="user-avatar-small">
                                        {entry.user.name.charAt(0).toUpperCase()}
                                    </div>
                                    {entry.user.name}
                                </td>
                                <td className="rating-cell">{entry.rating}</td>
                                <td>{entry.solved}</td>
                                <td>{entry.streak} 🔥</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
