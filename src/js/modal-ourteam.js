
import Swiper from 'swiper';
import 'swiper/swiper-bundle.css';


import SwiperCore, { EffectCoverflow, Navigation, Pagination } from 'swiper/core';
  // configure Swiper to use modules
  SwiperCore.use([EffectCoverflow, Navigation, Pagination]);

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
    
  });




const refs = {
    footerCloseBtn: document.querySelector('#footerCloseBtn'),
    footerModalWindow: document.querySelector('#footer-modal'),
    linkGoIT: document.querySelector('.footer-text-goit-link'),
  };

  refs.linkGoIT.addEventListener('click', openGoitModal);
  refs.footerCloseBtn.addEventListener('click', closeGoitModal);

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