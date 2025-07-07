// js/locations.js

document.addEventListener('DOMContentLoaded', function() {
    console.log("BIRIKA SPRINGS Locations Page script loaded and ready for enhancements!");

    // --- Scroll-Triggered Animations (Intersection Observer) ---
    // This code makes elements with the class 'animate-on-scroll'
    // fade in and slide up as they enter the viewport.

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
                observer.unobserve(entry.target); // Stop observing once visible
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    animateElements.forEach(element => {
        observer.observe(element);
    });

    // --- Check Delivery Area Functionality ---
    const deliveryAreaInput = document.getElementById('deliveryAreaInput');
    const checkDeliveryBtn = document.getElementById('checkDeliveryBtn');
    const deliveryMessage = document.getElementById('deliveryMessage');

    // Define your delivery areas (case-insensitive for checking)
    const deliveryAreas = [
        'kajiado', 'kitengela', 'ngong', 'isinya', 'birika', 'matasia',
        'kiserian', 'rongai', 'ongata rongai', 'kikuyu', 'athiriver' // Example additional areas
    ];

    checkDeliveryBtn.addEventListener('click', () => {
        const inputArea = deliveryAreaInput.value.trim().toLowerCase();
        if (inputArea === '') {
            deliveryMessage.textContent = 'Please enter an area.';
            deliveryMessage.className = 'mt-3 text-center fw-bold text-warning'; // Yellow for warning
            return;
        }

        if (deliveryAreas.includes(inputArea)) {
            deliveryMessage.textContent = `Great news! We deliver to ${deliveryAreaInput.value}!`;
            deliveryMessage.className = 'mt-3 text-center fw-bold delivery-success';
        } else {
            deliveryMessage.textContent = `Sorry, we currently do not deliver to ${deliveryAreaInput.value}. Please contact us for custom arrangements.`;
            deliveryMessage.className = 'mt-3 text-center fw-bold delivery-fail';
        }
    });

    // Optional: Clear message on input change
    deliveryAreaInput.addEventListener('input', () => {
        deliveryMessage.textContent = '';
        deliveryMessage.className = 'mt-3 text-center fw-bold'; // Reset class
    });


    // --- Filter Physical Locations by Area ---
    const locationFilter = document.getElementById('locationFilter');
    const locationCardsContainer = document.getElementById('locationCardsContainer');
    const locationCards = locationCardsContainer ? locationCardsContainer.querySelectorAll('.col-lg-4') : []; // Select the column divs containing the cards

    locationFilter.addEventListener('change', (event) => {
        const selectedArea = event.target.value;

        locationCards.forEach(cardCol => {
            const cardArea = cardCol.getAttribute('data-area');
            if (selectedArea === 'all' || cardArea === selectedArea) {
                cardCol.classList.remove('hidden');
                // Re-trigger animation if needed (optional, can be performance heavy for many items)
                // cardCol.classList.remove('is-visible');
                // void cardCol.offsetWidth; // Trigger reflow
                // cardCol.classList.add('is-visible');
            } else {
                cardCol.classList.add('hidden');
            }
        });
    });

    // Initial filter application in case 'all' is not default or for page load
    // You might want to trigger this on DOMContentLoaded if you want filtering to apply immediately
    // For now, it's triggered by change event.
});
