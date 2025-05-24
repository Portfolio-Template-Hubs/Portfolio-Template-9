import React, { useState, useEffect } from 'react';
import './Skills.css';

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedSkills, setAnimatedSkills] = useState(new Set());

  const skillCategories = [
    {
      title: 'Frontend Development',
      icon: '🎨',
      color: '#3B82F6',
      skills: [
        { name: 'HTML', level: 90, icon: '📄' },
        { name: 'CSS', level: 85, icon: '🎨' },
        { name: 'JavaScript', level: 85, icon: '⚡' },
        { name: 'React', level: 80, icon: '⚛️' },
        { name: 'TypeScript', level: 75, icon: '📘' },
        { name: 'Next.js', level: 70, icon: '🚀' },
      ],
    },
    {
      title: 'Backend Development',
      icon: '⚙️',
      color: '#10B981',
      skills: [
        { name: 'Node.js', level: 80, icon: '🟢' },
        { name: 'Express', level: 75, icon: '🛠️' },
        { name: 'MongoDB', level: 70, icon: '🍃' },
        { name: 'SQL', level: 65, icon: '🗄️' },
        { name: 'Python', level: 60, icon: '🐍' },
        { name: 'Firebase', level: 70, icon: '🔥' },
      ],
    },
    {
      title: 'Tools & Others',
      icon: '🛠️',
      color: '#F59E0B',
      skills: [
        { name: 'Git', level: 85, icon: '📦' },
        { name: 'Figma', level: 70, icon: '🎯' },
        { name: 'Docker', level: 60, icon: '🐳' },
        { name: 'AWS', level: 55, icon: '☁️' },
        { name: 'Testing', level: 65, icon: '🧪' },
        { name: 'CI/CD', level: 60, icon: '🔄' },
      ],
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Animate skills progressively
          skillCategories.forEach((category, categoryIndex) => {
            category.skills.forEach((skill, skillIndex) => {
              setTimeout(() => {
                setAnimatedSkills(prev => new Set([...prev, `${categoryIndex}-${skillIndex}`]));
              }, (categoryIndex * 200) + (skillIndex * 100));
            });
          });
        }
      },
      { threshold: 0.3 }
    );

    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
      observer.observe(skillsSection);
    }

    return () => observer.disconnect();
  }, []);

  const getSkillLevel = (level) => {
    if (level >= 80) return { text: 'Expert', class: 'expert' };
    if (level >= 70) return { text: 'Advanced', class: 'advanced' };
    if (level >= 60) return { text: 'Intermediate', class: 'intermediate' };
    return { text: 'Basic', class: 'basic' };
  };

  return (
    <section id="skills" className="skills">
      <div className="skills-background">
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
        </div>
      </div>
      
      <div className="container">
        <div className={`section-header ${isVisible ? 'animate-in' : ''}`}>
          <span className="section-tag">💼 My Expertise</span>
          <h2>Technical Skills</h2>
          <p>Crafting digital experiences with modern technologies</p>
          <div className="header-decoration"></div>
        </div>

        <div className="skills-grid">
          {skillCategories.map((category, categoryIndex) => (
            <div 
              className={`skill-category ${isVisible ? 'slide-up' : ''}`}
              key={categoryIndex}
              style={{ 
                animationDelay: `${categoryIndex * 0.2}s`,
                '--category-color': category.color 
              }}
            >
              <div className="category-header">
                <div className="category-icon">{category.icon}</div>
                <h3 className="category-title">{category.title}</h3>
                <div className="category-line"></div>
              </div>

              <div className="skills-grid-inner">
                {category.skills.map((skill, skillIndex) => {
                  const skillKey = `${categoryIndex}-${skillIndex}`;
                  const isAnimated = animatedSkills.has(skillKey);
                  const skillLevel = getSkillLevel(skill.level);
                  
                  return (
                    <div 
                      className={`skill-card ${isAnimated ? 'animate' : ''}`}
                      key={skillIndex}
                    >
                      <div className="skill-card-inner">
                        <div className="skill-icon">{skill.icon}</div>
                        <h4 className="skill-name">{skill.name}</h4>
                        
                        <div className="skill-progress-container">
                          <div className="skill-progress-track">
                            <div 
                              className="skill-progress-fill"
                              style={{ 
                                width: isAnimated ? `${skill.level}%` : '0%',
                                backgroundColor: category.color
                              }}
                            ></div>
                          </div>
                          <div className="skill-percentage">{skill.level}%</div>
                        </div>
                        
                        <div className={`skill-level ${skillLevel.class}`}>
                          <span className="level-dot"></span>
                          {skillLevel.text}
                        </div>
                      </div>
                      
                      <div className="skill-glow" style={{ backgroundColor: category.color }}></div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className={`skills-summary ${isVisible ? 'fade-in' : ''}`}>
          <div className="summary-card">
            <div className="summary-icon">🚀</div>
            <h3>Always Learning</h3>
            <p>Continuously expanding my skillset and staying updated with the latest technologies</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;