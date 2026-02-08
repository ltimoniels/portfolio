/* =============================================
   Site Configuration Template
   Customize this file to personalize your site
   ============================================= */

const siteConfig = {
  // ==========================================
  // PERSONAL INFORMATION
  // ==========================================
  personal: {
    name: "Your Name",
    firstName: "Your",
    lastName: "Name",
    title: "Your Professional Title",
    tagline: "Your compelling tagline goes here",
    shortBio: "A brief 1-2 sentence description of who you are and what you do.",
    fullBio: `A longer bio that tells your story. This can be multiple paragraphs describing your background, experience, and what drives you professionally.

Include your unique value proposition and what makes you different from others in your field.`,
    yearsExperience: "10+",
    location: "Your City, Country",
    timezone: "EST"
  },

  // ==========================================
  // CONTACT INFORMATION
  // ==========================================
  contact: {
    email: "hello@yourdomain.com",
    phone: "", // Optional
    website: "https://yourdomain.com",
    calendlyUrl: "", // For booking calls
    responseTime: "Usually within 24 hours"
  },

  // ==========================================
  // SOCIAL MEDIA LINKS
  // ==========================================
  social: {
    linkedin: "",
    twitter: "",
    github: "",
    instagram: "",
    youtube: "",
    facebook: "",
    dribbble: "",
    behance: ""
  },

  // ==========================================
  // BRANDING
  // ==========================================
  branding: {
    siteName: "YourBrand",
    logoUrl: "", // Leave empty to use text logo
    logoDarkUrl: "", // For light backgrounds
    faviconUrl: "",
    // Color scheme
    colors: {
      primary: "#000000",      // Main background
      secondary: "#090909",    // Cards, sections
      accent: "#c5a47e",       // Highlights, accents
      text: "#ffffff",         // Main text
      textMuted: "#999999",    // Secondary text
      border: "rgba(255, 255, 255, 0.1)"
    },
    // Set to true for light theme
    lightTheme: false
  },

  // ==========================================
  // HERO SLIDES
  // ==========================================
  heroSlides: [
    {
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1920",
      subtitle: "Your Identity",
      title: "I'm a Creator",
      description: "Brief description of this aspect of your identity or expertise.",
      buttonText: "Learn More",
      buttonLink: "about.html"
    },
    {
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920",
      subtitle: "Your Work",
      title: "I Build Solutions",
      description: "Describe what you create or the problems you solve.",
      buttonText: "View Services",
      buttonLink: "services.html"
    },
    {
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920",
      subtitle: "Your Values",
      title: "I'm Collaborative",
      description: "Share a core value or approach that defines your work.",
      buttonText: "See My Process",
      buttonLink: "process.html"
    },
    {
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1920",
      subtitle: "Your Passion",
      title: "I Love What I Do",
      description: "What drives and motivates you in your work.",
      buttonText: "Get In Touch",
      buttonLink: "contact.html"
    }
  ],

  // ==========================================
  // SERVICES
  // ==========================================
  services: [
    {
      icon: "fas fa-search",
      title: "Discovery & Research",
      shortDesc: "Understanding your needs through thorough research and analysis.",
      fullDesc: "Detailed description of this service, what's included, and the value it provides to clients.",
      features: [
        "Feature or deliverable 1",
        "Feature or deliverable 2",
        "Feature or deliverable 3",
        "Feature or deliverable 4"
      ]
    },
    {
      icon: "fas fa-pencil-ruler",
      title: "Strategy & Planning",
      shortDesc: "Creating comprehensive plans aligned with your goals.",
      fullDesc: "Detailed description of this service, what's included, and the value it provides to clients.",
      features: [
        "Feature or deliverable 1",
        "Feature or deliverable 2",
        "Feature or deliverable 3",
        "Feature or deliverable 4"
      ]
    },
    {
      icon: "fas fa-cogs",
      title: "Implementation",
      shortDesc: "Executing plans with precision and attention to detail.",
      fullDesc: "Detailed description of this service, what's included, and the value it provides to clients.",
      features: [
        "Feature or deliverable 1",
        "Feature or deliverable 2",
        "Feature or deliverable 3",
        "Feature or deliverable 4"
      ]
    },
    {
      icon: "fas fa-chart-line",
      title: "Optimization",
      shortDesc: "Continuously improving results through data-driven decisions.",
      fullDesc: "Detailed description of this service, what's included, and the value it provides to clients.",
      features: [
        "Feature or deliverable 1",
        "Feature or deliverable 2",
        "Feature or deliverable 3",
        "Feature or deliverable 4"
      ]
    },
    {
      icon: "fas fa-users",
      title: "Training & Support",
      shortDesc: "Empowering you and your team with knowledge and ongoing assistance.",
      fullDesc: "Detailed description of this service, what's included, and the value it provides to clients.",
      features: [
        "Feature or deliverable 1",
        "Feature or deliverable 2",
        "Feature or deliverable 3",
        "Feature or deliverable 4"
      ]
    },
    {
      icon: "fas fa-headset",
      title: "Ongoing Partnership",
      shortDesc: "Long-term collaboration to ensure continued success.",
      fullDesc: "Detailed description of this service, what's included, and the value it provides to clients.",
      features: [
        "Feature or deliverable 1",
        "Feature or deliverable 2",
        "Feature or deliverable 3",
        "Feature or deliverable 4"
      ]
    }
  ],

  // ==========================================
  // SOLUTIONS / INDUSTRIES
  // ==========================================
  solutions: [
    {
      title: "Industry or Niche 1",
      description: "How you help clients in this specific industry or niche.",
      features: [
        "Specific solution or approach",
        "Another capability",
        "Additional service aspect"
      ]
    },
    {
      title: "Industry or Niche 2",
      description: "How you help clients in this specific industry or niche.",
      features: [
        "Specific solution or approach",
        "Another capability",
        "Additional service aspect"
      ]
    },
    {
      title: "Industry or Niche 3",
      description: "How you help clients in this specific industry or niche.",
      features: [
        "Specific solution or approach",
        "Another capability",
        "Additional service aspect"
      ]
    },
    {
      title: "Industry or Niche 4",
      description: "How you help clients in this specific industry or niche.",
      features: [
        "Specific solution or approach",
        "Another capability",
        "Additional service aspect"
      ]
    },
    {
      title: "Industry or Niche 5",
      description: "How you help clients in this specific industry or niche.",
      features: [
        "Specific solution or approach",
        "Another capability",
        "Additional service aspect"
      ]
    },
    {
      title: "Industry or Niche 6",
      description: "How you help clients in this specific industry or niche.",
      features: [
        "Specific solution or approach",
        "Another capability",
        "Additional service aspect"
      ]
    }
  ],

  // ==========================================
  // FOCUS AREAS (Where We Can Help)
  // ==========================================
  focusAreas: {
    subheading: "Where We Can Help",
    heading: "Areas of Expertise",
    tagline: "Specialized guidance available • On-site or remote • Tailored to your needs",
    areas: [
      {
        category: "AREA 1",
        title: "First Focus Area",
        image: ""
      },
      {
        category: "AREA 2",
        title: "Second Focus Area",
        image: ""
      },
      {
        category: "AREA 3",
        title: "Third Focus Area",
        image: ""
      },
      {
        category: "AREA 4",
        title: "Fourth Focus Area",
        image: ""
      },
      {
        category: "AREA 5",
        title: "Fifth Focus Area",
        image: ""
      },
      {
        category: "AREA 6",
        title: "Sixth Focus Area",
        image: ""
      }
    ]
  },

  // ==========================================
  // TIMELINE / EXPERIENCE
  // ==========================================
  timeline: [
    {
      period: "Early Career",
      title: "The Foundation Years",
      description: "Describe this phase of your career journey, what you learned, and key achievements."
    },
    {
      period: "Growth Phase",
      title: "Building Expertise",
      description: "Describe this phase of your career journey, what you learned, and key achievements."
    },
    {
      period: "Current",
      title: "Where I Am Now",
      description: "Describe your current focus, what you're working on, and your vision for the future."
    }
  ],

  // ==========================================
  // PROCESS STEPS
  // ==========================================
  process: [
    {
      title: "Discovery",
      shortDesc: "Understanding your needs",
      fullDesc: "Detailed description of what happens in this phase of your process.",
      deliverables: [
        "Deliverable or activity 1",
        "Deliverable or activity 2",
        "Deliverable or activity 3"
      ]
    },
    {
      title: "Planning",
      shortDesc: "Creating the roadmap",
      fullDesc: "Detailed description of what happens in this phase of your process.",
      deliverables: [
        "Deliverable or activity 1",
        "Deliverable or activity 2",
        "Deliverable or activity 3"
      ]
    },
    {
      title: "Execution",
      shortDesc: "Bringing plans to life",
      fullDesc: "Detailed description of what happens in this phase of your process.",
      deliverables: [
        "Deliverable or activity 1",
        "Deliverable or activity 2",
        "Deliverable or activity 3"
      ]
    },
    {
      title: "Delivery",
      shortDesc: "Launching and supporting",
      fullDesc: "Detailed description of what happens in this phase of your process.",
      deliverables: [
        "Deliverable or activity 1",
        "Deliverable or activity 2",
        "Deliverable or activity 3"
      ]
    }
  ],

  // ==========================================
  // TESTIMONIALS
  // ==========================================
  testimonials: [
    {
      quote: "An amazing testimonial from a satisfied client describing the value and results you delivered.",
      author: "Client Name",
      role: "Job Title",
      company: "Company Name"
    },
    {
      quote: "Another powerful testimonial that builds credibility and trust with potential clients.",
      author: "Client Name",
      role: "Job Title",
      company: "Company Name"
    },
    {
      quote: "A third testimonial highlighting a different aspect of your work or expertise.",
      author: "Client Name",
      role: "Job Title",
      company: "Company Name"
    }
  ],

  // ==========================================
  // PHILOSOPHY / VALUES
  // ==========================================
  philosophy: [
    {
      icon: "fas fa-lightbulb",
      title: "Core Value 1",
      description: "Brief explanation of this value and how it guides your work."
    },
    {
      icon: "fas fa-users",
      title: "Core Value 2",
      description: "Brief explanation of this value and how it guides your work."
    },
    {
      icon: "fas fa-chart-line",
      title: "Core Value 3",
      description: "Brief explanation of this value and how it guides your work."
    }
  ],

  // ==========================================
  // PROBLEMS YOU SOLVE
  // ==========================================
  problems: [
    {
      problem: "Common pain point or challenge your clients face",
      solution: "How you address and solve this problem for them."
    },
    {
      problem: "Another common challenge",
      solution: "Your approach to solving it."
    },
    {
      problem: "Third problem statement",
      solution: "The solution you provide."
    },
    {
      problem: "Fourth problem statement",
      solution: "The solution you provide."
    }
  ],

  // ==========================================
  // GALLERY IMAGES
  // ==========================================
  gallery: [
    "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600",
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600",
    "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600",
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600"
  ],

  // ==========================================
  // FEATURE IMAGES
  // ==========================================
  images: {
    heroBackground: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1920",
    aboutImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800",
    parallaxImage1: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=1920",
    parallaxImage2: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1920"
  },

  // ==========================================
  // AUDIT / CONSULTATION OFFER
  // ==========================================
  audit: {
    title: "Free Consultation",
    subtitle: "Discovery Call",
    description: "Start with a complimentary consultation to discuss your needs and explore how we can work together.",
    duration: "30-45 minutes",
    benefits: [
      {
        icon: "fas fa-search",
        title: "Needs Assessment",
        description: "Understanding your current situation and goals."
      },
      {
        icon: "fas fa-lightbulb",
        title: "Initial Insights",
        description: "Preliminary ideas and recommendations."
      },
      {
        icon: "fas fa-route",
        title: "Next Steps",
        description: "Clear path forward if we're a good fit."
      },
      {
        icon: "fas fa-comments",
        title: "No Obligation",
        description: "Honest conversation with no pressure."
      }
    ]
  },

  // ==========================================
  // SEO & META
  // ==========================================
  seo: {
    siteTitle: "Your Name - Professional Title",
    siteDescription: "Meta description for search engines (150-160 characters).",
    keywords: "keyword1, keyword2, keyword3",
    ogImage: "" // Social sharing image
  },

  // ==========================================
  // FOOTER
  // ==========================================
  footer: {
    tagline: "Brief tagline or mission statement for the footer.",
    copyright: "Your Name or Company"
  }
};

// Make config available globally
if (typeof window !== 'undefined') {
  window.siteConfig = siteConfig;
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = siteConfig;
}
