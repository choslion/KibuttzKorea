function changeBlack() {
  const darkHeader = document.querySelector('header');
  const darkNav = document.querySelectorAll('.sub-nav__list > a');
  const darkBorder = document.querySelectorAll('.sub-nav__inner');
  const pcNavBg = document.querySelector('.pc-nav__bg');
  darkHeader.style.backgroundColor = 'rgba(28,77,154,1)';
  darkNav.forEach((item) => (item.style.color = 'black'));
  darkBorder.forEach((item) => (item.style.borderLeft = 'black'));
  darkBorder.forEach((item) => (item.style.borderRight = 'black'));
  pcNavBg.style.backgroundColor = 'rgba(255,255,255,0.8)';
}

function changeWhite() {
  const darkHeader = document.querySelector('header');
  const pcNavBg = document.querySelector('.pc-nav__bg');
  darkHeader.style.backgroundColor = 'rgba(255,255,255,0)';
  pcNavBg.style.backgroundColor = 'rgba(255,255,255,0)';
}
