<script type="module">
  import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@9/swiper-bundle.esm.browser.min.js'
  const swiper = new Swiper(...)
</script>

window.mySwipe = new Swipe (document.getElementById ('slider'), {
  startSlide: 2,
  speed: 400,
  auto: 3000,
  continuous: true,
  disableScroll: false,
  stopPropagation: false,
  callback: function (index, elem) {},
  transitionEnd: function (index, elem) {}
});
