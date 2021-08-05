import refs from './refs';

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
  refs.bodyEl.classList.remove('modal-open');
  refs.filmModalField.classList.remove('is-active');
  refs.buttonToTop.classList.remove('visually-hidden');
}
