// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Enhanced Lightbox functionality
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const close = document.querySelector('.close');

// Add loading animation
function showLoading(img) {
    img.style.opacity = '0';
    img.onload = () => {
        img.style.opacity = '1';
    };
}

// Gallery image click handler
document.querySelectorAll('.gallery-item img').forEach(image => {
    image.addEventListener('click', () => {
        lightbox.style.display = 'block';
        lightboxImg.src = image.src;
        showLoading(lightboxImg);
    });
});

// Close handlers
close.addEventListener('click', () => {
    lightbox.style.display = 'none';
});

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.style.display = 'none';
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        lightbox.style.display = 'none';
    }
});

// Theme toggle functionality
const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = themeToggle.querySelector('i');

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    themeIcon.classList.toggle('fa-sun');
    themeIcon.classList.toggle('fa-moon');
});

// Form submission animation
const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const button = form.querySelector('button');
    button.innerHTML = 'Sending...';
    setTimeout(() => {
        button.innerHTML = 'Message Sent!';
        form.reset();
        setTimeout(() => {
            button.innerHTML = 'Send Message';
        }, 2000);
    }, 1500);
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

document.querySelectorAll('.gallery-item, .section-title').forEach(el => {
    observer.observe(el);
});
