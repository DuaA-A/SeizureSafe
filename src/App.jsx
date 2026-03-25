import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from './components/common/Navbar';
import AuthWindow from './components/auth/AuthWindow';
import SeizureCheck from './components/questionnaire/SeizureCheck';
import InteractionChecker from './components/checker/InteractionChecker';
import UserProfile from './components/profile/UserProfile';
import About from './components/about/About';
import { Shield, Activity, Pill, User, ChevronRight, Heart, ClipboardList, ArrowRight, ShieldCheck, FileText } from 'lucide-react';

const Home = ({ onOpenAuth }) => {

  return (
    <div className="home-container animate-fade-in">
      {/* Hero Section */}
      <section className="hero-section modern-hero">
        <div className="hero-content container">
          <div className="hero-flex-wrapper">
            <div className="hero-text-side">
              <h1 className="hero-title white-text">
                A Professional Approach to <br />
                <span className="text-glow italic" style={{color:'#eebef1'}}>Epilepsy Safety</span>
              </h1>
              <p className="hero-description white-text">
                Expertly-crafted tools by medical students for identifying seizure patterns,
                verifying drug interactions, and maintaining safe pharmacological history for your loved one.
              </p>

              <div className="hero-cta-group">
                <Link to="/questionnaire" className="btn btn-premium btn-large">
                  Start Scientific Check <ChevronRight size={20} />
                </Link>
                <Link to="/about" className="btn btn-outline-white btn-large">
                  Meet The Medical Team
                </Link>
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
                        <stop offset="50%" stopColor="rgba(255, 255, 255, 0.3)" />
                        <stop offset="100%" stopColor="transparent" />
                      </linearGradient>
                      <linearGradient id="waveGradientColor" x1="100%" y1="0%" x2="0%" y2="0%">
                        <stop offset="0%" stopColor="transparent" />
                        <stop offset="50%" stopColor="rgba(255, 255, 255, 0.2)" />
                        <stop offset="100%" stopColor="transparent" />
                      </linearGradient>
                    </defs>
                    <path d="M400,140 C100,40 -400,240 -900,140" className="flow-line flow-left flow-1" />
                    <path d="M400,160 C50,90 -450,290 -950,190" className="flow-line flow-left flow-2" />
                    <path d="M420,120 C120,20 -380,220 -880,120" className="flow-line flow-left flow-3" />
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

      {/* Main Content Container */}
      <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '5rem', zIndex: 10, position: 'relative' }}>
          
        {/* 1. Empathy Introduction Section (Compacted) */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="empathy-section"
        >
          <div className="empathy-content">
            <Heart className="empathy-icon" size={36} />
            <h2>You Are Not Alone</h2>
            <p className="empathy-lead">
              Managing an epilepsy diagnosis can be overwhelming. We're here to provide professional, pharmacist-verified tools to help you track symptoms, verify medications, and care for them with absolute confidence.
            </p>
          </div>
        </motion.section>

        {/* 2. Understanding Epilepsy Types (Compacted to fit 100vh) */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="epilepsy-info-section"
        >
          <div className="section-header tight-header">
            <h2>Understanding Epilepsy</h2>
            <p>
              As a caregiver, understanding these main classifications helps you accurately document their patterns for doctors.
            </p>
          </div>
          <div className="types-grid">
            <motion.div whileHover={{ scale: 1.02 }} className="type-card glass-card">
              <div className="type-img-wrapper">
                <img src="/focal%20Aware.jpg" alt="Focal Aware Seizure Anatomy" />
              </div>
              <div className="type-card-content">
                <h3>Focal Aware Seizures</h3>
                <p>Start in a specific brain network. The individual remains fully or partially aware of what is happening during the episode.</p>
              </div>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} className="type-card glass-card">
              <div className="type-img-wrapper">
                <img src="/absence.jpg" alt="Absence Seizure Anatomy" />
              </div>
              <div className="type-card-content">
                <h3>Absence Seizures</h3>
                <p>A specific generalized seizure causing a sudden, brief lapse in consciousness, often safely appearing as staring into space.</p>
              </div>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} className="type-card glass-card">
              <div className="type-img-wrapper">
                <img src="/tonic-clonic.jpg" alt="Tonic-Clonic Seizure" />
              </div>
              <div className="type-card-content">
                <h3>Tonic-Clonic Seizures</h3>
                <p>A generalized seizure involving sudden stiffening (tonic phase) followed directly by sustained rhythmic jerking (clonic phase).</p>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* 3. The App Flow Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="app-flow-section"
        >
          <div className="section-header tight-header">
            <h2>How SeizureSafe Protects Them</h2>
          </div>
          <div className="flow-grid">
            <div className="flow-step glass-card">
              <div className="step-number">1</div>
              <ClipboardList className="step-icon" size={28} />
              <h3>Take the Questionnaire</h3>
              <p>Answer 4 guided diagnostic questions to categorize their symptoms.</p>
            </div>
            <ArrowRight className="flow-arrow" size={28} />
            <div className="flow-step glass-card">
              <div className="step-number">2</div>
              <Pill className="step-icon" size={28} />
              <h3>Log Medications</h3>
              <p>Add their active anti-epileptic drugs to their secure medical archive.</p>
            </div>
            <ArrowRight className="flow-arrow" size={28} />
            <div className="flow-step glass-card">
              <div className="step-number">3</div>
              <ShieldCheck className="step-icon" size={28} />
              <h3>Check Interactions</h3>
              <p>Instantly cross-check their daily regimen against the global RxNav database.</p>
            </div>
          </div>
        </motion.section>

        {/* 4. Support Services (Pastel Gradient Cards) */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="services-section"
        >
          <div className="section-header tight-header">
            <h2>Clinical Support Tools</h2>
          </div>
          <div className="services-grid">
            <motion.div whileHover={{ y: -6, scale: 1.02 }} className="service-card gradient-card purple">
              <div className="service-icon"><Activity size={32} /></div>
              <h3>Seizure Check</h3>
              <p>Diagnostic auxiliary guide utilizing clinical observation patterns to safely document their exact episodes.</p>
              <Link to="/questionnaire" className="service-link">Access Tool <ChevronRight size={16} /></Link>
            </motion.div>
            <motion.div whileHover={{ y: -6, scale: 1.02 }} className="service-card gradient-card blue">
              <div className="service-icon"><Pill size={32} /></div>
              <h3>Interaction Screening</h3>
              <p>High-precision API safety tool leveraging global RxNav standard data to check their prescriptions.</p>
              <Link to="/checker" className="service-link">Access Tool <ChevronRight size={16} /></Link>
            </motion.div>
            <motion.div whileHover={{ y: -6, scale: 1.02 }} className="service-card gradient-card teal">
              <div className="service-icon"><FileText size={32} /></div>
              <h3>Medical Archives</h3>
              <p>Securely store their pharmacological history and ongoing medical assessments in your private, secure dashboard.</p>
              <Link to="/profile" className="service-link">View Dashboard <ChevronRight size={16} /></Link>
            </motion.div>
          </div>
        </motion.section>

        {/* 5. Sign-Up CTA Section */}
        <motion.section 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="cta-section glass-card"
        >
          <h2>Ready to Take Control?</h2>
          <p>Join SeizureSafe today to build a secure, pharmacist-verified archive for your loved one.</p>
          <motion.button 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
            className="btn btn-premium btn-large cta-btn"
            onClick={onOpenAuth}
          >
            Create Your Free Account <ChevronRight size={20} />
          </motion.button>
        </motion.section>

      </div>

      <style>{`
        .home-container { display: flex; flex-direction: column; gap: 3rem; padding-bottom: 0rem; position: relative; }
        
        /* Hero Section Snapped to 100vh */
        .modern-hero {
          position: relative;
          height: 100vh;
          display: flex;
          align-items: center;
          margin-top: -80px;
          padding-top: 80px; /* Accounts for navbar so content is perfectly centered */
          overflow: hidden;
          background: linear-gradient(135deg, #5b21b6 0%, #3b82f6 100%); /* Vibrant but calm purple to blue */
          box-sizing: border-box;
        }
        .hero-flex-wrapper { display: flex; align-items: center; gap: 0; width: 100%; }
        .hero-text-side { flex: 1.4; z-index: 10; text-align: left; padding-right: 4rem; }
        .hero-title { font-size: 3.5rem; margin-bottom: 1.5rem; line-height: 1.1; }
        .hero-description { font-size: 1.15rem; color: rgba(255,255,255,0.85); max-width: 650px; margin: 0 auto 2.5rem; }
        .hero-cta-group { display: flex; gap: 1rem; flex-wrap: wrap; }
        .hero-image-side { flex: 1.8; display: flex; justify-content: flex-end; align-items: center; z-index: 5; }
        .hero-img-container { position: relative; display: flex; justify-content: center; align-items: center; width: 100%; }
        .hero-main-img { width: 100%; max-width: 600px; height: auto; z-index: 2; mix-blend-mode: screen; }

        /* Brain Flow svg */
        .brain-flow-overlay { position: absolute; inset: -300px -600px; pointer-events: none; z-index: 3; mix-blend-mode: overlay; opacity: 0.6; }
        .brain-flow-svg { width: 100%; height: 100%; overflow: visible; }
        .flow-line { fill: none; stroke-width: 2.5; stroke-linecap: round; stroke-dasharray: 200, 1000; animation: smoothFlow 7s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
        .flow-left { stroke: url(#waveGradient); }
        .flow-right { stroke: url(#waveGradientColor); }
        @keyframes smoothFlow { 0% { stroke-dashoffset: 1000; } 100% { stroke-dashoffset: 0; } }

        /* Section Headers */
        .section-header { text-align: center; margin-bottom: 3rem; max-width: 800px; margin-inline: auto; }
        .section-header h2 { font-size: 2.5rem; font-weight: 900; margin-bottom: 1rem; letter-spacing: -0.02em; color: var(--text-main); }
        .section-header p { font-size: 1.1rem; color: var(--text-muted); line-height: 1.6; }
        .tight-header { margin-bottom: 2rem !important; }

        /* Empathy Section - Colored Gradient Shade */
        .empathy-section { padding: 2.5rem 3rem; text-align: center; background: linear-gradient(135deg, rgba(167, 139, 250, 0.15), rgba(96, 165, 250, 0.1)); border-radius: 20px; border: 1px solid rgba(167, 139, 250, 0.3); margin-top: -1.5rem; }
        .empathy-content { max-width: 850px; margin: 0 auto; display: flex; flex-direction: column; align-items: center; gap: 0.8rem; }
        .empathy-icon { color: var(--primary); margin-bottom: 0; }
        .empathy-section h2 { font-size: 1.75rem; font-weight: 800; color: var(--text-main); margin-bottom: 0; }
        .empathy-lead { font-size: 1.15rem; font-weight: 500; color: var(--text-main); margin-bottom: 0; line-height: 1.5; }

        /* Types Grid (Compacted) */
        .types-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
        .type-card { display: flex; flex-direction: column; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.03); border: 1px solid var(--border); }
        .type-img-wrapper { width: 100%; height: 180px; background: rgba(126, 34, 206, 0.05); }
        .type-img-wrapper img { width: 100%; height: 100%; object-fit: cover; }
        .type-card-content { padding: 1.5rem; flex: 1; display: flex; flex-direction: column; }
        .type-card h3 { font-size: 1.25rem; color: var(--primary); margin-bottom: 0.5rem; font-weight: 800; }
        .type-card p { font-size: 0.95rem; color: var(--text-muted); line-height: 1.5; margin: 0; }

        /* App Flow Section (Compacted) */
        .flow-grid { display: flex; align-items: center; justify-content: space-between; gap: 1.5rem; }
        .flow-step { flex: 1; position: relative; padding: 2rem 1.5rem; text-align: center; background: white; border-radius: 16px; display: flex; flex-direction: column; align-items: center; min-height: 220px; box-shadow: 0 4px 15px rgba(0,0,0,0.03); border: 1px solid var(--border); }
        .step-number { position: absolute; top: -15px; left: -15px; width: 40px; height: 40px; background: var(--primary); color: white; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; font-weight: 900; border-radius: 50%; box-shadow: 0 5px 10px rgba(126, 34, 206, 0.2); }
        .step-icon { color: var(--primary); margin-bottom: 1rem; }
        .flow-step h3 { font-size: 1.2rem; margin-bottom: 0.5rem; color: var(--text-main); font-weight: 800; }
        .flow-step p { font-size: 0.95rem; color: var(--text-muted); line-height: 1.5; margin: 0; }
        .flow-arrow { color: rgba(126, 34, 206, 0.3); flex-shrink: 0; }

        /* Services Pastel Gradient Cards with Dark Buttons/Text */
        .services-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
        .service-card { padding: 2rem; text-align: left; border-radius: 16px; border: 1px solid transparent; overflow: hidden; position: relative; display: flex; flex-direction: column; box-shadow: 0 4px 15px rgba(0,0,0,0.02); }
        
        .gradient-card.purple { background: rgba(167,139,250,0.1); border-color: rgba(167,139,250,0.3); }
        .gradient-card.blue { background: rgba(59,130,246,0.1); border-color: rgba(59,130,246,0.3); }
        .gradient-card.teal { background: rgba(20,184,166,0.1); border-color: rgba(20,184,166,0.3); }
        
        .service-icon { margin-bottom: 1.5rem; color: var(--primary); }
        .service-card h3 { font-size: 1.4rem; margin-bottom: 0.8rem; font-weight: 800; color: var(--text-main); }
        .service-card p { color: var(--text-muted); line-height: 1.5; flex: 1; font-size: 0.95rem; }
        .service-link { display: inline-flex; align-items: center; gap: 8px; margin-top: 1.5rem; text-decoration: none !important; color: white !important; font-weight: 600; font-size: 0.95rem; background: var(--primary); padding: 10px 18px; border-radius: 12px; width: fit-content; transition: background 0.3s, transform 0.2s; }
        .service-link:hover { background: var(--primary-hover); transform: translateX(4px); }

        /* CTA Section */
        .cta-section { text-align: center; padding: 4rem; background: white; border-radius: 24px; box-shadow: 0 10px 30px rgba(0,0,0,0.03); border: 1px solid var(--border); }
        .cta-section h2 { font-size: 2.5rem; font-weight: 900; margin-bottom: 1rem; color: var(--text-main); }
        .cta-section p { font-size: 1.15rem; color: var(--text-muted); margin-bottom: 2.5rem; }
        .cta-btn { margin: 0 auto; box-shadow: 0 10px 20px rgba(126,34,206,0.2); }

        /* Responsive */
        @media (max-width: 1100px) {
          .types-grid, .services-grid { grid-template-columns: repeat(2, 1fr); }
          .flow-grid { flex-direction: column; }
          .flow-arrow { display: none; }
          .flow-step { width: 100%; min-height: auto; }
        }
        @media (max-width: 768px) {
          .hero-flex-wrapper { flex-direction: column; text-align: center; gap: 3rem; }
          .hero-cta-group { justify-content: center; }
          .hero-text-side { text-align: center; padding-right: 0; }
          .hero-title { font-size: 2.75rem; }
          .types-grid, .services-grid { grid-template-columns: 1fr; }
          .empathy-section, .cta-section { padding: 2.5rem 1.5rem; }
          .section-header h2 { font-size: 2rem; }
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

      <footer className="footer dark-footer">
        <div className="footer-content">
          <p>© 2026 SeizureSafe. Pharmacy Graduation Project • MTI University.</p>
          <p className="disclaimer">Medical Disclaimer: All recommendations are for medical knowledge only and not a substitute for professional medical advice. For dosage, consult your doctor.</p>
        </div>
      </footer>

      <style>{`
        .app-container { min-height: 100vh; display: flex; flex-direction: column; position: relative; overflow-x: hidden; }
        .main-content { flex: 1; padding-top: 80px; width: 100%; position: relative; z-index: 1; margin-bottom: 6rem; }
        .dark-footer { margin-top: auto; padding: 3rem 2rem; text-align: center; background: #1e1b4b; color: white; position: relative; z-index: 1; }
        .footer-content { max-width: 800px; margin: 0 auto; }
        .disclaimer { font-size: 0.8rem; color: rgba(255, 255, 255, 0.5); margin-top: 1rem; line-height: 1.6; }
      `}</style>
    </div>
  );
};

export default App;
