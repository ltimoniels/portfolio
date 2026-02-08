/* =============================================
   Custom JavaScript
   ============================================= */

(function($) {
  'use strict';

  // Document Ready
  $(document).ready(function() {
    initLoader();
    initNavigation();
    initHeroSlider();
    initCardSlider();
    initAccordion();
    initScrollAnimations();
    initParallax();
    initSmoothScroll();
    initCustomCursor();
    initHeaderScroll();
    initSolutionCards();
    initTestimonialSlider();
    initProcessSteps();
    initLightbox();
    initHeroParallax();
    checkCustomizeEnabled();
  });

  // Window Load
  $(window).on('load', function() {
    hideLoader();
    // Reinitialize parallax after everything loads (including template engine)
    setTimeout(initHeroParallax, 100);
  });

  /* =============================================
     Page Loader
     ============================================= */
  function initLoader() {
    // Loader is shown by default
  }

  function hideLoader() {
    setTimeout(function() {
      $('.dsn-loader').addClass('loaded');
      $('body').addClass('page-loaded');

      // Trigger entrance animations
      triggerEntranceAnimations();
    }, 500);
  }

  /* =============================================
     Navigation
     ============================================= */
  function initNavigation() {
    var $menuToggle = $('.menu-toggle, .nav-toggle');
    var $mobileMenu = $('.mobile-menu, .nav-menu');
    var $body = $('body');

    $menuToggle.on('click', function() {
      $(this).toggleClass('is-active active');
      $mobileMenu.toggleClass('open');
      $body.toggleClass('menu-open');

      // Animate hamburger
      $('.hamburger').toggleClass('active');
    });

    // Close menu on link click
    $mobileMenu.find('a').on('click', function() {
      $menuToggle.removeClass('is-active active');
      $mobileMenu.removeClass('open');
      $body.removeClass('menu-open');
      $('.hamburger').removeClass('active');
    });

    // Close menu on escape key
    $(document).on('keyup', function(e) {
      if (e.key === 'Escape' && $mobileMenu.hasClass('open')) {
        $menuToggle.removeClass('is-active active');
        $mobileMenu.removeClass('open');
        $body.removeClass('menu-open');
        $('.hamburger').removeClass('active');
      }
    });

    // Submenu toggle for mobile
    $('.has-submenu > .submenu-toggle').on('click', function(e) {
      e.preventDefault();
      $(this).parent().toggleClass('open');
    });
  }

  /* =============================================
     Hero Slider
     ============================================= */
  function initHeroSlider() {
    if ($('.hero-slider').length && typeof Swiper !== 'undefined') {
      var heroSlider = new Swiper('.hero-slider', {
        slidesPerView: 1,
        spaceBetween: 0,
        loop: true,
        speed: 1000,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
        effect: 'fade',
        fadeEffect: {
          crossFade: true
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        navigation: {
          nextEl: '.slider-nav-btn.next, .swiper-button-next',
          prevEl: '.slider-nav-btn.prev, .swiper-button-prev',
        },
        on: {
          init: function() {
            updateSliderProgress(this);
          },
          slideChange: function() {
            updateSliderProgress(this);
            animateSlideContent(this);
          }
        }
      });
    }
  }

  function updateSliderProgress(slider) {
    var $progressBar = $('.slider-progress-bar');
    if ($progressBar.length) {
      $progressBar.css('width', '0%');
      setTimeout(function() {
        $progressBar.css('width', '100%');
      }, 100);
    }
  }

  function animateSlideContent(slider) {
    var $activeSlide = $(slider.slides[slider.activeIndex]);
    var $content = $activeSlide.find('.hero-content');

    // Reset and animate content
    $content.find('.sub-title, .title, .description, .btn').css({
      opacity: 0,
      transform: 'translateY(30px)'
    });

    setTimeout(function() {
      $content.find('.sub-title').css({
        opacity: 1,
        transform: 'translateY(0)',
        transition: 'all 0.6s ease'
      });
    }, 200);

    setTimeout(function() {
      $content.find('.title').css({
        opacity: 1,
        transform: 'translateY(0)',
        transition: 'all 0.6s ease'
      });
    }, 400);

    setTimeout(function() {
      $content.find('.description').css({
        opacity: 1,
        transform: 'translateY(0)',
        transition: 'all 0.6s ease'
      });
    }, 600);

    setTimeout(function() {
      $content.find('.btn').css({
        opacity: 1,
        transform: 'translateY(0)',
        transition: 'all 0.6s ease'
      });
    }, 800);
  }

  /* =============================================
     Card Slider
     ============================================= */
  function initCardSlider() {
    if ($('.card-slider').length && $.fn.slick) {
      $('.card-slider').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 4000,
        pauseOnHover: true,
        adaptiveHeight: false,
        responsive: [
          {
            breakpoint: 991,
            settings: {
              slidesToShow: 2,
              arrows: false
            }
          },
          {
            breakpoint: 575,
            settings: {
              slidesToShow: 1,
              arrows: false
            }
          }
        ]
      });
    }
  }

  /* =============================================
     Accordion
     ============================================= */
  function initAccordion() {
    // DSN Accordion
    $('.dsn-accordion-header').on('click', function() {
      var $item = $(this).parent('.dsn-accordion-item');
      var $accordion = $item.parent('.dsn-accordion');

      // Check if accordion allows multiple open
      if (!$accordion.hasClass('multiple')) {
        $accordion.find('.dsn-accordion-item').not($item).removeClass('active');
      }

      $item.toggleClass('active');
    });

    // Simple Accordion
    $('.accordion-header').on('click', function() {
      var $item = $(this).parent('.accordion-item');
      var $accordion = $item.parent('.accordion');

      if (!$accordion.hasClass('multiple')) {
        $accordion.find('.accordion-item').not($item).removeClass('active');
      }

      $item.toggleClass('active');
    });
  }

  /* =============================================
     Scroll Animations
     ============================================= */
  function initScrollAnimations() {
    var animatedElements = document.querySelectorAll('.mgc-up, .mgc-left, .mgc-right, .mgc-scale, [data-animate]');

    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            var delay = entry.target.getAttribute('data-delay') || 0;
            setTimeout(function() {
              entry.target.classList.add('animated');
            }, parseInt(delay));
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      });

      animatedElements.forEach(function(el) {
        observer.observe(el);
      });
    } else {
      // Fallback for older browsers
      animatedElements.forEach(function(el) {
        el.classList.add('animated');
      });
    }
  }

  function triggerEntranceAnimations() {
    // Animate elements visible on page load
    $('.mgc-up, .mgc-left, .mgc-right, .mgc-scale').each(function() {
      var $el = $(this);
      var rect = this.getBoundingClientRect();

      if (rect.top < window.innerHeight) {
        var delay = $el.attr('data-delay') || 0;
        setTimeout(function() {
          $el.addClass('animated');
        }, parseInt(delay));
      }
    });
  }

  /* =============================================
     Parallax Effects
     ============================================= */
  function initParallax() {
    var $parallaxElements = $('.parallax-bg, .bg-image[data-parallax]');

    if ($parallaxElements.length) {
      $(window).on('scroll', function() {
        var scrollTop = $(window).scrollTop();

        $parallaxElements.each(function() {
          var $el = $(this);
          var $parent = $el.parent();
          var parentTop = $parent.offset().top;
          var parentHeight = $parent.outerHeight();

          if (scrollTop + window.innerHeight > parentTop && scrollTop < parentTop + parentHeight) {
            var yPos = (scrollTop - parentTop) * 0.3;
            $el.css('transform', 'translate3d(0, ' + yPos + 'px, 0)');
          }
        });
      });
    }
  }

  /* =============================================
     Smooth Scroll
     ============================================= */
  function initSmoothScroll() {
    // Smooth scroll for anchor links
    $('a[href^="#"]:not([href="#"])').on('click', function(e) {
      var target = $(this.hash);

      if (target.length) {
        e.preventDefault();

        $('html, body').animate({
          scrollTop: target.offset().top - 100
        }, 800, 'easeInOutQuart');
      }
    });
  }

  // Easing function
  $.easing.easeInOutQuart = function(x, t, b, c, d) {
    if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
    return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
  };

  /* =============================================
     Custom Cursor
     ============================================= */
  function initCustomCursor() {
    var $cursor = $('.cursor');
    var $cursorInner = $('.cursor-inner');

    if (!$cursor.length || !$cursorInner.length) return;

    // Only enable custom cursor on desktop
    if (window.innerWidth < 992) {
      $cursor.hide();
      $cursorInner.hide();
      return;
    }

    $(document).on('mousemove', function(e) {
      $cursor.css({
        left: e.clientX,
        top: e.clientY
      });

      $cursorInner.css({
        left: e.clientX,
        top: e.clientY
      });
    });

    // Hover effects
    $('a, button, .btn, .accordion-header, .nav-toggle, [data-cursor="hover"]').on('mouseenter', function() {
      $cursor.addClass('cursor-hover');
    }).on('mouseleave', function() {
      $cursor.removeClass('cursor-hover');
    });
  }

  /* =============================================
     Header Scroll Effect
     ============================================= */
  function initHeaderScroll() {
    var $header = $('header');
    var scrollThreshold = 100;

    $(window).on('scroll', function() {
      if ($(window).scrollTop() > scrollThreshold) {
        $header.addClass('dsn-header-animation');
      } else {
        $header.removeClass('dsn-header-animation');
      }
    });
  }

  /* =============================================
     Solution Cards
     ============================================= */
  function initSolutionCards() {
    $('.solution-toggle').on('click', function() {
      var $card = $(this).closest('.solution-card');
      $card.toggleClass('expanded');

      var text = $card.hasClass('expanded') ? 'Show Less' : 'Learn More';
      $(this).text(text);
    });
  }

  /* =============================================
     Testimonial Slider
     ============================================= */
  function initTestimonialSlider() {
    if ($('.testimonial-slider').length && $.fn.slick) {
      $('.testimonial-slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 6000,
        pauseOnHover: true,
        fade: true,
        cssEase: 'linear'
      });
    }
  }

  /* =============================================
     Process Steps
     ============================================= */
  function initProcessSteps() {
    if ($('.process-accordion').length) {
      // Make first item active by default
      $('.process-accordion .dsn-accordion-item:first-child').addClass('active');
    }

    // Interactive process steps
    $('.process-step').on('mouseenter', function() {
      $(this).addClass('active');
    }).on('mouseleave', function() {
      $(this).removeClass('active');
    });
  }

  /* =============================================
     Hero Parallax Effect
     ============================================= */
  var parallaxInitialized = false;

  function initHeroParallax() {
    // Parallax speed (lower = subtler effect, reduced on mobile for smoother performance)
    var parallaxSpeed = window.innerWidth < 992 ? 0.3 : 0.5;

    function updateParallax() {
      var scrollTop = $(window).scrollTop();

      // Re-query elements each time (template engine may recreate them)
      var $heroSlideBg = $('.hero-slide-bg');
      var $heroSection = $('.hero-section');
      var $pageHeaderBg = $('.page-header-bg');
      var $pageHeader = $('.page-header');

      // Hero slider parallax (index page) - use background-position to avoid Swiper conflicts
      if ($heroSlideBg.length && $heroSection.length) {
        var heroHeight = $heroSection.outerHeight();
        if (scrollTop <= heroHeight) {
          // Positive value makes background move down as you scroll (parallax effect)
          var yPos = scrollTop * parallaxSpeed;
          $heroSlideBg.css('background-position', 'center calc(50% + ' + yPos + 'px)');
        }
      }

      // Page header parallax (internal pages) - use transform
      if ($pageHeaderBg.length && $pageHeader.length) {
        var headerHeight = $pageHeader.outerHeight();
        if (scrollTop <= headerHeight) {
          var yPos = scrollTop * parallaxSpeed;
          $pageHeaderBg.css('transform', 'translate3d(0, ' + yPos + 'px, 0)');
        }
      }
    }

    // Only bind scroll event once
    if (!parallaxInitialized) {
      parallaxInitialized = true;

      // Use requestAnimationFrame for smooth performance
      var ticking = false;
      $(window).on('scroll.parallax', function() {
        if (!ticking) {
          window.requestAnimationFrame(function() {
            updateParallax();
            ticking = false;
          });
          ticking = true;
        }
      });
    }

    // Initial call
    updateParallax();
  }

  /* =============================================
     Lightbox
     ============================================= */
  function initLightbox() {
    // Create lightbox elements if they don't exist
    if (!$('.lightbox-overlay').length) {
      $('body').append(
        '<div class="lightbox-overlay">' +
        '<button class="lightbox-close"><i class="fas fa-times"></i></button>' +
        '<div class="lightbox-content"><img src="" alt="Lightbox Image"></div>' +
        '</div>'
      );
    }

    var $overlay = $('.lightbox-overlay');
    var $lightboxImg = $overlay.find('.lightbox-content img');

    // Click handler for gallery items
    $('.gallery-item img').on('click', function() {
      var imgSrc = $(this).attr('src');
      var imgAlt = $(this).attr('alt') || 'Gallery Image';

      $lightboxImg.attr('src', imgSrc).attr('alt', imgAlt);
      $overlay.addClass('active');
      $('body').addClass('lightbox-open');
    });

    // Close lightbox on overlay click
    $overlay.on('click', function(e) {
      if ($(e.target).hasClass('lightbox-overlay') || $(e.target).hasClass('lightbox-close') || $(e.target).parent().hasClass('lightbox-close')) {
        closeLightbox();
      }
    });

    // Close lightbox on escape key
    $(document).on('keyup', function(e) {
      if (e.key === 'Escape' && $overlay.hasClass('active')) {
        closeLightbox();
      }
    });

    function closeLightbox() {
      $overlay.removeClass('active');
      $('body').removeClass('lightbox-open');
    }
  }

  /* =============================================
     Form Validation
     ============================================= */
  window.validateForm = function(form) {
    var isValid = true;
    var $form = $(form);

    $form.find('[required]').each(function() {
      var $field = $(this);
      var value = $field.val().trim();

      if (!value) {
        isValid = false;
        $field.addClass('error');
      } else {
        $field.removeClass('error');
      }

      // Email validation
      if ($field.attr('type') === 'email' && value) {
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          isValid = false;
          $field.addClass('error');
        }
      }
    });

    return isValid;
  };

  /* =============================================
     Utility Functions
     ============================================= */

  // Debounce function
  function debounce(func, wait) {
    var timeout;
    return function() {
      var context = this;
      var args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(function() {
        func.apply(context, args);
      }, wait);
    };
  }

  // Throttle function
  function throttle(func, limit) {
    var inThrottle;
    return function() {
      var context = this;
      var args = arguments;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(function() {
          inThrottle = false;
        }, limit);
      }
    };
  }

  // Check if element is in viewport
  function isInViewport(element) {
    var rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  // Resize handler with debounce
  $(window).on('resize', debounce(function() {
    // Reinitialize components that need resizing
    if (window.innerWidth < 992) {
      $('.cursor, .cursor-inner').hide();
    } else {
      $('.cursor, .cursor-inner').show();
    }
  }, 250));

  /* =============================================
     Customize Mode Check
     ============================================= */
  function checkCustomizeEnabled() {
    var $customizeBanner = $('.customize-banner');

    // Show banner by default (for new users who fork the repo)
    // Check if customization.disable file exists to change behavior
    fetch('customization.disable')
      .then(function(response) {
        if (response.ok) {
          // File exists - change to "Rebrand Myself" linking to SaaS
          $customizeBanner
            .attr('href', 'https://rebrandmyself.net')
            .attr('target', '_blank')
            .html('<i class="fas fa-rocket"></i> Rebrand Myself');
        }
        $customizeBanner.show();
      })
      .catch(function() {
        // Error fetching (file doesn't exist) - show the customize banner
        $customizeBanner.show();
      });
  }

  // Expose for external use
  window.checkCustomizeEnabled = checkCustomizeEnabled;

})(jQuery);
