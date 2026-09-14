import React, { useState, useEffect, useContext } from 'react';
import LanguageContext from '../context/LanguageContext';
import './Pages.css';

const News = () => {
  const { language, t } = useContext(LanguageContext);
  const [news, setNews] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('News');
  const [loading, setLoading] = useState(false);

  const categories = ['News', 'Event', 'Traffic', 'Government'];

  useEffect(() => {
    fetchNews();
  }, [selectedCategory]);

  const fetchNews = async () => {
    setLoading(true);
    try {
      let url = 'http://localhost:5000/api/news/local/DefaultArea';
      if (selectedCategory === 'Event') {
        url = 'http://localhost:5000/api/news/events';
      } else if (selectedCategory === 'Government') {
        url = 'http://localhost:5000/api/news/government';
      }

      const response = await fetch(url);
      const data = await response.json();
      setNews(data.news || data.events || data.announcements || []);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
    setLoading(false);
  };

  return (
    <div className="page-container">
      <h1>{t('news')}</h1>

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
        <div className="news-list">
          {news.map((item) => (
            <div key={item._id} className="news-item">
              <h3>{item.title}</h3>
              {item.image && <img src={item.image} alt={item.title} />}
              <p>{item.description}</p>
              <p className="meta">
                <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                {item.importance && <span className="importance">{item.importance}</span>}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default News;
