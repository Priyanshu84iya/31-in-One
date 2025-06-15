// Enhanced Portfolio Script with New Features

// Project data with icons, descriptions, and file paths
const projects = [
    {
        title: "404 Page Not Found",
        description: "Creative and animated 404 error page with engaging visuals and smooth transitions.",
        icon: "🚫",
        type: "UI/UX",
        path: "404 Page Not Found/index.html"
    },
    {
        title: "Animated Heart",
        description: "Beautiful CSS heart animation with pulsing effects and romantic styling.",
        icon: "💖",
        type: "Animation",
        path: "Animated Heart/index.html"
    },
    {
        title: "Animated Login",
        description: "Modern login form with smooth animations and interactive elements.",
        icon: "🔐",
        type: "Form",
        path: "Animated Login/animated-login.html"
    },
    {
        title: "Birthday Cake",
        description: "Interactive birthday cake with candles, animations, and celebration effects.",
        icon: "🎂",
        type: "Interactive",
        path: "Birthday Cake/birthday-cake.html"
    },
    {
        title: "Bow Game",
        description: "Archery game with arrow shooting mechanics and target practice.",
        icon: "🏹",
        type: "Game",
        path: "Bow Game/arrow-game.html"
    },
    {
        title: "Cat Loader",
        description: "Adorable cat-themed loading animation with smooth CSS transitions.",
        icon: "🐱",
        type: "Animation",
        path: "Cat Loader/cat-loader.html"
    },
    {
        title: "Cow Error Page",
        description: "Humorous 401 error page featuring a cute cow character design.",
        icon: "🐄",
        type: "UI/UX",
        path: "Cow Error Page/cow-401page.html"
    },
    {
        title: "Cute Lamp",
        description: "Interactive lamp with on/off functionality and glowing effects.",
        icon: "💡",
        type: "Interactive",
        path: "Cute Lamp/index.html"
    },
    {
        title: "Ghost Hunt",
        description: "Spooky ghost hunting game with interactive elements and eerie atmosphere.",
        icon: "👻",
        type: "Game",
        path: "Ghost Hunt/ghost-hunt.html"
    },
    {
        title: "Gun Shooting",
        description: "Action-packed shooting game with targets and score tracking.",
        icon: "🔫",
        type: "Game",
        path: "Gun Shooting/gun-shooting.html"
    },
    {
        title: "House Build Game",
        description: "Construction simulation game where you can build and design houses.",
        icon: "🏠",
        type: "Game",
        path: "House Build Game/index.html"
    },
    {
        title: "Interactive Dragon",
        description: "Mythical dragon with interactive animations and magical effects.",
        icon: "🐉",
        type: "Interactive",
        path: "Interactive Dragon/index.html"
    },
    {
        title: "Lava Game",
        description: "Thrilling adventure game with lava obstacles and survival challenges.",
        icon: "🌋",
        type: "Game",
        path: "Lava Game/Simple-Game.html"
    },
    {
        title: "Loading Animation",
        description: "Collection of modern loading animations with various styles and effects.",
        icon: "⏳",
        type: "Animation",
        path: "Loading Animation/index.html"
    },
    {
        title: "Stick Hero",
        description: "Classic stick hero game with bridge building and timing challenges.",
        icon: "🦸",
        type: "Game",
        path: "Stick Hero/stick-hero.html"
    },
    {
        title: "The Cube",
        description: "3D cube manipulation with advanced CSS transforms and interactions.",
        icon: "🎲",
        type: "3D",
        path: "The Cube/dist/index.html"
    },
    {
        title: "War Tube Clock",
        description: "Military-themed digital clock with unique tube display and animations.",
        icon: "⏰",
        type: "Utility",
        path: "War Tube Clock/index.html"
    },
    {
        title: "404 Error Page Design",
        description: "Modern 404 error page with creative design and interactive elements.",
        icon: "❌",
        type: "UI/UX",
        path: "404 Error Page Design/index.html"
    },
    {
        title: "Animated Portfolio Gallery",
        description: "Stunning portfolio gallery with smooth animations and modern layout.",
        icon: "🖼️",
        type: "Portfolio",
        path: "Animated Portfolio Gallery/index.html"
    },
    {
        title: "Coming Soon Page",
        description: "Elegant coming soon page with countdown timer and email subscription.",
        icon: "🔜",
        type: "Landing",
        path: "Coming Soon Page/index.html"
    },
    {
        title: "Daily Routine Dashboard",
        description: "Personal dashboard for tracking daily routines and productivity.",
        icon: "📊",
        type: "Dashboard",
        path: "Daily Routine Dashboard/index.html"
    },
    {
        title: "Digital Business Card",
        description: "Modern digital business card with interactive design and contact info.",
        icon: "💳",
        type: "Business",
        path: "Digital Business Card/index.html"
    },
    {
        title: "Gaming Character Showcase",
        description: "Showcase page for gaming characters with 3D effects and animations.",
        icon: "🎮",
        type: "Gaming",
        path: "Gaming Character Showcase/index.html"
    },
    {
        title: "Mobile App UI Clone",
        description: "Responsive mobile app interface clone with modern design patterns.",
        icon: "📱",
        type: "Mobile",
        path: "Mobile App UI Clone/index.html"
    },
    {
        title: "Music Player UI",
        description: "Beautiful music player interface with play controls and visualizations.",
        icon: "🎵",
        type: "Music",
        path: "Music Player UI/index.html"
    },
    {
        title: "Netflix-like Landing Page",
        description: "Streaming service landing page inspired by Netflix design.",
        icon: "🎬",
        type: "Landing",
        path: "Netflix-like Landing Page/index.html"
    },
    {
        title: "Newsletter Subscription",
        description: "Email newsletter subscription page with modern design and validation.",
        icon: "📧",
        type: "Marketing",
        path: "Newsletter Subscription Page/index.html"
    },
    {
        title: "Responsive Table Design",
        description: "Modern responsive table design with sorting and filtering capabilities.",
        icon: "📋",
        type: "UI/UX",
        path: "Responsive Table Design/index.html"
    },
    {
        title: "Restaurant Menu UI",
        description: "Elegant restaurant menu interface with categories and pricing.",
        icon: "🍽️",
        type: "Restaurant",
        path: "Restaurant Menu UI/index.html"
    },
    {
        title: "Startup Features Page",
        description: "Professional startup features page showcasing product capabilities.",
        icon: "🚀",
        type: "Business",
        path: "Startup Features Page/index.html"
    },
    {
        title: "Virtual Birthday Card",
        description: "Interactive virtual birthday card with animations and personalization.",
        icon: "🎁",
        type: "Interactive",
        path: "Virtual Birthday Card/index.html"
    }
];

