// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initializeNavigation();
    initializeScrollEffects();
    initializeContactForm();
    initializeSkillsAnimation();
    initializeImageZoom();
    initializeCarousel();
    initPortfolioCarousel();
    initPortfolioZoom();
    initializeScrollIndicator();
});

// Navigation functionality
function initializeNavigation() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    if (mobileMenu) {
        mobileMenu.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar background on scroll
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });

    // Active navigation highlighting
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 120;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) navLink.classList.add('active');
            }
        });
    });
}

// Scroll effects and animations
function initializeScrollEffects() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.experience-item, .tool-item, .project-category, .contact-item, .cert-item, .portfolio-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroSection = document.querySelector('.hero-section');
        if (heroSection && scrolled < window.innerHeight) {
            const rate = scrolled * -0.3;
            heroSection.style.transform = `translateY(${rate}px)`;
        }
    });
}

// Skills animation
function initializeSkillsAnimation() {
    const skillsSection = document.getElementById('skills');
    const skillBars = document.querySelectorAll('.skill-progress');
    let skillsAnimated = false;

    const skillsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !skillsAnimated) {
                animateSkillBars();
                skillsAnimated = true;
            }
        });
    }, { threshold: 0.3 });

    if (skillsSection) {
        skillsObserver.observe(skillsSection);
    }

    function animateSkillBars() {
        skillBars.forEach((bar, index) => {
            const skillLevel = bar.getAttribute('data-skill');
            setTimeout(() => {
                bar.style.width = skillLevel + '%';
            }, index * 100);
        });
    }
}

// Image zoom functionality
function initializeImageZoom() {
    const zoomableImages = document.querySelectorAll('.zoomable-image');
    const modal = document.getElementById('image-modal');
    const modalImage = document.getElementById('modal-image');
    const closeModal = document.querySelector('.close-modal');

    zoomableImages.forEach(image => {
        image.addEventListener('click', function() {
            // For now, show a placeholder since we don't have actual images
            // In a real implementation, you would set the src to the actual image
            showImageModal('placeholder-image.jpg', 'Profile Image');
        });

        // Add hover effect
        image.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s ease';
        });

        image.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    function showImageModal(imageSrc, imageAlt) {
        if (modal && modalImage) {
            // For demonstration, we'll show a message instead of an actual image
            showNotification('Image zoom functionality ready! Add your actual images to enable full zoom feature.', 'info');
        }
    }

    // Modal close handlers
    if (closeModal) {
        closeModal.addEventListener('click', closeImageModal);
    }

    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeImageModal();
            }
        });
    }

    // Keyboard navigation for modal
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal && modal.style.display === 'block') {
            closeImageModal();
        }
    });

    function closeImageModal() {
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }
}

// Enhanced Carousel functionality with layered positioning and zoom effects
class EnhancedCarousel {
    constructor(containerSelector) {
        this.container = document.querySelector(containerSelector);
        this.items = [];
        this.currentIndex = 0;
        this.isZoomed = false;
        this.autoPlayInterval = null;
        this.autoPlayDelay = 4000;
        
        this.init();
    }
    
    init() {
        if (!this.container) {
            console.error('Carousel container not found');
            return;
        }
        
        this.items = Array.from(this.container.querySelectorAll('.carousel-item'));
        this.setupEventListeners();
        this.updatePositions();
        this.startAutoPlay();
        
        // Add zoom overlay
        this.createZoomOverlay();
    }
    
    createZoomOverlay() {
        const overlay = document.createElement('div');
        overlay.className = 'zoom-overlay';
        overlay.addEventListener('click', () => this.closeZoom());
        document.body.appendChild(overlay);
        this.zoomOverlay = overlay;
    }
    
