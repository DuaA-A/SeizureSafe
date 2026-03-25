import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getInteractions, getRxCUI } from '../../services/rxnav';
import { 
  Pill, 
  Search, 
  AlertTriangle, 
  CheckCircle2, 
  Plus, 
  Trash2, 
  Loader2,
  Shield,
  ArrowRight,
  Info
} from 'lucide-react';
import { db } from '../../firebase/config';
import { doc, getDoc, updateDoc, setDoc, arrayUnion } from 'firebase/firestore';

const InteractionChecker = ({ onOpenAuth }) => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('quick');
  const [inputDrug, setInputDrug] = useState('');
  const [medsToCheck, setMedsToCheck] = useState([]);
  const [interactions, setInteractions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [savedMeds, setSavedMeds] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  const [hasChecked, setHasChecked] = useState(false);

  // Maximum allowed drugs to check simultaneously
  const MAX_DRUGS = 4;

  useEffect(() => {
    if (currentUser) {
      fetchSavedMeds();
    }
  }, [currentUser]);

  const fetchSavedMeds = async () => {
    try {
      const docRef = doc(db, 'user_medications', currentUser.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setSavedMeds(docSnap.data().medications || []);
      }
    } catch (err) {
      console.error('Error fetching meds:', err);
    }
  };

  const addDrug = async (e, forcedDrugName = null) => {
    if (e) e.preventDefault();
    const drugName = forcedDrugName || inputDrug;
    if (!drugName.trim()) return;

    if (medsToCheck.length >= MAX_DRUGS) {
      setErrorMsg(`You can analyze a maximum of ${MAX_DRUGS} medications at a time.`);
      return;
    }
    
    // Check if already added
    if (medsToCheck.some(m => m.name.toLowerCase() === drugName.toLowerCase())) {
      setErrorMsg(`"${drugName}" is already added to the comparison.`);
      if (!forcedDrugName) setInputDrug('');
      return;
    }
    
    setLoading(true);
    setErrorMsg('');
    setHasChecked(false); // Reset check state on new drug
    try {
      const rxcui = await getRxCUI(drugName);
      if (rxcui) {
        setMedsToCheck(prev => [...prev, { name: drugName, rxcui }]);
        if (!forcedDrugName) setInputDrug('');
      } else {
        setErrorMsg(`"${drugName}" was not found in the RxNav medical database. Please check your spelling.`);
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("A network error occurred connecting to the drug database.");
    } finally {
      setLoading(false);
    }
  };

  const removeDrug = (index) => {
    setMedsToCheck(prev => prev.filter((_, i) => i !== index));
    setInteractions([]);
    setErrorMsg('');
    setHasChecked(false); // Reset check state
  };

  const checkInteractions = async () => {
    if (medsToCheck.length < 2) {
      setErrorMsg("Please add at least 2 medications to check for interactions.");
      return;
    }
    setLoading(true);
    setErrorMsg('');
    try {
      const rxcuis = medsToCheck.map(m => m.rxcui);
      const results = await getInteractions(rxcuis);
      setInteractions(results);
      setHasChecked(true); // Successfully checked
    } catch (err) {
      console.error(err);
      setErrorMsg("Failed to generate interaction report.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checker-page container animate-fade-in">
      <div className="checker-header glass-card">
        <div className="header-icon">
          <Shield size={40} className="icon-purple" />
        </div>
        <h1>Medication Safety Center</h1>
        <p className="subtitle">Pharmacist-verified tool for identifying potential drug-drug interactions.</p>
        
        <div className="tab-switcher">
          <button 
            className={`tab-btn ${activeTab === 'quick' ? 'active' : ''}`}
            onClick={() => setActiveTab('quick')}
          >
            Quick Safety Check
          </button>
          <button 
            className={`tab-btn ${activeTab === 'saved' ? 'active' : ''}`}
            onClick={() => setActiveTab('saved')}
          >
            My Medication List
          </button>
        </div>
      </div>

      <div className="checker-body">
        {activeTab === 'quick' ? (
          <div className="quick-check-layout">
            <div className="input-panel glass-card">
              <h3>Interaction Analysis</h3>
              <p>Add 2 to {MAX_DRUGS} medications to analyze potential risky interactions.</p>
              
              <div className="multi-drug-slots">
                {[...Array(MAX_DRUGS)].map((_, index) => (
                  <div key={index} className={`drug-slot ${medsToCheck[index] ? 'filled' : 'empty'}`}>
                    {medsToCheck[index] ? (
                      <div className="filled-slot">
                        <Pill size={18} className="icon-purple" />
                        <span className="drug-name">{medsToCheck[index].name}</span>
                        <button onClick={() => removeDrug(index)}><Trash2 size={16} /></button>
                      </div>
                    ) : (
                      <span className="slot-placeholder">Slot {index + 1} {index < 2 ? '(Required)' : '(Optional)'}</span>
                    )}
                  </div>
                ))}
              </div>

              {medsToCheck.length < MAX_DRUGS && (
                <div className="drug-entry-zone mt-6">
                  <form onSubmit={(e) => addDrug(e)} className="drug-input-form">
                    <div className="input-group">
                      <Search className="input-icon" size={20} />
                      <input 
                        type="text" 
                        className="input-field" 
                        placeholder="Type a medication name (e.g. Advil)" 
                        value={inputDrug}
                        onChange={(e) => setInputDrug(e.target.value)}
                        disabled={loading}
                      />
                      <button type="submit" className="add-btn" disabled={loading || !inputDrug.trim()}>
                        {loading ? <Loader2 className="animate-spin" /> : <Plus />}
                      </button>
                    </div>
                  </form>

                  {errorMsg && (
                    <div className="inline-error-msg animate-fade-in">
                      <AlertTriangle size={16} />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  {currentUser && savedMeds.length > 0 && (
                    <div className="profile-quick-add mt-4">
                      <p className="quick-add-label">Or quick-select from your profile:</p>
                      <div className="profile-chips">
                        {savedMeds.map((m, i) => (
                          <button 
                            key={i} 
                            className="profile-chip"
                            onClick={() => addDrug(null, m.name)}
                            disabled={loading || medsToCheck.some(med => med.name.toLowerCase() === m.name.toLowerCase())}
                          >
                            {m.name} <Plus size={14} />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {medsToCheck.length >= 2 && (
                <button 
                  className={`btn run-check-btn w-full mt-6 ${hasChecked ? 'btn-secondary' : 'btn-premium animate-pulse'}`} 
                  onClick={checkInteractions}
                  disabled={loading}
                >
                  {loading ? 'Analyzing Databases...' : hasChecked ? 'Update Analysis' : 'Run Safety Analysis'}
                </button>
              )}
            </div>

            <div className="results-panel">
              {hasChecked && interactions.length > 0 ? (
                <div className="interaction-list animate-fade-in">
                  <div className="result-stat warning">
                    <AlertTriangle size={24} />
                    <span>{interactions.length} Interaction(s) Found</span>
                  </div>
                  {interactions.map((inter, i) => (
                    <div key={i} className={`interaction-card glass-card severity-${inter.severity.toLowerCase()}`}>
                      <div className="severity-badge">{inter.severity}</div>
                      <h4>{inter.drugs[0]} + {inter.drugs[1]}</h4>
                      <p>{inter.description}</p>
                    </div>
                  ))}
                  <div className="medical-note glass-card mt-4">
                    <Info size={20} className="shrink-0" />
                    <p>This report is exactly sourced from the globally standardized RxNav database and local curation. Always verify changes with your primary pharmacist before adjusting dosing.</p>
                  </div>
                </div>
              ) : hasChecked && interactions.length === 0 && !loading ? (
                <div className="no-interactions glass-card text-center animate-fade-in">
                  <CheckCircle2 size={48} className="icon-success" />
                  <h3>No Major Interactions Detected</h3>
                  <p>Based on our real-time clinical database query, your active combination of {medsToCheck.length} medications does not yield any standardized risk alerts.</p>
                </div>
              ) : (
                <div className="empty-results-state glass-card text-center">
                  <Shield size={48} className="icon-muted" style={{ opacity: 0.3 }} />
                  <h3>Awaiting Analysis</h3>
                  <p>
                    {medsToCheck.length < 2 
                      ? "Add at least 2 medications to the slots to unlock the safety analyzer." 
                      : "Click 'Run Safety Analysis' to generate your clinical report."}
                  </p>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Saved Meds View */
          <div className="saved-meds-layout glass-card">
            {!currentUser ? (
               <div className="login-prompt text-center">
                  <Shield size={48} className="icon-purple mb-4 mx-auto" />
                  <h3>Access Your Secure List</h3>
                  <p>Create an account to save your medication history and get personalized safety alerts.</p>
                  <button className="btn btn-premium mt-4 mx-auto" onClick={onOpenAuth}>Get Started Securely</button>
               </div>
            ) : (
              <div className="med-list-view">
                <h3>My Chronic Regimen</h3>
                <div className="med-grid mt-4">
                  {savedMeds.length > 0 ? savedMeds.map((m, i) => (
                    <div key={i} className="saved-med-card glass-card">
                      <Pill className="icon-purple" />
                      <div className="med-details">
                        <strong>{m.name}</strong>
                        <span>Added {new Date(m.addedAt).toLocaleDateString()}</span>
                      </div>
                      <button className="btn-icon"><Trash2 size={18} /></button>
                    </div>
                  )) : (
                    <p className="empty-text">Your archive is empty. Returning to the Quick Check tab allows you to identify and log new prescriptions.</p>
                  )}
                </div>
                {savedMeds.length >= 2 && (
                  <button className="btn btn-premium mt-8" onClick={() => {
                    setMedsToCheck(savedMeds.slice(0, MAX_DRUGS));
                    setActiveTab('quick');
                    setHasChecked(false);
                  }}>
                    Compare Saved Regimen (Up to {MAX_DRUGS}) <ArrowRight size={18} />
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      <style>{`
        .checker-page { padding-top: 2rem; padding-bottom: 6rem; max-width: 1200px; margin: 0 auto; }
        .checker-header { padding: 4rem 2rem; text-align: center; margin-bottom: 3rem; border-radius: 20px; box-shadow: 0 4px 20px rgba(0,0,0,0.02); }
        .icon-purple { color: var(--primary); }
        .subtitle { color: var(--text-muted); font-size: 1.1rem; margin-top: 0.5rem; margin-bottom: 3rem; }
        
        .tab-switcher { display: flex; justify-content: center; gap: 1rem; }
        .tab-btn { 
          padding: 12px 32px; border: 2px solid var(--border); background: white; 
          border-radius: 30px; font-weight: 700; color: var(--text-muted); cursor: pointer;
          transition: all 0.2s; font-size: 1rem;
        }
        .tab-btn.active { background: var(--primary); color: white; border-color: var(--primary); box-shadow: 0 8px 24px rgba(126, 34, 206, 0.25); }
        
        .quick-check-layout { display: grid; grid-template-columns: 450px 1fr; gap: 3rem; align-items: flex-start; }
        .input-panel { padding: 2.5rem; background: white; border-radius: 20px; border: 1px solid var(--border); box-shadow: 0 10px 30px rgba(0,0,0,0.03); }
        .input-panel h3 { margin-bottom: 0.5rem; font-size: 1.5rem; color: var(--text-main); font-weight: 800; }
        .input-panel p { font-size: 1rem; color: var(--text-muted); margin-bottom: 2rem; line-height: 1.5; }
        
        /* Multi Drug Slots */
        .multi-drug-slots { display: flex; flex-direction: column; gap: 12px; margin-bottom: 1.5rem; }
        .drug-slot { min-height: 56px; border-radius: 12px; display: flex; align-items: center; justify-content: center; border: 2px dashed rgba(126, 34, 206, 0.25); background: rgba(126, 34, 206, 0.02); transition: all 0.3s; }
        .drug-slot.filled { border-style: solid; border-color: rgba(126, 34, 206, 0.5); background: white; box-shadow: 0 4px 10px rgba(0,0,0,0.02); }
        .slot-placeholder { color: var(--text-muted); font-weight: 600; font-size: 0.95rem; opacity: 0.6; }
        .filled-slot { width: 100%; padding: 0 1.25rem; display: flex; align-items: center; gap: 12px; }
        .filled-slot .drug-name { flex: 1; font-weight: 700; color: var(--text-main); font-size: 1.05rem; }
        .filled-slot button { background: none; border: none; color: #ef4444; cursor: pointer; padding: 6px; border-radius: 6px; transition: background 0.2s; }
        .filled-slot button:hover { background: #fef2f2; }
        
        .drug-input-form { margin-bottom: 1rem; }
        .input-group { position: relative; display: flex; align-items: center; }
        .input-icon { position: absolute; left: 1.2rem; color: var(--text-muted); }
        .input-group .input-field { padding-left: 3.5rem; padding-right: 4rem; width: 100%; height: 54px; border-radius: 14px; border: 2px solid var(--border); font-weight: 600; font-size: 1rem; transition: border-color 0.3s; background: #fafafa; }
        .input-group .input-field:focus { border-color: var(--primary); outline: none; background: white; }
        .add-btn { position: absolute; right: 8px; width: 38px; height: 38px; background: var(--primary); color: white; border: none; border-radius: 10px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: background 0.2s; }
        .add-btn:hover:not(:disabled) { background: var(--primary-hover); }
        .add-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        
        /* Inline Error */
        .inline-error-msg { display: flex; align-items: flex-start; gap: 8px; background: #fef2f2; color: #b91c1c; padding: 14px 16px; border-radius: 12px; border-left: 4px solid #ef4444; margin-bottom: 1.5rem; font-size: 0.95rem; font-weight: 600; line-height: 1.4; box-shadow: 0 4px 12px rgba(239, 68, 68, 0.1); }
        
        /* Profile Quick Add */
        .profile-quick-add { margin-top: 1.5rem; border-top: 2px dashed var(--border); padding-top: 1.5rem; }
        .quick-add-label { font-size: 0.9rem; font-weight: 700; color: var(--text-muted); margin-bottom: 12px; }
        .profile-chips { display: flex; flex-wrap: wrap; gap: 8px; }
        .profile-chip { display: inline-flex; align-items: center; gap: 6px; padding: 8px 16px; background: white; border: 2px solid var(--border); border-radius: 20px; font-size: 0.9rem; font-weight: 700; color: var(--primary); cursor: pointer; transition: all 0.2s; }
        .profile-chip:hover:not(:disabled) { border-color: var(--primary); background: rgba(126, 34, 206, 0.05); transform: translateY(-1px); }
        .profile-chip:disabled { opacity: 0.4; cursor: not-allowed; border-color: var(--border); background: #f5f5f5; color: var(--text-muted); }
        
        /* Run Button */
        .run-check-btn { padding: 16px; font-size: 1.1rem; border-radius: 14px; }
        
        .result-stat { display: flex; align-items: center; gap: 15px; padding: 1.5rem 2rem; border-radius: 16px; margin-bottom: 2rem; font-weight: 800; font-size: 1.25rem; }
        .result-stat.warning { background: #fff5f5; color: #c53030; border: 1px solid #fed7d7; }
        .icon-success { color: var(--success); margin-bottom: 1.5rem; }
        
        .interaction-card { padding: 2rem; margin-bottom: 1.5rem; position: relative; border-left: 6px solid #ccc; background: white; box-shadow: 0 4px 20px rgba(0,0,0,0.03); border-radius: 0 16px 16px 0; border-top: 1px solid var(--border); border-right: 1px solid var(--border); border-bottom: 1px solid var(--border); }
        .severity-high { border-left-color: #e53e3e; }
        .severity-moderate { border-left-color: #dd6b20; }
        .severity-minor { border-left-color: #3182ce; }
        .severity-badge { position: absolute; top: 1.5rem; right: 2rem; font-size: 0.8rem; font-weight: 800; text-transform: uppercase; padding: 6px 12px; background: #eee; border-radius: 6px; letter-spacing: 0.5px; }
        .severity-high .severity-badge { background: #fee2e2; color: #991b1b; border: 1px solid #fecaca; }
        .interaction-card h4 { font-size: 1.3rem; color: var(--text-main); margin-bottom: 0.5rem; font-weight: 800; padding-right: 80px; }
        .interaction-card p { font-size: 1rem; color: var(--text-muted); line-height: 1.6; margin: 0; }
        
        .empty-results-state, .no-interactions { padding: 6rem 3rem; display: flex; flex-direction: column; align-items: center; justify-content: center; background: white; border-radius: 20px; box-shadow: 0 4px 20px rgba(0,0,0,0.02); height: 100%; border: 1px solid var(--border); }
        .empty-results-state h3 { margin: 1.5rem 0 0.5rem; color: var(--text-main); font-weight: 800; font-size: 1.6rem; }
        .no-interactions h3 { margin-bottom: 1rem; color: var(--text-main); font-weight: 800; font-size: 1.6rem; }
        .empty-results-state p { color: var(--text-muted); font-size: 1.1rem; text-align: center; max-width: 400px; line-height: 1.5; }
        .no-interactions p { color: var(--text-muted); font-size: 1.1rem; text-align: center; max-width: 450px; line-height: 1.6; }
        
        .medical-note { padding: 1.5rem; background: #f8fafc; font-size: 0.95rem; color: var(--text-muted); display: flex; gap: 16px; align-items: flex-start; border: 1px solid var(--border); border-radius: 12px; line-height: 1.6; }
        .shrink-0 { flex-shrink: 0; color: #64748b; margin-top: 2px; }
        
        .saved-meds-layout { padding: 5rem 4rem; min-height: 500px; border-radius: 20px; }
        .login-prompt h3 { font-size: 1.8rem; font-weight: 800; margin-bottom: 0.5rem; }
        .login-prompt p { font-size: 1.1rem; color: var(--text-muted); margin-bottom: 1.5rem; }
        
        .med-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.5rem; }
        .saved-med-card { padding: 1.5rem; display: flex; align-items: center; gap: 1.5rem; border: 2px solid var(--border); transition: transform 0.2s, border-color 0.2s; border-radius: 14px; background: white; }
        .saved-med-card:hover { transform: translateY(-3px); border-color: var(--primary); box-shadow: 0 8px 20px rgba(0,0,0,0.05); }
        .med-details { flex: 1; display: flex; flex-direction: column; gap: 4px; }
        .med-details strong { font-size: 1.15rem; color: var(--text-main); font-weight: 800; }
        .med-details span { font-size: 0.85rem; color: var(--text-muted); font-weight: 600; }
        .btn-icon { background: none; border: none; color: var(--text-muted); cursor: pointer; transition: color 0.2s; }
        .btn-icon:hover { color: #ef4444; }
        
        .empty-text { grid-column: 1 / -1; text-align: center; padding: 4rem 2rem; color: var(--text-muted); font-size: 1.1rem; background: #fafafa; border-radius: 12px; border: 2px dashed var(--border); }
        
        .mt-4 { margin-top: 1rem; }
        .mt-6 { margin-top: 1.5rem; }
        .mt-8 { margin-top: 2rem; }
        .mb-4 { margin-bottom: 1rem; }
        .mx-auto { margin-left: auto; margin-right: auto; }
        .w-full { width: 100%; }
        
        @media (max-width: 1000px) {
          .quick-check-layout { grid-template-columns: 1fr; }
          .saved-meds-layout { padding: 3rem 2rem; }
        }
      `}</style>
    </div>
  );
};

export default InteractionChecker;
