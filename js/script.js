/* ---- Scroll-triggered reveal (IntersectionObserver) ---- */
function initScrollReveal(){
  const items = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger');
  if (!items.length) return;
  if (!('IntersectionObserver' in window)){
    items.forEach(el => {
      el.classList.add('in');
      el.querySelectorAll('[data-count]').forEach(n => { n.textContent = n.dataset.count + (n.dataset.suffix || ''); });
    });
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('in');
      if (entry.target.classList.contains('stat-card')){
        entry.target.querySelectorAll('[data-count]').forEach(animateCount);
      }
      io.unobserve(entry.target);
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
  items.forEach(el => io.observe(el));
}
window.initScrollReveal = initScrollReveal;

/* ---- Count-up numbers (supports a suffix such as "5+") ---- */
function animateCount(el){
  const target = parseInt(el.dataset.count, 10);
  if (isNaN(target)) return;
  const suffix = el.dataset.suffix || '';
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    el.textContent = target + suffix;
    return;
  }
  const duration = 900, start = performance.now();
  const tick = (now) => {
    const p = Math.min(1, (now - start) / duration);
    el.textContent = Math.floor(p * target) + suffix;
    if (p < 1) requestAnimationFrame(tick); else el.textContent = target + suffix;
  };
  requestAnimationFrame(tick);
}

/* ---- Scroll progress bar + header shrink ---- */
function initScrollChrome(){
  const bar = document.querySelector('.scroll-progress');
  const header = document.querySelector('.site-header');
  if (!bar && !header) return;
  const onScroll = () => {
    const h = document.documentElement;
    const max = h.scrollHeight - h.clientHeight;
    if (bar) bar.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + '%';
    if (header) header.classList.toggle('scrolled', h.scrollTop > 40);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  initScrollChrome();

  /* ---- Header search expand ---- */
  const searchBox = document.querySelector('.search-box');
  const searchBtn = document.querySelector('.search-box button');
  if (searchBox && searchBtn){
    searchBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const input = searchBox.querySelector('input');
      if (!searchBox.classList.contains('open')){
        searchBox.classList.add('open');
        input.focus();
      } else if (input.value.trim() !== ''){
        window.location.href = 'blogs.html?q=' + encodeURIComponent(input.value.trim());
      } else {
        searchBox.classList.remove('open');
      }
    });
    document.addEventListener('click', (e)=>{
      if (!searchBox.contains(e.target)) searchBox.classList.remove('open');
    });
  }

  /* ---- Mobile burger nav ---- */
  const burger = document.querySelector('.burger');
  const mobileNav = document.querySelector('.mobile-nav');
  if (burger && mobileNav){
    burger.addEventListener('click', () => mobileNav.classList.toggle('open'));
    mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', ()=>mobileNav.classList.remove('open')));
  }

  /* ---- Side nav active-section highlight (homepage) ---- */
  const sideLinks = document.querySelectorAll('.side-nav a');
  if (sideLinks.length){
    const sections = Array.from(sideLinks).map(l => document.querySelector(l.getAttribute('href')));
    const setActive = () => {
      let current = sections[0];
      sections.forEach(sec => {
        if (sec && window.scrollY >= sec.offsetTop - 200) current = sec;
      });
      sideLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + current.id));
    };
    window.addEventListener('scroll', setActive);
    setActive();
  }

  /* ---- Works slider ---- */
  const track = document.querySelector('.works-slides');
  if (track){
    const slides = track.children.length;
    let i = 0;
    const go = (n) => { i = (n + slides) % slides; track.style.transform = `translateX(-${i * 100}%)`; };
    document.querySelector('.slider-prev').addEventListener('click', () => go(i - 1));
    document.querySelector('.slider-next').addEventListener('click', () => go(i + 1));
  }

  /* ---- Contact form (opens the visitor's email app, no backend needed) ---- */
  const form = document.querySelector('.contact-form form');
  if (form){
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.querySelector('input[type="text"]').value.trim();
      const email = form.querySelector('input[type="email"]').value.trim();
      const text = form.querySelector('textarea').value.trim();
      const subject = encodeURIComponent('Portfolio message from ' + name);
      const body = encodeURIComponent(text + '\n\n— ' + name + ' (' + email + ')');
      const msg = document.querySelector('.form-msg');
      msg.textContent = 'Opening your email app to send the message…';
      window.location.href = 'mailto:noraslmi98@gmail.com?subject=' + subject + '&body=' + body;
      form.reset();
    });
  }

  /* ---- Subscribe buttons ---- */
  document.querySelectorAll('.subscribe-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.textContent = 'Subscribed ✓';
      btn.disabled = true;
    });
  });
});
