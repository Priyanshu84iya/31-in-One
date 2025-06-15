// Optional JavaScript for enhanced image loading and smooth animations
// This file is not required for the basic functionality but adds polish

document.addEventListener('DOMContentLoaded', function() {
    // Smooth image loading animation
    const images = document.querySelectorAll('.item-image img');
    
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.classList.add('loaded');
        });
        
        // If image is already cached and loaded
        if (img.complete) {
            img.classList.add('loaded');
        }
    });

    // Add intersection observer for scroll animations (optional enhancement)
    if ('IntersectionObserver' in window) {
        const menuItems = document.querySelectorAll('.menu-item');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '50px'
        });

        menuItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(item);
        });
    }

    // Smooth scrolling for any navigation (if added later)
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

    // Add keyboard navigation support for menu items
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.setAttribute('tabindex', '0');
        
        item.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                // Could trigger a modal or detailed view
                console.log('Menu item selected:', item.querySelector('.item-name').textContent);
            }
        });
    });
});

// Utility function to update menu prices (for restaurant owners)
function updatePrice(itemName, newPrice) {
    const items = document.querySelectorAll('.menu-item');
    items.forEach(item => {
        const nameElement = item.querySelector('.item-name');
        if (nameElement && nameElement.textContent.includes(itemName)) {
            const priceElement = item.querySelector('.item-price');
            if (priceElement) {
                priceElement.textContent = newPrice;
            }
        }
    });
}

// Utility function to add new menu item (for dynamic content)
function addMenuItem(section, item) {
    const sectionElement = document.querySelector(`[data-section="${section}"] .menu-grid`);
    if (sectionElement) {
        const menuItem = document.createElement('div');
        menuItem.className = 'menu-item';
        menuItem.innerHTML = `
            <div class="item-image">
                <img src="${item.image}" alt="${item.name}" loading="lazy">
            </div>
            <div class="item-content">
                <h3 class="item-name">${item.name}</h3>
                <p class="item-description">${item.description}</p>
                <span class="item-price">${item.price}</span>
            </div>
        `;
        sectionElement.appendChild(menuItem);
    }
}
