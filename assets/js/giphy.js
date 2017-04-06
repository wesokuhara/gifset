/* globals Util */

let Giphy = (function () {
  let config = {};
  let data = {};

  /**
   * Initialize with options
   */
  function init (options) {
    console.log('Giphy API initialized!');
    options = options || {};
    config.apiKey = options.apiKey;
  }

  /**
   * Reset data cache
   */
  function resetData () {
    data = {
      gifs: [],
      offset: 0,
      imageCount: 0,
      lightboxIndex: 0,
      recentSearch: ''
    };
  }

  /**
   * Build and show the lightbox
   */
  function buildLightbox () {
    let gif = data.gifs[data.lightboxIndex];

    // Hide the prev button if this is the first GIF
    if (data.lightboxIndex === 0) {
      Util.hideElementById('lightboxPrev');
    } else {
      Util.showElementById('lightboxPrev');
    }

    // Hide the next button if this is the last GIF
    if (data.lightboxIndex === data.gifs.length - 1) {
      Util.hideElementById('lightboxNext');
    } else {
      Util.showElementById('lightboxNext');
    }

    let img = document.createElement('img');
    img.src = gif.images.original.url;
    img.className = 'lightbox-img';

    let fragment = document.createDocumentFragment();
    fragment.appendChild(img);

    Util.replaceElementContentsById('lightboxContent', fragment);
    Util.showElementById('lightboxOverlay');
  }

  /**
   * Trigger the lightbox when a GIF thumbnail is clicked
   */
  function focusLightbox () {
    data.lightboxIndex = parseInt(this.getAttribute('data-img-index'));
    buildLightbox();
  }

  /**
   * Show the next GIF in the lightbox
   */
  function prevGif () {
    data.lightboxIndex--;
    buildLightbox();
  }

  /**
   * Show the previous GIF in the lightbox
   */
  function nextGif () {
    data.lightboxIndex++;
    buildLightbox();
  }

  /**
   * Display the set of GIFs
   */
  function buildGallery (gifs) {
    data.gifs = data.gifs.concat(gifs);

    let fragment = document.createDocumentFragment();
    for (let i = 0; i < gifs.length; i++) {
      let div = document.createElement('div');
      div.className = 'tile';

      let img = document.createElement('img');
      img.src = gifs[i].images.fixed_width.url;
      img.className = 'thumbnail';
      img.setAttribute('data-img-index', data.imageCount++);
      img.addEventListener('click', focusLightbox);

      div.appendChild(img);
      fragment.appendChild(div);
    }

    Util.appendElementById('gallery', fragment);
    Util.showElementById('gallery');
  }

  /**
   * Search for GIFs
   */
  function search (searchText) {
    resetData();
    data.recentSearch = searchText;
    Util.clearElementById('gallery');
    Util.hideElementById('loadMore');

    let url = Util.buildUrl('https://api.giphy.com/v1/gifs/search', {
      api_key: config.apiKey,
      q: searchText,
      limit: 16,
      offset: 0,
      fmt: 'json'
    });

    Util.fetch('GET', url)
      .then(function (res) {
        buildGallery(res.data);
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  /**
   * Get trending GIFs
   */
  function getTrending () {
    resetData();

    let url = Util.buildUrl('https://api.giphy.com/v1/gifs/trending', {
      api_key: config.apiKey,
      limit: 16,
      fmt: 'json'
    });

    Util.fetch('GET', url)
      .then(function (res) {
        buildGallery(res.data);
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  return {
    init,
    prevGif,
    nextGif,
    search,
    getTrending
  };
})();
