// Lenis smooth scroll
const lenisScript = document.createElement('script');
lenisScript.src = 'https://cdn.jsdelivr.net/npm/lenis@1.1.14/dist/lenis.min.js';
lenisScript.onload = () => {
  const lenis = new Lenis({ duration: 1.2, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
  function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
  requestAnimationFrame(raf);
};
document.head.appendChild(lenisScript);

const page = window.location.pathname.split('/').pop() || 'index.html';

document.getElementById('site-header').innerHTML = `
  <a href="/" class="nav-link nav-left ${page === 'index.html' || page === '' || page === 'index' ? 'active' : ''}">WORKS</a>
  <a href="/about" class="nav-link nav-center ${page === 'about.html' || page === 'about' ? 'active' : ''}">ABOUT</a>
  <a href="/contact" class="nav-link nav-right ${page === 'contact.html' || page === 'contact' ? 'active' : ''}">CONTACT</a>
`;

document.getElementById('site-footer').innerHTML = `
  <span class="footer-text footer-left">© Jeremy Tamom</span>
  <span class="footer-text footer-center">2026</span>
  <div class="footer-links footer-right">
    <a href="mailto:jeremytamom@gmail.com" class="footer-link">EMAIL</a>
    <a href="https://www.instagram.com/j3eyyy/" target="_blank" class="footer-link">INSTAGRAM</a>
  </div>
`;

// Protection images : clic droit + drag bloqués
document.addEventListener('contextmenu', e => {
  if (e.target.tagName === 'IMG') e.preventDefault();
});
document.addEventListener('dragstart', e => {
  if (e.target.tagName === 'IMG') e.preventDefault();
});

// Apparition des photos au scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.photo-item').forEach(el => observer.observe(el));

// Hero scroll-driven shrink (height-based)
const hero = document.querySelector('.hero');
const heroPhoto = document.querySelector('.hero-photo');
if (hero && heroPhoto) {
  const isMobile = () => window.innerWidth <= 768;
  let startH = isMobile() ? 50 : 65;
  let endH   = isMobile() ? 25 : 35;
  let range  = hero.offsetHeight - window.innerHeight;
  let lastV = -1, lastBg = -1, rafId = 0;

  function updateHero() {
    rafId = 0;
    const p = Math.min(Math.max(window.scrollY / range, 0), 1);
    const v = Math.round((startH - (startH - endH) * p) * 10) / 10;
    if (v !== lastV) {
      heroPhoto.style.setProperty('--hero-h', `${v}vh`);
      lastV = v;
    }
    const bg = Math.round(17 + (255 - 17) * p);
    if (bg !== lastBg) {
      hero.style.backgroundColor = `rgb(${bg},${bg},${bg})`;
      lastBg = bg;
    }
  }
  function onScroll() {
    if (!rafId) rafId = requestAnimationFrame(updateHero);
  }
  function onResize() {
    startH = isMobile() ? 50 : 65;
    endH   = isMobile() ? 25 : 35;
    range  = hero.offsetHeight - window.innerHeight;
    updateHero();
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onResize);
  updateHero();
}

const FORMSPREE_ID = 'mredlagk'; // Remplace par ton ID Formspree

async function handleSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const btn = form.querySelector('button');

  btn.textContent = 'Sending...';
  btn.disabled = true;

  try {
    const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: new FormData(form),
    });

    if (res.ok) {
      btn.textContent = 'Sent ✓';
      form.reset();
    } else {
      btn.textContent = 'Error — try again';
      btn.disabled = false;
    }
  } catch {
    btn.textContent = 'Error — try again';
    btn.disabled = false;
  }
}
