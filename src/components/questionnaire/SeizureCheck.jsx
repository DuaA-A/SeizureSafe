import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { db, isPreviewMode } from '../../firebase/config';
import { collection, addDoc, serverTimestamp, query, where, getDocs, deleteDoc, doc, setDoc } from 'firebase/firestore';
import { 
  ChevronRight, 
  ChevronLeft, 
  Activity, 
  Shield,
  Info,
  Brain,
  Clock,
  AlertTriangle,
  User,
  Heart,
  Stethoscope,
  ClipboardList,
  ArrowRight,
  FileCheck,
  Check,
  Pill,
  ShieldCheck
} from 'lucide-react';
import { analyzeResult, QUESTIONS as EPILEPSY_STEPS } from '../../utils/epilepsyLogic';

const SeizureCheck = ({ onOpenAuth }) => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [isStarted, setIsStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [profile, setProfile] = useState({ name: '', age: '', gender: 'Male', weight: '' });
  const [result, setResult] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentStepData = EPILEPSY_STEPS[step];
  const totalSteps = EPILEPSY_STEPS.length;

  const handleNext = () => {
    if (step < totalSteps - 1) {
      setStep(prev => prev + 1);
    } else {
      calculateResult();
    }
  };

  const handleBack = () => setStep(prev => Math.max(prev - 1, 0));

  const handleSelectOption = (optId) => {
    if (currentStepData.multi) {
      const current = answers[currentStepData.id] || [];
      if (current.includes(optId)) {
        setAnswers({...answers, [currentStepData.id]: current.filter(id => id !== optId)});
      } else {
        setAnswers({...answers, [currentStepData.id]: [...current, optId]});
      }
    } else {
      setAnswers({...answers, [currentStepData.id]: optId});
    }
  };

  const calculateResult = async () => {
    setIsSubmitting(true);
    const analysis = analyzeResult(answers);
    setResult(analysis);
    
    // Auto-populate profile with logged in user if available
    const finalProfile = {
       ...profile,
       name: profile.name || (currentUser?.displayName) || 'Patient',
    };

    const resultData = {
      profile: finalProfile,
      answers,
      resultName: analysis.name,
      timestamp: new Date().toISOString()
    };

    if (currentUser) {
      if (isPreviewMode) {
        localStorage.setItem('preview_latest_result', JSON.stringify(resultData));
      } else {
        try {
          await setDoc(doc(db, 'seizure_latest_results', currentUser.uid), {
            ...resultData,
            timestamp: serverTimestamp()
          });
        } catch (error) {
          console.error('Error saving result:', error);
        }
      }
    }
    setIsSubmitting(false);
    setStep(totalSteps); 
  };

  const renderCurrentStep = () => {
    return (
      <div className="diagnostic-step-layout animate-fade-in">
        <div className="question-side">
          <div className="active-badge mb-3">Clinical Assessment Stage</div>
          <span className="step-count">Question {step + 1} of {totalSteps} • {currentStepData.section}</span>
          <h2 className="step-question-text">{currentStepData.text}</h2>
          <div className="options-vertical-list mt-8">
            {currentStepData.options.map((opt) => {
              const isActive = currentStepData.multi 
                ? (answers[currentStepData.id] || []).includes(opt.id)
                : answers[currentStepData.id] === opt.id;
              
              return (
                <button key={opt.id} className={`option-card-premium ${isActive ? 'active' : ''}`} onClick={() => handleSelectOption(opt.id)}>
                  <div className="opt-marker">
                    {currentStepData.multi ? (
                      <div className={`check-box ${isActive ? 'checked' : ''}`}>{isActive && <Check size={14} />}</div>
                    ) : (
                      <div className={`radio-circle ${isActive ? 'checked' : ''}`}></div>
                    )}
                  </div>
                  <div className="opt-content">
                    <span className="opt-label">{opt.label}</span>
                    <p className="opt-sub">{opt.sub}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
        <div className="visual-side">
          <div className="image-frame-clinical">
            <img src={currentStepData.image} alt="Clinical Visual" />
            <div className="image-overlay-sub">
               <Info size={16} /> <span>Reference visual for clinical categorization.</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderResult = () => (
    <div className="full-report-container animate-fade-in">
      <div className="report-hero compact glass-card">
        <div className="report-hero-content">
          <div className="status-badge"><FileCheck size={16} /> Analysis Ready</div>
          <h1 className="text-white">Primary Assessment: <span className="text-white-glow">{result.name}</span></h1>
          <div className="patient-summary mt-2 text-white" style={{ opacity: 0.9 }}>
            <span>Profile: {(currentUser?.displayName) || 'Patient Analysis'}</span> 
            <span className="ml-2">• Date: {new Date().toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      <div className="report-main-grid compact mt-4">
        <div className="report-left-col">
          <div className="clinical-description-card glass-card compact-card">
            <h3 className="section-title"><Brain size={18} /> Pathophysiological Overview</h3>
            <p className="desc-text-small">{result.description}</p>
          </div>
          
          <div className="pharmacist-advice-card glass-card compact-card mt-4">
            <h3 className="section-title text-primary"><Pill size={18} /> Recommended Treatment</h3>
            <div className="treatment-box">
               <p className="treatment-text">{result.treatment}</p>
               <p className="advice-note mt-2"><strong>Pharmacist GUIDELINE:</strong> {result.advice}</p>
            </div>
          </div>

          <div className="action-plan-box compact-plan mt-4">
            <h4><Stethoscope size={16} /> Clinical Action Plan</h4>
            <p>{result.plan}</p>
          </div>
        </div>

        <div className="report-right-col">
          <div className="next-steps-card glass-card compact-card">
            <h3>Immediate Actions</h3>
            <div className="step-items mt-3">
              <div className="step-item mini">
                <div className="s-icon">1</div>
                <p>Add to Dashboard Archive</p>
              </div>
              <div className="step-item mini">
                <div className="s-icon">2</div>
                <p>Check Drug Interactions</p>
              </div>
            </div>
            <button className="btn btn-premium w-full mt-6" onClick={() => navigate('/checker')}>
              Verify Drug Safety <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>

      <div className="result-footer mt-6 text-center pb-8">
        <button className="btn btn-secondary" onClick={() => { setIsStarted(false); setStep(0); setAnswers({}); setResult(null); }}>Retake Assessment</button>
        <button className="btn btn-premium ml-4" onClick={() => navigate('/profile')}>Go to Dashboard</button>
      </div>
    </div>
  );

  return (
    <div className="check-page container section-padding">
      {!isStarted ? (
        <div className="intro-hero-wrapper animate-fade-in">
          <div className="intro-hero-grid">
            <div className="intro-hero-text">
               <div className="active-badge mb-4">Clinical Diagnostic Interface</div>
               <h1 className="clinical-title">Seizure Classification <br/>Assessment Tool</h1>
               <p className="clinical-description">
                 A comprehensive 6-step clinical guide designed for caregivers to accurately identify 
                 epileptic seizure patterns. This tool uses pharmacist-verified criteria to distinguish 
                 between generalized and focal onset episodes.
               </p>
               <div className="clinical-benefits mt-8">
                  <div className="benefit-item">
                     <ShieldCheck size={20} className="icon-purple" />
                     <span>Evidence-based diagnostic criteria</span>
                  </div>
                  <div className="benefit-item">
                     <Clock size={20} className="icon-purple" />
                     <span>Results in under 3 minutes</span>
                  </div>
               </div>
               <button className="btn btn-premium btn-massive mt-10" onClick={() => setIsStarted(true)}>
                  Begin Clinical Assessment <ArrowRight size={22} className="ml-2" />
               </button>
            </div>
            <div className="intro-hero-visual">
               <div className="hero-visual-frame glass-card">
                  <img src="/hero.png" alt="Clinical Assessment" />
               </div>
            </div>
          </div>
        </div>
      ) : step < totalSteps ? (
        <div className="check-card-frame glass-card">
          <div className="check-body">{renderCurrentStep()}</div>
          <div className="check-footer">
            <button className="btn-ghost-nav" onClick={handleBack} disabled={step === 0}><ChevronLeft size={20} /> Back</button>
            <div className="step-progress-wrapper">
              {EPILEPSY_STEPS.map((_, i) => <div key={i} className={`step-dot ${i === step ? 'active' : ''} ${i < step ? 'completed' : ''}`}></div>)}
            </div>
            <button className="btn btn-primary-nav" onClick={handleNext} disabled={(!answers[currentStepData.id] || answers[currentStepData.id]?.length === 0) || isSubmitting}>
              {isSubmitting ? 'Processing...' : step === totalSteps - 1 ? 'Generate Report' : 'Next Step'} <ChevronRight size={20} />
            </button>
          </div>
        </div>
      ) : renderResult()}

      <style>{`
        .check-page { max-width: 1200px; margin: 0 auto; min-height: 80vh; padding: 4rem 2rem; }
        
        /* Intro Hero */
        .intro-hero-wrapper { min-height: 600px; display: flex; align-items: center; }
        .intro-hero-grid { display: grid; grid-template-columns: 1.2fr 1fr; gap: 4rem; align-items: center; width: 100%; }
        .clinical-title { font-size: 3.5rem; font-weight: 900; line-height: 1.1; margin-bottom: 2rem; text-align: left; color: var(--text-main); }
        .clinical-description { font-size: 1.2rem; line-height: 1.7; color: var(--text-muted); text-align: left; }
        .clinical-benefits { display: flex; flex-direction: column; gap: 1rem; }
        .benefit-item { display: flex; align-items: center; gap: 12px; font-weight: 600; color: var(--text-muted); }
        .hero-visual-frame { border-radius: 40px; overflow: hidden; height: 500px; box-shadow: 0 30px 60px rgba(157, 141, 241, 0.4) !important; border: 10px solid white; background: white; position: relative; }
        .hero-visual-frame img { width: 100%; height: 100%; object-fit: cover; }
        .intro-hero-wrapper { background: linear-gradient(135deg, rgba(157, 141, 241, 0.1) 0%, rgba(59, 130, 246, 0.05) 100%); padding: 4rem; border-radius: 40px; margin-bottom: 2rem; position: relative; overflow: hidden; }
        .intro-hero-wrapper::before { content: ''; position: absolute; inset: 0; background: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 86c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zm66 3c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zm-46-45c5.523 0 10-4.477 10-10s-4.477-10-10-10-10 4.477-10 10 4.477 10 10 10zm0-20c3.314 0 6 2.686 6 6s-2.686 6-6 6-6-2.686-6-6 2.686-6 6-6zM94 46c3.314 0 6-2.686 6-6s-2.686-6-6-6-6 2.686-6 6 2.686-6 6 6zm0-5c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zM57 90c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm0-10c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3 1.343-3 3-3zm-35-45c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM8 30c3.314 0 6-2.686 6-6s-2.686-6-6-6-6 2.686-6 6 2.686-6 6 6zm0-5c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zm54 40c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3z' fill='%239d8df1' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E"); opacity: 0.5; pointer-events: none; }

        /* Diagnostic Steps */
        .check-card-frame { padding: 4rem; min-height: 650px; display: flex; flex-direction: column; background: white; border-radius: 32px; border: 1px solid var(--border); box-shadow: 0 20px 50px rgba(0,0,0,0.05); }
        .diagnostic-step-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: flex-start; }
        .question-side { text-align: left !important; }
        .step-count { font-weight: 800; color: var(--primary); font-size: 0.9rem; text-transform: uppercase; margin-bottom: 0.5rem; display: block; text-align: left; }
        .step-question-text { font-size: 2.2rem; font-weight: 900; line-height: 1.2; text-align: left !important; color: var(--text-main); margin-bottom: 2rem; }
        
        .options-vertical-list { display: flex; flex-direction: column; gap: 1rem; }
        .option-card-premium { padding: 1.5rem !important; display: flex; align-items: center; gap: 1.5rem; cursor: pointer; border: 2px solid var(--border); background: white; border-radius: 20px; transition: all 0.2s; width: 100%; text-align: left !important; }
        .option-card-premium:hover { border-color: var(--primary); background: rgba(157, 141, 241, 0.05); transform: translateX(10px); }
        .option-card-premium.active { border-color: var(--primary); background: rgba(157, 141, 241, 0.1); box-shadow: 0 8px 25px rgba(157, 141, 241, 0.2); }
        
        .opt-marker { display: flex; align-items: center; justify-content: center; }
        .radio-circle { width: 20px; height: 20px; border: 2px solid #cbd5e1; border-radius: 50%; position: relative; }
        .radio-circle.checked::after { content: ''; position: absolute; inset: 4px; background: var(--primary); border-radius: 50%; }
        .check-box { width: 22px; height: 22px; border: 2px solid #cbd5e1; border-radius: 6px; display: flex; align-items: center; justify-content: center; }
        .check-box.checked { background: var(--primary); border-color: var(--primary); color: white; }
        
        .opt-label { font-size: 1.1rem; font-weight: 700; color: var(--text-main); display: block; }
        .opt-sub { font-size: 0.9rem; color: var(--text-muted); margin: 0; }
        
        .visual-side { position: sticky; top: 0; }
        .image-frame-clinical { border-radius: 30px; overflow: hidden; height: 450px; background: white; position: relative; box-shadow: 0 20px 50px rgba(157, 141, 241, 0.3) !important; border: 8px solid white; }
        .image-frame-clinical img { width: 100%; height: 100%; object-fit: cover; }
        .image-overlay-sub { position: absolute; bottom: 0; left: 0; right: 0; padding: 1rem; background: rgba(255,255,255,0.9); backdrop-filter: blur(10px); display: flex; align-items: center; gap: 8px; font-size: 0.8rem; color: var(--text-muted); }

        .active-badge { background: var(--primary); color: white !important; font-weight: 800; padding: 6px 16px; border-radius: 20px; font-size: 0.8rem; display: inline-block; }
        
        .check-footer { padding-top: 2rem; border-top: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center; margin-top: 3rem; }
        .btn-massive { padding: 18px 40px; font-size: 1.1rem; font-weight: 700; border-radius: 20px; }

        /* Compact Report UI */
        .report-hero.compact { padding: 2rem; border-radius: 24px; background: linear-gradient(135deg, #4338ca 0%, #3b82f6 100%); text-align: left; }
        .report-hero h1 { font-size: 2.2rem; margin: 0.5rem 0; color: white !important; }
        .text-white-glow { text-shadow: 0 0 10px rgba(255,255,255,0.3); color: white !important; }
        .patient-summary { font-size: 1rem; opacity: 0.9; }
        .compact-card { padding: 1.5rem !important; }
        .section-title { font-weight: 900; margin-bottom: 1rem; font-size: 1.1rem; display: flex; align-items: center; gap: 8px; }
        .desc-text-small { font-size: 0.95rem; line-height: 1.5; color: var(--text-muted); }
        .treatment-text { font-size: 1.05rem; font-weight: 700; color: var(--text-main); margin: 0; }
        .advice-note { font-size: 0.9rem; color: #1e40af; background: #eff6ff; padding: 10px; border-radius: 8px; border-left: 4px solid #3b82f6; }
        .compact-plan { padding: 1.25rem; background: #f0f7ff; border-radius: 16px; border: 1px solid #d0e7ff; }
        .compact-plan h4 { font-weight: 900; font-size: 0.95rem; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 6px; color: #1e40af; }
        .compact-plan p { font-size: 0.9rem; margin: 0; color: #1e40af; line-height: 1.5; }
        .mini { gap: 0.5rem !important; }
        .mini .s-icon { width: 24px; height: 24px; font-size: 0.75rem; }
        .mini p { font-size: 0.85rem; }
        
        .btn-large { padding: 14px 30px; }
        .text-white { color: white !important; }

        @media (max-width: 900px) {
          .intro-hero-grid { grid-template-columns: 1fr; gap: 2rem; }
          .diagnostic-step-layout { grid-template-columns: 1fr; gap: 2rem; }
          .report-main-grid { grid-template-columns: 1fr; }
          .check-card-frame { padding: 1.5rem; }
          .intro-hero-wrapper { padding: 2rem; border-radius: 20px; }
          .clinical-title { font-size: 2.2rem; }
          .hero-visual-frame { height: 300px; border-width: 4px; }
          .image-frame-clinical { height: 250px; }
          .btn-massive { padding: 14px 24px; font-size: 1rem; width: 100%; display: flex; justify-content: center; }
        }
      `}</style>
    </div>
  );
};

export default SeizureCheck;
