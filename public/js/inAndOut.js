const pcNav = document.querySelector('.pc-nav');
const subNav = document.querySelectorAll('.sub-nav__wrap');
const pcNavBg = document.querySelector('.pc-nav__bg');

pcNav.addEventListener('mouseenter', function () {
  for (let i = 0; i < subNav.length; i++) {
    const list = subNav[i];
    list.classList.add('pc-nav__active');
  }
  pcNavBg.classList.add('pc-nav__bg--active');
});

pcNav.addEventListener('mouseleave', function () {
  for (let i = 0; i < subNav.length; i++) {
    const list = subNav[i];
    list.classList.remove('pc-nav__active');
  }
  pcNavBg.classList.remove('pc-nav__bg--active');
});
