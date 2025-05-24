import React, { useState, useEffect } from 'react';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Skills from './components/Skills/Skills';
import Footer from './components/Footer/Footer';
import './App.css';

const App = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.body.className = theme + '-theme';
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Function to be passed to Header to update App's theme state if needed
  // Or, Header can manage its own theme state and update body class directly

  return (
    <div className={`app ${theme}-theme`}>
      <Header />
      <main>
        <Hero />
        <Skills />
        {/* Additional sections can be added here */}
        {/* <About /> */}
        {/* <Projects /> */}
        {/* <Contact /> */}
      </main>
      <Footer />
    </div>
  );
};

export default App;