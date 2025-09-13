// Calculate years since August 1996, incrementing Sept 1st  
function calculateYearsExperience() {
    const startDate = new Date('1996-08-01');
    const currentDate = new Date();
    
    let years = currentDate.getFullYear() - startDate.getFullYear();
    
    // Check if we've passed September 1st this year for increment
    const currentMonth = currentDate.getMonth(); // 0-based (August = 7, September = 8)
    const currentDay = currentDate.getDate();
    
    // If we haven't reached September 1st yet this year, subtract 1
    if (currentMonth < 8 || (currentMonth === 8 && currentDay < 1)) {
        years -= 1;
    }
    
    return years;
}

// Update all year counters
function updateYearCounters() {
    const years = calculateYearsExperience();
    
    // Update specific IDs
    const yearElements = [
        'yearsExperience',
        'yearsCounter', 
        'yearsCounter2',
        'aboutYears'
    ];
    
    yearElements.forEach(elementId => {
        const element = document.getElementById(elementId);
        if (element) {
            element.textContent = years;
        }
    });
    
    // Update class-based elements
    const yearDisplays = document.querySelectorAll('.years-display');
    yearDisplays.forEach(element => {
        element.textContent = years;
    });
}

// Set current year in footer
function setFooterYear() {
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// Mobile Menu Toggle
function initMobileMenu() {
    const toggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.mobile-nav');
    
    if (toggle && nav) {
        toggle.addEventListener('click', function() {
            toggle.classList.toggle('active');
            nav.classList.toggle('active');
            
            // Animate hamburger
            const spans = toggle.querySelectorAll('span');
            if (toggle.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!toggle.contains(e.target) && !nav.contains(e.target)) {
                toggle.classList.remove('active');
                nav.classList.remove('active');
                // Reset hamburger
                const spans = toggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Close mobile menu when clicking on a link
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                toggle.classList.remove('active');
                nav.classList.remove('active');
                // Reset hamburger
                const spans = toggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }
}

// Enhanced Form Handling
function initFormHandling() {
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            // Show loading state
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            try {
                // Simulate form submission
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                // Success message
                showFormMessage(form, 'Thank you for your enquiry! We will get back to you within 4 hours during business hours.', 'success');
                form.reset();
                
            } catch (error) {
                // Error message
                showFormMessage(form, 'Sorry, there was an error sending your message. Please try again or call us directly on 0844 997 0001.', 'error');
            } finally {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    });
}

function showFormMessage(form, message, type) {
    // Remove existing messages
    const existingMessages = form.querySelectorAll('.form-message');
    existingMessages.forEach(msg => msg.remove());
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message ${type}`;
    messageDiv.innerHTML = `
        <span class="message-icon">${type === 'success' ? '✓' : '⚠'}</span>
        <span>${message}</span>
    `;
    
    form.insertBefore(messageDiv, form.firstChild);
    
    // Auto-remove after 8 seconds
    setTimeout(() => {
        messageDiv.remove();
    }, 8000);
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Header scroll effects
function initHeaderEffects() {
    const header = document.querySelector('.header');
    if (!header) return;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = 'none';
        }
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    updateYearCounters();
    setFooterYear();
    initMobileMenu();
    initFormHandling();
    initSmoothScrolling();
    initHeaderEffects();
    
    console.log('Midland Fire Direct website loaded successfully!');
});

// Update counters every hour to catch the September 1st increment
setInterval(updateYearCounters, 3600000);

// Add styles for form messages
const messageStyles = document.createElement('style');
messageStyles.textContent = `
.form-message {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px 20px;
    border-radius: 8px;
    margin-bottom: 20px;
    font-weight: 500;
}

.form-message.success {
    background: #10b981;
    color: white;
}

.form-message.error {
    background: #ef4444;
    color: white;
}

.message-icon {
    font-weight: bold;
    font-size: 1.2em;
}
`;
document.head.appendChild(messageStyles);