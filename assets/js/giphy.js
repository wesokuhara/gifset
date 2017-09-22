/* global Utils */

var Giphy = (function() {
  var config = {};
  var data = {};

  function init(options) {
    config = options || {};
  }

  function resetData() {
    data = {
      gifs: [],
      offset: 0,
      imageCount: 0,
      lightboxIndex: 0,
      recentSearch: ''
    };
  }

  function buildLightbox() {
    var gif = data.gifs[data.lightboxIndex];

    // Hide the prev button if this is the first GIF
    if (data.lightboxIndex === 0) {
      Utils.hideElementById('lightboxPrev');
    } else {
      Utils.showElementById('lightboxPrev');
    }

    // Hide the next button if this is the last GIF
    if (data.lightboxIndex === data.gifs.length - 1) {
      Utils.hideElementById('lightboxNext');
    } else {
      Utils.showElementById('lightboxNext');
    }

    var img = document.createElement('img');
    img.src = gif.images.original.url;
    img.className = 'lightbox-img';

    var description = document.createElement('h2');
    var externalLink = document.createElement('a');
    externalLink.className = 'fa fa-external-link lightbox-link';
    externalLink.href = gif.bitly_url;
    description.appendChild(externalLink);

    var fragment = document.createDocumentFragment();
    fragment.appendChild(img);
    fragment.appendChild(description);

    Utils.replaceElementContentsById('lightboxContent', fragment);
    Utils.showElementById('lightboxOverlay');
  }

  function focusLightbox() {
    data.lightboxIndex = parseInt(this.getAttribute('data-img-index'));
    buildLightbox();
  }

  function prevGif() {
    data.lightboxIndex--;
    buildLightbox();
  }

  function nextGif() {
    data.lightboxIndex++;
    buildLightbox();
  }

  function buildGallery(gifs) {
    data.gifs = data.gifs.concat(gifs);
    data.offset += gifs.length;

    var fragment = document.createDocumentFragment();
    for (var i = 0; i < gifs.length; i++) {
      var div = document.createElement('div');
      div.className = 'tile';

      var img = document.createElement('img');
      img.src = gifs[i].images.fixed_width.url;
      img.className = 'gif';
      img.setAttribute('data-img-index', data.imageCount++);
      img.addEventListener('click', focusLightbox);

      div.appendChild(img);
      fragment.appendChild(div);
    }

    Utils.appendElementById('gallery', fragment);
  }

  function search(searchText) {
    resetData();
    data.recentSearch = searchText;
    Utils.clearElementById('gallery');
    Utils.hideElementById('loadMoreBtn');

    var url = Utils.buildUrl('https://api.giphy.com/v1/gifs/search', {
      api_key: config.apiKey,
      q: searchText,
      limit: config.searchLimit,
      offset: data.offset,
      fmt: 'json'
    });

    Utils.fetch('GET', url)
      .then(function(res) {
        buildGallery(res.data);
        if (res.data.length === config.searchLimit) {
          Utils.showElementById('loadMoreBtn');
        }
        console.log(data);
      })
      .catch(console.log);
  }

  function getTrending() {
    resetData();

    var url = Utils.buildUrl('https://api.giphy.com/v1/gifs/trending', {
      api_key: config.apiKey,
      limit: 25,
      fmt: 'json'
    });

    Utils.fetch('GET', url)
      .then(function(res) {
        buildGallery(res.data);
      })
      .catch(console.log);
  }

  function loadMore() {
    var url = Utils.buildUrl('https://api.giphy.com/v1/gifs/search', {
      api_key: config.apiKey,
      q: data.recentSearch,
      limit: config.searchLimit,
      offset: data.offset,
      fmt: 'json'
    });

    Utils.fetch('GET', url)
      .then(function(res) {
        buildGallery(res.data);
        if (res.data.length === config.searchLimit) {
          Utils.showElementById('loadMoreBtn');
        }
      })
      .catch(console.log);
  }

  return {
    init,
    prevGif,
    nextGif,
    search,
    getTrending,
    loadMore
  };
})();
