let Util = (function () {
  /**
   * Determine if the device is mobile
   */
  function isMobileDevice () {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }

  /**
   * Helper function to extend an object
   */
  function extend (obj, src) {
    for (let key in src) {
      if (src.hasOwnProperty(key)) {
        obj[key] = src[key];
      }
    }
    return obj;
  }

  /**
   * Build a URL given a base endpoint and parameters
   */
  function buildUrl (base, params) {
    let query = '';
    for (let prop in params) {
      query += '&' + encodeURIComponent(prop) + '=' + encodeURIComponent(params[prop]);
    }
    return base + '?' + query;
  }

  /**
   * Fetch a resource given a base URL and options
   */
  function fetch (method, url, data = '') {
    return new Promise(function (resolve, reject) {
      let req = new XMLHttpRequest();
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

  /**
   * Clear all contents of an element given its ID
   */
  function clearElementById (id) {
    let el = document.getElementById(id);
    while (el.hasChildNodes()) {
      el.removeChild(el.firstChild);
    }
  }

  /**
   * Append a fragment to an element given its ID
   */
  function appendElementById (id, fragment) {
    document.getElementById(id).appendChild(fragment);
  }

  /**
   * Replace the contents of an element with the fragment
   */
  function replaceElementContentsById (id, fragment) {
    clearElementById(id);
    appendElementById(id, fragment);
  }

  /**
   * Hide an element given its ID
   */
  function hideElementById (id) {
    document.getElementById(id).style.display = 'none';
  }

  /**
   * Show an element given its ID
   */
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
