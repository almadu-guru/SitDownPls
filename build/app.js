"use strict";

var openMenuBtn = document.querySelector('.menu-btn');
var nav = document.querySelector('.header__links');
openMenuBtn.addEventListener('click', function () {
  nav.classList.toggle('header__links--open');
  openMenuBtn.classList.toggle('menu-btn--active');
});
var mediaQuery = window.matchMedia('(max-width: 1280px)');
var filterButtons = document.querySelectorAll('.filters__fieldset button');
var filterMenus = document.querySelectorAll('.filters__menu');
var swiper1 = document.querySelector('.swiper1');
var swiper2 = document.querySelector('.swiper2');
var swiper3 = document.querySelector('.swiper3');
var swiperCatalog = document.querySelector('.swiper--catalog');
var swiperProductPage = document.querySelector('.swiper--similar');
var swiperModal = document.querySelector('.swiper--modal');
var select1 = document.querySelector('.js-choice');
var form = document.querySelector('.modal-form');
var successMessage = document.querySelector('.modal-form__success');
var catalogSwiper = new Swiper(swiperCatalog, {
  pagination: {
    el: '.catalog__pagination',
    clickable: true,
    renderBullet: function renderBullet(index, className) {
      return '<span class="' + className + '">' + (index + 1) + '</span>';
    }
  },
  a11y: {
    paginationBulletMessage: 'Перейти на слайд {{index}}'
  }
});
var swiper = new Swiper(swiper1, {
  direction: 'horizontal',
  spaceBetween: 30,
  effect: 'fade',
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  },
  a11y: {
    paginationBulletMessage: 'Перейти на слайд {{index}}'
  }
});
var specialSwiper = new Swiper(swiper2, {
  direction: 'horizontal',
  loop: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  },
  slidesPerView: 3,
  freeMode: true,
  breakpoints: {
    320: {
      slidesPerView: 1
    },
    767: {
      slidesPerView: 2,
      spaceBetween: 32
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 32
    }
  }
});
var articlesSwiper = new Swiper(swiper3, {
  direction: 'horizontal',
  loop: true,
  slidesPerView: 2,
  spaceBetween: 32,
  freeMode: true,
  breakpoints: {
    320: {
      slidesPerView: 1
    },
    767: {
      slidesPerView: 2
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 32
    },
    1280: {
      slidesPerView: 2,
      spaceBetween: 32
    }
  },
  navigation: {
    nextEl: '.swiper-button-next--articles',
    prevEl: '.swiper-button-prev--articles'
  }
});
var choices = new Choices(select1, {
  allowHTML: true,
  searchEnabled: false,
  placeholder: true,
  itemSelectText: ''
});
var productPageSwiper = new Swiper(swiperProductPage, {
  direction: 'horizontal',
  loop: true,
  slidesPerView: 4,
  freeMode: true,
  navigation: {
    nextEl: '.swiper-button-next--similar',
    prevEl: '.swiper-button-prev--similar'
  },
  breakpoints: {
    320: {
      slidesPerView: 2
    },
    767: {
      slidesPerView: 2,
      spaceBetween: 16
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 32
    },
    1280: {
      slidesPerView: 4,
      spaceBetween: 32
    }
  }
});
var modalSwiper = new Swiper(swiperModal, {
  direction: 'horizontal',
  loop: true,
  slidesPerView: 4,
  spaceBetween: 78,
  freeMode: true,
  navigation: {
    nextEl: '.swiper-button-next--modal',
    prevEl: '.swiper-button-prev--modal'
  },
  breakpoints: {
    320: {
      slidesPerView: 1
    },
    767: {
      slidesPerView: 1
    },
    1024: {
      slidesPerView: 2
    },
    1280: {
      slidesPerView: 3
    }
  }
});
function handleTabletChange(e) {
  if (e.matches) {
    filterButtons.forEach(function (btn) {
      btn.classList.add('btn', 'dropdown-toggle', 'dropdown-toggle--catalog');
      btn.dataset.bsToggle = 'dropdown';
    });
    filterMenus.forEach(function (menu) {
      menu.classList.add('dropdown-menu');
    });
  } else {
    filterButtons.forEach(function (btn) {
      btn.classList.remove('btn', 'dropdown-toggle', 'dropdown-toggle--catalog');
      btn.dataset.bsToggle = '';
    });
    filterMenus.forEach(function (menu) {
      menu.classList.remove('dropdown-menu');
    });
  }
}
mediaQuery.addListener(handleTabletChange);
handleTabletChange(mediaQuery);
var myModal = new HystModal({
  linkAttributeName: "data-hystmodal"
});
if (form) {
  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    form.style.display = 'none';
    successMessage.style.display = 'block';
  });
}