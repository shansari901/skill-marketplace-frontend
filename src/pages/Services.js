import React, { useState, useEffect, useContext } from 'react';
import LanguageContext from '../context/LanguageContext';
import './Pages.css';

const Services = () => {
  const { language, t } = useContext(LanguageContext);
  const [services, setServices] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Electrician');
  const [loading, setLoading] = useState(false);

  const categories = ['Electrician', 'Plumber', 'Mechanic', 'AC Repair', 'Water Tank', 'Carpenter'];

  useEffect(() => {
    fetchServices();
  }, [selectedCategory]);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/services/${selectedCategory.toLowerCase()}/DefaultArea`);
      const data = await response.json();
      const key = selectedCategory.toLowerCase() + 's';
      setServices(data[key] || data.services || []);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
    setLoading(false);
  };

  return (
    <div className="page-container">
      <h1>{t('services')}</h1>

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
          {services.map((service) => (
            <div key={service._id} className="item-card">
              <h3>{service.providerName}</h3>
              <p><strong>{language === 'Hindi' ? 'सेवा' : 'Service'}:</strong> {service.serviceName}</p>
              <p><strong>{language === 'Hindi' ? 'पता' : 'Address'}:</strong> {service.address}</p>
              <p className="phone">
                <strong>{language === 'Hindi' ? 'फोन' : 'Phone'}:</strong>
                <a href={`tel:${service.providerPhone}`}>{service.providerPhone}</a>
              </p>
              <p><strong>{language === 'Hindi' ? 'अनुभव' : 'Experience'}:</strong> {service.experience}</p>
              <p><strong>{language === 'Hindi' ? 'दर' : 'Cost'}:</strong> ₹{service.baseCost}</p>
              {service.availability?.is24x7 && <span className="badge">24/7</span>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Services;
