// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    offset: 150,
    once: true
});

// Optional: Add image loading animation
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('.gallery-item img');
    
    images.forEach(img => {
        img.addEventListener('load', () => {
            img.style.opacity = 1;
        });
    });
});

// Optional: Add click handler for gallery items
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
        // Add your custom click behavior here
        // For example, open a modal with project details
    });
});
