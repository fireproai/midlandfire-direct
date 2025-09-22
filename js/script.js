// Update copyright year
document.getElementById('year').textContent = new Date().getFullYear();

// Calculate and update years of experience (started 1996)
const currentYear = new Date().getFullYear();
const startYear = 1996;
const yearsExperience = currentYear - startYear;

// Update all years experience displays across the site
document.querySelectorAll('.years-display, #yearsExperience, #yearsCounter').forEach(element => {
    element.textContent = yearsExperience;
});

// Mobile menu toggle functionality
document.addEventListener('DOMContentLoaded', function () {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');

    if (mobileMenuToggle && mobileNav) {
        mobileMenuToggle.addEventListener('click', function () {
            mobileNav.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        const mobileNavLinks = mobileNav.querySelectorAll('a');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function () {
                mobileNav.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function (event) {
            if (!mobileMenuToggle.contains(event.target) && !mobileNav.contains(event.target)) {
                mobileNav.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            }
        });
    }
});

// Smooth scrolling for anchor links
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

// Form validation and enhanced UX
document.addEventListener('DOMContentLoaded', function () {
    // Add loading states to forms
    const forms = document.querySelectorAll('form[data-netlify="true"]');

    forms.forEach(form => {
        const submitButton = form.querySelector('button[type="submit"]');
        const originalButtonText = submitButton ? submitButton.textContent : '';

        form.addEventListener('submit', function (e) {
            if (submitButton) {
                submitButton.textContent = 'Sending...';
                submitButton.disabled = true;
                submitButton.style.opacity = '0.7';
            }
        });

        // Reset button if form submission fails
        form.addEventListener('error', function () {
            if (submitButton) {
                submitButton.textContent = originalButtonText;
                submitButton.disabled = false;
                submitButton.style.opacity = '1';
            }
        });
    });
});

// Enhanced phone number formatting
document.querySelectorAll('input[type="tel"]').forEach(input => {
    input.addEventListener('input', function (e) {
        let value = e.target.value.replace(/\D/g, '');

        // Format UK phone numbers
        if (value.startsWith('44')) {
            value = '+44 ' + value.substring(2);
        } else if (value.startsWith('0')) {
            // Format as UK local number
            if (value.length > 10) {
                value = value.substring(0, 11);
            }
        }

        e.target.value = value;
    });
});

// Add active states to navigation
document.addEventListener('DOMContentLoaded', function () {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.main-nav a, .mobile-nav a');

    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage ||
            (currentPage === '' && linkPage === 'index.html') ||
            (currentPage === 'index.html' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });
});

// Lazy loading for images (enhanced performance)
document.addEventListener('DOMContentLoaded', function () {
    const images = document.querySelectorAll('img[loading="lazy"]');

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }
});

// Contact form auto-suggestions
document.addEventListener('DOMContentLoaded', function () {
    const companyInput = document.querySelector('input[name="company"]');
    const enquirySelect = document.querySelector('select[name="enquiry-type"]');

    if (companyInput && enquirySelect) {
        // Auto-suggest enquiry type based on company name patterns
        companyInput.addEventListener('blur', function () {
            const company = this.value.toLowerCase();

            if (company.includes('fire') || company.includes('safety') || company.includes('security')) {
                if (!enquirySelect.value) {
                    enquirySelect.value = 'quote';
                }
            }
        });
    }
});

// Enhanced quote form functionality
document.addEventListener('DOMContentLoaded', function () {
    const projectTypeSelect = document.querySelector('select[name="project-type"]');
    const urgencySelect = document.querySelector('select[name="urgency"]');

    if (projectTypeSelect && urgencySelect) {
        projectTypeSelect.addEventListener('change', function () {
            // Auto-suggest urgency based on project type
            if (this.value === 'emergency') {
                urgencySelect.value = 'emergency';
            } else if (this.value === 'replacement-parts') {
                urgencySelect.value = 'urgent';
            }
        });
    }
});

// Dynamic form field validation
document.addEventListener('DOMContentLoaded', function () {
    const requiredFields = document.querySelectorAll('input[required], select[required], textarea[required]');

    requiredFields.forEach(field => {
        field.addEventListener('blur', function () {
            if (this.value.trim() === '') {
                this.style.borderColor = '#ff6b6b';
            } else {
                this.style.borderColor = '#28a745';
            }
        });

        field.addEventListener('input', function () {
            if (this.value.trim() !== '') {
                this.style.borderColor = '#28a745';
            }
        });
    });
});

// Professional email validation
function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

