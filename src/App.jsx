import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import AuthWindow from './components/auth/AuthWindow';
import Questionnaire from './components/questionnaire/Questionnaire';
import InteractionChecker from './components/checker/InteractionChecker';
import UserProfile from './components/profile/UserProfile';
import { Shield, Activity, Pill, User } from 'lucide-react';

const App = () => {
  const [showAuth, setShowAuth] = useState(false);

  return (
    <div className="app-container">
      <Navbar onOpenAuth={() => setShowAuth(true)} />
      
      {showAuth && <AuthWindow onClose={() => setShowAuth(false)} />}

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home onOpenAuth={() => setShowAuth(true)} />} />
          <Route path="/questionnaire" element={<Questionnaire onOpenAuth={() => setShowAuth(true)} />} />
          <Route path="/checker" element={<InteractionChecker onOpenAuth={() => setShowAuth(true)} />} />
          <Route path="/profile" element={<UserProfile />} />
        </Routes>
      </main>

      <footer className="footer glass-card">
        <div className="footer-content">
          <p>© 2026 SeizureSafe. For educational purposes only.</p>
          <p className="disclaimer">Medical Disclaimer: All recommendations are educational and not a substitute for professional medical advice.</p>
        </div>
      </footer>

      <style>{`
        .app-container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }
        .main-content {
          flex: 1;
          padding-top: 7rem;
          padding-bottom: 4rem;
          max-width: 1200px;
          margin: 0 auto;
          width: 90%;
        }
        .footer {
          margin-top: auto;
          padding: 2rem;
          text-align: center;
          border-radius: 0;
          border-top: 1px solid var(--surface-border);
        }
        .footer-content {
          max-width: 800px;
          margin: 0 auto;
        }
        .disclaimer {
          font-size: 0.8rem;
          color: var(--text-secondary);
          margin-top: 0.5rem;
        }
      `}</style>
    </div>
  );
};

const Home = ({ onOpenAuth }) => (
  <div className="home-hero animate-fade-in">
    <div className="hero-content">
      <h1>SeizureSafe</h1>
      <p className="hero-subtitle">Professional Epilepsy Management & Medication Safety</p>
      
      <div className="hero-features">
        <Link to="/questionnaire" className="feature-card glass-card">
          <Activity className="feature-icon" size={32} />
          <h3>Questionnaire</h3>
          <p>Analyze seizure patterns and get personalized insights.</p>
        </Link>
        <Link to="/checker" className="feature-card glass-card">
          <Pill className="feature-icon" size={32} />
          <h3>Drug Checker</h3>
          <p>Check for interactions with epilepsy medications.</p>
        </Link>
      </div>

      <div className="hero-cta">
        <button onClick={onOpenAuth} className="btn btn-primary btn-large">Get Started Now</button>
      </div>
    </div>

    <style>{`
      .home-hero {
        text-align: center;
        padding: 4rem 0;
      }
      .hero-content h1 {
        font-size: 4rem;
        font-weight: 800;
        background: linear-gradient(135deg, #fff 0%, #94a3b8 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        margin-bottom: 1rem;
      }
      .hero-subtitle {
        font-size: 1.5rem;
        color: var(--text-secondary);
        margin-bottom: 4rem;
      }
      .hero-features {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
        margin-bottom: 4rem;
      }
      .feature-card {
        padding: 3rem 2rem;
        text-decoration: none;
        color: white;
        text-align: center;
      }
      .feature-icon {
        color: var(--primary);
        margin-bottom: 1.5rem;
      }
      .feature-card h3 {
        margin-bottom: 1rem;
        font-size: 1.5rem;
      }
      .feature-card p {
        color: var(--text-secondary);
        line-height: 1.6;
      }
      .hero-cta {
        display: flex;
        justify-content: center;
      }
      .btn-large {
        padding: 1.25rem 3rem;
        font-size: 1.1rem;
      }
      @media (max-width: 768px) {
        .hero-content h1 { font-size: 2.5rem; }
        .hero-subtitle { font-size: 1.1rem; }
      }
    `}</style>
  </div>
);

export default App;
