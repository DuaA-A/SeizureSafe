import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getInteractions, getRxCUI, BASELINE_EPILEPSY_DRUGS } from '../../services/rxnav';
import { getOpenFdaData } from '../../services/openFDA';
import { FOOD_INTERACTIONS } from '../../utils/foodInteractions';
import { 
  Pill, Search, AlertTriangle, CheckCircle2, Plus, Trash2, 
  Loader2, Shield, ArrowRight, Info, Coffee, RefreshCw
} from 'lucide-react';
import { db, isPreviewMode } from '../../firebase/config';
import { doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';

const InteractionChecker = ({ onOpenAuth }) => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('quick');
  const [inputDrug, setInputDrug] = useState('');
  const [medsToCheck, setMedsToCheck] = useState([]);
  
  const [reportData, setReportData] = useState({
    interactions: [],
    foodWarnings: [],
    checked: false
  });
  
  const [loading, setLoading] = useState(false);
  const [savedMeds, setSavedMeds] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');

  const MAX_DRUGS = 4;

  useEffect(() => {
    if (currentUser) fetchSavedMeds();
  }, [currentUser]);

  const fetchSavedMeds = async () => {
    try {
      if (isPreviewMode) {
        setSavedMeds(JSON.parse(localStorage.getItem('preview_meds') || '[]'));
      } else {
        const docSnap = await getDoc(doc(db, 'user_medications', currentUser.uid));
        if (docSnap.exists()) setSavedMeds(docSnap.data().medications || []);
      }
    } catch (err) {
      console.error('Error fetching meds:', err);
    }
  };

  const addDrug = async (e, forcedDrugName = null) => {
    if (e) e.preventDefault();
    const drugName = forcedDrugName || inputDrug;
    if (!drugName.trim()) return;
    if (medsToCheck.length >= MAX_DRUGS) return setErrorMsg(`Maximum ${MAX_DRUGS} medications allowed.`);
    if (medsToCheck.some(m => m.name.toLowerCase() === drugName.toLowerCase())) {
      setErrorMsg(`"${drugName}" is already added.`);
      return;
    }
    
    setLoading(true);
    setErrorMsg('');
    setReportData(prev => ({ ...prev, checked: false }));
    try {
      const rxcui = await getRxCUI(drugName);
      if (rxcui) {
        setMedsToCheck(prev => [...prev, { name: drugName, rxcui }]);
        if (!forcedDrugName) setInputDrug('');
      } else {
        setErrorMsg(`"${drugName}" not found in RxNav database. Check spelling.`);
      }
    } catch (err) {
      setErrorMsg("Network error connecting to drug database.");
    } finally {
      setLoading(false);
    }
  };

  const removeDrug = (index) => {
    setMedsToCheck(prev => prev.filter((_, i) => i !== index));
    setReportData({ interactions: [], foodWarnings: [], checked: false });
    setErrorMsg('');
  };

  const checkInteractions = async () => {
    if (medsToCheck.length < 1) {
      return setErrorMsg("Please add at least 1 medication to check.");
    }
    setLoading(true);
    setErrorMsg('');
    
    try {
      // 1. Gather RxCUIs from user input
      let allRxcuis = medsToCheck.map(m => m.rxcui);
      
      // Auto-inject baseline drugs if there isn't one already (to ensure drug vs epilepsy drug checks)
      const hasEpilepsyDrug = medsToCheck.some(m => 
        BASELINE_EPILEPSY_DRUGS.some(base => base.toLowerCase() === m.name.toLowerCase())
      );
      
      let baselineMedNames = [];
      if (!hasEpilepsyDrug) {
        // Fetch rxcui for baseline drugs to compare against
        for (const baseDrug of BASELINE_EPILEPSY_DRUGS.slice(0, 3)) { // Limit to 3 to avoid extreme API times
          const id = await getRxCUI(baseDrug);
          if (id) {
            allRxcuis.push(id);
            baselineMedNames.push(baseDrug);
          }
        }
      }

      // 2. Fetch standard Drug-Drug interactions
      const interactionsRes = await getInteractions(allRxcuis);
      
      // Filter out interactions that are only between the hidden baseline drugs
      const userMedNamesLower = medsToCheck.map(m => m.name.toLowerCase());
      
      const relevantInteractions = interactionsRes.filter(inter => {
        if (!hasEpilepsyDrug) {
           // We injected baseline meds. Only show if at least ONE of the interacting drugs is a User drug.
           const drgALower = inter.drugA.toLowerCase();
           const drgBLower = inter.drugB.toLowerCase();
           const touchesUserMed = userMedNamesLower.some(umed => drgALower.includes(umed) || drgBLower.includes(umed));
           return touchesUserMed;
        }
        return true;
      });

      // 3. Fetch Food and Warning Interactions (OpenFDA + Local logic)
      let foodWarnings = [];
      for (const med of medsToCheck) {
        const medNameLower = med.name.toLowerCase();
        
        // Check local food interactions first
        if (FOOD_INTERACTIONS[medNameLower]) {
          foodWarnings.push({
            drug: med.name,
            ...FOOD_INTERACTIONS[medNameLower],
            source: 'Verified Clinical Baseline'
          });
        }
        
        // Check OpenFDA
        const fdaData = await getOpenFdaData(med.name);
        if (fdaData && fdaData.foodRules) {
          foodWarnings.push({
            drug: med.name,
            avoidFoods: fdaData.foodRules,
            timing: "As directed",
            instructions: fdaData.dosAndDonts || "Follow FDA label guidelines.",
            source: 'FDA Label'
          });
        }
      }

      setReportData({
        interactions: relevantInteractions,
        foodWarnings: foodWarnings,
        checked: true
      });
      
    } catch (err) {
      console.error(err);
      setErrorMsg("Failed to generate complete interaction report.");
    } finally {
      setLoading(false);
    }
  };

  const getSeverityClass = (sev) => {
    switch(sev?.toLowerCase()) {
      case 'high': return 'bg-red-50 border-red-500';
      case 'moderate': return 'bg-orange-50 border-orange-500';
      default: return 'bg-green-50 border-green-500';
    }
  };

  const getSeverityIcon = (sev) => {
    switch(sev?.toLowerCase()) {
      case 'high': return <AlertTriangle className="text-red-600" size={24} />;
      case 'moderate': return <AlertTriangle className="text-orange-600" size={24} />;
      default: return <Info className="text-green-600" size={24} />;
    }
  };

  return (
    <div className="checker-page container animate-fade-in pb-20">
      <div className="checker-header-wrapper">
        <div className="checker-header">
           <Shield size={48} className="text-white mb-4 mx-auto opacity-90" />
           <h1 className="text-4xl font-extrabold text-white mb-2 text-center">Medication Safety Center</h1>
           <p className="subtitle text-center mb-6">Live dynamic validation checking your prescriptions against epilepsy therapies and food interactions.</p>
           
           <div className="flex justify-center gap-4">
             <button className={`tab-btn ${activeTab === 'quick' ? 'active' : ''}`} onClick={() => setActiveTab('quick')}>Safety Analyzer</button>
             <button className={`tab-btn ${activeTab === 'saved' ? 'active' : ''}`} onClick={() => setActiveTab('saved')}>My Archive</button>
           </div>
        </div>
      </div>

      <div className="checker-body mt-8">
        {activeTab === 'quick' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
             
             {/* Left Column: Input */}
             <div className="lg:col-span-5">
               <div className="glass-card p-6">
                 <h3 className="text-2xl font-bold mb-2">Build Regimen</h3>
                 <p className="text-gray-600 mb-6">Add drugs below. We automatically cross-reference these against baseline epilepsy treatments.</p>
                 
                 <div className="flex flex-col gap-3 mb-6">
                  {[...Array(MAX_DRUGS)].map((_, index) => (
                    <div key={index} className={`flex items-center gap-3 p-3 rounded-xl border-2 ${medsToCheck[index] ? 'border-purple-200 bg-white' : 'border-dashed border-gray-200 bg-gray-50'}`}>
                      {medsToCheck[index] ? (
                        <>
                          <Pill size={20} className="text-purple-600" />
                          <span className="font-bold flex-1">{medsToCheck[index].name}</span>
                          <button onClick={() => removeDrug(index)} className="text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={18} /></button>
                        </>
                      ) : (
                        <span className="text-gray-400 pl-2">Slot {index + 1} {index === 0 ? '(Required)' : '(Optional)'}</span>
                      )}
                    </div>
                  ))}
                 </div>

                 {medsToCheck.length < MAX_DRUGS && (
                   <form onSubmit={(e) => addDrug(e)} className="relative mb-4">
                     <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                     <input 
                       type="text" 
                       className="w-full h-14 pl-12 pr-16 rounded-xl border-2 border-gray-200 focus:border-purple-500 outline-none font-semibold transition-all"
                       placeholder="e.g. Ibuprofen"
                       value={inputDrug}
                       disabled={loading}
                       onChange={(e) => setInputDrug(e.target.value)}
                     />
                     <button type="submit" disabled={loading || !inputDrug.trim()} className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-purple-600 text-white rounded-lg flex items-center justify-center disabled:opacity-50 hover:bg-purple-700 transition">
                       {loading ? <Loader2 size={18} className="animate-spin" /> : <Plus size={18} />}
                     </button>
                   </form>
                 )}

                 {errorMsg && (
                    <div className="p-3 bg-red-50 text-red-600 rounded-lg flex items-center gap-2 mb-4 text-sm font-semibold">
                      <AlertTriangle size={16} /> {errorMsg}
                    </div>
                 )}

                 {medsToCheck.length > 0 && (
                   <button 
                     className="w-full h-14 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-lg hover:shadow-lg transition-all flex items-center justify-center gap-2 mt-4"
                     onClick={checkInteractions}
                     disabled={loading}
                   >
                     {loading ? <><RefreshCw className="animate-spin" size={20} /> Analyzing...</> : 'Generate Full Report'}
                   </button>
                 )}
               </div>
             </div>

             {/* Right Column: Output */}
             <div className="lg:col-span-7">
               {loading ? (
                 <div className="space-y-4">
                   <div className="h-24 bg-gray-200 rounded-2xl animate-pulse"></div>
                   <div className="h-32 bg-gray-200 rounded-2xl animate-pulse"></div>
                   <div className="h-48 bg-gray-200 rounded-2xl animate-pulse"></div>
                 </div>
               ) : reportData.checked ? (
                 <div className="space-y-6 animate-fade-in cursor-default">
                    
                    {/* Drug vs Drug */}
                    <div className="glass-card p-6 border-t-8 border-purple-500">
                      <h3 className="text-2xl font-bold flex items-center gap-3 mb-6"><Pill className="text-purple-600" /> API Drug Interactions</h3>
                      
                      {reportData.interactions.length === 0 ? (
                        <div className="p-6 bg-green-50 rounded-xl flex items-center gap-4 border border-green-200">
                          <CheckCircle2 size={32} className="text-green-600 shrink-0" />
                          <p className="text-green-800 font-medium">No standardized adverse drug-drug interactions detected between your inputs and baseline epilepsy medications in the RxNav database.</p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {reportData.interactions.map((inter, idx) => (
                            <div key={idx} className={`p-5 rounded-xl border-l-4 ${getSeverityClass(inter.severity)}`}>
                              <div className="flex items-start gap-4">
                                <div className="shrink-0 mt-1">{getSeverityIcon(inter.severity)}</div>
                                <div>
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className={`text-xs font-bold uppercase tracking-wider ${inter.severity === 'High' ? 'text-red-700' : inter.severity === 'Moderate' ? 'text-orange-700' : 'text-green-700'}`}>
                                      {inter.severity} Risk
                                    </span>
                                  </div>
                                  <h4 className="font-bold text-lg text-gray-900 mb-2">{inter.drugA} + {inter.drugB}</h4>
                                  <p className="text-gray-700 mb-2 text-sm leading-relaxed"><strong>Description:</strong> {inter.description}</p>
                                  <p className="text-gray-600 text-sm leading-relaxed bg-white/50 p-2 rounded"><strong>Note:</strong> {inter.recommendation}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Food & Lifestyle */}
                    <div className="glass-card p-6 border-t-8 border-amber-500">
                      <h3 className="text-2xl font-bold flex items-center gap-3 mb-6"><Coffee className="text-amber-600" /> Food & Lifestyle Alerts</h3>
                      
                      {reportData.foodWarnings.length === 0 ? (
                        <div className="p-6 bg-gray-50 rounded-xl flex items-center gap-4 border border-gray-200">
                          <Info size={32} className="text-gray-400 shrink-0" />
                          <p className="text-gray-600 font-medium">No major food or lifestyle restrictions identified in OpenFDA or local clinical protocols for these specific medications.</p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {reportData.foodWarnings.map((warning, idx) => (
                            <div key={idx} className="p-5 bg-amber-50 rounded-xl border border-amber-200">
                              <h4 className="font-bold text-amber-900 text-lg mb-3 border-b border-amber-200 pb-2">{warning.drug}</h4>
                              
                              {warning.avoidFoods && warning.avoidFoods.length > 0 && (
                                <div className="mb-3">
                                  <strong className="text-sm font-bold text-amber-800 block mb-1 uppercase tracking-wide">Must Avoid:</strong>
                                  <ul className="list-disc ml-5 text-gray-800 text-sm">
                                    {warning.avoidFoods.map((f, i) => <li key={i}>{f}</li>)}
                                  </ul>
                                </div>
                              )}
                              {warning.timing && (
                                <div className="mb-3">
                                  <strong className="text-sm font-bold text-amber-800 block mb-1 uppercase tracking-wide">Administration Timing:</strong>
                                  <p className="text-gray-800 text-sm">{warning.timing}</p>
                                </div>
                              )}
                              {warning.instructions && (
                                <div>
                                  <strong className="text-sm font-bold text-amber-800 block mb-1 uppercase tracking-wide">Clinical Instruction:</strong>
                                  <p className="text-gray-800 text-sm leading-relaxed">{warning.instructions}</p>
                                </div>
                              )}
                              <p className="text-xs text-amber-600/70 mt-3 pt-2 border-t border-amber-200/50 italic">Source: {warning.source}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    {/* Disclaimer */}
                    <div className="bg-blue-50/50 border border-blue-100 p-4 rounded-xl text-blue-800 text-sm">
                      <strong>Medical Disclaimer:</strong> This application relies on NIH RxNav and OpenFDA APIs strictly for educational purposes. 
                      Drug interactions are complex and dependent on your specific health history. Do not alter your medication regiment without consulting your doctor or pharmacist.
                    </div>

                 </div>
               ) : (
                 <div className="h-full min-h-[400px] flex flex-col items-center justify-center p-8 text-center bg-white/40 rounded-2xl border-2 border-dashed border-gray-300">
                   <Shield size={64} className="text-gray-300 mb-4" />
                   <h3 className="text-xl font-bold text-gray-400 mb-2">Awaiting Analysis</h3>
                   <p className="text-gray-500 max-w-sm">Enter your prescriptions and click generate to retrieve safety protocols across multiple health databases.</p>
                 </div>
               )}
             </div>

          </div>
        ) : (
          /* Saved Tab */
          <div className="glass-card p-8">
            {!currentUser ? (
              <div className="text-center py-12">
                <Shield size={48} className="text-purple-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Access Your Archive</h3>
                <p className="text-gray-600 mb-6">Log in to save drugs across sessions.</p>
                <button className="btn btn-premium" onClick={onOpenAuth}>Log In Securely</button>
              </div>
            ) : (
              <div>
                <h3 className="text-2xl font-bold mb-6">Saved Prescriptions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {savedMeds.length > 0 ? savedMeds.map((m, i) => (
                    <div key={i} className="p-4 border-2 border-gray-100 rounded-xl bg-white flex items-center justify-between shadow-sm">
                      <div>
                        <strong className="block text-lg">{m.name}</strong>
                        <span className="text-xs text-gray-400">Archived: {new Date(m.addedAt).toLocaleDateString()}</span>
                      </div>
                      <Pill size={20} className="text-purple-600" />
                    </div>
                  )) : (
                    <p className="col-span-full text-gray-500 italic p-8 text-center bg-gray-50 rounded-xl border border-dashed border-gray-200">No medications saved to your profile yet.</p>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <style>{`
        .checker-header-wrapper { background: linear-gradient(135deg, var(--primary), var(--secondary)); padding: 6rem 1rem 2.5rem; border-radius: 0 0 32px 32px; margin-top: -80px; }
        .tab-btn { padding: 10px 24px; border-radius: 30px; font-weight: 700; color: white; background: rgba(255,255,255,0.1); border: 2px solid transparent; transition: all 0.3s; }
        .tab-btn.active { background: white; color: var(--primary); box-shadow: 0 4px 15px rgba(0,0,0,0.1); }
        .tab-btn:hover:not(.active) { border-color: rgba(255,255,255,0.5); }
        
        .bg-red-50 { background-color: #fef2f2; }
        .bg-orange-50 { background-color: #fff7ed; }
        .bg-green-50 { background-color: #f0fdf4; }
        .border-red-500 { border-color: #ef4444; }
        .border-orange-500 { border-color: #f97316; }
        .border-green-500 { border-color: #22c55e; }
        .text-red-600 { color: #dc2626; }
        .text-orange-600 { color: #ea580c; }
        .text-green-600 { color: #16a34a; }
        .text-red-700 { color: #b91c1c; }
        .text-orange-700 { color: #c2410c; }
        .text-green-700 { color: #15803d; }
      `}</style>
    </div>
  );
};

export default InteractionChecker;
