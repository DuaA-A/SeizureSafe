import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Brain, Activity, HeartPulse, Stethoscope, ChevronDown, ChevronUp, X, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import '../../styles/about.css'; // Make sure to use existing header wrapper

const TypeDetailModal = ({ type, onClose }) => {
  const { t, i18n } = useTranslation();
  if (!type) return null;
  const isRTL = i18n.language === 'ar';

  return (
    <div className="modal-overlay" onClick={onClose} dir={isRTL ? 'rtl' : 'ltr'}>
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
            <div className="modal-badge mb-3">{t('aboutEpilepsy.modalBadge')}</div>
            <h2>{type.name}</h2>
            <div className="modal-desc-wrapper">
              <p className="modal-desc">{type.description}</p>
            </div>
            <div className="modal-details-grid mt-6">
              <div className="symptoms-box">
                <h4><Activity size={18} className="icon-purple" /> {t('aboutEpilepsy.indicators')}</h4>
                <ul>
                  {type.symptoms.map((s, i) => <li key={i}>{s}</li>)}
                </ul>
              </div>
              <div className="medical-note-box">
                <div className="note-header">
                  <Info size={18} className="icon-purple" />
                  <strong>{t('aboutEpilepsy.pharmacistNote')}</strong>
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

const AboutEpilepsy = () => {
  const [openSection, setOpenSection] = useState('what');
  const [selectedType, setSelectedType] = useState(null);
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const EPILEPSY_DETAILS = [
    { id: 'gtc', ...t('aboutEpilepsy.details.gtc', { returnObjects: true }), image: '/tonic-clonic.jpg' },
    { id: 'focal-aware', ...t('aboutEpilepsy.details.focalAware', { returnObjects: true }), image: '/focal Aware.jpg' },
    { id: 'absence', ...t('aboutEpilepsy.details.absence', { returnObjects: true }), image: '/absence.jpg' },
    { id: 'focal-impaired', ...t('aboutEpilepsy.details.focalImpaired', { returnObjects: true }), image: '/focal impaired.jpg' },
    { id: 'atonic', ...t('aboutEpilepsy.details.atonic', { returnObjects: true }), image: '/atonic.jpg' },
    { id: 'myoclonic', ...t('aboutEpilepsy.details.myoclonic', { returnObjects: true }), image: '/myoclonic.jpg' }
  ];

  const sections = [
    { id: 'what', icon: <Brain />, ...t('aboutEpilepsy.sections.what', { returnObjects: true }) },
    { id: 'causes', icon: <Activity />, ...t('aboutEpilepsy.sections.causes', { returnObjects: true }) },
    { id: 'diagnosis', icon: <Stethoscope />, ...t('aboutEpilepsy.sections.diagnosis', { returnObjects: true }) }
  ];

  return (
    <div className="about-epilepsy-page container" dir={isRTL ? 'rtl' : 'ltr'}>
      <TypeDetailModal type={selectedType} onClose={() => setSelectedType(null)} />

      {/* ── Standardized Header ─────────────────────────────────────────────────── */}
      <div className="about-header-wrapper animate-fade-in">
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 10 }}>
            <span className="about-subtitle">{t('aboutEpilepsy.subtitle')}</span>
            <h1 className="about-title">{t('aboutEpilepsy.title')}</h1>
            <p className="about-desc">{t('aboutEpilepsy.desc')}</p>
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
                style={{ textAlign: isRTL ? 'right' : 'left' }}
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
            <h2>{t('aboutEpilepsy.classTitle')}</h2>
            <p>{t('aboutEpilepsy.classSubtitle')}</p>
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
                    <span className="view-details">{t('aboutEpilepsy.clickDetails')}</span>
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
          padding-inline-start: 1.25rem;
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
          inset-inline-end: 1rem;
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
