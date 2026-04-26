import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import { db, isPreviewMode } from '../../firebase/config';
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { 
  User, 
  History, 
  Pill, 
  LogOut, 
  ChevronRight, 
  Shield,
  Plus,
  Trash2,
  Loader2,
  Calendar
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getRxCUI } from '../../services/rxnav';

const UserProfile = () => {
  const { currentUser, logout } = useAuth();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  
  const [medications, setMedications] = useState([]);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [medInput, setMedInput] = useState('');
  const [addingMed, setAddingMed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      fetchUserData();
    }
  }, [currentUser]);

  const fetchUserData = async () => {
    setLoading(true);
    try {
      if (isPreviewMode) {
        const meds = JSON.parse(localStorage.getItem('preview_meds') || '[]');
        setMedications(meds);
        const udata = JSON.parse(localStorage.getItem('preview_user_data') || '{}');
        setUserData(udata);
      } else {
        const medRef = doc(db, 'user_medications', currentUser.uid);
        const medSnap = await getDoc(medRef);
        if (medSnap.exists()) {
          setMedications(medSnap.data().medications || []);
        }
        const profileRef = doc(db, 'user_profiles', currentUser.uid);
        const profileSnap = await getDoc(profileRef);
        if (profileSnap.exists()) {
          setUserData(profileSnap.data());
        }
      }
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddMed = async (e) => {
    e.preventDefault();
    if (!medInput.trim()) return;
    setAddingMed(true);
    
    try {
      const rxcui = await getRxCUI(medInput);
      const newMed = { name: medInput, rxcui: rxcui || 'unknown', addedAt: new Date().toISOString() };
      
      if (isPreviewMode) {
        const meds = JSON.parse(localStorage.getItem('preview_meds') || '[]');
        meds.push(newMed);
        localStorage.setItem('preview_meds', JSON.stringify(meds));
        setMedications(meds);
      } else {
        const medRef = doc(db, 'user_medications', currentUser.uid);
        const medSnap = await getDoc(medRef);
        if (!medSnap.exists()) {
          await setDoc(medRef, { medications: [newMed] });
        } else {
          await updateDoc(medRef, { medications: arrayUnion(newMed) });
        }
        setMedications(prev => [...prev, newMed]);
      }
      setMedInput('');
    } catch (err) {
      console.error('Error adding medication:', err);
    } finally {
      setAddingMed(false);
    }
  };

  const removeMed = async (index) => {
    const updated = medications.filter((_, i) => i !== index);
    setMedications(updated);
    if (isPreviewMode) {
      localStorage.setItem('preview_meds', JSON.stringify(updated));
    } else {
      try {
        const medRef = doc(db, 'user_medications', currentUser.uid);
        await updateDoc(medRef, { medications: updated });
      } catch (err) {
        console.error('Error removing medication:', err);
      }
    }
  };

  if (!currentUser) {
    return (
      <div className="container section-padding text-center" dir={isRTL ? 'rtl' : 'ltr'}>
        <Shield size={64} className="icon-muted mb-4" />
        <h1>{t('dashboard.secureTitle')}</h1>
        <p>{t('dashboard.secureDesc')}</p>
        <button onClick={() => navigate('/')} className="btn btn-primary mt-4">{t('dashboard.returnHome')}</button>
      </div>
    );
  }

  return (
    <div className="profile-page container section-padding animate-fade-in" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="dashboard-grid">
        {/* Sidebar */}
        <aside className="profile-sidebar">
          <div className="profile-card glass-card">
            <div className="avatar">{currentUser.email[0].toUpperCase()}</div>
            <h2>{currentUser.displayName || currentUser.email.split('@')[0]}</h2>
            <p className="email">{currentUser.email}</p>
            {isPreviewMode && <span className="badge badge-warning">{t('dashboard.previewMode')}</span>}
            
            {userData && (
              <div className="profile-details-box mt-4">
                {userData.patientName && (
                  <div className="detail-item"><strong>{t('dashboard.patientName')}:</strong> {userData.patientName}</div>
                )}
                <div className="detail-item"><strong>{t('dashboard.patientAge')}:</strong> {userData.age} ({parseInt(userData.age) < 12 ? t('dashboard.child') : parseInt(userData.age) >= 60 ? t('dashboard.senior') : t('dashboard.adult')})</div>
                <div className="detail-item"><strong>{t('dashboard.patientGender')}:</strong> {userData.gender === 'male' ? t('auth.male') : t('auth.female')}</div>
                {userData.gender === 'female' && (
                  <div className="detail-item"><strong>{t('dashboard.pregnant')}:</strong> {userData.isPregnant ? t('dashboard.yes') : t('dashboard.no')}</div>
                )}
              </div>
            )}

            <div className="profile-stats">
              <div className="stat">
                <strong>{medications.length}</strong>
                <span>{t('dashboard.drugsArchive')}</span>
              </div>
            </div>
            <button onClick={logout} className="btn btn-ghost full-width logout-btn">
              <LogOut size={18} /> {t('dashboard.logout')}
            </button>
          </div>
        </aside>

        {/* Main */}
        <main className="dashboard-main">

          {/* Summarization Section */}
          <section className="dashboard-section summary-section">
            <div className="glass-card summary-card bg-gradient">
              <h3>{t('dashboard.overviewTitle', 'Patient Overview')}</h3>
              <p>
                <strong>{currentUser.displayName || 'Patient'}</strong> is a {userData ? (parseInt(userData.age) < 18 ? 'child' : 'adult') : 'patient'} managing their regimen. 
                They currently have {medications.length} medication(s) registered. 
                {userData?.isPregnant ? ' Note: Patient is pregnant. Extra caution required for AEDs.' : ''}
              </p>
            </div>
          </section>

          {/* Scheduled Drugs Section */}
          <section className="dashboard-section">
            <div className="section-header">
              <h3><Calendar size={20} /> {t('dashboard.scheduledDrugs', 'Scheduled Regimen')}</h3>
            </div>
            <div className="glass-card">
              {medications.length > 0 ? (
                <div className="scheduled-list">
                  {medications.map((med, i) => (
                    <div key={i} className="schedule-item">
                      <div className="time-badge">08:00 AM</div>
                      <div className="schedule-details">
                        <h4>{med.name}</h4>
                        <p>Take 1 pill as prescribed</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="empty-mini">{t('dashboard.noMeds')}</p>
              )}
            </div>
          </section>

          <section className="dashboard-section">
            <div className="section-header">
              <h3><Pill size={20} /> {t('dashboard.myMeds')}</h3>
            </div>
            <div className="med-manager-card glass-card">
              <form onSubmit={handleAddMed} className="med-input-compact">
                <input 
                  type="text" 
                  value={medInput}
                  onChange={(e) => setMedInput(e.target.value)}
                  placeholder={t('dashboard.addPlaceholder')}
                  disabled={addingMed}
                />
                <button type="submit" disabled={addingMed}>
                  {addingMed ? <Loader2 className="animate-spin" /> : <Plus />}
                </button>
              </form>
              <div className="med-list-dashboard">
                {medications.length > 0 ? medications.map((med, i) => (
                  <div key={i} className="med-item-mini">
                    <span>{med.name}</span>
                    <button onClick={() => removeMed(i)}><Trash2 size={16} /></button>
                  </div>
                )) : <p className="empty-mini">{t('dashboard.noMeds')}</p>}
              </div>
            </div>
          </section>
        </main>
      </div>

      <style>{`
        .profile-page { padding-top: 2rem; padding-bottom: 8rem; }
        .dashboard-grid { display: grid; grid-template-columns: 280px 1fr; gap: 3rem; }
        .profile-sidebar { position: sticky; top: 100px; height: fit-content; }
        .profile-card { padding: 3rem 2rem; text-align: center; }
        .avatar { width: 64px; height: 64px; background: var(--primary); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem; font-size: 1.5rem; font-weight: 800; }
        .profile-card h2 { font-size: 1.25rem; margin-bottom: 0.25rem; }
        .email { font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1.5rem; }
        .badge-warning { background: #fffbeb; color: #92400e; font-size: 0.7rem; padding: 4px 8px; border-radius: 4px; font-weight: 700; margin-bottom: 2rem; display: inline-block; }
        
        .profile-stats { display: flex; justify-content: space-around; padding: 1.5rem 0; border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); margin: 1.5rem 0; }
        .stat { display: flex; flex-direction: column; gap: 4px; }
        .stat strong { font-size: 1.15rem; }
        .stat span { font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700; }
        .logout-btn { color: #c0392b !important; }

        .dashboard-main { display: flex; flex-direction: column; gap: 4rem; }
        .section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; }
        .section-header h3 { display: flex; align-items: center; gap: 10px; font-size: 1.15rem; }
        
        .profile-details-box { background: rgba(0,0,0,0.03); padding: 1rem; border-radius: 12px; margin-bottom: 1.5rem; text-align: left; }
        .detail-item { font-size: 0.9rem; margin-bottom: 0.4rem; color: var(--text-secondary); }
        .detail-item strong { color: var(--text-main); }
        
        .summary-card { padding: 1.5rem 2rem; background: linear-gradient(135deg, rgba(126, 34, 206, 0.05), rgba(79, 70, 229, 0.05)); border-inline-start: 4px solid var(--primary); }
        .summary-card h3 { font-size: 1.25rem; font-weight: 800; margin-bottom: 0.75rem; color: var(--text-main); }
        .summary-card p { font-size: 1rem; color: var(--text-secondary); line-height: 1.6; }

        .scheduled-list { display: flex; flex-direction: column; gap: 1rem; padding: 1.5rem; }
        .schedule-item { display: flex; align-items: center; gap: 1.5rem; padding-bottom: 1rem; border-bottom: 1px solid var(--border); }
        .schedule-item:last-child { border-bottom: none; padding-bottom: 0; }
        .time-badge { background: #f0fdf4; color: #166534; font-weight: 800; font-size: 0.9rem; padding: 8px 12px; border-radius: 8px; border: 1px solid #bbf7d0; white-space: nowrap; }
        .schedule-details h4 { font-size: 1.1rem; font-weight: 700; margin-bottom: 0.25rem; color: var(--text-main); }
        .schedule-details p { font-size: 0.9rem; color: var(--text-muted); }

        .med-manager-card { padding: 2rem; }
        .med-input-compact { display: flex; gap: 8px; margin-bottom: 1.5rem; }
        .med-input-compact input { flex: 1; height: 44px; border: 1.5px solid var(--border); border-radius: 8px; padding: 0 1rem; }
        .med-input-compact button { width: 44px; height: 44px; background: var(--primary); color: white; border: none; border-radius: 8px; display: flex; align-items: center; justify-content: center; cursor: pointer; }
        .med-list-dashboard { display: flex; flex-direction: column; gap: 8px; }
        .med-item-mini { display: flex; align-items: center; justify-content: space-between; padding: 10px 14px; background: white; border: 1px solid var(--border); border-radius: 8px; }
        .med-item-mini span { font-weight: 600; font-size: 0.9rem; }
        .med-item-mini button { background: none; border: none; color: var(--text-muted); cursor: pointer; }
        .empty-mini { text-align: center; color: var(--text-muted); font-size: 0.85rem; padding: 1rem; }

        @media (max-width: 900px) {
          .dashboard-grid { grid-template-columns: 1fr; }
          .profile-sidebar { position: relative; top: 0; }
        }
      `}</style>
    </div>
  );
};

export default UserProfile;
