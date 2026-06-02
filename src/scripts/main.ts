/* ==========================================================
   Sanjana Unfiltered — JavaScript
   Navbar scroll · Mobile toggle · Intersection Observer
   (Adapted for Astro & View Transitions)
   ========================================================== */

function initSite(): void {
  // ── Navbar scroll effect ────────────────────────────────
  const navbar = document.getElementById('navbar') as HTMLElement | null;

  window.addEventListener('scroll', () => {
    if (!navbar) return;
    const currentScroll = window.scrollY;
    if (currentScroll > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });

  // ── Mobile toggle ──────────────────────────────────────
  const toggle = document.getElementById('navToggle') as HTMLElement | null;
  const links  = document.getElementById('navLinks') as HTMLElement | null;

  if (toggle && links) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('active');
      links.classList.toggle('open');
    });

    // Close on link click
    links.querySelectorAll('.navbar__link').forEach(link => {
      link.addEventListener('click', () => {
        toggle.classList.remove('active');
        links.classList.remove('open');
      });
    });
  }

  // ── Intersection Observer (reveal on scroll) ───────────
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLElement;
          const siblings = target.parentElement?.querySelectorAll('.reveal');
          if (siblings) {
            const index = Array.from(siblings).indexOf(target);
            target.style.transitionDelay = `${index * 0.1}s`;
          }
          target.classList.add('visible');
          observer.unobserve(target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(el => observer.observe(el));
  } else {
    reveals.forEach(el => {
      if (el instanceof HTMLElement) {
        el.classList.add('visible');
      }
    });
  }

  // ── Smooth scroll for anchor links ──────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (!targetId || targetId === '#') return;
      
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// Support for Astro View Transitions
document.addEventListener('astro:page-load', initSite);
