<script type="module" src="./swiper/swiper-bundle.esm.browser.min.js"></script>
window.mySwipe = new Swiper (document.getElementById ('slider'), {
  startSlide: 2,
  speed: 400,
  auto: 3000,
  continuous: true,
  disableScroll: false,
  stopPropagation: false,
  callback: function (index, elem) {},
  transitionEnd: function (index, elem) {}
});
