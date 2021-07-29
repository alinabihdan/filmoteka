import refs from './refs';

// const refs = {
//   closeBtn: document.querySelector('[data-action = "close"]'),
//   modalWindow: document.querySelector('.film-blackdrop'),//Тут должен быть класс или айди модалки
//   // modalOverlay: document.querySelector(''), //Тут должен быть класс или айди оверлея модалки
// }

refs.closeBtn.addEventListener('click', closeModal);
refs.modalWindow.addEventListener('click', overlayClick);
// refs.modalOverlay.addEventListener('click', closeModal);
window.addEventListener('keydown', keyPress);

function keyPress(event) {
  //escape key 27
  const pressedKey = event.keyCode;
  const modalIsOpen = refs.modalWindow.classList.contains('is-active'); //Тут должен быть класс/айди открытой модалки i.e "is-open", "modal-open"
  if (pressedKey === 27 && modalIsOpen) {
    closeModal();
  }
}

function overlayClick(e) {
  if (e.target.classList.contains('film-blackdrop')) {
    closeModal();
  }
}

function closeModal() {
  refs.modalWindow.classList.remove('is-active'); //Тут должен быть класс/айди который мы убираем с модалки для того чтобы ее спрятать
  refsB.bodyEl.classList.remove('modal-open');
}