// Global variables
let currentProject = null;
let filteredProjects = [...projects];
let currentView = 'grid';

// DOM elements
const projectsGrid = document.getElementById('projectsGrid');
const modal = document.getElementById('modal');
const modalFrame = document.getElementById('modalFrame');
const modalTitle = document.getElementById('modalTitle');
const modalType = document.getElementById('modalType');
const closeModal = document.getElementById('closeModal');
const modalBackdrop = document.getElementById('modalBackdrop');
const loadingScreen = document.getElementById('loadingScreen');
const projectCount = document.getElementById('projectCount');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initializePortfolio();
    setupEventListeners();
    createStarfield();
    setTimeout(hideLoadingScreen, 1500);
});

function initializePortfolio() {
    generateProjectCards();
    updateProjectCount();
    setupFilterButtons();
    setupViewButtons();
}

function setupEventListeners() {
    // Modal events
    closeModal.addEventListener('click', closeProjectModal);
    modalBackdrop.addEventListener('click', closeProjectModal);
    
    // Keyboard events
    document.addEventListener('keydown', handleKeyboard);
    
    // Navbar scroll effect
    window.addEventListener('scroll', handleNavbarScroll);
}

function handleKeyboard(e) {
    if (!modal.style.display || modal.style.display === 'none') return;
    
    switch(e.key) {
        case 'Escape':
            closeProjectModal();
            break;
        case 'ArrowRight':
            showNextProject();
            break;
        case 'ArrowLeft':
            showPreviousProject();
            break;
    }
}

function handleNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(15, 15, 35, 0.95)';
    } else {
        navbar.style.background = 'rgba(15, 15, 35, 0.9)';
    }
}

function generateProjectCards() {
    projectsGrid.innerHTML = '';
    
    filteredProjects.forEach((project, index) => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.style.animationDelay = `${index * 0.1}s`;
        
        card.innerHTML = `
            <div class="project-icon">${project.icon}</div>
            <h3 class="project-title">${project.title}</h3>
            <p class="project-description">${project.description}</p>
            <span class="project-type">${project.type}</span>
        `;
        
        card.addEventListener('click', () => openProject(project));
        
        // Enhanced hover effects
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
        
        projectsGrid.appendChild(card);
    });
}

function openProject(project) {
    currentProject = project;
    modalFrame.src = project.path;
    modalTitle.textContent = project.title;
    modalType.textContent = project.type;
    
    modal.style.display = 'block';
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 10);
    
    document.body.style.overflow = 'hidden';
    
    // Add opening animation
    const modalContainer = modal.querySelector('.modal-container');
    modalContainer.style.transform = 'scale(0.8)';
    modalContainer.style.opacity = '0';
    
    setTimeout(() => {
        modalContainer.style.transform = 'scale(1)';
        modalContainer.style.opacity = '1';
        modalContainer.style.transition = 'all 0.3s ease';
    }, 10);
}

