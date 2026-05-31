/* ============================================
   animations.js - Scroll Animations & Effects
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  initParallaxBackground();
});

/**
 * Scroll reveal - animates elements as they enter the viewport
 */
function initScrollReveal() {
  const revealElements = document.querySelectorAll(
    '.reveal, .reveal-left, .reveal-right, .reveal-scale'
  );

  if (!revealElements.length) return;

  // Respect reduced motion preference
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    revealElements.forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // Animate only once
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px',
    }
  );

  revealElements.forEach(el => observer.observe(el));
}

/**
 * Subtle parallax on hero background
 */
function initParallaxBackground() {
  const hero = document.getElementById('hero');
  if (!hero) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const rate = scrolled * 0.3;

    if (scrolled < window.innerHeight) {
      hero.style.setProperty('--parallax-offset', `${rate}px`);
    }
  }, { passive: true });
}
