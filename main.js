import './style.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// --- Utility Functions ---

// GSAP: Entry Animations
function initRevealAnimations() {
  const hero = document.querySelector('.hero-content');
  if (!hero) return;

  const title = hero.querySelector('.main-title');
  const tagline = hero.querySelector('.hero-tagline');
  const buttons = hero.querySelectorAll('.btn');

  const tl = gsap.timeline({
    defaults: {
      ease: "power3.out",
      duration: 1
    }
  });

  // Force capture of initial states or reset
  gsap.set([title, tagline, buttons], { opacity: 0, y: 30 });

  if (title) {
    tl.fromTo(title, { y: 40, opacity: 0 }, { y: 0, opacity: 1 }, 0.1);
  }

  // Animate buttons together with the title
  if (buttons.length > 0) {
    tl.fromTo(buttons,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, clearProps: "all" },
      0.1 // Same start time as title
    );
  }

  if (tagline) {
    tl.fromTo(tagline, { y: 20, opacity: 0 }, { y: 0, opacity: 1 }, "-=0.7");
  }
}

function generateTexture() {
  const chars = '0123456789ABCDEF+/*-.,:;[]{}<>=?@#';
  let texture = '';
  for (let i = 0; i < 100; i++) {
    texture += chars.charAt(Math.floor(Math.random() * chars.length)) + '<br>';
  }
  return texture;
}

function initTexture() {
  const columns = document.querySelectorAll('.texture-column');
  columns.forEach(col => {
    col.innerHTML = generateTexture();
  });
}

// --- Page-Specific Logic ---

// Hero Section: Rotating Typewriter
function initHome() {
  const rotatingEl = document.getElementById('rotating-text');
  if (!rotatingEl) return;

  const phrases = [
    "sites innovants",
    "logiciels métiers",
    "identités visuelles",
    "expériences digitales",
    "solutions de pointe"
  ];

  let phraseIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let typeSpeed = 150;

  function type() {
    const currentPhrase = phrases[phraseIdx];

    if (isDeleting) {
      rotatingEl.innerHTML = currentPhrase.substring(0, charIdx) + '<span class="cursor blink">|</span>';
      charIdx--;
      typeSpeed = 50;
    } else {
      rotatingEl.innerHTML = currentPhrase.substring(0, charIdx + 1) + '<span class="cursor blink">|</span>';
      charIdx++;
      typeSpeed = 150;
    }

    if (!isDeleting && charIdx === currentPhrase.length) {
      isDeleting = true;
      typeSpeed = 2500; // Pause at the end of phrase
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      typeSpeed = 500; // Pause before starting next phrase
    }

    setTimeout(type, typeSpeed);
  }

  setTimeout(type, 1000);
}

// Section Titles: Typewriter Effect
function initTypewriterTitles() {
  const blueTitles = document.querySelectorAll('.italic-blue');

  const typewriter = (el, text, i = 0) => {
    if (i <= text.length) {
      el.textContent = text.substring(0, i);
      setTimeout(() => typewriter(el, text, i + 1), 60);
    }
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        if (el.dataset.typed !== 'true') {
          const textToType = el.dataset.original || el.textContent;
          el.textContent = '';
          el.dataset.typed = 'true';
          setTimeout(() => typewriter(el, textToType), 200);
          observer.unobserve(el);
        }
      }
    });
  }, { threshold: 0.1 });

  blueTitles.forEach(title => {
    if (title.dataset.typed !== 'true') {
      title.dataset.original = title.textContent;
      title.textContent = '';
      observer.observe(title);
    }
  });
}

// Contact Page: Booking Logic (Placeholder for interactivity if needed)
function initContact() {
  const bookingContainer = document.querySelector('.booking-container');
  if (!bookingContainer) return;

  // Add event listeners for time slots or calendar days if required
  const slots = document.querySelectorAll('.time-slot');
  slots.forEach(slot => {
    slot.addEventListener('click', () => {
      slots.forEach(s => s.classList.remove('selected'));
      slot.classList.add('selected');
    });
  });

  const days = document.querySelectorAll('.calendar-day:not(.disabled)');
  days.forEach(day => {
    day.addEventListener('click', () => {
      days.forEach(d => d.classList.remove('selected'));
      day.classList.add('selected');
    });
  });
}

// Message Page: Form Handling
function initMessage() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    console.log('Form submitted:', Object.fromEntries(formData));
    alert('Merci pour votre message ! Nous vous recontacterons bientôt.');
    form.reset();
  });
}


import { initCardsAnimation } from './cards.js';

// FAQ: Accordion
function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      // Toggle active class on clicked item
      item.classList.toggle('active');

      // Optional: Close others
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
        }
      });
    });
  });
}

// Add CSS link dynamically for cards
const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = './cards.css';
document.head.appendChild(link);

// Initialize cards animation
document.addEventListener('DOMContentLoaded', () => {
  initCardsAnimation();
});



// Navbar: Hide/Show on scroll
function initNavbarScroll() {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  let lastScrollY = window.scrollY;

  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    // Handle show/hide on scroll
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      // Scrolling down
      nav.classList.add('nav-hidden');
    } else {
      // Scrolling up
      nav.classList.remove('nav-hidden');
    }

    // Handle visual appearance (blur/background)
    if (currentScrollY > 20) {
      nav.classList.add('nav-scrolled');
    } else {
      nav.classList.remove('nav-scrolled');
    }

    lastScrollY = currentScrollY;
  });
}

// Language Switch: Toggle between FR and EN
function initLangSwitch() {
  const langSwitch = document.querySelector('.lang-switch');
  const langOptions = document.querySelectorAll('.lang-option');

  if (!langSwitch) return;

  langSwitch.addEventListener('click', () => {
    langOptions.forEach(opt => opt.classList.toggle('active'));
    const activeLang = document.querySelector('.lang-option.active').textContent;
    console.log('Language switched to:', activeLang);
    // Here you would typically trigger translation logic
  });
}

// Theme Toggle: Light/Dark Mode
function initThemeToggle() {
  const toggleBtn = document.getElementById('theme-toggle');
  const body = document.body;

  if (!toggleBtn) return;

  const sunIcon = toggleBtn.querySelector('.sun-icon');
  const moonIcon = toggleBtn.querySelector('.moon-icon');

  const updateIcons = (isLight) => {
    if (isLight) {
      sunIcon.style.display = 'block';
      moonIcon.style.display = 'none';
    } else {
      sunIcon.style.display = 'none';
      moonIcon.style.display = 'block';
    }
  };

  toggleBtn.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    const isLight = body.classList.contains('light-mode');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    updateIcons(isLight);
  });

  // Check preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    body.classList.add('light-mode');
    updateIcons(true);
  } else {
    updateIcons(false);
  }
}

// --- App Initialization ---

document.addEventListener('DOMContentLoaded', () => {
  initTexture();
  initHome();
  initTypewriterTitles();
  initRevealAnimations();
  initThemeToggle();
  initNavbarScroll();
  initLangSwitch();
  initContact();
  initMessage();
  initFAQ();
});

