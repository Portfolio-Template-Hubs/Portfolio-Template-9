import React, { useState, useEffect } from 'react';
import './About.css';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const personalTraits = [
    { icon: '🎯', label: 'Goal-Oriented' },
    { icon: '💡', label: 'Creative Thinker' },
    { icon: '🚀', label: 'Innovation Driven' },
    { icon: '🤝', label: 'Team Player' }
  ];

  return (
    <div className="about-container" id="about">
      {/* Animated Background */}
      <div className="background-overlay">
        <div 
          className="bg-blur bg-blur-1"
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
          }}
        />
        <div 
          className="bg-blur bg-blur-2"
          style={{
            transform: `translate(${mousePosition.x * -0.01}px, ${mousePosition.y * -0.01}px)`
          }}
        />
      </div>

      {/* Floating Particles */}
      <div className="particles-container">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      <div className={`main-content ${isVisible ? 'visible' : ''}`}>
        <div className="container">
          <div className="content-grid">
            
            {/* Left Content */}
            <div className="left-content">
              <div className="content-wrapper">
                <div className="status-badge">
                  <div className="status-dot" />
                  <span>Available for new opportunities</span>
                </div>

                <h1 className="main-title">
                  Hello, I'm{' '}
                  <span className="name-highlight">John</span>
                </h1>

                <div className="description">
                  <p className="fade-in-up" style={{ animationDelay: '0.3s' }}>
                    I'm a passionate <span className="highlight-purple">full-stack developer</span> who loves crafting digital experiences that make a real impact. My journey began with simple curiosity about how things work on the web, and it has evolved into a deep passion for solving complex problems through elegant code.
                  </p>
                  
                  <p className="fade-in-up" style={{ animationDelay: '0.6s' }}>
                    I believe in the power of <span className="highlight-blue">clean architecture</span>, intuitive design, and continuous learning. Every project is an opportunity to push boundaries and create something meaningful.
                  </p>
                  
                  <p className="fade-in-up" style={{ animationDelay: '0.9s' }}>
                    When I'm not immersed in code, you'll find me exploring emerging technologies, contributing to open-source projects, or mentoring fellow developers in the community.
                  </p>
                </div>

                {/* Personal Traits */}
                <div className="traits-container">
                  {personalTraits.map((trait, index) => (
                    <div
                      key={trait.label}
                      className="trait-item"
                      style={{ animationDelay: `${1.2 + index * 0.1}s` }}
                    >
                      <span className="trait-icon">{trait.icon}</span>
                      <span className="trait-label">{trait.label}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Buttons */}
                <div className="cta-buttons">
                  <button className="btn-primary">
                    <span>Let's Connect</span>
                  </button>
                  
                  <button className="btn-secondary">
                    View My Work
                    <span className="arrow">→</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Visual */}
            <div className="right-content">
              <div className="visual-container">
                {/* Main Profile Circle */}
                <div className="profile-circle">
                  <div className="rotating-border" />
                  <div className="profile-inner">
                    <div className="profile-emoji">👨‍💻</div>
                  </div>
                  
                  {/* Orbiting Elements */}
                  <div className="orbiting-container">
                    <div className="orbit-item orbit-1">⚡</div>
                    <div className="orbit-item orbit-2">🚀</div>
                    <div className="orbit-item orbit-3">💻</div>
                    <div className="orbit-item orbit-4">🎨</div>
                  </div>
                </div>

                {/* Floating Info Cards */}
                <div className="info-card info-card-1">
                  <div className="card-icon">🎯</div>
                  <div className="card-title">Problem Solver</div>
                  <div className="card-subtitle">Creative Solutions</div>
                </div>

                <div className="info-card info-card-2">
                  <div className="card-icon">🌟</div>
                  <div className="card-title">Innovation</div>
                  <div className="card-subtitle">Future-Ready</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;