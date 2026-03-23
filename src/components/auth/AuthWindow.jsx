import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Mail, Lock, User, X, Shield } from 'lucide-react';

const AuthWindow = ({ onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
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
        await signup(email, password, displayName);
      }
      onClose();
    } catch (err) {
      setError(err.message.replace('Firebase: ', ''));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-overlay">
      <div className="auth-modal glass-card animate-fade-in">
        <button className="btn-close" onClick={onClose}><X size={20} /></button>
        
        <div className="auth-header">
          <div className="auth-logo">
            <Shield size={32} className="logo-icon" />
          </div>
          <h2>{isLogin ? 'Welcome Back' : 'Join SeizureSafe'}</h2>
          <p>{isLogin ? 'Access your secure dashboard' : 'Your safe space for epilepsy care'}</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          {!isLogin && (
            <div className="input-group">
              <User className="input-icon" size={18} />
              <input 
                type="text" 
                className="input-field" 
                placeholder="Full Name" 
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                required
              />
            </div>
          )}
          <div className="input-group">
            <Mail className="input-icon" size={18} />
            <input 
              type="email" 
              className="input-field" 
              placeholder="Email address" 
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
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-full" disabled={loading}>
            {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
          </button>
        </form>

        <div className="auth-footer">
          <span>{isLogin ? "New to SeizureSafe?" : "Already a member?"}</span>
          <button className="btn-text" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Sign Up' : 'Sign In'}
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
          right: 1.5rem;
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
          left: 1.25rem;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted);
        }
        .input-group .input-field {
          padding-left: 3.5rem;
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
          margin-left: 0.5rem;
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
      `}</style>
    </div>
  );
};

export default AuthWindow;
