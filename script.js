  // Reveal on scroll
  const reveals = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.12 });
  reveals.forEach(r => obs.observe(r));

  // Cursor halo with delayed follow
  const halo = document.getElementById('cursor-halo');
  let mouseX = 0, mouseY = 0, haloX = 0, haloY = 0;
  let active = false;

  window.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (!active) { halo.classList.add('active'); active = true; }
  });

  function animateHalo() {
    haloX += (mouseX - haloX) * 0.12;
    haloY += (mouseY - haloY) * 0.12;
    halo.style.transform = `translate(${haloX}px, ${haloY}px) translate(-50%, -50%)`;
    requestAnimationFrame(animateHalo);
  }
  animateHalo();

  // Boost halo on interactive hover
  document.querySelectorAll('.btn, .feature-card, .benefit-card, .step-card, .price-card').forEach(el => {
    el.addEventListener('mouseenter', () => halo.classList.add('boost'));
    el.addEventListener('mouseleave', () => halo.classList.remove('boost'));
  });

  // Magnetic buttons
  document.querySelectorAll('.magnetic').forEach(wrap => {
    const btn = wrap.querySelector('.btn');
    if (!btn) return;
    wrap.addEventListener('mousemove', e => {
      const r = wrap.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      btn.style.transform = `translate(${x * 0.18}px, ${y * 0.3}px) scale(1.03)`;
    });
    wrap.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0,0) scale(1)';
    });
  });

  // Feature card light follow
  document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX - r.left}px`);
      card.style.setProperty('--my', `${e.clientY - r.top}px`);
    });
  });

  // Auto-close other FAQ items
  document.querySelectorAll('.faq-item').forEach(item => {
    item.addEventListener('toggle', () => {
      if (item.open) {
        document.querySelectorAll('.faq-item').forEach(other => {
          if (other !== item) other.removeAttribute('open');
        });
      }
    });
  });
