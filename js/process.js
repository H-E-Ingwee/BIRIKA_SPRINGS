// js/process.js

document.addEventListener('DOMContentLoaded', function() {
    console.log("BIRIKA SPRINGS Our Process Page script loaded and ready for enhancements!");

    // --- Staggered animation for process steps ---
    // This code uses Intersection Observer to trigger a staggered animation
    // for elements with the class '.process-step-card' within the #detailed-steps section.
    // It adds a 'stagger-animate' class and sets a 'transition-delay'
    // for each card, making them appear sequentially as they scroll into view.

    const processStepCards = document.querySelectorAll('#detailed-steps .process-step-card');
    if (processStepCards.length > 0) {
        const observerOptions = {
            root: null, // Use the viewport as the root
            rootMargin: '0px',
            threshold: 0.2 // Trigger when 20% of the element is visible
        };

        const processObserverCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible'); // Trigger CSS animation
                    observer.unobserve(entry.target); // Stop observing once visible
                }
            });
        };

        const processObserver = new IntersectionObserver(processObserverCallback, observerOptions);

        processStepCards.forEach((card, index) => {
            card.style.transitionDelay = `${index * 0.15}s`; // Stagger delay (0.15s between each card)
            card.classList.add('stagger-animate'); // Add class for initial hidden state and transition
            processObserver.observe(card);
        });
    }

    // --- Future Enhancements for Process page can go here ---
    // - Interactive diagrams of the purification process
    // - Expandable sections for each step with more details
    // - Video embeds demonstrating the process
});
