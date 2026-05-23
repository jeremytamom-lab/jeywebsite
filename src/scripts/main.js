const page = window.location.pathname.split('/').pop() || 'index.html';

document.getElementById('site-header').innerHTML = `
  <a href="index.html" class="nav-logo">Jeremy Tamom</a>
  <nav class="nav-links">
    <a href="about.html" class="nav-link ${page === 'about.html' ? 'active' : ''}">ABOUT</a>
    <a href="contact.html" class="nav-link ${page === 'contact.html' ? 'active' : ''}">CONTACT</a>
  </nav>
`;

document.getElementById('site-footer').innerHTML = `
  <p>© Jeremy Tamom, All Rights Reserved, 2026</p>
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
