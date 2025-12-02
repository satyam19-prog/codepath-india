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
          raysSpeed={1}
          lightSpread={0.5}
          rayLength={3}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0.5}
          distortion={0}
        />
      </div>

      {/* Hero Section */}
      <section className="hero-section">
        <h1 className="hero-title">Master Competitive Programming<br />the Smart Way</h1>
        <p className="hero-subtitle">
          The #1 CP Learning Platform for Indian Students. Learn, practice, compete, and track progress — with real Codeforces problems, online compiler, classrooms, leaderboards, and streaks.
        </p>
        <div className="hero-buttons">
          <Link to="/register" className="cta-btn primary">Start Learning</Link>
          <Link to="/challenges" className="cta-btn secondary">Explore Challenges</Link>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="value-section">
        <div className="section-header">
          <h2 className="section-title">Why CodePath India?</h2>
          <p className="section-subtitle">Everything you need to go from Beginner to Expert</p>
        </div>
        <div className="value-props-grid">
          <div className="value-card">
            <div className="value-icon">📚</div>
            <h3>Learn CP from Scratch</h3>
            <p>Structured curriculum designed for Class 8-12 students. Simple explanations with difficulty levels.</p>
          </div>
          <div className="value-card">
            <div className="value-icon">💻</div>
            <h3>Real Problems</h3>
            <p>Solve hand-curated problems from Codeforces and other platforms with hints and editorials.</p>
          </div>
          <div className="value-card">
            <div className="value-icon">⚡</div>
            <h3>Built-in Compiler</h3>
            <p>Run your code instantly using our Judge0 integration. Supports C++, Python, Java, and more.</p>
          </div>
          <div className="value-card">
            <div className="value-icon">📈</div>
            <h3>Track Progress</h3>
            <p>Visualize your growth with streaks, solved counts, rating graphs, and detailed statistics.</p>
          </div>
          <div className="value-card">
            <div className="value-icon">🏫</div>
            <h3>Classrooms</h3>
            <p>Join classrooms created by your teachers. Compete with classmates and track assignments.</p>
          </div>
          <div className="value-card">
            <div className="value-icon">🎮</div>
            <h3>Gamified Learning</h3>
            <p>Earn XP, unlock badges, maintain streaks, and climb the global leaderboard.</p>
          </div>
        </div>
      </section>

      {/* Featured Topics */}
      <section className="topics-section">
        <div className="section-header">
          <h2 className="section-title">Start Solving</h2>
          <p className="section-subtitle">Pick a topic and master it</p>
        </div>
        <div className="topics-grid">
          <div className="topic-card">
            <div className="topic-name">Arrays</div>
            <div className="topic-count">50+ Problems</div>
          </div>
          <div className="topic-card">
            <div className="topic-name">Strings</div>
            <div className="topic-count">40+ Problems</div>
          </div>
          <div className="topic-card">
            <div className="topic-name">Sorting</div>
            <div className="topic-count">30+ Problems</div>
          </div>
          <div className="topic-card">
            <div className="topic-name">Dynamic Programming</div>
            <div className="topic-count">25+ Problems</div>
          </div>
          <div className="topic-card">
            <div className="topic-name">Graphs</div>
            <div className="topic-count">20+ Problems</div>
          </div>
        </div>
      </section>

      {/* Gamification Preview */}
      <section className="gamification-section">
        <div className="section-header">
          <h2 className="section-title">Level Up Your Skills</h2>
          <p className="section-subtitle">Stay motivated with badges and streaks</p>
        </div>
        <div className="gamification-showcase">
          <div className="badge-preview">🔥</div>
          <div className="badge-preview">🏆</div>
          <div className="badge-preview">⭐</div>
          <div className="badge-preview">🚀</div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section">
        <div className="section-header">
          <h2 className="section-title">Student Stories</h2>
        </div>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <p className="quote">"Helped me clear ZIO! The problems are perfectly curated for beginners."</p>
            <p className="author">- Rahul, Class 10</p>
          </div>
          <div className="testimonial-card">
            <p className="quote">"I finally understood loops and DP. It feels much easier than watching random YouTube videos."</p>
            <p className="author">- Priya, Class 9</p>
          </div>
          <div className="testimonial-card">
            <p className="quote">"The leaderboard keeps me motivated to solve at least one problem every day."</p>
            <p className="author">- Arjun, Class 11</p>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="cta-footer">
        <h2 className="section-title">Ready to Code?</h2>
        <p className="section-subtitle" style={{ marginBottom: '30px' }}>Start your CP journey today — it only takes 30 seconds!</p>
        <Link to="/register" className="cta-btn primary">Join CodePath India</Link>
      </section>

    </div>
  );
}