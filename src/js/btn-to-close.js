const refs = {
  closeBtn: document.querySelector('[data-action = "close"]'),
  modalWindow: document.querySelector(''),//Тут должен быть класс или айди модалки
  modalOverlay: document.querySelector('') //Тут должен быть класс или айди оверлея модалки 
}

refs.closeBtn.addEventListener('click', closeModal);
refs.modalOverlay.addEventListener('click', closeModal);
window.addEventListener('keydown', keyPress);



function keyPress(event) {
  //escape key 27 
  const pressedKey = event.keyCode;
  const modalIsOpen = refs.modalWindow.classList.contains('');//Тут должен быть класс/айди открытой модалки i.e "is-open", "modal-open"
  if(pressedKey === 27 && modalIsOpen) {
    closeModal();
  }
}



function closeModal() {
  refs.modalWindow.classList.remove(''); //Тут должен быть класс/айди который мы убираем с модалки для того чтобы ее спрятать 
}