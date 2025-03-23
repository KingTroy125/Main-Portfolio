export const initializeAnimations = () => {
  // Intersection Observer for scroll animations
  const observerCallback = (entries: IntersectionObserverEntry[]) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, {
    threshold: 0.1,
    rootMargin: '50px'
  });

  // Observe elements with animation classes
  document.querySelectorAll('.section-transition, .fade-in-up').forEach(element => {
    observer.observe(element);
  });

  // Add particle effect
  const addParticles = () => {
    document.querySelectorAll('.particle-effect').forEach(container => {
      for (let i = 0; i < 5; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 2}s`;
        container.appendChild(particle);
      }
    });
  };

  addParticles();
}; 