function handleSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector('button');
  btn.textContent = 'Envoyé ✓';
  btn.style.opacity = '0.5';
  btn.disabled = true;
}
