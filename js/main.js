// ==================== Initialization ====================

document.addEventListener('DOMContentLoaded', function() {
  initNavbar();
  initMobileMenu();
  initScrollSpy();
  initRevealOnScroll();
  initEmailCopy();
});

// ==================== Navbar Scroll Effect ====================

function initNavbar() {
  const navbar = document.getElementById('navbar');
  const scrollThreshold = 80;

  window.addEventListener('scroll', function() {
    if (window.scrollY > scrollThreshold) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

// ==================== Mobile Menu Toggle ====================

function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const navLinks = mobileMenu.querySelectorAll('a');

  hamburger.addEventListener('click', function() {
    if (mobileMenu.classList.contains('open')) {
      mobileMenu.classList.remove('open');
      mobileMenu.style.maxHeight = '0';
    } else {
      mobileMenu.classList.add('open');
      mobileMenu.style.maxHeight = mobileMenu.scrollHeight + 'px';
    }
  });

  // Close menu when a link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      mobileMenu.classList.remove('open');
      mobileMenu.style.maxHeight = '0';
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', function(event) {
    const isClickInsideNav = navbar.contains(event.target);
    const isClickInsideMenu = mobileMenu.contains(event.target);

    if (!isClickInsideNav && !isClickInsideMenu && mobileMenu.classList.contains('open')) {
      mobileMenu.classList.remove('open');
      mobileMenu.style.maxHeight = '0';
    }
  });
}

// ==================== Scroll Spy Navigation ====================

function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function updateActiveLink() {
    let current = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (window.scrollY >= (sectionTop - 200)) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink);
  updateActiveLink(); // Call on page load
}

// ==================== Scroll Reveal Animation ====================

function initRevealOnScroll() {
  const revealElements = document.querySelectorAll('.reveal');

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(element => {
    observer.observe(element);
  });
}

// ==================== Email Copy to Clipboard ====================

function initEmailCopy() {
  const emailBtn = document.getElementById('email-btn');
  const toast = document.getElementById('toast');
  const email = 'leonard931210@gmail.com';

  emailBtn.addEventListener('click', function(e) {
    e.preventDefault();

    // Use modern Clipboard API with fallback
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(email)
        .then(() => {
          showToast(toast);
        })
        .catch(() => {
          fallbackCopy(email);
          showToast(toast);
        });
    } else {
      // Fallback for older browsers
      fallbackCopy(email);
      showToast(toast);
    }
  });

  function fallbackCopy(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();

    try {
      document.execCommand('copy');
    } catch (err) {
      console.error('Fallback copy failed:', err);
    }

    document.body.removeChild(textarea);
  }

  function showToast(toastElement) {
    toastElement.classList.remove('opacity-0', 'pointer-events-none');
    toastElement.classList.add('opacity-100', 'pointer-events-auto');

    setTimeout(() => {
      toastElement.classList.remove('opacity-100', 'pointer-events-auto');
      toastElement.classList.add('opacity-0', 'pointer-events-none');
    }, 2500);
  }
}

// ==================== Smooth Scroll for Anchor Links ====================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');

    if (href === '#' || href === '') {
      return;
    }

    e.preventDefault();

    const target = document.querySelector(href);
    if (target) {
      const offsetTop = target.offsetTop - 100; // Account for fixed navbar
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// ==================== Performance Optimization ====================

// Debounce function for scroll events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Optional: Lazy load images
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// ==================== Console Message ====================

console.log('%c임채영 포트폴리오에 오신 것을 환영합니다! 👋', 'font-size: 16px; color: #EF9036; font-weight: bold;');
console.log('%c소통물류 전문가와 함께 성공적인 프로젝트를 만들어보세요.', 'font-size: 14px; color: #6B7280;');