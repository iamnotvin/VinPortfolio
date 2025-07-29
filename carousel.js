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

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the enhanced carousel
    const carousel = new EnhancedCarousel('.carousel');
    
    // Make carousel globally accessible for debugging
    window.carousel = carousel;
    
    // Add some sample items if none exist
    const carouselTrack = document.querySelector('.carousel-track');
    if (carouselTrack && carouselTrack.children.length === 0) {
        const sampleItems = [
            '<div class="design-placeholder">Sample Image 1</div>',
            '<div class="design-placeholder">Sample Image 2</div>',
            '<div class="design-placeholder">Sample Image 3</div>',
            '<div class="design-placeholder">Sample Image 4</div>',
            '<div class="design-placeholder">Sample Image 5</div>'
        ];
        
        sampleItems.forEach(itemHTML => {
            carousel.addItem(itemHTML);
        });
    }
});

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EnhancedCarousel;
}
