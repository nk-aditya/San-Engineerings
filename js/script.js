// ===================================
// SAN ENGINEERINGS - Main JavaScript
// ===================================

// Mobile Menu Toggle
const mobileMenu = document.querySelector('.mobile-menu');
const nav = document.querySelector('nav');

if (mobileMenu) {
    mobileMenu.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        nav.classList.toggle('active');
    });
}

// Close mobile menu when a link is clicked
const navLinks = document.querySelectorAll('nav a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        nav.classList.remove('active');
    });
});

// Scroll Animation - Add fade-in effect when elements come into view
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all cards and sections
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.service-card, .project-card, .blog-card');
    cards.forEach(card => {
        observer.observe(card);
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Active navigation link based on scroll position
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section, [id]');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Form Submission Handler
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    const nextField = contactForm.querySelector('input[name="_next"]');
    if (nextField) {
        nextField.value = new URL('thank-you.html', window.location.href).href;
    }

    contactForm.addEventListener('submit', function(e) {
        // Let formsubmit.co handle the submission
        // This just provides visual feedback
        console.log('Form submitted to formsubmit.co');
    });
}

// Scroll to Top Button
window.addEventListener('scroll', () => {
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    if (scrollTopBtn) {
        if (window.pageYOffset > 300) {
            scrollTopBtn.style.display = 'block';
        } else {
            scrollTopBtn.style.display = 'none';
        }
    }
});

// Add scroll top button styling dynamically
const style = document.createElement('style');
style.textContent = `
    #scrollTopBtn {
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: var(--primary-blue);
        color: white;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        font-size: 24px;
        cursor: pointer;
        display: none;
        z-index: 99;
        transition: all 0.3s ease;
        box-shadow: 0 5px 15px rgba(0, 29, 158, 0.3);
    }

    #scrollTopBtn:hover {
        background: var(--accent-blue);
        transform: translateY(-5px);
        box-shadow: 0 8px 25px rgba(0, 102, 255, 0.4);
    }

    @media (max-width: 768px) {
        #scrollTopBtn {
            bottom: 20px;
            right: 20px;
            width: 45px;
            height: 45px;
            font-size: 20px;
        }
    }
`;
document.head.appendChild(style);

// ===================================
// IMAGE GALLERY FUNCTIONALITY
// ===================================

// Gallery image data for each service
const galleryData = {
    pools: {
        path: 'assets/pools/',
        prefix: 'Swimming_Pool_Image',
        count: 10,
        extension: '.jpg'
    },
    fountains: {
        path: 'assets/fountains/',
        prefix: 'Fountain_Image',
        count: 10,
        extension: '.jpg'
    },
    waterfalls: {
        path: 'assets/waterfalls/',
        prefix: 'Waterfall_Image',
        count: 10,
        extension: ['.jpg', '.jpeg'] // Mixed extensions
    },
    jacuzzi: {
        path: 'assets/jacuzzi/',
        prefix: 'Jacuzzi_Image',
        count: 10,
        extension: '.jpg'
    },
    tiles: {
        path: 'assets/Poll_Tiles/',
        prefix: 'Tile_Image',
        count: 10,
        extension: ['.jpeg', '.jpg'] // Mixed extensions
    },
    maintenance: {
        path: 'assets/maintenance/',
        prefix: 'Maintenance_Image',
        count: 10,
        extension: '.jpg'
    },
};

// Function to get the image path with correct extension
function getImagePath(galleryType, imageNumber) {
    const gallery = galleryData[galleryType];
    if (!gallery) return '';
    
    // Handle projects with custom image names
    if (galleryType === 'projects') {
        return gallery.path + gallery.images[imageNumber - 1];
    }
    
    let extension = gallery.extension;
    
    // Handle waterfalls mixed extensions
    if (galleryType === 'waterfalls') {
        if (imageNumber === 1 || imageNumber === 4 || imageNumber === 10) {
            extension = '.jpg';
        } else {
            extension = '.jpeg';
        }
    } 
    // Handle tiles mixed extensions
    else if (galleryType === 'tiles') {
        if (imageNumber === 2 || imageNumber === 3 || imageNumber === 6 || imageNumber === 8 || imageNumber === 9 || imageNumber === 10) {
            extension = '.jpg';
        } else {
            extension = '.jpeg';
        }
    }
    
    return gallery.path + gallery.prefix + imageNumber + extension;
}

// Function to navigate to next image
function nextImage(button) {
    const gallery = button.closest('.image-gallery');
    const galleryType = gallery.getAttribute('data-gallery');
    const img = gallery.querySelector('.gallery-image');
    
    // Get current index from data attribute, default to 1
    let currentIndex = parseInt(gallery.getAttribute('data-current-index') || 1);
    const totalImages = galleryData[galleryType]?.count || 10;
    
    // Loop to first image if at the end
    let nextIndex = currentIndex + 1;
    if (nextIndex > totalImages) {
        nextIndex = 1;
    }
    
    // Update image and track index
    const newImagePath = getImagePath(galleryType, nextIndex);
    img.src = newImagePath;
    gallery.setAttribute('data-current-index', nextIndex);
}

// Function to navigate to previous image
function previousImage(button) {
    const gallery = button.closest('.image-gallery');
    const galleryType = gallery.getAttribute('data-gallery');
    const img = gallery.querySelector('.gallery-image');
    
    // Get current index from data attribute, default to 1
    let currentIndex = parseInt(gallery.getAttribute('data-current-index') || 1);
    const totalImages = galleryData[galleryType]?.count || 10;
    
    // Loop to last image if at the beginning
    let prevIndex = currentIndex - 1;
    if (prevIndex < 1) {
        prevIndex = totalImages;
    }
    
    // Update image and track index
    const newImagePath = getImagePath(galleryType, prevIndex);
    img.src = newImagePath;
    gallery.setAttribute('data-current-index', prevIndex);
}

// Add scroll top button to page
const scrollButton = document.createElement('button');
scrollButton.id = 'scrollTopBtn';
scrollButton.type = 'button';
scrollButton.setAttribute('aria-label', 'Scroll to top');
scrollButton.innerHTML = '&uarr;';
scrollButton.title = 'Scroll to top';
document.body.appendChild(scrollButton);

scrollButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Counter animation for statistics
function animateCounter(element) {
    const originalText = element.innerText;
    const target = parseInt(originalText);
    const suffix = originalText.replace(/[0-9]/g, '').trim() || '+';
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.innerText = target + suffix;
            clearInterval(timer);
        } else {
            element.innerText = Math.floor(current) + suffix;
        }
    }, 16);
}

// Trigger counter animation when stats section is visible
const statsSection = document.querySelector('.stats-section');
if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counters = entry.target.querySelectorAll('.stat-item h3');
                counters.forEach(counter => {
                    animateCounter(counter);
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    statsObserver.observe(statsSection);
}



// Image lazy loading
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

console.log('SAN ENGINEERINGS website loaded successfully!');
