var ZOOM = (function() {
  var DEFAULTS = {
    zoomFactor: 2,
    selector: '.img-zoom',
    duration: 500
  };
  var state = {};
  var OPTIONS;
  
  // Init array of dom elements, and add zoom event listener to each element
  function init(options) {
    OPTIONS = Object.assign({}, DEFAULTS, options);
    var selector = OPTIONS.selector;
    
    if (selector instanceof NodeList || selector instanceof HTMLElement) {
      state.domArray = selector.length > 1 ? [].slice.call(selector, 0) : [selector];
    } else if (typeof selector === 'string') {
      state.domArray = [].slice.call(document.querySelectorAll(selector), 0);
    } else if (typeof selector === 'undefined') {
      state.domArray = [].slice.call(document.querySelectorAll(OPTIONS.selector), 0);
    } else {
      console.warn('invalid selector provided');
    }
    
    addListeners();
  }
  
  function addListeners() {
    state.domArray.forEach(function(el, index) {
      el.addEventListener('mousemove', zoomEvent, false);
    });
  }
  
  function removeListeners() {
    state.domArray.forEach(function(el, index) {
      el.removeEventListener('mousemove', zoomEvent, false);
    });
  }
  
  function zoomEvent(event) {
    var target = event.currentTarget;
    var offsetX = event.offsetX ? event.offsetX : event.touches[0].pageX;
    var offsetY = event.offsetY ? event.offsetY : event.touches[0].pageY;
    var x = offsetX/target.offsetWidth * 100;
    var y = offsetY/target.offsetHeight * 100;
    var zoomFactor = OPTIONS.zoomFactor;
    var img = target.querySelector('img');
    
    if (!target.style.backgroundImage) {
      target.style.background = 'url(' + target.children[0].src + ')';
      target.style.backgroundSize = target.children[0].width * zoomFactor + 'px';
    }

    img.style.transitionDuration = OPTIONS.duration + 'ms'; 
    target.style.backgroundPosition = x + '% ' + y + '%';
  }
  
  function setZoom(zoom) {
    OPTIONS.zoomFactor = zoom;
  }
  
  function disable() {
    removeListeners();
  }
  
  function enable() {
    addListeners();
  }
  
  return {
    init: init,
    setZoom: setZoom,
    disable: disable,
    enable: enable
  };
})();