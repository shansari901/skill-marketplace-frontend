import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import LanguageContext from '../context/LanguageContext';
import './Home.css';

const Home = () => {
  const { t, language } = useContext(LanguageContext);

  const features = [
    {
      icon: '🏪',
      titleHi: 'स्थानीय व्यापार',
      titleEn: 'Local Shops',
      descHi: 'अपने इलाके की सभी दुकानों की जानकारी',
      descEn: 'Find all shops in your area',
      link: '/vyapar'
    },
    {
      icon: '📚',
      titleHi: 'शिक्षा',
      titleEn: 'Education',
      descHi: 'स्कूल, कॉलेज और कोर्सेस की जानकारी',
      descEn: 'Schools, colleges and courses info',
      link: '/shiksha'
    },
    {
      icon: '💼',
      titleHi: 'नौकरी',
      titleEn: 'Jobs',
      descHi: 'क्षेत्र में खाली नौकरियों की जानकारी',
      descEn: 'Available job opportunities',
      link: '/rozgar'
    },
    {
      icon: '🔧',
      titleHi: 'सेवाएं',
      titleEn: 'Services',
      descHi: 'इलेक्ट्रिशियन, प्लंबर, मिस्त्री के नंबर',
      descEn: 'Local services and repairs',
      link: '/services'
    },
    {
      icon: '📰',
      titleHi: 'समाचार',
      titleEn: 'News',
      descHi: 'स्थानीय खबरें और इवेंट्स',
      descEn: 'Local news and events',
      link: '/news'
    },
    {
      icon: '🚨',
      titleHi: 'आपातकालीन',
      titleEn: 'Emergency',
      descHi: 'हॉस्पिटल, पुलिस, एम्बुलेंस नंबर',
      descEn: 'Emergency contacts and services',
      link: '/emergency'
    }
  ];

  return (
    <div className="home">
      <div className="hero">
        <h1>🏘️ अपना छेत्र</h1>
        <p className="tagline">
          {language === 'Hindi' 
            ? 'अपने इलाके की सभी ज़रूरी जानकारी एक जगह पाएं'
            : language === 'Urdu'
            ? 'اپنے علاقے کی تمام ضروری معلومات ایک جگہ'
            : 'Get all local area information in one place'}
        </p>
      </div>

      <div className="features-grid">
        {features.map((feature, index) => (
          <Link key={index} to={feature.link} className="feature-card">
            <div className="feature-icon">{feature.icon}</div>
            <h3>{language === 'Hindi' ? feature.titleHi : feature.titleEn}</h3>
            <p>{language === 'Hindi' ? feature.descHi : feature.descEn}</p>
          </Link>
        ))}
      </div>

      <div className="about-section">
        <h2>{language === 'Hindi' ? 'हमारे बारे में' : 'About Us'}</h2>
        <p>
          {language === 'Hindi'
            ? 'अपना छेत्र एक स्थानीय सामुदायिक मंच है जहाँ आप अपने इलाके की सभी महत्वपूर्ण जानकारी एक जगह पा सकते हैं।'
            : 'Apna Chhetr is a local community platform where you can find all important information about your area in one place.'}
        </p>
      </div>
    </div>
  );
};

export default Home;
