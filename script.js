// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

/**
 * Toggles the mobile menu and animates the hamburger icon
 */
const toggleMobileMenu = () => {
    navMenu.classList.toggle('active');
    const isActive = navMenu.classList.contains('active');
    
    // Animate hamburger icon
    const spans = mobileMenuToggle.querySelectorAll('span');
    const transformActive = isActive ? 'rotate(45deg) translate(0.375rem, 0.375rem)' : 'none';
    const transformInactive = isActive ? 'rotate(-45deg) translate(0.375rem, -0.375rem)' : 'none';
    
    spans[0].style.transform = transformActive;
    spans[1].style.opacity = isActive ? '0' : '1';
    spans[2].style.transform = transformInactive;
    
    // Update aria-expanded attribute
    mobileMenuToggle.setAttribute('aria-expanded', isActive);
};

if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener('click', toggleMobileMenu);

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.header-bottom-row') && !e.target.closest('.nav-menu')) {
            navMenu.classList.remove('active');
            mobileMenuToggle.setAttribute('aria-expanded', 'false');
            const spans = mobileMenuToggle.querySelectorAll('span');
            spans.forEach(span => {
                span.style.transform = 'none';
                span.style.opacity = '1';
            });
        }
    });
}

// Smooth Scrolling for Anchor Links
/**
 * Handles smooth scrolling to anchors with header offset
 * @param {Event} e - Click event
 */
const handleAnchorClick = function(e) {
    const href = this.getAttribute('href');
    
    // Don't prevent default for # only links
    if (href === '#' || href === '#!') return;
    
    const target = document.querySelector(href);
    if (!target) return;
    
    e.preventDefault();
    
    // Close mobile menu if open
    if (navMenu?.classList.contains('active')) {
        toggleMobileMenu();
    }
    
    // Smooth scroll to target
    const HEADER_OFFSET = 100;
    const elementPosition = target.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - HEADER_OFFSET;

    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });
};

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', handleAnchorClick);
});

// Header Shrink on Scroll with Throttle for Performance
const header = document.querySelector('.header');
let lastScrollTop = 0;
let ticking = false;

/**
 * Handles header shrink effect based on scroll position
 */
const handleHeaderShrink = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const SCROLL_THRESHOLD = 100;
    
    if (scrollTop > SCROLL_THRESHOLD) {
        header.classList.add('shrink');
    } else {
        header.classList.remove('shrink');
    }
    
    lastScrollTop = scrollTop;
    ticking = false;
};

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(handleHeaderShrink);
        ticking = true;
    }
}, { passive: true });

// Animate Elements on Scroll with Feature Detection
const ANIMATION_CONFIG = {
    threshold: 0.1,
    rootMargin: '0px 0px -3.125rem 0px'
};

/**
 * Initialize scroll animations using IntersectionObserver
 * Falls back gracefully for browsers without support
 */
const initScrollAnimations = () => {
    if (!('IntersectionObserver' in window)) {
        console.warn('IntersectionObserver not supported');
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, ANIMATION_CONFIG);

    const animateOnScroll = document.querySelectorAll(
        '.feature-card, .news-card, .testimonial, .community-content'
    );

    animateOnScroll.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(1.875rem)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
};

initScrollAnimations();

// Hero Slider (Simple implementation)
let currentSlide = 0;
const slides = document.querySelectorAll('.hero-slide');

function showSlide(n) {
    slides.forEach(slide => slide.classList.remove('active'));
    
    if (n >= slides.length) currentSlide = 0;
    if (n < 0) currentSlide = slides.length - 1;
    
    if (slides[currentSlide]) {
        slides[currentSlide].classList.add('active');
    }
}

// Auto-advance slides (if multiple slides exist)
if (slides.length > 1) {
    setInterval(() => {
        currentSlide++;
        showSlide(currentSlide);
    }, 5000);
}

// Form Validation (if forms are added)
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Add active class to current nav item based on scroll position
function setActiveNavOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 150) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', setActiveNavOnScroll);

// Lazy Loading Images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Handle external link security
document.querySelectorAll('a[target="_blank"]').forEach(link => {
    link.setAttribute('rel', 'noopener noreferrer');
});

