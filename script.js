// Initialize Locomotive Scroll
const scroll = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: true,
    lerp: 0.05,
    multiplier: 0.5
});

// Loader Animation
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    const loaderText = document.querySelectorAll('.loader-text span');

    gsap.to(loaderText, {
        y: -100,
        stagger: 0.1,
        duration: 1,
        ease: 'power4.out'
    });

    gsap.to(loader, {
        y: '-100%',
        duration: 1.5,
        delay: 1,
        ease: 'power4.inOut'
    });
});

// Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const menuOverlay = document.querySelector('.menu-overlay');
const menuLinks = document.querySelectorAll('.menu-link');

menuToggle.addEventListener('click', () => {
    document.body.classList.toggle('menu-open');
    
    gsap.to(menuOverlay, {
        clipPath: document.body.classList.contains('menu-open') 
            ? 'circle(100% at 50% 50%)' 
            : 'circle(0% at 50% 50%)',
        duration: 1,
        ease: 'power4.inOut'
    });

    gsap.to(menuLinks, {
        y: document.body.classList.contains('menu-open') ? 0 : 100,
        opacity: document.body.classList.contains('menu-open') ? 1 : 0,
        stagger: 0.1,
        duration: 0.5,
        ease: 'power4.out'
    });
});

// Magnetic Button Effect
document.querySelectorAll('.view-project').forEach(button => {
    button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        gsap.to(button, {
            x: (x - rect.width / 2) / rect.width * 50,
            y: (y - rect.height / 2) / rect.height * 50,
            duration: 0.3,
            ease: 'power2.out'
        });
    });

    button.addEventListener('mouseleave', () => {
        gsap.to(button, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: 'elastic.out(1, 0.3)'
        });
    });
});

// Smooth Image Reveal
const workItems = document.querySelectorAll('.work-item');

workItems.forEach(item => {
    const image = item.querySelector('img');
    
    scroll.on('scroll', (obj) => {
        const rect = item.getBoundingClientRect();
        const inView = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (inView) {
            gsap.to(image, {
                scale: 1,
                duration: 1.5,
                ease: 'power3.out'
            });
        }
    });
});

// Text Split Animation
const splitText = (element) => {
    const text = element.textContent;
    const chars = text.split('');
    element.textContent = '';
    
    chars.forEach(char => {
        const span = document.createElement('span');
        span.textContent = char;
        element.appendChild(span);
    });
    
    return element;
};

document.querySelectorAll('.hero-title span').forEach(text => {
    const chars = splitText(text).querySelectorAll('span');
    
    gsap.from(chars, {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.02,
        ease: 'power4.out',
        scrollTrigger: {
            trigger: text,
            start: 'top 80%'
        }
    });
});

// Form Animation
const form = document.querySelector('.contact-form');
const inputs = form.querySelectorAll('input, textarea');

inputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', () => {
        if (!input.value) {
            input.parentElement.classList.remove('focused');
        }
    });
});

// Parallax Images
document.querySelectorAll('[data-speed]').forEach(image => {
    scroll.on('scroll', (obj) => {
        const speed = image.dataset.speed;
        const yPos = -(obj.scroll.y * speed);
        
        gsap.to(image, {
            y: yPos,
            duration: 0.5,
            ease: 'none'
        });
    });
});
