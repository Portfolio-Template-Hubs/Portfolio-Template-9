import React from 'react';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Skills from './components/Skills/Skills';
import About from './components/About/About';
import Footer from './components/Footer/Footer';
import ParticleBackground from './components/ParticleBackground/ParticleBackground';
import Projects from './components/Project/Project';
import Testimonials from './components/Testimonials/Testimonials';
import Achievements from './components/Achievements/Achievements';
import './App.css';

const App = () => {
  return (
    <div className="app dark-theme">
      <ParticleBackground />
      <Header />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Testimonials />
        <Achievements />
        {/* Additional sections can be added here */}
        {/* <Contact /> */}
      </main>
      <Footer />
    </div>
  );
};

export default App;