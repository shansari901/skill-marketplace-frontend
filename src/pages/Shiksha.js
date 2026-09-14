import React, { useState, useEffect, useContext } from 'react';
import LanguageContext from '../context/LanguageContext';
import './Pages.css';

const Shiksha = () => {
  const { language, t } = useContext(LanguageContext);
  const [institutes, setInstitutes] = useState([]);
  const [selectedType, setSelectedType] = useState('School');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchInstitutes();
  }, [selectedType]);

  const fetchInstitutes = async () => {
    setLoading(true);
    try {
      const url = selectedType === 'School'
        ? 'http://localhost:5000/api/shiksha/schools/DefaultArea'
        : 'http://localhost:5000/api/shiksha/colleges';

      const response = await fetch(url);
      const data = await response.json();
      setInstitutes(data.schools || data.colleges || []);
    } catch (error) {
      console.error('Error fetching institutes:', error);
    }
    setLoading(false);
  };

  return (
    <div className="page-container">
      <h1>{t('shiksha')}</h1>

      <div className="type-selector">
        {['School', 'College', 'Coaching'].map((type) => (
          <button
            key={type}
            onClick={() => setSelectedType(type)}
            className={`type-btn ${selectedType === type ? 'active' : ''}`}
          >
            {type}
          </button>
        ))}
      </div>

      {loading ? (
        <p>{language === 'Hindi' ? 'लोड हो रहा है...' : 'Loading...'}</p>
      ) : (
        <div className="items-grid">
          {institutes.map((institute) => (
            <div key={institute._id} className="item-card">
              <h3>{institute.institutionName}</h3>
              <p><strong>{language === 'Hindi' ? 'पता' : 'Address'}:</strong> {institute.address}</p>
              <p><strong>{language === 'Hindi' ? 'फोन' : 'Phone'}:</strong> {institute.contactNumber}</p>
              {institute.website && (
                <p><strong>{language === 'Hindi' ? 'वेबसाइट' : 'Website'}:</strong> <a href={institute.website} target="_blank" rel="noopener noreferrer">{institute.website}</a></p>
              )}
              {institute.coursesOffered && (
                <p><strong>{language === 'Hindi' ? 'कोर्स' : 'Courses'}:</strong> {institute.coursesOffered.join(', ')}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Shiksha;
