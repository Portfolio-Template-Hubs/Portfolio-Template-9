import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import './Achievements.css';

const Achievements = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredCard, setHoveredCard] = useState(null);
  const containerRef = useRef(null);
  const timelineRef = useRef(null);
  const controls = useAnimation();
  
  // For 3D tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [8, -8]);
  const rotateY = useTransform(x, [-100, 100], [-8, 8]);
  const springConfig = { damping: 25, stiffness: 150 };
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);

  // Sample achievements data
  const achievements = [
    {
      id: 1,
      year: "2025",
      title: "Microsoft Certified Azure Developer",
      description: "Earned the Azure Developer Associate certification, validating my skills in designing, building, testing, and maintaining cloud applications on Microsoft Azure.",
      category: "Certification",
      icon: "✓",
      color: "#4db5ff",
      link: "#"
    },
    {
      id: 2,
      year: "2024",
      title: "Innovation Award Winner",
      description: "Received the 'Most Innovative Project' award at the Annual Tech Summit for developing an AI-powered accessibility solution that helps visually impaired users navigate web interfaces.",
      category: "Award",
      icon: "🏆",
      color: "#ff6b6b",
      link: "#"
    },
    {
      id: 3,
      year: "2024",
      title: "Published Research Paper",
      description: "Co-authored a research paper on 'Advanced Web Rendering Techniques' published in the International Journal of Web Development.",
      category: "Publication",
      icon: "📄",
      color: "#22c55e",
      link: "#"
    },
    {
      id: 4,
      year: "2023",
      title: "Google UX Design Certificate",
      description: "Completed the comprehensive Google UX Design Professional Certificate, mastering the fundamentals of user experience research and design.",
      category: "Certification",
      icon: "✓",
      color: "#4db5ff",
      link: "#"
    },
    {
      id: 5,
      year: "2023",
      title: "Featured on Tech Innovators List",
      description: "Named one of the 'Top 30 Under 30 Tech Innovators' by TechWorld Magazine for contributions to open-source web development projects.",
      category: "Recognition",
      icon: "🌟",
      color: "#ff6b6b",
      link: "#"
    },
    {
      id: 6,
      year: "2022",
      title: "Launched SaaS Platform",
      description: "Successfully launched a SaaS platform that helps small businesses automate their customer service operations, gaining over 10,000 users in the first year.",
      category: "Milestone",
      icon: "🚀",
      color: "#22c55e",
      link: "#"
    }
  ];

  // Function to transform linear array into columned array for better visualization
  const transformAchievements = () => {
    const even = achievements.filter((_, i) => i % 2 === 0);
    const odd = achievements.filter((_, i) => i % 2 !== 0);
    return { even, odd };
  };

  const { even, odd } = transformAchievements();

  // Handle intersection observer to trigger animations when component is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          controls.start("visible");
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [controls]);

  // Handle mouse movement effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left - rect.width / 2,
          y: e.clientY - rect.top - rect.height / 2,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  // Particle component with enhanced visuals
  const Particle = ({ delay, duration, type = 'default' }) => {
    const particleClass = `achievement-particle ${type === 'glow' ? 'particle-glow' : ''}`;
    const particleSize = type === 'glow' ? Math.random() * 5 + 2 : Math.random() * 3 + 1;
    
    return (
      <motion.div
        className={particleClass}
        style={{ width: particleSize, height: particleSize }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ 
          opacity: [0, type === 'glow' ? 0.8 : 0.6, 0],
          scale: [0, 1, 0],
          x: Math.random() * 800 - 400,
          y: Math.random() * 600 - 300,
          rotate: Math.random() * 360
        }}
        transition={{
          duration: duration,
          delay: delay,
          repeat: Infinity,
          repeatDelay: Math.random() * 5,
          ease: "easeInOut"
        }}
      />
    );
  };

  // Timeline progress indicator
  const TimelineProgress = ({ achievements, activeIndex }) => {
    const progress = activeIndex !== null 
      ? (achievements.findIndex(a => a.id === activeIndex) + 1) / achievements.length 
      : 0;
    
    return (
      <motion.div 
        className="timeline-progress-indicator"
        initial={{ height: 0 }}
        animate={{ height: `${progress * 100}%` }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      />
    );
  };

  // Function to handle card hover
  const handleCardHover = (index, isHovering) => {
    setHoveredCard(isHovering ? index : null);
    
    // Update 3D effect motion values
    if (isHovering) {
      x.set(0);
      y.set(0);
    }
  };
  
  // Function to handle card mouse move for 3D effect
  const handleCardMouseMove = (event, cardRef) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate the distance from the center
    const mouseX = event.clientX - centerX;
    const mouseY = event.clientY - centerY;
    
    // Update motion values
    x.set(mouseX);
    y.set(mouseY);
  };

  // Function to handle card click
  const handleCardClick = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
    
    // Scroll to timeline section when mobile view and card is clicked
    if (window.innerWidth <= 768) {
      const element = document.getElementById(`achievement-${index}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  // Function to get achievement badge styling
  const getBadgeStyle = (category) => {
    switch(category) {
      case 'Certification':
        return { background: 'rgba(77, 181, 255, 0.1)', color: '#4db5ff', border: '1px solid rgba(77, 181, 255, 0.3)' };
      case 'Award':
        return { background: 'rgba(255, 107, 107, 0.1)', color: '#ff6b6b', border: '1px solid rgba(255, 107, 107, 0.3)' };
      case 'Publication':
        return { background: 'rgba(34, 197, 94, 0.1)', color: '#22c55e', border: '1px solid rgba(34, 197, 94, 0.3)' };
      case 'Recognition':
        return { background: 'rgba(255, 107, 107, 0.1)', color: '#ff6b6b', border: '1px solid rgba(255, 107, 107, 0.3)' };
      case 'Milestone':
        return { background: 'rgba(34, 197, 94, 0.1)', color: '#22c55e', border: '1px solid rgba(34, 197, 94, 0.3)' };
      default:
        return { background: 'rgba(255, 255, 255, 0.1)', color: '#ffffff', border: '1px solid rgba(255, 255, 255, 0.3)' };
    }
  };

  return (
    <section 
      ref={containerRef}
      className="achievements-section" 
      id="achievements"
    >
      {/* Background elements with enhanced effects */}
      <div className="achievements-bg">
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
        <div 
          className="bg-blur bg-blur-3"
          style={{
            transform: `translate(${mousePosition.x * 0.015}px, ${mousePosition.y * 0.015}px)`
          }}
        />
        <div className="achievements-grid-overlay"></div>
      </div>

      {/* Enhanced animated particles */}
      <div className="achievements-particles">
        {[...Array(10)].map((_, i) => (
          <Particle 
            key={i} 
            delay={i * 0.2} 
            duration={3 + Math.random() * 2}
            type="default"
          />
        ))}
        {[...Array(8)].map((_, i) => (
          <Particle 
            key={i + 10} 
            delay={i * 0.3} 
            duration={4 + Math.random() * 3}
            type="glow"
          />
        ))}
      </div>

      {/* Floating shapes */}
      <motion.div 
        className="floating-shape achievement-shape-1"
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
        className="floating-shape achievement-shape-2"
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
      <div className="achievements-container">
        <motion.div 
          className="achievements-content"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          <motion.div className="achievements-header" variants={itemVariants}>
            <motion.span 
              className="section-subtitle"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Career Highlights
            </motion.span>
            <motion.h2 
              className="section-title"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Professional <span className="highlight">Achievements</span>
            </motion.h2>
            <motion.p 
              className="section-description"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              A curated collection of certifications, awards, and milestones that showcase my dedication to excellence and continuous growth in the tech industry.
            </motion.p>
          </motion.div>
          <motion.div 
            className="achievements-timeline" 
            ref={timelineRef}
            variants={itemVariants}
          >
            <div className="timeline-center-line">
              <TimelineProgress achievements={achievements} activeIndex={activeIndex} />
            </div>
            
            {/* Left column (Even indexed achievements) */}
            <div className="timeline-column left-column">
              {even.map((achievement, index) => {
                const cardRef = useRef(null);
                const isActive = activeIndex === achievement.id;
                const isHovered = hoveredCard === achievement.id;
                
                return (
                  <motion.div 
                    id={`achievement-${achievement.id}`}
                    key={achievement.id}
                    ref={cardRef}
                    className={`timeline-card left-card ${isActive ? 'expanded' : ''} ${isHovered ? 'hovered' : ''}`}
                    onClick={() => handleCardClick(achievement.id)}
                    onMouseEnter={() => handleCardHover(achievement.id, true)}
                    onMouseMove={(e) => handleCardMouseMove(e, cardRef)}
                    onMouseLeave={() => handleCardHover(achievement.id, false)}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ 
                      opacity: 1, 
                      x: 0,
                      rotateX: isHovered ? springRotateX : 0,
                      rotateY: isHovered ? springRotateY : 0,
                      z: isHovered ? 50 : 0
                    }}
                    transition={{ 
                      delay: index * 0.2,
                      type: "spring",
                      stiffness: 300,
                      damping: 15
                    }}
                    whileHover={{ scale: 1.03, y: -5 }}
                    style={{
                      borderColor: achievement.color,
                      perspective: "1000px"
                    }}
                  >
                    <motion.div 
                      className="card-glow"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: isHovered ? 0.6 : 0 }}
                      transition={{ duration: 0.3 }}
                      style={{ 
                        background: `radial-gradient(circle at center, ${achievement.color}40 0%, transparent 70%)` 
                      }}
                    />
                    
                    <motion.div 
                      className="timeline-year" 
                      style={{ backgroundColor: achievement.color }}
                      whileHover={{ scale: 1.1 }}
                      animate={{ 
                        y: isActive ? [0, -5, 0] : 0,
                        transition: { 
                          y: { duration: 0.3, repeat: isActive ? 1 : 0 } 
                        }
                      }}
                    >
                      {achievement.year}
                    </motion.div>
                    
                    <div className="timeline-content">
                      <h3 className="timeline-title">{achievement.title}</h3>
                      <motion.div 
                        className="badge"
                        style={getBadgeStyle(achievement.category)}
                        whileHover={{ scale: 1.05 }}
                      >
                        <span className="badge-icon">{achievement.icon}</span>
                        {achievement.category}
                      </motion.div>
                      
                      <AnimatePresence>
                        {isActive && (
                          <motion.p 
                            className="timeline-description"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                          >
                            {achievement.description}
                          </motion.p>
                        )}
                      </AnimatePresence>
                      
                      <AnimatePresence>
                        {isActive && (
                          <motion.a 
                            href={achievement.link} 
                            className="learn-more-link"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.4, delay: 0.1 }}
                            whileHover={{ x: 3 }}
                          >
                            Learn more
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </motion.a>
                        )}
                      </AnimatePresence>
                    </div>
                    
                    <motion.div 
                      className="timeline-icon" 
                      style={{ backgroundColor: achievement.color }}
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      animate={isActive ? {
                        scale: [1, 1.2, 1],
                        transition: { duration: 0.5, repeat: 0 }
                      } : {}}
                    >
                      {achievement.icon}
                    </motion.div>
                    
                    <motion.div 
                      className="connect-line"
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    />
                  </motion.div>
                );
              })}
            </div>
            {/* Right column (Odd indexed achievements) */}
            <div className="timeline-column right-column">
              {odd.map((achievement, index) => {
                const cardRef = useRef(null);
                const isActive = activeIndex === achievement.id;
                const isHovered = hoveredCard === achievement.id;
                
                return (
                  <motion.div 
                    id={`achievement-${achievement.id}`}
                    key={achievement.id}
                    ref={cardRef}
                    className={`timeline-card right-card ${isActive ? 'expanded' : ''} ${isHovered ? 'hovered' : ''}`}
                    onClick={() => handleCardClick(achievement.id)}
                    onMouseEnter={() => handleCardHover(achievement.id, true)}
                    onMouseMove={(e) => handleCardMouseMove(e, cardRef)}
                    onMouseLeave={() => handleCardHover(achievement.id, false)}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ 
                      opacity: 1, 
                      x: 0,
                      rotateX: isHovered ? springRotateX : 0,
                      rotateY: isHovered ? springRotateY : 0,
                      z: isHovered ? 50 : 0
                    }}
                    transition={{ 
                      delay: 0.1 + index * 0.2,
                      type: "spring",
                      stiffness: 300,
                      damping: 15
                    }}
                    whileHover={{ scale: 1.03, y: -5 }}
                    style={{
                      borderColor: achievement.color,
                      perspective: "1000px"
                    }}
                  >
                    <motion.div 
                      className="card-glow"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: isHovered ? 0.6 : 0 }}
                      transition={{ duration: 0.3 }}
                      style={{ 
                        background: `radial-gradient(circle at center, ${achievement.color}40 0%, transparent 70%)` 
                      }}
                    />
                    
                    <motion.div 
                      className="timeline-year" 
                      style={{ backgroundColor: achievement.color }}
                      whileHover={{ scale: 1.1 }}
                      animate={{ 
                        y: isActive ? [0, -5, 0] : 0,
                        transition: { 
                          y: { duration: 0.3, repeat: isActive ? 1 : 0 } 
                        }
                      }}
                    >
                      {achievement.year}
                    </motion.div>
                    
                    <div className="timeline-content">
                      <h3 className="timeline-title">{achievement.title}</h3>
                      <motion.div 
                        className="badge"
                        style={getBadgeStyle(achievement.category)}
                        whileHover={{ scale: 1.05 }}
                      >
                        <span className="badge-icon">{achievement.icon}</span>
                        {achievement.category}
                      </motion.div>
                      
                      <AnimatePresence>
                        {isActive && (
                          <motion.p 
                            className="timeline-description"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                          >
                            {achievement.description}
                          </motion.p>
                        )}
                      </AnimatePresence>
                      
                      <AnimatePresence>
                        {isActive && (
                          <motion.a 
                            href={achievement.link} 
                            className="learn-more-link"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.4, delay: 0.1 }}
                            whileHover={{ x: 3 }}
                          >
                            Learn more
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </motion.a>
                        )}
                      </AnimatePresence>
                    </div>
                    
                    <motion.div 
                      className="timeline-icon" 
                      style={{ backgroundColor: achievement.color }}
                      whileHover={{ scale: 1.2, rotate: -10 }}
                      animate={isActive ? {
                        scale: [1, 1.2, 1],
                        transition: { duration: 0.5, repeat: 0 }
                      } : {}}
                    >
                      {achievement.icon}
                    </motion.div>
                    
                    <motion.div 
                      className="connect-line"
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    />
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          <motion.div className="achievements-bottom" variants={itemVariants}>
            <motion.div 
              className="achievements-stats"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <motion.div 
                className="stat-item"
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="stat-number-wrapper">
                  <motion.div 
                    className="stat-number"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.9 }}
                  >
                    10+
                  </motion.div>
                  <div className="stat-circle"></div>
                </div>
                <div className="stat-label">Certifications</div>
              </motion.div>
              
              <motion.div 
                className="stat-item"
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="stat-number-wrapper">
                  <motion.div 
                    className="stat-number"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 1.1 }}
                  >
                    5
                  </motion.div>
                  <div className="stat-circle"></div>
                </div>
                <div className="stat-label">Awards</div>
              </motion.div>
              
              <motion.div 
                className="stat-item"
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="stat-number-wrapper">
                  <motion.div 
                    className="stat-number"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 1.3 }}
                  >
                    8
                  </motion.div>
                  <div className="stat-circle"></div>
                </div>
                <div className="stat-label">Publications</div>
              </motion.div>
            </motion.div>

            <motion.div 
              className="cta-container"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <motion.a 
                href="/resume.pdf" 
                className="cta-button"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                download
              >
                <span>Download Full Resume</span>
                <motion.svg 
                  className="btn-icon" 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  animate={{ y: [0, 2, 0] }}
                  transition={{ duration: 1, repeat: Infinity, repeatType: "loop" }}
                >
                  <path d="M12 16L12 8M12 16L8 12M12 16L16 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3 15V16C3 18.2091 4.79086 20 7 20H17C19.2091 20 21 18.2091 21 16V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </motion.svg>
              </motion.a>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Achievements;
