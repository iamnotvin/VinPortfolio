// Carousel functionality
let currentSlideIndex = 0;
const slides = document.querySelectorAll('.carousel-item');
const indicators = document.querySelectorAll('.indicator');

function showSlide(index) {
    // Hide all slides
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    // Show current slide
    if (slides[index]) {
        slides[index].classList.add('active');
        indicators[index].classList.add('active');
    }
}

function changeSlide(direction) {
    currentSlideIndex += direction;
    
    if (currentSlideIndex >= slides.length) {
        currentSlideIndex = 0;
    } else if (currentSlideIndex < 0) {
        currentSlideIndex = slides.length - 1;
    }
    
    showSlide(currentSlideIndex);
}

function currentSlide(index) {
    currentSlideIndex = index - 1;
    showSlide(currentSlideIndex);
}

// Auto-play carousel
function autoPlay() {
    changeSlide(1);
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Set up auto-play (optional)
    setInterval(autoPlay, 5000); // Change slide every 5 seconds
    
    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            changeSlide(-1);
        } else if (e.key === 'ArrowRight') {
            changeSlide(1);
        }
    });
});

// Touch/swipe support for mobile
let startX = 0;
let endX = 0;

document.addEventListener('touchstart', function(e) {
    startX = e.touches[0].clientX;
});

document.addEventListener('touchend', function(e) {
    endX = e.changedTouches[0].clientX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = startX - endX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            changeSlide(1); // Swipe left - next slide
        } else {
            changeSlide(-1); // Swipe right - previous slide
        }
    }
}

