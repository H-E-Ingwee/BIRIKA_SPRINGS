// js/animations.js

document.addEventListener('DOMContentLoaded', function() {
    // --- Scroll-Triggered Animations (Intersection Observer) ---
    const animateElements = document.querySelectorAll('.animate-on-scroll');

    const observerOptions = {
        root: null, // Use the viewport as the root
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the element is visible
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible'); // Trigger CSS animation
                // Check if it's an animated number and start animation
                if (entry.target.querySelector('.animated-number')) {
                    animateNumber(entry.target.querySelector('.animated-number'));
                }
                 // Check if it's an animated text and set text
                if (entry.target.querySelector('.animated-text')) {
                    const animatedTextElement = entry.target.querySelector('.animated-text');
                    animatedTextElement.textContent = animatedTextElement.getAttribute('data-text');
                }
                observer.unobserve(entry.target); // Stop observing once visible
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    animateElements.forEach(element => {
        observer.observe(element);
    });

    // --- Animated Number Function for Quick Facts ---
    function animateNumber(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const start = 0;
        let startTime = null;

        function easeOutQuad(t) {
            return t * (2 - t);
        }

        function animate(currentTime) {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            const easedProgress = easeOutQuad(progress); // Apply easing
            const currentValue = Math.floor(easedProgress * (target - start) + start);
            element.textContent = currentValue;

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                element.textContent = target; // Ensure final value is accurate
            }
        }
        requestAnimationFrame(animate);
    }

    // --- Dynamic Hero Tagline Rotation ---
    const dynamicTaglineElement = document.getElementById('dynamicTagline');
    if (dynamicTaglineElement) {
        const taglines = [
            "100% Natural • Pure Water • Premium Quality",
            "Hydration for a Healthier You",
            "Delivered Fresh, Right to Your Doorstep",
            "Trusted Quality, Every Single Drop"
        ];
        let currentTaglineIndex = 0;

        function rotateTagline() {
            dynamicTaglineElement.style.opacity = 0; // Fade out
            setTimeout(() => {
                currentTaglineIndex = (currentTaglineIndex + 1) % taglines.length;
                dynamicTaglineElement.textContent = taglines[currentTaglineIndex];
                dynamicTaglineElement.style.opacity = 1; // Fade in
            }, 500); // Wait for fade out
        }

        // Start rotation after initial animation
        setTimeout(() => {
            setInterval(rotateTagline, 5000); // Change every 5 seconds
        }, 1500); // Start 1.5 seconds after page load
    }

    console.log("BIRIKA SPRINGS animations.js loaded.");
});
    // --- Future Enhancements for animations.js can go here ---
    // - Add more complex animations using GSAP or similar libraries
    // - Implement lazy loading for images and videos
    // - Enhance accessibility features for animations
    // - Create reusable animation functions for different elements
    // - Integrate with a CMS for dynamic content loading