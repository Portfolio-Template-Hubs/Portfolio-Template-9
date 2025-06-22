import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import './Contact.css';

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const controls = useAnimation();

  // Detect when section becomes visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          controls.start('visible');
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

  // Handle mouse movement for parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        setMousePosition({ x, y });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.5
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add real form submission logic here
    
    // Simulate form submission
    setTimeout(() => {
      setSubmitted(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setFormState({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
        setSubmitted(false);
      }, 3000);
    }, 1000);
  };

  // Contact information data
  const contactInfo = [
    {
      icon: '📍',
      title: 'Location',
      content: 'Mumbai, Maharashtra, India',
      gradient: 'from-rose-500 to-orange-500'
    },
    {
      icon: '📧',
      title: 'Email',
      content: 'nikhildev@example.com',
      gradient: 'from-cyan-500 to-blue-500'
    },
    {
      icon: '📱',
      title: 'Phone',
      content: '+91 98765 43210',
      gradient: 'from-green-500 to-teal-500'
    }
  ];

  // Social media data
  const socialMedia = [
    {
      platform: 'GitHub',
      icon: '🔗',
      url: 'https://github.com',
      gradient: 'from-gray-800 to-gray-600',
      label: 'Follow me on GitHub'
    },
    {
      platform: 'LinkedIn',
      icon: '💼',
      url: 'https://linkedin.com',
      gradient: 'from-blue-600 to-blue-800',
      label: 'Connect on LinkedIn'
    },
    {
      platform: 'Twitter',
      icon: '🐦',
      url: 'https://twitter.com',
      gradient: 'from-sky-400 to-blue-500',
      label: 'Follow me on Twitter'
    },
    {
      platform: 'Instagram',
      icon: '📷',
      url: 'https://instagram.com',
      gradient: 'from-pink-500 to-purple-500',
      label: 'Follow me on Instagram'
    },
    {
      platform: 'Discord',
      icon: '🎮',
      url: 'https://discord.com',
      gradient: 'from-indigo-500 to-purple-600',
      label: 'Join my Discord'
    }
  ];

  // Generate particles for background animation
  const Particle = ({ delay, duration, size, color }) => (
    <motion.div
      className="contact-particle"
      style={{ 
        width: size, 
        height: size, 
        background: color 
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: [0, 1, 0],
        scale: [0, 1, 0],
        x: Math.random() * 800 - 400,
        y: Math.random() * 600 - 300,
        rotate: Math.random() * 360
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
      className="contact-section" 
      id="contact"
    >
      {/* Background elements */}
      <div className="contact-bg">
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
        <div className="contact-grid-overlay"></div>
      </div>

      {/* Animated particles */}
      <div className="contact-particles">
        {[...Array(10)].map((_, i) => (
          <Particle 
            key={i} 
            delay={i * 0.2} 
            duration={3 + Math.random() * 2}
            size={Math.random() * 4 + 2}
            color={`rgba(77, 181, 255, ${Math.random() * 0.5 + 0.3})`}
          />
        ))}
        {[...Array(8)].map((_, i) => (
          <Particle 
            key={i + 10} 
            delay={i * 0.3} 
            duration={4 + Math.random() * 3}
            size={Math.random() * 5 + 3}
            color={`rgba(255, 107, 107, ${Math.random() * 0.5 + 0.3})`}
          />
        ))}
      </div>

      {/* Floating shapes */}
      <div className="floating-shapes">
        <motion.div 
          className="floating-shape shape-1"
          animate={{
            y: [0, 15, 0],
            rotate: [0, 5, 0]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="floating-shape shape-2"
          animate={{
            y: [0, -20, 0],
            rotate: [0, -5, 0]
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.div 
          className="floating-shape shape-3"
          animate={{
            y: [0, 10, 0],
            x: [0, -10, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        />
      </div>

      <div className="contact-container">
        <motion.div 
          className="contact-content"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          <motion.div className="contact-header" variants={itemVariants}>
            <motion.span 
              className="section-subtitle"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Get In Touch
            </motion.span>
            <motion.h2 
              className="section-title"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Let's <span className="highlight">Connect</span>
            </motion.h2>
            <motion.p 
              className="section-description"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Have a project in mind or want to discuss a potential collaboration? I'm just a message away. Let's create something amazing together!
            </motion.p>
          </motion.div>

          <div className="contact-main">
            <motion.div 
              className="contact-info-container"
              variants={itemVariants}
            >
              <div className="contact-info-header">
                <h3>Contact Information</h3>
                <div className="header-line"></div>
              </div>
              
              <div className="contact-info-items">
                {contactInfo.map((info, index) => (
                  <motion.div 
                    key={info.title}
                    className="contact-info-item"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + (index * 0.1) }}
                  >
                    <div className={`info-icon bg-gradient-to-r ${info.gradient}`}>
                      <span>{info.icon}</span>
                      <div className="icon-glow"></div>
                    </div>
                    <div className="info-content">
                      <h4>{info.title}</h4>
                      <p>{info.content}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="social-links-container">
                <div className="social-links-header">
                  <h3>Follow Me</h3>
                  <div className="header-line"></div>
                </div>
                <div className="social-links">
                  {socialMedia.map((social, index) => (
                    <motion.a
                      key={social.platform}
                      href={social.url}
                      className={`social-link bg-gradient-to-r ${social.gradient}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 + (index * 0.1) }}
                      whileHover={{ scale: 1.1, y: -5 }}
                      aria-label={social.label}
                    >
                      <span className="social-icon">{social.icon}</span>
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="contact-form-container"
              variants={itemVariants}
            >
              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.form 
                    key="contactForm"
                    className="contact-form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="form-group">
                      <motion.div 
                        className={`form-control ${focusedInput === 'name' ? 'focused' : ''} ${formState.name ? 'has-value' : ''}`}
                        whileTap={{ scale: 0.99 }}
                      >
                        <label htmlFor="name">Your Name</label>
                        <input 
                          type="text" 
                          id="name" 
                          name="name" 
                          required
                          value={formState.name}
                          onChange={handleInputChange}
                          onFocus={() => setFocusedInput('name')}
                          onBlur={() => setFocusedInput(null)}
                        />
                        <div className="input-border"></div>
                        <div className="input-icon">👤</div>
                      </motion.div>
                      
                      <motion.div 
                        className={`form-control ${focusedInput === 'email' ? 'focused' : ''} ${formState.email ? 'has-value' : ''}`}
                        whileTap={{ scale: 0.99 }}
                      >
                        <label htmlFor="email">Your Email</label>
                        <input 
                          type="email" 
                          id="email" 
                          name="email" 
                          required
                          value={formState.email}
                          onChange={handleInputChange}
                          onFocus={() => setFocusedInput('email')}
                          onBlur={() => setFocusedInput(null)}
                        />
                        <div className="input-border"></div>
                        <div className="input-icon">📧</div>
                      </motion.div>
                    </div>
                    
                    <motion.div 
                      className={`form-control ${focusedInput === 'subject' ? 'focused' : ''} ${formState.subject ? 'has-value' : ''}`}
                      whileTap={{ scale: 0.99 }}
                    >
                      <label htmlFor="subject">Subject</label>
                      <input 
                        type="text" 
                        id="subject" 
                        name="subject" 
                        required
                        value={formState.subject}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedInput('subject')}
                        onBlur={() => setFocusedInput(null)}
                      />
                      <div className="input-border"></div>
                      <div className="input-icon">📝</div>
                    </motion.div>
                    
                    <motion.div 
                      className={`form-control ${focusedInput === 'message' ? 'focused' : ''} ${formState.message ? 'has-value' : ''}`}
                      whileTap={{ scale: 0.99 }}
                    >
                      <label htmlFor="message">Your Message</label>
                      <textarea 
                        id="message" 
                        name="message" 
                        rows="5" 
                        required
                        value={formState.message}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedInput('message')}
                        onBlur={() => setFocusedInput(null)}
                      ></textarea>
                      <div className="input-border"></div>
                      <div className="input-icon">💬</div>
                    </motion.div>
                    
                    <motion.button 
                      type="submit" 
                      className="submit-button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span>Send Message</span>
                      <motion.span 
                        className="button-icon"
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        📤
                      </motion.span>
                      <div className="button-glow"></div>
                    </motion.button>
                  </motion.form>
                ) : (
                  <motion.div 
                    key="successMessage"
                    className="success-message"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                  >
                    <div className="success-icon">✅</div>
                    <h3>Message Sent!</h3>
                    <p>Thank you for reaching out. I'll get back to you as soon as possible.</p>
                    <motion.div 
                      className="success-pulse"
                      animate={{ 
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 0, 0.5]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity
                      }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
