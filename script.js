// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: true
});

// Typing effect for hero section
const text = "Welcome to My Portfolio";
let index = 0;
const typingText = document.querySelector('.typing-text');

function typeWriter() {
    if (index < text.length) {
        typingText.textContent += text.charAt(index);
        index++;
        setTimeout(typeWriter, 100);
    }
}

document.addEventListener('DOMContentLoaded', typeWriter);

// Dynamic project loading
const projects = [
    {
        title: "Project 1",
        description: "Description of project 1",
        image: "assets/images/project1.jpg"
    },
    {
        title: "Project 2",
        description: "Description of project 2",
        image: "assets/images/project2.jpg"
    },
    // Add more projects as needed
];

const projectGrid = document.querySelector('.project-grid');

projects.forEach(project => {
    const projectCard = document.createElement('div');
    projectCard.className = 'project-card';
    projectCard.innerHTML = `
        <img src="${project.image}" alt="${project.title}">
        <h3>${project.title}</h3>
        <p>${project.description}</p>
    `;
    projectGrid.appendChild(projectCard);
});

// Dynamic image loading for about section
const profileImage = new Image();
profileImage.src = 'assets/images/profile.jpg';
profileImage.onload = function() {
    document.querySelector('.image-container').style.backgroundImage = `url(${this.src})`;
};

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form submission handler
document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    // Add your form submission logic here
    alert('Message sent successfully!');
    this.reset();
});