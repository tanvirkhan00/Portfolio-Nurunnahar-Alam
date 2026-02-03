// Custom Cursor (Desktop only)
if (window.innerWidth > 768) {
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    
    let mouseX = 0, mouseY = 0;
    let outlineX = 0, outlineY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursorDot.style.left = e.clientX + 'px';
        cursorDot.style.top = e.clientY + 'px';
    });
    
    function animateCursor() {
        outlineX += (mouseX - outlineX) * 0.15;
        outlineY += (mouseY - outlineY) * 0.15;
        
        cursorOutline.style.left = outlineX + 'px';
        cursorOutline.style.top = outlineY + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    animateCursor();
    
    // Cursor interactions
    const interactiveElements = document.querySelectorAll('a, button, .skill-card, .gallery-card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorDot.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
        });
        el.addEventListener('mouseleave', () => {
            cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    });
}

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Mobile menu toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');

mobileMenuToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    navMenu.classList.toggle('active');
    
    const spans = mobileMenuToggle.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(8px, -8px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target) && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        const spans = mobileMenuToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Active navigation link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Smooth scroll for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        navMenu.classList.remove('active');
        const spans = mobileMenuToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
        
        window.scrollTo({
            top: targetSection.offsetTop - 80,
            behavior: 'smooth'
        });
    });
});

// Counter animation for stats
const animateCounter = (element, target, duration = 2000) => {
    let start = 0;
    const increment = target / (duration / 16);
    
    const counter = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(counter);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
};

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Animate stat numbers
            if (entry.target.classList.contains('stat-number')) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateCounter(entry.target, target);
            }
            
            // Animate progress bars
            if (entry.target.classList.contains('progress-fill')) {
                const progress = entry.target.getAttribute('data-progress');
                setTimeout(() => {
                    entry.target.style.width = progress + '%';
                }, 200);
            }
        }
    });
}, observerOptions);

// Observe stat numbers
document.querySelectorAll('.stat-number').forEach(stat => {
    fadeObserver.observe(stat);
});

// Observe progress bars
document.querySelectorAll('.progress-fill').forEach(bar => {
    fadeObserver.observe(bar);
});

// Observe skill cards
document.querySelectorAll('.skill-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(40px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    fadeObserver.observe(card);
});

// Observe education cards
document.querySelectorAll('.education-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(40px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.15}s, transform 0.6s ease ${index * 0.15}s`;
    fadeObserver.observe(card);
});

// Swiper Gallery Initialization
const gallerySwiper = new Swiper('.gallerySwiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    speed: 800,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        640: {
            slidesPerView: 1,
            spaceBetween: 20,
        },
        768: {
            slidesPerView: 2,
            spaceBetween: 30,
        },
        1024: {
            slidesPerView: 3,
            spaceBetween: 30,
        },
    },
    effect: 'slide',
    grabCursor: true,
});

// Contact form handling
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Create success notification
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #0a4d68, #088395);
        color: white;
        padding: 1.5rem 2rem;
        border-radius: 15px;
        box-shadow: 0 10px 40px rgba(10, 77, 104, 0.3);
        z-index: 10000;
        animation: slideInRight 0.5s ease;
        max-width: 350px;
    `;
    notification.innerHTML = `
        <strong>✓ Message Sent!</strong><br>
        <span style="opacity: 0.9; font-size: 0.9rem;">Thank you ${data.name}, I will get back to you soon.</span>
    `;
    
    document.body.appendChild(notification);
    
    // Remove notification after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.5s ease';
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 5000);
    
    // Reset form
    contactForm.reset();
});

// Add animation keyframes for notification
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Parallax effect for hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-background');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
    
    // Parallax for gradient orbs
    document.querySelectorAll('.gradient-orb').forEach((orb, index) => {
        const speed = 0.1 + (index * 0.05);
        orb.style.transform = `translate(${scrolled * speed}px, ${scrolled * speed * 0.5}px)`;
    });
});

// Loading animation for profile image
const profileImage = document.getElementById('profileImage');

profileImage.onerror = function() {
    this.src = 'https://via.placeholder.com/500x600/0a4d68/ffffff?text=Nurunnahar';
};

// Add shimmer effect to cards on hover
document.querySelectorAll('.skill-card, .education-card, .gallery-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.setProperty('--mouse-x', x + 'px');
        card.style.setProperty('--mouse-y', y + 'px');
    });
});

// Timeline animation on scroll
const timelineItems = document.querySelectorAll('.timeline-item');

const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateX(0)';
        }
    });
}, {
    threshold: 0.2
});

timelineItems.forEach(item => {
    timelineObserver.observe(item);
});

// Scroll reveal for sections
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll('.section').forEach(section => {
    revealObserver.observe(section);
});

// Typing effect for hero subtitle
const typingText = document.querySelector('.typing-text');
if (typingText) {
    const text = typingText.textContent;
    typingText.textContent = '';
    let charIndex = 0;
    
    setTimeout(() => {
        const typingInterval = setInterval(() => {
            if (charIndex < text.length) {
                typingText.textContent += text[charIndex];
                charIndex++;
            } else {
                clearInterval(typingInterval);
            }
        }, 80);
    }, 1500);
}

// Scroll to top button
const scrollBtn = document.createElement('button');
scrollBtn.innerHTML = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
        <polyline points="18 15 12 9 6 15"></polyline>
    </svg>
`;
scrollBtn.className = 'scroll-to-top';
scrollBtn.style.cssText = `
    position: fixed;
    bottom: 40px;
    right: 40px;
    width: 60px;
    height: 60px;
    background: linear-gradient(135deg, #ff6b6b, #ff8787);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 999;
    box-shadow: 0 8px 30px rgba(255, 107, 107, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
`;

scrollBtn.querySelector('svg').style.cssText = `
    width: 24px;
    height: 24px;
`;

document.body.appendChild(scrollBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
        scrollBtn.style.opacity = '1';
        scrollBtn.style.visibility = 'visible';
    } else {
        scrollBtn.style.opacity = '0';
        scrollBtn.style.visibility = 'hidden';
    }
});

scrollBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollBtn.addEventListener('mouseenter', () => {
    scrollBtn.style.transform = 'scale(1.15) rotate(360deg)';
    scrollBtn.style.boxShadow = '0 12px 40px rgba(255, 107, 107, 0.6)';
});

scrollBtn.addEventListener('mouseleave', () => {
    scrollBtn.style.transform = 'scale(1) rotate(0deg)';
    scrollBtn.style.boxShadow = '0 8px 30px rgba(255, 107, 107, 0.4)';
});

// Add smooth appearance for elements
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// Console message
console.log('%c👋 Welcome to Nurunnahar\'s Portfolio!', 'color: #0a4d68; font-size: 24px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.1);');
console.log('%c💙 Dedicated to excellence in nursing care', 'color: #ff6b6b; font-size: 16px; font-weight: 600;');
console.log('%c✨ Built with passion and attention to detail', 'color: #088395; font-size: 14px;');

// Enhanced hover effect for buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', function(e) {
        const rect = this.getBoundingClientRect();
        const ripple = document.createElement('span');
        ripple.style.cssText = `
            position: absolute;
            width: 20px;
            height: 20px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            pointer-events: none;
            animation: ripple 0.6s ease-out;
        `;
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            width: 300px;
            height: 300px;
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);