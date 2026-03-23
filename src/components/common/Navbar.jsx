import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Shield, User, LogOut, LayoutDashboard, PlusCircle } from 'lucide-react';

const Navbar = ({ onOpenAuth }) => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <nav className="navbar glass-card">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <Shield className="logo-icon" />
          <span>SeizureSafe</span>
        </Link>

        <div className="nav-links">
          <Link to="/questionnaire" className="nav-link">Questionnaire</Link>
          <Link to="/checker" className="nav-link">Interaction Checker</Link>
          
          {currentUser ? (
            <div className="user-menu">
              <Link to="/profile" className="nav-link profile-link">
                <User size={18} />
                <span>{currentUser.displayName || 'Profile'}</span>
              </Link>
              <button onClick={handleLogout} className="btn-icon logout-btn" title="Logout">
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <button onClick={onOpenAuth} className="btn btn-primary">
              Login / Sign Up
            </button>
          )}
        </div>
      </div>

      <style>{`
        .navbar {
          position: fixed;
          top: 1rem;
          left: 50%;
          transform: translateX(-50%);
          width: 90%;
          max-width: 1200px;
          z-index: 1000;
          padding: 0.75rem 2rem;
          border-radius: 20px;
          display: flex;
          align-items: center;
        }
        .nav-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
        }
        .nav-logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          text-decoration: none;
          color: white;
          font-weight: 700;
          font-size: 1.25rem;
        }
        .logo-icon {
          color: var(--primary);
        }
        .nav-links {
          display: flex;
          align-items: center;
          gap: 2rem;
        }
        .nav-link {
          text-decoration: none;
          color: var(--text-secondary);
          font-weight: 500;
          transition: color 0.2s;
        }
        .nav-link:hover {
          color: var(--text-primary);
        }
        .user-menu {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .profile-link {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(255, 255, 255, 0.05);
          padding: 0.5rem 1rem;
          border-radius: 12px;
        }
        .btn-icon {
          background: none;
          border: none;
          color: var(--text-secondary);
          cursor: pointer;
          padding: 8px;
          border-radius: 50%;
          transition: all 0.2s;
        }
        .btn-icon:hover {
          background: rgba(239, 68, 68, 0.1);
          color: var(--error);
        }
        @media (max-width: 768px) {
          .nav-links {
            gap: 1rem;
          }
          .nav-link span {
            display: none;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