function closeProjectModal() {
    const modalContainer = modal.querySelector('.modal-container');
    modalContainer.style.transform = 'scale(0.8)';
    modalContainer.style.opacity = '0';
    
    setTimeout(() => {
        modal.style.display = 'none';
        modalFrame.src = '';
        document.body.style.overflow = 'auto';
        currentProject = null;
    }, 300);
}

function setupFilterButtons() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            
            const filter = btn.dataset.filter;
            filterProjects(filter);
        });
    });
}

function filterProjects(filter) {
    if (filter === 'all') {
        filteredProjects = [...projects];
    } else {
        filteredProjects = projects.filter(project => project.type === filter);
    }
    
    // Animate out old cards
    const cards = document.querySelectorAll('.project-card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
        }, index * 50);
    });
    
    // Generate new cards after animation
    setTimeout(() => {
        generateProjectCards();
        updateProjectCount();
    }, cards.length * 50 + 200);
}

function setupViewButtons() {
    const viewButtons = document.querySelectorAll('.view-btn');
    
    viewButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            viewButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            currentView = btn.dataset.view;
            toggleView();
        });
    });
}

function toggleView() {
    if (currentView === 'list') {
        projectsGrid.style.gridTemplateColumns = '1fr';
        projectsGrid.style.gap = '1rem';
        
        document.querySelectorAll('.project-card').forEach(card => {
            card.style.display = 'flex';
            card.style.alignItems = 'center';
            card.style.padding = '1.5rem';
            card.style.gap = '1.5rem';
        });
    } else {
        projectsGrid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(350px, 1fr))';
        projectsGrid.style.gap = '2rem';
        
        document.querySelectorAll('.project-card').forEach(card => {
            card.style.display = 'block';
            card.style.padding = '2rem';
        });
    }
}

function updateProjectCount() {
    projectCount.textContent = filteredProjects.length;
    
    // Animate count change
    projectCount.style.transform = 'scale(1.2)';
    setTimeout(() => {
        projectCount.style.transform = 'scale(1)';
    }, 200);
}

function scrollToProjects() {
    document.getElementById('projectsSection').scrollIntoView({
        behavior: 'smooth'
    });
}

function showRandomProject() {
    const randomProject = projects[Math.floor(Math.random() * projects.length)];
    openProject(randomProject);
}

function showNextProject() {
    if (!currentProject) return;
    
    const currentIndex = projects.findIndex(p => p.title === currentProject.title);
    const nextIndex = (currentIndex + 1) % projects.length;
    openProject(projects[nextIndex]);
}

function showPreviousProject() {
    if (!currentProject) return;
    
    const currentIndex = projects.findIndex(p => p.title === currentProject.title);
    const prevIndex = currentIndex === 0 ? projects.length - 1 : currentIndex - 1;
    openProject(projects[prevIndex]);
}

function openInNewTab() {
    if (currentProject) {
        window.open(currentProject.path, '_blank');
    }
}

function hideLoadingScreen() {
    loadingScreen.style.opacity = '0';
    setTimeout(() => {
        loadingScreen.style.display = 'none';
    }, 500);
}

// Starfield Canvas Animation
function createStarfield() {
    const canvas = document.getElementById('starfield');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const stars = [];
    const numStars = 200;
    
    for (let i = 0; i < numStars; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 1.5,
            opacity: Math.random(),
            speed: Math.random() * 0.5 + 0.1
        });
    }
    
    function animateStars() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        stars.forEach(star => {
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
            ctx.fill();
            
            star.opacity += Math.sin(Date.now() * 0.001 + star.x) * 0.01;
            star.opacity = Math.max(0.1, Math.min(1, star.opacity));
            
            star.y -= star.speed;
            if (star.y < 0) {
                star.y = canvas.height;
                star.x = Math.random() * canvas.width;
            }
        });
        
        requestAnimationFrame(animateStars);
    }
    
    animateStars();
    
    // Resize handler
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Enhanced mouse interactions
document.addEventListener('mousemove', (e) => {
    const shapes = document.querySelectorAll('.shape');
    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.0001;
        const x = (e.clientX * speed);
        const y = (e.clientY * speed);
        shape.style.transform = `translate(${x}px, ${y}px) rotate(${x + y}deg)`;
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
        }
    });
}, observerOptions);

// Observe elements when they're added
setTimeout(() => {
    const cards = document.querySelectorAll('.project-card');
    cards.forEach(card => observer.observe(card));
}, 100);

// Performance optimizations
let ticking = false;

function updateAnimations() {
    // Update any continuous animations here
    ticking = false;
}

function requestTick() {
    if (!ticking) {
        requestAnimationFrame(updateAnimations);
        ticking = true;
    }
}

// Smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Service Worker Registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Optional: Register service worker for offline capabilities
        console.log('Portfolio loaded successfully!');
    });
}
