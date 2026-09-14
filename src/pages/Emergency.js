import React, { useState, useEffect, useContext } from 'react';
import LanguageContext from '../context/LanguageContext';
import './Emergency.css';

const Emergency = () => {
  const { language, t } = useContext(LanguageContext);
  const [contacts, setContacts] = useState([]);
  const [selectedType, setSelectedType] = useState('Hospital');
  const [loading, setLoading] = useState(false);

  const contactTypes = ['Hospital', 'Police', 'Fire Brigade', 'Ambulance', 'Cyber Cell', 'Mental Health', 'Poison Control'];

  useEffect(() => {
    fetchContacts();
  }, [selectedType]);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const typeMap = {
        'Hospital': 'hospitals/DefaultArea',
        'Police': 'police',
        'Fire Brigade': 'fire',
        'Ambulance': 'ambulance',
        'Cyber Cell': 'cyber-cell',
        'Mental Health': 'mental-health',
        'Poison Control': 'all'
      };

      const response = await fetch(`http://localhost:5000/api/emergency/${typeMap[selectedType]}`);
      const data = await response.json();
      setContacts(data.contacts || data.hospitals || data.police || data.fire || data.ambulance || data.cyberCell || data.support || []);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
    setLoading(false);
  };

  return (
    <div className="emergency-container">
      <h1>{t('emergency')}</h1>

      <div className="emergency-buttons">
        {contactTypes.map((type) => (
          <button
            key={type}
            onClick={() => setSelectedType(type)}
            className={`emergency-btn ${selectedType === type ? 'active' : ''}`}
          >
            {type}
          </button>
        ))}
      </div>

      {loading ? (
        <p>{language === 'Hindi' ? 'लोड हो रहा है...' : 'Loading...'}</p>
      ) : (
        <div className="contacts-grid">
          {contacts.map((contact) => (
            <div key={contact._id} className="contact-card">
              <h3>{contact.organizationName}</h3>
              <p><strong>{language === 'Hindi' ? 'पता' : 'Address'}:</strong> {contact.address}</p>
              <p className="phone">
                <strong>{language === 'Hindi' ? 'फोन' : 'Phone'}:</strong> 
                <a href={`tel:${contact.primaryPhone}`}>{contact.primaryPhone}</a>
              </p>
              {contact.emergencyPhone && (
                <p className="phone">
                  <strong>{language === 'Hindi' ? 'आपातकालीन' : 'Emergency'}:</strong>
                  <a href={`tel:${contact.emergencyPhone}`}>{contact.emergencyPhone}</a>
                </p>
              )}
              {contact.is24x7 && <span className="badge">24/7</span>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Emergency;
