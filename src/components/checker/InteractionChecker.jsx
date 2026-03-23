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

  const addDrug = async (e) => {
    e.preventDefault();
    if (!inputDrug.trim()) return;
    
    setLoading(true);
    try {
      const rxcui = await getRxCUI(inputDrug);
      if (rxcui) {
        setMedsToCheck(prev => [...prev, { name: inputDrug, rxcui }]);
        setInputDrug('');
      } else {
        alert("Drug not found in medical database. Please check the spelling.");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const removeDrug = (index) => {
    setMedsToCheck(prev => prev.filter((_, i) => i !== index));
    setInteractions([]);
  };

  const checkInteractions = async () => {
    if (medsToCheck.length < 2) return;
    setLoading(true);
    try {
      const rxcuis = medsToCheck.map(m => m.rxcui);
      const results = await getInteractions(rxcuis);
      setInteractions(results);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const saveToProfile = async (med) => {
    if (!currentUser) {
       onOpenAuth();
       return;
    }
    try {
      const docRef = doc(db, 'user_medications', currentUser.uid);
      await updateDoc(docRef, {
        medications: arrayUnion({ ...med, addedAt: new Date().toISOString() })
      });
      fetchSavedMeds();
      alert(`${med.name} saved to your profile.`);
    } catch (err) {
       // if doc doesn't exist
       await setDoc(docRef, { medications: [{ ...med, addedAt: new Date().toISOString() }] });
       fetchSavedMeds();
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
              <h3>Start a New Check</h3>
              <p>Add two or more medications to analyze potential risky interactions.</p>
              
              <form onSubmit={addDrug} className="drug-input-form">
                <div className="input-group">
                  <Pill className="input-icon" size={20} />
                  <input 
                    type="text" 
                    className="input-field" 
                    placeholder="Enter drug name (e.g. Advil, Tegretol)" 
                    value={inputDrug}
                    onChange={(e) => setInputDrug(e.target.value)}
                  />
                  <button type="submit" className="add-btn" disabled={loading}>
                    {loading ? <Loader2 className="animate-spin" /> : <Plus />}
                  </button>
                </div>
              </form>

              <div className="med-pills">
                {medsToCheck.map((med, i) => (
                  <div key={i} className="med-pill animate-fade-in">
                    <span>{med.name}</span>
                    <button onClick={() => removeDrug(i)}><Trash2 size={14} /></button>
                  </div>
                ))}
              </div>

              {medsToCheck.length >= 2 && (
                <button 
                  className="btn btn-primary run-check-btn w-full animate-pulse" 
                  onClick={checkInteractions}
                  disabled={loading}
                >
                  {loading ? 'Analyzing Interactions...' : 'Run Safety Analysis'}
                </button>
              )}
            </div>

            <div className="results-panel">
              {interactions.length > 0 ? (
                <div className="interaction-list">
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
                  <div className="medical-note glass-card">
                    <Info size={16} />
                    <p>This report is generated from the RxNav database. Always consult your pharmacist before making changes to your medication regimen.</p>
                  </div>
                </div>
              ) : medsToCheck.length >= 2 && !loading ? (
                <div className="no-interactions glass-card text-center">
                  <CheckCircle2 size={48} className="icon-success" />
                  <h3>No Major Interactions Found</h3>
                  <p>Based on our current clinical database, these medications do not show significant risks when taken together.</p>
                </div>
              ) : (
                <div className="empty-results-state glass-card text-center">
                  <Search size={48} className="icon-muted" />
                  <h3>Add Medications to Begin</h3>
                  <p>The results of your safety check will appear here.</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="saved-meds-layout glass-card">
            {!currentUser ? (
               <div className="login-prompt text-center">
                  <Shield size={48} className="icon-purple mb-4" />
                  <h3>Access Your Secure List</h3>
                  <p>Create an account to save your medication history and get personalized safety alerts.</p>
                  <button className="btn btn-primary mt-4" onClick={onOpenAuth}>Get Started Securely</button>
               </div>
            ) : (
              <div className="med-list-view">
                <h3>My Current Regimen</h3>
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
                    <p className="empty-text">Your list is currently empty. Add medications from the Quick Check tab to track them here.</p>
                  )}
                </div>
                {savedMeds.length >= 2 && (
                  <button className="btn btn-secondary mt-8" onClick={() => {
                    setMedsToCheck(savedMeds);
                    setActiveTab('quick');
                    checkInteractions();
                  }}>
                    Check All for Interactions <ArrowRight size={18} />
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      <style>{`
        .checker-page { padding-top: 2rem; padding-bottom: 6rem; max-width: 1200px; }
        .checker-header { padding: 4rem 2rem; text-align: center; margin-bottom: 3rem; }
        .icon-purple { color: var(--primary); }
        .subtitle { color: var(--text-muted); font-size: 1.1rem; margin-top: 0.5rem; margin-bottom: 3rem; }
        
        .tab-switcher { display: flex; justify-content: center; gap: 1rem; }
        .tab-btn { 
          padding: 12px 32px; border: 1.5px solid var(--border); background: white; 
          border-radius: 30px; font-weight: 700; color: var(--text-muted); cursor: pointer;
          transition: all 0.2s;
        }
        .tab-btn.active { background: var(--primary); color: white; border-color: var(--primary); box-shadow: 0 8px 24px rgba(157, 141, 241, 0.4); }
        
        .quick-check-layout { display: grid; grid-template-columns: 380px 1fr; gap: 3rem; align-items: flex-start; }
        .input-panel { padding: 2.5rem; }
        .input-panel h3 { margin-bottom: 1rem; }
        .input-panel p { font-size: 0.9rem; color: var(--text-muted); margin-bottom: 2rem; }
        
        .drug-input-form { margin-bottom: 2rem; }
        .input-group { position: relative; display: flex; align-items: center; }
        .input-icon { position: absolute; left: 1rem; color: var(--text-muted); }
        .input-group .input-field { padding-left: 3rem; padding-right: 4rem; width: 100%; height: 56px; }
        .add-btn { position: absolute; right: 8px; width: 40px; height: 40px; background: var(--primary); color: white; border: none; border-radius: 12px; cursor: pointer; display: flex; align-items: center; justify-content: center; }
        
        .med-pills { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 2rem; }
        .med-pill { display: flex; align-items: center; gap: 10px; padding: 8px 16px; background: #f4f1ff; border: 1px solid #dcd6ff; border-radius: 20px; color: var(--primary); font-weight: 600; font-size: 0.9rem; }
        .med-pill button { background: none; border: none; color: var(--primary); cursor: pointer; opacity: 0.6; }
        .med-pill button:hover { opacity: 1; }
        
        .result-stat { display: flex; align-items: center; gap: 15px; padding: 1.5rem 2rem; border-radius: 16px; margin-bottom: 2rem; font-weight: 800; font-size: 1.25rem; }
        .result-stat.warning { background: #fff5f5; color: #c53030; }
        .icon-success { color: var(--success); }
        
        .interaction-card { padding: 2rem; margin-bottom: 1.5rem; position: relative; border-left: 6px solid #ccc; }
        .severity-high { border-left-color: #e53e3e; }
        .severity-moderate { border-left-color: #dd6b20; }
        .severity-minor { border-left-color: #3182ce; }
        .severity-badge { position: absolute; top: 1.5rem; right: 2rem; font-size: 0.7rem; font-weight: 800; text-transform: uppercase; padding: 4px 10px; background: #eee; border-radius: 4px; }
        .severity-high .severity-badge { background: #fee2e2; color: #991b1b; }
        
        .empty-results-state, .no-interactions { padding: 6rem 3rem; }
        .medical-note { padding: 1.5rem; background: #f8fafc; font-size: 0.85rem; color: var(--text-muted); display: flex; gap: 12px; align-items: center; }
        
        .saved-meds-layout { padding: 4rem; min-height: 400px; }
        .med-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.5rem; }
        .saved-med-card { padding: 1.5rem; display: flex; align-items: center; gap: 1.5rem; border: 1.5px solid var(--border); }
        .med-details { flex: 1; display: flex; flex-direction: column; gap: 4px; }
        .med-details strong { font-size: 1.1rem; }
        .med-details span { font-size: 0.8rem; color: var(--text-muted); }
        
        @media (max-width: 900px) {
          .quick-check-layout { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
};

export default InteractionChecker;
