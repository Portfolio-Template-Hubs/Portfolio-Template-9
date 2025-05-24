import { useEffect, useRef } from 'react';
import './ParticleBackground.css';

const ParticleBackground = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    
    // Particle class
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 2; // Slightly larger particles
        this.speedX = Math.random() * 2 - 1; // Slower movement
        this.speedY = Math.random() * 2 - 1;
        this.color = getRandomColor(0.7); // Higher opacity
      }
      
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        // Bounce off edges
        if (this.x > canvas.width || this.x < 0) {
          this.speedX = -this.speedX;
        }
        if (this.y > canvas.height || this.y < 0) {
          this.speedY = -this.speedY;
        }
      }
      
      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    // Generate random color with primary/secondary color influence
    function getRandomColor(opacity) {
      const colors = [
        `rgba(0, 123, 255, ${opacity})`, // Primary color
        `rgba(108, 117, 125, ${opacity})`, // Secondary color
        `rgba(0, 123, 255, ${opacity})`, // Accent color
      ];
      return colors[Math.floor(Math.random() * colors.length)];
    }
    
    // Set canvas size
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };
    
    // Initialize particles
    function initParticles() {
      particles = [];
      const particleCount = Math.min(Math.floor((canvas.width * canvas.height) / 10000), 150); // More particles
      
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    }
    
    // Connect particles with lines if they are close enough
    function connectParticles() {
      const maxDistance = 100; // Shorter distance for more visible connections
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < maxDistance) {
            // Set opacity based on distance
            const opacity = 1 - (distance / maxDistance);
            ctx.strokeStyle = `rgba(0, 123, 255, ${opacity * 0.3})`; // More visible lines
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    }
    
    // Animation loop
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }
      
      connectParticles();
      animationFrameId = requestAnimationFrame(animate);
    }
    
    window.addEventListener('resize', handleResize);
    handleResize();
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  
  return (
    <canvas ref={canvasRef} className="particle-canvas"></canvas>
  );
};

export default ParticleBackground; 