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
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="modal-content glass-card"
        onClick={e => e.stopPropagation()}
      >
        <button className="close-btn" onClick={onClose}><X size={24} /></button>
        <div className="modal-body-layout">
          <div className="modal-image">
            <img src={type.image} alt={type.name} />
          </div>
          <div className="modal-info">
            <div className="modal-badge mb-3">Clinical Classification Detail</div>
            <h2>{type.name}</h2>
            <div className="modal-desc-wrapper">
              <p className="modal-desc">{type.description}</p>
            </div>
            <div className="modal-details-grid mt-6">
              <div className="symptoms-box">
                <h4><Activity size={18} className="icon-purple" /> Primary Indicators:</h4>
                <ul>
                  {type.symptoms.map((s, i) => <li key={i}>{s}</li>)}
                </ul>
              </div>
              <div className="medical-note-box">
                <div className="note-header">
                  <Info size={18} className="icon-purple" />
                  <strong>Pharmacist Note</strong>
                </div>
                <p>{type.note}</p>
              </div>
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
    image: '/focal impaired.jpg',
    description: 'A focal seizure where awareness is altered or lost. The person may appear conscious but is not fully responsive.',
    symptoms: ['Automatisms (lip smacking, chewing)', 'Repetitive movements', 'Aimless walking', 'No memory of the event'],
    note: 'Guide the individual away from danger gently; do not restrain them forcefully.'
  },
  {
    id: 'atonic',
    name: 'Atonic Seizure (Drop Attacks)',
    title: 'Atonic',
    image: '/atonic.jpg',
    description: 'Sudden loss of muscle tone causing the person to collapse or fall forward. Also known as "drop attacks".',
    symptoms: ['Sudden limpness', 'Head dropping forward', 'Immediate collapse', 'Brief duration'],
    note: 'Risk of head injury is high. Protective headgear is often recommended for frequent events.'
  },
  {
    id: 'myoclonic',
    name: 'Myoclonic Seizure',
    title: 'Myoclonic',
    image: '/myoclonic.jpg',
    description: 'Brief, shock-like jerks of a muscle or group of muscles. Usually occurring on both sides of the body.',
    symptoms: ['Sudden muscle contractions', 'Shock-like jerks', 'Commonly occurs in the morning', 'Brief (1-2 seconds)'],
    note: 'Often occurs shortly after waking. Can interfere with holding objects or eating.'
  }
];