// Simple Analytics Event Tracking (can be connected to GA4 or similar)
function trackEvent(category, action, label) {
    console.log(`Event: ${category} - ${action} - ${label}`);
    // Add your analytics tracking code here
    // Example: gtag('event', action, { category, label });
}

// Track button clicks
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', (e) => {
        const buttonText = e.target.textContent.trim();
        trackEvent('Button', 'Click', buttonText);
    });
});

// Console welcome message
console.log('%cWelcome to Saibaba Group!', 'color: #2e1a47; font-size: 20px; font-weight: bold;');
console.log('%cServing communities with excellence.', 'color: #FF6B35; font-size: 14px;');

// ============================================
// PLACEHOLDER FUNCTIONALITY FOR UI ELEMENTS
// ============================================

/**
 * Show placeholder notification
 */
const showNotification = (title, message, type = 'info') => {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <strong>${title}</strong>
            <p>${message}</p>
        </div>
        <button class="notification-close" aria-label="Close notification">&times;</button>
    `;
    
    // Add to body
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => notification.classList.add('show'), 10);
    
    // Close button handler
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 5000);
};

/**
 * Handle Order Catering button
 */
const handleOrderCatering = (e) => {
    e.preventDefault();
    showNotification(
        '🍩 Order Catering',
        'Our catering services are perfect for any occasion! Contact us at catering@saibabagroup.com or call (555) 123-4567 to place your order.',
        'success'
    );
};

/**
 * Handle Join Our Team button
 */
const handleJoinTeam = (e) => {
    e.preventDefault();
    showNotification(
        '💼 Join Our Team',
        'Thank you for your interest in joining Saibaba Group! Visit careers@saibabagroup.com to view current openings and submit your application.',
        'success'
    );
};

/**
 * Handle Apply/Career buttons
 */
const handleApply = (e) => {
    e.preventDefault();
    showNotification(
        '📝 Career Application',
        'We\'re excited about your interest! Our HR team will reach out to discuss opportunities. Email your resume to hr@saibabagroup.com',
        'info'
    );
};

/**
 * Handle Request Charitable Contribution
 */
const handleContribution = (e) => {
    e.preventDefault();
    showNotification(
        '❤️ Charitable Contribution Request',
        'Saibaba Cares is committed to giving back! Submit your request to cares@saibabagroup.com with details about your organization and event.',
        'info'
    );
};

/**
 * Handle Locations link
 */
const handleLocations = (e) => {
    if (e.target.closest('a[href="#locations"]') && !document.querySelector('#locations')) {
        e.preventDefault();
        showNotification(
            '📍 Find Our Locations',
            'Our Dunkin\' locations are spread across multiple states! Visit locations.saibabagroup.com to find the nearest one to you.',
            'info'
        );
    }
};

/**
 * Handle Team/About links
 */
const handleAboutLinks = (e) => {
    const link = e.target.closest('a');
    if (!link) return;
    
    const href = link.getAttribute('href');
    const targetSection = document.querySelector(href);
    
    if (!targetSection && (href === '#team' || href === '#about' || href === '#difference' || href === '#cares')) {
        e.preventDefault();
        const messages = {
            '#team': {
                title: '👥 Our Team',
                message: 'Meet the dedicated professionals behind Saibaba Group who make excellence happen every day!'
            },
            '#about': {
                title: 'ℹ️ About Us',
                message: 'Saibaba Group has been proudly serving communities as a Dunkin\' franchise network for over 15 years.'
            },
            '#difference': {
                title: '⭐ The Saibaba Difference',
                message: 'Our commitment to Mission, Vision & Values sets us apart in the franchise industry.'
            },
            '#cares': {
                title: '💝 Saibaba Cares',
                message: 'Community involvement and philanthropy are at the heart of everything we do!'
            }
        };
        
        const info = messages[href];
        if (info) {
            showNotification(info.title, info.message, 'info');
        }
    }
};

/**
 * Handle Read More links for news articles
 */
const handleNewsReadMore = (e) => {
    const link = e.target.closest('.read-more, a[href="#all-news"]');
    if (link) {
        e.preventDefault();
        const isAllNews = link.getAttribute('href') === '#all-news';
        showNotification(
            '📰 News & Updates',
            isAllNews 
                ? 'Stay updated with all our latest news and store development updates! Visit news.saibabagroup.com'
                : 'This article will be available soon. Follow us on social media for the latest updates!',
            'info'
        );
    }
};

/**
 * Handle footer links
 */
const handleFooterLinks = (e) => {
    const link = e.target.closest('a[href="#privacy"], a[href="#cookies"]');
    if (link) {
        e.preventDefault();
        const isPrivacy = link.getAttribute('href') === '#privacy';
        showNotification(
            isPrivacy ? '🔒 Privacy Policy' : '🍪 Cookie Policy',
            isPrivacy 
                ? 'Your privacy is important to us. Our full privacy policy details how we protect your information.'
                : 'We use cookies to enhance your browsing experience. Learn more about our cookie usage policy.',
            'info'
        );
    }
};

/**
 * Handle feature card clicks
 */
const handleFeatureCards = (e) => {
    const card = e.target.closest('.feature-card');
    if (!card || card.querySelector('a')) return; // Skip if card has a link
    
    const heading = card.querySelector('h3')?.textContent;
    const messages = {
        'Mission, Vision, & Values': {
            title: '🎯 Mission, Vision, & Values',
            message: 'Excellence, Integrity, Community, and Service drive everything we do at Saibaba Group!'
        },
        'Locations': {
            title: '📍 Our Locations',
            message: 'Find your nearest Saibaba Group Dunkin\' location and experience America\'s Favorite Coffee!'
        }
    };
    
    const info = messages[heading];
    if (info) {
        showNotification(info.title, info.message, 'info');
    }
};

// ============================================
// ATTACH EVENT LISTENERS
// ============================================

// Order Catering buttons
document.querySelectorAll('a[href="#catering"]').forEach(btn => {
    btn.addEventListener('click', handleOrderCatering);
});

// Join Our Team / Career buttons
document.querySelectorAll('a[href="#careers"], a[href="#apply"]').forEach(btn => {
    btn.addEventListener('click', btn.getAttribute('href') === '#apply' ? handleApply : handleJoinTeam);
});

// Charitable Contribution buttons
document.querySelectorAll('a[href="#contribution"]').forEach(btn => {
    btn.addEventListener('click', handleContribution);
});

// General link handling
document.addEventListener('click', (e) => {
    handleLocations(e);
    handleAboutLinks(e);
    handleNewsReadMore(e);
    handleFooterLinks(e);
});

// Feature card clicks
document.querySelectorAll('.feature-card').forEach(card => {
    if (!card.querySelector('a')) {
        card.style.cursor = 'pointer';
        card.addEventListener('click', handleFeatureCards);
    }
});

// Logo click handler
document.querySelector('.logo').addEventListener('click', (e) => {
    const href = e.currentTarget.getAttribute('href');
    if (href === '#') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});

// ============================================
// CONTACT FORM HANDLING
// ============================================

const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            subject: formData.get('subject'),
            message: formData.get('message')
        };
        
        // Show success notification
        showNotification(
            '✅ Message Sent!',
            `Thank you, ${data.name}! We've received your message and will get back to you at ${data.email} within 24-48 hours.`,
            'success'
        );
        
        // Reset form
        contactForm.reset();
        
        // Log to console (in production, this would send to a server)
        console.log('Contact Form Submission:', data);
    });
}

// ============================================
// LOCATION DIRECTIONS HANDLING
// ============================================

document.querySelectorAll('.location-card .btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const card = e.target.closest('.location-card');
        const locationName = card.querySelector('h3').textContent;
        const address = card.querySelector('.location-address').textContent.replace(/\n/g, ' ');
        
        showNotification(
            '🗺️ Getting Directions',
            `Opening directions to ${locationName}. In a real application, this would open Google Maps with the address: ${address}`,
            'info'
        );
        
        // In production, you would open Google Maps:
        // window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`);
    });
});
