const homeMotion = window.matchMedia('(prefers-reduced-motion: no-preference)');

if (homeMotion.matches && 'IntersectionObserver' in window) {
  const sections = document.querySelectorAll('main > .hero, main > .facts, main > .band, main > .cta, main > .breadcrumb');
  const sectionByTarget = new Map();
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        sectionByTarget.get(entry.target).dataset.reveal = 'shown';
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -48px 0px' });

  sections.forEach((section) => {
    section.dataset.reveal = 'pending';
    const target = section.querySelector(':scope > .wrap') ?? section;
    sectionByTarget.set(target, section);
    observer.observe(target);
  });
}
