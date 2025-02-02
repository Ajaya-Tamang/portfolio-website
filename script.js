// Initialize AOS
AOS.init({
    duration: 1000,
    once: true
});

// Custom cursor
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1
    });
    
    gsap.to(follower, {
        x: e.clientX - 15,
        y: e.clientY - 15,
        duration: 0.3
    });
});

// Navigation menu
const menuBtn = document.querySelector('.menu-btn');
const navOverlay = document.querySelector('.nav-overlay');
let menuOpen = false;

menuBtn.addEventListener('click', () => {
    if(!menuOpen) {
        menuBtn.classList.add('open');
        navOverlay.classList.add('active');
        menuOpen = true;
    } else {
        menuBtn.classList.remove('open');
        navOverlay.classList.remove('active');
        menuOpen = false;
    }
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Portfolio hover effect
document.querySelectorAll('.portfolio-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        gsap.to(item.querySelector('img'), {
            scale: 1.1,
            duration: 0.5
        });
    });
    
    item.addEventListener('mouseleave', () => {
        gsap.to(item.querySelector('img'), {
            scale: 1,
            duration: 0.5
        });
    });
});

// Noise canvas background
const canvas = document.getElementById('noise-canvas');
const ctx = canvas.getContext('2d');
