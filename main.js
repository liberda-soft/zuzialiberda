// Nav background after leaving the hero
const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > window.innerHeight * 0.6);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// Reveal on scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      e.target.classList.add('is-in');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

// Gentle parallax inside image frames
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const frames = [...document.querySelectorAll('.media')];
let ticking = false;
const parallax = () => {
  const vh = window.innerHeight;
  frames.forEach((f) => {
    const r = f.getBoundingClientRect();
    if (r.bottom < 0 || r.top > vh) return;
    const p = (r.top + r.height / 2 - vh / 2) / vh; // -1..1
    f.style.setProperty('--py', (p * -6 - 6).toFixed(2) + '%');
  });
  ticking = false;
};
if (!reduce) {
  parallax();
  window.addEventListener('scroll', () => {
    if (!ticking) { ticking = true; requestAnimationFrame(parallax); }
  }, { passive: true });
}
