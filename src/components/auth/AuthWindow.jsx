import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import { Mail, Lock, User, X, Shield } from 'lucide-react';

const AuthWindow = ({ onClose }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [patientName, setPatientName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [isPregnant, setIsPregnant] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, signup } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await signup(email, password, displayName, { patientName, age, gender, isPregnant });
      }
      onClose();
    } catch (err) {
      setError(err.message.replace('Firebase: ', ''));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-overlay" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="auth-modal glass-card animate-fade-in">
        <button className="btn-close" onClick={onClose}><X size={20} /></button>
        
        <div className="auth-header">
          <div className="auth-logo">
            <Shield size={32} className="logo-icon" />
          </div>
          <h2>{isLogin ? t('auth.loginTitle') : t('auth.signupTitle')}</h2>
          <p>{isLogin ? t('auth.loginDesc') : t('auth.signupDesc')}</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          {!isLogin && (
            <>
              {/* User Account */}
              <div className="form-section-label">{t('auth.accountSection')}</div>
              <div className="input-group">
                <User className="input-icon" size={18} />
                <input 
                  type="text" 
                  className="input-field" 
                  placeholder={t('auth.fullName')} 
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  required
                />
              </div>

              {/* Patient Info */}
              <div className="form-section-label">{t('auth.patientSection')}</div>
              <div className="input-group">
                <User className="input-icon" size={18} />
                <input 
                  type="text" 
                  className="input-field" 
                  placeholder={t('auth.patientName')} 
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <input 
                  type="number" 
                  className="input-field full-pad" 
                  placeholder={t('auth.age')} 
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  required
                  min="0"
                  max="120"
                />
              </div>
              <div className="input-group">
                <select 
                  className="input-field full-pad" 
                  value={gender}
                  onChange={(e) => {
                    setGender(e.target.value);
                    if (e.target.value !== 'female') setIsPregnant(false);
                  }}
                  required
                >
                  <option value="" disabled>{t('auth.selectGender')}</option>
                  <option value="male">{t('auth.male')}</option>
                  <option value="female">{t('auth.female')}</option>
                </select>
              </div>
              {gender === 'female' && (
                <div className="checkbox-group" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '0 10px', fontSize: '0.9rem' }}>
                  <input 
                    type="checkbox" 
                    id="pregnant"
                    checked={isPregnant}
                    onChange={(e) => setIsPregnant(e.target.checked)}
                  />
                  <label htmlFor="pregnant">{t('auth.isPregnant')}</label>
                </div>
              )}
            </>
          )}
          <div className="input-group">
            <Mail className="input-icon" size={18} />
            <input 
              type="email" 
              className="input-field" 
              placeholder={t('auth.email')} 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <Lock className="input-icon" size={18} />
            <input 
              type="password" 
              className="input-field" 
              placeholder={t('auth.password')} 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-premium w-full" disabled={loading}>
            {loading ? t('auth.processing') : (isLogin ? t('auth.signIn') : t('auth.createAccount'))}
          </button>
        </form>

        <div className="auth-footer">
          <span>{isLogin ? t('auth.newTo') : t('auth.alreadyMember')}</span>
          <button className="btn-text" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? t('auth.signUp') : t('auth.signIn')}
          </button>
        </div>
      </div>

      <style>{`
        .auth-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(44, 62, 80, 0.4);
          backdrop-filter: blur(8px);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 2000;
        }
        .auth-modal {
          width: 440px;
          padding: 3.5rem 2.5rem;
          position: relative;
          background: white;
        }
        .btn-close {
          position: absolute;
          top: 1.5rem;
          inset-inline-end: 1.5rem;
          background: none;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          transition: color 0.2s;
        }
        .btn-close:hover { color: var(--error); }
        
        .auth-header {
          text-align: center;
          margin-bottom: 2.5rem;
        }
        .auth-logo {
          width: 60px;
          height: 60px;
          background: #f4f1ff;
          border-radius: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.5rem;
          color: var(--primary);
        }
        .auth-header h2 {
          font-size: 1.75rem;
          margin-bottom: 0.5rem;
        }
        .auth-header p {
          color: var(--text-muted);
          font-size: 0.95rem;
        }
        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .input-group {
          position: relative;
        }
        .input-icon {
          position: absolute;
          inset-inline-start: 1.25rem;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted);
        }
        .input-group .input-field {
          padding-inline-start: 3.5rem;
        }
        .input-group .input-field.full-pad {
          padding-inline-start: 1.25rem;
        }
        .w-full {
          width: 100%;
          margin-top: 1rem;
        }
        .error-message {
          background: #fdedec;
          color: #c0392b;
          padding: 1rem;
          border-radius: 10px;
          font-size: 0.85rem;
          margin-bottom: 1.5rem;
          border: 1px solid #f1948a;
          text-align: center;
        }
        .auth-footer {
          margin-top: 2.5rem;
          text-align: center;
          font-size: 0.95rem;
          color: var(--text-muted);
        }
        .btn-text {
          background: none;
          border: none;
          color: var(--primary);
          font-weight: 700;
          cursor: pointer;
          margin-inline-start: 0.5rem;
        }
        .btn-text:hover {
          text-decoration: underline;
        }
        @media (max-width: 480px) {
          .auth-modal {
            width: 95%;
            padding: 2.5rem 1.5rem;
          }
        }
        .form-section-label {
          font-size: 0.8rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--primary);
          margin-top: 0.5rem;
          padding-bottom: 0.25rem;
          border-bottom: 2px solid rgba(126, 34, 206, 0.1);
        }
      `}</style>
    </div>
  );
};

export default AuthWindow;
