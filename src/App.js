import React, { useState, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Vyapar from './pages/Vyapar';
import Shiksha from './pages/Shiksha';
import Rozgar from './pages/Rozgar';
import Services from './pages/Services';
import News from './pages/News';
import Emergency from './pages/Emergency';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import { AuthContext } from './context/AuthContext';
import LanguageContext from './context/LanguageContext';

function App() {
  const { user } = useContext(AuthContext);
  const { language, setLanguage } = useContext(LanguageContext);

  return (
    <Router>
      <div className="app" dir={language === 'Urdu' ? 'rtl' : 'ltr'}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/vyapar" element={<Vyapar />} />
          <Route path="/shiksha" element={<Shiksha />} />
          <Route path="/rozgar" element={<Rozgar />} />
          <Route path="/services" element={<Services />} />
          <Route path="/news" element={<News />} />
          <Route path="/emergency" element={<Emergency />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {user && <Route path="/dashboard" element={<Dashboard />} />}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
