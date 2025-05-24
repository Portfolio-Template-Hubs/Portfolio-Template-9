import React, { useState, useEffect } from 'react';
import './Header.css';
const Header = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleNavClick = (sectionId) => {
    setActiveSection(sectionId);
    setSidebarOpen(false);
  };

  const navItems = [
    { id: 'home', label: 'Home', icon: '🏠', gradient: 'from-blue-500 to-purple-600' },
    { id: 'about', label: 'About', icon: '👨‍💻', gradient: 'from-green-500 to-teal-600' },
    { id: 'skills', label: 'Skills', icon: '⚡', gradient: 'from-yellow-500 to-orange-600' },
    { id: 'projects', label: 'Projects', icon: '🚀', gradient: 'from-pink-500 to-rose-600' },
    { id: 'experience', label: 'Experience', icon: '💼', gradient: 'from-indigo-500 to-purple-600' },
    { id: 'blog', label: 'Blog', icon: '📝', gradient: 'from-cyan-500 to-blue-600' },
    { id: 'contact', label: 'Contact', icon: '📧', gradient: 'from-emerald-500 to-green-600' }
  ];

  const socialLinks = [
    { platform: 'GitHub', icon: '🔗', url: '#', color: 'hover:text-gray-300' },
    { platform: 'LinkedIn', icon: '💼', url: '#', color: 'hover:text-blue-400' },
    { platform: 'Twitter', icon: '🐦', url: '#', color: 'hover:text-sky-400' },
    { platform: 'Instagram', icon: '📷', url: '#', color: 'hover:text-pink-400' },
    { platform: 'Discord', icon: '🎮', url: '#', color: 'hover:text-indigo-400' }
  ];

  const themeClass = theme === 'dark' ? 'theme-dark' : 'theme-light';

  return (
    <div className={`header-wrapper ${themeClass}`}>
      {/* Animated Background */}
      <div className="animated-bg">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
      </div>

      {/* Mouse Follower */}
      <div 
        className="mouse-follower"
        style={{
          left: mousePosition.x + 'px',
          top: mousePosition.y + 'px'
        }}
      ></div>

      {/* Main Header Bar */}
      <header className={`header ${scrolled ? 'scrolled' : ''}`}>
        <div className="header-container">
          <div className="logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="logo-bg-effect"></div>
            <div className="logo-icon">
              <span className="logo-bracket">&lt;</span>
              <span className="logo-slash">/</span>
              <span className="logo-bracket">&gt;</span>
            </div>
            <h1 className="logo-text">
              Nikhil<span className="logo-accent">Dev</span>
            </h1>
            <div className="logo-particles">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="particle" style={{'--delay': `${i * 0.3}s`}}></div>
              ))}
            </div>
          </div>
          
          <div className="header-actions">
            <div className="status-container">
              <div className="status-badge header-status-badge">
                <div className="status-indicator"></div>
                <span className="status-text">Available for work</span>
                <div className="status-ripple"></div>
              </div>
              <div className="status-glow"></div>
            </div>
            
            <button onClick={toggleTheme} className="theme-toggle-btn">
              <div className="theme-bg"></div>
              <div className="theme-icon-container">
                <span className="theme-icon">{theme === 'light' ? '🌙' : '☀️'}</span>
              </div>
              <div className="theme-shine"></div>
              <div className="theme-ripples">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="theme-ripple" style={{'--delay': `${i * 0.2}s`}}></div>
                ))}
              </div>
            </button>

            <button onClick={toggleSidebar} className={`sidebar-toggle ${sidebarOpen ? 'active' : ''}`}>
              <div className="hamburger-bg"></div>
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
            </button>
          </div>
        </div>
        
        <div className="header-border-glow"></div>
      </header>

      {/* Sidebar Navigation */}
      <nav className={`sidebar ${sidebarOpen ? 'active' : ''}`}>
        <div className="sidebar-backdrop"></div>
        <div className="sidebar-content">
          <div className="sidebar-header">
            <div className="sidebar-logo">
              <div className="sidebar-logo-icon">
                <div className="logo-hexagon">
                  <span>N</span>
                </div>
              </div>
              <div className="sidebar-logo-text">
                <span className="sidebar-title">Navigation</span>
                <span className="sidebar-subtitle">Explore & Connect</span>
              </div>
            </div>
            <div className="sidebar-decorative-line">
              <div className="line-segment"></div>
              <div className="line-dot"></div>
              <div className="line-segment"></div>
            </div>
          </div>

          <ul className="sidebar-nav">
            {navItems.map((item, index) => (
              <li key={item.id} className="sidebar-nav-item" style={{'--delay': `${index * 0.05}s`}}>
                <a 
                  href={`#${item.id}`} 
                  className={`sidebar-nav-link ${activeSection === item.id ? 'active' : ''}`}
                  onClick={() => handleNavClick(item.id)}
                >
                  <div className="nav-icon-container">
                    <div className={`nav-icon-bg bg-gradient-to-r ${item.gradient}`}></div>
                    <span className="nav-icon">{item.icon}</span>
                  </div>
                  <div className="nav-content">
                    <span className="nav-text">{item.label}</span>
                    <span className="nav-number">0{index + 1}</span>
                  </div>
                  <div className="nav-arrow">→</div>
                  <div className="nav-ripple"></div>
                  <div className="nav-glow"></div>
                </a>
              </li>
            ))}
          </ul>

          <div className="sidebar-footer">
            <div className="sidebar-social">
              <div className="social-header">
                <span className="social-title">Let's Connect</span>
                <div className="social-decoration">
                  <div className="social-dot"></div>
                  <div className="social-line"></div>
                </div>
              </div>
              
              <div className="social-links">
                {socialLinks.map((social, index) => (
                  <a 
                    key={social.platform}
                    href={social.url} 
                    className={`social-link ${social.color}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={social.platform}
                    style={{'--delay': `${index * 0.1}s`}}
                  >
                    <div className="social-icon-container">
                      <span className="social-icon">{social.icon}</span>
                      <div className="social-icon-glow"></div>
                    </div>
                    <div className="social-hover-effect"></div>
                  </a>
                ))}
              </div>
            </div>
            
            <div className="sidebar-credits">
              <div className="credits-content">
                <p className="credits-main">© 2024 NikhilDev</p>
                <p className="credits-sub">Crafted with passion & innovation</p>
              </div>
              <div className="credits-decoration">
                <div className="credits-dot"></div>
                <div className="credits-line"></div>
                <div className="credits-dot"></div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Overlay */}
      {sidebarOpen && <div className="mobile-backdrop" onClick={() => setSidebarOpen(false)}></div>}
    </div>
  );
};

export default Header;