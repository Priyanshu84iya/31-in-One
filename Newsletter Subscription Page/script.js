// Newsletter Subscription Management Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('subscriptionForm');
    const emailInput = document.getElementById('emailInput');
    const submitBtn = form.querySelector('.submit-btn');
    const subscriptionsContainer = document.getElementById('subscriptionsContainer');
    const subscriptionsList = document.getElementById('subscriptionsList');
    const userEmailDisplay = document.getElementById('userEmail');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnIcon = submitBtn.querySelector('.btn-icon');
    
    let currentUserEmail = '';

    // Sample subscription data
    const sampleSubscriptions = {
        'user@example.com': [
            {
                id: 'tech-weekly',
                name: 'Tech Weekly Digest',
                frequency: 'Weekly',
                status: 'active',
                subscribedDate: '2024-01-15',
                nextDelivery: '2025-06-16'
            },
            {
                id: 'design-inspiration',
                name: 'Design Inspiration',
                frequency: 'Daily',
                status: 'active',
                subscribedDate: '2024-02-20',
                nextDelivery: '2025-06-14'
            },
            {
                id: 'business-insights',
                name: 'Business Insights',
                frequency: 'Monthly',
                status: 'paused',
                subscribedDate: '2024-03-10',
                nextDelivery: null
            }
        ],
        'demo@test.com': [
            {
                id: 'startup-news',
                name: 'Startup News',
                frequency: 'Weekly',
                status: 'active',
                subscribedDate: '2024-04-05',
                nextDelivery: '2025-06-17'
            }
        ]
    };

    // Form submission handler
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = emailInput.value.trim();
        
        // Validate email
        if (!isValidEmail(email)) {
            showError('Please enter a valid email address.');
            return;
        }
        
        // Start loading state
        setLoadingState(true);
        
        // Simulate API call
        setTimeout(() => {
            setLoadingState(false);
            loadSubscriptions(email);
        }, 1500);
    });

    // Load subscriptions for email
    function loadSubscriptions(email) {
        currentUserEmail = email;
        userEmailDisplay.textContent = email;
        
        // Hide form and show subscriptions
        form.style.display = 'none';
        subscriptionsContainer.classList.add('show');
        
        // Get subscriptions (from sample data or localStorage)
        const subscriptions = getSubscriptionsForEmail(email);
        displaySubscriptions(subscriptions);
    }

    // Get subscriptions for email
    function getSubscriptionsForEmail(email) {
        // Check sample data first
        if (sampleSubscriptions[email]) {
            return sampleSubscriptions[email];
        }
        
        // Check localStorage
        const stored = localStorage.getItem(`subscriptions_${email}`);
        if (stored) {
            return JSON.parse(stored);
        }
        
        return [];
    }

    // Display subscriptions
    function displaySubscriptions(subscriptions) {
        subscriptionsList.innerHTML = '';
        
        if (subscriptions.length === 0) {
            showNoSubscriptions();
            return;
        }
        
        subscriptions.forEach((subscription, index) => {
            const subscriptionElement = createSubscriptionElement(subscription, index);
            subscriptionsList.appendChild(subscriptionElement);
        });
    }

    // Show no subscriptions state
    function showNoSubscriptions() {
        const noSubsDiv = document.createElement('div');
        noSubsDiv.className = 'no-subscriptions';
        noSubsDiv.innerHTML = `
            <i class="fas fa-inbox"></i>
            <h3>No Subscriptions Found</h3>
            <p>You don't have any active newsletter subscriptions yet. Start by subscribing to your first newsletter!</p>
        `;
        subscriptionsList.appendChild(noSubsDiv);
    }

    // Create subscription element
    function createSubscriptionElement(subscription, index) {
        const div = document.createElement('div');
        div.className = 'subscription-item';
        div.style.animationDelay = `${index * 0.1}s`;
        
        const nextDeliveryText = subscription.nextDelivery 
            ? `Next: ${formatDate(subscription.nextDelivery)}`
            : 'Paused';
            
        div.innerHTML = `
            <div class="subscription-header">
                <div class="newsletter-name">${subscription.name}</div>
                <div class="status-badge ${subscription.status}">${subscription.status}</div>
            </div>
            <div class="subscription-details">
                <div class="detail-item">
                    <i class="fas fa-calendar"></i>
                    <span>${subscription.frequency}</span>
                </div>
                <div class="detail-item">
                    <i class="fas fa-clock"></i>
                    <span>${nextDeliveryText}</span>
                </div>
                <div class="detail-item">
                    <i class="fas fa-user-plus"></i>
                    <span>Since ${formatDate(subscription.subscribedDate)}</span>
                </div>
            </div>
            <div class="subscription-controls">
                ${subscription.status === 'active' 
                    ? `<button class="control-btn" onclick="pauseSubscription('${subscription.id}')">
                         <i class="fas fa-pause"></i> Pause
                       </button>`
                    : `<button class="control-btn" onclick="resumeSubscription('${subscription.id}')">
                         <i class="fas fa-play"></i> Resume
                       </button>`
                }
                <button class="control-btn" onclick="editSubscription('${subscription.id}')">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="control-btn danger" onclick="unsubscribe('${subscription.id}')">
                    <i class="fas fa-trash"></i> Unsubscribe
                </button>
            </div>
        `;
        
        return div;
    }

    // Format date
    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        });
    }

    // Global functions for subscription management
    window.pauseSubscription = function(subscriptionId) {
        updateSubscriptionStatus(subscriptionId, 'paused');
        showStatusMessage('Subscription paused successfully!', 'success');
    };

    window.resumeSubscription = function(subscriptionId) {
        updateSubscriptionStatus(subscriptionId, 'active');
        showStatusMessage('Subscription resumed successfully!', 'success');
    };

    window.editSubscription = function(subscriptionId) {
        showStatusMessage('Edit functionality coming soon!', 'info');
    };

    window.unsubscribe = function(subscriptionId) {
        if (confirm('Are you sure you want to unsubscribe? This action cannot be undone.')) {
            removeSubscription(subscriptionId);
            showStatusMessage('Successfully unsubscribed!', 'success');
        }
    };

    // Update subscription status
    function updateSubscriptionStatus(subscriptionId, newStatus) {
        let subscriptions = getSubscriptionsForEmail(currentUserEmail);
        subscriptions = subscriptions.map(sub => {
            if (sub.id === subscriptionId) {
                sub.status = newStatus;
                if (newStatus === 'active') {
                    // Set next delivery date
                    const nextDate = new Date();
                    nextDate.setDate(nextDate.getDate() + 7); // Default to weekly
                    sub.nextDelivery = nextDate.toISOString().split('T')[0];
                } else {
                    sub.nextDelivery = null;
                }
            }
            return sub;
        });
        
        saveSubscriptions(subscriptions);
        displaySubscriptions(subscriptions);
    }

    // Remove subscription
    function removeSubscription(subscriptionId) {
        let subscriptions = getSubscriptionsForEmail(currentUserEmail);
        subscriptions = subscriptions.filter(sub => sub.id !== subscriptionId);
        
        saveSubscriptions(subscriptions);
        displaySubscriptions(subscriptions);
    }

    // Save subscriptions
    function saveSubscriptions(subscriptions) {
        localStorage.setItem(`subscriptions_${currentUserEmail}`, JSON.stringify(subscriptions));
    }

    // Show status message
    function showStatusMessage(message, type = 'success') {
        const messageDiv = document.createElement('div');
        messageDiv.className = `status-message ${type}`;
        messageDiv.innerHTML = `
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(messageDiv);
        
        setTimeout(() => {
            messageDiv.remove();
        }, 3000);
    }

    // Modal functions
    window.showSubscribeModal = function() {
        document.getElementById('subscribeModal').classList.add('show');
    };

    window.closeSubscribeModal = function() {
        document.getElementById('subscribeModal').classList.remove('show');
    };

    // Handle new subscription
    document.getElementById('newSubscriptionForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const newsletterSelect = document.getElementById('newsletterSelect');
        const frequencySelect = document.getElementById('frequencySelect');
        
        const newSubscription = {
            id: newsletterSelect.value,
            name: newsletterSelect.options[newsletterSelect.selectedIndex].text,
            frequency: frequencySelect.value.charAt(0).toUpperCase() + frequencySelect.value.slice(1),
            status: 'active',
            subscribedDate: new Date().toISOString().split('T')[0],
            nextDelivery: getNextDeliveryDate(frequencySelect.value)
        };
        
        let subscriptions = getSubscriptionsForEmail(currentUserEmail);
        
        // Check if already subscribed
        if (subscriptions.some(sub => sub.id === newSubscription.id)) {
            showStatusMessage('You are already subscribed to this newsletter!', 'info');
            return;
        }
        
        subscriptions.push(newSubscription);
        saveSubscriptions(subscriptions);
        displaySubscriptions(subscriptions);
        
        closeSubscribeModal();
        showStatusMessage('Successfully subscribed to new newsletter!', 'success');
        
        // Reset form
        this.reset();
    });

    // Get next delivery date based on frequency
    function getNextDeliveryDate(frequency) {
        const date = new Date();
        switch(frequency) {
            case 'daily':
                date.setDate(date.getDate() + 1);
                break;
            case 'weekly':
                date.setDate(date.getDate() + 7);
                break;
            case 'monthly':
                date.setMonth(date.getMonth() + 1);
                break;
        }
        return date.toISOString().split('T')[0];
    }

    // Reset view
    window.resetView = function() {
        form.style.display = 'block';
        subscriptionsContainer.classList.remove('show');
        emailInput.value = '';
        emailInput.focus();
        removeError();
    };

    // Email validation function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Show error message
    function showError(message) {
        // Remove existing error if any
        removeError();
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.innerHTML = `
            <i class="fas fa-exclamation-triangle"></i>
            <span>${message}</span>
        `;
        
        form.appendChild(errorDiv);
        
        // Add error styles to input
        emailInput.classList.add('error');
        
        // Remove error after 5 seconds
        setTimeout(removeError, 5000);
    }

    // Remove error message
    function removeError() {
        const errorDiv = form.querySelector('.error-message');
        if (errorDiv) {
            errorDiv.remove();
        }
        emailInput.classList.remove('error');
    }

    // Set loading state
    function setLoadingState(isLoading) {
        if (isLoading) {
            submitBtn.disabled = true;
            submitBtn.classList.add('loading');
            btnText.textContent = 'Subscribing...';
            btnIcon.className = 'fas fa-spinner fa-spin';
        } else {
            submitBtn.disabled = false;
            submitBtn.classList.remove('loading');
            btnText.textContent = 'Subscribe';
            btnIcon.className = 'fas fa-arrow-right btn-icon';
        }
    }

    // Show success message
    function showSuccessMessage() {
        form.style.display = 'none';
        thankYouMessage.classList.add('show');
        
        // Add celebration effect
        createCelebrationEffect();
    }

    // Reset form
    window.resetForm = function() {
        form.style.display = 'block';
        thankYouMessage.classList.remove('show');
        emailInput.value = '';
        emailInput.focus();
        removeError();
    };

    // Save subscription to localStorage
    function saveSubscription(email) {
        let subscriptions = JSON.parse(localStorage.getItem('newsletterSubscriptions') || '[]');
        
        if (!subscriptions.includes(email)) {
            subscriptions.push({
                email: email,
                timestamp: new Date().toISOString(),
                id: generateId()
            });
            localStorage.setItem('newsletterSubscriptions', JSON.stringify(subscriptions));
        }
    }

    // Generate unique ID
    function generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    // Create celebration effect
    function createCelebrationEffect() {
        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57'];
        
        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                createConfetti(colors[Math.floor(Math.random() * colors.length)]);
            }, i * 100);
        }
    }    // Input focus effects
    emailInput.addEventListener('focus', function() {
        removeError();
    });

    // Input real-time validation
    emailInput.addEventListener('input', function() {
        removeError();
        
        // Add typing animation to placeholder
        if (this.value.length > 0) {
            this.classList.add('has-value');
        } else {
            this.classList.remove('has-value');
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && document.activeElement === emailInput) {
            form.dispatchEvent(new Event('submit'));
        }
        
        if (e.key === 'Escape') {
            if (document.getElementById('subscribeModal').classList.contains('show')) {
                closeSubscribeModal();
            } else if (subscriptionsContainer.classList.contains('show')) {
                resetView();
            }
        }
    });

    // Close modal when clicking outside
    document.getElementById('subscribeModal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeSubscribeModal();
        }
    });

    // Add smooth scroll behavior
    if (window.location.hash) {
        const target = document.querySelector(window.location.hash);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    }

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe all animatable elements
    document.querySelectorAll('.feature, .footer').forEach(el => {
        observer.observe(el);
    });

    // Add initial focus to email input
    setTimeout(() => {
        emailInput.focus();
    }, 1000);
});

// Add CSS for JavaScript-controlled animations
const additionalCSS = `
    .error-message {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        background: rgba(255, 107, 107, 0.2);
        border: 1px solid rgba(255, 107, 107, 0.4);
        border-radius: 10px;
        padding: 0.8rem 1rem;
        margin-top: 1rem;
        color: #ffffff;
        font-size: 0.9rem;
        animation: errorSlide 0.3s ease-out;
    }
    
    .error-message i {
        color: #ff6b6b;
    }
    
    .status-message {
        position: fixed;
        top: 2rem;
        right: 2rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(15px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 10px;
        padding: 1rem 1.5rem;
        color: #ffffff;
        font-size: 0.9rem;
        z-index: 1001;
        animation: statusSlide 0.4s ease-out;
        max-width: 300px;
    }
    
    .status-message.success {
        border-color: rgba(78, 205, 196, 0.4);
        background: rgba(78, 205, 196, 0.2);
    }
    
    .status-message.success i {
        color: #4ecdc4;
    }
    
    .status-message.info {
        border-color: rgba(52, 152, 219, 0.4);
        background: rgba(52, 152, 219, 0.2);
    }
    
    .status-message.info i {
        color: #3498db;
    }
    
    @keyframes errorSlide {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes statusSlide {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    #emailInput.error {
        border-color: rgba(255, 107, 107, 0.5) !important;
        box-shadow: 0 0 0 2px rgba(255, 107, 107, 0.2) !important;
    }
    
    .submit-btn.loading {
        opacity: 0.8;
        cursor: not-allowed;
    }
    
    #emailInput.has-value::placeholder {
        opacity: 0;
    }
    
    .animate-in {
        animation: fadeInUp 0.6s ease-out forwards;
    }
    
    /* Responsive adjustments for status messages */
    @media (max-width: 768px) {
        .status-message {
            top: 1rem;
            right: 1rem;
            left: 1rem;
            max-width: none;
        }
    }
`;

// Inject additional CSS
const style = document.createElement('style');
style.textContent = additionalCSS;
document.head.appendChild(style);
