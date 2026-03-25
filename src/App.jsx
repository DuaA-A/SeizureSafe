import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from './components/common/Navbar';
import AuthWindow from './components/auth/AuthWindow';
import SeizureCheck from './components/questionnaire/SeizureCheck';
import InteractionChecker from './components/checker/InteractionChecker';
import UserProfile from './components/profile/UserProfile';
import About from './components/about/About';
import { Shield, Activity, Pill, User, ChevronRight, Heart, ClipboardList, ArrowRight, ShieldCheck, FileText, X, Info } from 'lucide-react';

const TypeDetailModal = ({ type, onClose }) => {
  if (!type) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="modal-content glass-card" 
        onClick={e => e.stopPropagation()}
      >
        <button className="close-btn" onClick={onClose}><X size={24} /></button>
        <div className="modal-body-layout">
          <div className="modal-image">
            <img src={type.image} alt={type.name} />
          </div>
          <div className="modal-info">
            <div className="active-badge mb-2">Detailed Clinical Guide</div>
            <h2>{type.name}</h2>
            <p className="modal-desc">{type.description}</p>
            <div className="symptoms-box mt-4">
              <h4>Primary Indicators:</h4>
              <ul>
                {type.symptoms.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </div>
            <div className="medical-note-box mt-4">
              <Info size={18} />
              <p>Pharmacist Note: {type.note}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const EPILEPSY_DETAILS = [
  {
    id: 'gtc',
    name: 'Generalized Tonic-Clonic',
    title: 'Tonic-Clonic',
    image: '/tonic-clonic.jpg',
    description: 'A major generalized seizure characterized by sudden loss of consciousness, body stiffening (tonic phase), followed by rhythmic jerking (clonic phase).',
    symptoms: ['Loss of consciousness', 'Full body rhythmic jerking', 'Vocalizations or tongue biting', 'Confusion after episode'],
    note: 'Ensure the environment is clear of sharp objects. Do not place anything in the mouth.'
  },
  {
    id: 'focal-aware',
    name: 'Focal Aware Seizure',
    title: 'Focal Aware',
    image: '/focal Aware.jpg',
    description: 'Starts in one area of the brain. The person remains fully aware and can usually describe the event in detail after it finishes.',
    symptoms: ['Localized twitching (hand/face)', 'Strange smells or tastes', 'Intense feelings of fear/joy', 'Numbness or tingling'],
    note: 'Observe carefully to see if it progresses. Documentation of precise feelings is vital for diagnosis.'
  },
  {
    id: 'absence',
    name: 'Absence Seizure',
    title: 'Absence',
    image: '/absence.jpg',
    description: 'A brief lapse in consciousness that looks like staring into space. Commonly seen in children and lasts only a few seconds.',
    symptoms: ['Sudden blank stare', 'Eyes rolling upward', 'Rapid blinking', 'Immediate return to normal awareness'],
    note: 'Easily missed in school settings. Frequent "daydreaming" should be medically investigated.'
  },
  {
    id: 'focal-impaired',
    name: 'Focal Impaired Awareness',
    title: 'Focal Impaired',
    image: '/hero.png',
    description: 'A focal seizure where awareness is altered or lost. The person may appear conscious but is not fully responsive.',
    symptoms: ['Automatisms (lip smacking, chewing)', 'Repetitive movements', 'Aimless walking', 'No memory of the event'],
    note: 'Guide the individual away from danger gently; do not restrain them forcefully.'
  },
  {
    id: 'atonic',
    name: 'Atonic Seizure (Drop Attacks)',
    title: 'Atonic',
    image: '/tonic-clonic.jpg',
    description: 'Sudden loss of muscle tone causing the person to collapse or fall forward. Also known as "drop attacks".',
    symptoms: ['Sudden limpness', 'Head dropping forward', 'Immediate collapse', 'Brief duration'],
    note: 'Risk of head injury is high. Protective headgear is often recommended for frequent events.'
  },
  {
    id: 'myoclonic',
    name: 'Myoclonic Seizure',
    title: 'Myoclonic',
    image: '/absence.jpg',
    description: 'Brief, shock-like jerks of a muscle or group of muscles. Usually occurring on both sides of the body.',
    symptoms: ['Sudden muscle contractions', 'Shock-like jerks', 'Commonly occurs in the morning', 'Brief (1-2 seconds)'],
    note: 'Often occurs shortly after waking. Can interfere with holding objects or eating.'
  }
];

const Home = ({ onOpenAuth }) => {
  const [selectedType, setSelectedType] = useState(null);

  return (
    <div className="home-container animate-fade-in">
      <TypeDetailModal type={selectedType} onClose={() => setSelectedType(null)} />

      {/* Hero Section */}
      <section className="full-screen-section modern-hero">
        <div className="hero-content container">
          <div className="hero-flex-wrapper">
            <div className="hero-text-side">
              <div className="active-badge mb-4">Empowering Caregivers Every Day</div>
              <h1 className="hero-title white-text">
                Your Loved One’s Safety <br />
                <span className="text-glow italic" style={{color:'#eebef1'}}>Is Our Priority</span>
              </h1>
              <p className="hero-description white-text">
                We bridge the gap between clinical complexity and compassionate care. 
                Identify seizure patterns accurately and verify drug interactions with pharmacist-backed tools 
                designed for the people you care about most.
              </p>

              <div className="hero-cta-group">
                <Link to="/questionnaire" className="btn btn-premium btn-large">
                  Epilepsy Questionnaire <ChevronRight size={20} />
                </Link>
                <Link to="/checker" className="btn btn-outline-white btn-large">
                  Drug Interaction Checker
                </Link>
              </div>
            </div>

            <div className="hero-image-side">
              <div className="hero-img-container">
                <img src="/hero.png" alt="Epilepsy Awareness" className="hero-main-img" />
                <div className="brain-flow-overlay">
                  {/* (Brain waves svg logic remains same) */}
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


      {/* 2. Understanding Epilepsy - Intro */}
      <section className="full-screen-section bg-soft">
        <div className="container">
          <div className="intro-epilepsy-layout">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="intro-text"
            >
              <div className="active-badge mb-2">Knowledge is Power</div>
              <h2>What Is Epilepsy?</h2>
              <p>
                Epilepsy is a chronic noncommunicable disease of the brain that affects people of all ages. 
                It is characterized by recurrent seizures, which are brief episodes of involuntary movement 
                that may involve a part of the body (partial) or the entire body (generalized).
              </p>
              <p>
                As a caregiver, identifying the exact pattern of these episodes is the most critical information 
                you can provide to a neurologist to ensure effective pharmacological treatment.
              </p>
              <div className="stats-grid mt-8">
                <div className="stat-item">
                  <h3>50M+</h3>
                  <span>People Affected Worldwide</span>
                </div>
                <div className="stat-item">
                  <h3>70%</h3>
                  <span>Can Live Seizure-Free with Meds</span>
                </div>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="intro-image glass-card"
            >
              <img src="/hero.png" alt="What is Epilepsy" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. Types of Epilepsy Grid */}
      <section className="full-screen-section">
        <div className="container">
          <div className="section-header">
            <h2>Clinical Classifications</h2>
            <p>Select a type to view detailed clinical observation patterns and safety notes.</p>
          </div>
          <div className="types-full-grid mt-12">
            {EPILEPSY_DETAILS.map((type) => (
              <motion.div 
                key={type.id}
                whileHover={{ scale: 1.05, y: -10 }}
                className="type-card-premium glass-card"
                onClick={() => setSelectedType(type)}
              >
                <div className="type-card-img">
                  <img src={type.image} alt={type.name} />
                  <div className="type-card-overlay">
                    <span className="view-details">Click for Details</span>
                  </div>
                </div>
                <div className="type-card-info">
                  <h3>{type.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Support Services */}
      <section className="section-spacing bg-gradient-sync text-center">
        <div className="container">
          <div className="section-header centered-header">
            <h2>Clinical Support Tools</h2>
            <p>Everything you need for safe pharmacological management.</p>
          </div>
          <div className="services-grid mt-12">
            <motion.div whileHover={{ y: -6 }} className="service-card glass-card">
              <div className="service-icon"><Activity size={40} /></div>
              <h3>Seizure Check</h3>
              <p>Diagnostic auxiliary guide utilizing clinical observation patterns to safely document their exact episodes.</p>
              <Link to="/questionnaire" className="btn btn-premium mt-4">Start Check</Link>
            </motion.div>
            <motion.div whileHover={{ y: -6 }} className="service-card glass-card">
              <div className="service-icon"><Pill size={40} /></div>
              <h3>Interaction Screening</h3>
              <p>High-precision API safety tool leveraging global RxNav standard data to check their prescriptions.</p>
              <Link to="/checker" className="btn btn-premium mt-4">Check Drugs</Link>
            </motion.div>
            <motion.div whileHover={{ y: -6 }} className="service-card glass-card">
              <div className="service-icon"><FileText size={40} /></div>
              <h3>Medical Archives</h3>
              <p>Securely store their pharmacological history and ongoing medical assessments in your private dashboard.</p>
              <Link to="/profile" className="btn btn-premium mt-4">View History</Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. Sign-Up CTA Section */}
      <section className="section-spacing text-center">
        <div className="container cta-border-card-wrapper">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="cta-glass-card glass-card animate-fade-in"
          >
            <h2>Ready to Take Control?</h2>
            <p>Join SeizureSafe today to build a secure, pharmacist-verified archive for your loved one.</p>
            <div className="cta-buttons mt-8">
              <button className="btn btn-premium btn-large" onClick={onOpenAuth}>Register Now</button>
              <Link to="/about" className="btn btn-secondary btn-large ml-4" style={{ borderColor: 'var(--primary)', color: 'var(--primary)' }}>Learn More</Link>
            </div>
          </motion.div>
        </div>
      </section>

      <style>{`
        .home-container { display: flex; flex-direction: column; gap: 0rem; padding-bottom: 0rem; position: relative; }
        
        .full-screen-section { min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 6rem 0; box-sizing: border-box; }
        .bg-gradient-sync { background: linear-gradient(135deg, #f8fafc 0%, rgba(238, 190, 241, 0.15) 100%); }
        .bg-glass-blur { background: rgba(255, 255, 255, 0.3); backdrop-filter: blur(20px); }

        /* Active Badge */
        .active-badge { display: inline-flex; align-items: center; padding: 6px 16px; background: rgba(126, 34, 206, 0.1); color: var(--primary); border-radius: 30px; font-weight: 800; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.05em; border: 1px solid rgba(126, 34, 206, 0.2); }

        /* Modern Hero Styles (Updated) */
        .modern-hero {
          position: relative;
          background: linear-gradient(135deg, #4338ca 0%, #3b82f6 100%);
          margin-top: -80px;
          padding-top: 80px;
          overflow: hidden;
        }
        .hero-flex-wrapper { display: flex; align-items: center; gap: 0; width: 100%; min-height: calc(100vh - 80px); }
        .hero-text-side { flex: 1; z-index: 10; text-align: left; padding-right: 4rem; }
        .hero-image-side { flex: 1; display: flex; justify-content: flex-end; align-items: center; z-index: 5; }
        .hero-img-container { position: relative; display: flex; justify-content: center; align-items: center; width: 100%; }
        .hero-main-img { width: 100%; max-width: 600px; height: auto; z-index: 2; mix-blend-mode: screen; }

        /* Modal Overhaul */
        .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.4); backdrop-filter: blur(8px); display: flex; align-items: center; justify-content: center; z-index: 10000; padding: 2rem; }
        .modal-content { max-width: 900px; width: 100%; max-height: 90vh; overflow-y: auto; background: white; border-radius: 32px; box-shadow: 0 30px 60px rgba(0,0,0,0.2) !important; position: relative; border: 1px solid rgba(255,255,255,0.3); }
        .modal-body-layout { display: grid; grid-template-columns: 1fr 1.2fr; gap: 0; min-height: 500px; }
        .modal-image { height: 100%; min-height: 500px; overflow: hidden; }
        .modal-image img { width: 100%; height: 100%; object-fit: cover; }
        .modal-info { padding: 4rem 3rem; }
        .modal-info h2 { font-size: 2.2rem; font-weight: 900; margin-bottom: 1rem; color: var(--text-main); }
        .modal-desc { font-size: 1.1rem; color: var(--text-muted); line-height: 1.6; }
        .close-btn { position: absolute; top: 1.5rem; right: 1.5rem; z-index: 10; background: white; border-radius: 50%; padding: 8px; border: 1px solid var(--border); box-shadow: 0 4px 12px rgba(0,0,0,0.1); cursor: pointer; }
        .active-badge { background: var(--primary) !important; color: white !important; font-weight: 800 !important; padding: 6px 14px; border-radius: 20px; font-size: 0.8rem; display: inline-block; }
        
        .hero-title { font-size: 4rem; font-weight: 900; line-height: 1.1; margin-bottom: 2rem; color: white !important; text-decoration: none !important; }
        .hero-cta-group { display: flex; gap: 1.5rem; }
        .hero-description { font-size: 1.2rem; line-height: 1.7; color: rgba(255, 255, 255, 0.9); max-width: 600px; margin-bottom: 3rem; }
        .btn-outline-white { border: 2px solid white; color: white !important; background: transparent; text-decoration: none !important; }
        .btn-outline-white:hover { background: white; color: var(--primary) !important; }
        .hero-cta-group a { text-decoration: none !important; }

        /* Brain Flow svg */
        .brain-flow-overlay { position: absolute; inset: -300px -600px; pointer-events: none; z-index: 3; mix-blend-mode: overlay; opacity: 0.6; }
        .brain-flow-svg { width: 100%; height: 100%; overflow: visible; }
        .flow-line { fill: none; stroke-width: 2.5; stroke-linecap: round; stroke-dasharray: 200, 1000; animation: smoothFlow 7s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
        .flow-left { stroke: url(#waveGradient); }
        .flow-right { stroke: url(#waveGradientColor); }
        @keyframes smoothFlow { 0% { stroke-dashoffset: 1000; } 100% { stroke-dashoffset: 0; } }

        /* Intro Epilepsy Layout */
        .intro-epilepsy-layout { display: grid; grid-template-columns: 1.2fr 1fr; gap: 5rem; align-items: center; }
        .intro-text h2 { font-size: 3rem; margin-bottom: 1.5rem; }
        .intro-text p { font-size: 1.15rem; color: var(--text-muted); margin-bottom: 1.5rem; }
        .intro-image img { width: 100%; height: 500px; object-fit: cover; border-radius: 24px; }
        
        .stats-grid { display: flex; gap: 3rem; }
        .stat-item h3 { font-size: 2.5rem; color: var(--primary); margin-bottom: 0.2rem; }
        .stat-item span { font-weight: 700; color: var(--text-muted); font-size: 0.9rem; }

        /* Types Grid (Premium) */
        .types-full-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2.5rem; }
        .type-card-premium { cursor: pointer; position: relative; overflow: hidden; border-radius: 24px; padding: 0 !important; }
        .type-card-img { position: relative; height: 320px; width: 100%; }
        .type-card-img img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1); }
        .type-card-premium:hover .type-card-img img { transform: scale(1.1); }
        .type-card-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.7), transparent); display: flex; align-items: flex-end; justify-content: center; padding: 2rem; opacity: 0; transition: opacity 0.3s; }
        .type-card-premium:hover .type-card-overlay { opacity: 1; }
        .view-details { color: white; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em; border-bottom: 2px solid white; padding-bottom: 4px; }
        .type-card-info { padding: 1.5rem; text-align: center; }
        .type-card-info h3 { font-size: 1.25rem; margin: 0; color: var(--text-main); }

        /* Modal Styles */
        .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.6); backdrop-filter: blur(8px); z-index: 2000; display: flex; align-items: center; justify-content: center; padding: 2rem; }
        .modal-content { max-width: 900px; width: 100%; position: relative; padding: 3rem !important; overflow: hidden; }
        .close-btn { position: absolute; top: 1.5rem; right: 1.5rem; background: none; border: none; color: var(--text-muted); cursor: pointer; }
        .modal-body-layout { display: grid; grid-template-columns: 1fr 1.2fr; gap: 3rem; align-items: start; }
        .modal-image img { width: 100%; height: 400px; object-fit: cover; border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); }
        .modal-info h2 { font-size: 2.5rem; margin-bottom: 1rem; color: var(--text-main); }
        .modal-desc { font-size: 1.1rem; color: var(--text-muted); line-height: 1.6; }
        .symptoms-box h4 { font-size: 1.1rem; font-weight: 800; margin-bottom: 0.8rem; color: var(--text-main); }
        .symptoms-box ul { padding-left: 1.2rem; color: var(--text-muted); }
        .symptoms-box li { margin-bottom: 6px; }
        .medical-note-box { display: flex; gap: 1rem; padding: 1.5rem; background: rgba(59, 130, 246, 0.05); border-radius: 16px; border: 1px solid rgba(59, 130, 246, 0.1); color: #1e40af; }
        .medical-note-box p { margin: 0; font-size: 0.95rem; font-weight: 600; line-height: 1.5; }

        /* Empathy Section Overlay */
        .empathy-section-wrapper { position: relative; margin-top: -8rem; z-index: 100; padding: 0 2rem; }
        .empathy-section { padding: 4rem !important; text-align: center; max-width: 900px; margin: 0 auto; border: 2px solid rgba(126, 34, 206, 0.1) !important; }
        .empathy-lead { font-size: 1.4rem; font-weight: 500; line-height: 1.6; max-width: 900px; margin: 1.5rem auto 0; color: var(--text-main); }
        .empathy-icon { color: #f43f5e; margin-bottom: 1rem; }

        /* Services Grid Sync */
        .centered-header { max-width: 800px; margin: 0 auto 4rem; text-align: center; }
        .centered-header h2 { text-align: center; width: 100%; margin: 0 auto 1.5rem; }
        .centered-header p { text-align: center; margin: 0 auto; }
        .services-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2.5rem; width: 100%; }
        .service-card { padding: 3rem 2rem !important; text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: center; }
        .service-icon { color: var(--primary); margin-bottom: 2rem; display: flex; justify-content: center; width: 100%; }
        .service-card h3 { font-size: 1.5rem; margin-bottom: 1rem; }
        .service-card p { max-width: 280px; }

        /* CTA Section - Gradient Border Card */
        .cta-border-card-wrapper { display: flex; justify-content: center; width: 100%; padding: 4rem 0; }
        .cta-glass-card { 
          padding: 5rem 3rem !important; 
          background: white !important; 
          border: 4px solid transparent !important; 
          background-image: linear-gradient(white, white), linear-gradient(135deg, #4338ca 0%, #3b82f6 100%) !important;
          background-origin: border-box !important;
          background-clip: padding-box, border-box !important;
          color: var(--text-main);
          max-width: 900px;
          margin: 0 auto;
          box-shadow: 0 20px 50px rgba(0,0,0,0.1) !important;
        }
        .cta-glass-card h2 { color: var(--text-main) !important; font-size: 2.5rem; margin-bottom: 1.5rem; }
        .cta-glass-card p { color: var(--text-muted) !important; font-size: 1.2rem; margin-bottom: 2.5rem; }
        .ml-4 { margin-left:1.5rem; }

        @media (max-width: 1000px) {
          .intro-epilepsy-layout, .modal-body-layout { grid-template-columns: 1fr; gap: 2rem; }
          .types-full-grid, .services-grid { grid-template-columns: 1fr; }
          .modal-content { padding: 2rem !important; height: 90vh; overflow-y: auto; }
          .modal-image img { height: 250px; }
          
          .hero-flex-wrapper { flex-direction: column; text-align: center; padding-top: 4rem; }
          .hero-text-side { padding-right: 0; margin-bottom: 3rem; }
          .hero-title { font-size: 2.5rem; }
          .hero-cta-group { justify-content: center; }
          .hero-image-side { justify-content: center; width: 100%; }
          .hero-main-img { max-width: 100%; }
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
