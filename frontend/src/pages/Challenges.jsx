import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import "./Challenges.css";

export default function Challenges() {
  const [activeTab, setActiveTab] = useState("assignments");
  const [assignments, setAssignments] = useState([]);
  const [cfProblems, setCfProblems] = useState([]);
  const [filteredCfProblems, setFilteredCfProblems] = useState([]);

  // Filters
  const [filters, setFilters] = useState({
    search: "",
    rating: "",
    tag: ""
  });

  // Pagination
  const [page, setPage] = useState(1);
  const PROBLEMS_PER_PAGE = 50;

  useEffect(() => {
    // Fetch Assignments
    API.get("/challenges").then((res) => {
      setAssignments(res.data.challenges || []);
    });

    // Fetch Codeforces Problems (via Backend Proxy)
    API.get("/challenges/codeforces")
      .then(res => {
        if (res.data.success) {
          const data = res.data.data;
          // Map problems to a cleaner format
          const problems = data.problems.map((p, index) => ({
            id: `${p.contestId}${p.index}`,
            title: p.name,
            rating: p.rating,
            tags: p.tags,
            contestId: p.contestId,
            index: p.index,
            stats: data.problemStatistics[index]
          })).filter(p => p.rating); // Only keep rated problems

          setCfProblems(problems);
          setFilteredCfProblems(problems);
        }
      })
      .catch(err => console.error("CF API Error:", err));
  }, []);

  // Filter Logic
  useEffect(() => {
    let result = cfProblems;

    if (filters.search) {
      result = result.filter(p => p.title.toLowerCase().includes(filters.search.toLowerCase()));
    }
    if (filters.rating) {
      result = result.filter(p => p.rating === parseInt(filters.rating));
    }
    if (filters.tag) {
      result = result.filter(p => p.tags.includes(filters.tag));
    }

    setFilteredCfProblems(result);
    setPage(1); // Reset to first page on filter change
  }, [filters, cfProblems]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  // Pagination Logic
  const paginatedProblems = filteredCfProblems.slice((page - 1) * PROBLEMS_PER_PAGE, page * PROBLEMS_PER_PAGE);

  return (
    <div className="page challenges-container">
      <div className="challenges-header">
        <h1>Challenges</h1>
        <div className="tabs">
          <button
            className={`tab-btn ${activeTab === "assignments" ? "active" : ""}`}
            onClick={() => setActiveTab("assignments")}
          >
            Assignments
          </button>
          <button
            className={`tab-btn ${activeTab === "codeforces" ? "active" : ""}`}
            onClick={() => setActiveTab("codeforces")}
          >
            Codeforces
          </button>
        </div>
      </div>

      {activeTab === "assignments" ? (
        <div className="challenges-list">
          {assignments.length === 0 ? <p className="no-data">No assignments available.</p> : null}
          {assignments.map((ch) => (
            <Link key={ch.id} to={`/challenge/${ch.id}`} className="challenge-card">
              <div className="challenge-info">
                <h3>{ch.title}</h3>
                <div className="challenge-meta">
                  <span className={`difficulty ${ch.difficulty}`}>{ch.difficulty}</span>
                  <span>{ch.tags}</span>
                </div>
              </div>
              <button className="solve-btn">Solve</button>
            </Link>
          ))}
        </div>
      ) : (
        <div className="cf-section">
          {/* Filters */}
          <div className="filters-bar">
            <input
              type="text"
              name="search"
              placeholder="Search problem..."
              value={filters.search}
              onChange={handleFilterChange}
            />
            <select name="rating" value={filters.rating} onChange={handleFilterChange}>
              <option value="">All Ratings</option>
              {[800, 900, 1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900, 2000].map(r => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
            <select name="tag" value={filters.tag} onChange={handleFilterChange}>
              <option value="">All Tags</option>
              {["dp", "greedy", "math", "implementation", "graphs", "strings", "data structures", "binary search"].map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          {/* Problem List */}
          <div className="challenges-list">
            {paginatedProblems.map((p) => (
              <a
                key={p.id}
                href={`https://codeforces.com/problemset/problem/${p.contestId}/${p.index}`}
                target="_blank"
                rel="noopener noreferrer"
                className="challenge-card cf-card"
              >
                <div className="challenge-info">
                  <h3>{p.index}. {p.title}</h3>
                  <div className="challenge-meta">
                    <span className="difficulty" style={{ color: '#fbbf24' }}>Rating: {p.rating}</span>
                    <span>{p.tags.slice(0, 3).join(", ")}</span>
                  </div>
                </div>
                <button className="solve-btn outline">Solve on CF ↗</button>
              </a>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="pagination">
            <button disabled={page === 1} onClick={() => setPage(p => p - 1)}>Previous</button>
            <span>Page {page}</span>
            <button disabled={page * PROBLEMS_PER_PAGE >= filteredCfProblems.length} onClick={() => setPage(p => p + 1)}>Next</button>
          </div>
        </div>
      )}
    </div>
  );
}
