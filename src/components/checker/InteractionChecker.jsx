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
import { db, isPreviewMode } from '../../firebase/config';
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
      if (isPreviewMode) {
        const meds = JSON.parse(localStorage.getItem('preview_meds') || '[]');
        setSavedMeds(meds);
      } else {
        const docRef = doc(db, 'user_medications', currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setSavedMeds(docSnap.data().medications || []);
        }
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
    if (medsToCheck.length < 1) {
      setErrorMsg("Please add at least 1 medication to check for interactions against standard AEDs.");
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
      <div className="checker-header-wrapper">
        <div className="checker-header">
          <h1>Medication Safety Center</h1>
          <p className="subtitle text-center">Pharmacist-verified tool for identifying potential drug-drug interactions.</p>
          
          <div className="tab-switcher">
            <button 
              className={`tab-btn ${activeTab === 'quick' ? 'active' : ''}`}
              onClick={() => setActiveTab('quick')}
            >
              Safety Analyzer
            </button>
            <button 
              className={`tab-btn ${activeTab === 'saved' ? 'active' : ''}`}
              onClick={() => setActiveTab('saved')}
            >
              My Medication List
            </button>
          </div>
        </div>
      </div>

      <div className="checker-body">
        {activeTab === 'quick' ? (
          <div className="quick-check-layout">
            <div className="input-panel glass-card">
              <h3>Interaction Analysis</h3>
              <p>Add 1 to {MAX_DRUGS} medications to analyze potential interactions against standard Epilepsy treatments.</p>
              
              <div className="multi-drug-slots">
                {[...Array(MAX_DRUGS)].map((_, index) => (
                  <div key={index} className={`drug-slot ${medsToCheck[index] ? 'filled' : 'empty'}`}>
                    {medsToCheck[index] ? (
                      <div className="filled-slot">
                        <Pill size={18} className="icon-purple" />
                        <span className="drug-name">{medsToCheck[index].name}</span>
                        <div className="slot-actions">
                          {currentUser && !savedMeds.some(m => m.name.toLowerCase() === medsToCheck[index].name.toLowerCase()) && (
                            <button 
                              className="save-mini-btn" 
                              title="Save to profile"
                              onClick={async () => {
                                const newMed = { 
                                  name: medsToCheck[index].name, 
                                  addedAt: new Date().toISOString() 
                                };
                                try {
                                  if (isPreviewMode) {
                                    const meds = JSON.parse(localStorage.getItem('preview_meds') || '[]');
                                    meds.push(newMed);
                                    localStorage.setItem('preview_meds', JSON.stringify(meds));
                                    fetchSavedMeds();
                                  } else {
                                    await updateDoc(doc(db, 'user_medications', currentUser.uid), {
                                      medications: arrayUnion(newMed)
                                    });
                                    fetchSavedMeds();
                                  }
                                } catch (e) {
                                  console.error(e);
                                }
                              }}
                            >
                              <Plus size={14} />
                            </button>
                          )}
                          <button onClick={() => removeDrug(index)}><Trash2 size={16} /></button>
                        </div>
                      </div>
                    ) : (
                      <span className="slot-placeholder">Slot {index + 1} {index < 1 ? '(Required)' : '(Optional)'}</span>
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

              {medsToCheck.length >= 1 && (
                <button 
                  className={`btn run-check-btn w-full mt-6 ${hasChecked ? 'btn-secondary' : 'btn-premium animate-pulse'}`} 
                  onClick={checkInteractions}
                  disabled={loading}
                >
                  {loading ? 'Analyzing Databases...' : hasChecked ? 'Refresh Report' : 'Generate Safety Report'}
                </button>
              )}
            </div>

            <div className="results-panel">
              {hasChecked && interactions.length > 0 ? (
                <div className="interaction-report animate-fade-in">
                  <div className="report-header glass-card mb-4">
                    <div className="active-badge mb-2">Clinical Interaction Report</div>
                    <div className="report-stat high">
                      <AlertTriangle size={24} />
                      <span>{interactions.length} Documented Conflict(s) Identified</span>
                    </div>
                  </div>
                  {interactions.map((inter, i) => (
                    <div key={i} className={`interaction-card glass-card severity-${inter.severity.toLowerCase()}`}>
                      <div className="severity-indicator">
                        <span className="dot"></span>
                        {inter.severity} Risk
                      </div>
                      <h4>{inter.drugs[0]} + {inter.drugs[1]}</h4>
                      <div className="report-details mt-2">
                        <div className="detail-row">
                          <strong>Clinical Assessment:</strong>
                          <p>{inter.description}</p>
                        </div>
                        {inter.details && (
                          <div className="detail-row mt-3">
                            <strong>Pharmacokinetic Mechanism:</strong>
                            <p>{inter.details}</p>
                          </div>
                        )}
                        {inter.significance && (
                          <div className="detail-row mt-3">
                            <strong>Significance:</strong>
                            <p>{inter.significance}</p>
                          </div>
                        )}
                        {inter.comment && inter.comment !== 'No additional clinical comments provided.' && (
                          <div className="detail-row mt-3">
                            <strong>Additional Notes:</strong>
                            <p>{inter.comment}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  <div className="pharmacist-note glass-card mt-4">
                    <Info size={20} className="shrink-0" />
                    <div>
                      <strong>Pharmacist Guidance:</strong>
                      <p>This report is generated using global medical standards (RxNav). These results indicate pharmacological conflicts that may require dosage adjustment or alternative prescription selection by your doctor.</p>
                    </div>
                  </div>
                </div>
              ) : hasChecked && interactions.length === 0 && !loading ? (
                <div className="no-interactions glass-card text-center animate-fade-in">
                  <CheckCircle2 size={48} className="icon-success" />
                  <h3>No Major Interactions Detected</h3>
                  <p>Based on our real-time clinical database query, {medsToCheck.length === 1 ? `"${medsToCheck[0].name}" does not yield any standardized risk alerts against standard Antiepileptic Drugs (AEDs)` : `your active combination of ${medsToCheck.length} medications does not yield any standardized risk alerts`}.</p>
                </div>
              ) : (
                <div className="empty-results-state glass-card text-center">
                  <Shield size={48} className="icon-muted" style={{ opacity: 0.3 }} />
                  <h3>Awaiting Analysis</h3>
                  <p>
                    {medsToCheck.length < 1 
                      ? "Add at least 1 medication to the slots to unlock the safety analyzer against Epilepsy drugs." 
                      : "Click 'Generate Safety Report' to run your clinical analysis."}
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
        .checker-page { padding: 0.5rem 1rem; padding-bottom: 6rem; max-width: 1300px; margin: 0 auto; }
        .checker-header-wrapper { display: flex; justify-content: center; width: 100%; margin-bottom: 2rem; background: linear-gradient(135deg, var(--primary), var(--secondary)); padding: 6rem 1rem 1.5rem; border-radius: 0 0 24px 24px; margin-top: -80px; position: relative; overflow: hidden; height: auto; border: none; }
        .checker-header-wrapper::before { content: ''; position: absolute; inset: 0; background: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 86c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zm66 3c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zm-46-45c5.523 0 10-4.477 10-10s-4.477-10-10-10-10 4.477-10 10 4.477 10 10 10zm0-20c3.314 0 6 2.686 6 6s-2.686 6-6 6-6-2.686-6-6 2.686-6 6-6zM94 46c3.314 0 6-2.686 6-6s-2.686-6-6-6-6 2.686-6 6 2.686-6 6 6zm0-5c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zM57 90c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm0-10c1.657 0 3 1.343 3 3s-1.343 3-3-3-3-1.343-3-3 1.343-3 3-3zm-35-45c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM8 30c3.314 0 6-2.686 6-6s-2.686-6-6-6-6 2.686-6 6 2.686-6 6 6zm0-5c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zm54 40c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3z' fill='%23ffffff' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E"); opacity: 0.5; }
        
        .checker-header { width: 100%; max-width: 900px; display: flex; flex-direction: column; align-items: center; position: relative; z-index: 10; }
        .checker-header h1 { font-size: 2rem; font-weight: 800; margin-bottom: 0.2rem; text-align: center; color: white !important; }
        .subtitle { color: rgba(255,255,255,0.95); font-size: 1rem; margin-top: 0; margin-bottom: 1.25rem; max-width: 700px; margin-left: auto; margin-right: auto; text-align: center; font-weight: 500; }
        
        .tab-switcher { display: flex; justify-content: center; gap: 1rem; }
        .tab-btn { 
          padding: 8px 24px; border: 2px solid rgba(255,255,255,0.3); background: transparent; 
          border-radius: 30px; font-weight: 700; color: white; cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); font-size: 1.05rem;
        }
        .tab-btn.active { background: white; color: var(--primary); border-color: white; box-shadow: 0 8px 24px rgba(0,0,0,0.15); }
        .tab-btn:hover:not(.active) { border-color: white; background: rgba(255,255,255,0.1); }
        
        .quick-check-layout { display: grid; grid-template-columns: 480px 1fr; gap: 4rem; align-items: flex-start; }
        .input-panel { padding: 3rem; border-radius: 24px; }
        .input-panel h3 { font-size: 1.8rem; margin-bottom: 1rem; font-weight: 900; }
        
        .slot-actions { display: flex; gap: 8px; }
        .save-mini-btn { background: rgba(126, 34, 206, 0.1); border: none; color: var(--primary); padding: 6px; border-radius: 6px; cursor: pointer; transition: all 0.2s; }
        .save-mini-btn:hover { background: var(--primary); color: white; }

        /* Multi Drug Slots */
        .multi-drug-slots { display: flex; flex-direction: column; gap: 12px; margin-bottom: 2rem; }
        .drug-slot { min-height: 64px; border-radius: 16px; display: flex; align-items: center; justify-content: center; border: 2px dashed rgba(126, 34, 206, 0.2); background: rgba(126, 34, 206, 0.02); }
        .drug-slot.filled { border-style: solid; border-color: rgba(126, 34, 206, 0.3); background: white; }
        .filled-slot { width: 100%; padding: 0 1.5rem; display: flex; align-items: center; gap: 1rem; }
        .filled-slot .drug-name { flex: 1; font-weight: 800; color: var(--text-main); font-size: 1.1rem; }
        
        .drug-input-form { margin-bottom: 1.5rem; }
        .input-group { position: relative; display: flex; align-items: center; width: 100%; }
        .input-icon { position: absolute; left: 1.5rem; color: var(--text-muted); z-index: 2; pointer-events: none; }
        .input-group .input-field { width: 100%; padding-left: 3.5rem; padding-right: 4rem; height: 64px; border-radius: 20px; font-weight: 700; border: 2px solid var(--border); font-size: 1.1rem; color: var(--text-main); outline: none; transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1); background: white; }
        .input-group .input-field:focus { border-color: var(--primary); box-shadow: 0 0 0 4px rgba(126, 34, 206, 0.1); }
        .input-group .add-btn { position: absolute; right: 10px; width: 44px; height: 44px; display: flex; align-items: center; justify-content: center; background: var(--primary); color: white; border: none; border-radius: 14px; cursor: pointer; transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1); }
        .input-group .add-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(126, 34, 206, 0.3); }
        .input-group .add-btn:disabled { opacity: 0.5; cursor: not-allowed; hover: none; transform: none; box-shadow: none; }

        .interaction-report { display: flex; flex-direction: column; gap: 1.5rem; }
        .report-header { padding: 2.5rem !important; }
        .report-stat { display: flex; align-items: center; gap: 1rem; font-size: 1.4rem; font-weight: 900; }
        .report-stat.high { color: #e11d48; }

        .interaction-card { padding: 2.5rem !important; position: relative; border-left: 8px solid #cbd5e1 !important; }
        .severity-indicator { display: flex; align-items: center; gap: 8px; font-weight: 800; font-size: 0.85rem; text-transform: uppercase; margin-bottom: 1rem; letter-spacing: 0.05em; }
        .severity-high { border-left-color: #e11d48 !important; }
        .severity-high .severity-indicator { color: #e11d48; }
        .severity-high .dot { width: 10px; height: 10px; background: #e11d48; border-radius: 50%; }
        
        .interaction-card h4 { font-size: 1.5rem; font-weight: 900; margin-bottom: 1.5rem; color: var(--text-main); }
        .report-details .detail-row { border-bottom: 1px solid rgba(0,0,0,0.05); padding-bottom: 1rem; margin-bottom: 1rem; }
        .report-details .detail-row:last-child { border-bottom: none; margin-bottom: 0; }
        .report-details strong { display: block; margin-bottom: 0.5rem; color: var(--primary); font-size: 0.95rem; text-transform: uppercase; letter-spacing: 0.05em; }
        .report-details p { color: var(--text-muted); line-height: 1.7; font-size: 1.05rem; margin: 0; }

        .pharmacist-note { padding: 2rem !important; display: flex; gap: 1.5rem; background: #eff6ff !important; border: 1px solid #bfdbfe !important; color: #1e40af; }
        .pharmacist-note strong { font-size: 1.1rem; display: block; margin-bottom: 0.5rem; }
        .pharmacist-note p { margin: 0; line-height: 1.6; }

        .empty-results-state { padding: 8rem 4rem; height: 600px; }
        
        .med-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 2rem; }
        .saved-med-card { padding: 2rem !important; border-radius: 20px; }

        @media (max-width: 1100px) {
          .quick-check-layout { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
};

export default InteractionChecker;
