// Gaming Character Showcase - Interactive JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    animateStatsOnLoad();
    addCardInteractions();
    addScrollAnimations();
    addParticleEffects();
}

// Animate stat bars when page loads
function animateStatsOnLoad() {
    const statFills = document.querySelectorAll('.stat-fill');
    
    // Reset all stat bars to 0 width initially
    statFills.forEach(fill => {
        fill.style.width = '0%';
    });
    
    // Animate stat bars after a short delay
    setTimeout(() => {
        statFills.forEach((fill, index) => {
            setTimeout(() => {
                const targetValue = fill.getAttribute('data-value');
                fill.style.width = targetValue + '%';
                
                // Add pulse effect
                fill.style.animation = 'progress-animation 2s ease-in-out infinite, stat-pulse 0.5s ease-out';
            }, index * 200); // Stagger the animations
        });
    }, 500);
}

// Add interactive hover effects to cards
function addCardInteractions() {
    const cards = document.querySelectorAll('.character-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Add glow effect to character image
            const img = this.querySelector('.character-image img');
            const imageGlow = this.querySelector('.image-glow');
            
            if (img && imageGlow) {
                img.style.transform = 'scale(1.1)';
                imageGlow.style.opacity = '1';
            }
            
            // Animate stat bars on hover
            const statFills = this.querySelectorAll('.stat-fill');
            statFills.forEach(fill => {
                fill.style.animation = 'progress-animation 1s ease-in-out infinite, stat-glow 2s ease-in-out infinite';
            });
        });
        
        card.addEventListener('mouseleave', function() {
            // Reset character image
            const img = this.querySelector('.character-image img');
            const imageGlow = this.querySelector('.image-glow');
            
            if (img && imageGlow) {
                img.style.transform = 'scale(1)';
                imageGlow.style.opacity = '0';
            }
            
            // Reset stat bars animation
            const statFills = this.querySelectorAll('.stat-fill');
            statFills.forEach(fill => {
                fill.style.animation = 'progress-animation 2s ease-in-out infinite';
            });
        });
        
        // Add click effect
        card.addEventListener('click', function() {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Play a selection sound effect (you can add audio here)
            createClickEffect(this);
        });
    });
}

// Create click effect with particles
function createClickEffect(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 6; i++) {
        createParticle(centerX, centerY);
    }
}

function createParticle(x, y) {
    const particle = document.createElement('div');
    particle.style.position = 'fixed';
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    particle.style.width = '4px';
    particle.style.height = '4px';
    particle.style.backgroundColor = '#00ffff';
    particle.style.borderRadius = '50%';
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '9999';
    particle.style.boxShadow = '0 0 10px #00ffff';
    
    document.body.appendChild(particle);
    
    // Animate particle
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 100 + 50;
    const endX = x + Math.cos(angle) * distance;
    const endY = y + Math.sin(angle) * distance;
    
    particle.animate([
        { transform: 'translate(0, 0) scale(1)', opacity: 1 },
        { transform: `translate(${endX - x}px, ${endY - y}px) scale(0)`, opacity: 0 }
    ], {
        duration: 1000,
        easing: 'ease-out'
    }).addEventListener('finish', () => {
        particle.remove();
    });
}