    setupEventListeners() {
        // Navigation buttons
        const prevBtn = document.querySelector('.carousel-btn.prev');
        const nextBtn = document.querySelector('.carousel-btn.next');
        
        if (prevBtn) prevBtn.addEventListener('click', () => this.prev());
        if (nextBtn) nextBtn.addEventListener('click', () => this.next());
        
        // Indicators
        const indicators = document.querySelectorAll('.indicator');
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToSlide(index));
        });
        
        // Item click events for zoom
        this.items.forEach((item, index) => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                if (this.isZoomed) {
                    this.closeZoom();
                } else {
                    this.zoomItem(item);
                }
            });
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prev();
            if (e.key === 'ArrowRight') this.next();
            if (e.key === 'Escape') this.closeZoom();
        });
        
        // Touch/swipe support
        this.setupTouchEvents();
        
        // Pause auto-play on hover
        this.container.addEventListener('mouseenter', () => this.stopAutoPlay());
        this.container.addEventListener('mouseleave', () => this.startAutoPlay());
    }
    
    setupTouchEvents() {
        let startX = 0;
        let endX = 0;
        
        this.container.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });
        
        this.container.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            this.handleSwipe(startX, endX);
        });
    }
    
    handleSwipe(startX, endX) {
        const swipeThreshold = 50;
        const diff = startX - endX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                this.next(); // Swipe left - next slide
            } else {
                this.prev(); // Swipe right - previous slide
            }
        }
    }
    
    updatePositions() {
        this.items.forEach((item, index) => {
            // Remove all position classes
            item.classList.remove('active', 'prev-1', 'prev-2', 'next-1', 'next-2', 'hidden');
            
            const position = this.getRelativePosition(index);
            
            switch (position) {
                case 0:
                    item.classList.add('active');
                    break;
                case -1:
                    item.classList.add('prev-1');
                    break;
                case -2:
                    item.classList.add('prev-2');
                    break;
                case 1:
                    item.classList.add('next-1');
                    break;
                case 2:
                    item.classList.add('next-2');
                    break;
                default:
                    item.classList.add('hidden');
                    break;
            }
        });
        
        this.updateIndicators();
    }
    
    getRelativePosition(index) {
        let position = index - this.currentIndex;
        const totalItems = this.items.length;
        
        // Handle circular positioning
        if (position > totalItems / 2) {
            position -= totalItems;
        } else if (position < -totalItems / 2) {
            position += totalItems;
        }
        
        return position;
    }
    
    updateIndicators() {
        const indicators = document.querySelectorAll('.indicator');
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentIndex);
        });
    }
    
    next() {
        if (this.isZoomed) return;
        
        this.stopAutoPlay();
        this.currentIndex = (this.currentIndex + 1) % this.items.length;
        this.updatePositions();
        this.startAutoPlay();
    }
    
    prev() {
        if (this.isZoomed) return;
        
        this.stopAutoPlay();
        this.currentIndex = (this.currentIndex - 1 + this.items.length) % this.items.length;
        this.updatePositions();
        this.startAutoPlay();
    }
    
    goToSlide(index) {
        if (this.isZoomed) return;
        
        this.stopAutoPlay();
        this.currentIndex = index;
        this.updatePositions();
        this.startAutoPlay();
    }
    
    zoomItem(item) {
        if (this.isZoomed) return;
        
        this.isZoomed = true;
        this.stopAutoPlay();
        
        // Add zoom class to the item
        item.classList.add('zoomed');
        
        // Show overlay
        this.zoomOverlay.classList.add('active');
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
        
        // Add escape listener
        document.addEventListener('keydown', this.escapeHandler);
    }
    
    closeZoom() {
        if (!this.isZoomed) return;
        
        this.isZoomed = false;
        
        // Remove zoom class from all items
        this.items.forEach(item => item.classList.remove('zoomed'));
        
        // Hide overlay
        this.zoomOverlay.classList.remove('active');
        
        // Restore body scroll
        document.body.style.overflow = 'auto';
        
        // Remove escape listener
        document.removeEventListener('keydown', this.escapeHandler);
        
        // Restart auto-play
        this.startAutoPlay();
    }
    
    escapeHandler = (e) => {
        if (e.key === 'Escape') {
            this.closeZoom();
        }
    }
    
    startAutoPlay() {
        this.stopAutoPlay();
        this.autoPlayInterval = setInterval(() => {
            if (!this.isZoomed) {
                this.next();
            }
        }, this.autoPlayDelay);
    }
    
    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }
    
    // Public methods for external control
    destroy() {
        this.stopAutoPlay();
        document.removeEventListener('keydown', this.escapeHandler);
        if (this.zoomOverlay && this.zoomOverlay.parentNode) {
            this.zoomOverlay.parentNode.removeChild(this.zoomOverlay);
        }
    }
    
    addItem(itemHTML) {
        const newItem = document.createElement('div');
        newItem.className = 'carousel-item';
        newItem.innerHTML = itemHTML;
        
        // Add click event for zoom
        newItem.addEventListener('click', (e) => {
            e.preventDefault();
            if (this.isZoomed) {
                this.closeZoom();
            } else {
                this.zoomItem(newItem);
            }
        });
        
        this.container.querySelector('.carousel-track').appendChild(newItem);
        this.items = Array.from(this.container.querySelectorAll('.carousel-item'));
        this.updatePositions();
    }
    
    removeItem(index) {
        if (index >= 0 && index < this.items.length) {
            this.items[index].remove();
            this.items = Array.from(this.container.querySelectorAll('.carousel-item'));
            
            // Adjust current index if necessary
            if (this.currentIndex >= this.items.length) {
                this.currentIndex = this.items.length - 1;
            }
            
            this.updatePositions();
        }
    }
}


    // Real-time form validation
    const formInputs = document.querySelectorAll('#contact-form input, #contact-form textarea');
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });

        input.addEventListener('input', function() {
            clearFieldError(this);
        });
    });
}

