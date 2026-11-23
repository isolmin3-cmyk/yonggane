const textElements = [...document.querySelectorAll('[data-ko]')];
const imageElements = [...document.querySelectorAll('[data-alt-ko]')];
const englishCopy = textElements.map(element => element.innerHTML);
const englishAlts = imageElements.map(element => element.alt);
const languageButtons = [...document.querySelectorAll('[data-lang]')];
const menu = document.querySelector('.menu');
const navigation = document.getElementById('navigation');

function showLanguage(language) {
  const korean = language === 'ko';
  document.documentElement.lang = language;
  document.title = korean ? '용가네 — 진도에서 온 수산식품' : 'YONGGANE — Seafood from Jindo';
  textElements.forEach((element, index) => {
    element.innerHTML = korean ? element.dataset.ko : englishCopy[index];
  });
  imageElements.forEach((element, index) => {
    element.alt = korean ? element.dataset.altKo : englishAlts[index];
  });
  languageButtons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.lang === language)));
}

function showMenu(open) {
  menu.setAttribute('aria-expanded', String(open));
  navigation.classList.toggle('open', open);
}

languageButtons.forEach(button => button.addEventListener('click', () => {
  showLanguage(button.dataset.lang);
  const url = new URL(location.href);
  if (button.dataset.lang === 'ko') url.searchParams.set('lang', 'ko');
  else url.searchParams.delete('lang');
  if (location.protocol !== 'file:') history.replaceState(null, '', url);
}));

menu.addEventListener('click', () => showMenu(menu.getAttribute('aria-expanded') !== 'true'));
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', () => showMenu(false)));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {
    showMenu(false);
    menu.focus();
  }
});

if (new URL(location.href).searchParams.get('lang') === 'ko') showLanguage('ko');
