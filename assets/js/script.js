'use strict';

// Modern Portfolio JavaScript
// Enhanced functionality for the futuristic design

// Utility Functions
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

// Element toggle function
const elementToggleFunc = function (elem) { 
  elem.classList.toggle("active"); 
};

// Smooth scroll to element
const smoothScrollTo = (element) => {
  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

// Page Navigation
const navigationLinks = $$("[data-nav-link]");
const pages = $$("[data-page]");

// Debug: Log found elements
console.log("Navigation links found:", navigationLinks.length);
console.log("Pages found:", pages.length);
pages.forEach(page => {
  console.log(`Page: ${page.dataset.page}, Active: ${page.classList.contains("active")}`);
});

// Add event to all nav links
navigationLinks.forEach((navLink, index) => {
  navLink.addEventListener("click", function () {
    // Remove active class from all pages and nav links
    pages.forEach(page => page.classList.remove("active"));
    navigationLinks.forEach(link => link.classList.remove("active"));
    
    // Add active class to clicked nav link
    this.classList.add("active");
    
    // Get target page name from button text, ensuring clean matching
    const targetPageName = this.innerHTML.trim().toLowerCase();
    const targetPage = $(`.content-section[data-page="${targetPageName}"]`);
    
    if (targetPage) {
      // Add active class to corresponding page
      targetPage.classList.add("active");
      
      // Reset any transition styles that might interfere
      targetPage.style.opacity = "1";
      targetPage.style.transform = "translateY(0)";
      
      // Smooth scroll to target page
      smoothScrollTo(targetPage);
    } else {
      console.warn(`Target page not found for: ${targetPageName}`);
    }
  });
});

// Portfolio Filter Functionality
const filterButtons = $$("[data-filter]");
const projectCards = $$(".project-card");

// Filter function
const filterProjects = (category) => {
  projectCards.forEach(card => {
    const cardCategory = card.dataset.category;
    
    if (category === "all" || cardCategory === category) {
      card.classList.remove("hidden");
      // Add entrance animation
      setTimeout(() => {
        card.style.transform = "scale(1)";
        card.style.opacity = "1";
      }, 100);
    } else {
      card.classList.add("hidden");
    }
  });
};

// Add event listeners to filter buttons
filterButtons.forEach(button => {
  button.addEventListener("click", function() {
    // Remove active class from all filter buttons
    filterButtons.forEach(btn => btn.classList.remove("active"));
    
    // Add active class to clicked button
    this.classList.add("active");
    
    // Filter projects
    const filterValue = this.dataset.filter;
    filterProjects(filterValue);
  });
});

// Skill Progress Animation
const animateSkillBars = () => {
  const skillBars = $$(".skill-progress");
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const skillBar = entry.target;
        const width = skillBar.style.width;
        
        // Reset width and animate
        skillBar.style.width = "0%";
        setTimeout(() => {
          skillBar.style.width = width;
        }, 200);
      }
    });
  }, { threshold: 0.5 });
  
  skillBars.forEach(bar => observer.observe(bar));
};

// Initialize skill bar animation
animateSkillBars();

// Parallax Effect for Cards
const addParallaxEffect = () => {
  const cards = $$(".card");
  
  cards.forEach(card => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    });
    
    card.addEventListener("mouseleave", () => {
      card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)";
    });
  });
};

// Initialize parallax effect
addParallaxEffect();

// Typing Animation for Profile Title
const typeWriter = (element, text, speed = 100) => {
  let i = 0;
  element.innerHTML = "";
  
  const typing = () => {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(typing, speed);
    }
  };
  
  typing();
};

// Initialize typing animation
window.addEventListener("load", () => {
  const profileTitle = $(".profile-title");
  if (profileTitle) {
    const originalText = profileTitle.textContent;
    typeWriter(profileTitle, originalText, 80);
  }
});


// Enhanced Contact Item Hover Effects
const contactItems = $$(".contact-item");
contactItems.forEach(item => {
  item.addEventListener("mouseenter", function() {
    this.style.transform = "translateX(10px)";
    this.style.background = "var(--surface-glass-light)";
  });
  
  item.addEventListener("mouseleave", function() {
    this.style.transform = "translateX(0)";
    this.style.background = "transparent";
  });
});

// Social Links Hover Animation
const socialLinks = $$(".social-link");
socialLinks.forEach(link => {
  link.addEventListener("mouseenter", function() {
    this.style.transform = "translateY(-5px) scale(1.1)";
  });
  
  link.addEventListener("mouseleave", function() {
    this.style.transform = "translateY(0) scale(1)";
  });
});