function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.getAttribute('name');
    
    clearFieldError(field);
    
    if (!value) {
        showFieldError(field, `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required.`);
        return false;
    }
    
    if (fieldName === 'email' && !isValidEmail(value)) {
        showFieldError(field, 'Please enter a valid email address.');
        return false;
    }
    
    return true;
}

function showFieldError(field, message) {
    field.style.borderColor = '#e74c3c';
    
    let errorElement = field.parentNode.querySelector('.field-error');
    if (!errorElement) {
        errorElement = document.createElement('span');
        errorElement.className = 'field-error';
        errorElement.style.cssText = 'color: #e74c3c; font-size: 0.8rem; margin-top: 5px; display: block;';
        field.parentNode.appendChild(errorElement);
    }
    errorElement.textContent = message;
}

function clearFieldError(field) {
    field.style.borderColor = '#E1E5E9';
    const errorElement = field.parentNode.querySelector('.field-error');
    if (errorElement) {
        errorElement.remove();
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Styling
    const bgColor = type === 'success' ? '#1B4D3E' : type === 'error' ? '#e74c3c' : '#F1C40F';
    const textColor = type === 'info' ? '#2C3E50' : '#FFFFFF';
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${bgColor};
        color: ${textColor};
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1000;
        font-weight: 500;
        max-width: 300px;
        animation: slideInRight 0.3s ease;
        border-left: 4px solid ${type === 'info' ? '#FFD700' : bgColor};
    `;
    
    // Add animation keyframes if not already present
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOutRight {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}

// Scroll indicator functionality
function initializeScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
        
        // Hide scroll indicator after scrolling
        window.addEventListener('scroll', function() {
            if (window.scrollY > 200) {
                scrollIndicator.style.opacity = '0';
                scrollIndicator.style.pointerEvents = 'none';
            } else {
                scrollIndicator.style.opacity = '1';
                scrollIndicator.style.pointerEvents = 'auto';
            }
        });
   // Portfolio Carousel Functionality
function initPortfolioCarousel() {
    const carousel = document.getElementById('portfolio-carousel');
    const items = carousel.querySelectorAll('.portfolio-carousel-item');
    const prevBtn = document.getElementById('portfolio-prev');
    const nextBtn = document.getElementById('portfolio-next');
    const indicators = document.querySelectorAll('.portfolio-indicator');
    let currentSlide = 0;

    function showSlide(index) {
        // Hide all items
        items.forEach(item => item.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        // Show current item
        items[index].classList.add('active');
        indicators[index].classList.add('active');
        
        currentSlide = index;
    }

    function nextSlide() {
        const next = (currentSlide + 1) % items.length;
        showSlide(next);
    }

    function prevSlide() {
        const prev = (currentSlide - 1 + items.length) % items.length;
        showSlide(prev);
    }

    // Event listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // Indicator clicks
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => showSlide(index));
    });

    // Auto-slide functionality
    let autoSlideInterval = setInterval(nextSlide, 5000);

    // Pause auto-slide on hover
    carousel.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });

    carousel.addEventListener('mouseleave', () => {
        autoSlideInterval = setInterval(nextSlide, 5000);
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
    });
}

// Portfolio Image Zoom Functionality
function initPortfolioZoom() {
    const zoomableImages = document.querySelectorAll('.zoomable-portfolio');
    
    zoomableImages.forEach(image => {
        image.addEventListener('click', () => {
            showNotification('Portfolio zoom functionality ready! Add your actual images to enable full zoom feature.');
        });
    });
}howNotification(`${title} - Portfolio item clicked! Add your actual portfolio content here.`, 'info');
        });

        // Add hover effects
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
            this.style.transition = 'all 0.3s ease';
        });

        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Initialize portfolio gallery when DOM is loaded
document.addEventListener('DOMContentLoaded', initializePortfolioGallery);

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Performance optimization
const debouncedScrollHandler = debounce(function() {
    // Handle scroll events that don't need to run on every scroll
}, 100);

window.addEventListener('scroll', debouncedScrollHandler);

// Lazy loading for images (when actual images are added)
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
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
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', initializeLazyLoading);

// Accessibility improvements
document.addEventListener('keydown', function(e) {
    // Skip to main content with Tab key
    if (e.key === 'Tab' && !e.shiftKey && document.activeElement === document.body) {
        const mainContent = document.querySelector('main') || document.querySelector('#home');
        if (mainContent) {
            mainContent.focus();
            e.preventDefault();
        }
    }
});

// Reduced motion support
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
    // Disable animations for users who prefer reduced motion
    document.documentElement.style.setProperty('--transition-fast', '0s');
    document.documentElement.style.setProperty('--transition-medium', '0s');
    document.documentElement.style.setProperty('--transition-slow', '0s');
}

// Print styles optimization
window.addEventListener('beforeprint', function() {
    // Optimize for printing
    document.body.classList.add('printing');
});

window.addEventListener('afterprint', function() {
    document.body.classList.remove('printing');
});

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // Could send error reports to analytics service
});

// Service Worker registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Uncomment when you have a service worker file
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered'))
        //     .catch(error => console.log('SW registration failed'));
    });
}

// Add smooth reveal animations for sections
function initializeSectionAnimations() {
    const sections = document.querySelectorAll('section');
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        sectionObserver.observe(section);
    });
}

// Initialize section animations
document.addEventListener('DOMContentLoaded', initializeSectionAnimations);

// Add interactive hover effects for tool items
function initializeToolInteractions() {
    const toolItems = document.querySelectorAll('.tool-item');
    
    toolItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
            this.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
        });

        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '';
        });
    });
}

// Initialize tool interactions
document.addEventListener('DOMContentLoaded', initializeToolInteractions);

// Add click-to-copy functionality for contact information
function initializeContactCopy() {
    const contactDetails = document.querySelectorAll('.contact-details p');
    
    contactDetails.forEach(detail => {
        detail.style.cursor = 'pointer';
        detail.title = 'Click to copy';
        
        detail.addEventListener('click', function() {
            const text = this.textContent;
            navigator.clipboard.writeText(text).then(() => {
                showNotification(`Copied: ${text}`, 'success');
            }).catch(() => {
                showNotification('Failed to copy to clipboard', 'error');
            });
        });
    });
}

// Initialize contact copy functionality
document.addEventListener('DOMContentLoaded', initializeContactCopy);