// Add scroll-based animations
function addScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Re-animate stats when card comes into view
                if (entry.target.classList.contains('character-card')) {
                    const statFills = entry.target.querySelectorAll('.stat-fill');
                    statFills.forEach((fill, index) => {
                        setTimeout(() => {
                            const targetValue = fill.getAttribute('data-value');
                            fill.style.width = targetValue + '%';
                        }, index * 100);
                    });
                }
            }
        });
    }, observerOptions);
    
    // Observe all character cards
    const cards = document.querySelectorAll('.character-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// Add particle effects to background
function addParticleEffects() {
    const background = document.querySelector('.background');
    
    // Create floating particles
    for (let i = 0; i < 20; i++) {
        createFloatingParticle(background);
    }
}

function createFloatingParticle(container) {
    const particle = document.createElement('div');
    particle.style.position = 'absolute';
    particle.style.width = Math.random() * 3 + 1 + 'px';
    particle.style.height = particle.style.width;
    particle.style.backgroundColor = getRandomNeonColor();
    particle.style.borderRadius = '50%';
    particle.style.opacity = Math.random() * 0.5 + 0.3;
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.boxShadow = `0 0 10px ${particle.style.backgroundColor}`;
    
    container.appendChild(particle);
    
    // Animate particle floating
    animateFloatingParticle(particle);
}

function animateFloatingParticle(particle) {
    const duration = Math.random() * 10000 + 5000; // 5-15 seconds
    const deltaX = (Math.random() - 0.5) * 200; // Random movement
    const deltaY = (Math.random() - 0.5) * 200;
    
    particle.animate([
        { transform: 'translate(0, 0)' },
        { transform: `translate(${deltaX}px, ${deltaY}px)` },
        { transform: 'translate(0, 0)' }
    ], {
        duration: duration,
        iterations: Infinity,
        easing: 'ease-in-out'
    });
}

function getRandomNeonColor() {
    const colors = ['#00ffff', '#ff00ff', '#ffff00', '#00ff00', '#ff6b6b', '#feca57'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        const cards = document.querySelectorAll('.character-card');
        const currentActive = document.querySelector('.character-card.keyboard-active') || cards[0];
        let currentIndex = Array.from(cards).indexOf(currentActive);
        
        // Remove previous active state
        cards.forEach(card => card.classList.remove('keyboard-active'));
        
        // Calculate next index
        if (e.key === 'ArrowRight') {
            currentIndex = (currentIndex + 1) % cards.length;
        } else {
            currentIndex = (currentIndex - 1 + cards.length) % cards.length;
        }
        
        // Add active state and scroll to card
        const nextCard = cards[currentIndex];
        nextCard.classList.add('keyboard-active');
        nextCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Add visual feedback
        nextCard.style.borderColor = '#00ffff';
        setTimeout(() => {
            nextCard.style.borderColor = '';
        }, 1000);
    }
    
    if (e.key === 'Enter') {
        const activeCard = document.querySelector('.character-card.keyboard-active');
        if (activeCard) {
            activeCard.click();
        }
    }
});

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes stat-pulse {
        0% { transform: scaleY(1); }
        50% { transform: scaleY(1.1); }
        100% { transform: scaleY(1); }
    }
    
    @keyframes stat-glow {
        0%, 100% { 
            box-shadow: 0 0 10px currentColor; 
        }
        50% { 
            box-shadow: 0 0 20px currentColor, 0 0 30px currentColor; 
        }
    }
    
    .character-card.keyboard-active {
        outline: 2px solid #00ffff;
        outline-offset: 2px;
    }
`;
document.head.appendChild(style);

// Initialize tooltips for stats
function initializeTooltips() {
    const statItems = document.querySelectorAll('.stat-item');
    
    statItems.forEach(item => {
        const label = item.querySelector('.stat-label span').textContent;
        const value = item.querySelector('.stat-value').textContent;
        
        item.addEventListener('mouseenter', function(e) {
            showTooltip(e, `${label}: ${value}`);
        });
        
        item.addEventListener('mouseleave', function() {
            hideTooltip();
        });
    });
}

function showTooltip(e, text) {
    const tooltip = document.createElement('div');
    tooltip.className = 'stat-tooltip';
    tooltip.textContent = text;
    tooltip.style.cssText = `
        position: fixed;
        background: rgba(0, 0, 0, 0.9);
        color: #00ffff;
        padding: 8px 12px;
        border-radius: 6px;
        font-size: 0.8rem;
        pointer-events: none;
        z-index: 10000;
        border: 1px solid #00ffff;
        box-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
    `;
    
    document.body.appendChild(tooltip);
    
    const rect = tooltip.getBoundingClientRect();
    tooltip.style.left = (e.clientX - rect.width / 2) + 'px';
    tooltip.style.top = (e.clientY - rect.height - 10) + 'px';
}

function hideTooltip() {
    const tooltip = document.querySelector('.stat-tooltip');
    if (tooltip) {
        tooltip.remove();
    }
}

// Initialize tooltips after DOM is loaded
setTimeout(initializeTooltips, 1000);
