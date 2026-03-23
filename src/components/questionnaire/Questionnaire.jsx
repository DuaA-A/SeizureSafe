import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../firebase/config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle2, 
  Activity, 
  Eye, 
  Zap, 
  Move, 
  ArrowDownCircle, 
  Hand,
  Info
} from 'lucide-react';
import { QUESTIONS, analyzeResult } from '../../utils/epilepsyLogic';

const Questionnaire = ({ onOpenAuth }) => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalSteps = 4; // Profile, Symptoms, Medical, Lifestyle

  const handleNext = () => setStep(prev => Math.min(prev + 1, totalSteps));
  const handleBack = () => setStep(prev => Math.max(prev - 1, 0));

  const handleAnswer = (id, value) => {
    setAnswers(prev => ({ ...prev, [id]: value }));
  };

  const calculateResult = async () => {
    setIsSubmitting(true);
    const analysis = analyzeResult(answers);
    setResult(analysis);
    
    if (currentUser) {
      try {
        await addDoc(collection(db, 'questionnaire_results'), {
          userId: currentUser.uid,
          answers,
          result: analysis,
          timestamp: serverTimestamp()
        });
      } catch (error) {
        console.error('Error saving result:', error);
      }
    }
    setIsSubmitting(false);
    setStep(totalSteps + 1); // Results step
  };

  const renderStep = () => {
    switch (step) {
      case 0: // Profile
        return (
          <div className="step-content animate-fade-in">
            <h2>Patient Profile</h2>
            <p className="step-desc">Enter basic information to help us understand your context.</p>
            <div className="form-grid">
              <div className="input-group">
                <label>Age</label>
                <input 
                  type="number" 
                  className="input-field" 
                  placeholder="e.g. 25" 
                  value={answers.age || ''}
                  onChange={(e) => handleAnswer('age', e.target.value)}
                />
              </div>
              <div className="input-group">
                <label>Gender</label>
                <select 
                  className="input-field"
                  value={answers.gender || ''}
                  onChange={(e) => handleAnswer('gender', e.target.value)}
                >
                  <option value="">Select...</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          </div>
        );
      case 1: // Symptoms
        return (
          <div className="step-content animate-fade-in">
            <h2>Seizure Symptoms</h2>
            <p className="step-desc">Select common signs you experience during a seizure.</p>
            <div className="checkbox-grid">
              {QUESTIONS.filter(q => q.section === 'Symptoms').map(q => {
                const Icon = { Activity, Eye, Zap, Move, ArrowDownCircle, Hand }[q.icon] || Activity;
                return (
                  <button 
                    key={q.id}
                    className={`choice-card glass-card ${answers[q.id] ? 'active' : ''}`}
                    onClick={() => handleAnswer(q.id, !answers[q.id])}
                  >
                    <Icon className="choice-icon" size={24} />
                    <span>{q.text}</span>
                  </button>
                );
              })}
            </div>
          </div>
        );
      case 2: // Medical History
        return (
          <div className="step-content animate-fade-in">
            <h2>Medical History</h2>
            <p className="step-desc">Other conditions and history.</p>
            <div className="input-group">
              <label>Have you been officially diagnosed with epilepsy?</label>
              <div className="btn-group">
                <button className={`btn ${answers.diagnosed === 'yes' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => handleAnswer('diagnosed', 'yes')}>Yes</button>
                <button className={`btn ${answers.diagnosed === 'no' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => handleAnswer('diagnosed', 'no')}>No</button>
              </div>
            </div>
            <div className="input-group">
              <label>Any family history of epilepsy?</label>
              <div className="btn-group">
                <button className={`btn ${answers.familyHistory === 'yes' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => handleAnswer('familyHistory', 'yes')}>Yes</button>
                <button className={`btn ${answers.familyHistory === 'no' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => handleAnswer('familyHistory', 'no')}>No</button>
              </div>
            </div>
          </div>
        );
      case 3: // Lifestyle
        return (
          <div className="step-content animate-fade-in">
            <h2>Lifestyle & Triggers</h2>
            <p className="step-desc">Identify potential factors that may trigger seizures.</p>
            <div className="checkbox-grid">
              {['Sleep Deprivation', 'Stress', 'Flashing Lights', 'Caffeine', 'Alcohol'].map(t => (
                <button 
                  key={t}
                  className={`choice-card glass-card ${answers[`trigger_${t}`] ? 'active' : ''}`}
                  onClick={() => handleAnswer(`trigger_${t}`, !answers[`trigger_${t}`])}
                >
                  <Info className="choice-icon" size={24} />
                  <span>{t}</span>
                </button>
              ))}
            </div>
          </div>
        );
      case 4: // Summary Before Result
        return (
          <div className="step-content animate-fade-in text-center">
            <CheckCircle2 size={64} className="success-icon" />
            <h2>Ready for Analysis</h2>
            <p>We have collected enough information to provide a general assessment.</p>
            <div className="summary-box glass-card">
              <p>Total items reported: {Object.keys(answers).length}</p>
              {!currentUser && <p className="warning-text">Log in to save these results to your profile.</p>}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const renderResult = () => (
    <div className="result-container animate-fade-in">
      <div className="result-header glass-card">
        <div className="badge badge-low">Analysis Complete</div>
        <h1>Possible Type: {result.name}</h1>
        <p className="category">{result.category}</p>
      </div>

      <div className="result-sections">
        <div className="result-card glass-card">
          <h3>Common Symptoms</h3>
          <ul>{result.symptoms.map((s, i) => <li key={i}>{s}</li>)}</ul>
        </div>
        <div className="result-card glass-card">
          <h3>First-line Medications</h3>
          <p>Commonly used educational guidelines suggest:</p>
          <div className="drug-tags">
            {result.firstLineDrugs.map((d, i) => <span key={i} className="drug-tag">{d}</span>)}
          </div>
        </div>
        <div className="result-card glass-card full-width">
          <h3>Lifestyle & Safety Tips</h3>
          <p>{result.lifestyle}</p>
        </div>
      </div>

      <div className="result-actions">
        <button className="btn btn-secondary" onClick={() => { setStep(0); setAnswers({}); setResult(null); }}>Retake Questionnaire</button>
        {!currentUser && <button className="btn btn-primary" onClick={onOpenAuth}>Save Result to Profile</button>}
      </div>
    </div>
  );

  return (
    <div className="questionnaire-page">
      {step <= totalSteps ? (
        <div className="form-container">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${(step / totalSteps) * 100}%` }}></div>
          </div>
          
          <div className="form-card glass-card">
            {renderStep()}
            
            <div className="form-nav">
              <button className="btn btn-secondary" onClick={handleBack} disabled={step === 0}>
                <ChevronLeft size={18} /> Back
              </button>
              {step < totalSteps ? (
                <button className="btn btn-primary" onClick={handleNext}>
                  Next <ChevronRight size={18} />
                </button>
              ) : (
                <button className="btn btn-primary" onClick={calculateResult} disabled={isSubmitting}>
                  {isSubmitting ? 'Analyzing...' : 'View Results'}
                </button>
              )}
            </div>
          </div>
        </div>
      ) : renderResult()}

      <style>{`
        .questionnaire-page {
          max-width: 800px;
          margin: 0 auto;
        }
        .progress-bar {
          height: 6px;
          background: var(--glass);
          border-radius: 3px;
          margin-bottom: 2rem;
          overflow: hidden;
        }
        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--primary), var(--secondary));
          transition: width 0.3s ease;
        }
        .form-card {
          padding: 3rem;
        }
        .form-nav {
          display: flex;
          justify-content: space-between;
          margin-top: 3rem;
          padding-top: 2rem;
          border-top: 1px solid var(--surface-border);
        }
        .step-content h2 {
          margin-bottom: 1rem;
          font-size: 2rem;
        }
        .step-desc {
          color: var(--text-secondary);
          margin-bottom: 2rem;
        }
        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }
        .input-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
        }
        .checkbox-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }
        .choice-card {
          padding: 1.5rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          cursor: pointer;
          text-align: left;
          background: var(--glass);
          border: 1px solid var(--glass-border);
          color: white;
        }
        .choice-card.active {
          border-color: var(--primary);
          background: rgba(99, 102, 241, 0.1);
        }
        .choice-icon {
          color: var(--primary);
        }
        .btn-group {
          display: flex;
          gap: 1rem;
        }
        .success-icon {
          color: var(--success);
          margin-bottom: 1.5rem;
        }
        .summary-box {
          margin-top: 2rem;
          padding: 2rem;
          background: rgba(0, 0, 0, 0.2);
        }
        .result-container {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        .result-header {
          padding: 3rem;
          text-align: center;
        }
        .result-header h1 { font-size: 2.5rem; margin-top: 1rem; }
        .category { color: var(--text-secondary); font-size: 1.1rem; }
        .result-sections {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }
        .result-card { padding: 2rem; }
        .full-width { grid-column: span 2; }
        .result-card h3 { margin-bottom: 1rem; color: var(--primary); }
        .result-card ul { padding-left: 1.5rem; color: var(--text-secondary); }
        .drug-tags { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 1rem; }
        .drug-tag {
          padding: 0.5rem 1rem;
          background: rgba(99, 102, 241, 0.1);
          border: 1px solid var(--primary);
          border-radius: 8px;
          font-weight: 600;
        }
        .result-actions { display: flex; gap: 1rem; justify-content: center; }
        .text-center { text-align: center; }
        .warning-text { color: var(--warning); margin-top: 0.5rem; font-size: 0.9rem; }
        @media (max-width: 600px) {
          .form-grid, .checkbox-grid, .result-sections { grid-template-columns: 1fr; }
          .full-width { grid-column: span 1; }
          .form-card { padding: 1.5rem; }
        }
      `}</style>
    </div>
  );
};

export default Questionnaire;
