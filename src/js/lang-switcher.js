import refs from './refs';

export const Languages = {
  en: 'en-US',
  ru: 'ru-RU',
};

const switchLangBtn = document.querySelector('.lang-switch__input');
switchLangBtn.addEventListener('change', e => {
  if (e.target.checked) {
    localStorage.setItem('lang', Languages.ru);
  } else {
    localStorage.setItem('lang', Languages.en);
  }
});

function defaultLang() {
  if (localStorage.getItem('theme') === Languages.en) {
    switchLangBtn.checked = false;
  } else {
    switchLangBtn.checked = true;
  }
}

defaultLang();
