import React, { useState, useEffect } from 'react';
import { ExternalLink, Github, Eye, Code, Sparkles, ArrowRight, Star, Zap, Heart } from 'lucide-react';
import './Project.css';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [visibleProjects, setVisibleProjects] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const projects = [
    {
      id: 1,
      title: "AI-Powered Dashboard",
      description: "A sophisticated analytics dashboard with real-time data visualization and machine learning insights that transforms raw data into actionable business intelligence.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
      category: "web",
      technologies: ["React", "Node.js", "Python", "TensorFlow", "D3.js"],
      github: "#",
      live: "#",
      featured: true,
      stats: { views: "12.5k", stars: "487", likes: "2.1k" }
    },
    {
      id: 2,
      title: "Mobile Banking App",
      description: "Secure and intuitive mobile banking application with biometric authentication, AI fraud detection, and seamless user experience across all devices.",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop",
      category: "mobile",
      technologies: ["React Native", "Firebase", "Node.js", "Stripe"],
      github: "#",
      live: "#",
      featured: true,
      stats: { views: "8.7k", stars: "312", likes: "1.8k" }
    },
    {
      id: 3,
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce solution with advanced inventory management, payment processing, and real-time analytics for modern businesses.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
      category: "web",
      technologies: ["Next.js", "PostgreSQL", "Stripe", "Redis", "GraphQL"],
      github: "#",
      live: "#",
      featured: false,
      stats: { views: "6.2k", stars: "189", likes: "945" }
    },
    {
      id: 4,
      title: "AR Furniture Viewer",
      description: "Revolutionary augmented reality application for visualizing furniture in real spaces using advanced 3D rendering and spatial computing.",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop",
      category: "ar",
      technologies: ["Unity", "ARCore", "C#", "Blender", "WebXR"],
      github: "#",
      live: "#",
      featured: true,
      stats: { views: "15.3k", stars: "623", likes: "3.2k" }
    },
    {
      id: 5,
      title: "Social Media Analytics",
      description: "Comprehensive social media monitoring platform with sentiment analysis, trend prediction, and automated reporting capabilities.",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop",
      category: "web",
      technologies: ["Vue.js", "Python", "MongoDB", "Docker", "TensorFlow"],
      github: "#",
      live: "#",
      featured: false,
      stats: { views: "4.8k", stars: "156", likes: "723" }
    },
    {
      id: 6,
      title: "Fitness Tracking App",
      description: "Comprehensive fitness tracking app with workout planning, nutrition monitoring, and AI-powered personal training recommendations.",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop",
      category: "mobile",
      technologies: ["Flutter", "Dart", "Firebase", "HealthKit", "ML Kit"],
      github: "#",
      live: "#",
      featured: false,
      stats: { views: "7.1k", stars: "234", likes: "1.4k" }
    }
  ];

  const categories = [
    { id: 'all', label: 'All Projects', icon: Sparkles, count: projects.length },
    { id: 'web', label: 'Web Apps', icon: Code, count: projects.filter(p => p.category === 'web').length },
    { id: 'mobile', label: 'Mobile', icon: Eye, count: projects.filter(p => p.category === 'mobile').length },
    { id: 'ar', label: 'AR/VR', icon: Zap, count: projects.filter(p => p.category === 'ar').length }
  ];

  useEffect(() => {
    setIsLoaded(true);
    const filtered = activeFilter === 'all' 
      ? projects 
      : projects.filter(project => project.category === activeFilter);
    
    setVisibleProjects([]);
    setTimeout(() => setVisibleProjects(filtered), 150);
  }, [activeFilter]);

  return (
    <div id="projects" className={`portfolio-projects-container ${isLoaded ? 'loaded' : ''}`}>
      {/* Enhanced Background Elements */}
      <div className="portfolio-bg-elements">
        <div className="portfolio-gradient-mesh"></div>
        <div className="portfolio-grid-overlay"></div>
      </div>

      <div className="portfolio-content-wrapper">
        {/* Enhanced Header Section */}
        <div className="portfolio-header-section">
          <div className="portfolio-header-badge">
            <Sparkles className="portfolio-badge-icon" />
            <span>Portfolio Showcase</span>
          </div>
          <h1 className="portfolio-main-title">
            <span className="portfolio-title-line">Innovative</span>
            <span className="portfolio-title-line featured">Digital Solutions</span>
          </h1>
          <p className="portfolio-subtitle">
            Crafting exceptional digital experiences through cutting-edge technology, 
            innovative design, and seamless user interactions that drive real business results.
          </p>
          <div className="portfolio-title-underline"></div>
          
          {/* Stats Section */}
          <div className="portfolio-stats-grid">
            <div className="portfolio-stat-item">
              <div className="portfolio-stat-number">25+</div>
              <div className="portfolio-stat-label">Projects</div>
            </div>
            <div className="portfolio-stat-item">
              <div className="portfolio-stat-number">50k+</div>
              <div className="portfolio-stat-label">Users</div>
            </div>
            <div className="portfolio-stat-item">
              <div className="portfolio-stat-number">98%</div>
              <div className="portfolio-stat-label">Satisfaction</div>
            </div>
          </div>
        </div>

        {/* Enhanced Filter Buttons */}
        <div className="portfolio-filter-section">
          <div className="portfolio-filter-header">
            <h3>Explore by Category</h3>
            <div className="portfolio-filter-line"></div>
          </div>
          <div className="portfolio-filter-buttons">
            {categories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveFilter(category.id)}
                  className={`portfolio-filter-btn ${activeFilter === category.id ? 'active' : ''}`}
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <div className="portfolio-btn-content">
                    <IconComponent className="portfolio-btn-icon" />
                    <span className="portfolio-btn-text">{category.label}</span>
                    <span className="portfolio-btn-count">{category.count}</span>
                  </div>
                  <div className="portfolio-btn-glow"></div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Enhanced Projects Grid */}
        <div className="portfolio-projects-grid">
          {visibleProjects.map((project, index) => (
            <div
              key={project.id}
              className={`portfolio-project-card ${project.featured ? 'featured' : ''}`}
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <div className="portfolio-gradient-border"></div>
              {/* Enhanced Featured Badge */}
              {project.featured && (
                <div className="portfolio-featured-badge">
                  <Star className="portfolio-badge-star" />
                  <span>Featured</span>
                </div>
              )}

              {/* Enhanced Project Image */}
              <div className="portfolio-project-image">
                <img src={project.image} alt={project.title} />
                <div className="portfolio-image-overlay"></div>
                <div className="portfolio-image-gradient"></div>
                
                {/* Enhanced Hover Actions */}
                <div className="portfolio-project-actions">
                  <a href={project.github} className="portfolio-action-btn portfolio-github-btn">
                    <Github className="portfolio-action-icon" />
                    <span className="portfolio-btn-tooltip">View Code</span>
                  </a>
                  <a href={project.live} className="portfolio-action-btn portfolio-live-btn">
                    <ExternalLink className="portfolio-action-icon" />
                    <span className="portfolio-btn-tooltip">Live Demo</span>
                  </a>
                </div>

                {/* Project Stats Overlay */}
                <div className="portfolio-project-stats">
                  <div className="portfolio-stat-chip">
                    <Eye size={12} />
                    <span>{project.stats.views}</span>
                  </div>
                  <div className="portfolio-stat-chip">
                    <Star size={12} />
                    <span>{project.stats.stars}</span>
                  </div>
                  <div className="portfolio-stat-chip">
                    <Heart size={12} />
                    <span>{project.stats.likes}</span>
                  </div>
                </div>
              </div>

              {/* Enhanced Project Content */}
              <div className="portfolio-project-content">
                <div className="portfolio-content-header">
                  <h3 className="portfolio-project-title">{project.title}</h3>
                  <div className="portfolio-title-accent"></div>
                </div>
                
                <p className="portfolio-project-description">{project.description}</p>

                {/* Enhanced Technologies */}
                <div className="portfolio-tech-stack">
                  <div className="portfolio-tech-label">Built with:</div>
                  <div className="portfolio-tech-list">
                    {project.technologies.map((tech, techIndex) => (
                      <span 
                        key={tech}
                        className="portfolio-tech-tag"
                        style={{animationDelay: `${techIndex * 0.1}s`}}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Enhanced CTA Button */}
                <button className="portfolio-view-project-btn">
                  <span className="portfolio-btn-text">Explore Project</span>
                  <ArrowRight className="portfolio-btn-arrow" />
                  <div className="portfolio-btn-shine"></div>
                </button>
              </div>

              {/* Enhanced Decorative Elements */}
              <div className="portfolio-card-decorations">
                <div className="portfolio-decoration portfolio-decoration-1"></div>
                <div className="portfolio-decoration portfolio-decoration-2"></div>
                <div className="portfolio-decoration portfolio-decoration-3"></div>
              </div>
              
              <div className="portfolio-card-glow"></div>
            </div>
          ))}
        </div>

        {/* Enhanced Call to Action */}
        <div className="portfolio-cta-section">
          <div className="portfolio-cta-content">
            <h2 className="portfolio-cta-title">Ready to Build Something Amazing?</h2>
            <p className="portfolio-cta-description">
              Let's collaborate and turn your ideas into extraordinary digital experiences
            </p>
            <div className="portfolio-cta-buttons">
              <button className="portfolio-cta-btn primary">
                <span>View All Projects</span>
                <ArrowRight className="portfolio-btn-icon" />
                <div className="portfolio-btn-ripple"></div>
              </button>
              <button className="portfolio-cta-btn secondary">
                <span>Get In Touch</span>
                <ExternalLink className="portfolio-btn-icon" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;