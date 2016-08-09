(function() {
  var container = document.querySelector('.js-hero'),
      heroImg = document.querySelector('.js-hero__img'),
      nav = document.querySelector('.js-nav'),
      simpla = Simpla('BkZeRJtd'),
      url = window.location.href;

  setInterval(function checkUrl() {
    if (url.indexOf('#edit') != -1) {
      heroImg.style.width = container.offsetWidth + 'px';
      heroImg.style.height = container.offsetHeight + 'px';
      heroImg.style.display = 'block';
      nav.style.display = 'none';
    }
    else {
      heroImg.style.display = 'none';
      nav.style.display = 'flex';
    }
  }, 1000);

  simpla
  .get('hero-img')
  .then(function(data) {
    container.style.background = 'url(' + data.src + ') right / cover no-repeat';
  });
}());