const Home = ({ onOpenAuth }) => {
  const [selectedType, setSelectedType] = useState(null);

  return (
    <>
      <TypeDetailModal type={selectedType} onClose={() => setSelectedType(null)} />
      <div className="home-container animate-fade-in">

      {/* Hero Section */}
      <section className="full-screen-section modern-hero">
        <div className="hero-content container">
          <div className="hero-flex-wrapper">
            <div className="hero-text-side">
              <div className="active-badge mb-4">Empowering Caregivers Every Day</div> <br />
              <h1 className="hero-title white-text">
                Your Loved One’s Safety <br />
                <span className="text-glow italic" style={{ color: '#eebef1' }}>Is Our Priority</span>
              </h1>
              <p className="hero-description white-text">
                We bridge the gap between clinical complexity and compassionate care.
                Identify seizure patterns accurately and verify drug interactions with pharmacist-backed tools
                designed for the people you care about most.
              </p>

              <div className="hero-cta-group">
                <Link to="/questionnaire" className="btn-white-dark">
                  Epilepsy Questionnaire <ChevronRight size={20} />
                </Link>
                <Link to="/checker" className="btn btn-outline-white">
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
      <section className="full-screen-section bg-unified">
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
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="intro-image glass-card"
            >
              <img src="/epilepsy.jpg" alt="What is Epilepsy" />
            </motion.div>
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
          </div>
        </div>
      </section>

      {/* 3. Types of Epilepsy Grid */}
      <section className="full-screen-section bg-unified">
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
      <section className="section-spacing bg-unified text-center">
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
      <section className="section-spacing bg-unified text-center">
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
              <button className="btn-white-solid" onClick={onOpenAuth}>Register Now</button>
              <Link to="/about" className="btn-outline-white">Learn More</Link>
            </div>
          </motion.div>
        </div>
      </section>

      <style>{`
        .home-container { display: flex; flex-direction: column; gap: 0rem; padding-bottom: 0rem; position: relative; }
        
        .full-screen-section { min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 6rem 0; box-sizing: border-box; position: relative; }
        .bg-unified { background: linear-gradient(135deg, #f8fafc 0%, rgba(157, 141, 241, 0.15) 100%); }
        .bg-glass-blur { background: rgba(255, 255, 255, 0.3); backdrop-filter: blur(20px); }
        .text-glow { text-shadow: 0 0 15px rgba(238, 190, 241, 0.5); }

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
        .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.6); backdrop-filter: blur(8px); display: flex; align-items: center; justify-content: center; z-index: 99999 !important; padding: 2rem; padding-top: calc(80px + 2rem); }
        .modal-content { 
          max-width: 1200px; 
          width: 80%; 
          max-height: 85vh; 
          overflow-y: auto; 
          background: white; 
          border-radius: 32px; 
          box-shadow: 0 40px 100px rgba(0,0,0,0.2) !important; 
          position: relative; 
          border: 1px solid rgba(255,255,255,0.3);
        }
        .modal-body-layout { display: grid; grid-template-columns: 1fr 1.3fr; gap: 0; min-height: 600px; }
        .modal-image { height: 100%; min-height: 600px; overflow: hidden; }
        .modal-image img { width: 100%; height: 100%; object-fit: contain; background: #f8fafc; }
        .modal-info { padding: 4rem; display: flex; flex-direction: column; }
        .modal-badge { display: inline-block; padding: 6px 14px; background: rgba(126, 34, 206, 0.1); color: var(--primary); border-radius: 20px; font-weight: 800; font-size: 0.75rem; text-transform: uppercase; width: fit-content; }
        .modal-info h2 { font-size: 2.5rem; font-weight: 900; margin-bottom: 1.5rem; color: var(--text-main); }
        .modal-desc { font-size: 1.15rem; color: var(--text-muted); line-height: 1.6; margin: 0; }
        .modal-details-grid { display: flex; flex-direction: column; gap: 2rem; }
        .symptoms-box h4 { font-size: 1.1rem; font-weight: 800; margin-bottom: 1rem; color: var(--text-main); display: flex; align-items: center; gap: 8px; }
        .symptoms-box ul { padding-left: 1.5rem; color: var(--text-muted); }
        .symptoms-box li { margin-bottom: 8px; font-weight: 500; }
        .medical-note-box { padding: 2rem; background: rgba(157, 141, 241, 0.05); border-radius: 24px; border: 1px solid rgba(157, 141, 241, 0.1); }
        .note-header { display: flex; align-items: center; gap: 10px; margin-bottom: 0.8rem; }
        .note-header strong { font-size: 0.95rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--primary); }
        .medical-note-box p { margin: 0; font-size: 1rem; color: var(--text-main); font-weight: 600; line-height: 1.5; }
        .close-btn { position: absolute; top: 1.5rem; right: 1.5rem; z-index: 10; background: white; border-radius: 50%; padding: 10px; border: 1px solid var(--border); box-shadow: 0 4px 12px rgba(0,0,0,0.1); cursor: pointer; color: var(--text-muted); transition: all 0.2s; }
        .close-btn:hover { transform: rotate(90deg); color: var(--error); }
        
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
        .intro-epilepsy-layout { display: grid; grid-template-columns: 1.2fr 1fr; grid-template-areas: "text image" "stats image"; gap: 2rem 5rem; align-items: center; }
        .intro-text { grid-area: text; }
        .intro-image { grid-area: image; }
        .intro-text h2 { font-size: 3rem; margin-bottom: 1.5rem; }
        .intro-text p { font-size: 1.15rem; color: var(--text-muted); margin-bottom: 1.5rem; }
        .intro-image img { width: 100%; height: 500px; object-fit: cover; border-radius: 24px; }
        
        .stats-grid { grid-area: stats; display: flex; gap: 3rem; margin-top: 0 !important; }
        .stat-item h3 { font-size: 2.5rem; color: var(--primary); margin-bottom: 0.2rem; }
        .stat-item span { font-weight: 700; color: var(--text-muted); font-size: 0.9rem; }

        /* Types Grid (Premium) */
        .types-full-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2.5rem; }
        .type-card-premium { cursor: pointer; position: relative; overflow: hidden; border-radius: 24px; padding: 0 !important; }
        .type-card-img { position: relative; height: 320px; width: 100%; background: #f8fafc; }
        .type-card-img img { width: 100%; height: 100%; object-fit: contain; transition: transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1); }
        .type-card-premium:hover .type-card-img img { transform: scale(1.05); }
        .type-card-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.7), transparent); display: flex; align-items: flex-end; justify-content: center; padding: 2rem; opacity: 0; transition: opacity 0.3s; }
        .type-card-premium:hover .type-card-overlay { opacity: 1; }
        .view-details { color: white; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em; border-bottom: 2px solid white; padding-bottom: 4px; }
        .type-card-info { padding: 1.5rem; text-align: center; background: white; border-top: 1px solid var(--border); }
        .type-card-info h3 { font-size: 1.25rem; margin: 0; color: var(--text-main); }
        
        .type-card-premium { border: 2px solid white !important; box-shadow: 0 10px 40px rgba(157, 141, 241, 0.3) !important; position: relative; z-index: 1; }
        .type-card-premium::before { content: ''; position: absolute; inset: -4px; background: linear-gradient(135deg, var(--primary), #3b82f6); border-radius: 26px; z-index: -1; opacity: 0.2; }
        
        .intro-image { border: 8px solid white !important; box-shadow: 0 20px 50px rgba(157, 141, 241, 0.4) !important; position: relative; }
        .hero-img-container { 
          border: 4px solid rgba(255,255,255,0.3); 
          border-radius: 30px; 
          padding: 10px; 
          background: rgba(255,255,255,0.05); 
          box-shadow: 0 0 60px rgba(238, 190, 241, 0.2);
        }

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
        .cta-border-card-wrapper { display: flex; justify-content: center; width: 100%; padding: 4rem 1.5rem; }
        .cta-glass-card { 
          padding: 4rem 2rem !important; 
          background: linear-gradient(135deg, var(--primary), var(--secondary)) !important;
          border: none !important; 
          color: white;
          max-width: 800px;
          margin: 0 auto;
          box-shadow: 0 20px 50px rgba(126, 34, 206, 0.25) !important;
          border-radius: 30px;
        }
        .cta-glass-card h2 { color: white !important; font-size: 2.8rem; margin-bottom: 1.5rem; font-weight: 800; }
        .cta-glass-card p { color: rgba(255, 255, 255, 0.95) !important; font-size: 1.2rem; margin-bottom: 2.5rem; line-height: 1.6; }
        .cta-buttons { display: flex; flex-direction: row; justify-content: center; align-items: center; gap: 1rem; flex-wrap: wrap; }
        .cta-buttons .btn { margin: 0 !important; }
        .btn-white-solid { background: white; color: var(--primary); font-weight: 800; border: none; padding: 14px 28px; border-radius: 30px; display: inline-flex; align-items: center; gap: 8px; text-decoration: none; }
        .btn-white-solid:hover { transform: translateY(-3px); box-shadow: 0 10px 20px rgba(0,0,0,0.1); }
        .btn-outline-white { border: 2px solid white; color: white !important; background: transparent; padding: 14px 28px; border-radius: 30px; font-weight: 700; display: inline-flex; align-items: center; text-decoration: none; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
        .btn-white-dark { position: relative; background: white !important; color: var(--text-main) !important; border: none; padding: 14px 28px; border-radius: 30px; font-weight: 800; display: inline-flex; align-items: center; gap: 8px; box-shadow: 0 8px 25px rgba(0,0,0,0.15); text-decoration: none; margin: 0; transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s, color 0.3s; z-index: 1; overflow: hidden; }
        .btn-white-dark::before { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg, var(--primary), var(--secondary)); opacity: 0; z-index: -1; transition: opacity 0.4s ease; border-radius: 30px; }
        .btn-white-dark:hover { transform: translateY(-3px); box-shadow: 0 12px 30px rgba(0,0,0,0.2) !important; color: white !important; }
        .btn-white-dark:hover::before { opacity: 1; }
        .btn-outline-white:hover { background: white !important; color: var(--primary) !important; transform: translateY(-3px); box-shadow: 0 10px 25px rgba(0,0,0,0.15); }

        @media (max-width: 1000px) {
          .intro-epilepsy-layout { grid-template-columns: 1fr; grid-template-areas: "text" "image" "stats"; gap: 2rem; }
          .modal-body-layout { grid-template-columns: 1fr; gap: 2rem; }
          .types-full-grid, .services-grid { grid-template-columns: 1fr; padding: 0 1rem; }
          .type-card-img { height: 220px; }
          .modal-content { 
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            width: 100%;
            border-radius: 32px 32px 0 0;
            max-height: 85vh;
            padding: 1.5rem !important;
            margin: 0;
          }
          .modal-image { min-height: unset; height: auto; }
          .modal-image img { height: auto; max-height: 250px; object-fit: contain; }
          .modal-info { padding: 2rem 1rem; }
          
          .modern-hero { background: #1e1b4b; padding-top: 0; }
          .hero-flex-wrapper { flex-direction: column; text-align: center; justify-content: center; min-height: 85vh; padding-top: 3rem; position: relative; gap: 1.5rem; }
          .hero-text-side { padding-right: 0; margin-bottom: 0; z-index: 10; width: 100%; display: flex; flex-direction: column; align-items: center; }
          .hero-title { font-size: 2.4rem; color: #ffffff !important; font-weight: 900; }
          .hero-description { color: #f8fafc !important; font-size: 1.05rem; font-weight: 500; }
          .hero-cta-group { flex-direction: column; gap: 1rem; width: 100%; align-items: center; }
          .hero-cta-group .btn { width: 100%; max-width: 320px; display: flex; justify-content: center; }
          .hero-image-side { position: absolute; inset: 0; z-index: 0; opacity: 0.4; display: block; overflow: hidden; pointer-events: none; width: 100%; height: 100%; }
          .hero-img-container { padding: 0; border: none; background: transparent; box-shadow: none; width: 100%; height: 100%; display: flex; align-items: flex-start; justify-content: center; padding-top: 10%; }
          .hero-main-img { width: 100%; height: 100%; max-width: 100vw; object-fit: contain; object-position: center top; opacity: 1; }
          .active-badge { display: none !important; }
          
          .full-screen-section { padding: 4rem 0; min-height: auto; }
          .intro-text h2 { font-size: 2rem; }
          .intro-image img { height: 300px; }
          .stats-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; width: 100%; text-align: center; justify-content: center; margin-top: 1.5rem !important; }
          .stat-item h3 { font-size: 1.5rem; }
          .stat-item span { font-size: 0.75rem; line-height: 1.2; display: block; }
        }
      `}</style>
      </div>
    </>
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
