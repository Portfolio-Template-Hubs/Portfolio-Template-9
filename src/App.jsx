import React from 'react';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Skills from './components/Skills/Skills';
import Footer from './components/Footer/Footer';
import ParticleBackground from './components/ParticleBackground/ParticleBackground';
import './App.css';

const App = () => {
  return (
    <div className="app dark-theme">
      <ParticleBackground />
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