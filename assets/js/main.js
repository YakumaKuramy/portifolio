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
  initTimelineAccordion();
  initStatsCounter();
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

/**
 * Accordion functionality for Timeline (Jornada) section
 */
function initTimelineAccordion() {
  const items = document.querySelectorAll('.timeline-item');
  if (!items.length) return;

  items.forEach(item => {
    const header = item.querySelector('.timeline-header');
    if (!header) return;

    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all items
      items.forEach(i => i.classList.remove('active'));

      // If clicked item wasn't active, open it
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

/**
 * Animated counters for Hero Stats section
 */
function initStatsCounter() {
  const counters = document.querySelectorAll('.hero__stat-number');
  if (!counters.length) return;

  const animateCounter = (counter) => {
    const target = parseInt(counter.getAttribute('data-target'), 10);
    const duration = 1500; // 1.5 seconds
    const startTime = performance.now();

    const update = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease-out quad formula
      const easeProgress = progress * (2 - progress);
      const currentValue = Math.floor(easeProgress * target);

      counter.innerText = currentValue;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        counter.innerText = target;
      }
    };

    requestAnimationFrame(update);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target); // Trigger only once
        }
      });
    },
    { threshold: 0.3 }
  );

  counters.forEach(counter => observer.observe(counter));
}
