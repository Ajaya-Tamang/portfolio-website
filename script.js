// Initialize AOS
AOS.init({
    duration: 800,
    once: true
});

// Custom Cursor
const cursor = document.querySelector('.cursor');
const cursorTrail = document.querySelector('.cursor-trail');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    setTimeout(() => {
        cursorTrail.style.left = e.clientX + 'px';
        cursorTrail.style.top = e.clientY + 'px';
    }, 100);
});

// Gallery Image Loading
function createGalleryItem(imagePath) {
    const item = document.createElement('div');
    item.className = 'gallery-item';
    item.setAttribute('data-tilt', '');
    
    item.innerHTML = `
        <div class="item-content">
            <img src="${imagePath}" alt="Gallery Image">
            <div class="overlay">
                <h3>${imagePath.split('/').pop()}</h3>
                <button class="view-project">View Project</button>
            </div>
        </div>
    `;
    
    return item;
}

// Load images from assets/images directory
function loadGalleryImages() {
    const galleryContainer = document.querySelector('.gallery-container');
    const imageFiles = []; // Add your image filenames here
    
    // Loop through assets/images directory
    for (const file of imageFiles) {
        const imagePath = `assets/images/${file}`;
        const galleryItem = createGalleryItem(imagePath);
        galleryContainer.appendChild(galleryItem);
    }
    
    // Initialize tilt effect
    VanillaTilt.init(document.querySelectorAll('.gallery-item'), {
        max: 25,
        speed: 400,
        glare: true,
        'max-glare': 0.5
    });
}

// Modal functionality
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImage');
const closeModal = document.querySelector('.close-modal');

document.addEventListener('click', (e) => {
    if (e.target.matches('.gallery-item img')) {
        modal.style.display = 'block';
        modalImg.src = e.target.src;
    }
});

closeModal.onclick = () => {
    modal.style.display = 'none';
};

// Initialize everything when document is ready
document.addEventListener('DOMContentLoaded', () => {
    loadGalleryImages();
});

// Particles.js configuration
particlesJS('particles-js', {
    particles: {
        number: { value: 80 },
        color: { value: '#ffffff' },
        shape: { type: 'circle' },
        opacity: { value: 0.5 },
        size: { value: 3 },
        move: { enable: true, speed: 6 }
    }
});