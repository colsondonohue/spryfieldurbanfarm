(function() {
  var container = document.querySelector('.js-blog'),
      simpla = Simpla('BkZeRJtd'),
      blogCount;

  simpla.get('blog').then(function(postIDs) {
    blogCount = postIDs.length || 0;
    for (var i = 1; i < blogCount ; i++) {
      post = document.createElement('simpla-block');
      post.sid = 'blog-' + i;
      post.innerHTML += '<figure class="info-page__image info-page__image--half">' +
                          '<simpla-img class="info-page__figure-image" sid="image-1"></simpla-img>' +
                          '<figcaption><simpla-text sid="caption-1"></simpla-text></figcaption>' +
                        '</figure>';
      post.innerHTML += '<h3 class="info-page__subtitle info-page__subtitle--no-top"><simpla-text sid="title"></simpla-text></h3>' +
                        '<simpla-text sid="post"></simpla-text>';
      container.insertBefore(post, container.firstChild);
    }
  }).then((function detectEdit() {
    var url = window.location.href,
        newPost;
    if (url.indexOf('#edit') != -1) {
      newPost = document.createElement('simpla-block');
      newPost.sid = 'blog-' + (blogCount + 1);
      newPost.innerHTML = '<figure class="info-page__image info-page__image--half">' +
                            '<simpla-img class="info-page__figure-image" sid="image-1"></simpla-img>' +
                            '<figcaption><simpla-text sid="caption-1"></simpla-text></figcaption>' +
                          '</figure>' +
                          '<h3 class="info-page__subtitle info-page__subtitle--no-top"><simpla-text sid="title"></simpla-text></h3>' +
                          '<simpla-text sid="post"></simpla-text>';

      container.insertBefore(newPost, container.firstChild);
    }
    else {
      setTimeout(detectEdit, 500);
    }
  }));
}());
