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
  <a href="index.html" class="nav-link nav-left ${page === 'index.html' || page === '' ? 'active' : ''}">WORKS</a>
  <a href="about.html" class="nav-link nav-center ${page === 'about.html' ? 'active' : ''}">ABOUT</a>
  <a href="contact.html" class="nav-link nav-right ${page === 'contact.html' ? 'active' : ''}">CONTACT</a>
`;

document.getElementById('site-footer').innerHTML = `
  <p>© JEREMY TAMOM, ALL RIGHTS RESERVED, 2026</p>
  <div class="footer-links">
    <a href="mailto:jeremytamom@gmail.com">EMAIL</a>
    <a href="https://www.instagram.com/j3eyyy/" target="_blank">INSTAGRAM</a>
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
