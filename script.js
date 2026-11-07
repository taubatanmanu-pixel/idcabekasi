// ═══ IDCA KOTA BEKASI — PORTFOLIO WEBSITE
// ═══ Vanilla JS, No Dependencies

// SVG icon path map (Lucide-style)
function getIconPath(name) {
  const paths = {
    drum: '<ellipse cx="12" cy="12" rx="9" ry="6"/><path d="M3 12c0 1.7 4 3 9 3s9-1.3 9-3"/><path d="M3 12c0-1.7 4-3 9-3s9 1.3 9-3"/><path d="M12 18v4"/><path d="M12 6V2"/>',
    music: '<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',
    star: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
    party: '<path d="M5.8 11.3 2 22l10.7-3.79"/><path d="m4 4 7.88 7.88"/><path d="M12 2 2 12"/><path d="m22 2-10 10"/><path d="M22 22 12 12"/></path>',
    clipboard: '<rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
    message: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
  };
  return paths[name] || '';
}

document.addEventListener('DOMContentLoaded', () => {

  // ─── SPLASH SCREEN ───
  const splash = document.getElementById('splash');
  if (splash) {
    setTimeout(() => {
      splash.classList.add('hidden');
    }, 2000); // Show splash for 2 seconds
  }

  // ─── NAVBAR SCROLL ───
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });

  // ─── MOBILE TOGGLE ───
  const toggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  toggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
  // Close on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });

  // ─── ACTIVE NAV LINK ───
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-links a');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop - 100;
      if (window.scrollY >= top) current = section.getAttribute('id');
    });
    navItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('href') === '#' + current) item.classList.add('active');
    });
  });

  // ─── SCROLL ANIMATIONS ───
  const animElements = document.querySelectorAll('[data-animate]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 100);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  animElements.forEach(el => observer.observe(el));

  // ─── SMOOTH SCROLL ───
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ─── PARALLAX HERO ───
  const hero = document.querySelector('.hero');
  if (hero) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      const heroContent = hero.querySelector('.hero-content');
      if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroContent.style.opacity = 1 - (scrolled / window.innerHeight) * 0.8;
      }
    });
  }
});

// ═══ LIGHTBOX ═══
const galleryData = [
  { type: 'image', src: 'media/foto1.jpg', caption: "Rapat Bersama Perwakilan IDCA Pusat" },
  { type: 'image', src: 'media/foto2.jpg', caption: "Event Olahraga Sekolah — Bekasi" },
  { type: 'image', src: 'media/foto3.jpg', caption: "Permainan Band Sekolah" },
  { type: 'image', src: 'media/foto4.jpg', caption: "Kegiatan OSIS & Band" },
  { type: 'video', src: 'media/video1.mp4', caption: 'Video Kegiatan IDCA Kota Bekasi' },
];

let currentSlide = 0;
let videoEl = null;

function openLightbox(index) {
  currentSlide = index;
  // Pause any playing video when switching
  if (videoEl) { videoEl.pause(); videoEl = null; }
  updateLightbox();
  document.getElementById('lightbox').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  if (videoEl) { videoEl.pause(); videoEl = null; }
  document.getElementById('lightbox').classList.remove('active');
  document.body.style.overflow = '';
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + galleryData.length) % galleryData.length;
  updateLightbox();
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % galleryData.length;
  updateLightbox();
}

function updateLightbox() {
  const item = galleryData[currentSlide];
  const imgEl = document.getElementById('lightboxImg');
  // Safe: galleryData is static site content, not user input
  imgEl.innerHTML = '';
  if (item.type === 'video') {
    videoEl = document.createElement('video');
    videoEl.src = item.src;
    videoEl.controls = true;
    videoEl.autoplay = true;
    videoEl.muted = false;
    videoEl.loop = true;
    imgEl.appendChild(videoEl);
  } else {
    const img = document.createElement('img');
    img.src = item.src;
    img.alt = item.caption;
    imgEl.appendChild(img);
  }
  document.getElementById('lightboxCaption').textContent = item.caption;
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  if (!document.getElementById('lightbox').classList.contains('active')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') prevSlide();
  if (e.key === 'ArrowRight') nextSlide();
});

// Click outside to close
document.getElementById('lightbox').addEventListener('click', (e) => {
  if (e.target === document.getElementById('lightbox')) closeLightbox();
});

// ═══ FAQ TOGGLE ═══
function toggleFaq(btn) {
  const item = btn.closest('.faq-item');
  const wasOpen = item.classList.contains('open');
  // Close all - reset status aria juga
  document.querySelectorAll('.faq-item').forEach(el => {
    el.classList.remove('open');
    el.querySelector('.faq-question')?.setAttribute('aria-expanded', 'false');
  });
  // Toggle clicked
  if (!wasOpen) {
    item.classList.add('open');
    btn.setAttribute('aria-expanded', 'true');
  }
}

// ═══ CONTACT FORM → Mailto (no fake simulation) ===
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = encodeURIComponent(document.getElementById('name')?.value || '');
    const email = encodeURIComponent(document.getElementById('email')?.value || '');
    const subject = encodeURIComponent(document.getElementById('subject')?.value || 'Pesan dari Website IDCA Bekasi');
    const message = encodeURIComponent(document.getElementById('message')?.value || '');
    const mailtoLink = `mailto:idcakotabekasi@gmail.com?subject=${subject}&body=Salam,%0ANama: ${name}%0AEmail: ${email}%0A%0APesan:%0A${message}`;
    window.location.href = mailtoLink;
  });
}
