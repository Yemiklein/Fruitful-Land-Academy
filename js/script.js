// Utility: Debounce function to limit event frequency
function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

/**
 * Mobile Menu Toggle
 * Toggles the navigation menu on mobile devices and updates ARIA attributes.
 */
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav ul');

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    const isActive = nav.classList.toggle('active');
    menuToggle.textContent = isActive ? '✖' : '☰';
    menuToggle.setAttribute('aria-expanded', isActive);
  });
} else {
  console.warn('Menu toggle or navigation not found.');
}

/**
 * Set Active Navigation Link
 * Highlights the current page's navigation link.
 */
const navLinks = document.querySelectorAll('nav a');

function setActiveLink() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';

  navLinks.forEach(link => {
    const linkPath = link.getAttribute('href');
    if (linkPath === currentPath) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    } else {
      link.classList.remove('active');
      link.removeAttribute('aria-current');
    }
  });
}

document.addEventListener('DOMContentLoaded', setActiveLink);

/**
 * Hero Text Animation Pause
 * Pauses hero text animation on hover.
 */
const heroText = document.querySelector('.hero-text');

if (heroText) {
  heroText.addEventListener('mouseenter', () => {
    heroText.style.animationPlayState = 'paused';
  });
  heroText.addEventListener('mouseleave', () => {
    heroText.style.animationPlayState = 'running';
  });
}

/**
 * Hero Parallax Effect
 * Applies a subtle parallax effect to the hero background.
 */
const hero = document.querySelector('.hero');

if (hero) {
  const updateParallax = debounce(() => {
    const scrollPosition = window.pageYOffset;
    hero.style.backgroundPositionY = `${scrollPosition * 0.3}px`;
  }, 10);
  window.addEventListener('scroll', updateParallax);
}

/**
 * Gallery Lightbox
 * Handles gallery image clicks and lightbox display.
 */
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.querySelector('#lightbox');
const lightboxImg = document.querySelector('#lightbox-img');
const closeLightbox = document.querySelector('.close-lightbox');

if (galleryItems.length && lightbox && lightboxImg && closeLightbox) {
  galleryItems.forEach((item, index) => {
    item.style.setProperty('--index', index);
    item.addEventListener('click', () => {
      lightboxImg.src = item.src;
      lightbox.style.display = 'flex';
      closeLightbox.focus();
    });
  });

  closeLightbox.addEventListener('click', () => {
    lightbox.style.display = 'none';
  });

  lightbox.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      lightbox.style.display = 'none';
    }
  });
} else {
  console.warn('Gallery or lightbox elements not found.');
}

/**
 * Form Validation
 * Validates admission and contact forms, displays custom notification.
 */
const forms = document.querySelectorAll('#admission-form, #contact-form');

function showNotification(message, isSuccess) {
  const notification = document.createElement('div');
  notification.className = `notification ${isSuccess ? 'success' : 'error'}`;
  notification.textContent = message;
  notification.style.position = 'fixed';
  notification.style.top = '20px';
  notification.style.right = '20px';
  notification.style.padding = '1rem';
  notification.style.background = isSuccess ? '#2E7D32' : '#D32F2F';
  notification.style.color = '#fff';
  notification.style.borderRadius = '4px';
  notification.style.zIndex = '1000';
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 3000);
}

forms.forEach(form => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputs = form.querySelectorAll('input, textarea, select');
    let valid = true;

    inputs.forEach(input => {
      if (!input.value.trim()) {
        valid = false;
        input.style.borderColor = 'red';
      } else {
        input.style.borderColor = '#ccc';
      }
    });

    if (valid) {
      showNotification('Form submitted successfully!', true);
      form.reset();
    } else {
      showNotification('Please fill in all fields.', false);
    }
  });
});

/**
 * Testimonial Carousel
 * Manages the testimonial carousel with navigation and auto-rotation.
 */
function initializeTestimonialCarousel() {
  const testimonialSection = document.querySelector('.testimonials');
  const testimonials = document.querySelectorAll('.testimonial');
  const prevButton = document.querySelector('.carousel-prev');
  const nextButton = document.querySelector('.carousel-next');

  if (testimonialSection && testimonials.length && prevButton && nextButton) {
    console.log('Testimonial carousel initialized.');
    let currentIndex = 0;

    function showTestimonial(index) {
      testimonials.forEach((t, i) => {
        t.classList.toggle('active', i === index);
      });
    }

    // Initialize first testimonial
    showTestimonial(currentIndex);

    prevButton.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
      showTestimonial(currentIndex);
    });

    nextButton.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % testimonials.length;
      showTestimonial(currentIndex);
    });

    prevButton.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        prevButton.click();
      }
    });

    nextButton.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        nextButton.click();
      }
    });

    setInterval(() => {
      currentIndex = (currentIndex + 1) % testimonials.length;
      showTestimonial(currentIndex);
    }, 5000);
  } else {
    console.warn('Testimonial section or elements not found.');
  }
}

document.addEventListener('DOMContentLoaded', initializeTestimonialCarousel);