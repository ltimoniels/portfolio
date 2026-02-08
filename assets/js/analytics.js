/* =============================================
   RebrandMyself Analytics
   Lightweight, privacy-friendly site analytics
   No cookies, no fingerprinting, respects DNT
   ============================================= */
(function() {
  'use strict';

  // Respect Do Not Track
  if (navigator.doNotTrack === '1' || window.doNotTrack === '1') return;

  var ENDPOINT = 'https://rebrandmyself.net/api/t';
  var origin = window.location.origin;
  var page = window.location.pathname;
  var referrer = document.referrer;
  var queue = [];
  var flushTimer = null;

  function getDevice() {
    var w = window.innerWidth;
    if (w < 768) return 'mobile';
    if (w < 1024) return 'tablet';
    return 'desktop';
  }

  function getSectionName(el) {
    if (el.getAttribute('data-section')) return el.getAttribute('data-section');
    if (el.id) return el.id;
    // Try to find a heading inside
    var heading = el.querySelector('h1, h2, .sub-heading');
    if (heading) {
      var text = heading.textContent.trim();
      if (text.length > 0 && text.length < 60) return text;
    }
    // Fall back to class-based name
    if (el.classList.contains('hero-section')) return 'Hero';
    if (el.classList.contains('focus-areas-section')) return 'Focus Areas';
    // Generic: use first meaningful class
    var cls = el.className.split(' ').filter(function(c) {
      return c && c !== 'section-padding' && c !== 'bg-darker';
    });
    return cls[0] || 'section';
  }

  function enqueue(event, data) {
    queue.push(Object.assign({ e: event, p: page, t: Date.now() }, data || {}));
    if (!flushTimer) {
      flushTimer = setTimeout(flush, 5000);
    }
  }

  function flush() {
    clearTimeout(flushTimer);
    flushTimer = null;
    if (!queue.length) return;

    var payload = JSON.stringify({
      o: origin,
      r: referrer,
      d: getDevice(),
      v: queue.splice(0)
    });

    try {
      if (navigator.sendBeacon) {
        navigator.sendBeacon(ENDPOINT, payload);
      } else {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', ENDPOINT, true);
        xhr.setRequestHeader('Content-Type', 'text/plain');
        xhr.send(payload);
      }
    } catch (err) {
      // Silently fail — analytics should never break the site
    }
  }

  // --- Pageview ---
  enqueue('pageview');

  // --- Section visibility tracking ---
  if (window.IntersectionObserver) {
    var seen = {};

    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        var name = entry.target._analyticsName;
        if (!name) return;

        if (entry.isIntersecting) {
          if (!seen[name]) {
            seen[name] = Date.now();
          }
        } else {
          if (seen[name]) {
            var duration = Math.round((Date.now() - seen[name]) / 1000);
            if (duration > 0) {
              enqueue('section', { s: name, dur: duration });
            }
            delete seen[name];
          }
        }
      });
    }, { threshold: 0.3 });

    // Observe sections once DOM is ready
    function observeSections() {
      document.querySelectorAll('section, [data-section]').forEach(function(el) {
        el._analyticsName = getSectionName(el);
        observer.observe(el);
      });
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', observeSections);
    } else {
      // Delay slightly to let template engine populate sections
      setTimeout(observeSections, 1000);
    }

    // Flush remaining sections on leave
    document.addEventListener('visibilitychange', function() {
      if (document.visibilityState === 'hidden') {
        Object.keys(seen).forEach(function(name) {
          var duration = Math.round((Date.now() - seen[name]) / 1000);
          if (duration > 0) {
            enqueue('section', { s: name, dur: duration });
          }
          delete seen[name];
        });
      }
    });
  }

  // --- CTA click tracking ---
  document.addEventListener('click', function(e) {
    var target = e.target.closest ? e.target.closest('a, button') : null;
    if (!target) return;

    // PDF download
    if (target.id === 'resumePdfBtn' || target.classList.contains('resume-pdf-btn')) {
      enqueue('pdf_download');
      return;
    }

    // QR code
    if (target.id === 'qrCodeBtn' || target.classList.contains('qr-code-btn')) {
      enqueue('qr_open');
      return;
    }

    var href = target.getAttribute('href') || '';

    // Book a call / audit
    if (href.includes('audit') || href.includes('calendly') || href.includes('book')) {
      enqueue('cta_click', { a: 'book_call' });
      return;
    }

    // Contact
    if (href.includes('contact') || href.startsWith('mailto:') || href.startsWith('tel:')) {
      enqueue('cta_click', { a: 'contact' });
      return;
    }

    // Social links
    if (target.closest('[data-template="socialLinks"]') || target.closest('.footer-social')) {
      enqueue('cta_click', { a: 'social' });
      return;
    }
  });

  // --- Flush on page leave ---
  document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'hidden') flush();
  });
  window.addEventListener('pagehide', flush);

})();
