
import Swiper from 'swiper';
import 'swiper/swiper-bundle.css';
import refs from './refs';

import SwiperCore, { EffectCoverflow, Navigation, Pagination, Keyboard } from 'swiper/core';
  // configure Swiper to use modules
  SwiperCore.use([EffectCoverflow, Navigation, Pagination, Keyboard]);

const swiper = new Swiper('.swiper-container', {

    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
        hideOnClick: true,
      },
    keyboard: {
        enabled: true,
        onlyInViewport: false,
      },
    
  });



  refs.linkGoIT.addEventListener('click', openGoitModal);
  refs.footerCloseBtn.addEventListener('click', closeGoitModal);
  window.addEventListener('keydown', closingModal);

  function openGoitModal(e){
    e.preventDefault();
    refs.footerModalWindow.classList.remove('footerModalClose');
    refs.footerModalWindow.classList.add('footer-modal');
    swiper.update();
    
  };

  function closeGoitModal(){
    refs.footerModalWindow.classList.add('footerModalClose');
    refs.footerModalWindow.classList.remove('footer-modal'); 
  };

  function closingModal (event){
      const pressedKey = event.keyCode;
      const modalIsOpen = refs.footerModalWindow.classList.contains('footer-modal'); //Тут должен быть класс/айди открытой модалки i.e "is-open", "modal-open"
      if (pressedKey === 27 && modalIsOpen) {
        closeGoitModal();
      }
  };
