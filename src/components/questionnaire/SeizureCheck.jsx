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
  Pill
} from 'lucide-react';
import { analyzeResult } from '../../utils/epilepsyLogic';

const EPILEPSY_STEPS = [
  {
    id: 'profile',
    title: 'Patient Profile',
    subtitle: 'Essential demographics for clinical assessment.',
    type: 'profile'
  },
  {
    id: 'consciousness',
    title: 'State of Consciousness',
    subtitle: 'Did the person lose awareness of their surroundings?',
    image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=800',
    options: [
      { id: 'lost', label: 'Lost Consciousness', desc: 'Sudden collapse or non-responsiveness.' },
      { id: 'impaired', label: 'Altered/Impaired', desc: 'Appears awake but confused/unresponsive.' },
      { id: 'maintained', label: 'Fully Maintained', desc: 'The person remained awake and aware.' }
    ]
  },
  {
    id: 'movement',
    title: 'Movement Patterns',
    subtitle: 'Describe all physical activity observed (Select ALL that apply).',
    multiSelect: true,
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800',
    options: [
      { id: 'jerking_stiffening', label: 'Rhythmic Jerking/Stiffening', desc: 'Full body or localized rhythmic movements.' },
      { id: 'staring', label: 'Blank Staring', desc: 'Sudden freezing or staring into space.' },
      { id: 'automatisms', label: 'Fumbling/Lip Smacking', desc: 'Aimless, repetitive motor tasks.' },
      { id: 'brief_jerks', label: 'Brief Shock-like Jerks', desc: 'Sudden jumps (usually in the morning).' },
      { id: 'drop_collapse', label: 'Sudden Collapse (Drop)', desc: 'Immediate loss of muscle tone.' },
      { id: 'none', label: 'No Unusual Movement', desc: 'Only sensory or emotional changes.' }
    ]
  },
  {
    id: 'duration',
    title: 'Episode Duration',
    subtitle: 'How long did the clinical event last?',
    image: 'https://images.unsplash.com/photo-1508962850731-0d6f22443886?auto=format&fit=crop&q=80&w=800',
    options: [
      { id: 'seconds', label: 'Brief Seconds', desc: 'Usually less than 30 seconds.' },
      { id: '1-3mins', label: '1 to 3 Minutes', desc: 'Typical for many seizure types.' },
      { id: 'over_5mins', label: 'Over 5 Minutes', desc: 'Requires emergency medical attention.' }
    ]
  },
  {
    id: 'awareness',
    title: 'Level of Awareness',
    subtitle: 'Could the person answer questions or interact?',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800',
    options: [
      { id: 'full', label: 'Full Awareness', desc: 'Can describe the event clearly.' },
      { id: 'partial', label: 'Partial/Vague', desc: 'Recalls some parts, but not all.' },
      { id: 'none', label: 'Total Memory Loss', desc: 'No recollection of the event.' }
    ]
  }
];

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
    if (currentStepData.multiSelect) {
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
    
    const resultData = {
      profile,
      answers,
      resultName: analysis.name,
      timestamp: new Date().toISOString()
    };

    if (currentUser) {
      if (isPreviewMode) {
        localStorage.setItem('preview_latest_result', JSON.stringify(resultData));
      } else {
        try {
          // Keep only the latest: overwrite or update doc with user ID
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
    setStep(totalSteps); // Jump to result
  };

  const renderCurrentStep = () => {
    if (currentStepData.type === 'profile') {
      return (
        <div className="profile-step-layout animate-fade-in">
          <div className="step-header">
            <User size={32} className="icon-purple mb-4" />
            <h2>Patient Information</h2>
            <p>Essential details to refine assessment.</p>
          </div>
          <div className="profile-form mt-4">
            <div className="input-group-premium">
              <label>Full Name or Initial</label>
              <input type="text" placeholder="Patient Name" value={profile.name} onChange={e => setProfile({...profile, name: e.target.value})} />
            </div>
            <div className="form-row mt-4">
              <div className="input-group-premium half">
                <label>Age</label>
                <input type="number" placeholder="25" value={profile.age} onChange={e => setProfile({...profile, age: e.target.value})} />
              </div>
              <div className="input-group-premium half">
                <label>Gender</label>
                <select value={profile.gender} onChange={e => setProfile({...profile, gender: e.target.value})}>
                  <option>Male</option><option>Female</option><option>Other</option>
                </select>
              </div>
            </div>
            <div className="input-group-premium mt-4">
              <label>Weight (kg)</label>
              <input type="number" placeholder="70" value={profile.weight} onChange={e => setProfile({...profile, weight: e.target.value})} />
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="diagnostic-step-layout animate-fade-in">
        <div className="question-side">
          <span className="step-count">Step {step} of {totalSteps - 1} • {currentStepData.title}</span>
          <h2>{currentStepData.subtitle}</h2>
          <div className="options-grid mt-6">
            {currentStepData.options.map((opt) => {
              const isActive = currentStepData.multiSelect 
                ? (answers[currentStepData.id] || []).includes(opt.id)
                : answers[currentStepData.id] === opt.id;
              
              return (
                <button key={opt.id} className={`option-card glass-card ${isActive ? 'active' : ''}`} onClick={() => handleSelectOption(opt.id)}>
                  <div className={currentStepData.multiSelect ? "checkbox-box" : "radio-circle"}>
                    {currentStepData.multiSelect && isActive && <Check size={14} />}
                  </div>
                  <div className="option-info">
                    <span className="opt-label">{opt.label}</span>
                    <p className="opt-desc">{opt.desc}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
        <div className="image-side">
          <div className="image-frame glass-card">
            <img src={currentStepData.image} alt={currentStepData.title} />
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
          <div className="patient-summary mt-2 text-white">
            <span>Name: {profile.name}</span> • <span>Age: {profile.age}</span> • <span>Weight: {profile.weight}kg</span>
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
        <div className="check-card-frame glass-card">
          <div className="intro-screen animate-fade-in text-center flex flex-col justify-center items-center h-full">
            <div className="intro-icon-wrapper mb-6"><ClipboardList size={64} className="icon-purple" /></div>
            <h1 className="intro-title text-center w-full">Medical Seizure Assessment</h1>
            <p className="intro-desc text-center">A professional 6-step diagnostic tool. Combine patient profile with multi-pattern clinical observation for accurate assessment.</p>
            <div className="flex justify-center w-full">
              <button className="btn btn-premium btn-massive mt-8" onClick={() => setIsStarted(true)}>Begin Assessment <ChevronRight size={22} className="ml-2" /></button>
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
            <button className="btn btn-primary-nav" onClick={handleNext} disabled={(step === 0 && !profile.name) || (step > 0 && (!answers[currentStepData.id] || answers[currentStepData.id]?.length === 0)) || isSubmitting}>
              {isSubmitting ? 'Processing...' : step === totalSteps - 1 ? 'Generate Report' : 'Next Step'} <ChevronRight size={20} />
            </button>
          </div>
        </div>
      ) : renderResult()}

      <style>{`
        .check-page { max-width: 1100px; margin: 0 auto; min-height: 70vh; padding: 4rem 2rem; }
        .check-card-frame { padding: 4rem; min-height: 600px; display: flex; flex-direction: column; background: white; border-radius: 32px; border: 1px solid var(--border); box-shadow: 0 20px 50px rgba(0,0,0,0.05); }
        .intro-title { font-size: 3rem; font-weight: 900; margin-bottom: 1.5rem; text-align: center; color: var(--text-main); }
        .intro-desc { font-size: 1.25rem; line-height: 1.7; color: var(--text-muted); max-width: 800px; margin: 0 auto; text-align: center; }
        .intro-icon-wrapper { display: flex; justify-content: center; width: 100%; }
        .flex { display: flex; }
        .justify-center { justify-content: center; }
        .w-full { width: 100%; }
        
        .check-body { flex: 1; }
        .diagnostic-step-layout { display: grid; grid-template-columns: 1.1fr 1fr; gap: 4rem; align-items: center; }
        .step-header { text-align: center; margin-bottom: 2rem; }
        .step-header h2 { font-size: 2.2rem; font-weight: 900; margin-bottom: 1rem; text-align: center; }
        .step-header p { font-size: 1.1rem; color: var(--text-muted); text-align: center; }
        
        .profile-form { max-width: 600px; margin: 0 auto; }
        .input-group-premium { display: flex; flex-direction: column; gap: 8px; text-align: left; }
        .input-group-premium label { font-weight: 700; color: var(--text-main); font-size: 0.9rem; margin-left: 4px; }
        .input-group-premium input, .input-group-premium select { padding: 14px 18px; border-radius: 12px; border: 1.5px solid var(--border); font-size: 1rem; outline: none; transition: border-color 0.2s; }
        .input-group-premium input:focus { border-color: var(--primary); }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }

        .checkbox-box { width: 22px; height: 22px; border: 2px solid #cbd5e1; border-radius: 6px; display: flex; align-items: center; justify-content: center; margin-right: 12px; }
        .option-card.active .checkbox-box { background: var(--primary); border-color: var(--primary); color: white; }
        .step-count { font-weight: 900; color: var(--primary); font-size: 0.85rem; text-transform: uppercase; margin-bottom: 1rem; display: block; text-align: center; }
        .question-side { text-align: center; }
        .question-side h2 { font-size: 2rem; font-weight: 900; text-align: center; margin-bottom: 2rem; }
        .options-grid { display: grid; grid-template-columns: 1fr; gap: 1rem; max-width: 500px; margin-left: auto; margin-right: auto; }
        .option-card { padding: 1.5rem !important; text-align: left; display: flex; align-items: center; cursor: pointer; border: 1.5px solid var(--border); background: white; border-radius: 16px; transition: all 0.2s; width: 100%; }
        .option-card:hover { border-color: var(--primary); background: rgba(157, 141, 241, 0.05); }
        .option-card.active { border-color: var(--primary); background: rgba(157, 141, 241, 0.1); box-shadow: 0 4px 15px rgba(157, 141, 241, 0.2); }
        
        .image-frame { border-radius: 20px; overflow: hidden; height: 380px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); }
        .image-frame img { width: 100%; height: 100%; object-fit: cover; }
        .check-footer { padding-top: 2rem; border-top: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center; margin-top: 3rem; }

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
          .diagnostic-step-layout { grid-template-columns: 1fr; gap: 2rem; }
          .report-main-grid { grid-template-columns: 1fr; }
          .check-card-frame { padding: 1.5rem; }
        }
      `}</style>
    </div>
  );
};

export default SeizureCheck;
