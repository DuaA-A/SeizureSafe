import React, { useEffect } from 'react';
import { ShieldAlert, Phone, Clock, Hand as HandStop, CheckCircle, XCircle } from 'lucide-react';
import '../../styles/about.css'; // Inheriting global header classes

const FirstAid = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="first-aid-page container">

      {/* ── Standardized Header ─────────────────────────────────────────────────── */}
      <div className="about-header-wrapper animate-fade-in">
        <div className="header-content-inner" style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 10 }}>
            <span className="about-subtitle">ACT FAST</span>
            <h1 className="about-title">Emergency First Aid</h1>
            <p className="about-desc">If someone is having a seizure, stay calm. Follow these standardized steps based on guidelines from the CDC and the Epilepsy Foundation.</p>
        </div>
      </div>

      <div className="aid-content-area custom-margin-top">
        
        {/* Core Steps */}
        <div className="core-steps-grid">
          <div className="glass-card step-card">
            <Clock size={36} className="icon-primary" />
            <h3>1. Time It</h3>
            <p>Note the exact time the seizure starts. If it lasts longer than 5 minutes, call an ambulance immediately.</p>
          </div>
          <div className="glass-card step-card">
            <ShieldAlert size={36} className="icon-primary" />
            <h3>2. Keep Them Safe</h3>
            <p>Move hard or sharp objects out of the way. Place something soft, like a folded jacket, under their head.</p>
          </div>
          <div className="glass-card step-card">
            <HandStop size={36} className="icon-primary" />
            <h3>3. Roll on Side</h3>
            <p>Once the jerking stops, gently roll the person onto their side. This helps keep their airway clear.</p>
          </div>
        </div>

        {/* Horizontal Split: DO on left, DON'T on right */}
        <div className="split-action-layout">
          <div className="glass-card do-card">
            <h3 className="do-title">
              <CheckCircle /> DO
            </h3>
            <ul className="action-list do-list">
              <li>Stay with the person until the seizure ends and they are fully awake.</li>
              <li>Loosen anything around their neck (like a tie or collar).</li>
              <li>Reassure them gently once they wake up; they may be confused.</li>
              <li>Check if they have a medical ID bracelet.</li>
            </ul>
          </div>

          <div className="glass-card dont-card">
            <h3 className="dont-title">
              <XCircle /> DON'T
            </h3>
            <ul className="action-list dont-list">
              <li>Do <strong>not</strong> hold the person down or try to stop their movements.</li>
              <li>Do <strong>not</strong> put anything in their mouth. It can injure their teeth or jaw.</li>
              <li>Do <strong>not</strong> give them water, food, or pills until fully alert.</li>
              <li>Do <strong>not</strong> perform CPR unless they stop breathing after the seizure stops.</li>
            </ul>
          </div>
        </div>

        {/* 911 section */}
        <div className="glass-card emergency-box">
          <div className="emergency-header">
            <div className="emergency-icon-wrap">
              <Phone size={24} />
            </div>
            <h2>When to call an ambulance (911)</h2>
          </div>
          <ul className="emergency-criteria-list">
            <li>The seizure lasts longer than 5 minutes.</li>
            <li>The person has difficulty breathing after the seizure.</li>
            <li>They have another seizure immediately after the first.</li>
            <li>They get injured during the seizure.</li>
            <li>The person is pregnant, sick, or has diabetes.</li>
            <li>It is the person's first ever seizure.</li>
          </ul>
        </div>
      </div>
      
      <style>{`
        .custom-margin-top {
          margin-top: -30px; /* Pull it up into the gradient header */
          position: relative;
          z-index: 10;
        }

        .core-steps-grid {
          display: grid;
          grid-template-columns: repeat(1, 1fr);
          gap: 2rem;
          margin-bottom: 4rem;
          max-width: 1000px;
          margin-left: auto;
          margin-right: auto;
        }
        @media (min-width: 768px) {
          .core-steps-grid { grid-template-columns: repeat(3, 1fr); }
        }

        .step-card {
          padding: 2.5rem 1.5rem;
          text-align: center;
          border-top: 4px solid var(--primary);
        }
        .step-card h3 {
          font-size: 1.3rem;
          font-weight: 800;
          margin: 1rem 0 0.5rem;
          color: var(--text-main);
        }
        .step-card p {
          color: var(--text-secondary);
          line-height: 1.6;
        }
        .icon-primary {
          color: var(--primary);
          margin: 0 auto;
        }

        /* L/R Split Layout */
        .split-action-layout {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
          margin-bottom: 4rem;
          max-width: 1200px;
          margin-left: auto;
          margin-right: auto;
        }
        @media (min-width: 850px) {
          .split-action-layout { grid-template-columns: 1fr 1fr; }
        }

        .do-card {
          background-color: rgba(220, 252, 231, 0.4);
          border: 1px solid rgba(34, 197, 94, 0.2);
          padding: 2.5rem;
        }
        .do-title {
          font-size: 1.8rem;
          font-weight: 800;
          color: #16a34a;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
        }
        
        .dont-card {
          background-color: rgba(254, 226, 226, 0.4);
          border: 1px solid rgba(239, 68, 68, 0.2);
          padding: 2.5rem;
        }
        .dont-title {
          font-size: 1.8rem;
          font-weight: 800;
          color: #dc2626;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
        }

        .action-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .action-list li {
          position: relative;
          padding-left: 1.5rem;
          font-size: 1.1rem;
          line-height: 1.6;
          color: var(--text-secondary);
        }
        .action-list li::before {
          content: '•';
          position: absolute;
          left: 0;
          font-weight: 900;
          font-size: 1.5rem;
          line-height: 1;
        }
        .do-list li::before { color: #22c55e; }
        .dont-list li::before { color: #ef4444; }

        .emergency-box {
          border-left: 8px solid #ef4444;
          background-color: rgba(254, 226, 226, 0.6);
          padding: 2.5rem;
          max-width: 900px;
          margin: 0 auto 4rem auto;
        }
        .emergency-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }
        .emergency-icon-wrap {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background-color: #fee2e2;
          color: #ef4444;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .emergency-header h2 {
          font-size: 1.8rem;
          font-weight: 800;
          color: #b91c1c;
          margin: 0;
        }

        .emergency-criteria-list {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
          margin-left: 4.5rem;
          font-size: 1.15rem;
          color: #7f1d1d;
        }
        @media (min-width: 600px) {
          .emergency-criteria-list { grid-template-columns: 1fr 1fr; }
        }
      `}</style>
    </div>
  );
};

export default FirstAid;