document.addEventListener('DOMContentLoaded', function () {
    const emailInputs = document.querySelectorAll('input[type="email"]');

    emailInputs.forEach(input => {
        input.addEventListener('blur', function () {
            if (this.value && !validateEmail(this.value)) {
                this.style.borderColor = '#ff6b6b';
                this.setCustomValidity('Please enter a valid email address');
            } else {
                this.style.borderColor = this.value ? '#28a745' : '';
                this.setCustomValidity('');
            }
        });
    });
});

// Scroll-to-top functionality (appears after scrolling down)
document.addEventListener('DOMContentLoaded', function () {
    // Create scroll-to-top button
    const scrollButton = document.createElement('button');
    scrollButton.innerHTML = '↑';
    scrollButton.className = 'scroll-to-top';
    scrollButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #b30004;
        color: white;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        font-size: 20px;
        cursor: pointer;
        display: none;
        z-index: 1000;
        box-shadow: 0 2px 10px rgba(0,0,0,0.3);
        transition: all 0.3s ease;
    `;

    document.body.appendChild(scrollButton);

    // Show/hide scroll button based on scroll position
    window.addEventListener('scroll', function () {
        if (window.pageYOffset > 300) {
            scrollButton.style.display = 'block';
        } else {
            scrollButton.style.display = 'none';
        }
    });

    // Smooth scroll to top when clicked
    scrollButton.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

// Performance optimization - preload critical pages
document.addEventListener('DOMContentLoaded', function () {
    const criticalPages = ['products.html', 'quote.html', 'contact.html'];

    criticalPages.forEach(page => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = page;
        document.head.appendChild(link);
    });
});

// Console message for developers
console.log(`
🔥 Midland Fire Direct Website
Elite Gent Technology Centre
${yearsExperience}+ Years of Excellence
Built with professional standards

Need technical support? Call 0844 997 0001
`);

// Track page views (privacy-friendly - no external services)
document.addEventListener('DOMContentLoaded', function () {
    const page = window.location.pathname.split('/').pop() || 'index.html';
    console.log(`Page loaded: ${page} at ${new Date().toISOString()}`);
});
// Hero Rotator
document.addEventListener('DOMContentLoaded', function () {
    const heroData = [
        {
            image: "images/hero/S-Quad-Banner.webp",
            badge: "Gent Elite Technology Centre",
            title: "Gent S-Quad Multi-Sensor Fire Detectors",
            subtitle: "Advanced Gent S-Quad multi-sensor detectors with dual optical, heat, and CO sensing for fast and reliable fire detection with minimal false alarms."
        },
        {
            image: "images/hero/interface-Banner.webp",
            badge: "Gent Elite Technology Centre",
            title: "Gent S4 Interfaces",
            subtitle: "Flexible Gent S4 loop-powered and mains interfaces for plant control, system integration, and EN54 compliance."
        },
        {
            image: "images/hero/MCP-Banner.webp",
            badge: "Gent Elite Technology Centre",
            title: "Gent Manual Call Points",
            subtitle: "Addressable Gent manual call points with resettable elements, protective covers, and weatherproof options for robust alarm activation."
        },
        {
            image: "images/hero/sounder-Banner.webp",
            badge: "Gent Elite Technology Centre",
            title: "Gent S-Cubed Sounders & VADs",
            subtitle: "Loop-powered Gent S-Cubed sounders and EN54-23 compliant VADs providing clear audible and visual alarm signalling."
        }
    ];

    let currentIndex = 0;
    const heroSection = document.getElementById("hero-section");
    const badgeEl = document.getElementById("hero-badge");
    const titleEl = document.getElementById("hero-title");
    const subtitleEl = document.getElementById("hero-subtitle");
    const staticContent = document.querySelector(".hero-static");
    const dynamicContent = document.querySelector(".hero-dynamic");

    function updateHero() {
        const data = heroData[currentIndex];
        heroSection.style.backgroundImage = `url(${data.image})`;
        heroSection.style.backgroundPosition = "center";
        heroSection.style.backgroundSize = "cover";
        heroSection.style.backgroundRepeat = "no-repeat";
        badgeEl.textContent = data.badge;
        titleEl.textContent = data.title;
        subtitleEl.textContent = data.subtitle;
        currentIndex = (currentIndex + 1) % heroData.length;
    }

    if (heroSection) {
        staticContent.style.display = "none";
        dynamicContent.style.display = "block";
        updateHero();
        setInterval(updateHero, 8000); // rotate every 8s
    }
});
