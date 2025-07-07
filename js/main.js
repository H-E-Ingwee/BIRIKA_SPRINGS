// js/main.js

document.addEventListener('DOMContentLoaded', function() {
    // --- Smooth Scrolling for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Prevent default jump behavior

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Get the fixed navbar height to offset scroll position
                const navbar = document.querySelector('.navbar');
                const navbarHeight = navbar ? navbar.offsetHeight : 0;

                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - navbarHeight - 20; // Add some extra padding

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth' // Smooth scroll
                });

                // Optional: Close navbar toggler on click for mobile
                const navbarToggler = document.querySelector('.navbar-toggler');
                const navbarCollapse = document.getElementById('navbarNav');
                if (navbarToggler && navbarCollapse && navbarCollapse.classList.contains('show')) {
                    const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                    if (bsCollapse) {
                        bsCollapse.hide();
                    }
                }
            }
        });
    });

    console.log("BIRIKA SPRINGS main.js loaded.");
});
// --- Future Enhancements for main.js can go here ---