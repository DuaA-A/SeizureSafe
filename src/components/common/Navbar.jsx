import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  Shield, 
  User, 
  LogOut, 
  Activity, 
  Pill, 
  Menu, 
  X,
  CreditCard
} from 'lucide-react';

const Navbar = ({ onOpenAuth }) => {
  const { currentUser, logout } = useAuth();
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar fixed-top">
      <div className="container nav-content">
        <Link to="/" className="nav-logo">
          <img src="/logo.png" alt="SeizureSafe Logo" className="logo-img" />
          <span className="logo-text">Seizure<span className="safe-text">Safe</span></span>
        </Link>

        {/* Desktop Nav */}
        <div className="nav-links">
          <Link to="/questionnaire" className={`nav-link ${isActive('/questionnaire') ? 'active' : ''}`}>
            <Activity size={18} /> Questionnaire
          </Link>
          <Link to="/checker" className={`nav-link ${isActive('/checker') ? 'active' : ''}`}>
            <Pill size={18} /> Interaction Checker
          </Link>
          <Link to="/about" className={`nav-link ${isActive('/about') ? 'active' : ''}`}>
             About the Team
          </Link>
          
          <div className="nav-divider"></div>

          {currentUser ? (
            <div className="user-menu">
              <Link to="/profile" className={`nav-link profile-link ${isActive('/profile') ? 'active' : ''}`}>
                <User size={18} /> My Dashboard
              </Link>
              <button onClick={logout} className="btn-icon" title="Logout">
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <button onClick={onOpenAuth} className="btn btn-primary btn-sm">
              Sign In
            </button>
          )}
        </div>

        {/* Mobile Toggle */}
        <button className="mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="mobile-menu animate-fade-in">
          <Link to="/questionnaire" onClick={() => setIsOpen(false)}>Questionnaire</Link>
          <Link to="/checker" onClick={() => setIsOpen(false)}>Interaction Checker</Link>
          {currentUser ? (
            <>
              <Link to="/profile" onClick={() => setIsOpen(false)}>My Dashboard</Link>
              <button onClick={() => { logout(); setIsOpen(false); }}>Logout</button>
            </>
          ) : (
            <button className="btn btn-primary" onClick={() => { onOpenAuth(); setIsOpen(false); }}>Sign In</button>
          )}
        </div>
      )}

      <style>{`
        .navbar {
          height: 80px;
          width: 100%;
          background: rgba(253, 250, 245, 0.9) !important;
          backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--border);
          display: flex;
          align-items: center;
          z-index: 1000;
          transition: all 0.3s;
        }
        .nav-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
        }
        .nav-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
          color: var(--text-main);
        }
        .logo-img { height: 40px; width: auto; border-radius: 8px; }
        .logo-text { font-size: 1.5rem; font-weight: 800; letter-spacing: -0.02em; }
        .safe-text { color: var(--primary); }
        
        .nav-links { display: flex; align-items: center; gap: 2rem; }
        .nav-link {
          text-decoration: none;
          color: var(--text-muted);
          font-weight: 600;
          font-size: 0.95rem;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: color 0.2s;
        }
        .nav-link:hover, .nav-link.active { color: var(--primary); }
        
        .nav-divider { width: 1px; height: 24px; background: var(--border); }
        
        .user-menu { display: flex; align-items: center; gap: 1.5rem; }
        .btn-icon {
          background: none; border: none; color: var(--text-muted); cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: color 0.2s;
        }
        .btn-icon:hover { color: var(--error); }
        
        .mobile-toggle { display: none; background: none; border: none; cursor: pointer; color: var(--text-main); }
        
        .btn-sm { padding: 10px 24px; font-size: 0.9rem; }

        @media (max-width: 900px) {
          .nav-links { display: none; }
          .mobile-toggle { display: block; }
          .mobile-menu {
            position: absolute; top: 80px; left: 0; right: 0; background: white;
            padding: 2rem; display: flex; flex-direction: column; gap: 1.5rem;
            border-bottom: 1px solid var(--border); box-shadow: var(--shadow);
          }
          .mobile-menu a { text-decoration: none; color: var(--text-main); font-weight: 600; }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
