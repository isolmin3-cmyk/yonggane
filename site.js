const menu = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#site-nav');

function setMenu(open) {
  navigation.classList.toggle('open', open);
  menu.setAttribute('aria-expanded', String(open));
  menu.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');
}

menu.addEventListener('click', () => setMenu(menu.getAttribute('aria-expanded') === 'false'));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {
    setMenu(false);
    menu.focus();
  }
});

const groups = [...navigation.querySelectorAll('.nav-group')];

const desktopPointer = window.matchMedia('(min-width: 721px) and (hover: hover) and (pointer: fine)');

function openGroup(group) {
  groups.forEach((other) => { other.open = other === group; });
}

groups.forEach((group) => {
  const summary = group.querySelector('summary');

  summary.addEventListener('click', (event) => {
    if (desktopPointer.matches && event.detail > 0 && group.matches(':hover')) {
      event.preventDefault();
      openGroup(group);
    } else if (!group.open) {
      groups.filter((other) => other !== group).forEach((other) => { other.open = false; });
    }
  });

  group.addEventListener('pointerenter', (event) => {
    if (desktopPointer.matches && event.pointerType === 'mouse') {
      openGroup(group);
    }
  });

  group.addEventListener('pointerleave', (event) => {
    if (desktopPointer.matches && event.pointerType === 'mouse' &&
        !group.querySelector('ul').contains(document.activeElement)) {
      group.open = false;
    }
  });
});

document.addEventListener('click', (event) => {
  if (!navigation.contains(event.target)) {
    groups.forEach((group) => { group.open = false; });
  }
});

navigation.addEventListener('keydown', (event) => {
  const group = event.target.closest('.nav-group[open]');
  if (event.key === 'Escape' && group) {
    event.stopPropagation();
    group.open = false;
    group.querySelector('summary').focus();
  }
});

const inquiry = document.querySelector('#inquiry');
if (inquiry) {
  const params = new URLSearchParams(window.location.search);
  const type = document.querySelector('#inquiry-type');
  const product = document.querySelector('#inquiry-product');
  const requestedType = params.get('type');
  if ([...type.options].some((option) => option.value === requestedType)) {
    type.value = requestedType;
  }
  if (params.get('product') === 'abalone') {
    product.value = '자숙전복 1kg';
  }
  inquiry.addEventListener('submit', (event) => {
    event.preventDefault();
    const lines = [...new FormData(inquiry)].map(([name, value]) =>
      name === type.name ? name + ' — ' + type.selectedOptions[0].text : name + ' — ' + value);
    const file = new Blob(['\uFEFF', '기적수산 사업문의\n\n', lines.join('\n')], {type: 'text/plain;charset=utf-8'});
    const download = document.createElement('a');
    download.href = URL.createObjectURL(file);
    download.download = '기적수산-사업문의.txt';
    document.body.append(download);
    download.click();
    download.remove();
    setTimeout(() => URL.revokeObjectURL(download.href), 1000);
    document.querySelector('#form-status').textContent = '문의 내용 파일을 다운로드했습니다.';
  });
}
