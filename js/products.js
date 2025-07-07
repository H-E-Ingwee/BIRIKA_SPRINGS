// js/products.js

document.addEventListener('DOMContentLoaded', function() {
    console.log("BIRIKA SPRINGS Products Page script loaded and ready for enhancements!");

    // --- Global Cart Variables ---
    let cart = JSON.parse(localStorage.getItem('birikaSpringsCart')) || [];
    const cartCountSpan = document.querySelector('.cart-count');
    const shoppingCartModal = document.getElementById('shoppingCartModal');
    const cartItemsContainer = document.getElementById('cartItemsContainer');
    const cartTotalSpan = document.getElementById('cartTotal');
    const cartSummaryDiv = document.getElementById('cartSummary');
    const emptyCartMessage = document.getElementById('emptyCartMessage');
    const clearCartBtn = document.getElementById('clearCartBtn');
    const proceedToCheckoutBtn = document.getElementById('proceedToCheckoutBtn');

    // --- Helper function to save cart to localStorage ---
    function saveCart() {
        localStorage.setItem('birikaSpringsCart', JSON.stringify(cart));
    }

    // --- Helper function to update cart display (count and modal content) ---
    function updateCartDisplay() {
        // Update cart count in navbar
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCountSpan.textContent = totalItems;

        // Update cart modal content
        cartItemsContainer.innerHTML = ''; // Clear previous items
        let overallTotal = 0;

        if (cart.length === 0) {
            emptyCartMessage.classList.remove('d-none');
            cartSummaryDiv.classList.add('d-none');
        } else {
            emptyCartMessage.classList.add('d-none');
            cartSummaryDiv.classList.remove('d-none');

            cart.forEach(item => {
                const itemTotal = item.price * item.quantity;
                overallTotal += itemTotal;

                const cartItemDiv = document.createElement('div');
                cartItemDiv.classList.add('cart-item');
                cartItemDiv.innerHTML = `
                    <img src="${item.image}" alt="${item.name}" class="img-fluid">
                    <div class="cart-item-details">
                        <h6>${item.name}</h6>
                        <p>KSh ${item.price} each</p>
                    </div>
                    <div class="cart-item-quantity">
                        <button class="btn btn-outline-primary btn-sm decrease-quantity" data-product-id="${item.id}">-</button>
                        <span>${item.quantity}</span>
                        <button class="btn btn-outline-primary btn-sm increase-quantity" data-product-id="${item.id}">+</button>
                    </div>
                    <div class="cart-item-price">KSh ${itemTotal.toFixed(2)}</div>
                    <button class="btn btn-danger btn-sm ms-3 remove-item" data-product-id="${item.id}"><i class="fas fa-trash"></i></button>
                `;
                cartItemsContainer.appendChild(cartItemDiv);
            });

            cartTotalSpan.textContent = `KSh ${overallTotal.toFixed(2)}`;
        }

        // Attach event listeners for quantity buttons and remove buttons within the modal
        cartItemsContainer.querySelectorAll('.increase-quantity').forEach(button => {
            button.addEventListener('click', (event) => {
                const productId = event.target.getAttribute('data-product-id');
                changeQuantity(productId, 1);
            });
        });

        cartItemsContainer.querySelectorAll('.decrease-quantity').forEach(button => {
            button.addEventListener('click', (event) => {
                const productId = event.target.getAttribute('data-product-id');
                changeQuantity(productId, -1);
            });
        });

        cartItemsContainer.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', (event) => {
                const productId = event.target.getAttribute('data-product-id');
                removeItem(productId);
            });
        });
    }

    // --- Function to add item to cart ---
    function addToCart(product, quantity = 1) { // Added quantity parameter
        const existingItem = cart.find(item => item.id === product.id);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({ ...product, quantity: quantity });
        }
        saveCart();
        updateCartDisplay();

        // Show "added to cart" message
        cartMessage.textContent = `${quantity} x ${product.name} added to cart!`;
        cartMessage.classList.add('cart-success');
        setTimeout(() => {
            cartMessage.classList.remove('cart-success');
            cartMessage.textContent = '';
        }, 3000);
    }

    // --- Function to change item quantity ---
    function changeQuantity(productId, change) {
        const itemIndex = cart.findIndex(item => item.id === productId);
        if (itemIndex > -1) {
            cart[itemIndex].quantity += change;
            if (cart[itemIndex].quantity <= 0) {
                cart.splice(itemIndex, 1); // Remove if quantity drops to 0 or less
            }
            saveCart();
            updateCartDisplay();
        }
    }

    // --- Function to remove item from cart ---
    function removeItem(productId) {
        cart = cart.filter(item => item.id !== productId);
        saveCart();
        updateCartDisplay();
    }

    // --- Function to clear the entire cart ---
    function clearCart() {
        cart = [];
        saveCart();
        updateCartDisplay();
    }

    // --- Function to prepare cart data for checkout and redirect ---
    function proceedToCheckout() {
        if (cart.length === 0) {
            alert('Your cart is empty. Please add items before proceeding to checkout.');
            return;
        }

        let checkoutMessage = "My Order Details:\n\n";
        let totalAmount = 0;

        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            checkoutMessage += `- ${item.quantity} x ${item.name} (KSh ${item.price} each) = KSh ${itemTotal.toFixed(2)}\n`;
            totalAmount += itemTotal;
        });

        checkoutMessage += `\nTotal Estimated Amount: KSh ${totalAmount.toFixed(2)}\n`;
        checkoutMessage += "\nPlease provide your full contact details and preferred delivery address/time.";

        // Store the formatted message in localStorage for the contact page
        localStorage.setItem('checkoutCartMessage', checkoutMessage);
        // Store the raw cart data as well, in case contact page needs to parse it
        localStorage.setItem('checkoutCartData', JSON.stringify(cart));

        // Clear the cart after preparing for checkout (optional, can be done after successful order)
        clearCart(); // This clears the cart on the products page immediately

        // Redirect to contact page
        window.location.href = 'contact.html';
    }


    // --- Event Listeners ---

    // Initial cart display on page load
    updateCartDisplay();

    // Attach event listeners for Add to Cart buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const productId = event.target.getAttribute('data-product-id');
            const productName = event.target.getAttribute('data-product-name');
            const productPrice = parseFloat(event.target.getAttribute('data-product-price'));
            const productImage = event.target.getAttribute('data-product-image');
            const quantityInput = event.target.closest('.product-details').querySelector('.quantity-input');
            const quantity = parseInt(quantityInput.value);

            const product = { id: productId, name: productName, price: productPrice, image: productImage };
            addToCart(product, quantity);
        });
    });

    // Event listeners for quantity controls on product cards
    document.querySelectorAll('.quantity-control .increase-quantity').forEach(button => {
        button.addEventListener('click', (event) => {
            const quantityInput = event.target.closest('.quantity-control').querySelector('.quantity-input');
            quantityInput.value = parseInt(quantityInput.value) + 1;
        });
    });

    document.querySelectorAll('.quantity-control .decrease-quantity').forEach(button => {
        button.addEventListener('click', (event) => {
            const quantityInput = event.target.closest('.quantity-control').querySelector('.quantity-input');
            const currentValue = parseInt(quantityInput.value);
            if (currentValue > 1) { // Ensure quantity doesn't go below 1
                quantityInput.value = currentValue - 1;
            }
        });
    });


    // Event listener for the Shopping Cart Modal to update its content when shown
    if (shoppingCartModal) {
        shoppingCartModal.addEventListener('show.bs.modal', updateCartDisplay);
    }

    // Event listener for Clear Cart button
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', clearCart);
    }

    // Event listener for Proceed to Checkout button
    if (proceedToCheckoutBtn) {
        proceedToCheckoutBtn.addEventListener('click', proceedToCheckout);
    }


    // --- Other existing JS (from previous steps, included for completeness) ---

    // Scroll-Triggered Animations (Intersection Observer)
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    };
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    animateElements.forEach(element => { observer.observe(element); });

    // Request Quote Modal Logic
    const requestQuoteModal = document.getElementById('requestQuoteModal');
    if (requestQuoteModal) {
        requestQuoteModal.addEventListener('show.bs.modal', event => {
            const button = event.relatedTarget;
            const inquiryType = button.getAttribute('data-inquiry-type');
            const modalTitle = requestQuoteModal.querySelector('.modal-title');
            const inquiryTypeSpan = requestQuoteModal.querySelector('#inquiryType');
            modalTitle.textContent = `Request a Quote for ${inquiryType}`;
            inquiryTypeSpan.textContent = inquiryType;
        });
        const quoteForm = requestQuoteModal.querySelector('form');
        quoteForm.addEventListener('submit', function(event) {
            event.preventDefault();
            console.log('Quote Request Submitted:', {
                inquiryType: quoteForm.querySelector('#inquiryType').textContent,
                name: quoteForm.querySelector('#quoteName').value,
                email: quoteForm.querySelector('#quoteEmail').value,
                phone: quoteForm.querySelector('#quotePhone').value,
                message: quoteForm.querySelector('#quoteMessage').value
            });
            alert('Your quote request has been sent! We will contact you soon.');
            const modalInstance = bootstrap.Modal.getInstance(requestQuoteModal);
            modalInstance.hide();
            quoteForm.reset();
        });
    }

    // Product Filtering by Size
    const productFilter = document.getElementById('productFilter');
    const productCardsContainer = document.getElementById('productCardsContainer');
    const productItems = productCardsContainer ? productCardsContainer.querySelectorAll('.col-lg-4') : [];
    productFilter.addEventListener('change', (event) => {
        const selectedSize = event.target.value;
        productItems.forEach(itemCol => {
            const itemSize = itemCol.getAttribute('data-size');
            if (selectedSize === 'all' || itemSize === selectedSize) {
                itemCol.classList.remove('hidden');
            } else {
                itemCol.classList.add('hidden');
            }
        });
    });
});
// --- Future Enhancements for Products page can go here ---
// - Implement AJAX loading for product details