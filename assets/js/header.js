(function() {
  var container = document.querySelector('.js-hero'),
      heroImg = document.querySelector('.js-hero__img'),
      nav = document.querySelector('.js-nav'),
      simpla = Simpla('BkZeRJtd');

  setInterval(function checkUrl() {
    var url = window.location.href;
    if (url.indexOf('#edit') != -1) {
      heroImg.style.width = container.offsetWidth / 2 + 'px';
      heroImg.style.height = container.offsetHeight / 2 + 'px';
      heroImg.style.left = (container.offsetWidth / 4) + 'px';
      heroImg.style.top = (container.offsetHeight / 4) + 'px';
      heroImg.style.display = 'block';
    }
    else {
      heroImg.style.display = 'none';
    }
  }, 1000);

  simpla
  .get('hero-img')
  .then(function(data) {
    container.style.background = 'url(' + data.src + ') right / cover no-repeat';
  });
}());
