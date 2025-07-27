# Portfolio Website

A modern, mobile-friendly portfolio website designed for digital marketing and web development professionals. Features a bold homepage with hero section, interactive galleries, and responsive design.

## Features

- **Responsive Design**: Mobile-first approach with seamless desktop and mobile experience
- **Modern UI/UX**: Clean, minimal design with smooth animations and transitions
- **Interactive Elements**: 
  - Mobile navigation menu
  - Interactive project galleries with modal views
  - Contact form with validation
  - Smooth scrolling navigation
- **Performance Optimized**: Fast loading with optimized images and code
- **Accessibility**: WCAG compliant with proper focus states and keyboard navigation
- **Color Scheme**: Professional palette using black, white, soft green (#2d5a27), and soft yellow (#f4e04d)

## Sections

1. **Hero Section**: Full-width hero with compelling headline and call-to-action buttons
2. **About**: Professional background highlighting experience in digital marketing, web development, graphic design, and technical support
3. **Services**: Six key service offerings with icons and descriptions
4. **Projects**: 
   - Web Development Portfolio (3 interactive gallery items)
   - Design Projects (3 interactive gallery items)
   - Video Content (1 video placeholder)
5. **Contact**: Contact form, contact information, and social media links

## Technologies Used

- **HTML5**: Semantic markup with accessibility features
- **CSS3**: Modern CSS with CSS Grid, Flexbox, and custom properties
- **JavaScript (ES6+)**: Interactive functionality and form handling
- **Google Fonts**: Inter font family for clean typography
- **Responsive Images**: Optimized for different screen sizes

## File Structure

```
portfolio-website/
├── index.html          # Main HTML file
├── style.css           # CSS styles and responsive design
├── script.js           # JavaScript functionality
├── hero_image.jpg      # Hero section background image
└── README.md           # This file
```

## Quick Start

### Option 1: Simple HTTP Server (Recommended for testing)

1. Clone or download the repository
2. Navigate to the project directory
3. Start a local server:
   ```bash
   # Using Python 3
   python3 -m http.server 8000
   
   # Using Node.js (if you have http-server installed)
   npx http-server
   
   # Using PHP
   php -S localhost:8000
   ```
4. Open your browser and visit `http://localhost:8000`

### Option 2: Direct File Opening

1. Download all files to a local directory
2. Open `index.html` directly in your web browser
3. Note: Some features may not work properly due to CORS restrictions

## GitHub Deployment

### GitHub Pages

1. Create a new repository on GitHub
2. Upload all files to the repository
3. Go to repository Settings > Pages
4. Select "Deploy from a branch" 
5. Choose "main" branch and "/ (root)" folder
6. Your site will be available at `https://yourusername.github.io/repository-name`

### Manual Deployment Steps

1. **Create Repository**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Portfolio website"
   git branch -M main
   git remote add origin https://github.com/yourusername/portfolio-website.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**:
   - Go to your repository on GitHub
   - Click on "Settings" tab
   - Scroll down to "Pages" section
   - Under "Source", select "Deploy from a branch"
   - Select "main" branch and "/ (root)" folder
   - Click "Save"

## Customization Guide

### Personal Information

1. **Update Content**: Replace placeholder text in `index.html`:
   - Hero title and subtitle
   - About section description
   - Contact information (email, location)
   - Social media links

2. **Replace Images**: 
   - Replace `hero_image.jpg` with your preferred hero image
   - Update project gallery placeholder images with actual project screenshots
   - Ensure images are optimized for web (recommended: WebP format, max 1MB)

3. **Color Scheme**: Modify CSS custom properties in `style.css`:
   ```css
   :root {
     --primary-black: #1a1a1a;
     --soft-green: #2d5a27;
     --soft-yellow: #f4e04d;
     /* Add your custom colors */
   }
   ```

### Adding Projects

1. **Gallery Items**: Add new project items in the HTML:
   ```html
   <div class="gallery-item" data-category="web">
     <div class="gallery-image">
       <img src="your-project-image.jpg" alt="Project Description">
     </div>
     <div class="gallery-content">
       <h4>Project Title</h4>
       <p>Project description</p>
     </div>
   </div>
   ```

2. **Project Images**: Place project images in the same directory and reference them in the HTML

### Contact Form

The contact form currently includes client-side validation and a simulated submission. For production use:

1. **Backend Integration**: Connect to a backend service (Node.js, PHP, etc.)
2. **Third-party Services**: Use services like Formspree, Netlify Forms, or EmailJS
3. **Update JavaScript**: Modify the form submission handler in `script.js`

## Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Optimization

- **Images**: Compress images and use modern formats (WebP)
- **CSS**: Minify CSS for production
- **JavaScript**: Minify JavaScript for production
- **Fonts**: Use font-display: swap for better loading performance
- **Caching**: Implement proper caching headers on your server

## SEO Optimization

1. **Meta Tags**: Add relevant meta tags to `<head>`:
   ```html
   <meta name="description" content="Your portfolio description">
   <meta name="keywords" content="web development, digital marketing, graphic design">
   <meta property="og:title" content="Your Name - Portfolio">
   <meta property="og:description" content="Your portfolio description">
   <meta property="og:image" content="your-og-image.jpg">
   ```

2. **Structured Data**: Add JSON-LD structured data for better search engine understanding

3. **Alt Text**: Ensure all images have descriptive alt text

## Accessibility Features

- Semantic HTML structure
- Proper heading hierarchy
- Focus indicators for keyboard navigation
- ARIA labels where appropriate
- Color contrast compliance
- Reduced motion support for users with vestibular disorders

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For questions or support, please contact [your-email@example.com] or create an issue in the GitHub repository.

## Changelog

### Version 1.0.0 (2025-01-27)
- Initial release
- Responsive design implementation
- Interactive galleries
- Contact form with validation
- Mobile navigation
- Performance optimizations

---

**Built with ❤️ for digital professionals**

