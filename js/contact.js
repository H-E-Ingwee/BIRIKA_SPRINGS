// js/contact.js

document.addEventListener('DOMContentLoaded', function() {
    console.log("BIRIKA SPRINGS Contact Us Page script loaded and ready for enhancements!");

    // --- Contact Form Submission Handling with Validation & Confirmation Modal ---
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    const messageTextarea = document.getElementById('message');
    const confirmationModal = new bootstrap.Modal(document.getElementById('confirmationModal')); // Initialize Bootstrap modal

    // --- Pre-fill message with cart data if available ---
    const storedCartMessage = localStorage.getItem('checkoutCartMessage');
    if (storedCartMessage && messageTextarea) {
        messageTextarea.value = storedCartMessage;
        // Optionally, remove the data from localStorage after use
        localStorage.removeItem('checkoutCartMessage');
        localStorage.removeItem('checkoutCartData'); // Also clear the raw cart data
        // Set subject to "Product Order Inquiry" if cart data is present
        const subjectInput = document.getElementById('subject');
        if (subjectInput && subjectInput.value.trim() === '') {
            subjectInput.value = 'Product Order Inquiry';
            subjectInput.classList.add('is-valid'); // Mark as valid initially
        }
    }

    if (contactForm) {
        // Add real-time validation feedback
        Array.from(contactForm.elements).forEach(input => {
            if (input.type !== 'submit' && input.type !== 'button' && input.id !== 'phoneNumber') { // Exclude submit, button, and optional phone
                input.addEventListener('input', () => {
                    if (input.checkValidity()) {
                        input.classList.remove('is-invalid');
                        input.classList.add('is-valid');
                    } else {
                        input.classList.remove('is-valid');
                        input.classList.add('is-invalid');
                    }
                });
            } else if (input.id === 'phoneNumber') { // Optional phone number validation (basic)
                input.addEventListener('input', () => {
                    if (input.value.trim() === '' || /^\+?\d{7,15}$/.test(input.value.trim())) { // Basic phone number regex
                        input.classList.remove('is-invalid');
                        input.classList.add('is-valid');
                    } else {
                        input.classList.remove('is-valid');
                        input.classList.add('is-invalid');
                    }
                });
            }
        });


        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission

            // Reset previous validation states and message
            Array.from(contactForm.elements).forEach(input => {
                input.classList.remove('is-valid', 'is-invalid');
            });
            formMessage.textContent = '';
            formMessage.className = 'mt-4 text-center fw-bold';

            let isValid = true;

            // Trigger Bootstrap's built-in validation checks
            if (!contactForm.checkValidity()) {
                isValid = false;
                event.stopPropagation(); // Stop event propagation if form is invalid
            }

            // Manually apply validation classes for all required fields
            Array.from(contactForm.elements).forEach(input => {
                if (input.required && !input.checkValidity()) {
                    input.classList.add('is-invalid');
                } else if (input.required) {
                    input.classList.add('is-valid');
                }
            });

            // Specific email validation for pattern
            const emailAddressInput = document.getElementById('emailAddress');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailAddressInput.required && !emailRegex.test(emailAddressInput.value.trim())) {
                emailAddressInput.classList.remove('is-valid');
                emailAddressInput.classList.add('is-invalid');
                isValid = false;
            }


            if (!isValid) {
                formMessage.textContent = 'Please correct the errors in the form.';
                formMessage.className = 'mt-4 text-center fw-bold form-fail';
                return; // Stop submission if validation fails
            }

            // If validation passes, simulate submission
            console.log('Contact Form Data:', {
                fullName: document.getElementById('fullName').value.trim(),
                emailAddress: emailAddressInput.value.trim(),
                phoneNumber: document.getElementById('phoneNumber').value.trim(),
                subject: document.getElementById('subject').value.trim(),
                message: messageTextarea.value.trim()
            });

            // Simulate success after a short delay
            setTimeout(() => {
                const isSuccess = Math.random() > 0.1; // 90% chance of success for demo

                if (isSuccess) {
                    // Show confirmation modal instead of inline message
                    confirmationModal.show();
                    contactForm.reset(); // Clear the form on success
                    // Clear valid/invalid states on success
                    Array.from(contactForm.elements).forEach(input => {
                        input.classList.remove('is-valid', 'is-invalid');
                    });
                } else {
                    formMessage.textContent = 'Oops! Something went wrong. Please try again later.';
                    formMessage.className = 'mt-4 text-center fw-bold form-fail';
                }

                // Hide inline message after a few seconds if it was shown
                setTimeout(() => {
                    formMessage.textContent = '';
                    formMessage.className = 'mt-4 text-center fw-bold'; // Reset class
                }, 5000);

            }, 500); // Simulate network delay
        });
    }

    // --- Live Chat Integration (Simulated) ---
    const liveChatBtn = document.getElementById('liveChatBtn');
    if (liveChatBtn) {
        liveChatBtn.addEventListener('click', () => {
            const tempMessageDiv = document.createElement('div');
            // Using Bootstrap alert classes and Animate.css for subtle animation
            tempMessageDiv.className = 'alert alert-info alert-dismissible fade show fixed-bottom-0 mx-auto mb-3' +
                                     ' text-center shadow-lg animate__animated animate__fadeInUp';
            tempMessageDiv.style.maxWidth = '400px';
            tempMessageDiv.style.zIndex = '1050'; // Ensure it's above other elements
            tempMessageDiv.innerHTML = `
                Starting live chat... (This is a simulated chat. In a real site, a chat window would open.)
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            `;
            document.body.appendChild(tempMessageDiv);

            // Automatically hide the message after a few seconds
            setTimeout(() => {
                if (tempMessageDiv.parentNode) { // Check if element still exists
                    tempMessageDiv.classList.remove('show');
                    tempMessageDiv.classList.add('animate__fadeOutDown'); // Fade out animation
                    // Remove element after animation completes
                    tempMessageDiv.addEventListener('animationend', () => tempMessageDiv.remove());
                }
            }, 4000); // Message disappears after 4 seconds
        });
    }

    // --- Phone Number Click-to-Call (Ensured by HTML tel: links) ---
    // All phone numbers in the HTML are already set up with tel: links,
    // so no additional JavaScript is needed for this.

    // --- Google Maps Embed (already in HTML, no JS needed for basic embed) ---
    // The iframe is directly embedded in contact.html with updated coordinates.
    // For more advanced features (dynamic markers, user location, etc.),
    // you would use Google Maps JavaScript API here.

});
