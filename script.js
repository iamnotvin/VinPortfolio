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

// Carousel functionality
function initializeCarousel() {
    const carousel = document.getElementById('design-carousel');
    const prevBtn = document.getElementById('design-prev');
    const nextBtn = document.getElementById('design-next');
    const indicators = document.getElementById('design-indicators');
    
    if (!carousel || !prevBtn || !nextBtn || !indicators) return;

    const items = carousel.querySelectorAll('.carousel-item');
    const indicatorElements = indicators.querySelectorAll('.indicator');
    let currentSlide = 0;
    let autoSlideInterval;

    // Initialize carousel
    showSlide(currentSlide);
    startAutoSlide();

    // Previous button
    prevBtn.addEventListener('click', function() {
        stopAutoSlide();
        currentSlide = (currentSlide - 1 + items.length) % items.length;
        showSlide(currentSlide);
        startAutoSlide();
    });

    // Next button
    nextBtn.addEventListener('click', function() {
        stopAutoSlide();
        currentSlide = (currentSlide + 1) % items.length;
        showSlide(currentSlide);
        startAutoSlide();
    });

    // Indicator clicks
    indicatorElements.forEach((indicator, index) => {
        indicator.addEventListener('click', function() {
            stopAutoSlide();
            currentSlide = index;
            showSlide(currentSlide);
            startAutoSlide();
        });
    });

    // Pause auto-slide on hover
    carousel.addEventListener('mouseenter', stopAutoSlide);
    carousel.addEventListener('mouseleave', startAutoSlide);

    // Touch/swipe support for mobile
    let startX = 0;
    let endX = 0;

    carousel.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
    });

    carousel.addEventListener('touchend', function(e) {
        endX = e.changedTouches[0].clientX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = startX - endX;

        if (Math.abs(diff) > swipeThreshold) {
            stopAutoSlide();
            if (diff > 0) {
                // Swipe left - next slide
                currentSlide = (currentSlide + 1) % items.length;
            } else {
                // Swipe right - previous slide
                currentSlide = (currentSlide - 1 + items.length) % items.length;
            }
            showSlide(currentSlide);
            startAutoSlide();
        }
    }

    function showSlide(index) {
        // Hide all items
        items.forEach(item => {
            item.classList.remove('active');
            item.style.opacity = '0';
            item.style.transform = 'translateX(100px)';
        });

        // Remove active class from all indicators
        indicatorElements.forEach(indicator => {
            indicator.classList.remove('active');
        });

        // Show current item with animation
        setTimeout(() => {
            items[index].classList.add('active');
            items[index].style.opacity = '1';
            items[index].style.transform = 'translateX(0)';
            items[index].style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        }, 100);

        // Activate current indicator
        if (indicatorElements[index]) {
            indicatorElements[index].classList.add('active');
        }
    }

    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            currentSlide = (currentSlide + 1) % items.length;
            showSlide(currentSlide);
        }, 4000); // Change slide every 4 seconds
    }

    function stopAutoSlide() {
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
        }
    }

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            prevBtn.click();
        } else if (e.key === 'ArrowRight') {
            nextBtn.click();
        }
    });
}

// Contact form functionality
function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Basic validation
            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all fields.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            // Simulate form submission
            showNotification('Thank you! Your message has been sent successfully.', 'success');
            this.reset();
        });
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

