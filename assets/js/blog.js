(function() {
  var container = document.querySelector('.js-blog'),
      simpla = Simpla('BkZeRJtd'),
      blogCount;

  simpla.get('blog').then(function(postIDs) {
    var blogPosts = document.createDocumentFragment();
    blogCount = postIDs.length || 0;
    var countDown = blogCount;
    if (postIDs.constructor === Array) {
      (function render(index) {
        var post,
            postChecker = true;

        simpla.get('blog.' + postIDs[index] + '.post').then(function(postText) {
          if (postText.text == '<p><br></p>') {
            postChecker = false;
          }
        }).then(function() {
          if (index >= blogCount - 5 && postChecker) {
            post = document.createElement('simpla-block');

            post.sid = postIDs[index];
            post.innerHTML += '<figure class="info-page__image info-page__image--half">' +
                                '<simpla-img class="info-page__figure-image" sid="image-1"></simpla-img>' +
                                '<figcaption><simpla-text sid="caption-1"></simpla-text></figcaption>' +
                              '</figure>';
            if (postIDs[index]['image-2']) {
              post.innerHTML += '<figure class="info-page__image info-page__image--half">' +
                                  '<simpla-img class="info-page__figure-image" sid="image-2"></simpla-img>' +
                                  '<figcaption><simpla-text sid="caption-2"></simpla-text></figcaption>' +
                                '</figure>';
            }
            post.innerHTML += '<h3 class="info-page__subtitle info-page__subtitle--no-top"><simpla-text sid="title"></simpla-text></h3>' +
                              '<simpla-text sid="post"></simpla-text>';

            blogPosts.insertBefore(post, blogPosts.firstChild);
          }
        }).then(function() {
          countDown--;
          if (countDown == 0) {
            container.appendChild(blogPosts);
          }
          else {
            render(index + 1);
          }
        });
      }(0));
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
