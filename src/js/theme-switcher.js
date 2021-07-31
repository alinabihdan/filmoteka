const Theme = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
};

const switchBtn = document.querySelector('.theme-switch__input');
const main = document.querySelector('main');
const body = document.querySelector('body');

switchBtn.addEventListener('change', e => {
  if (e.target.checked) {
    body.classList.add(Theme.DARK);
    main.classList.remove(Theme.LIGHT);
    // classChange(Theme.DARK, Theme.LIGHT);
  } else {
    body.classList.remove(Theme.DARK);
    main.classList.add(Theme.LIGHT);
    // classChange(Theme.LIGHT, Theme.DARK);
  }
});

function classChange(addClass, removeClass) {
  main.classList.add(addClass);
  main.classList.remove(removeClass);
  localStorage.setItem('theme', addClass);
}

function defaultTheme() {
  if (localStorage.getItem('theme') === Theme.DARK) {
    switchBtn.checked = true;
    body.classList.add(Theme.DARK);
    main.classList.remove(Theme.LIGHT);
    // classChange(Theme.DARK, Theme.LIGHT);
  } else {
    switchBtn.checked = false;
    body.classList.remove(Theme.DARK);
    main.classList.add(Theme.LIGHT);
    // classChange(Theme.LIGHT, Theme.DARK);
  }
}

defaultTheme();
