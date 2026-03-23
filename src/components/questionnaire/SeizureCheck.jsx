import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { db, isPreviewMode } from '../../firebase/config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle2, 
  Activity, 
  Shield,
  Info,
  Brain,
  Zap,
  Clock,
  AlertTriangle
} from 'lucide-react';
import { QUESTIONS, analyzeResult, DRUGS_DATA } from '../../utils/epilepsyLogic';

const SeizureCheck = ({ onOpenAuth }) => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalSteps = QUESTIONS.length;

  const handleNext = () => setStep(prev => Math.min(prev + 1, totalSteps));
  const handleBack = () => setStep(prev => Math.max(prev - 1, 0));

  const handleAnswer = (id, value) => {
    setAnswers(prev => ({ ...prev, [id]: value }));
    if (step < totalSteps - 1) {
       setTimeout(handleNext, 300);
    }
  };

  const calculateResult = async () => {
    setIsSubmitting(true);
    const analysis = analyzeResult(answers);
    setResult(analysis);
    
    const resultData = {
      answers,
      resultName: analysis.name,
      category: analysis.category,
      timestamp: new Date().toISOString()
    };

    if (currentUser) {
      if (isPreviewMode) {
        // Save to localStorage for preview mode
        const history = JSON.parse(localStorage.getItem('preview_history') || '[]');
        history.unshift(resultData);
        localStorage.setItem('preview_history', JSON.stringify(history));
      } else {
        try {
          await addDoc(collection(db, 'questionnaire_results'), {
            userId: currentUser.uid,
            ...resultData,
            timestamp: serverTimestamp()
          });
        } catch (error) {
          console.error('Error saving result:', error);
        }
      }
    } else {
      // Save temp result to localStorage even if not logged in
      localStorage.setItem('last_check_result', JSON.stringify(resultData));
    }

    setIsSubmitting(false);
    setStep(totalSteps); // Results step
  };

  const renderStep = () => {
    const q = QUESTIONS[step];
    if (!q) return null;

    return (
      <div className="step-content animate-fade-in">
        <div className="question-layout">
          <div className="question-visual">
            <div className="image-card glass-card">
               <img src={q.image} alt={q.text} className="q-image" onError={(e) => e.target.src = 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=1000'} />
            </div>
          </div>
          <div className="question-text-side">
            <span className="step-indicator">Scientific Check • Step {step + 1} of {totalSteps}</span>
            <h2>{q.text}</h2>
            <p className="step-desc">Observation-based analysis for pharmaceutical documentation.</p>
            
            <div className="choice-group">
              <button 
                className={`choice-btn glass-card ${answers[q.id] === true ? 'active' : ''}`}
                onClick={() => handleAnswer(q.id, true)}
              >
                <div className="choice-circle"></div>
                <span>Yes, observed</span>
              </button>
              <button 
                className={`choice-btn glass-card ${answers[q.id] === false ? 'active' : ''}`}
                onClick={() => handleAnswer(q.id, false)}
              >
                <div className="choice-circle"></div>
                <span>No, not present</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderResult = () => {
    const recommendedDrugs = DRUGS_DATA.filter(d => result.treatmentIds.includes(d.id));

    return (
      <div className="result-container animate-fade-in">
        <div className="result-header glass-card">
          <div className="badge badge-purple">Check Analysis Complete</div>
          <h1>Possible Type: <span className="text-primary">{result.name}</span></h1>
          <p className="category">{result.category}</p>
        </div>

        <div className="disclaimer-alert glass-card">
          <AlertTriangle size={24} className="icon-warning" />
          <div className="alert-text">
            <strong>Medical Disclaimer</strong>
            <p>This assessment is for educational and medical knowledge purposes only as part of a pharmacy graduation project. Specific dosages <strong>must</strong> be determined by a physician.</p>
          </div>
        </div>

        <div className="result-main-grid">
          <div className="result-col">
            <div className="result-card glass-card h-full">
              <div className="card-header">
                <Brain size={24} className="icon-purple" />
                <h3>Clinical Indicators</h3>
              </div>
              <ul className="symptom-list">
                {result.symptoms.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
              <div className="lifestyle-tip">
                <h4><Shield size={16} /> Safety Protocol</h4>
                <p>{result.lifestyle}</p>
              </div>
            </div>
          </div>

          <div className="result-col">
            <div className="section-label">Recommended Pharmaceutical Options</div>
            <div className="drugs-scroll-list">
              {recommendedDrugs.map((drug) => (
                <div key={drug.id} className="drug-info-card glass-card">
                   <div className="drug-header">
                      <img src={drug.image} alt={drug.name} className="drug-thumb" />
                      <div className="drug-title">
                        <h4>{drug.name}</h4>
                        <span className="badge-outline">Clinical Group {drug.id}</span>
                      </div>
                   </div>
                   <div className="drug-body">
                      <p><strong>Clinical Uses:</strong> {drug.uses}</p>
                      <p><strong>Pharmacist Notes:</strong> {drug.administration}</p>
                      {drug.warning && <div className="drug-warning-tag"><AlertTriangle size={14} /> {drug.warning}</div>}
                   </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="result-cta-section glass-card">
          <div className="cta-content">
            <h3>{currentUser ? 'History Synced' : 'Save Your Results'}</h3>
            <p>
              {currentUser 
                ? 'Your check has been added to your medical dashboard for future reference.' 
                : 'Create a secure account to maintain your seizure history and check for drug interactions.'}
            </p>
          </div>
          {currentUser ? (
             <button className="btn btn-primary" onClick={() => navigate('/profile')}>Go to Dashboard</button>
          ) : (
             <button className="btn btn-primary" onClick={onOpenAuth}>Register & Save History</button>
          )}
        </div>

        <div className="result-bottom-actions">
           <button className="btn btn-secondary" onClick={() => { setStep(0); setAnswers({}); setResult(null); }}>Retake Check</button>
           <button className="btn btn-primary ml-4" onClick={() => navigate('/checker')}>
             Verify Drug Safety <ChevronRight size={18} />
           </button>
        </div>
      </div>
    );
  };

  return (
    <div className="check-page container section-padding">
      {step < totalSteps ? (
        <div className="form-container">
          <div className="check-card glass-card">
            {renderStep()}
            <div className="form-footer">
               <button className="btn btn-secondary btn-ghost" onClick={handleBack} disabled={step === 0}>
                 <ChevronLeft size={18} /> Previous
               </button>
               <div className="progress-dots">
                 {QUESTIONS.map((_, i) => (
                   <div key={i} className={`dot ${i === step ? 'active' : ''} ${i < step ? 'done' : ''}`}></div>
                 ))}
               </div>
               {step === totalSteps - 1 && Object.keys(answers).length === totalSteps ? (
                 <button className="btn btn-primary animate-pulse" onClick={calculateResult} disabled={isSubmitting}>
                   {isSubmitting ? 'Processing...' : 'Analyze Results'}
                 </button>
               ) : (
                 <button className="btn btn-primary btn-ghost" onClick={handleNext} disabled={!Object.keys(answers).includes(QUESTIONS[step].id)}>
                   Next <ChevronRight size={18} />
                 </button>
               )}
            </div>
          </div>
        </div>
      ) : renderResult()}

      <style>{`
        .check-page { max-width: 1000px; padding-top: 2rem; position: relative; z-index: 10; }
        .form-container { margin-bottom: 4rem; }
        .check-card { padding: 3rem; min-height: 550px; display: flex; flex-direction: column; position: relative; }
        .question-layout { display: grid; grid-template-columns: 1fr 1.2fr; gap: 3rem; align-items: center; }
        .image-card { padding: 0.5rem; border-radius: 20px; overflow: hidden; background: white; box-shadow: var(--shadow-sm); }
        .q-image { width: 100%; height: 320px; object-fit: cover; border-radius: 16px; }
        
        .step-indicator { font-size: 0.75rem; font-weight: 800; color: var(--primary); text-transform: uppercase; margin-bottom: 1rem; display: block; opacity: 0.7; }
        .question-text-side h2 { font-size: 2rem; margin-bottom: 1rem; line-height: 1.3; font-weight: 800; }
        .step-desc { color: var(--text-muted); font-size: 0.95rem; margin-bottom: 2rem; }
        .choice-group { display: flex; flex-direction: column; gap: 0.75rem; }
        .choice-btn { 
          display: flex; align-items: center; gap: 1.25rem; padding: 1.25rem 1.5rem; 
          background: white !important; border: 2px solid var(--border) !important; transition: all 0.2s;
          cursor: pointer; text-align: left; border-radius: 14px;
        }
        .choice-btn:hover { border-color: var(--primary) !important; background: #fafaff !important; }
        .choice-btn.active { border-color: var(--primary) !important; background: #f4f1ff !important; }
        .choice-circle { width: 18px; height: 18px; border: 2px solid var(--border); border-radius: 50%; position: relative; }
        .choice-btn.active .choice-circle { border-color: var(--primary); }
        .choice-btn.active .choice-circle::after { content: ''; position: absolute; inset: 3px; background: var(--primary); border-radius: 50%; }
        
        .form-footer { margin-top: auto; padding-top: 2rem; display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border); }
        .progress-dots { display: flex; gap: 8px; }
        .dot { width: 8px; height: 8px; border-radius: 50%; background: var(--border); transition: all 0.3s; }
        .dot.active { background: var(--primary); transform: scale(1.4); }
        .dot.done { background: var(--primary); opacity: 0.4; }
        
        /* Result Styles */
        .result-container { display: flex; flex-direction: column; gap: 2rem; margin-bottom: 6rem; }
        .result-header { padding: 3rem; text-align: center; background: white; }
        .result-header h1 { font-size: 2.5rem; margin-top: 1rem; font-weight: 900; }
        .disclaimer-alert { padding: 1.5rem 2rem; background: #fffaf0; border-left: 5px solid #ed8936; display: flex; gap: 1.5rem; align-items: center; }
        .alert-text b { display: block; margin-bottom: 4px; color: #7b341e; }
        .alert-text p { font-size: 0.9rem; color: #7b341e; line-height: 1.5; }
        .icon-warning { color: #ed8936; flex-shrink: 0; }
        
        .result-main-grid { display: grid; grid-template-columns: 1fr 1.6fr; gap: 2rem; }
        .card-header { display: flex; align-items: center; gap: 12px; margin-bottom: 1.5rem; }
        .symptom-list { margin: 1rem 0 2rem; padding-left: 1.25rem; color: var(--text-muted); line-height: 1.8; }
        .lifestyle-tip { padding: 1.25rem; background: #f0f4ff; border-radius: 12px; border: 1px solid #dce4ff; }
        .lifestyle-tip h4 { display: flex; align-items: center; gap: 8px; font-size: 0.95rem; margin-bottom: 0.5rem; color: #2c5282; }
        .lifestyle-tip p { font-size: 0.85rem; color: #2c5282; line-height: 1.5; }
        
        .drugs-scroll-list { display: flex; flex-direction: column; gap: 1rem; }
        .drug-info-card { padding: 1.5rem; background: white; }
        .drug-header { display: flex; gap: 1.25rem; align-items: center; margin-bottom: 1.25rem; }
        .drug-thumb { width: 70px; height: 70px; object-fit: cover; border-radius: 10px; border: 1px solid var(--border); }
        .drug-title h4 { font-size: 1.1rem; margin-bottom: 2px; }
        .badge-outline { font-size: 0.65rem; padding: 2px 8px; border: 1px solid var(--border); border-radius: 4px; color: var(--text-muted); font-weight: 700; }
        .drug-body p { font-size: 0.85rem; line-height: 1.6; color: var(--text-muted); margin-bottom: 0.5rem; }
        .drug-warning-tag { margin-top: 10px; font-size: 0.75rem; color: #c0392b; background: #fdedec; padding: 6px 12px; border-radius: 6px; display: flex; align-items: center; gap: 8px; font-weight: 700; }
        
        .result-cta-section { padding: 2.5rem; display: flex; justify-content: space-between; align-items: center; gap: 2rem; background: white; }
        .cta-content h3 { margin-bottom: 0.5rem; }
        .cta-content p { color: var(--text-muted); font-size: 0.9rem; }
        
        .result-bottom-actions { display: flex; justify-content: center; gap: 1.5rem; }
        .ml-4 { margin-left:1rem; }
        .h-full { height: 100%; }

        @media (max-width: 900px) {
          .question-layout, .result-main-grid, .result-cta-section { grid-template-columns: 1fr; }
          .check-card { padding: 2rem; }
          .q-image { height: 240px; }
        }
      `}</style>
    </div>
  );
};

export default SeizureCheck;
