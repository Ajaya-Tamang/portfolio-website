// Initialize core functionality
document.addEventListener('DOMContentLoaded', () => {
    // Modern entrance animation
    const preloader = document.querySelector('.preloader');
    gsap.to(preloader, {
        opacity: 0,
        duration: 1,
        ease: "power4.inOut",
        onComplete: () => {
            preloader.style.display = 'none';
        }
    });

    // Initialize 3D background
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#hero-canvas'),
        alpha: true
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.position.z = 5;

    // Create animated background
    const geometry = new THREE.PlaneGeometry(5, 5, 50, 50);
    const material = new THREE.ShaderMaterial({
        uniforms: {
            time: { value: 0 }
        },
        vertexShader: `
            varying vec2 vUv;
            void main() {
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
        fragmentShader: `
            uniform float time;
            varying vec2 vUv;
            
            void main() {
                vec3 color = 0.5 + 0.5 * cos(time + vUv.xyx + vec3(0,2,4));
                gl_FragColor = vec4(color, 1.0);
            }
        `
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        material.uniforms.time.value += 0.01;
        renderer.render(scene, camera);
    }
    animate();

    // Magnetic cursor effect
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

    function animateCursor() {
        cursor.x += (cursor.targetX - cursor.x) * 0.1;
        cursor.y += (cursor.targetY - cursor.y) * 0.1;

        if (cursorDot && cursorOutline) {
            cursorDot.style.transform = `translate(${cursor.x}px, ${cursor.y}px)`;
            cursorOutline.style.transform = `translate(${cursor.x - 20}px, ${cursor.y - 20}px)`;
        }

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Smooth scroll initialization
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smooth: true
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // GSAP Animations
    gsap.registerPlugin(ScrollTrigger);

    // Hero animations
    gsap.from('.hero-content h1', {
        y: 100,
        opacity: 0,
        duration: 1.5,
        ease: "power4.out"
    });

    gsap.from('.hero-content p', {
        y: 50,
        opacity: 0,
        duration: 1.5,
        delay: 0.3,
        ease: "power4.out"
    });

    // Work grid animations
    gsap.utils.toArray('.work-item').forEach(item => {
        gsap.from(item, {
            y: 100,
            opacity: 0,
            duration: 1,
            scrollTrigger: {
                trigger: item,
                start: "top bottom",
                end: "top center",
                scrub: 1
            }
        });
    });

    // Menu toggle functionality
    const menuButton = document.querySelector('.menu-button');
    const fullscreenMenu = document.querySelector('.fullscreen-menu');
    let menuOpen = false;

    menuButton?.addEventListener('click', () => {
        menuOpen = !menuOpen;
        if (menuOpen) {
            fullscreenMenu.classList.add('active');
            gsap.from('.menu-item', {
                y: 100,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "power4.out"
            });
        } else {
            fullscreenMenu.classList.remove('active');
        }
    });

    // Window resize handler
    window.addEventListener('resize', () => {
        // Update camera
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
});
