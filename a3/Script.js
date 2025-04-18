// 1. Toggle mobile menu
function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
    menu.classList.toggle('block');
}

// 2. Initialize cart from localStorage
function initCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

// 3. Add item to cart
function addToCart(productId, name, price, quantity = 1) {
    const cart = initCart();
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ id: productId, name, price, quantity });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    return cart;
}

// 4. Update cart item count display
function updateCartCount() {
    const cart = initCart();
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelectorAll('.cart-count').forEach(el => {
        el.textContent = count;
        el.classList.toggle('hidden', count === 0);
    });
}

// 5. Remove item from cart
function removeFromCart(productId) {
    let cart = initCart();
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    return cart;
}

// 6. Calculate cart total
function calculateCartTotal() {
    const cart = initCart();
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// 7. Filter products by category
function filterProducts(category) {
    const products = document.querySelectorAll('.product-card');
    
    products.forEach(product => {
        const matchesCategory = category === 'all' || 
                              product.dataset.category === category;
        product.classList.toggle('hidden', !matchesCategory);
    });
}

// 8. Smooth scroll to section
function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({
        behavior: 'smooth'
    });
}

// 9. Form validation for contact form
function validateContactForm() {
    const form = document.getElementById('contact-form');
    const name = form.elements['name'].value.trim();
    const email = form.elements['email'].value.trim();
    const message = form.elements['message'].value.trim();
    
    if (!name || !email || !message) {
        alert('Please fill in all required fields');
        return false;
    }
    
    if (!/^\S+@\S+\.\S+$/.test(email)) {
        alert('Please enter a valid email address');
        return false;
    }
    
    return true;
}

// 10. Image gallery lightbox
function initImageLightbox() {
    const images = document.querySelectorAll('.gallery-image');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    
    images.forEach(img => {
        img.addEventListener('click', () => {
            lightboxImg.src = img.src;
            lightbox.classList.remove('hidden');
        });
    });
    
    document.getElementById('close-lightbox').addEventListener('click', () => {
        lightbox.classList.add('hidden');
    });
}

// Initialize essential functions when DOM loads
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    initImageLightbox();
    
    // Add event listeners for mobile menu toggle
    document.getElementById('menu-toggle').addEventListener('click', toggleMobileMenu);
    
    // Add to cart buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            addToCart(
                productCard.dataset.id,
                productCard.dataset.name,
                parseFloat(productCard.dataset.price)
            );
        });
    });
});
