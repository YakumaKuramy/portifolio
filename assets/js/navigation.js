/* ============================================
   navigation.js - Mobile Navigation & Menu
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
});

/**
 * Mobile hamburger menu toggle
 */
function initMobileMenu() {
  const toggle = document.getElementById('navbar-toggle');
  const menu = document.getElementById('navbar-menu');
  const overlay = document.getElementById('navbar-overlay');
  const navLinks = document.querySelectorAll('.navbar__link');

  if (!toggle || !menu) return;

  const openMenu = () => {
    toggle.classList.add('active');
    menu.classList.add('open');
    if (overlay) overlay.classList.add('visible');
    document.body.style.overflow = 'hidden';
    toggle.setAttribute('aria-expanded', 'true');
  };

  const closeMenu = () => {
    toggle.classList.remove('active');
    menu.classList.remove('open');
    if (overlay) overlay.classList.remove('visible');
    document.body.style.overflow = '';
    toggle.setAttribute('aria-expanded', 'false');
  };

  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.contains('open');
    isOpen ? closeMenu() : openMenu();
  });

  // Close menu on overlay click
  if (overlay) {
    overlay.addEventListener('click', closeMenu);
  }

  // Close menu when a nav link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close menu on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('open')) {
      closeMenu();
    }
  });
}
