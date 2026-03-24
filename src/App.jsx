import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import AuthWindow from './components/auth/AuthWindow';
import SeizureCheck from './components/questionnaire/SeizureCheck';
import InteractionChecker from './components/checker/InteractionChecker';
import UserProfile from './components/profile/UserProfile';
import { Shield, Activity, Pill, User, ChevronRight, GraduationCap, Users, Award, Heart, CheckCircle2 } from 'lucide-react';

const Home = ({ onOpenAuth }) => {
  const teamMembers = [
    "Zeinab Hamdy Hassab tayeeb",
    "Ahmed Ezzat Osman Tantawy",
    "Diana Yasser AbdAlazim Mohamed Salama",
    "Mina Talat Shaker Wassef",
    "Moustafa Khalid Mohamed Taha Bahr",
    "Nada Mohammed Kamal Abieah",
    "Seveen Mohamed Ahmed Fouad Elsayoufy",
    "Abdalla Abouelscoud Hassan Hassoub Soliman",
    "Yassein Mohamed Mohamed Ali Almaghrabi",
    "Ahmed Mohamed Ahmed Elgashy"
  ];

  return (
    <div className="home-container animate-fade-in">
      {/* Hero Section */}
      <section className="hero-section modern-hero">
        <div className="hero-content container">
          <div className="hero-flex-wrapper">
            <div className="hero-text-side">
              {/* <div className="graduation-badge">
                 <GraduationCap size={20} />
                 <span>Pharmacy Graduation Project 2026</span>
              </div> */}
              <h1 className="hero-title white-text">
                A Professional Approach to <br />
                <span className="text-glow italic">Epilepsy Safety</span>
              </h1>
              <p className="hero-description white-text">
                Expertly-crafted tools by medical students for identifying seizure patterns,
                verifying drug interactions, and maintaining safe pharmacological history.
              </p>

              <div className="hero-cta-group">
                <Link to="/questionnaire" className="btn btn-premium btn-large">
                  Start Scientific Check <ChevronRight size={20} />
                </Link>
                <a href="#team" className="btn btn-outline-white btn-large">
                  Meet The Medical Team
                </a>
              </div>
            </div>

            <div className="hero-image-side">
              <div className="hero-img-container">
                <img src="/hero.png" alt="Epilepsy Awareness" className="hero-main-img" />

                {/* Smooth Brain Waves Animation Overlay */}
                <div className="brain-flow-overlay">
                  <svg viewBox="0 0 1000 400" className="brain-flow-svg">
                    <defs>
                      <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="transparent" />
                        <stop offset="50%" stopColor="rgba(255, 255, 255, 0.4)" />
                        <stop offset="100%" stopColor="transparent" />
                      </linearGradient>
                      <linearGradient id="waveGradientColor" x1="100%" y1="0%" x2="0%" y2="0%">
                        <stop offset="0%" stopColor="transparent" />
                        <stop offset="50%" stopColor="rgba(255, 255, 255, 0.3)" />
                        <stop offset="100%" stopColor="transparent" />
                      </linearGradient>
                    </defs>
                    {/* Waves overlapping text region */}
                    <path d="M400,140 C100,40 -400,240 -900,140" className="flow-line flow-left flow-1" />
                    <path d="M400,160 C50,90 -450,290 -950,190" className="flow-line flow-left flow-2" />
                    <path d="M420,120 C120,20 -380,220 -880,120" className="flow-line flow-left flow-3" />

                    {/* Right Flowing Waves */}
                    <path d="M500,150 C700,50 1200,250 1700,150" className="flow-line flow-right flow-4" />
                    <path d="M500,170 C750,100 1250,300 1750,200" className="flow-line flow-right flow-5" />
                    <path d="M520,130 C720,30 1220,230 1720,130" className="flow-line flow-right flow-6" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Glass Screen Layer wrapping content below Hero */}
      <div className="container">
        <div className="glass-screen-layer">

          {/* Services Section */}
          <section className="services-section">
            <div className="section-header">
              <h2>Clinical Support Services</h2>
              <p>SeizureSafe provides specialized modules developed for high-precision patient care.</p>
            </div>
            <div className="services-grid">
              <div className="service-card glass-card">
                <div className="service-icon purple"><Activity size={36} /></div>
                <h3>Seizure Check</h3>
                <p>Step-by-step diagnostic guide based on clinical observation patterns.</p>
                <Link to="/questionnaire" className="service-link">Access Tool <ChevronRight size={16} /></Link>
              </div>
              <div className="service-card glass-card">
                <div className="service-icon blue"><Pill size={36} /></div>
                <h3>Interaction Screening</h3>
                <p>Real-time cross-checking of medications using the RxNav global database.</p>
                <Link to="/checker" className="service-link">Access Tool <ChevronRight size={16} /></Link>
              </div>
              <div className="service-card glass-card">
                <div className="service-icon teal"><Shield size={36} /></div>
                <h3>Medical Archives</h3>
                <p>Securely store and track your pharmacological history and assessments.</p>
                <Link to="/profile" className="service-link">View Dashboard <ChevronRight size={16} /></Link>
              </div>
            </div>
          </section>

          {/* Project Background */}
          <section className="project-context">
            <div className="context-grid glass-card" style={{ marginTop: '4rem', marginBottom: '4rem' }}>
              <div className="context-text">
                <span className="badge-purple">Medical Foundation</span>
                <h3>Bridging Pharmacy & Technology</h3>
                <p>
                  This project was initiated as a medical graduation requirement at <b>MTI University - Faculty of Pharmacy</b>.
                  It represents our commitment to improving patient compliance and safety in epilepsy treatment.
                </p>
                <div className="context-features">
                  <div className="c-feat"><CheckCircle2 size={18} /> Pharmacist Verified</div>
                  <div className="c-feat"><CheckCircle2 size={18} /> Patient Centric UI</div>
                  <div className="c-feat"><CheckCircle2 size={18} /> Global Medical APIs</div>
                </div>
              </div>
              <div className="context-image">
                <img src="/Team member names and ID.jpg" alt="Team Group" onError={(e) => e.target.src = 'https://images.unsplash.com/photo-1576091160550-217359f42f8c?auto=format&fit=crop&q=80&w=1000'} />
              </div>
            </div>
          </section>

          {/* Team Section */}
          <section id="team" className="team-section">
            <div className="section-header">
              <h2>The Research Team</h2>
              <p>The dedicated clinical pharmacists behind SeizureSafe.</p>
            </div>
            <div className="team-grid">
              {teamMembers.map((name, i) => (
                <div key={i} className="team-card glass-card">
                  <div className="member-icon">
                    <Users size={24} />
                  </div>
                  <div className="member-info">
                    <h4>{name}</h4>
                    <span className="member-label">Clinical Pharmacist</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>
      </div>

      <style>{`
        .home-container { display: flex; flex-direction: column; gap: 0rem; padding-bottom: 2rem; position: relative; }
        
        /* Final Hero Section Styles */
        .modern-hero {
          position: relative;
          min-height: 90vh;
          display: flex;
          align-items: center;
          /* Background gradient removed from here, now in index.css body */
          margin-top: -80px;
          padding-top: 100px;
          margin-bottom: -50px; /* Overlap with global glass layer */
          overflow: hidden;
        }

        .hero-flex-wrapper {
          display: flex;
          align-items: center;
          gap: 0;
          width: 100%;
        }

        .hero-text-side {
          flex: 1.4;
          z-index: 10;
          text-align: left;
          padding-right: 4rem;
        }

        .hero-image-side {
          flex: 1.8;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          z-index: 5;
        }

        .hero-img-container {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
        }

        .hero-main-img {
          width: 100%;
          max-width: 1100px;
          height: auto;
          filter: drop-shadow(0 0 50px rgba(0, 0, 0, 0.1));
          z-index: 2;
          mix-blend-mode: multiply; /* Makes white backgrounds transparent */
        }

        /* Smooth Brain Flow Animation */
        .brain-flow-overlay {
          position: absolute;
          inset: -300px -600px; 
          pointer-events: none;
          z-index: 3;
          mix-blend-mode: overlay;
        }

        .brain-flow-svg {
          width: 100%;
          height: 100%;
          overflow: visible;
        }

        .flow-line {
          fill: none;
          stroke-width: 2.5;
          stroke-linecap: round;
          stroke-dasharray: 200, 1000;
          animation: smoothFlow 7s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        .flow-left { stroke: url(#waveGradient); }
        .flow-right { stroke: url(#waveGradientColor); }

        .flow-1 { animation-duration: 8s; opacity: 0.5; }
        .flow-2 { animation-duration: 10s; opacity: 0.4; }
        .flow-3 { animation-duration: 9s; opacity: 0.3; }
        .flow-4 { animation-duration: 12s; opacity: 0.4; }
        .flow-5 { animation-duration: 14s; opacity: 0.3; }
        .flow-6 { animation-duration: 10s; opacity: 0.2; }

        @keyframes smoothFlow {
          0% { stroke-dashoffset: 1400; transform: translateX(0); }
          100% { stroke-dashoffset: -1400; transform: translateX(-100px); }
        }

        .white-text { color: white; }
        
        .hero-title { 
          font-size: 3.25rem; 
          font-weight: 800; 
          line-height: 1.1; 
          margin-bottom: 2rem;
          letter-spacing: -0.02em;
        }

        .text-glow {
          color: white;
          text-shadow: 0 0 30px rgba(255, 255, 255, 0.5);
        }

        .hero-description { 
          font-size: 1.15rem; 
          margin-bottom: 3.5rem; 
          line-height: 1.6; 
          max-width: 550px; 
          opacity: 0.95;
        }

        /* Aligned buttons container */
        .hero-cta-group { 
          display: flex; 
          gap: 1.25rem; 
          justify-content: flex-start;
          width: 100%;
          max-width: fit-content;
        }

        /* Compact Buttons Styles */
        .btn-premium {
          background: white;
          color: #7e22ce;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
          text-decoration: none !important;
          padding: 15px 32px !important;
          font-size: 1.1rem !important;
          white-space: nowrap;
        }

        .btn-premium:hover {
          background: #f8f9fa;
          transform: translateY(-3px);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.12);
          color: #7e22ce;
        }

        .btn-outline-white {
          background: rgba(255, 255, 255, 0.15);
          color: white;
          border: 2px solid rgba(255, 255, 255, 0.4);
          backdrop-filter: blur(10px);
          text-decoration: none !important;
          padding: 15px 32px !important;
          font-size: 1.1rem !important;
          white-space: nowrap;
        }

        .btn-outline-white:hover {
          background: rgba(255, 255, 255, 0.25);
          border-color: white;
          transform: translateY(-3px);
          color: white;
        }
        
        /* Layout Fixes */
        .graduation-badge { 
          display: inline-flex; 
          align-items: center; 
          gap: 10px; 
          background: rgba(255, 255, 255, 0.15); 
          padding: 8px 16px; 
          border-radius: 40px; 
          font-weight: 700; 
          font-size: 0.85rem; 
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.2); 
          margin-bottom: 2.5rem; 
          color: white; 
        }

        .services-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; }
        .service-card { padding: 4rem 2.5rem; text-align: left; background: rgba(255, 255, 255, 0.85); border-radius: 30px; }
        .service-icon { margin-bottom: 2rem; color: var(--primary); }
        .service-card h3 { font-size: 1.5rem; margin-bottom: 1rem; font-weight: 800; }
        .service-card p { color: var(--text-muted); line-height: 1.6; }
        .service-link { display: flex; align-items: center; gap: 8px; margin-top: 2rem; text-decoration: none !important; color: var(--primary); font-weight: 800; font-size: 0.95rem; }

        .context-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0; padding: 0; overflow: hidden; background: rgba(255, 255, 255, 0.85); border-radius: 40px; }
        .context-text { padding: 5rem; display: flex; flex-direction: column; justify-content: center; align-items: flex-start; gap: 1.5rem; }
        .context-image img { width: 100%; height: 100%; object-fit: cover; min-height: 500px; display: block; }
        .context-features { display: flex; flex-direction: column; gap: 12px; margin-top: 10px; }
        .c-feat { display: flex; align-items: center; gap: 10px; font-weight: 600; color: var(--text-main); }
        .badge-purple { background: rgba(126, 34, 206, 0.1); color: #7e22ce; padding: 6px 14px; border-radius: 20px; font-weight: 800; font-size: 0.9rem; }

        .team-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; }
        .team-card { display: flex; align-items: center; gap: 1.5rem; padding: 1.5rem; background: rgba(255, 255, 255, 0.85); border-radius: 20px; }
        .member-icon { width: 50px; height: 50px; border-radius: 12px; background: rgba(126, 34, 206, 0.1); color: #7e22ce; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .member-info h4 { margin: 0; font-size: 1.05rem; font-weight: 700; color: var(--text-main); line-height: 1.2; }
        .member-label { font-size: 0.85rem; color: var(--text-muted); display: block; margin-top: 4px; }


        @media (max-width: 1000px) {
          .hero-flex-wrapper { flex-direction: column; text-align: center; gap: 3rem; }
          .hero-cta-group { justify-content: center; }
          .hero-text-side { text-align: center; padding-right: 0; }
          .hero-title { font-size: 2.75rem; }
          .services-grid, .context-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
};

const App = () => {
  const [showAuth, setShowAuth] = useState(false);

  return (
    <div className="app-container">
      <Navbar onOpenAuth={() => setShowAuth(true)} />

      {showAuth && <AuthWindow onClose={() => setShowAuth(false)} />}

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home onOpenAuth={() => setShowAuth(true)} />} />
          <Route path="/questionnaire" element={<SeizureCheck onOpenAuth={() => setShowAuth(true)} />} />
          <Route path="/checker" element={<InteractionChecker onOpenAuth={() => setShowAuth(true)} />} />
          <Route path="/profile" element={<UserProfile />} />
        </Routes>
      </main>

      {/* Global Glass Footer */}
      <div className="container" style={{ marginTop: 'auto', paddingBottom: '2rem' }}>
        <footer className="footer glass-screen-layer" style={{ marginBottom: 0, padding: '2rem', textAlign: 'center', background: 'rgba(255, 255, 255, 0.35)' }}>
          <div className="footer-content">
            <p style={{ fontWeight: 600, color: 'var(--text-main)' }}>© 2026 SeizureSafe. Pharmacy Graduation Project • MTI University.</p>
            <p className="disclaimer" style={{ color: 'rgba(0,0,0,0.6)' }}>Medical Disclaimer: All recommendations are for medical knowledge only and not a substitute for professional medical advice. For dosage, consult your doctor.</p>
          </div>
        </footer>
      </div>

      <style>{`
        .app-container { min-height: 100vh; display: flex; flex-direction: column; position: relative; } /* background color removed to expose global gradient */
        .main-content { flex: 1; padding-top: 80px; width: 100%; position: relative; z-index: 1; }
        /* Footer styles updated inline to use glassmorphism */
        .footer-content { max-width: 800px; margin: 0 auto; }
        .disclaimer { font-size: 0.8rem; margin-top: 1rem; line-height: 1.6; }
        
        .section-header { text-align: center; margin-bottom: 5rem; max-width: 700px; margin-inline: auto; color: var(--text-main); }
        .section-header h2 { font-size: 2.75rem; font-weight: 900; margin-bottom: 1.5rem; letter-spacing: -0.02em; }
        .section-header p { font-size: 1.15rem; color: rgba(0,0,0,0.7); font-weight: 500;}
      `}</style>
    </div>
  );
};

export default App;
