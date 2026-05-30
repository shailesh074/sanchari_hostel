
document.addEventListener('DOMContentLoaded', function() {
    console.log('Sanchari Website Loading...');
    
    // Immediately hide loading screen if critical content loaded
    const loadingScreen = document.querySelector('.loading-screen');
    
    // Check if critical content is loaded
    function checkCriticalContent() {
        const body = document.body;
        const navbar = document.querySelector('.navbar');
        const heroContent = document.querySelector('.hero-content');
        
        if (body && navbar && heroContent) {
            return true;
        }
        return false;
    }
    
    // Show the site after 2 seconds max, even if images not loaded
    let loadingTimeout = setTimeout(() => {
        loadingScreen.style.opacity = '0';
        loadingScreen.style.visibility = 'hidden';
        document.body.style.opacity = '1';
        initWebsite();
    }, 2000);
    
    // Try to load faster if critical content ready
    if (checkCriticalContent()) {
        clearTimeout(loadingTimeout);
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            loadingScreen.style.visibility = 'hidden';
            document.body.style.opacity = '1';
            initWebsite();
        }, 500);
    }
    
    function initWebsite() {
        console.log('Initializing Sanchari Website...');
        
        // Navbar scroll effect
        const navbar = document.querySelector('.navbar');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
        
        // Scroll reveal animations
        const revealElements = document.querySelectorAll('.reveal-up, .reveal-scale');
        const revealOnScroll = () => {
            revealElements.forEach(el => {
                const elTop = el.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                const revealPoint = 100;
                
                if (elTop < windowHeight - revealPoint) {
                    el.classList.add('revealed');
                }
            });
        };
        window.addEventListener('scroll', revealOnScroll);
        revealOnScroll();
        
        // Testimonial slider
        const testimonialCards = document.querySelectorAll('.testimonial-card');
        const dots = document.querySelectorAll('.dot');
        const prevBtn = document.querySelector('.slider-prev');
        const nextBtn = document.querySelector('.slider-next');
        let currentSlide = 0;
        
        const showSlide = (index) => {
            testimonialCards.forEach(card => card.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            testimonialCards[index].classList.add('active');
            dots[index].classList.add('active');
            currentSlide = index;
        };
        
        if (nextBtn && prevBtn) {
            nextBtn.addEventListener('click', () => {
                let nextIndex = (currentSlide + 1) % testimonialCards.length;
                showSlide(nextIndex);
            });
            
            prevBtn.addEventListener('click', () => {
                let prevIndex = (currentSlide - 1 + testimonialCards.length) % testimonialCards.length;
                showSlide(prevIndex);
            });
        }
        
        if (dots.length > 0) {
            dots.forEach((dot, index) => {
                dot.addEventListener('click', () => showSlide(index));
            });
        }
        
        // Auto slide testimonials
        setInterval(() => {
            let nextIndex = (currentSlide + 1) % testimonialCards.length;
            showSlide(nextIndex);
        }, 8000);
        
        // Booking buttons
        const bookingButtons = document.querySelectorAll('.booking-btn, .cta-primary, .cta-booking-btn, .room-book-btn');
        bookingButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                alert('Thank you for your interest in Sanchari Hostel! For booking inquiries, please email welcome@sanchari.in or call +91 98765 43210.');
            });
        });
        
        // Smooth scroll for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        // Parallax effect for hero
        const hero = document.querySelector('.hero');
        if (hero) {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const rate = scrolled * -0.5;
                hero.style.transform = `translateY(${rate}px)`;
            });
        }
        
        // Image hover effects
        const galleryItems = document.querySelectorAll('.masonry-item, .room-img');
        galleryItems.forEach(item => {
            const img = item.querySelector('img');
            if (!img) return;
            
            item.addEventListener('mousemove', (e) => {
                const { left, top, width, height } = item.getBoundingClientRect();
                const x = (e.clientX - left) / width - 0.5;
                const y = (e.clientY - top) / height - 0.5;
                
                img.style.transform = `scale(1.05) rotateX(${y * 5}deg) rotateY(${x * 5}deg)`;
            });
            
            item.addEventListener('mouseleave', () => {
                img.style.transform = 'scale(1) rotateX(0) rotateY(0)';
            });
        });
        
        // Mobile menu toggle
        const menuToggle = document.querySelector('.menu-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        if (menuToggle && navMenu) {
            menuToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                menuToggle.innerHTML = navMenu.classList.contains('active') ? 
                    '<i class="fas fa-times"></i>' : 
                    '<i class="fas fa-bars"></i>';
            });
        }
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navMenu && navMenu.classList.contains('active') && 
                !navMenu.contains(e.target) && 
                !menuToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                if (menuToggle) {
                    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                }
            }
        });
        
        // Update year in footer
        const yearElement = document.getElementById('currentYear');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
        
        // Add ripple effect to buttons
        const buttons = document.querySelectorAll('button:not(.menu-toggle):not(.slider-prev):not(.slider-next)');
        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.7);
                    transform: scale(0);
                    animation: ripple-animation 0.6s linear;
                    width: ${size}px;
                    height: ${size}px;
                    top: ${y}px;
                    left: ${x}px;
                `;
                
                this.appendChild(ripple);
                setTimeout(() => {
                    if (ripple.parentNode === this) {
                        ripple.remove();
                    }
                }, 600);
            });
        });
        
        // Add CSS for ripple
        if (!document.querySelector('#ripple-style')) {
            const style = document.createElement('style');
            style.id = 'ripple-style';
            style.textContent = `
                @keyframes ripple-animation {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
                button:not(.menu-toggle):not(.slider-prev):not(.slider-next) {
                    position: relative;
                    overflow: hidden;
                }
            `;
            document.head.appendChild(style);
        }
        
        console.log('Sanchari Website Initialized Successfully!');
    }
    
    // Handle images loading
    window.addEventListener('load', function() {
        console.log('All page resources loaded');
        // Force hide loading screen if still visible
        if (loadingScreen.style.visibility !== 'hidden') {
            loadingScreen.style.opacity = '0';
            loadingScreen.style.visibility = 'hidden';
        }
    });
    
    // Handle any errors
    window.addEventListener('error', function(e) {
        console.error('Page error:', e);
        // Hide loading screen on error
        loadingScreen.style.opacity = '0';
        loadingScreen.style.visibility = 'hidden';
    }, true);
});

