/* globals Giphy, Util */

window.onload = function () {
  Giphy.init({
    apiKey: 'dc6zaTOxFJmzC'
  });

  Giphy.getTrending();

  let searchForm = document.getElementById('searchForm');
  searchForm.addEventListener('submit', function (e) {
    e.preventDefault();

    let searchText = document.getElementById('searchInput').value.trim();
    if (searchText.length > 0) {
      document.getElementById('searchInput').blur();
      document.getElementById('searchBtn').blur();
      Giphy.search(searchText);
    }
  });

  let loadMoreBtn = document.getElementById('loadMoreBtn');
  loadMoreBtn.addEventListener('click', function () {
    this.blur();
    // Giphy.loadMore();
  });

  let lightboxClose = document.getElementById('lightboxClose');
  lightboxClose.addEventListener('click', function () {
    Util.hideElementById('lightboxOverlay');
  });

  let lightboxPrev = document.getElementById('lightboxPrev');
  lightboxPrev.addEventListener('click', function () {
    this.blur();
    Giphy.prevGif();
  });

  let lightboxNext = document.getElementById('lightboxNext');
  lightboxNext.addEventListener('click', function () {
    this.blur();
    Giphy.nextGif();
  });
};
