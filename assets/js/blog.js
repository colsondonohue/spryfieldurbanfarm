(function() {
  var container = document.querySelector('.js-blog'),
      simpla = Simpla('BkZeRJtd'),
      blogCount;

  simpla.get('blog').then(function(postIDs) {
    var blogPosts = document.createDocumentFragment();
    blogCount = postIDs.length || 0;
    if (postIDs.constructor === Array) {
      postIDs.forEach(function(postID, index) {
        var post;
        if (index >= blogCount - 5) {
          post = document.createElement('simpla-block');

          post.sid = postID;
          post.innerHTML += '<figure class="info-page__image info-page__image--half">' +
                              '<simpla-img class="info-page__figure-image" sid="image-1"></simpla-img>' +
                              '<figcaption><simpla-text sid="caption-1"></simpla-text></figcaption>' +
                            '</figure>';
          if (postID['image-2']) {
            post.innerHTML += '<figure class="info-page__image info-page__image--half">' +
                                '<simpla-img class="info-page__figure-image" sid="image-2"></simpla-img>' +
                                '<figcaption><simpla-text sid="caption-2"></simpla-text></figcaption>' +
                              '</figure>';
          }
          post.innerHTML += '<h3 class="info-page__subtitle info-page__subtitle--no-top"><simpla-text sid="title"></simpla-text></h3>' +
                            '<simpla-text sid="post"></simpla-text>';

          blogPosts.insertBefore(post, blogPosts.firstChild);
        }
      });

      container.appendChild(blogPosts);
    }
  });

  (function detectEdit() {
    var url = window.location.href,
        newPost;
    if (url.indexOf('#edit') != -1) {
      newPost = document.createElement('simpla-block');
      newPost.sid = 'blog-' + (blogCount + 1);
      newPost.innerHTML = '<figure class="info-page__image info-page__image--half">' +
                            '<simpla-img class="info-page__figure-image" sid="image-1"></simpla-img>' +
                            '<figcaption><simpla-text sid="caption-1"></simpla-text></figcaption>' +
                          '</figure>' +
                          '<figure class="info-page__image info-page__image--half">' +
                            '<simpla-img class="info-page__figure-image" sid="image-2"></simpla-img>' +
                            '<figcaption><simpla-text sid="caption-2"></simpla-text></figcaption>' +
                          '</figure>' +
                          '<h3 class="info-page__subtitle info-page__subtitle--no-top"><simpla-text sid="title"></simpla-text></h3>' +
                          '<simpla-text sid="post"></simpla-text>';

      container.insertBefore(newPost, container.firstChild);
    }
    else {
      setTimeout(detectEdit, 500);
    }
  }());
}());
