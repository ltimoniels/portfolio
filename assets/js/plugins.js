/* =============================================
   Plugins Bundle
   Contains: Swiper, Slick placeholder, utilities
   ============================================= */

// Note: In production, include these via CDN or npm:
// - Swiper: https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.js
// - Slick: https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js

/* =============================================
   Simple Slider Fallback (if Swiper not loaded)
   ============================================= */
(function() {
  'use strict';

  // Check if Swiper is already loaded
  if (typeof Swiper !== 'undefined') return;

  // Simple fallback slider
  window.SimpleSlider = function(selector, options) {
    var self = this;
    this.container = document.querySelector(selector);
    if (!this.container) return;

    this.slides = this.container.querySelectorAll('.swiper-slide');
    this.currentIndex = 0;
    this.options = options || {};

    this.init = function() {
      // Show first slide
      this.showSlide(0);

      // Auto play
      if (this.options.autoplay && this.options.autoplay.delay) {
        setInterval(function() {
          self.next();
        }, this.options.autoplay.delay);
      }

      // Navigation
      if (this.options.navigation) {
        var nextBtn = document.querySelector(this.options.navigation.nextEl);
        var prevBtn = document.querySelector(this.options.navigation.prevEl);

        if (nextBtn) {
          nextBtn.addEventListener('click', function() {
            self.next();
          });
        }

        if (prevBtn) {
          prevBtn.addEventListener('click', function() {
            self.prev();
          });
        }
      }
    };

    this.showSlide = function(index) {
      this.slides.forEach(function(slide, i) {
        slide.style.display = i === index ? 'block' : 'none';
        slide.style.opacity = i === index ? '1' : '0';
      });
      this.currentIndex = index;
    };

    this.next = function() {
      var nextIndex = (this.currentIndex + 1) % this.slides.length;
      this.showSlide(nextIndex);
    };

    this.prev = function() {
      var prevIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
      this.showSlide(prevIndex);
    };

    this.init();
    return this;
  };

})();

/* =============================================
   Smooth Scroll Polyfill
   ============================================= */
(function() {
  'use strict';

  // Check for native support
  if ('scrollBehavior' in document.documentElement.style) return;

  // Polyfill smooth scroll
  var originalScrollTo = window.scrollTo;

  window.scrollTo = function(options) {
    if (typeof options === 'object' && options.behavior === 'smooth') {
      smoothScrollTo(options.top || 0, options.left || 0);
    } else {
      originalScrollTo.apply(window, arguments);
    }
  };

  function smoothScrollTo(targetY, targetX) {
    var startY = window.pageYOffset;
    var startX = window.pageXOffset;
    var distanceY = targetY - startY;
    var distanceX = targetX - startX;
    var startTime = null;
    var duration = 500;

    function animation(currentTime) {
      if (startTime === null) startTime = currentTime;
      var timeElapsed = currentTime - startTime;
      var progress = Math.min(timeElapsed / duration, 1);

      // Easing function
      var ease = progress < 0.5
        ? 2 * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 2) / 2;

      window.scrollTo(
        startX + distanceX * ease,
        startY + distanceY * ease
      );

      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    }

    requestAnimationFrame(animation);
  }
})();

/* =============================================
   IntersectionObserver Polyfill (basic)
   ============================================= */
(function() {
  'use strict';

  if ('IntersectionObserver' in window) return;

  // Basic fallback - trigger immediately
  window.IntersectionObserver = function(callback, options) {
    this.callback = callback;
    this.options = options || {};
  };

  window.IntersectionObserver.prototype.observe = function(element) {
    // Trigger callback immediately for basic support
    this.callback([{
      target: element,
      isIntersecting: true,
      intersectionRatio: 1
    }]);
  };

  window.IntersectionObserver.prototype.unobserve = function() {};
  window.IntersectionObserver.prototype.disconnect = function() {};
})();

/* =============================================
   RequestAnimationFrame Polyfill
   ============================================= */
(function() {
  'use strict';

  var lastTime = 0;
  var vendors = ['ms', 'moz', 'webkit', 'o'];

  for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] ||
                                  window[vendors[x] + 'CancelRequestAnimationFrame'];
  }

  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function(callback) {
      var currTime = new Date().getTime();
      var timeToCall = Math.max(0, 16 - (currTime - lastTime));
      var id = window.setTimeout(function() {
        callback(currTime + timeToCall);
      }, timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };
  }

  if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = function(id) {
      clearTimeout(id);
    };
  }
})();

/* =============================================
   CustomEvent Polyfill
   ============================================= */
(function() {
  'use strict';

  if (typeof window.CustomEvent === 'function') return;

  function CustomEvent(event, params) {
    params = params || { bubbles: false, cancelable: false, detail: null };
    var evt = document.createEvent('CustomEvent');
    evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
    return evt;
  }

  CustomEvent.prototype = window.Event.prototype;
  window.CustomEvent = CustomEvent;
})();

/* =============================================
   Utility Functions
   ============================================= */
window.utils = {
  // Debounce
  debounce: function(func, wait, immediate) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  },

  // Throttle
  throttle: function(func, limit) {
    var lastFunc;
    var lastRan;
    return function() {
      var context = this;
      var args = arguments;
      if (!lastRan) {
        func.apply(context, args);
        lastRan = Date.now();
      } else {
        clearTimeout(lastFunc);
        lastFunc = setTimeout(function() {
          if ((Date.now() - lastRan) >= limit) {
            func.apply(context, args);
            lastRan = Date.now();
          }
        }, limit - (Date.now() - lastRan));
      }
    };
  },

  // Get scroll position
  getScrollTop: function() {
    return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
  },

  // Check if element is in viewport
  isInViewport: function(element, offset) {
    offset = offset || 0;
    var rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 - offset &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + offset &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  },

  // Get element offset
  getOffset: function(element) {
    var rect = element.getBoundingClientRect();
    return {
      top: rect.top + window.pageYOffset,
      left: rect.left + window.pageXOffset
    };
  },

  // Lerp (linear interpolation)
  lerp: function(start, end, amt) {
    return (1 - amt) * start + amt * end;
  },

  // Clamp value between min and max
  clamp: function(val, min, max) {
    return Math.min(Math.max(val, min), max);
  },

  // Map value from one range to another
  map: function(value, in_min, in_max, out_min, out_max) {
    return (value - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
  },

  // Random number in range
  random: function(min, max) {
    return Math.random() * (max - min) + min;
  },

  // Check if device is touch
  isTouch: function() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  },

  // Check if device is mobile
  isMobile: function() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  },

  // Get CSS variable value
  getCSSVar: function(name) {
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  },

  // Set CSS variable
  setCSSVar: function(name, value) {
    document.documentElement.style.setProperty(name, value);
  }
};

/* =============================================
   DOM Ready Helper
   ============================================= */
window.domReady = function(callback) {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', callback);
  } else {
    callback();
  }
};

console.log('Plugins loaded successfully');
