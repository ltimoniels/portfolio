/* =============================================
   Template Engine
   Applies configuration to site pages
   ============================================= */

(function() {
  'use strict';

  const TemplateEngine = {
    config: null,
    configSource: null, // Track where config came from

    init: async function() {
      // Load config with priority: JSON file > localStorage > default
      await this.loadConfig();
      this.applyConfig();
      this.setupDynamicElements();

      // Reinitialize scroll animations for dynamically added elements
      if (window.MGC && typeof window.MGC.refresh === 'function') {
        window.MGC.refresh();
      }
    },

    loadConfig: async function() {
      // Priority 1: Try to fetch site-config.json (for GitHub Pages persistence)
      try {
        const response = await fetch('site-config.json?v=' + Date.now());
        if (response.ok) {
          const jsonConfig = await response.json();
          // Use JSON config if it has valid structure (has personal and branding sections)
          if (jsonConfig && jsonConfig.personal && jsonConfig.branding) {
            this.config = this.mergeWithDefaults(jsonConfig);
            this.configSource = 'json';
            console.log('Config loaded from site-config.json');
            return;
          }
        }
      } catch (e) {
        console.log('No custom site-config.json found, checking localStorage...');
      }

      // Priority 2: Try localStorage (for local preview/testing)
      const savedConfig = localStorage.getItem('siteConfig');
      if (savedConfig) {
        try {
          const parsed = JSON.parse(savedConfig);
          this.config = this.mergeWithDefaults(parsed);
          this.configSource = 'localStorage';
          console.log('Config loaded from localStorage');
          console.log('Services in config:', this.config.services?.length || 0);
          console.log('Solutions in config:', this.config.solutions?.length || 0);
          return;
        } catch (e) {
          console.warn('Failed to parse saved config');
        }
      }

      // Priority 3: Fall back to default config
      if (window.siteConfig) {
        this.config = JSON.parse(JSON.stringify(window.siteConfig));
        this.configSource = 'default';
        console.log('Using default config from config.js');
        console.log('Services in config:', this.config.services?.length || 0);
        console.log('Solutions in config:', this.config.solutions?.length || 0);
      } else {
        console.error('No config found! window.siteConfig is undefined');
        this.config = {};
      }
    },

    // Merge loaded config with defaults to fill any missing fields
    mergeWithDefaults: function(config) {
      const defaults = window.siteConfig || {};
      const merged = JSON.parse(JSON.stringify(defaults));

      // Deep merge config into defaults
      Object.keys(config).forEach(key => {
        if (config[key] !== null && config[key] !== undefined) {
          if (Array.isArray(config[key])) {
            // For arrays, use config version if it has items, otherwise keep defaults
            merged[key] = config[key].length > 0 ? config[key] : merged[key];
          } else if (typeof config[key] === 'object') {
            // For objects, merge recursively
            merged[key] = { ...merged[key], ...config[key] };
          } else {
            // For primitives, use config value if not empty
            merged[key] = config[key] || merged[key];
          }
        }
      });

      return merged;
    },

    saveConfig: function(config) {
      this.config = config;
      localStorage.setItem('siteConfig', JSON.stringify(config));
      this.applyConfig();
    },

    resetConfig: function() {
      localStorage.removeItem('siteConfig');
      this.config = window.siteConfig || {};
      this.applyConfig();
    },

    applyConfig: function() {
      if (!this.config) return;

      this.applyBranding();
      this.applyPersonalInfo();
      this.applyContact();
      this.applySocial();
      this.applyHeroSlides();
      this.applyServices();
      this.applyFocusAreas();
      this.applySolutions();
      this.applyTimeline();
      this.applyProcess();
      this.applyTestimonials();
      this.applyPhilosophy();
      this.applyProblems();
      this.applyGallery();
      this.applyImages();
      this.applyAudit();
      this.applySEO();
      this.applyFooter();
    },

    // ==========================================
    // BRANDING
    // ==========================================
    applyBranding: function() {
      // Use config branding, fall back to defaults from config.js
      const branding = (this.config.branding && Object.keys(this.config.branding).length > 0)
        ? this.config.branding
        : (window.siteConfig?.branding || {});
      if (!branding || Object.keys(branding).length === 0) return;

      // Apply colors as CSS variables
      if (branding.colors) {
        const root = document.documentElement;
        root.style.setProperty('--primary-color', branding.colors.primary);
        root.style.setProperty('--secondary-color', branding.colors.secondary);
        root.style.setProperty('--accent-color', branding.colors.accent);
        root.style.setProperty('--text-color', branding.colors.text);
        root.style.setProperty('--text-muted', branding.colors.textMuted);
        root.style.setProperty('--border-color', branding.colors.border);
      }

      // Apply light theme if set
      if (branding.lightTheme) {
        document.body.classList.add('v-light');
      }

      // Apply logo
      const logos = document.querySelectorAll('[data-template="logo"]');
      logos.forEach(logo => {
        if (branding.logoUrl) {
          logo.innerHTML = `<img src="${branding.logoUrl}" alt="${branding.siteName}">`;
        } else {
          logo.innerHTML = `<span class="text-logo">${branding.siteName}</span>`;
        }
      });

      // Apply favicon
      if (branding.faviconUrl) {
        let favicon = document.querySelector('link[rel="icon"]');
        if (favicon) {
          favicon.href = branding.faviconUrl;
        }
      }
    },

    // ==========================================
    // PERSONAL INFO
    // ==========================================
    applyPersonalInfo: function() {
      // Use config personal, fall back to defaults from config.js
      const personal = (this.config.personal && Object.keys(this.config.personal).length > 0)
        ? this.config.personal
        : (window.siteConfig?.personal || {});
      if (!personal || Object.keys(personal).length === 0) return;

      this.replaceText('[data-template="name"]', personal.name);
      this.replaceText('[data-template="firstName"]', personal.firstName);
      this.replaceText('[data-template="lastName"]', personal.lastName);
      this.replaceText('[data-template="title"]', personal.title);
      this.replaceText('[data-template="tagline"]', personal.tagline);
      this.replaceText('[data-template="shortBio"]', personal.shortBio);
      this.replaceText('[data-template="yearsExperience"]', personal.yearsExperience);
      this.replaceText('[data-template="location"]', personal.location);

      // Full bio with line breaks
      const fullBioEls = document.querySelectorAll('[data-template="fullBio"]');
      if (personal.fullBio) {
        fullBioEls.forEach(el => {
          el.innerHTML = personal.fullBio.split('\n\n').map(p => `<p>${p}</p>`).join('');
        });
      }
    },

    // ==========================================
    // CONTACT
    // ==========================================
    applyContact: function() {
      // Use config contact, fall back to defaults from config.js
      const contact = (this.config.contact && Object.keys(this.config.contact).length > 0)
        ? this.config.contact
        : (window.siteConfig?.contact || {});
      if (!contact || Object.keys(contact).length === 0) return;

      this.replaceText('[data-template="email"]', contact.email);
      this.replaceText('[data-template="phone"]', contact.phone);
      this.replaceText('[data-template="responseTime"]', contact.responseTime);

      // Email links
      document.querySelectorAll('[data-template="emailLink"]').forEach(el => {
        el.href = `mailto:${contact.email}`;
        el.textContent = contact.email;
      });

      // Phone links
      if (contact.phone) {
        document.querySelectorAll('[data-template="phoneLink"]').forEach(el => {
          el.href = `tel:${contact.phone.replace(/\D/g, '')}`;
          el.textContent = contact.phone;
          el.closest('.contact-info-item')?.classList.remove('hidden');
        });
      }
    },

    // ==========================================
    // SOCIAL LINKS
    // ==========================================
    applySocial: function() {
      // Use config social, fall back to defaults from config.js
      const social = (this.config.social && Object.keys(this.config.social).length > 0)
        ? this.config.social
        : (window.siteConfig?.social || {});
      if (!social || Object.keys(social).length === 0) return;

      const socialContainers = document.querySelectorAll('[data-template="socialLinks"]');
      socialContainers.forEach(container => {
        container.innerHTML = '';

        const platforms = [
          { key: 'linkedin', icon: 'fab fa-linkedin-in', url: social.linkedin },
          { key: 'twitter', icon: 'fab fa-twitter', url: social.twitter },
          { key: 'github', icon: 'fab fa-github', url: social.github },
          { key: 'instagram', icon: 'fab fa-instagram', url: social.instagram },
          { key: 'youtube', icon: 'fab fa-youtube', url: social.youtube },
          { key: 'facebook', icon: 'fab fa-facebook-f', url: social.facebook },
          { key: 'dribbble', icon: 'fab fa-dribbble', url: social.dribbble },
          { key: 'behance', icon: 'fab fa-behance', url: social.behance }
        ];

        platforms.forEach(platform => {
          if (platform.url) {
            const link = document.createElement('a');
            link.href = platform.url;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            link.innerHTML = `<i class="${platform.icon}"></i>`;
            container.appendChild(link);
          }
        });
      });
    },

    // ==========================================
    // HERO SLIDES
    // ==========================================
    applyHeroSlides: function() {
      // Use config heroSlides, fall back to defaults from config.js
      const slides = (this.config.heroSlides && this.config.heroSlides.length > 0)
        ? this.config.heroSlides
        : (window.siteConfig?.heroSlides || []);
      if (!slides || !slides.length) return;

      const slidesContainer = document.querySelector('[data-template="heroSlides"]');
      if (!slidesContainer) return;

      slidesContainer.innerHTML = slides.map(slide => `
        <div class="swiper-slide">
          <div class="hero-slide-bg" style="background-image: url('${slide.image}');" data-overlay="5"></div>
          <div class="hero-content">
            <span class="sub-title mgc-up">${slide.subtitle}</span>
            <h1 class="title mgc-up" data-delay="100">${slide.title}</h1>
            <p class="description mgc-up" data-delay="200">${slide.description}</p>
            <a href="${slide.buttonLink}" class="btn mgc-up" data-delay="300">${slide.buttonText}</a>
          </div>
        </div>
      `).join('');

      // Reinitialize slider if Swiper exists
      if (typeof Swiper !== 'undefined') {
        const existingSlider = document.querySelector('.hero-slider')?.swiper;
        if (existingSlider) existingSlider.destroy();

        new Swiper('.hero-slider', {
          slidesPerView: 1,
          loop: true,
          speed: 1000,
          autoplay: { delay: 5000, disableOnInteraction: false },
          effect: 'fade',
          fadeEffect: { crossFade: true },
          navigation: {
            nextEl: '.slider-nav-btn.next, .swiper-button-next',
            prevEl: '.slider-nav-btn.prev, .swiper-button-prev'
          }
        });
      }
    },

    // ==========================================
    // SERVICES
    // ==========================================
    applyServices: function() {
      // Use config services, fall back to defaults from config.js
      let services = [];
      if (this.config.services && Array.isArray(this.config.services) && this.config.services.length > 0) {
        services = this.config.services;
      } else if (window.siteConfig && window.siteConfig.services && window.siteConfig.services.length > 0) {
        services = window.siteConfig.services;
      }

      if (!services.length) {
        console.warn('No services data found in config or window.siteConfig');
        return;
      }

      // Services accordion
      const accordionContainer = document.querySelector('[data-template="servicesAccordion"]');
      if (accordionContainer) {
        accordionContainer.innerHTML = services.map(service => `
          <div class="dsn-accordion-item">
            <div class="dsn-accordion-header">
              <div class="dsn-accordion-title">
                <span class="service-icon"><i class="${service.icon}"></i></span>
                <span class="service-name">${service.title}</span>
              </div>
              <div class="dsn-accordion-icon"><i class="fas fa-plus"></i></div>
            </div>
            <div class="dsn-accordion-content">
              <div class="dsn-accordion-content-inner">
                <p>${service.fullDesc}</p>
              </div>
            </div>
          </div>
        `).join('');

        // Reinitialize accordion
        this.initAccordion(accordionContainer);
      }

      // Services grid
      const gridContainer = document.querySelector('[data-template="servicesGrid"]');
      if (gridContainer) {
        gridContainer.innerHTML = services.map((service, index) => `
          <div class="service-card mgc-up" data-delay="${index * 100}">
            <div class="number">${String(index + 1).padStart(2, '0')}</div>
            <h4>${service.title}</h4>
            <p>${service.shortDesc}</p>
            <ul style="margin-top: 20px; color: var(--text-muted);">
              ${service.features.map(f => `<li style="margin-bottom: 8px;">- ${f}</li>`).join('')}
            </ul>
          </div>
        `).join('');
      }

      // Card slider
      const sliderContainer = document.querySelector('[data-template="cardSlider"]');
      if (sliderContainer) {
        sliderContainer.innerHTML = services.map(service => `
          <div class="card-slider-item">
            <div class="icon"><i class="${service.icon}"></i></div>
            <h4 class="card-title">${service.title}</h4>
            <p class="card-text">${service.shortDesc}</p>
          </div>
        `).join('');

        // Reinitialize slick if exists
        if (typeof jQuery !== 'undefined' && jQuery.fn.slick) {
          const $slider = jQuery(sliderContainer);
          if ($slider.hasClass('slick-initialized')) {
            $slider.slick('unslick');
          }
          $slider.slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true,
            dots: true,
            arrows: true,
            autoplay: true,
            autoplaySpeed: 4000,
            responsive: [
              { breakpoint: 991, settings: { slidesToShow: 2, arrows: false }},
              { breakpoint: 575, settings: { slidesToShow: 1, arrows: false }}
            ]
          });
        }
      }
    },

    // ==========================================
    // FOCUS AREAS (Where We Can Help)
    // ==========================================
    applyFocusAreas: function() {
      // Use config focusAreas, fall back to defaults from config.js
      let focusAreas = null;
      if (this.config.focusAreas && this.config.focusAreas.areas && this.config.focusAreas.areas.length > 0) {
        focusAreas = this.config.focusAreas;
      } else if (window.siteConfig && window.siteConfig.focusAreas && window.siteConfig.focusAreas.areas && window.siteConfig.focusAreas.areas.length > 0) {
        focusAreas = window.siteConfig.focusAreas;
      }

      if (!focusAreas) {
        console.warn('No focusAreas data found in config or window.siteConfig');
        return;
      }

      // Apply header
      const headerContainer = document.querySelector('[data-template="focusAreasHeader"]');
      if (headerContainer) {
        const subheading = headerContainer.querySelector('.sub-heading');
        const heading = headerContainer.querySelector('h2');
        const tagline = headerContainer.querySelector('.focus-tagline');

        if (subheading && focusAreas.subheading) subheading.textContent = focusAreas.subheading;
        if (heading && focusAreas.heading) heading.textContent = focusAreas.heading;
        if (tagline && focusAreas.tagline) tagline.textContent = focusAreas.tagline;
      }

      // Apply cards grid
      const container = document.querySelector('[data-template="focusAreas"]');
      if (!container) return;

      container.innerHTML = focusAreas.areas.map((area, index) => `
        <div class="focus-area-card mgc-up" data-delay="${index * 100}">
          <div class="card-bg" ${area.image ? `style="background-image: url('${area.image}')"` : ''}></div>
          <div class="card-overlay"></div>
          <div class="card-content">
            <div class="card-category">${area.category}</div>
            <h4 class="card-title">${area.title}</h4>
          </div>
        </div>
      `).join('');
    },

    // ==========================================
    // SOLUTIONS
    // ==========================================
    applySolutions: function() {
      // Use config solutions, fall back to defaults from config.js
      let solutions = [];
      if (this.config.solutions && Array.isArray(this.config.solutions) && this.config.solutions.length > 0) {
        solutions = this.config.solutions;
      } else if (window.siteConfig && window.siteConfig.solutions && window.siteConfig.solutions.length > 0) {
        solutions = window.siteConfig.solutions;
      }

      if (!solutions.length) {
        console.warn('No solutions data found in config or window.siteConfig');
        return;
      }

      const container = document.querySelector('[data-template="solutions"]');
      if (!container) return;

      container.innerHTML = solutions.map((solution, index) => `
        <div class="solution-card mgc-up" data-delay="${index * 100}">
          <div class="solution-number">${String(index + 1).padStart(2, '0')}</div>
          <div class="solution-content">
            <h4>${solution.title}</h4>
            <p>${solution.description}</p>
            <div class="solution-details">
              <ul style="margin-top: 20px; color: var(--text-muted);">
                ${solution.features.map(f => `<li style="margin-bottom: 10px;">- ${f}</li>`).join('')}
              </ul>
            </div>
            <div class="solution-toggle">Learn More</div>
          </div>
        </div>
      `).join('');

      // Reinitialize solution toggles
      container.querySelectorAll('.solution-toggle').forEach(toggle => {
        toggle.addEventListener('click', function() {
          const card = this.closest('.solution-card');
          card.classList.toggle('expanded');
          this.textContent = card.classList.contains('expanded') ? 'Show Less' : 'Learn More';
        });
      });
    },

    // ==========================================
    // TIMELINE
    // ==========================================
    applyTimeline: function() {
      // Use config timeline, fall back to defaults from config.js
      const timeline = (this.config.timeline && this.config.timeline.length > 0)
        ? this.config.timeline
        : (window.siteConfig?.timeline || []);
      if (!timeline || !timeline.length) return;

      const container = document.querySelector('[data-template="timeline"]');
      if (!container) return;

      container.innerHTML = timeline.map(item => `
        <div class="timeline-item">
          <div class="timeline-date">${item.period}</div>
          <h4 class="timeline-title">${item.title}</h4>
          <div class="timeline-content">
            <p>${item.description}</p>
          </div>
        </div>
      `).join('');
    },

    // ==========================================
    // PROCESS
    // ==========================================
    applyProcess: function() {
      // Use config process, fall back to defaults from config.js
      const process = (this.config.process && this.config.process.length > 0)
        ? this.config.process
        : (window.siteConfig?.process || []);
      if (!process || !process.length) return;

      // Process steps
      const stepsContainer = document.querySelector('[data-template="processSteps"]');
      if (stepsContainer) {
        stepsContainer.innerHTML = process.map((step, index) => `
          <div class="process-step">
            <div class="step-number">${index + 1}</div>
            <h5>${step.title}</h5>
            <p>${step.shortDesc}</p>
          </div>
        `).join('');
      }

      // Process accordion
      const accordionContainer = document.querySelector('[data-template="processAccordion"]');
      if (accordionContainer) {
        accordionContainer.innerHTML = process.map((step, index) => `
          <div class="dsn-accordion-item ${index === 0 ? 'active' : ''}">
            <div class="step-number">${index + 1}</div>
            <div class="dsn-accordion-header">
              <h4 class="dsn-accordion-title">${step.title}</h4>
              <div class="dsn-accordion-icon"><i class="fas fa-plus"></i></div>
            </div>
            <div class="dsn-accordion-content">
              <div class="dsn-accordion-content-inner">
                <p>${step.fullDesc}</p>
                <ul style="margin-top: 20px;">
                  ${step.deliverables.map(d => `<li>${d}</li>`).join('')}
                </ul>
              </div>
            </div>
          </div>
        `).join('');

        this.initAccordion(accordionContainer);
      }
    },

    // ==========================================
    // TESTIMONIALS
    // ==========================================
    applyTestimonials: function() {
      // Use config testimonials, fall back to defaults from config.js
      const testimonials = (this.config.testimonials && this.config.testimonials.length > 0)
        ? this.config.testimonials
        : (window.siteConfig?.testimonials || []);
      if (!testimonials || !testimonials.length) return;

      const container = document.querySelector('[data-template="testimonials"]');
      if (!container) return;

      container.innerHTML = testimonials.map(t => `
        <div class="testimonial-card">
          <p class="testimonial-text">"${t.quote}"</p>
          <div class="testimonial-author">
            <div class="testimonial-author-info">
              <h6>${t.author}</h6>
              <span>${t.role}${t.company ? `, ${t.company}` : ''}</span>
            </div>
          </div>
        </div>
      `).join('');

      // Reinitialize slick
      if (typeof jQuery !== 'undefined' && jQuery.fn.slick) {
        const $slider = jQuery(container);
        if ($slider.hasClass('slick-initialized')) {
          $slider.slick('unslick');
        }
        $slider.slick({
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          arrows: true,
          autoplay: true,
          autoplaySpeed: 6000,
          fade: true
        });
      }
    },

    // ==========================================
    // PHILOSOPHY
    // ==========================================
    applyPhilosophy: function() {
      // Use config philosophy, fall back to defaults from config.js
      const philosophy = (this.config.philosophy && this.config.philosophy.length > 0)
        ? this.config.philosophy
        : (window.siteConfig?.philosophy || []);
      if (!philosophy || !philosophy.length) return;

      const container = document.querySelector('[data-template="philosophy"]');
      if (!container) return;

      container.innerHTML = philosophy.map(item => `
        <div class="philosophy-item">
          <div class="icon"><i class="${item.icon}"></i></div>
          <h5>${item.title}</h5>
          <p>${item.description}</p>
        </div>
      `).join('');
    },

    // ==========================================
    // PROBLEMS
    // ==========================================
    applyProblems: function() {
      // Use config problems, fall back to defaults from config.js
      const problems = (this.config.problems && this.config.problems.length > 0)
        ? this.config.problems
        : (window.siteConfig?.problems || []);
      if (!problems || !problems.length) return;

      const container = document.querySelector('[data-template="problems"]');
      if (!container) return;

      container.innerHTML = problems.map(item => `
        <div class="dsn-accordion-item">
          <div class="dsn-accordion-header">
            <h5 class="dsn-accordion-title">${item.problem}</h5>
            <div class="dsn-accordion-icon"><i class="fas fa-plus"></i></div>
          </div>
          <div class="dsn-accordion-content">
            <div class="dsn-accordion-content-inner">
              <p>${item.solution}</p>
            </div>
          </div>
        </div>
      `).join('');

      this.initAccordion(container);
    },

    // ==========================================
    // GALLERY
    // ==========================================
    applyGallery: function() {
      // Use config gallery, fall back to defaults from config.js
      const gallery = (this.config.gallery && this.config.gallery.length > 0)
        ? this.config.gallery
        : (window.siteConfig?.gallery || []);
      if (!gallery || !gallery.length) return;

      const container = document.querySelector('[data-template="gallery"]');
      if (!container) return;

      container.innerHTML = gallery.map((img, index) => `
        <div class="gallery-item">
          <img src="${img}" alt="Gallery Image ${index + 1}">
        </div>
      `).join('');
    },

    // ==========================================
    // IMAGES
    // ==========================================
    applyImages: function() {
      // Use config images, fall back to defaults from config.js
      const images = (this.config.images && Object.keys(this.config.images).length > 0)
        ? this.config.images
        : (window.siteConfig?.images || {});
      if (!images || Object.keys(images).length === 0) return;

      Object.keys(images).forEach(key => {
        const elements = document.querySelectorAll(`[data-template-image="${key}"]`);
        elements.forEach(el => {
          if (el.tagName === 'IMG') {
            el.src = images[key];
          } else {
            el.style.backgroundImage = `url('${images[key]}')`;
          }
        });
      });
    },

    // ==========================================
    // AUDIT
    // ==========================================
    applyAudit: function() {
      // Use config audit, fall back to defaults from config.js
      const audit = (this.config.audit && Object.keys(this.config.audit).length > 0)
        ? this.config.audit
        : (window.siteConfig?.audit || {});
      if (!audit || Object.keys(audit).length === 0) return;

      this.replaceText('[data-template="auditTitle"]', audit.title);
      this.replaceText('[data-template="auditSubtitle"]', audit.subtitle);
      this.replaceText('[data-template="auditDescription"]', audit.description);
      this.replaceText('[data-template="auditDuration"]', audit.duration);

      // Use audit benefits, fall back to defaults from config.js
      const benefits = (audit.benefits && audit.benefits.length > 0)
        ? audit.benefits
        : (window.siteConfig?.audit?.benefits || []);

      const benefitsContainer = document.querySelector('[data-template="auditBenefits"]');
      if (benefitsContainer && benefits.length > 0) {
        benefitsContainer.innerHTML = benefits.map(benefit => `
          <div class="audit-benefit-item">
            <div class="icon"><i class="${benefit.icon}"></i></div>
            <div>
              <h5>${benefit.title}</h5>
              <p>${benefit.description}</p>
            </div>
          </div>
        `).join('');
      }

      // Handle Calendly integration
      const contact = this.config.contact || window.siteConfig?.contact || {};
      const calendlyUrl = contact.calendlyUrl;
      const calendlyEmbed = document.getElementById('calendlyEmbed');
      const auditFormContainer = document.getElementById('auditFormContainer');

      if (calendlyUrl && calendlyEmbed && auditFormContainer) {
        // Show Calendly embed, hide form
        calendlyEmbed.style.display = 'block';
        auditFormContainer.style.display = 'none';

        // Set the Calendly URL
        const calendlyWidget = calendlyEmbed.querySelector('.calendly-inline-widget');
        if (calendlyWidget) {
          calendlyWidget.setAttribute('data-url', calendlyUrl);
        }
      }
    },

    // ==========================================
    // SEO
    // ==========================================
    applySEO: function() {
      // Use config seo, fall back to defaults from config.js
      const seo = (this.config.seo && Object.keys(this.config.seo).length > 0)
        ? this.config.seo
        : (window.siteConfig?.seo || {});
      if (!seo || Object.keys(seo).length === 0) return;

      // Update title
      if (seo.siteTitle) {
        const titleEl = document.querySelector('title');
        if (titleEl) {
          const pageName = titleEl.textContent.split('|')[0].trim();
          titleEl.textContent = pageName ? `${pageName} | ${seo.siteTitle}` : seo.siteTitle;
        }
      }

      // Update meta description
      if (seo.siteDescription) {
        let metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
          metaDesc.content = seo.siteDescription;
        }
      }
    },

    // ==========================================
    // FOOTER
    // ==========================================
    applyFooter: function() {
      // Use config footer, fall back to defaults from config.js
      const footer = (this.config.footer && Object.keys(this.config.footer).length > 0)
        ? this.config.footer
        : (window.siteConfig?.footer || {});
      if (!footer || Object.keys(footer).length === 0) return;

      this.replaceText('[data-template="footerTagline"]', footer.tagline);
      this.replaceText('[data-template="copyright"]', `© ${new Date().getFullYear()} ${footer.copyright}. All Rights Reserved.`);
    },

    // ==========================================
    // UTILITY METHODS
    // ==========================================
    replaceText: function(selector, text) {
      if (!text) return;
      document.querySelectorAll(selector).forEach(el => {
        el.textContent = text;
      });
    },

    initAccordion: function(container) {
      container.querySelectorAll('.dsn-accordion-header').forEach(header => {
        header.addEventListener('click', function() {
          const item = this.parentElement;
          const accordion = item.parentElement;

          if (!accordion.classList.contains('multiple')) {
            accordion.querySelectorAll('.dsn-accordion-item').forEach(i => {
              if (i !== item) i.classList.remove('active');
            });
          }

          item.classList.toggle('active');
        });
      });
    },

    setupDynamicElements: function() {
      // Set up any additional dynamic behaviors
    }
  };

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', async () => await TemplateEngine.init());
  } else {
    TemplateEngine.init();
  }

  // Expose globally
  window.TemplateEngine = TemplateEngine;

})();
