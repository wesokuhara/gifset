var Utils = (function () {
  function isMobileDevice () {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }

  function extend (obj, src) {
    for (var key in src) {
      if (src.hasOwnProperty(key)) {
        obj[key] = src[key];
      }
    }
    return obj;
  }

  function buildUrl (base, params) {
    var query = '';
    for (var prop in params) {
      query += '&' + encodeURIComponent(prop) + '=' + encodeURIComponent(params[prop]);
    }
    return base + '?' + query;
  }

  function fetch (method, url, data) {
    data = data || '';
    return new Promise(function (resolve, reject) {
      var req = new XMLHttpRequest();
      req.open(method, url);

      req.onload = function () {
        if (req.status === 200) {
          resolve(JSON.parse(req.response));
        } else {
          reject(Error(req.statusText));
        }
      };

      req.onerror = function () {
        reject(Error('There was an error processing your request'));
      };

      req.send(data);
    });
  }

  function clearElementById (id) {
    var el = document.getElementById(id);
    while (el.hasChildNodes()) {
      el.removeChild(el.firstChild);
    }
  }

  function appendElementById (id, fragment) {
    document.getElementById(id).appendChild(fragment);
  }

  function replaceElementContentsById (id, fragment) {
    clearElementById(id);
    appendElementById(id, fragment);
  }


  function hideElementById (id) {
    document.getElementById(id).style.display = 'none';
  }

  function showElementById (id) {
    document.getElementById(id).style.display = 'block';
  }

  return {
    isMobileDevice,
    extend,
    buildUrl,
    fetch,
    clearElementById,
    appendElementById,
    replaceElementContentsById,
    hideElementById,
    showElementById
  };
})();
