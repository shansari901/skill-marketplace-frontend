import React, { useState, useEffect, useContext } from 'react';
import LanguageContext from '../context/LanguageContext';
import './Pages.css';

const Rozgar = () => {
  const { language, t } = useContext(LanguageContext);
  const [jobs, setJobs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Data Entry');
  const [loading, setLoading] = useState(false);

  const categories = ['Data Entry', 'Computer Operator', 'Manual Labour', 'Office Staff', 'Sales', 'Support', 'Driver'];

  useEffect(() => {
    fetchJobs();
  }, [selectedCategory]);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/rozgar/category/${selectedCategory}`);
      const data = await response.json();
      setJobs(data.jobs || []);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
    setLoading(false);
  };

  return (
    <div className="page-container">
      <h1>{t('rozgar')}</h1>

      <div className="category-selector">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`category-btn ${selectedCategory === cat ? 'active' : ''}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading ? (
        <p>{language === 'Hindi' ? 'लोड हो रहा है...' : 'Loading...'}</p>
      ) : (
        <div className="items-grid">
          {jobs.map((job) => (
            <div key={job._id} className="item-card">
              <h3>{job.jobTitle}</h3>
              <p><strong>{language === 'Hindi' ? 'कंपनी' : 'Company'}:</strong> {job.companyName}</p>
              <p><strong>{language === 'Hindi' ? 'स्थान' : 'Location'}:</strong> {job.jobLocation}</p>
              <p><strong>{language === 'Hindi' ? 'वेतन' : 'Salary'}:</strong> ₹{job.salary?.min} - ₹{job.salary?.max}</p>
              <p><strong>{language === 'Hindi' ? 'योग्यता' : 'Qualifications'}:</strong> {job.qualifications}</p>
              <p><strong>{language === 'Hindi' ? 'अनुभव' : 'Experience'}:</strong> {job.experience}</p>
              <p><strong>{language === 'Hindi' ? 'संपर्क' : 'Contact'}:</strong> {job.employerPhone}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Rozgar;
