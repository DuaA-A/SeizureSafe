import React, { useEffect } from 'react';
import { X, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import '../../styles/about.css'; // Global header css

const mythsList = [
  { myth: "You should force something into the mouth of someone having a seizure.", fact: "Never put anything in a person's mouth during a seizure. It can cause chipped teeth, punctured gums, or even a broken jaw. The best thing is to roll them on one side." },
  { myth: "You should hold down a person having a seizure.", fact: "Never hold a person down to try and stop their movements. This can result in bone fractures or muscle tearing. Just clear the area of hard objects." },
  { myth: "Epilepsy is contagious.", fact: "You can't catch epilepsy from another person. It is a non-communicable brain disorder." },
  { myth: "Only kids get epilepsy.", fact: "Epilepsy can affect people of all ages. In fact, many people develop epilepsy in their senior years." },
  { myth: "People with epilepsy can't work and shouldn't hold jobs.", fact: "Most people with epilepsy can and do work. They are successful in all types of professions." },
  { myth: "People with epilepsy shouldn't play sports.", fact: "With proper management and certain precautions, many people with epilepsy are very active in sports." },
  { myth: "During a seizure, a person can swallow their tongue.", fact: "It is physically impossible to swallow your tongue. However, a person's airway can become blocked, which is why rolling them on their side is important." },
  { myth: "Epilepsy is a mental illness.", fact: "Epilepsy is a neurological disorder, not a psychological or psychiatric condition." },
  { myth: "A seizure is always a medical emergency.", fact: "Actually, most seizures last a short time and stop on their own. You only need to call 911 if it lasts longer than 5 minutes, or under specific criteria." },
  { myth: "If you have a seizure, you have epilepsy.", fact: "Not necessarily. One seizure does not mean you have epilepsy. High fever, binge drinking, or severe sleep deprivation can cause a single seizure." },
  { myth: "Epilepsy medications cure the disease.", fact: "Medications treat the symptoms (seizures) but do not cure the underlying condition. They help prevent seizures from happening." },
  { myth: "You can tell when a seizure is about to happen.", fact: "While some people have an 'aura' or warning sensation, many seizures happen completely unexpectedly without any warning." },
  { myth: "Flashing lights are the main trigger for seizures.", fact: "Only about 3% of people with epilepsy have photosensitive epilepsy. Common triggers are actually missed medications, lack of sleep, and stress." },
  { myth: "People with epilepsy cannot have children.", fact: "Women and men with epilepsy can have healthy children. However, pregnancies may require special planning and monitoring to manage medication safety." },
  { myth: "Epilepsy means lifelong frequent seizures.", fact: "Up to 70% of people with epilepsy can become seizure-free with the right medication regimen." }
];

const MythsFacts = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="myths-facts-page container">

      {/* ── Standardized Header ─────────────────────────────────────────────────── */}
      <div className="about-header-wrapper animate-fade-in">
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 10 }}>
            <span className="about-subtitle">Break the Stigma</span>
            <h1 className="about-title">Myths vs. Facts</h1>
            <p className="about-desc">There are many dangerous misconceptions about epilepsy. Learn the truth to help keep people safe and reduce stigma, based on data from the Epilepsy Foundation.</p>
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
              {/* Left Side: Myth */}
              <div className="myth-box">
                <div className="box-icon-wrap mt-1 text-red">
                  <X size={28} strokeWidth={3} />
                </div>
                <div className="box-content">
                  <span className="label text-red">Myth</span>
                  <h3 className="myth-text">{item.myth}</h3>
                </div>
              </div>

              {/* Right Side: Fact */}
              <div className="fact-box">
                <div className="box-icon-wrap mt-1 text-green">
                  <Check size={28} strokeWidth={3} />
                </div>
                <div className="box-content">
                  <span className="label text-green">Fact</span>
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

        /* L/R Row Layout inside the card */
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
          border-left: 6px solid #ef4444;
          padding: 2rem;
          display: flex;
          gap: 1rem;
        }
        
        .fact-box {
          background-color: rgba(240, 253, 244, 0.6);
          border-left: 6px solid #22c55e;
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
        }

        .myth-text {
          font-size: 1.25rem;
          font-weight: 800;
          color: var(--text-main);
          line-height: 1.4;
          margin: 0;
        }

        .fact-text {
          font-size: 1.1rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin: 0;
        }
      `}</style>
    </div>
  );
};

export default MythsFacts;
