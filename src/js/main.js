const openMenuBtn = document.querySelector('.menu-btn');
const nav = document.querySelector('.header__links');

openMenuBtn.addEventListener('click', function() {
  nav.classList.toggle('header__links--open');
  openMenuBtn.classList.toggle('menu-btn--active');
});

const mediaQuery = window.matchMedia('(max-width: 1280px)');
const filterButtons = document.querySelectorAll('.filters__fieldset button');
const filterMenus = document.querySelectorAll('.filters__menu');

const swiper1 = document.querySelector('.swiper1');
const swiper2 = document.querySelector('.swiper2');
const swiper3 = document.querySelector('.swiper3');
const swiperCatalog = document.querySelector('.swiper--catalog');
const swiperProductPage = document.querySelector('.swiper--similar');
const swiperModal= document.querySelector('.swiper--modal');
const select1 = document.querySelector('.js-choice');
const form = document.querySelector('.modal-form');
const successMessage = document.querySelector('.modal-form__success');

var catalogSwiper = new Swiper(swiperCatalog, {
  pagination: {
    el: '.catalog__pagination',
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + '</span>';
    },
  },
  a11y: {
    paginationBulletMessage: 'Перейти на слайд {{index}}',
  },
});

var swiper = new Swiper(swiper1, {
  direction: 'horizontal',
  spaceBetween: 30,
  effect: 'fade',
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  a11y: {
    paginationBulletMessage: 'Перейти на слайд {{index}}',
  },
});

var specialSwiper = new Swiper(swiper2, {
  direction: 'horizontal',
  loop: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  slidesPerView: 3,
  freeMode: true,
  breakpoints: {
    320: {
      slidesPerView: 1,
    },
    767: {
      slidesPerView: 2,
      spaceBetween: 32,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 32,
    },
  },
});

var articlesSwiper = new Swiper(swiper3, {
  direction: 'horizontal',
  loop: true,
  slidesPerView: 2,
  spaceBetween: 32,
  freeMode: true,
  breakpoints: {
    320: {
      slidesPerView: 1,
    },
    767: {
      slidesPerView: 2,
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
    prevEl: '.swiper-button-prev--articles',
  },
});

const choices = new Choices(select1, {
  allowHTML: true,
  searchEnabled: false,
  placeholder: true,
  itemSelectText: '',
});

var productPageSwiper = new Swiper(swiperProductPage, {
  direction: 'horizontal',
  loop: true,
  slidesPerView: 4,
  freeMode: true,
  navigation: {
    nextEl: '.swiper-button-next--similar',
    prevEl: '.swiper-button-prev--similar',
  },
  breakpoints: {
    320: {
      slidesPerView: 2,
    },
    767: {
      slidesPerView: 2,
      spaceBetween: 16,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 32,
    },
    1280: {
      slidesPerView: 4,
      spaceBetween: 32,
    }
  },
});

var modalSwiper = new Swiper(swiperModal, {
  direction: 'horizontal',
  loop: true,
  slidesPerView: 4,
  spaceBetween: 78,
  freeMode: true,
  navigation: {
    nextEl: '.swiper-button-next--modal',
    prevEl: '.swiper-button-prev--modal',
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
    },
    767: {
      slidesPerView: 1,
    },
    1024: {
      slidesPerView: 2,
    },
    1280: {
      slidesPerView: 3,
    }
  },
});

function handleTabletChange(e) {
  if (e.matches) {
    filterButtons.forEach((btn) => {
      btn.classList.add('btn', 'dropdown-toggle', 'dropdown-toggle--catalog');
      btn.dataset.bsToggle = 'dropdown';
    });
    filterMenus.forEach((menu) => {
      menu.classList.add('dropdown-menu');
    })
  } else {
    filterButtons.forEach((btn) => {
      btn.classList.remove('btn', 'dropdown-toggle', 'dropdown-toggle--catalog');
      btn.dataset.bsToggle = '';
    });
    filterMenus.forEach((menu) => {
      menu.classList.remove('dropdown-menu');
    })
  }
}
mediaQuery.addListener(handleTabletChange);
handleTabletChange(mediaQuery);

const myModal = new HystModal({
  linkAttributeName: "data-hystmodal",
});

if (form) {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    form.style.display = 'none';
    successMessage.style.display = 'block';
  });
}
