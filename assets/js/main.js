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
  initContactForm();
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

/**
 * Submits the contact form to Formspree without leaving the page.
 */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const status = document.getElementById('contact-form-status');
  const submitButton = form?.querySelector('button[type="submit"]');

  if (!form || !status || !submitButton) return;

  const defaultButtonText = submitButton.textContent;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (!form.reportValidity()) return;

    status.hidden = true;
    status.textContent = '';
    form.setAttribute('aria-busy', 'true');
    submitButton.disabled = true;
    submitButton.textContent = 'Enviando...';

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: {
          Accept: 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Formspree returned ${response.status}`);
      }

      form.reset();
      status.textContent = 'Mensagem enviada com sucesso. Obrigado pelo contato!';
      status.classList.remove('form__status--error');
      status.classList.add('form__status--success');
    } catch (error) {
      console.error('Contact form submission failed:', error);
      status.textContent = 'Não foi possível enviar sua mensagem. Tente novamente ou entre em contato pelos links ao lado.';
      status.classList.remove('form__status--success');
      status.classList.add('form__status--error');
    } finally {
      status.hidden = false;
      form.removeAttribute('aria-busy');
      submitButton.disabled = false;
      submitButton.textContent = defaultButtonText;
    }
  });
}
