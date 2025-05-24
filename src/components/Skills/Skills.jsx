import React, { useState, useEffect, useRef } from 'react';
import './Skills.css';

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedSkills, setAnimatedSkills] = useState(new Set());
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const skillsRef = useRef(null);

  const skillCategories = [
    {
      title: 'Frontend Development',
      icon: '🎨',
      color: '#3B82F6',
      gradient: 'linear-gradient(135deg, #3B82F6, #1D4ED8)',
      skills: [
        { name: 'HTML', level: 90, icon: '📄', category: 'markup' },
        { name: 'CSS', level: 85, icon: '🎨', category: 'styling' },
        { name: 'JavaScript', level: 85, icon: '⚡', category: 'programming' },
        { name: 'React', level: 80, icon: '⚛️', category: 'framework' },
        { name: 'TypeScript', level: 75, icon: '📘', category: 'programming' },
        { name: 'Next.js', level: 70, icon: '🚀', category: 'framework' },
        { name: 'Tailwind CSS', level: 80, icon: '💨', category: 'styling' },
        { name: 'SASS', level: 75, icon: '💅', category: 'styling' },
      ],
    },
    {
      title: 'Backend Development',
      icon: '⚙️',
      color: '#10B981',
      gradient: 'linear-gradient(135deg, #10B981, #047857)',
      skills: [
        { name: 'Node.js', level: 80, icon: '🟢', category: 'runtime' },
        { name: 'Express', level: 75, icon: '🛠️', category: 'framework' },
        { name: 'MongoDB', level: 70, icon: '🍃', category: 'database' },
        { name: 'PostgreSQL', level: 65, icon: '🐘', category: 'database' },
        { name: 'Python', level: 60, icon: '🐍', category: 'programming' },
        { name: 'Firebase', level: 70, icon: '🔥', category: 'service' },
        { name: 'GraphQL', level: 65, icon: '📊', category: 'api' },
        { name: 'REST API', level: 80, icon: '🔌', category: 'api' },
      ],
    },
    {
      title: 'Tools & DevOps',
      icon: '🛠️',
      color: '#F59E0B',
      gradient: 'linear-gradient(135deg, #F59E0B, #D97706)',
      skills: [
        { name: 'Git', level: 85, icon: '📦', category: 'version' },
        { name: 'GitHub', level: 80, icon: '🐙', category: 'version' },
        { name: 'Docker', level: 60, icon: '🐳', category: 'container' },
        { name: 'AWS', level: 55, icon: '☁️', category: 'cloud' },
        { name: 'Vercel', level: 75, icon: '▲', category: 'deployment' },
        { name: 'Testing', level: 65, icon: '🧪', category: 'quality' },
        { name: 'CI/CD', level: 60, icon: '🔄', category: 'automation' },
        { name: 'Figma', level: 70, icon: '🎯', category: 'design' },
      ],
    },
  ];

  const allSkills = skillCategories.flatMap(category => 
    category.skills.map(skill => ({ ...skill, categoryColor: category.color }))
  );

  const filterOptions = [
    { key: 'all', label: 'All Skills', icon: '🚀' },
    { key: 'programming', label: 'Programming', icon: '💻' },
    { key: 'framework', label: 'Frameworks', icon: '🏗️' },
    { key: 'database', label: 'Databases', icon: '🗄️' },
    { key: 'cloud', label: 'Cloud & DevOps', icon: '☁️' },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Animate skills progressively with stagger effect
          skillCategories.forEach((category, categoryIndex) => {
            category.skills.forEach((skill, skillIndex) => {
              setTimeout(() => {
                setAnimatedSkills(prev => new Set([...prev, `${categoryIndex}-${skillIndex}`]));
              }, (categoryIndex * 200) + (skillIndex * 100));
            });
          });
        }
      },
      { threshold: 0.1 }
    );

    const skillsSection = skillsRef.current;
    if (skillsSection) {
      observer.observe(skillsSection);
    }

    return () => observer.disconnect();
  }, []);

  const getSkillLevel = (level) => {
    if (level >= 80) return { text: 'Expert', class: 'expert', emoji: '🌟' };
    if (level >= 70) return { text: 'Advanced', class: 'advanced', emoji: '🔥' };
    if (level >= 60) return { text: 'Intermediate', class: 'intermediate', emoji: '⚡' };
    return { text: 'Beginner', class: 'basic', emoji: '🌱' };
  };

  const getFilteredSkills = () => {
    if (activeFilter === 'all') return allSkills;
    return allSkills.filter(skill => skill.category === activeFilter);
  };

  const getTotalExperience = () => {
    const expertSkills = allSkills.filter(skill => skill.level >= 80).length;
    const advancedSkills = allSkills.filter(skill => skill.level >= 70).length;
    return { expert: expertSkills, advanced: advancedSkills, total: allSkills.length };
  };

  const stats = getTotalExperience();

  return (
    <section ref={skillsRef} id="skills" className="skills">
      <div className="container">
        {/* Enhanced Header */}
        <div className={`section-header ${isVisible ? 'animate-in' : ''}`}>
          <div className="header-badge">
            <span className="badge-icon">💼</span>
            <span className="badge-text">My Expertise</span>
          </div>
          <h2 className="main-title">
            <span className="title-line">Technical</span>
            <span className="title-line highlight">Skills</span>
          </h2>
          <p className="subtitle">Crafting digital experiences with cutting-edge technologies</p>
          
          {/* Skills Statistics */}
          <div className="skills-stats">
            <div className="stat-item">
              <div className="stat-number">{stats.total}</div>
              <div className="stat-label">Technologies</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <div className="stat-number">{stats.expert}</div>
              <div className="stat-label">Expert Level</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <div className="stat-number">3+</div>
              <div className="stat-label">Years Experience</div>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className={`filter-tabs ${isVisible ? 'slide-up' : ''}`}>
          {filterOptions.map((filter, index) => (
            <button
              key={filter.key}
              className={`filter-tab ${activeFilter === filter.key ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter.key)}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <span className="tab-icon">{filter.icon}</span>
              <span className="tab-label">{filter.label}</span>
              <div className="tab-indicator"></div>
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="skills-grid">
          {skillCategories.map((category, categoryIndex) => (
            <div 
              className={`skill-category ${isVisible ? 'slide-up' : ''} ${hoveredCategory === categoryIndex ? 'hovered' : ''}`}
              key={categoryIndex}
              style={{ 
                animationDelay: `${categoryIndex * 0.2}s`,
                '--category-color': category.color,
                '--category-gradient': category.gradient
              }}
              onMouseEnter={() => setHoveredCategory(categoryIndex)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              {/* Category Header */}
              <div className="category-header">
                <div className="category-icon-wrapper">
                  <div className="category-icon">{category.icon}</div>
                </div>
                <div className="category-info">
                  <h3 className="category-title">{category.title}</h3>
                  <div className="category-count">{category.skills.length} skills</div>
                </div>
                <div className="category-progress">
                  <div className="overall-level">
                    {Math.round(category.skills.reduce((acc, skill) => acc + skill.level, 0) / category.skills.length)}%
                  </div>
                </div>
              </div>

              {/* Skills List */}
              <div className="skills-list">
                {category.skills.map((skill, skillIndex) => {
                  const skillKey = `${categoryIndex}-${skillIndex}`;
                  const isAnimated = animatedSkills.has(skillKey);
                  const skillLevel = getSkillLevel(skill.level);
                  
                  return (
                    <div 
                      className={`skill-card ${isAnimated ? 'animate' : ''}`}
                      key={skillIndex}
                      style={{ animationDelay: `${skillIndex * 0.1}s` }}
                    >
                      <div className="skill-header">
                        <div className="skill-icon">{skill.icon}</div>
                        <div className="skill-info">
                          <h4 className="skill-name">{skill.name}</h4>
                          <div className="skill-meta">
                            <span className={`skill-level ${skillLevel.class}`}>
                              <span className="level-emoji">{skillLevel.emoji}</span>
                              {skillLevel.text}
                            </span>
                          </div>
                        </div>
                        <div className="skill-percentage">{skill.level}%</div>
                      </div>
                      
                      <div className="skill-progress-container">
                        <div className="skill-progress-track">
                          <div 
                            className="skill-progress-fill"
                            style={{ 
                              width: isAnimated ? `${skill.level}%` : '0%',
                              background: category.gradient
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Summary Section */}
        <div className={`skills-summary ${isVisible ? 'fade-in' : ''}`}>
          <div className="summary-grid">
            <div className="summary-card main-card">
              <div className="card-header">
                <div className="summary-icon">🚀</div>
                <h3>Continuous Learning</h3>
              </div>
              <p>Always exploring new technologies and pushing the boundaries of what's possible</p>
              <div className="card-footer">
                <div className="learning-indicator">
                  <div className="indicator-dot active"></div>
                  <span>Currently learning</span>
                </div>
              </div>
            </div>
            
            <div className="summary-card">
              <div className="metric-card">
                <div className="metric-icon">⚡</div>
                <div className="metric-value">5+</div>
                <div className="metric-label">Projects Completed</div>
              </div>
            </div>
            
            <div className="summary-card">
              <div className="metric-card">
                <div className="metric-icon">🎯</div>
                <div className="metric-value">100%</div>
                <div className="metric-label">Commitment</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;