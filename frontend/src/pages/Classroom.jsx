import React, { useState, useEffect, useContext } from "react";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";
import "./Classroom.css";

export default function Classroom() {
    const { user } = useContext(AuthContext);
    const [classrooms, setClassrooms] = useState({ teaching: [], studying: [] });
    const [newClassroomName, setNewClassroomName] = useState("");
    const [joinCode, setJoinCode] = useState("");
    const [selectedClassroom, setSelectedClassroom] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchClassrooms();
    }, []);

    const fetchClassrooms = async () => {
        try {
            const res = await API.get("/classrooms/my");
            setClassrooms(res.data);
        } catch (err) {
            console.error("Failed to fetch classrooms", err);
        } finally {
            setLoading(false);
        }
    };

    const createClassroom = async () => {
        try {
            await API.post("/classrooms/create", { name: newClassroomName });
            setNewClassroomName("");
            fetchClassrooms();
        } catch (err) {
            alert("Failed to create classroom");
        }
    };

    const joinClassroom = async () => {
        try {
            await API.post("/classrooms/join", { code: joinCode });
            setJoinCode("");
            fetchClassrooms();
        } catch (err) {
            alert(err.response?.data?.message || "Failed to join classroom");
        }
    };

    const viewClassroom = async (id) => {
        try {
            const res = await API.get(`/classrooms/${id}`);
            setSelectedClassroom(res.data.classroom);
        } catch (err) {
            console.error("Failed to fetch classroom details", err);
        }
    };

    if (loading) return <div className="loading">Loading...</div>;

    return (
        <div className="page classroom-container">
            <div className="classroom-header">
                <h1>Classrooms</h1>
                <p style={{ color: '#aaa' }}>Manage your classes and students</p>
            </div>

            <div className="classroom-actions">
                {user.role === "teacher" && (
                    <div className="action-card">
                        <h3>Create Classroom</h3>
                        <p style={{ color: '#888', fontSize: '0.9rem', marginBottom: '1rem' }}>Start a new class for your students.</p>
                        <input
                            type="text"
                            placeholder="Classroom Name (e.g. Math 101)"
                            value={newClassroomName}
                            onChange={(e) => setNewClassroomName(e.target.value)}
                        />
                        <button onClick={createClassroom}>Create Classroom</button>
                    </div>
                )}

                <div className="action-card">
                    <h3>Join Classroom</h3>
                    <p style={{ color: '#888', fontSize: '0.9rem', marginBottom: '1rem' }}>Enter the code shared by your teacher.</p>
                    <input
                        type="text"
                        placeholder="Enter 6-digit Code"
                        value={joinCode}
                        onChange={(e) => setJoinCode(e.target.value)}
                    />
                    <button onClick={joinClassroom}>Join Class</button>
                </div>
            </div>

            <div className="classroom-lists">
                {classrooms.teaching.length > 0 && (
                    <div className="list-section">
                        <h2>Teaching</h2>
                        <div className="classroom-grid">
                            {classrooms.teaching.map((c) => (
                                <div key={c.id} className="classroom-card" onClick={() => viewClassroom(c.id)}>
                                    <h3>{c.name}</h3>
                                    <p>{c.code}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {classrooms.studying.length > 0 && (
                    <div className="list-section">
                        <h2>Enrolled</h2>
                        <div className="classroom-grid">
                            {classrooms.studying.map((c) => (
                                <div key={c.id} className="classroom-card" onClick={() => viewClassroom(c.id)}>
                                    <h3>{c.name}</h3>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            {selectedClassroom && (
                <div className="modal-overlay" onClick={() => setSelectedClassroom(null)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h2>{selectedClassroom.name}</h2>
                        <p>Code: <strong>{selectedClassroom.code}</strong></p>
                        <h3>Students ({selectedClassroom.students.length})</h3>
                        <ul>
                            {selectedClassroom.students.map((s) => (
                                <li key={s.user.id}>
                                    {s.user.name} - Solved: {s.user.userProgress?.solved || 0}
                                </li>
                            ))}
                        </ul>
                        <button onClick={() => setSelectedClassroom(null)}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}
