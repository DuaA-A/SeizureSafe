import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import AuthWindow from './components/auth/AuthWindow';
import SeizureCheck from './components/questionnaire/SeizureCheck';
import InteractionChecker from './components/checker/InteractionChecker';
import UserProfile from './components/profile/UserProfile';
import { Shield, Activity, Pill, User, ChevronRight, GraduationCap, Users, Award, Heart } from 'lucide-react';

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

      <footer className="footer glass-card">
        <div className="footer-content">
          <p>© 2026 SeizureSafe. Pharmacy Graduation Project • MTI University.</p>
          <p className="disclaimer">Medical Disclaimer: All recommendations are for medical knowledge only and not a substitute for professional medical advice. For dosage, consult your doctor.</p>
        </div>
      </footer>

      <style>{`
        .app-container { min-height: 100vh; display: flex; flex-direction: column; background: #fafafc; }
        .main-content { flex: 1; padding-top: 80px; width: 100%; }
        .footer { margin-top: auto; padding: 4rem 2rem; text-align: center; border-radius: 0; background: white; border-top: 1px solid var(--border); }
        .footer-content { max-width: 800px; margin: 0 auto; }
        .disclaimer { font-size: 0.8rem; color: var(--text-muted); margin-top: 1.5rem; line-height: 1.6; }
        
        .section-header { text-align: center; margin-bottom: 5rem; max-width: 700px; margin-inline: auto; }
        .section-header h2 { font-size: 2.75rem; font-weight: 900; margin-bottom: 1.5rem; letter-spacing: -0.02em; }
        .section-header p { font-size: 1.15rem; color: var(--text-muted); }
      `}</style>
    </div>
  );
};

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
        <div className="hero-bg-overlay"></div>
        <div className="hero-content container">
          <div className="graduation-badge">
             <GraduationCap size={20} />
             <span>Pharmacy Graduation Project 2026</span>
          </div>
          <h1 className="hero-title">A Professional Approach to <br/> <span className="text-primary italic">Epilepsy Safety</span></h1>
          <p className="hero-description">
            Expertly-crafted tools by medical students for identifying seizure patterns, 
            verifying drug interactions, and maintaining safe pharmacological history.
          </p>
          
          <div className="hero-cta-group">
            <Link to="/questionnaire" className="btn btn-primary btn-large catch-button">
               Start Scientific Check <ChevronRight size={20} />
            </Link>
            <a href="#team" className="btn btn-secondary btn-large">
               Meet The Medical Team
            </a>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section container">
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
        <div className="container">
          <div className="context-grid glass-card">
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
               <img src="/public/Team member names and ID.jpg" alt="Team Group" onError={(e) => e.target.src = 'https://images.unsplash.com/photo-1576091160550-217359f42f8c?auto=format&fit=crop&q=80&w=1000'} />
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="team-section container">
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

      <style>{`
        .home-container { display: flex; flex-direction: column; gap: 10rem; padding-bottom: 10rem; }
        
        /* Modern Hero Fix */
        .modern-hero {
          position: relative;
          min-height: 80vh;
          display: flex;
          align-items: center;
          overflow: hidden;
          background-image: url('https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=2000');
          background-size: cover;
          background-position: center;
          color: white;
          margin-top: -80px;
        }
        .hero-bg-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, rgba(44, 62, 80, 0.9) 0%, rgba(44, 62, 80, 0.4) 100%);
          z-index: 1;
        }
        .hero-content { position: relative; z-index: 2; max-width: 850px; padding: 0 20px; }
        .graduation-badge { display: inline-flex; align-items: center; gap: 10px; background: rgba(157, 141, 241, 0.2); padding: 8px 16px; border-radius: 30px; font-weight: 700; font-size: 0.85rem; border: 1px solid rgba(157, 141, 241, 0.3); margin-bottom: 2rem; color: #dcd6ff; }
        .hero-title { font-size: 3.5rem; font-weight: 900; line-height: 1.1; margin-bottom: 2rem; }
        .hero-description { font-size: 1.25rem; opacity: 0.9; margin-bottom: 3.5rem; line-height: 1.7; max-width: 650px; }
        .hero-cta-group { display: flex; gap: 1.5rem; }
        
        /* Services */
        .services-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; }
        .service-card { padding: 4rem 2.5rem; text-align: left; }
        .service-icon { margin-bottom: 2rem; color: var(--primary); }
        .service-card h3 { font-size: 1.5rem; margin-bottom: 1rem; }
        .service-card p { color: var(--text-muted); line-height: 1.6; }
        .service-link { display: flex; align-items: center; gap: 8px; margin-top: 2rem; text-decoration: none; color: var(--primary); font-weight: 800; font-size: 0.9rem; }

        /* Context Grid - Fixed Overlap */
        .context-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0; padding: 0; overflow: hidden; }
        .context-text { padding: 5rem; display: flex; flex-direction: column; justify-content: center; align-items: flex-start; gap: 1.5rem; }
        .context-image img { width: 100%; height: 100%; object-fit: cover; min-height: 500px; display: block; }
        .badge-purple { font-size: 0.75rem; font-weight: 800; text-transform: uppercase; color: var(--primary); letter-spacing: 0.1em; }
        .context-text h3 { font-size: 2.25rem; font-weight: 900; }
        .context-features { display: flex; flex-direction: column; gap: 1rem; margin-top: 1rem; }
        .c-feat { display: flex; align-items: center; gap: 10px; font-weight: 700; font-size: 0.95rem; color: var(--text-main); }
        .c-feat svg { color: var(--primary); }

        /* Team Section - Extract Names */
        .team-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.5rem; }
        .team-card { padding: 1.5rem 2rem; display: flex; align-items: center; gap: 1.5rem; border: 1px solid var(--border) !important; background: white !important; }
        .member-icon { width: 48px; height: 48px; background: #f4f1ff; border-radius: 12px; display: flex; align-items: center; justify-content: center; color: var(--primary); flex-shrink: 0; }
        .member-info h4 { font-size: 1.05rem; margin-bottom: 2px; line-height: 1.2; font-weight: 800; }
        .member-label { font-size: 0.75rem; color: var(--text-muted); font-weight: 600; text-transform: uppercase; }

        @media (max-width: 1000px) {
          .services-grid, .context-grid { grid-template-columns: 1fr; }
          .hero-title { font-size: 2.5rem; }
          .context-text { padding: 3rem 2rem; }
        }
      `}</style>
    </div>
  );
};

export default App;
