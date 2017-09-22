/* global Giphy Utils */

window.onload = function () {
  Giphy.init({
    apiKey: 'dc6zaTOxFJmzC'
  });

  Giphy.getTrending();

  var searchForm = document.getElementById('searchForm');
  searchForm.addEventListener('submit', function (e) {
    e.preventDefault();

    var searchText = document.getElementById('searchInput').value.trim();
    if (searchText.length > 0) {
      document.getElementById('searchInput').blur();
      document.getElementById('searchBtn').blur();
      Giphy.search(searchText);
    }
  });

  var loadMoreBtn = document.getElementById('loadMoreBtn');
  loadMoreBtn.addEventListener('click', function () {
    this.blur();
    // Giphy.loadMore();
  });

  var lightboxClose = document.getElementById('lightboxClose');
  lightboxClose.addEventListener('click', function () {
    Utils.hideElementById('lightboxOverlay');
  });

  var lightboxPrev = document.getElementById('lightboxPrev');
  lightboxPrev.addEventListener('click', function () {
    this.blur();
    Giphy.prevGif();
  });

  var lightboxNext = document.getElementById('lightboxNext');
  lightboxNext.addEventListener('click', function () {
    this.blur();
    Giphy.nextGif();
  });

  // var lightboxLink = document.getElementById('lightboxLink');
  // lightboxLink.addEventListener('click', function () {
  //   this.blur();
  //   // TODO
  // });
};
