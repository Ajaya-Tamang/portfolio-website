// Preloader Animation
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    const counter = document.querySelector('.counter');
    let count = 0;

    const updateCounter = () => {
        if (count < 100) {
            count++;
            counter.textContent = count;
            setTimeout(updateCounter, 20);
        } else {
            // Fade out preloader
            gsap.to(preloader, {
                opacity: 0,
                duration: 1,
                onComplete: () => {
                    preloader.style.display = 'none';
                    // Start page animations
                    initializeAnimations();
                }
            });
        }
    };

    updateCounter();
});

function initializeAnimations() {
    // Your existing animation code here
    const heroTitle = document.querySelector('.hero-content h1');
    gsap.from(heroTitle, {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: 'power4.out'
    });
    
    // Initialize other animations
    // ... rest of your animation code
}
// Initialize core functionality
document.addEventListener('DOMContentLoaded', () => {
    // Create 3D background with Three.js
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#hero-canvas'),
        alpha: true
    });
    
    // Custom shader material for dynamic background
    const vertexShader = `
        varying vec2 vUv;
        void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `;
    
    const fragmentShader = `
        varying vec2 vUv;
        uniform float time;
        
        void main() {
            vec3 color = 0.5 + 0.5 * cos(time + vUv.xyx + vec3(0,2,4));
            gl_FragColor = vec4(color, 1.0);
        }
    `;
    
    // Initialize magnetic cursor
    const cursor = {
        x: 0,
        y: 0,
        targetX: 0,
        targetY: 0
    };
    
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    
    document.addEventListener('mousemove', (e) => {
        cursor.targetX = e.clientX;
        cursor.targetY = e.clientY;
    });
    
    // Smooth cursor animation
    const animateCursor = () => {
        cursor.x += (cursor.targetX - cursor.x) * 0.1;
        cursor.y += (cursor.targetY - cursor.y) * 0.1;
        
        cursorDot.style.transform = `translate(${cursor.x}px, ${cursor.y}px)`;
        cursorOutline.style.transform = `translate(${cursor.x - 20}px, ${cursor.y - 20}px)`;
        
        requestAnimationFrame(animateCursor);
    };
    
    animateCursor();
    
    // Magnetic elements
    const magneticElements = document.querySelectorAll('.magnetic');
    magneticElements.forEach(elem => {
        elem.addEventListener('mousemove', (e) => {
            const rect = elem.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            gsap.to(elem, {
                x: x * 0.3,
                y: y * 0.3,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        elem.addEventListener('mouseleave', () => {
            gsap.to(elem, {
                x: 0,
                y: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });
    
    // Smooth scroll with GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    
    // Reveal animations
    gsap.utils.toArray('.reveal').forEach(elem => {
        gsap.from(elem, {
            y: 100,
            opacity: 0,
            duration: 1.5,
            ease: 'power4.out',
            scrollTrigger: {
                trigger: elem,
                start: 'top 80%',
                end: 'top 20%',
                toggleActions: 'play none none reverse'
            }
        });
    });
    
    // Work grid animations
    const workItems = gsap.utils.toArray('.work-item');
    workItems.forEach(item => {
        const img = item.querySelector('img');
        
        gsap.to(img, {
            scale: 1,
            duration: 1,
            ease: 'power2.inOut',
            scrollTrigger: {
                trigger: item,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1
            }
        });
    });
    
    // Menu toggle animation
    const menuButton = document.querySelector('.menu-button');
    const fullscreenMenu = document.querySelector('.fullscreen-menu');
    let menuOpen = false;
    
    menuButton.addEventListener('click', () => {
        if (!menuOpen) {
            fullscreenMenu.classList.add('active');
            gsap.from('.menu-item', {
                y: 100,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: 'power4.out'
            });
        } else {
            fullscreenMenu.classList.remove('active');
        }
        menuOpen = !menuOpen;
    });
    
    // Initialize smooth scroll
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
    });
    
    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    
    requestAnimationFrame(raf);
});
