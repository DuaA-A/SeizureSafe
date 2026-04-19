import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { X, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import '../../styles/about.css'; // Global header css

const MythsFacts = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const mythsList = t('mythsFacts.items', { returnObjects: true });

  return (
    <div className="myths-facts-page container" dir={isRTL ? 'rtl' : 'ltr'}>

      {/* ── Standardized Header ─────────────────────────────────────────────────── */}
      <div className="about-header-wrapper animate-fade-in">
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 10 }}>
            <span className="about-subtitle">{t('mythsFacts.subtitle')}</span>
            <h1 className="about-title">{t('mythsFacts.title')}</h1>
            <p className="about-desc">{t('mythsFacts.desc')}</p>
        </div>
      </div>

      <div className="myths-content-area custom-margin-top">
        <div className="myths-grid">
          {mythsList.map((item, index) => (
            <motion.div 
              key={index} 
              className="glass-card myth-fact-row"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4 }}
            >
              {/* Myth Section */}
              <div className="myth-box">
                <div className="box-icon-wrap mt-1 text-red">
                  <X size={28} strokeWidth={3} />
                </div>
                <div className="box-content">
                  <span className="label text-red">{t('mythsFacts.mythLabel')}</span>
                  <h3 className="myth-text">{item.myth}</h3>
                </div>
              </div>

              {/* Fact Section */}
              <div className="fact-box">
                <div className="box-icon-wrap mt-1 text-green">
                  <Check size={28} strokeWidth={3} />
                </div>
                <div className="box-content">
                  <span className="label text-green">{t('mythsFacts.factLabel')}</span>
                  <p className="fact-text">{item.fact}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .custom-margin-top {
          margin-top: -30px; 
          position: relative;
          z-index: 10;
        }

        .myths-grid {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          max-width: 1000px;
          margin: 0 auto 4rem auto;
        }

        .myth-fact-row {
          display: grid;
          grid-template-columns: 1fr;
          padding: 0;
          overflow: hidden;
        }
        @media (min-width: 768px) {
          .myth-fact-row {
            grid-template-columns: 1fr 1fr;
          }
        }

        .myth-box {
          background-color: rgba(254, 242, 242, 0.6);
          border-inline-start: 6px solid #ef4444;
          padding: 2rem;
          display: flex;
          gap: 1rem;
        }
        
        .fact-box {
          background-color: rgba(240, 253, 244, 0.6);
          border-inline-start: 6px solid #22c55e;
          padding: 2rem;
          display: flex;
          gap: 1rem;
        }

        .box-icon-wrap {
          flex-shrink: 0;
        }
        .mt-1 { margin-top: 0.25rem; }
        
        .text-red { color: #dc2626; }
        .text-green { color: #16a34a; }

        .label {
          display: block;
          font-size: 0.8rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.5rem;
          text-align: inherit;
        }

        .myth-text {
          font-size: 1.25rem;
          font-weight: 800;
          color: var(--text-main);
          line-height: 1.4;
          margin: 0;
          text-align: inherit;
        }

        .fact-text {
          font-size: 1.1rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin: 0;
          text-align: inherit;
        }
      `}</style>
    </div>
  );
};

export default MythsFacts;
