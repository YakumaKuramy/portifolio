/* ============================================
   main.js - Core Logic & Initialization
   Portfólio - Marcos Paulo de Sousa dos Santos
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 Portfólio initialized');

  // Initialize all modules
  initNavbarScroll();
  initSmoothScroll();
  initActiveNavLink();
});

/**
 * Navbar scroll effect - adds background on scroll
 */
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const SCROLL_THRESHOLD = 50;

  const handleScroll = () => {
    if (window.scrollY > SCROLL_THRESHOLD) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Check initial state
}

/**
 * Smooth scroll for anchor links
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = anchor.getAttribute('href');
      const targetEl = document.querySelector(targetId);

      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

/**
 * Highlights the active nav link based on scroll position
 */
function initActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navbar__link');

  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const activeId = entry.target.id;
          navLinks.forEach(link => {
            link.classList.toggle(
              'active',
              link.getAttribute('href') === `#${activeId}`
            );
          });
        }
      });
    },
    {
      rootMargin: '-40% 0px -60% 0px',
    }
  );

  sections.forEach(section => observer.observe(section));
}
