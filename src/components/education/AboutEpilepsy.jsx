import React, { useState, useEffect } from 'react';
import { Brain, Activity, HeartPulse, Stethoscope, ChevronDown, ChevronUp, X, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import '../../styles/about.css'; // Make sure to use existing header wrapper

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

const AboutEpilepsy = () => {
  const [openSection, setOpenSection] = useState('what');
  const [selectedType, setSelectedType] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    {
      id: 'what',
      icon: <Brain />,
      title: 'What is Epilepsy?',
      content: 'Epilepsy is a chronic noncommunicable disease of the brain that affects around 50 million people worldwide. It is characterized by recurrent seizures, which are brief episodes of involuntary movement that may involve a part of the body (partial) or the entire body (generalized), and are sometimes accompanied by loss of consciousness and control of bowel or bladder function.',
    },
    {
      id: 'causes',
      icon: <Activity />,
      title: 'Causes of Epilepsy',
      content: 'Epilepsy is not contagious. Although many underlying disease mechanisms can lead to epilepsy, the cause of the disease is still unknown in about 50% of cases globally. The causes of epilepsy are divided into the following categories: structural, genetic, infectious, metabolic, immune and unknown. Examples include brain damage from prenatal or perinatal causes, congenital abnormalities, stroke, head trauma, and infections such as meningitis or encephalitis.',
    },
    {
      id: 'diagnosis',
      icon: <Stethoscope />,
      title: 'Diagnosis & Treatment',
      content: 'A doctor will review your symptoms and medical history. Tests like an electroencephalogram (EEG) or neurological scans (MRI, CT) are commonly used to diagnose the specific type of epilepsy. \\n\\nThe disease can be successfully treated in up to 70% of cases with anti-seizure medications (AEDs). For those who do not respond to medication, surgery, neurostimulation, or dietary changes (like the ketogenic diet) might be considered.',
    }
  ];

  return (
    <div className="about-epilepsy-page container">
      <TypeDetailModal type={selectedType} onClose={() => setSelectedType(null)} />

      {/* ── Standardized Header ─────────────────────────────────────────────────── */}
      <div className="about-header-wrapper animate-fade-in">
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 10 }}>
            <span className="about-subtitle">Knowledge is Power</span>
            <h1 className="about-title">Understanding Epilepsy</h1>
            <p className="about-desc">Empathetic, scientifically accurate information based on the World Health Organization (WHO) and the CDC.</p>
        </div>
      </div>

      <div className="educational-content-area custom-margin-top">
        
        {/* FAQs using vanilla CSS */}
        <div className="faq-container">
          {sections.map((section) => (
            <div key={section.id} className="faq-card glass-card">
              <button
                className="faq-button"
                onClick={() => setOpenSection(openSection === section.id ? null : section.id)}
              >
                <div className="faq-title-wrap">
                  <div className={`faq-icon ${openSection === section.id ? 'active' : ''}`}>
                    {section.icon}
                  </div>
                  <h3 className={`faq-title ${openSection === section.id ? 'active' : ''}`}>
                    {section.title}
                  </h3>
                </div>
                {openSection === section.id ? <ChevronUp size={24} className="icon-purple" /> : <ChevronDown size={24} className="icon-muted" />}
              </button>
              
              <AnimatePresence>
                {openSection === section.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="faq-content">
                      <div className="faq-divider"></div>
                      <div className="faq-text">
                        {section.content}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      {/* ── Types of Epilepsy Grid ───────────────────────────────── */}
      <section className="section-spacing bg-unified epilepsy-types-section">
        <div className="container epilepsy-types-container">
          <div className="section-header epilepsy-section-header">
            <h2>Clinical Classifications</h2>
            <p>Select a type to view detailed clinical observation patterns and safety notes.</p>
          </div>
          <div className="types-full-grid">
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
      
      <style>{`
        .custom-margin-top {
          margin-top: -30px; /* Pull it up into the gradient header */
          position: relative;
          z-index: 10;
        }

        .epilepsy-types-section {
          margin-top: 4rem;
          padding: 4rem 0;
          border-radius: 24px;
        }

        .epilepsy-types-container {
          padding: 0 2rem;
        }

        .epilepsy-section-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .epilepsy-section-header h2 {
          font-size: 2.5rem;
          font-weight: 800;
          margin-bottom: 1rem;
        }

        .epilepsy-section-header p {
          color: var(--text-muted);
          font-size: 1.1rem;
        }
        
        .faq-container {
          max-width: 850px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .faq-card {
          overflow: hidden;
          padding: 0;
        }

        .faq-button {
          width: 100%;
          padding: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: none;
          border: none;
          cursor: pointer;
          text-align: left;
        }

        .faq-title-wrap {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .faq-icon {
          padding: 0.75rem;
          border-radius: 50%;
          background: rgba(0,0,0,0.05);
          color: var(--text-muted);
          transition: all 0.3s;
        }
        .faq-icon.active {
          background: rgba(126, 34, 206, 0.1);
          color: var(--primary);
        }

        .faq-title {
          font-size: 1.2rem;
          font-weight: 700;
          color: var(--text-main);
          margin: 0;
          transition: color 0.3s;
        }
        .faq-title.active {
          color: var(--primary);
        }

        .faq-content {
          padding: 0 1.5rem 1.5rem 1.5rem;
        }

        .faq-divider {
          height: 1px;
          background: var(--border);
          margin-bottom: 1rem;
        }

        .faq-text {
          color: var(--text-secondary);
          line-height: 1.6;
          font-size: 1.05rem;
          white-space: pre-wrap;
        }
        
        .icon-purple { color: var(--primary); }
        .icon-muted { color: var(--text-muted); }

        .types-full-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }

        .type-card-premium {
          cursor: pointer;
          position: relative;
          overflow: hidden;
          border-radius: 24px;
          padding: 0 !important;
          border: 2px solid rgba(255, 255, 255, 0.8) !important;
          box-shadow: 0 10px 35px rgba(157, 141, 241, 0.2) !important;
        }

        .type-card-img {
          position: relative;
          height: 260px;
          width: 100%;
          background: #f8fafc;
        }

        .type-card-img img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          transition: transform 0.4s ease;
        }

        .type-card-premium:hover .type-card-img img {
          transform: scale(1.05);
        }

        .type-card-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          padding: 1.25rem;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.65), transparent);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .type-card-premium:hover .type-card-overlay {
          opacity: 1;
        }

        .view-details {
          color: white;
          font-size: 0.8rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .type-card-info {
          padding: 1.25rem;
          text-align: center;
          border-top: 1px solid var(--border);
          background: white;
        }

        .type-card-info h3 {
          margin: 0;
          font-size: 1.15rem;
        }

        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.55);
          backdrop-filter: blur(6px);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
        }

        .modal-content {
          width: min(1100px, 95vw);
          max-height: 90vh;
          overflow-y: auto;
          background: white;
          border-radius: 24px;
          position: relative;
        }

        .modal-body-layout {
          display: grid;
          grid-template-columns: 1fr 1.15fr;
          min-height: 520px;
        }

        .modal-image {
          background: #f8fafc;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
        }

        .modal-image img {
          width: 100%;
          max-height: 420px;
          object-fit: contain;
        }

        .modal-info {
          padding: 2rem;
        }

        .modal-badge {
          display: inline-block;
          background: rgba(126, 34, 206, 0.1);
          color: var(--primary);
          border-radius: 999px;
          font-size: 0.75rem;
          font-weight: 800;
          padding: 0.45rem 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }

        .modal-desc {
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .modal-details-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
        }

        .symptoms-box, .medical-note-box {
          background: rgba(157, 141, 241, 0.06);
          border: 1px solid rgba(157, 141, 241, 0.12);
          border-radius: 14px;
          padding: 1rem;
        }

        .symptoms-box ul {
          padding-left: 1.25rem;
          margin: 0.5rem 0 0;
        }

        .medical-note-box p {
          margin: 0.5rem 0 0;
          color: var(--text-main);
        }

        .note-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .close-btn {
          position: absolute;
          top: 1rem;
          right: 1rem;
          border: 1px solid var(--border);
          border-radius: 999px;
          background: white;
          width: 40px;
          height: 40px;
          display: grid;
          place-items: center;
          cursor: pointer;
          color: var(--text-muted);
        }

        .close-btn:hover {
          color: #ef4444;
        }

        @media (max-width: 1024px) {
          .types-full-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .types-full-grid {
            grid-template-columns: 1fr;
          }

          .modal-body-layout {
            grid-template-columns: 1fr;
          }

          .epilepsy-types-container {
            padding: 0 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default AboutEpilepsy;
