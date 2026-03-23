import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../firebase/config';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { 
  Pill, 
  Search, 
  Trash2, 
  AlertTriangle, 
  Info, 
  CheckCircle,
  Plus,
  Loader2
} from 'lucide-react';
import { getRxCUI, getInteractions } from '../../services/rxnav';

const InteractionChecker = ({ onOpenAuth }) => {
  const { currentUser } = useAuth();
  const [meds, setMeds] = useState([]);
  const [inputMed, setInputMed] = useState('');
  const [interactions, setInteractions] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (currentUser) {
      loadSavedMeds();
    }
  }, [currentUser]);

  const loadSavedMeds = async () => {
    try {
      const docRef = doc(db, 'user_medications', currentUser.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setMeds(docSnap.data().medications || []);
      }
    } catch (err) {
      console.error('Error loading meds:', err);
    }
  };

  const saveMeds = async (newMeds) => {
    if (!currentUser) return;
    try {
      await setDoc(doc(db, 'user_medications', currentUser.uid), {
        medications: newMeds,
        updatedAt: new Date()
      });
    } catch (err) {
      console.error('Error saving meds:', err);
    }
  };

  const handleAddMed = async (e) => {
    e.preventDefault();
    if (!inputMed.trim()) return;
    
    setIsSearching(true);
    setError(null);
    
    const rxcui = await getRxCUI(inputMed);
    if (!rxcui) {
      setError(`Could not find "${inputMed}". Please check the spelling.`);
      setIsSearching(false);
      return;
    }

    if (meds.some(m => m.rxcui === rxcui)) {
      setError(`"${inputMed}" is already in your list.`);
      setIsSearching(false);
      return;
    }

    const newMeds = [...meds, { name: inputMed, rxcui }];
    setMeds(newMeds);
    setInputMed('');
    setIsSearching(false);
    saveMeds(newMeds);
    checkForInteractions(newMeds);
  };

  const handleRemoveMed = (index) => {
    const newMeds = meds.filter((_, i) => i !== index);
    setMeds(newMeds);
    saveMeds(newMeds);
    checkForInteractions(newMeds);
  };

  const checkForInteractions = async (currentMeds) => {
    if (currentMeds.length < 2) {
      setInteractions([]);
      return;
    }
    const rxcuis = currentMeds.map(m => m.rxcui);
    const results = await getInteractions(rxcuis);
    setInteractions(results);
  };

  return (
    <div className="checker-page animate-fade-in">
      <div className="checker-header">
        <h1>Drug Interaction Checker</h1>
        <p>Ensure your medications are safe to take together. Powered by RxNorm.</p>
      </div>

      <div className="checker-grid">
        <div className="meds-section glass-card">
          <h3>Your Medications</h3>
          <form onSubmit={handleAddMed} className="med-input-group">
            <input 
              type="text" 
              className="input-field" 
              placeholder="Enter drug name (e.g. Advil, Lamictal)" 
              value={inputMed}
              onChange={(e) => setInputMed(e.target.value)}
            />
            <button type="submit" className="btn btn-primary" disabled={isSearching}>
              {isSearching ? <Loader2 className="animate-spin" size={20} /> : <Plus size={20} />}
            </button>
          </form>

          {error && <div className="error-text">{error}</div>}

          <div className="meds-list">
            {meds.length === 0 ? (
              <div className="empty-state">
                <Pill size={48} className="empty-icon" />
                <p>No medications added yet.</p>
              </div>
            ) : (
              meds.map((med, index) => (
                <div key={index} className="med-item glass-card">
                  <div className="med-info">
                    <Pill size={18} className="choice-icon" />
                    <span>{med.name}</span>
                  </div>
                  <button onClick={() => handleRemoveMed(index)} className="btn-icon delete-btn">
                    <Trash2 size={18} />
                  </button>
                </div>
              ))
            )}
          </div>
          
          {!currentUser && meds.length > 0 && (
            <p className="warning-text small">Log in to save this list permanently.</p>
          )}
        </div>

        <div className="results-section glass-card">
          <h3>Interaction Results</h3>
          {meds.length < 2 ? (
            <div className="info-box">
              <Info size={24} />
              <p>Add at least two medications to check for interactions.</p>
            </div>
          ) : interactions.length === 0 ? (
            <div className="safe-box">
              <CheckCircle size={24} />
              <p>No major interactions found between these drugs in the RxNav database.</p>
            </div>
          ) : (
            <div className="interactions-list">
              {interactions.map((int, index) => (
                <div key={index} className={`interaction-card ${int.severity.toLowerCase()}`}>
                  <div className="interaction-header">
                    <AlertTriangle size={20} />
                    <strong>{int.severity} Severity</strong>
                  </div>
                  <p className="interaction-desc">{int.description}</p>
                  <p className="involved-drugs">Involves: {int.drugs.join(' + ')}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="checker-footer glass-card">
        <AlertTriangle className="warning-icon" />
        <p><strong>Disclaimer:</strong> This tool is for educational purposes only. Always consult with your doctor or pharmacist before changing your medication regimen.</p>
      </div>

      <style>{`
        .checker-page {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        .checker-header { text-align: center; margin-bottom: 2rem; }
        .checker-header h1 { font-size: 2.5rem; }
        .checker-header p { color: var(--text-secondary); }
        .checker-grid {
          display: grid;
          grid-template-columns: 400px 1fr;
          gap: 2rem;
        }
        .meds-section, .results-section { padding: 2.5rem; }
        .meds-section h3, .results-section h3 { margin-bottom: 1.5rem; }
        .med-input-group {
          display: flex;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
        }
        .meds-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .med-item {
          padding: 1rem 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: var(--glass);
        }
        .med-info { display: flex; align-items: center; gap: 0.75rem; }
        .empty-state {
          text-align: center;
          padding: 3rem;
          color: var(--text-secondary);
        }
        .empty-icon { opacity: 0.2; margin-bottom: 1rem; }
        .error-text {
          color: var(--error);
          font-size: 0.85rem;
          margin-bottom: 1rem;
        }
        .info-box, .safe-box {
          padding: 2rem;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          color: var(--text-secondary);
          background: var(--glass);
          border-radius: 16px;
        }
        .safe-box { color: var(--success); }
        .interaction-card {
          padding: 1.5rem;
          border-radius: 12px;
          margin-bottom: 1rem;
          background: rgba(239, 68, 68, 0.05);
          border-left: 5px solid var(--error);
        }
        .interaction-card.high { border-left-color: var(--error); background: rgba(239, 68, 68, 0.1); }
        .interaction-card.moderate { border-left-color: var(--warning); background: rgba(234, 179, 8, 0.1); }
        .interaction-header { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem; }
        .interaction-desc { font-size: 0.95rem; line-height: 1.5; }
        .involved-drugs { margin-top: 1rem; font-size: 0.85rem; opacity: 0.7; font-weight: 600; }
        .checker-footer {
          padding: 1.5rem;
          display: flex;
          align-items: center;
          gap: 1.5rem;
          background: rgba(234, 179, 8, 0.05);
          border: 1px solid rgba(234, 179, 8, 0.2);
        }
        .warning-icon { color: var(--warning); }
        .animate-spin { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @media (max-width: 900px) {
          .checker-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
};

export default InteractionChecker;
