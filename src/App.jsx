import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import AuthWindow from './components/auth/AuthWindow';
import SeizureCheck from './components/questionnaire/SeizureCheck';
import InteractionChecker from './components/checker/InteractionChecker';
import UserProfile from './components/profile/UserProfile';
import About from './components/about/About';
import { Shield, Activity, Pill, User, ChevronRight, GraduationCap, Users, Award, Heart, CheckCircle2 } from 'lucide-react';

const Home = ({ onOpenAuth }) => {

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

                {/* Smooth Brain Waves Animation Overlay - Denser and overlapping */}
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
          
          {/* Understanding Epilepsy Section */}
          <section className="epilepsy-info-section">
            <div className="section-header">
              <h2>Understanding Epilepsy</h2>
              <p>
                Epilepsy is a neurological condition where abnormal brain activity causes seizures. 
                Seizures are broadly classified into three main types based on where and how they begin in the brain.
              </p>
            </div>
            <div className="types-grid">
              <div className="type-card glass-card">
                <div className="type-img-container">
                  <img src="/focal_seizure.png" alt="Focal Seizure Anatomy" />
                </div>
                <h3>Focal Onset Seizures</h3>
                <p>These start in a specific area or network of cells on one side of the brain. They can occur with or without loss of awareness and may affect movement, sensation, or emotions.</p>
              </div>
              <div className="type-card glass-card">
                <div className="type-img-container">
                  <img src="/generalized_seizure.png" alt="Generalized Seizure Anatomy" />
                </div>
                <h3>Generalized Onset</h3>
                <p>These engage neural networks across both sides of the brain right from the start. Common forms include sudden loss of awareness (absence) or stiffening and jerking (tonic-clonic).</p>
              </div>
              <div className="type-card glass-card">
                <div className="type-img-container">
                  <img src="/unknown_seizure.png" alt="Unknown Onset Seizure Anatomy" />
                </div>
                <h3>Unknown Onset</h3>
                <p>When the beginning of a seizure is not witnessed or documented, it is classified as unknown. This classification can help guide doctors toward further neurological testing.</p>
              </div>
            </div>
          </section>

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

          {/* Project Background Banner */}
          <section className="project-context">
            <div className="context-banner glass-card" style={{ textAlign: 'center', padding: '6rem 3rem', borderRadius: '40px', background: 'rgba(255, 255, 255, 0.85)', position: 'relative', overflow: 'hidden' }}>
              {/* Decorative aura */}
              <div style={{ position: 'absolute', top: '-20%', left: '-5%', width: '300px', height: '300px', background: 'rgba(157, 141, 241, 0.15)', filter: 'blur(80px)', borderRadius: '50%' }} />
              <div style={{ position: 'absolute', bottom: '-20%', right: '-5%', width: '300px', height: '300px', background: 'rgba(96, 165, 250, 0.15)', filter: 'blur(80px)', borderRadius: '50%' }} />
              
              <div style={{ position: 'relative', zIndex: 10, maxWidth: '850px', margin: '0 auto' }}>
                <span className="badge-purple" style={{ display: 'inline-block', marginBottom: '1.5rem' }}>Medical Foundation</span>
                <h3 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>Bridging Pharmacy & Technology</h3>
                <p style={{ fontSize: '1.15rem', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '3rem' }}>
                  This project was initiated as a medical graduation requirement at <b>MTI University - Faculty of Pharmacy</b>.
                  It represents our commitment to improving patient compliance and safety in epilepsy treatment through accessible digital health tools.
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '3rem', flexWrap: 'wrap' }}>
                  <div className="c-feat"><CheckCircle2 size={24} /> Pharmacist Verified</div>
                  <div className="c-feat"><CheckCircle2 size={24} /> Patient Centric UI</div>
                  <div className="c-feat"><CheckCircle2 size={24} /> Global Medical APIs</div>
                </div>
              </div>
            </div>
          </section>

        </div> {/* End of glass-screen-layer */}
      </div> {/* End of container */}

      <style>{`
        .home-container { display: flex; flex-direction: column; gap: 4rem; padding-bottom: 10rem; position: relative; }
        
        /* Final Hero Section Styles */
        .modern-hero {
          position: relative;
          min-height: 90vh;
          display: flex;
          align-items: center;
          /* Calm smooth shades of the same colors */
          background: linear-gradient(135deg, #a78bfa 0%, #60a5fa 100%);
          margin-top: -80px;
          padding-top: 100px;
          overflow: hidden;
        }

        .hero-flex-wrapper {
          display: flex;
          align-items: center;
          gap: 0;
          width: 100%;
        }

        .hero-text-side {
          flex: 1.4; /* Expanded for better text wrap space */
          z-index: 10;
          text-align: left;
          padding-right: 4rem;
        }

        .hero-image-side {
          flex: 1.8; /* Significantly larger side */
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
          max-width: 800px; /* Reduced from 1100px so it is shorter */
          height: auto;
          filter: drop-shadow(0 0 50px rgba(0, 0, 0, 0.1));
          z-index: 2;
          mix-blend-mode: multiply; /* Makes white backgrounds transparent */
        }

        /* Smooth Brain Flow Animation - Expanding over text region */
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

        .glass-screen-layer {
          background: rgba(255, 255, 255, 0.6); /* Semi-transparent white */
          backdrop-filter: blur(20px); /* Apply blur effect */
          border-radius: 40px; /* Rounded corners */
          padding: 6rem; /* Inner padding */
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.1); /* Soft shadow */
          border: 1px solid rgba(255, 255, 255, 0.3); /* Light border */
          margin-top: -100px; /* Overlap with hero section */
          position: relative;
          z-index: 10; /* Ensure it's above other content */
          display: flex;
          flex-direction: column;
          gap: 6rem;
        }

        .services-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; }
        .service-card { padding: 4rem 2.5rem; text-align: left; background: white; border-radius: 30px; }
        .service-icon { margin-bottom: 2rem; color: var(--primary); }
        .service-card h3 { font-size: 1.5rem; margin-bottom: 1rem; font-weight: 800; }
        .service-card p { color: var(--text-muted); line-height: 1.6; }
        .service-link { display: flex; align-items: center; gap: 8px; margin-top: 2rem; text-decoration: none !important; color: var(--primary); font-weight: 800; font-size: 0.95rem; }

        .project-context { padding: 0; } /* Remove padding as it's now inside glass-screen-layer */
        .c-feat { display: flex; align-items: center; gap: 10px; font-weight: 700; font-size: 1.1rem; color: var(--primary); }
        .badge-purple { background: rgba(126, 34, 206, 0.1); color: #7e22ce; padding: 6px 14px; border-radius: 20px; font-weight: 800; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 0.05em; }

        /* Epilepsy Info Section Styles */
        .epilepsy-info-section {
          margin-bottom: 6rem;
        }
        .types-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }
        .type-card {
          padding: 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          /* Inherits .glass-card via index.css for hover state and background */
        }
        .type-img-container {
          width: 100%;
          height: 180px;
          border-radius: 20px;
          overflow: hidden;
          margin-bottom: 1.5rem;
          background: rgba(126, 34, 206, 0.05);
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .type-img-container img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          mix-blend-mode: multiply;
        }
        .type-card h3 {
          font-size: 1.35rem;
          margin-bottom: 1rem;
          color: var(--primary);
          font-weight: 800;
        }
        .type-card p {
          color: var(--text-muted);
          font-size: 0.95rem;
          line-height: 1.6;
        }


        @media (max-width: 1000px) {
          .hero-flex-wrapper { flex-direction: column; text-align: center; gap: 3rem; }
          .hero-cta-group { justify-content: center; }
          .hero-text-side { text-align: center; padding-right: 0; }
          .hero-title { font-size: 2.75rem; }
          .services-grid, .types-grid { grid-template-columns: 1fr; }
          .glass-screen-layer { padding: 3rem; margin-top: -50px; }
          .context-banner { padding: 4rem 2rem !important; }
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
          <Route path="/about" element={<About />} />
        </Routes>
      </main>

      <footer className="footer glass-card">
        <div className="footer-content">
          <p>© 2026 SeizureSafe. Pharmacy Graduation Project • MTI University.</p>
          <p className="disclaimer">Medical Disclaimer: All recommendations are for medical knowledge only and not a substitute for professional medical advice. For dosage, consult your doctor.</p>
        </div>
      </footer>

      <style>{`
        .app-container { min-height: 100vh; display: flex; flex-direction: column; background: #fafafc; position: relative; }
        .main-content { flex: 1; padding-top: 80px; width: 100%; position: relative; z-index: 1; }
        .footer { margin-top: auto; padding: 4rem 2rem; text-align: center; border-radius: 0; background: white; border-top: 1px solid var(--border); position: relative; z-index: 1; }
        .footer-content { max-width: 800px; margin: 0 auto; }
        .disclaimer { font-size: 0.8rem; color: var(--text-muted); margin-top: 1.5rem; line-height: 1.6; }
        
        .section-header { text-align: center; margin-bottom: 5rem; max-width: 700px; margin-inline: auto; }
        .section-header h2 { font-size: 2.75rem; font-weight: 900; margin-bottom: 1.5rem; letter-spacing: -0.02em; }
        .section-header p { font-size: 1.15rem; color: var(--text-muted); }
      `}</style>
    </div>
  );
};

export default App;
