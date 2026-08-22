// Wait for the HTML to fully load before running the script
document.addEventListener('DOMContentLoaded', function() {

    // ==========================================
    // 1. MOBILE MENU TOGGLE LOGIC
    // ==========================================
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.getElementById('navMenu');
    const body = document.body;

    if (mobileMenuToggle && navMenu) {

        // Helper function to handle opening/closing
        function toggleMenu() {
            navMenu.classList.toggle('active');
            body.classList.toggle('menu-open');

            const icon = mobileMenuToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
                mobileMenuToggle.setAttribute('aria-expanded', 'true');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
            }
        }

        // Toggle when hamburger button is clicked
        mobileMenuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation(); // Prevents the click from immediately triggering the "click outside" listener
            toggleMenu();
        });

        // Close menu when a navigation link is clicked
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                if (navMenu.classList.contains('active')) {
                    toggleMenu();
                }
            });
        });

        // Close menu when clicking OUTSIDE of it (on the page background)
        document.addEventListener('click', function(e) {
            if (navMenu.classList.contains('active') &&
                !navMenu.contains(e.target) &&
                !mobileMenuToggle.contains(e.target)) {
                toggleMenu();
            }
        });

        // Close menu on Escape key, and on resize back up to desktop width
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                toggleMenu();
            }
        });

        window.addEventListener('resize', function() {
            if (window.innerWidth > 992 && navMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    } else {
        console.warn("Mobile menu elements not found! Check your HTML IDs.");
    }

    // ==========================================
    // 2. FAQ ACCORDION LOGIC
    // ==========================================
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                // Close all other open FAQs
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                    }
                });
                // Toggle the clicked FAQ
                item.classList.toggle('active');
            });
        }
    });

    // ==========================================
    // 3. FORM HANDLING (Prevents page reload)
    // ==========================================
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            // In a real website, you would send this data to a server here.
            // For now, we show a success message and reset the form.
            alert('Thank you! Your inquiry has been received. We will contact you soon.');
            form.reset();
        });
    });

    // ==========================================
    // 4. HIGHLIGHT ACTIVE PAGE IN NAVIGATION
    // ==========================================
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        // Match the current page URL to the link's href
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // ==========================================
    // 5. STICKY HEADER SHADOW ON SCROLL
    // ==========================================
    const header = document.querySelector('.header');
    if (header) {
        const updateHeaderShadow = () => {
            if (window.scrollY > 8) {
                header.classList.add('is-scrolled');
            } else {
                header.classList.remove('is-scrolled');
            }
        };
        updateHeaderShadow();
        window.addEventListener('scroll', updateHeaderShadow, { passive: true });
    }

});
