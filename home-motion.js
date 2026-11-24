const homeMotion = window.matchMedia('(prefers-reduced-motion: no-preference)');

if (homeMotion.matches && 'IntersectionObserver' in window) {
  const sections = document.querySelectorAll('main > .home, main > .facts, main > .band, main > .cta');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.dataset.reveal = 'shown';
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -48px 0px' });

  sections.forEach((section) => {
    section.dataset.reveal = 'pending';
    observer.observe(section);
  });
}
