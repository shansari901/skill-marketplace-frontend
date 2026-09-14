import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import LanguageContext from '../context/LanguageContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { language, setLanguage, t } = useContext(LanguageContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          🏘️ अपना छेत्र
        </Link>

        <div className="navbar-menu">
          <Link to="/vyapar" className="nav-link">
            {t('vyapar')}
          </Link>
          <Link to="/shiksha" className="nav-link">
            {t('shiksha')}
          </Link>
          <Link to="/rozgar" className="nav-link">
            {t('rozgar')}
          </Link>
          <Link to="/services" className="nav-link">
            {t('services')}
          </Link>
          <Link to="/news" className="nav-link">
            {t('news')}
          </Link>
          <Link to="/emergency" className="nav-link">
            {t('emergency')}
          </Link>
        </div>

        <div className="navbar-right">
          <div className="language-selector">
            <select value={language} onChange={(e) => setLanguage(e.target.value)}>
              <option value="Hindi">हिंदी</option>
              <option value="Urdu">اردو</option>
              <option value="English">English</option>
            </select>
          </div>

          {user ? (
            <div className="user-menu">
              <Link to="/dashboard" className="nav-link">
                {t('dashboard')}
              </Link>
              <button onClick={handleLogout} className="logout-btn">
                {t('logout')}
              </button>
            </div>
          ) : (
            <div className="auth-menu">
              <Link to="/login" className="nav-link">
                {t('login')}
              </Link>
              <Link to="/signup" className="nav-link">
                {t('signup')}
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