// Project Card Tilt Effect
const projectCards2 = $$(".project-card");
projectCards2.forEach(card => {
  card.addEventListener("mouseenter", function() {
    this.style.transform = "translateY(-10px) rotateX(5deg)";
    this.style.boxShadow = "var(--shadow-2xl), var(--shadow-glow)";
  });
  
  card.addEventListener("mouseleave", function() {
    this.style.transform = "translateY(0) rotateX(0deg)";
    this.style.boxShadow = "var(--shadow-xl)";
  });
});

// Blog Card Hover Effects
const blogCards = $$(".blog-card");
blogCards.forEach(card => {
  card.addEventListener("mouseenter", function() {
    const image = this.querySelector(".blog-image img");
    if (image) {
      image.style.transform = "scale(1.1)";
    }
  });
  
  card.addEventListener("mouseleave", function() {
    const image = this.querySelector(".blog-image img");
    if (image) {
      image.style.transform = "scale(1)";
    }
  });
});

// Intersection Observer for Fade-in Animations
const observeElements = () => {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);
  
  // Observe cards and sections
  const elementsToObserve = $$(".card, .timeline-item, .service-card");
  elementsToObserve.forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "all 0.6s ease-out";
    observer.observe(el);
  });
};

// Initialize intersection observer
observeElements();

// Performance Optimization: Debounce Function
const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Optimized Scroll Handler
const handleScroll = debounce(() => {
  const scrolled = window.pageYOffset;
  const navbar = $(".navbar");
  
  if (navbar) {
    if (scrolled > 100) {
      navbar.style.background = "rgba(26, 35, 50, 0.95)";
      navbar.style.backdropFilter = "blur(20px)";
    } else {
      navbar.style.background = "var(--surface-glass)";
      navbar.style.backdropFilter = "blur(20px)";
    }
  }
}, 10);

window.addEventListener("scroll", handleScroll);

// Keyboard Navigation Support
document.addEventListener("keydown", (e) => {
  const activeNavIndex = Array.from(navigationLinks).findIndex(link => 
    link.classList.contains("active")
  );
  
  if (e.key === "ArrowLeft" && activeNavIndex > 0) {
    navigationLinks[activeNavIndex - 1].click();
  } else if (e.key === "ArrowRight" && activeNavIndex < navigationLinks.length - 1) {
    navigationLinks[activeNavIndex + 1].click();
  }
});

// Initialize all animations on page load
window.addEventListener("load", () => {
  // Initialize page transitions first
  addPageTransitions();
  
  // Add entrance animations
  const elements = $$(".card, .navbar, .sidebar-card");
  elements.forEach((el, index) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    
    setTimeout(() => {
      el.style.transition = "all 0.6s ease-out";
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }, index * 100);
  });
  
  // Ensure active page is visible
  const activePage = $(".content-section.active");
  if (activePage) {
    activePage.style.display = "block";
    activePage.style.opacity = "1";
    activePage.style.transform = "translateY(0)";
  }
  
  console.log("Portfolio navigation initialized successfully");
});

// Service Worker Registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

// Dark/Light Theme Toggle (Future Enhancement)
const initThemeToggle = () => {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
  
  // Listen for theme changes
  prefersDark.addEventListener('change', (e) => {
    if (e.matches) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  });
};

// Initialize theme toggle
initThemeToggle();

// Console Art
console.log(`
╔══════════════════════════════════════╗
║     🚀 MODERN PORTFOLIO LOADED 🚀    ║
║                                      ║
║  Built with modern web technologies  ║
║  Featuring futuristic design & UX    ║
║                                      ║
║  Developer: Irit Maulana             ║
║  Version: 2.0.0                      ║
╚══════════════════════════════════════╝
`);

// Export functions for potential module usage
window.PortfolioApp = {
  filterProjects,
  typeWriter,
  smoothScrollTo,
  elementToggleFunc
};
// Navigation Test Function (for debugging)
const testNavigation = () => {
  console.log("=== Navigation Test ===");
  
  navigationLinks.forEach((link, index) => {
    const buttonText = link.innerHTML.trim().toLowerCase();
    const targetPage = $(`.content-section[data-page="${buttonText}"]`);
    
    console.log(`Button ${index + 1}: "${link.innerHTML}" -> Target: "${buttonText}" -> Found: ${!!targetPage}`);
    
    if (targetPage) {
      console.log(`  Page data-page: "${targetPage.dataset.page}"`);
      console.log(`  Page active: ${targetPage.classList.contains("active")}`);
      console.log(`  Page display: ${getComputedStyle(targetPage).display}`);
    }
  });
  
  console.log("=== End Navigation Test ===");
};

// Export test function to window for manual testing
window.testNavigation = testNavigation;
