import 'swiper/swiper-bundle.css';
import './sass/main.scss';
import './js/ApiService';

import Swiper from 'swiper';
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