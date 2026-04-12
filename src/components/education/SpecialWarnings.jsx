import React, { useEffect } from 'react';
import { AlertTriangle, Baby, UserCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import '../../styles/about.css'; // Inheriting global header classes

const SpecialWarnings = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="special-warnings-page container">

      {/* ── Standardized Header ─────────────────────────────────────────────────── */}
      <div className="about-header-wrapper animate-fade-in">
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 10 }}>
            <span className="about-subtitle">Vulnerable Populations</span>
            <h1 className="about-title">Special Population Warnings</h1>
            <p className="about-desc">Pharmacokinetics can vary significantly across different age groups. Extra clinical vigilance is required for children and the elderly when administering antiepileptic therapy.</p>
        </div>
      </div>

      <div className="warnings-content-area custom-margin-top">
        
        {/* Pediatric Section */}
        <section className="warning-section">
          <div className="section-title-wrap">
            <div className="title-icon pediatric-icon"><Baby size={40} /></div>
            <h2>Pediatric Patients</h2>
            <div className="title-divider pediatric-divider"></div>
          </div>
          
          <div className="warning-cards-grid">
            <motion.div 
              className="glass-card warning-card border-pediatric"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            >
              <h3>Dosage Sensitivity</h3>
              <p>Children metabolize drugs differently than adults. They often require higher doses per kilogram of body weight, but they are also more susceptible to cognitive side effects.</p>
            </motion.div>
            
            <motion.div 
              className="glass-card warning-card border-pediatric"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            >
              <h3>Behavioral Monitoring</h3>
              <p>Certain drugs (like Levetiracetam or Phenobarbital) can cause paradoxical hyperactivity, aggression, or learning difficulties in children. Parents and teachers must monitor school performance closely.</p>
            </motion.div>

            <motion.div 
              className="glass-card warning-card border-pediatric"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            >
              <h3>Growth Considerations</h3>
              <p>Dosages need frequent readjustment as the child grows and gains weight to maintain therapeutic blood levels.</p>
            </motion.div>
          </div>
        </section>

        {/* Elderly Section */}
        <section className="warning-section" style={{ marginTop: '5rem' }}>
          <div className="section-title-wrap">
            <div className="title-icon elderly-icon"><UserCircle size={40} /></div>
            <h2>Elderly Patients</h2>
            <div className="title-divider elderly-divider"></div>
          </div>
          
          <div className="warning-cards-grid">
            <motion.div 
              className="glass-card warning-card border-elderly"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            >
              <h3>Slower Metabolism</h3>
              <p>Decreased renal and hepatic clearance means drugs stay in the system longer. Elderly patients typically require lower starting doses (“start low, go slow”).</p>
            </motion.div>
            
            <motion.div 
              className="glass-card warning-card border-elderly"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            >
              <h3>High Interaction Risk</h3>
              <p>Older adults often take multiple medications for other conditions (hypertension, diabetes), drastically increasing the risk of adverse drug-drug interactions with AEDs.</p>
            </motion.div>

            <motion.div 
              className="glass-card warning-card border-elderly"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            >
              <h3>Fall & Bone Risks</h3>
              <p>Enzyme-inducing AEDs (like Phenytoin or Carbamazepine) can reduce bone density. Dizziness and sedation from meds also greatly increase the risk of dangerous falls.</p>
            </motion.div>
          </div>
        </section>

      </div>

      <style>{`
        .custom-margin-top {
          margin-top: 0px; 
          position: relative;
          z-index: 10;
          padding-bottom: 5rem;
        }

        .warning-section {
          max-width: 1200px;
          margin: 0 auto;
        }

        .section-title-wrap {
          text-align: center;
          margin-bottom: 3rem;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .title-icon {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1rem;
        }
        .pediatric-icon {
          background-color: #dbeafe;
          color: #2563eb;
        }
        .elderly-icon {
          background-color: #fef3c7;
          color: #d97706;
        }

        .section-title-wrap h2 {
          font-size: 2.2rem;
          font-weight: 800;
          color: var(--text-main);
          margin: 0 0 1rem 0;
        }

        .title-divider {
          height: 4px;
          width: 60px;
          border-radius: 2px;
        }
        .pediatric-divider { background-color: #3b82f6; }
        .elderly-divider { background-color: #f59e0b; }

        .warning-cards-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
        }
        @media (min-width: 768px) {
          .warning-cards-grid { grid-template-columns: repeat(3, 1fr); }
        }

        .warning-card {
          padding: 2rem;
          display: flex;
          flex-direction: column;
        }
        .border-pediatric { border-top: 5px solid #3b82f6; }
        .border-elderly { border-top: 5px solid #f59e0b; }

        .warning-card h3 {
          font-size: 1.25rem;
          font-weight: 800;
          color: var(--text-main);
          margin-bottom: 1rem;
        }
        
        .border-pediatric h3 { color: #1e40af; }
        .border-elderly h3 { color: #92400e; }

        .warning-card p {
          color: var(--text-secondary);
          line-height: 1.6;
          font-size: 1.05rem;
          margin: 0;
        }
      `}</style>
    </div>
  );
};

export default SpecialWarnings;
