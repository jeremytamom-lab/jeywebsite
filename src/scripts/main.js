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
  <a href="./" class="nav-logo">JEREMYTAMOM</a>
  <nav class="nav-links">
    <a href="about.html" class="nav-link ${page === 'about.html' ? 'active' : ''}">ABOUT</a>
    <a href="contact.html" class="nav-link ${page === 'contact.html' ? 'active' : ''}">CONTACT</a>
  </nav>
`;

document.getElementById('site-footer').innerHTML = `
  <p>© JEREMY TAMOM, ALL RIGHTS RESERVED, 2026</p>
  <div class="footer-links">
    <a href="mailto:jeremytamom@gmail.com">EMAIL</a>
    <a href="https://www.instagram.com/j3eyyy/" target="_blank">INSTAGRAM</a>
  </div>
`;

function handleSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector('button');
  btn.textContent = 'Sent ✓';
  btn.style.opacity = '0.5';
  btn.disabled = true;
}
