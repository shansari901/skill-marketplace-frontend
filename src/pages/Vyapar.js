import React, { useState, useContext, useEffect } from 'react';
import LanguageContext from '../context/LanguageContext';
import { AuthContext } from '../context/AuthContext';
import './Vyapar.css';

const Vyapar = () => {
  const { t, language } = useContext(LanguageContext);
  const { user } = useContext(AuthContext);
  const [shops, setShops] = useState([]);
  const [selectedArea, setSelectedArea] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(false);

  const categories = ['Kirana', 'Stationery', 'Saree', 'General', 'Electronics', 'Clothing', 'Food', 'Other'];
  const areas = ['Area1', 'Area2', 'Area3', 'Area4', 'Area5'];

  useEffect(() => {
    if (selectedArea) {
      fetchShops();
    }
  }, [selectedArea, selectedCategory]);

  const fetchShops = async () => {
    setLoading(true);
    try {
      const url = selectedCategory
        ? `http://localhost:5000/api/vyapar/category/${selectedCategory}`
        : `http://localhost:5000/api/vyapar/area/${selectedArea}`;

      const response = await fetch(url);
      const data = await response.json();
      setShops(data.shops || []);
    } catch (error) {
      console.error('Error fetching shops:', error);
    }
    setLoading(false);
  };

  return (
    <div className="vyapar-container">
      <h1>{t('vyapar')}</h1>

      <div className="filters">
        <select
          value={selectedArea}
          onChange={(e) => setSelectedArea(e.target.value)}
          className="filter-select"
        >
          <option value="">
            {language === 'Hindi' ? 'अपना क्षेत्र चुनें' : 'Select your area'}
          </option>
          {areas.map((area) => (
            <option key={area} value={area}>
              {area}
            </option>
          ))}
        </select>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="filter-select"
        >
          <option value="">
            {language === 'Hindi' ? 'श्रेणी चुनें' : 'Select category'}
          </option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {user && user.userType === 'owner' && (
        <button className="add-shop-btn">{t('addShop')}</button>
      )}

      {loading ? (
        <p>{language === 'Hindi' ? 'लोड हो रहा है...' : 'Loading...'}</p>
      ) : (
        <div className="shops-grid">
          {shops.map((shop) => (
            <div key={shop._id} className="shop-card">
              <h3>{shop.shopName}</h3>
              <p><strong>{language === 'Hindi' ? 'श्रेणी' : 'Category'}:</strong> {shop.category}</p>
              <p><strong>{language === 'Hindi' ? 'पता' : 'Address'}:</strong> {shop.address}</p>
              <p><strong>{language === 'Hindi' ? 'फोन' : 'Phone'}:</strong> {shop.ownerPhone}</p>
              <p><strong>{language === 'Hindi' ? 'समय' : 'Timing'}:</strong> {shop.shopTiming?.opening} - {shop.shopTiming?.closing}</p>
              <div className="rating">{shop.rating ? `⭐ ${shop.rating}` : 'No ratings yet'}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Vyapar;
