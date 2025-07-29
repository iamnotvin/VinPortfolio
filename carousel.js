// Fixed Carousel JavaScript for Vincent's Portfolio
// This file contains the corrected carousel functionality

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing carousels...');
    
    // Initialize Design Carousel
    initDesignCarousel();
    
    // Initialize Portfolio Carousel
    initPortfolioCarousel();
    
    // Initialize other functionality
    initImageZoom();
    initContactForm();
});

// Design Carousel Functionality
function initDesignCarousel() {
    console.log('Initializing design carousel...');
    
    const carousel = document.querySelector('.design-carousel');
    const items = document.querySelectorAll('.design-carousel-item');
    const prevBtn = document.getElementById('design-prev');
    const nextBtn = document.getElementById('design-next');
    const indicators = document.querySelectorAll('.design-indicator');
    
    if (!carousel || items.length === 0) {
        console.log('Design carousel elements not found');
        return;
    }
    
    let currentSlide = 0;
    let autoSlideInterval;

    function showSlide(index) {
        // Remove active class from all items and indicators
        items.forEach(item => item.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        // Add active class to current item and indicator
        if (items[index]) {
            items[index].classList.add('active');
        }
        if (indicators[index]) {
            indicators[index].classList.add('active');
        }
        
        currentSlide = index;
        console.log('Design carousel showing slide:', index);
    }

    function nextSlide() {
        const next = (currentSlide + 1) % items.length;
        showSlide(next);
    }

    function prevSlide() {
        const prev = (currentSlide - 1 + items.length) % items.length;
        showSlide(prev);
    }

    // Event listeners for buttons
    if (nextBtn) {
        nextBtn.addEventListener('click', function(e) {
            e.preventDefault();
            nextSlide();
            resetAutoSlide();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', function(e) {
            e.preventDefault();
            prevSlide();
            resetAutoSlide();
        });
    }

    // Event listeners for indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function(e) {
            e.preventDefault();
            showSlide(index);
            resetAutoSlide();
        });
    });

    // Auto-slide functionality
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 4000);
    }

    function stopAutoSlide() {
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
        }
    }

    function resetAutoSlide() {
        stopAutoSlide();
        startAutoSlide();
    }

    // Pause auto-slide on hover
    carousel.addEventListener('mouseenter', stopAutoSlide);
    carousel.addEventListener('mouseleave', startAutoSlide);

    // Initialize first slide and start auto-slide
    showSlide(0);
    startAutoSlide();
    
    console.log('Design carousel initialized successfully');
}

// Portfolio Carousel Functionality
function initPortfolioCarousel() {
    console.log('Initializing portfolio carousel...');
    
    const carousel = document.getElementById('portfolio-carousel');
    const items = document.querySelectorAll('.portfolio-carousel-item');
    const prevBtn = document.getElementById('portfolio-prev');
    const nextBtn = document.getElementById('portfolio-next');
    const indicators = document.querySelectorAll('.portfolio-indicator');
    
    if (!carousel || items.length === 0) {
        console.log('Portfolio carousel elements not found');
        return;
    }
    
    let currentSlide = 0;
    let autoSlideInterval;

    function showSlide(index) {
        // Remove active class from all items and indicators
        items.forEach(item => item.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        // Add active class to current item and indicator
        if (items[index]) {
            items[index].classList.add('active');
        }
        if (indicators[index]) {
            indicators[index].classList.add('active');
        }
        
        currentSlide = index;
        console.log('Portfolio carousel showing slide:', index);
    }

    function nextSlide() {
        const next = (currentSlide + 1) % items.length;
        showSlide(next);
    }

    function prevSlide() {
        const prev = (currentSlide - 1 + items.length) % items.length;
        showSlide(prev);
    }

    // Event listeners for buttons
    if (nextBtn) {
        nextBtn.addEventListener('click', function(e) {
            e.preventDefault();
            nextSlide();
            resetAutoSlide();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', function(e) {
            e.preventDefault();
            prevSlide();
            resetAutoSlide();
        });
    }

    // Event listeners for indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function(e) {
            e.preventDefault();
            showSlide(index);
            resetAutoSlide();
        });
    });

    // Auto-slide functionality
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 5000);
    }

    function stopAutoSlide() {
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
        }
    }

    function resetAutoSlide() {
        stopAutoSlide();
        startAutoSlide();
    }

    // Pause auto-slide on hover
    carousel.addEventListener('mouseenter', stopAutoSlide);
    carousel.addEventListener('mouseleave', startAutoSlide);

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            prevSlide();
            resetAutoSlide();
        }
        if (e.key === 'ArrowRight') {
            nextSlide();
            resetAutoSlide();
        }
    });

    // Initialize first slide and start auto-slide
    showSlide(0);
    startAutoSlide();
    
    console.log('Portfolio carousel initialized successfully');
}

// Image Zoom Functionality
function initImageZoom() {
    console.log('Initializing image zoom...');
    
    const zoomableImages = document.querySelectorAll('.zoomable-image, .zoomable-portfolio');
    
    zoomableImages.forEach(image => {
        image.addEventListener('click', function() {
            console.log('Image zoom clicked');
            showNotification('Image zoom functionality ready! Add your actual images to enable full zoom feature.');
        });
    });
}

// Contact Form Functionality
function initContactForm() {
    console.log('Initializing contact form...');
    
    const form = document.querySelector('.contact-form');
    if (!form) {
        console.log('Contact form not found');
        return;
    }
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        console.log('Contact form submitted');
        showNotification('Thank you for your message! I will get back to you soon.', 'success');
        form.reset();
    });
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#27AE60' : type === 'error' ? '#E74C3C' : '#3498DB'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        font-family: Inter, sans-serif;
        font-size: 0.9rem;
        max-width: 300px;
        word-wrap: break-word;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Debug function to check carousel elements
function debugCarousels() {
    console.log('=== Carousel Debug Info ===');
    
    // Design carousel
    const designCarousel = document.querySelector('.design-carousel');
    const designItems = document.querySelectorAll('.design-carousel-item');
    const designPrev = document.getElementById('design-prev');
    const designNext = document.getElementById('design-next');
    const designIndicators = document.querySelectorAll('.design-indicator');
    
    console.log('Design Carousel:');
    console.log('- Carousel container:', designCarousel);
    console.log('- Items found:', designItems.length);
    console.log('- Prev button:', designPrev);
    console.log('- Next button:', designNext);
    console.log('- Indicators:', designIndicators.length);
    
    // Portfolio carousel
    const portfolioCarousel = document.getElementById('portfolio-carousel');
    const portfolioItems = document.querySelectorAll('.portfolio-carousel-item');
    const portfolioPrev = document.getElementById('portfolio-prev');
    const portfolioNext = document.getElementById('portfolio-next');
    const portfolioIndicators = document.querySelectorAll('.portfolio-indicator');
    
    console.log('Portfolio Carousel:');
    console.log('- Carousel container:', portfolioCarousel);
    console.log('- Items found:', portfolioItems.length);
    console.log('- Prev button:', portfolioPrev);
    console.log('- Next button:', portfolioNext);
    console.log('- Indicators:', portfolioIndicators.length);
    
    console.log('=== End Debug Info ===');
}

// Call debug function after a short delay to ensure DOM is ready
setTimeout(debugCarousels, 1000);

// Export functions for manual testing
window.debugCarousels = debugCarousels;
window.initDesignCarousel = initDesignCarousel;
window.initPortfolioCarousel = initPortfolioCarousel;
