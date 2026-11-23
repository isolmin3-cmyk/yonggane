document.documentElement.classList.add("js");

const navigation = document.querySelector('#navigation');
const menu = document.querySelector('.menu');
const groups = [...navigation.querySelectorAll('details')];

function closeGroups(except) {
  groups.forEach(group => {
    if (group !== except) group.open = false;
  });
}

function setMobileMenu(open) {
  menu.setAttribute('aria-expanded', String(open));
  navigation.classList.toggle('open', open);
  if (!open) closeGroups();
}

menu.addEventListener('click', () => {
  setMobileMenu(menu.getAttribute('aria-expanded') !== 'true');
});

groups.forEach(group => group.addEventListener('toggle', () => {
  if (group.open) closeGroups(group);
}));

navigation.addEventListener('click', event => {
  if (event.target.closest('a')) setMobileMenu(false);
});

document.addEventListener('click', event => {
  if (!event.target.closest('.header')) setMobileMenu(false);
});

document.addEventListener('keydown', event => {
  if (event.key !== 'Escape') return;
  const openGroup = groups.find(group => group.open);
  if (openGroup) {
    openGroup.open = false;
    openGroup.querySelector('summary').focus();
  } else if (menu.getAttribute('aria-expanded') === 'true') {
    setMobileMenu(false);
    menu.focus();
  }
});

if (!matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
  const reveal = new IntersectionObserver(entries => {
    entries.forEach(({ isIntersecting, target }) => {
      if (!isIntersecting) return;
      target.classList.add('revealed');
      reveal.unobserve(target);
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.section h2, .product-grid article, .trade').forEach(element => {
    if (element.getBoundingClientRect().top > innerHeight) reveal.observe(element);
  });
}
