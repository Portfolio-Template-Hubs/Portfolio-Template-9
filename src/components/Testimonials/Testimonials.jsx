import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import './Testimonials.css';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeFilter, setActiveFilter] = useState('all');
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const containerRef = useRef(null);
  const cardRef = useRef(null);
  const controls = useAnimation();
  
  // For card 3D effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);
  const springConfig = { damping: 20, stiffness: 100 };
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);

  // Sample testimonial data
  const testimonials = [
    {
      id: 1,
      name: "Alex Johnson",
      position: "CEO, TechInnovate",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      quote: "Working with Nikhil was a game-changer for our company. His technical expertise and creative problem-solving approach transformed our digital presence. The results exceeded our expectations by a wide margin.",
      rating: 5,
      category: "web",
      hasVideo: true,
      videoUrl: "https://www.youtube.com/embed/jYnOBQ93FKY",
    },
    {
      id: 2,
      name: "Sarah Williams",
      position: "Marketing Director, DesignPro",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      quote: "I've worked with many developers over the years, but Nikhil stands out for his attention to detail and commitment to excellence. He didn't just build what we asked for—he improved upon our vision with thoughtful innovations.",
      rating: 5,
      category: "design",
    },
    {
      id: 3,
      name: "Michael Chen",
      position: "Founder, StartupLaunch",
      avatar: "https://randomuser.me/api/portraits/men/64.jpg",
      quote: "Nikhil delivered a website that perfectly captures our brand identity while providing an exceptional user experience. His technical skills combined with design sensibility make him a rare find in the industry.",
      rating: 5,
      category: "web",
      hasVideo: true,
      videoUrl: "https://www.youtube.com/embed/jYnOBQ93FKY",
    },
    {
      id: 4,
      name: "Emily Rodriguez",
      position: "Product Manager, InnovateX",
      avatar: "https://randomuser.me/api/portraits/women/28.jpg",
      quote: "The application Nikhil built for us not only looks beautiful but performs flawlessly. His code is clean, well-documented, and scalable—exactly what we needed for our growing platform.",
      rating: 5,
      category: "app",
    },
  ];

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
      
      // 3D card effect
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const posX = e.clientX - centerX;
        const posY = e.clientY - centerY;
        
        x.set(posX);
        y.set(posY);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [x, y]);

  // Filter testimonials based on category
  const filteredTestimonials = activeFilter === 'all' 
    ? testimonials 
    : testimonials.filter(item => item.category === activeFilter);
    
  // Handle filter change
  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    setCurrentIndex(0);
  };
  
  // Toggle video playing state
  const handleVideoToggle = () => {
    setIsVideoPlaying(!isVideoPlaying);
  };

  // Auto-rotate testimonials (pause when video is playing)
  useEffect(() => {
    if (isVideoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % filteredTestimonials.length);
    }, 6000);
    
    return () => clearInterval(interval);
  }, [filteredTestimonials.length, isVideoPlaying]);

  // Navigation handlers
  const handlePrev = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? filteredTestimonials.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % filteredTestimonials.length);
  };

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

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

  const cardVariants = {
    initial: { opacity: 0, scale: 0.8, y: 30 },
    animate: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: "easeOut",
        scale: { type: "spring", stiffness: 100, damping: 15 }
      } 
    },
    exit: { 
      opacity: 0, 
      scale: 0.8,
      y: -30,
      transition: { duration: 0.4, ease: "easeIn" } 
    },
  };
  
  const quoteIconVariants = {
    initial: { opacity: 0, scale: 0 },
    animate: { 
      opacity: 1,
      scale: [0, 1.2, 1],
      rotate: [0, -10, 0],
      transition: { 
        duration: 1,
        ease: "easeOut",
        delay: 0.3
      }
    }
  };
  
  const filterVariants = {
    active: {
      backgroundColor: "rgba(77, 181, 255, 0.3)",
      color: "#ffffff",
      scale: 1.05,
      boxShadow: "0 5px 15px rgba(77, 181, 255, 0.3)"
    },
    inactive: {
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      color: "#8892b0",
      scale: 1
    }
  };

  // Generate star rating
  const renderStars = (rating) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <span key={i} className={`star ${i < rating ? "filled" : ""}`}>
          ★
        </span>
      ));
  };

  // Particle component
  const Particle = ({ delay, duration }) => (
    <motion.div
      className="testimonial-particle"
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

  return (
    <section 
      ref={containerRef}
      className="testimonials-section" 
      id="testimonials"
    >
      {/* Background elements */}
      <div className="testimonials-bg">
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

      {/* Animated particles */}
      <div className="testimonials-particles">
        {[...Array(15)].map((_, i) => (
          <Particle 
            key={i} 
            delay={i * 0.2} 
            duration={3 + Math.random() * 2}
          />
        ))}
      </div>

      {/* Floating shapes */}
      <motion.div 
        className="floating-shape testimonial-shape-1"
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
        className="floating-shape testimonial-shape-2"
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

      <div className="testimonials-container">
        <motion.div 
          className="testimonials-content"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          <motion.div className="testimonials-header" variants={itemVariants}>
            <span className="section-subtitle">Client Feedback</span>
            <h2 className="section-title">
              What People <span className="highlight">Say</span>
            </h2>
            <p className="section-description">
              Discover what clients and collaborators have to say about working with me and the results of our partnership.
            </p>
            
            {/* Testimonial filters */}
            <motion.div className="testimonial-filters" variants={itemVariants}>
              {['all', 'web', 'design', 'app'].map((filter) => (
                <motion.button
                  key={filter}
                  className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
                  onClick={() => handleFilterChange(filter)}
                  variants={filterVariants}
                  initial="inactive"
                  animate={activeFilter === filter ? "active" : "inactive"}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {filter === 'all' ? 'All' : filter.charAt(0).toUpperCase() + filter.slice(1)}
                </motion.button>
              ))}
            </motion.div>
          </motion.div>

          <motion.div className="testimonials-slider" variants={itemVariants}>
            <div className="slider-wrapper">
              <AnimatePresence mode="wait">
                <motion.div 
                  ref={cardRef}
                  key={currentIndex}
                  className="testimonial-card"
                  variants={cardVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  style={{
                    rotateX: springRotateX,
                    rotateY: springRotateY,
                    transformPerspective: 1200,
                    transformStyle: "preserve-3d"
                  }}
                >
                  <motion.div 
                    className="quote-icon"
                    variants={quoteIconVariants}
                    initial="initial"
                    animate="animate"
                  >
                    <svg width="42" height="36" viewBox="0 0 42 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16.637 0.0300293L9.84961 10.11C13.0768 11.376 15.2354 13.422 16.3252 16.248C17.4151 19.074 17.6309 21.822 16.9727 24.492C16.3145 27.108 14.9316 29.208 12.8241 30.792C10.7165 32.376 8.33105 33.168 5.66772 33.168C4.0878 33.168 2.66486 32.79 1.39891 32.034C0.132953 31.278 0 30.198 0 28.794C0 26.55 0.848913 24.648 2.54674 23.088C4.24457 21.528 6.27126 20.748 8.62578 20.748C9.28399 20.748 9.78512 20.802 10.1292 20.91C10.5243 21.018 10.8684 21.126 11.1615 21.234C10.1754 20.1 8.79342 19.2 7.01592 18.528C5.23843 17.856 3.56968 17.424 2.00969 17.226C1.08506 17.136 0.414673 16.626 0 15.696L5.14751 0.0300293H16.637ZM41.1377 0.0300293L34.3503 10.11C37.5775 11.376 39.7361 13.422 40.8259 16.248C41.9158 19.074 42.1316 21.822 41.4734 24.492C40.8152 27.108 39.4323 29.208 37.3248 30.792C35.2172 32.376 32.8317 33.168 30.1684 33.168C28.5885 33.168 27.1656 32.79 25.8996 32.034C24.6336 31.278 24.5007 30.198 24.5007 28.794C24.5007 26.55 25.3496 24.648 27.0474 23.088C28.7453 21.528 30.772 20.748 33.1265 20.748C33.7847 20.748 34.2858 20.802 34.6299 20.91C35.025 21.018 35.3691 21.126 35.6622 21.234C34.6761 20.1 33.2941 19.2 31.5166 18.528C29.7391 17.856 28.0704 17.424 26.5104 17.226C25.5858 17.136 24.9154 16.626 24.5007 15.696L29.6482 0.0300293H41.1377Z" fill="currentColor"/>
                    </svg>
                  </motion.div>

                  <div className="testimonial-content">
                    {filteredTestimonials[currentIndex].hasVideo && (
                      <motion.div 
                        className="video-testimonial"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ 
                          opacity: isVideoPlaying ? 1 : 0,
                          height: isVideoPlaying ? 'auto' : 0
                        }}
                        transition={{ duration: 0.5 }}
                      >
                        <iframe 
                          width="100%" 
                          height="200" 
                          src={`${filteredTestimonials[currentIndex].videoUrl}?autoplay=${isVideoPlaying ? 1 : 0}&mute=0`} 
                          title="Video testimonial" 
                          frameBorder="0" 
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                          allowFullScreen
                        ></iframe>
                      </motion.div>
                    )}
                    
                    <motion.p 
                      className="testimonial-quote"
                      animate={{ 
                        opacity: isVideoPlaying ? 0.5 : 1,
                        height: isVideoPlaying ? 'auto' : 'auto'
                      }}
                    >
                      {filteredTestimonials[currentIndex].quote}
                    </motion.p>
                    
                    <div className="testimonial-meta">
                      <div className="testimonial-rating">
                        {renderStars(filteredTestimonials[currentIndex].rating)}
                      </div>
                      
                      <motion.div 
                        className="category-badge"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        {filteredTestimonials[currentIndex].category}
                      </motion.div>
                    </div>
                    
                    <div className="testimonial-author">
                      <div className="author-avatar">
                        <img 
                          src={filteredTestimonials[currentIndex].avatar} 
                          alt={filteredTestimonials[currentIndex].name} 
                        />
                        <div className="avatar-glow"></div>
                      </div>
                      
                      <div className="author-info">
                        <h4 className="author-name">{filteredTestimonials[currentIndex].name}</h4>
                        <p className="author-position">{filteredTestimonials[currentIndex].position}</p>
                      </div>
                      
                      {filteredTestimonials[currentIndex].hasVideo && (
                        <motion.button
                          className="video-toggle-btn"
                          onClick={handleVideoToggle}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          {isVideoPlaying ? (
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" fill="currentColor"/>
                            </svg>
                          ) : (
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M8 5v14l11-7-11-7z" fill="currentColor"/>
                            </svg>
                          )}
                          <span>{isVideoPlaying ? "Pause Video" : "Watch Video"}</span>
                        </motion.button>
                      )}
                    </div>
                  </div>
                  
                  <div className="card-shine"></div>
                  <div className="card-shadow"></div>
                </motion.div>
              </AnimatePresence>
              
              <div className="slider-controls">
                <button 
                  className="control-btn prev-btn" 
                  onClick={handlePrev}
                  aria-label="Previous testimonial"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 19L8 12L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                
                <div className="slider-dots">
                  {filteredTestimonials.map((_, index) => (
                    <motion.button
                      key={index}
                      className={`dot-indicator ${index === currentIndex ? "active" : ""}`}
                      onClick={() => handleDotClick(index)}
                      aria-label={`Go to testimonial ${index + 1}`}
                      initial={{ scale: 0.8, opacity: 0.5 }}
                      animate={{ 
                        scale: index === currentIndex ? 1.2 : 1,
                        opacity: index === currentIndex ? 1 : 0.7 
                      }}
                      whileHover={{ scale: 1.3, opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  ))}
                </div>
                
                <button 
                  className="control-btn next-btn" 
                  onClick={handleNext}
                  aria-label="Next testimonial"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
          
          <motion.div className="cta-container" variants={itemVariants}>
            <motion.a 
              href="#contact" 
              className="cta-button"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Start Your Project</span>
              <svg className="btn-icon" viewBox="0 0 24 24" fill="none">
                <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
