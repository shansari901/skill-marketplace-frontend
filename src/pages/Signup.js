import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import LanguageContext from '../context/LanguageContext';
import './Auth.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    city: '',
    area: '',
    userType: 'user'
  });
  const [error, setError] = useState('');
  const { signup } = useContext(AuthContext);
  const { language, t } = useContext(LanguageContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signup(formData);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Signup failed');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>{t('signup')}</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder={language === 'Hindi' ? 'नाम' : 'Name'}
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder={language === 'Hindi' ? 'ईमेल' : 'Email'}
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder={language === 'Hindi' ? 'पासवर्ड' : 'Password'}
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="city"
            placeholder={language === 'Hindi' ? 'शहर' : 'City'}
            value={formData.city}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="area"
            placeholder={language === 'Hindi' ? 'क्षेत्र' : 'Area'}
            value={formData.area}
            onChange={handleChange}
            required
          />
          <select name="userType" value={formData.userType} onChange={handleChange}>
            <option value="user">{language === 'Hindi' ? 'उपयोगकर्ता' : 'User'}</option>
            <option value="owner">{language === 'Hindi' ? 'मालिक' : 'Owner'}</option>
          </select>
          <button type="submit" className="submit-btn">
            {t('signup')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
