import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import LanguageContext from '../context/LanguageContext';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const { language, t } = useContext(LanguageContext);

  return (
    <div className="dashboard-container">
      <h1>{t('dashboard')}</h1>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h3>{language === 'Hindi' ? 'प्रोफाइल' : 'Profile'}</h3>
          <p><strong>{language === 'Hindi' ? 'नाम' : 'Name'}:</strong> {user?.name}</p>
          <p><strong>{language === 'Hindi' ? 'ईमेल' : 'Email'}:</strong> {user?.email}</p>
          <p><strong>{language === 'Hindi' ? 'शहर' : 'City'}:</strong> {user?.city}</p>
          <p><strong>{language === 'Hindi' ? 'क्षेत्र' : 'Area'}:</strong> {user?.area}</p>
        </div>

        {user?.userType === 'owner' && (
          <div className="dashboard-card">
            <h3>{language === 'Hindi' ? 'मेरी दुकान' : 'My Shop'}</h3>
            <button className="card-btn">{language === 'Hindi' ? 'दुकान संपादित करें' : 'Edit Shop'}</button>
            <button className="card-btn">{language === 'Hindi' ? 'नई दुकान जोड़ें' : 'Add New Shop'}</button>
          </div>
        )}

        <div className="dashboard-card">
          <h3>{language === 'Hindi' ? 'मेरे पसंदीदा' : 'My Favorites'}</h3>
          <button className="card-btn">{language === 'Hindi' ? 'पसंदीदा देखें' : 'View Favorites'}</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
