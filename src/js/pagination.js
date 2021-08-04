// PAGINATION module
import filmoteka from './ApiService';
import localStorageUtl from './localStorageUtl';
import { startAutoScroll } from './autoscroll';

// selecting required element
const element = document.querySelector('.pagination ul');

function startPagination(renderSource) {
  createPagination(filmoteka.totalPages, filmoteka.page);

  //receiving refs after each func call
  const pagRefs = {
    prev: document.querySelector('.prev'),
    numb: document.querySelectorAll('.numb'),
    next: document.querySelector('.next'),
  };

  // numb listener
  pagRefs.numb.forEach(el => {
    el.addEventListener('click', () => {
      filmoteka.setPage(parseInt(el.textContent));
      renderSource();
      setTimeout(startAutoScroll, 0);
      startPagination();
    });
  });

  // prev listener
  if (pagRefs.prev) {
    pagRefs.prev.addEventListener('click', onPrevClick);
  }

  // next listener
  if (pagRefs.next) {
    pagRefs.next.addEventListener('click', onNextClick);
  }

  // handlers
  function onPrevClick() {
    filmoteka.decrementPage();
    renderSource();
    setTimeout(startAutoScroll, 0);
    startPagination();
  }

  function onNextClick() {
    filmoteka.incrementPage();
    renderSource();
    setTimeout(startAutoScroll, 0);
    startPagination();
  }
}

function startLocalPagination(renderSource) {
  createLocalPagination(localStorageUtl.totalPages, localStorageUtl.page);

  //receiving refs after each func call
  const pagRefs = {
    prev: document.querySelector('.prev'),
    numb: document.querySelectorAll('.numb'),
    next: document.querySelector('.next'),
  };

  // numb listener
  pagRefs.numb.forEach(el => {
    el.addEventListener('click', () => {
      localStorageUtl.setPage(parseInt(el.textContent));
      renderSource();
      // setTimeout(startAutoScroll, 0);
      startLocalPagination();
    });
  });

  // prev listener
  if (pagRefs.prev) {
    pagRefs.prev.addEventListener('click', onPrevClick);
  }

  // next listener
  if (pagRefs.next) {
    pagRefs.next.addEventListener('click', onNextClick);
  }

  // handlers
  function onPrevClick() {
    localStorageUtl.decrementPage();
    renderSource();
    // setTimeout(startAutoScroll, 0);
    startLocalPagination();
  }

  function onNextClick() {
    localStorageUtl.incrementPage();
    renderSource();
    // setTimeout(startAutoScroll, 0);
    startLocalPagination();
  }
}

//calling function with passing parameters and adding inside element which is ul tag
function createPagination(totalPages, page) {
  let liTag = '';
  let active;
  let beforePage = page - 1;
  let afterPage = page + 1;

  if (page > 1) {
    //show the next button if the page value is greater than 1
    liTag += `<li class="btn prev"><span><i class="fas fa-arrow-left"></i></span></li>`;
  }

  if (page > 2) {
    //if page value is more than 2 then add 1 after the previous button
    if (totalPages > 3) {
      // first numb should not be rendered when to avoid duplicating with beforePage
      liTag += `<li class="first numb"><span>1</span></li>`;
    }
    if (page > 3) {
      //if page value is greater than 3 then add this (...) after the first li or page
      liTag += `<li class="dots"><span>...</span></li>`;
    }
  }

  // how many pages or li show before the current li

  if (filmoteka.totalPages > 2) {
    afterPage += 1;
  }

  if (page == filmoteka.totalPages) {
    beforePage -= 2;
  } else if (page == filmoteka.totalPages - 1) {
    beforePage -= 1;
  } else if (filmoteka.totalPages == 1) {
    beforePage = 1;
  }

  for (var plength = beforePage; plength <= afterPage; plength++) {
    if (plength > filmoteka.totalPages) {
      //if plength is greater than totalPage length then continue
      continue;
    }

    if (plength < 1) {
      plength = 1;
    }

    if (page == plength) {
      //if page is equal to plength than assign active string in the active variable
      active = 'active';
    } else {
      //else leave empty to the active variable
      active = '';
    }
    liTag += `<li class="numb ${active}"><span>${plength}</span></li>`;
  }

  if (page < filmoteka.totalPages - 1) {
    //if page value is less than totalPage value by -1 then show the last li or page
    if (page < filmoteka.totalPages - 2) {
      //if page value is less than totalPage value by -2 then add this (...) before the last li or page
      liTag += `<li class="dots"><span>...</span></li>`;
    }
    if (totalPages > 3) {
      liTag += `<li class="last numb"><span>${filmoteka.totalPages}</span></li>`;
    }
  }

  if (page < filmoteka.totalPages) {
    //show the next button if the page value is less than totalPage
    liTag += `<li class="btn next"><span><i class="fas fa-arrow-right"></i></span></li>`;
  }
  element.innerHTML = '';
  element.insertAdjacentHTML('beforeend', liTag); //add li tag inside ul tag
  return liTag; //reurn the li tag
}

function createLocalPagination(totalPages, page) {
  let liTag = '';
  let active;
  let beforePage = page - 1;
  let afterPage = page + 1;

  if (page > 1) {
    //show the next button if the page value is greater than 1
    liTag += `<li class="btn prev"><span><i class="fas fa-arrow-left"></i></span></li>`;
  }

  if (page > 2) {
    //if page value is more than 2 then add 1 after the previous button
    if (totalPages > 3) {
      // first numb should not be rendered when to avoid duplicating with beforePage
      liTag += `<li class="first numb"><span>1</span></li>`;
    }
    if (page > 3) {
      //if page value is greater than 3 then add this (...) after the first li or page
      liTag += `<li class="dots"><span>...</span></li>`;
    }
  }

  // how many pages or li show before the current li

  if (localStorageUtl.totalPages > 2) {
    afterPage += 1;
  }

  if (page == localStorageUtl.totalPages) {
    beforePage -= 2;
  } else if (page == localStorageUtl.totalPages - 1) {
    beforePage -= 1;
  } else if (localStorageUtl.totalPages == 1) {
    beforePage = 1;
  }

  for (var plength = beforePage; plength <= afterPage; plength++) {
    if (plength > localStorageUtl.totalPages) {
      //if plength is greater than totalPage length then continue
      continue;
    }

    if (plength < 1) {
      plength = 1;
    }

    if (page == plength) {
      //if page is equal to plength than assign active string in the active variable
      active = 'active';
    } else {
      //else leave empty to the active variable
      active = '';
    }
    liTag += `<li class="numb ${active}"><span>${plength}</span></li>`;
  }

  if (page < localStorageUtl.totalPages - 1) {
    //if page value is less than totalPage value by -1 then show the last li or page
    if (page < localStorageUtl.totalPages - 2) {
      //if page value is less than totalPage value by -2 then add this (...) before the last li or page
      liTag += `<li class="dots"><span>...</span></li>`;
    }
    if (totalPages > 3) {
      liTag += `<li class="last numb"><span>${localStorageUtl.totalPages}</span></li>`;
    }
  }

  if (page < localStorageUtl.totalPages) {
    //show the next button if the page value is less than totalPage
    liTag += `<li class="btn next"><span><i class="fas fa-arrow-right"></i></span></li>`;
  }
  element.innerHTML = '';
  element.insertAdjacentHTML('beforeend', liTag); //add li tag inside ul tag
  return liTag; //reurn the li tag
}

export { startPagination };
export { startLocalPagination };
