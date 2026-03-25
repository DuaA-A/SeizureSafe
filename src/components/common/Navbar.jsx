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
  const [scrolled, setScrolled] = React.useState(false);
  const location = useLocation();

  const isHome = location.pathname === '/';
  const isActive = (path) => location.pathname === path;

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar fixed-top ${scrolled || !isHome ? 'navbar-scrolled' : 'navbar-transparent'}`}>
      <div className="container nav-content">
        <Link to="/" className="nav-logo">
          <img src="/logo.png" alt="SeizureSafe Logo" className="logo-img" />
          <span className={`logo-text ${!scrolled && isHome ? 'white-text' : ''}`}>
            Seizure<span className="safe-text">Safe</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="nav-links">
          <Link to="/questionnaire" className={`nav-link ${isActive('/questionnaire') ? 'active' : ''} ${!scrolled && isHome ? 'white-link' : ''}`}>
            <Activity size={18} /> Questionnaire
          </Link>
          <Link to="/checker" className={`nav-link ${isActive('/checker') ? 'active' : ''} ${!scrolled && isHome ? 'white-link' : ''}`}>
            <Pill size={18} /> Interaction Checker
          </Link>
          <Link to="/about" className={`nav-link ${isActive('/about') ? 'active' : ''} ${!scrolled && isHome ? 'white-link' : ''}`}>
            About the Team
          </Link>

          <div className="nav-divider"></div>

          {currentUser ? (
            <div className="user-menu">
              <Link to="/profile" className={`nav-link profile-link ${isActive('/profile') ? 'active' : ''} ${!scrolled && isHome ? 'white-link' : ''}`}>
                <User size={18} /> My Dashboard
              </Link>
              <button onClick={logout} className={`btn-icon ${!scrolled && isHome ? 'white-link' : ''}`} title="Logout">
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <button onClick={onOpenAuth} className={`btn ${!scrolled && isHome ? 'btn-white' : 'btn-primary'} btn-sm`}>
              Sign In
            </button>
          )}
        </div>

        {/* Mobile Toggle */}
        <button className={`mobile-toggle ${!scrolled && isHome ? 'white-link' : ''}`} onClick={() => setIsOpen(!isOpen)}>
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
          display: flex;
          align-items: center;
          z-index: 1000;
          transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
          position: fixed;
          top: 0;
          left: 0;
        }

        .navbar-transparent {
          background: transparent !important;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .navbar-scrolled {
          background: rgba(255, 255, 255, 0.9) !important;
          backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--border);
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.05);
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

        .white-text { color: white !important; }
        .logo-img { height: 40px; width: auto; border-radius: 8px; }
        .logo-text { font-size: 1.5rem; font-weight: 800; letter-spacing: -0.02em; transition: color 0.3s; }
        .safe-text { color: var(--primary); }
        .navbar-transparent .safe-text { color: #00d4ff; }
        
        .nav-links { display: flex; align-items: center; gap: 2rem; }
        .nav-link {
          text-decoration: none;
          color: var(--text-muted);
          font-weight: 600;
          font-size: 0.95rem;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.3s;
        }
        .white-link { color: rgba(255, 255, 255, 0.8) !important; }
        .white-link:hover { color: white !important; }

        .nav-link:hover, .nav-link.active { color: var(--primary); }
        .navbar-transparent .nav-link.active { color: white; background: rgba(255, 255, 255, 0.1); padding: 5px 12px; border-radius: 20px; }
        
        .nav-divider { width: 1px; height: 24px; background: var(--border); }
        .navbar-transparent .nav-divider { background: rgba(255, 255, 255, 0.2); }
        
        .user-menu { display: flex; align-items: center; gap: 1.5rem; }
        .btn-icon {
          background: none; border: none; color: var(--text-muted); cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: color 0.2s;
        }
        .btn-icon:hover { color: var(--error); }
        
        .mobile-toggle { display: none; background: none; border: none; cursor: pointer; color: var(--text-main); }
        
        .btn-sm { padding: 10px 24px; font-size: 0.9rem; }
        .btn-white { background: white; color: var(--primary); }
        .btn-white:hover { background: #f8f9fa; transform: translateY(-2px); }

        @media (max-width: 900px) {
          .nav-links { display: none; }
          .mobile-toggle { display: block; }
          .navbar-transparent.mobile-toggle { color: white; }
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
