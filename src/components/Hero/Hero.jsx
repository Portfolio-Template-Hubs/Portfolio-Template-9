import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import './Hero.css'

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [currentStringIndex, setCurrentStringIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const heroRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 20 });

  const strings = [
    'Full Stack Developer',
    'UI/UX Designer', 
    'Problem Solver',
    'Tech Innovator',
    'Creative Thinker'
  ];

  // Enhanced typing animation
  useEffect(() => {
    const typeSpeed = isDeleting ? 50 : 100;
    const currentString = strings[currentStringIndex];
    
    const timeout = setTimeout(() => {
      if (!isDeleting && typedText === currentString) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && typedText === '') {
        setIsDeleting(false);
        setCurrentStringIndex((prev) => (prev + 1) % strings.length);
      } else {
        setTypedText(
          isDeleting
            ? currentString.substring(0, typedText.length - 1)
            : currentString.substring(0, typedText.length + 1)
        );
      }
    }, typeSpeed);

    return () => clearTimeout(timeout);
  }, [typedText, isDeleting, currentStringIndex, strings]);

  // Mouse movement effect
  const handleMouseMove = (e) => {
    if (heroRef.current) {
      const rect = heroRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left - rect.width / 2);
      mouseY.set(e.clientY - rect.top - rect.height / 2);
    }
  };

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Particle component
  const Particle = ({ delay, duration }) => (
    <motion.div
      className="particle"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: [0, 1, 0],
        scale: [0, 1, 0],
        x: Math.random() * 800 - 400,
        y: Math.random() * 600 - 300
      }}
      transition={{
        duration: duration,
        delay: delay,
        repeat: Infinity,
        repeatDelay: Math.random() * 5
      }}
    />
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <section 
      ref={heroRef}
      className="hero"
      onMouseMove={handleMouseMove}
      id="home"
    >
      {/* Animated background particles */}
      <div className="particles-container">
        {[...Array(30)].map((_, i) => (
          <Particle 
            key={i} 
            delay={i * 0.2} 
            duration={3 + Math.random() * 2}
          />
        ))}
      </div>

      {/* Floating geometric shapes */}
      <motion.div 
        className="floating-shape shape-1"
        animate={{ 
          rotate: 360,
          x: [0, 50, 0, -50, 0],
          y: [0, -30, 0, 30, 0]
        }}
        transition={{ 
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <motion.div 
        className="floating-shape shape-2"
        animate={{ 
          rotate: -360,
          x: [0, -40, 0, 40, 0],
          y: [0, 40, 0, -40, 0]
        }}
        transition={{ 
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <motion.div 
        className="floating-shape shape-3"
        animate={{ 
          scale: [1, 1.2, 1, 0.8, 1],
          rotate: 180
        }}
        transition={{ 
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="hero-container">
        <motion.div 
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          <div className="hero-text">
            <motion.div 
              className="status-badge"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
            >
              <span className="status-dot"></span>
              Available for new opportunities
            </motion.div>

            <motion.p 
              className="intro-text"
              variants={itemVariants}
            >
              Hello, I'm
            </motion.p>
            
            <motion.h1 
              className="name"
              variants={itemVariants}
            >
              Nikhil
              <span className="name-accent">.</span>
            </motion.h1>
            
            <motion.h2 
              className="title"
              variants={itemVariants}
            >
              <span className="typed-text">
                {typedText}
                <span className="cursor">|</span>
              </span>
            </motion.h2>
            
            <motion.p 
              className="description"
              variants={itemVariants}
            >
              I craft exceptional digital experiences that bridge the gap between 
              design and functionality. With a passion for clean code and innovative 
              solutions, I transform ideas into powerful web applications that make 
              a lasting impact.
            </motion.p>

            <motion.div 
              className="stats-container"
              variants={itemVariants}
            >
              <div className="stat-item">
                <div className="stat-number">50+</div>
                <div className="stat-label">Projects Completed</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">3+</div>
                <div className="stat-label">Years Experience</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">99%</div>
                <div className="stat-label">Client Satisfaction</div>
              </div>
            </motion.div>

            <motion.div 
              className="skill-badges"
              variants={itemVariants}
            >
              {['React', 'Node.js', 'TypeScript', 'MongoDB', 'AWS', 'GraphQL', 'Docker', 'Next.js'].map((skill, index) => (
                <motion.span 
                  key={skill}
                  className="badge"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                >
                  {skill}
                </motion.span>
              ))}
            </motion.div>
            
            <motion.div 
              className="hero-buttons"
              variants={itemVariants}
            >
              <motion.a 
                href="#contact" 
                className="btn btn-primary"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Let's Work Together</span>
                <svg className="btn-icon" viewBox="0 0 24 24" fill="none">
                  <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.a>
              
              <motion.a 
                href="#projects" 
                className="btn btn-secondary"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>View My Work</span>
              </motion.a>
              
              <motion.a 
                href="/resume.pdf" 
                className="btn btn-outline"
                download
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Download CV</span>
              </motion.a>
            </motion.div>
            
            <motion.div 
              className="social-section"
              variants={itemVariants}
            >
              <p className="social-label">Follow me on</p>
              <div className="social-icons">
                {[
                  { icon: 'github', url: 'https://github.com', label: 'GitHub' },
                  { icon: 'linkedin', url: 'https://linkedin.com', label: 'LinkedIn' },
                  { icon: 'twitter', url: 'https://twitter.com', label: 'Twitter' },
                  { icon: 'dribbble', url: 'https://dribbble.com', label: 'Dribbble' }
                ].map((social, index) => (
                  <motion.a 
                    key={social.icon}
                    href={social.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label={social.label}
                    className="social-icon"
                    whileHover={{ scale: 1.2, y: -3 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 + index * 0.1 }}
                  >
                    <i className={`fab fa-${social.icon}`}></i>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
          
          <motion.div 
            className="hero-image"
            variants={itemVariants}
          >
            <motion.div 
              className="image-container"
              style={{ x: springX, y: springY }}
            >
              <div className="glow-effect"></div>
              <motion.div 
                className="blob"
                animate={{ 
                  rotate: 360,
                  borderRadius: [
                    "60% 40% 30% 70% / 60% 30% 70% 40%",
                    "30% 60% 70% 40% / 50% 60% 30% 60%",
                    "60% 40% 30% 70% / 60% 30% 70% 40%"
                  ]
                }}
                transition={{ 
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <div className="profile-img"></div>
              <div className="image-border"></div>
            </motion.div>
            
            <motion.div 
              className="floating-elements"
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            >
              <div className="floating-icon icon-1">⚡</div>
              <div className="floating-icon icon-2">🚀</div>
              <div className="floating-icon icon-3">💡</div>
              <div className="floating-icon icon-4">🎨</div>
            </motion.div>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <motion.a 
            href="#about"
            className="scroll-link"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="scroll-text">Scroll to explore</span>
            <div className="scroll-arrows">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;