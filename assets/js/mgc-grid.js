/* =============================================
   MGC Grid - Scroll Animations & Parallax
   ============================================= */

(function() {
  'use strict';

  // MGC Grid Configuration
  var MGC = {
    config: {
      threshold: 0.15,
      rootMargin: '0px 0px -100px 0px',
      animationDuration: 800,
      staggerDelay: 100
    },

    init: function() {
      this.initScrollAnimations();
      this.initParallaxScroll();
      this.initImageReveal();
      this.initCounterAnimation();
      this.initProgressBars();
    },

    // Scroll-triggered animations
    initScrollAnimations: function() {
      var self = this;
      var elements = document.querySelectorAll('[data-mgc], .mgc-up, .mgc-left, .mgc-right, .mgc-scale, .mgc-fade');

      if (!elements.length) return;

      if ('IntersectionObserver' in window) {
        var observer = new IntersectionObserver(function(entries) {
          entries.forEach(function(entry) {
            if (entry.isIntersecting) {
              self.animateElement(entry.target);
              observer.unobserve(entry.target);
            }
          });
        }, {
          threshold: self.config.threshold,
          rootMargin: self.config.rootMargin
        });

        elements.forEach(function(el) {
          // Only observe elements that haven't been animated yet
          if (!el.classList.contains('animated')) {
            observer.observe(el);
          }
        });
      } else {
        // Fallback for older browsers
        elements.forEach(function(el) {
          el.classList.add('animated');
        });
      }
    },

    animateElement: function(element) {
      var delay = parseInt(element.getAttribute('data-delay')) || 0;

      setTimeout(function() {
        element.classList.add('animated');
        element.style.opacity = '1';
        element.style.transform = 'translate(0, 0) scale(1)';
      }, delay);
    },

    // Parallax scrolling effect
    initParallaxScroll: function() {
      var parallaxElements = document.querySelectorAll('[data-parallax], .parallax-element');

      if (!parallaxElements.length) return;

      var self = this;

      function updateParallax() {
        var scrollTop = window.pageYOffset;

        parallaxElements.forEach(function(el) {
          var speed = parseFloat(el.getAttribute('data-speed')) || 0.5;
          var rect = el.getBoundingClientRect();
          var elementTop = rect.top + scrollTop;
          var windowHeight = window.innerHeight;

          if (scrollTop + windowHeight > elementTop && scrollTop < elementTop + rect.height) {
            var yPos = (scrollTop - elementTop) * speed;
            el.style.transform = 'translate3d(0, ' + yPos + 'px, 0)';
          }
        });
      }

      // Throttled scroll handler
      var ticking = false;
      window.addEventListener('scroll', function() {
        if (!ticking) {
          window.requestAnimationFrame(function() {
            updateParallax();
            ticking = false;
          });
          ticking = true;
        }
      });

      // Initial call
      updateParallax();
    },

    // Image reveal animation
    initImageReveal: function() {
      var images = document.querySelectorAll('[data-reveal], .image-reveal');

      if (!images.length) return;

      var self = this;

      if ('IntersectionObserver' in window) {
        var observer = new IntersectionObserver(function(entries) {
          entries.forEach(function(entry) {
            if (entry.isIntersecting) {
              self.revealImage(entry.target);
              observer.unobserve(entry.target);
            }
          });
        }, {
          threshold: 0.3
        });

        images.forEach(function(img) {
          observer.observe(img);
        });
      }
    },

    revealImage: function(element) {
      var direction = element.getAttribute('data-reveal-direction') || 'left';
      var overlay = document.createElement('div');

      overlay.style.cssText = 'position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: #000; z-index: 10;';

      element.style.position = 'relative';
      element.style.overflow = 'hidden';
      element.appendChild(overlay);

      // Animate overlay
      setTimeout(function() {
        overlay.style.transition = 'transform 0.8s cubic-bezier(0.77, 0, 0.175, 1)';

        switch(direction) {
          case 'left':
            overlay.style.transform = 'translateX(-100%)';
            break;
          case 'right':
            overlay.style.transform = 'translateX(100%)';
            break;
          case 'up':
            overlay.style.transform = 'translateY(-100%)';
            break;
          case 'down':
            overlay.style.transform = 'translateY(100%)';
            break;
        }

        // Remove overlay after animation
        setTimeout(function() {
          overlay.remove();
        }, 800);
      }, 100);
    },

    // Counter animation
    initCounterAnimation: function() {
      var counters = document.querySelectorAll('[data-counter], .counter');

      if (!counters.length) return;

      var self = this;

      if ('IntersectionObserver' in window) {
        var observer = new IntersectionObserver(function(entries) {
          entries.forEach(function(entry) {
            if (entry.isIntersecting) {
              self.animateCounter(entry.target);
              observer.unobserve(entry.target);
            }
          });
        }, {
          threshold: 0.5
        });

        counters.forEach(function(counter) {
          observer.observe(counter);
        });
      }
    },

    animateCounter: function(element) {
      var target = parseInt(element.getAttribute('data-target') || element.textContent);
      var duration = parseInt(element.getAttribute('data-duration')) || 2000;
      var start = 0;
      var startTime = null;

      function animate(currentTime) {
        if (!startTime) startTime = currentTime;
        var progress = Math.min((currentTime - startTime) / duration, 1);

        // Easing function (ease-out-quart)
        var easeProgress = 1 - Math.pow(1 - progress, 4);
        var current = Math.floor(easeProgress * target);

        element.textContent = current.toLocaleString();

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          element.textContent = target.toLocaleString();
        }
      }

      requestAnimationFrame(animate);
    },

    // Progress bar animation
    initProgressBars: function() {
      var progressBars = document.querySelectorAll('.progress-bar-fill');

      if (!progressBars.length) return;

      var self = this;

      if ('IntersectionObserver' in window) {
        var observer = new IntersectionObserver(function(entries) {
          entries.forEach(function(entry) {
            if (entry.isIntersecting) {
              var target = entry.target.getAttribute('data-progress') || '100';
              entry.target.style.width = target + '%';
              observer.unobserve(entry.target);
            }
          });
        }, {
          threshold: 0.5
        });

        progressBars.forEach(function(bar) {
          observer.observe(bar);
        });
      }
    },

    // Reinitialize animations for dynamically added elements
    refresh: function() {
      this.initScrollAnimations();
    }
  };

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      MGC.init();
    });
  } else {
    MGC.init();
  }

  // Expose MGC globally
  window.MGC = MGC;

})();
