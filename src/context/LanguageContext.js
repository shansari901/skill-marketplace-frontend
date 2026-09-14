import React, { createContext, useState } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('Hindi');

  const translations = {
    Hindi: {
      home: 'घर',
      vyapar: 'स्थानीय व्यापार',
      shiksha: 'शिक्षा',
      rozgar: 'नौकरी',
      services: 'सेवाएं',
      news: 'समाचार',
      emergency: 'आपातकालीन',
      login: 'लॉगिन',
      signup: 'साइन अप करें',
      dashboard: 'डैशबोर्ड',
      logout: 'लॉग आउट',
      addShop: 'दुकान जोड़ें',
      findShops: 'दुकानें खोजें',
      search: 'खोजें',
      cancel: 'रद्द करें',
      submit: 'जमा करें',
      edit: 'संपादित करें',
      delete: 'हटाएं',
      save: 'सहेजें'
    },
    Urdu: {
      home: 'گھر',
      vyapar: 'مقامی کاروبار',
      shiksha: 'تعلیم',
      rozgar: 'ملازمت',
      services: 'خدمات',
      news: 'خبریں',
      emergency: 'ایمرجنسی',
      login: 'لاگ ان',
      signup: 'سائن اپ کریں',
      dashboard: 'ڈیش بورڈ',
      logout: 'لاگ آؤٹ',
      addShop: 'دکان شامل کریں',
      findShops: 'دکانیں تلاش کریں',
      search: 'تلاش کریں',
      cancel: 'منسوخ کریں',
      submit: 'جمع کریں',
      edit: 'ترمیم کریں',
      delete: 'حذف کریں',
      save: 'محفوظ کریں'
    },
    English: {
      home: 'Home',
      vyapar: 'Local Shops',
      shiksha: 'Education',
      rozgar: 'Jobs',
      services: 'Services',
      news: 'News',
      emergency: 'Emergency',
      login: 'Login',
      signup: 'Sign Up',
      dashboard: 'Dashboard',
      logout: 'Logout',
      addShop: 'Add Shop',
      findShops: 'Find Shops',
      search: 'Search',
      cancel: 'Cancel',
      submit: 'Submit',
      edit: 'Edit',
      delete: 'Delete',
      save: 'Save'
    }
  };

  const t = (key) => translations[language][key] || key;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, translations }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageContext;
