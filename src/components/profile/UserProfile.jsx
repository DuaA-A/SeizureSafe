import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../firebase/config';
import { collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore';
import { 
  User, 
  History, 
  Pill, 
  ChevronRight, 
  Calendar,
  AlertCircle
} from 'lucide-react';

const UserProfile = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [meds, setMeds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) {
      navigate('/');
      return;
    }
    loadUserData();
  }, [currentUser]);

  const loadUserData = async () => {
    setLoading(true);
    try {
      // Load Questionnaire History
      const q = query(
        collection(db, 'questionnaire_results'),
        where('userId', '==', currentUser.uid),
        orderBy('timestamp', 'desc'),
        limit(5)
      );
      const querySnapshot = await getDocs(q);
      const historyData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setHistory(historyData);

      // Load Medications (from the checker collection)
      const medRef = collection(db, 'user_medications');
      const medSnap = await getDocs(query(medRef, where('__name__', '==', currentUser.uid)));
      if (!medSnap.empty) {
        setMeds(medSnap.docs[0].data().medications || []);
      }
    } catch (err) {
      console.error('Error loading user data:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading your profile...</div>;

  return (
    <div className="profile-page animate-fade-in">
      <div className="profile-header glass-card">
        <div className="profile-avatar">
          <User size={48} />
        </div>
        <div className="profile-info">
          <h1>{currentUser.displayName}</h1>
          <p>{currentUser.email}</p>
        </div>
        <div className="profile-stats">
          <div className="stat">
            <span className="stat-value">{history.length}</span>
            <span className="stat-label">Assessments</span>
          </div>
          <div className="stat">
            <span className="stat-value">{meds.length}</span>
            <span className="stat-label">Medications</span>
          </div>
        </div>
      </div>

      <div className="profile-grid">
        <div className="history-section glass-card">
          <div className="section-header">
            <History size={20} />
            <h3>Recent Assessments</h3>
          </div>

          <div className="history-list">
            {history.length === 0 ? (
              <div className="empty-history">
                <p>No assessments yet.</p>
                <button className="btn btn-primary btn-small" onClick={() => navigate('/questionnaire')}>Take First Assessment</button>
              </div>
            ) : (
              history.map((item) => (
                <div key={item.id} className="history-item glass-card">
                  <div className="item-main">
                    <span className="item-date">
                      <Calendar size={14} /> 
                      {item.timestamp?.toDate().toLocaleDateString()}
                    </span>
                    <h4>{item.result.name}</h4>
                  </div>
                  <div className="item-badge badge badge-low">
                    {item.result.category}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="meds-snapshot glass-card">
          <div className="section-header">
            <Pill size={20} />
            <h3>Your Medications</h3>
          </div>
          <div className="meds-list-simple">
            {meds.length === 0 ? (
              <p className="empty-text">No medications listed.</p>
            ) : (
              meds.map((med, index) => (
                <div key={index} className="med-tag">
                  {med.name}
                </div>
              ))
            )}
          </div>
          <button className="btn btn-secondary w-full" onClick={() => navigate('/checker')}>
            Manage Medications <ChevronRight size={16} />
          </button>
        </div>

        <div className="tips-section glass-card full-width">
          <div className="section-header">
            <AlertCircle size={20} className="warning-icon" />
            <h3>Personalized Recommendations</h3>
          </div>
          <div className="tips-grid">
            {history.length > 0 ? (
              <div className="tip-card">
                <p>Based on your last assessment ({history[0].result.name}), we recommend:</p>
                <p className="tip-text">{history[0].result.lifestyle}</p>
              </div>
            ) : (
              <p>Take the questionnaire to get personalized safety tips.</p>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .profile-page {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        .profile-header {
          padding: 2.5rem;
          display: flex;
          align-items: center;
          gap: 2rem;
          position: relative;
        }
        .profile-avatar {
          width: 100px;
          height: 100px;
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          color: white;
        }
        .profile-info h1 { margin-bottom: 0.25rem; }
        .profile-info p { color: var(--text-secondary); }
        .profile-stats {
          margin-left: auto;
          display: flex;
          gap: 2rem;
        }
        .stat { text-align: center; }
        .stat-value { display: block; font-size: 1.5rem; font-weight: 700; color: var(--primary); }
        .stat-label { font-size: 0.8rem; color: var(--text-secondary); text-transform: uppercase; }
        
        .profile-grid {
          display: grid;
          grid-template-columns: 1fr 350px;
          gap: 2rem;
        }
        .section-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
          color: var(--primary);
        }
        .history-section, .meds-snapshot, .tips-section { padding: 2rem; }
        .full-width { grid-column: span 2; }
        
        .history-list { display: flex; flex-direction: column; gap: 1rem; }
        .history-item {
          padding: 1.25rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: rgba(255, 255, 255, 0.02);
        }
        .item-date { display: flex; align-items: center; gap: 0.4rem; font-size: 0.75rem; color: var(--text-secondary); margin-bottom: 0.25rem; }
        .empty-history { text-align: center; padding: 2rem; color: var(--text-secondary); }
        
        .meds-list-simple {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 2rem;
        }
        .med-tag {
          padding: 0.5rem 1rem;
          background: var(--glass);
          border: 1px solid var(--glass-border);
          border-radius: 8px;
          font-size: 0.9rem;
        }
        .tip-card {
          padding: 1.5rem;
          background: rgba(99, 102, 241, 0.05);
          border-radius: 12px;
          border-left: 4px solid var(--primary);
        }
        .tip-text { margin-top: 1rem; color: var(--text-secondary); line-height: 1.6; }
        .loading { text-align: center; padding: 5rem; font-size: 1.2rem; color: var(--text-secondary); }
        
        @media (max-width: 900px) {
          .profile-grid { grid-template-columns: 1fr; }
          .full-width { grid-column: span 1; }
          .profile-header { flex-direction: column; text-align: center; }
          .profile-stats { margin-left: 0; margin-top: 1rem; }
        }
      `}</style>
    </div>
  );
};

export default UserProfile;
