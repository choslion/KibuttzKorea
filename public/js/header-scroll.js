const header = document.querySelector("header");

window.addEventListener("scroll", function () {
  let scrollDown = window.pageYOffset;
  let scrollHeader = header.clientHeight;
  if (scrollDown > scrollHeader) {
    header.classList.add("header-none");
    header.classList.remove("header-fixed");
  } else {
    header.classList.remove("header-none");
    header.classList.add("header-fixed");
  }
});
