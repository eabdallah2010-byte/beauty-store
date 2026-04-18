// قاعدة بيانات المنتجات مع صور حقيقية
const products = [
    { id: 1, name: "فرش مكياج احترافي 12 قطعة", price: 189, category: "tools", image: "https://m.media-amazon.com/images/I/71zQqkz3+wL._AC_SL1500_.jpg", imageFallback: "https://images.unsplash.com/photo-1512496015851-a90fb38f96ab?w=300", featured: true },
    { id: 2, name: "أحمر شفاه غير لامع", price: 95, category: "makeup", image: "https://m.media-amazon.com/images/I/61pBmZYBkOL._SL1500_.jpg", imageFallback: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=300", featured: true },
    { id: 3, name: "ماسكارا طويلة الرموش", price: 75, category: "makeup", image: "https://m.media-amazon.com/images/I/61C+zPv7HHL._SL1500_.jpg", imageFallback: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=300", featured: true },
    { id: 4, name: "كريم أساس تغطية كاملة", price: 165, category: "makeup", image: "https://m.media-amazon.com/images/I/61z2TkRT2UL._SL1500_.jpg", imageFallback: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300", featured: true },
    { id: 5, name: "جهاز تنظيف البشرة", price: 359, category: "skincare", image: "https://m.media-amazon.com/images/I/71Kvx7Yp+IL._SL1500_.jpg", imageFallback: "https://images.unsplash.com/photo-1620916566390-2f42b9c6c5a4?w=300", featured: true },
    { id: 6, name: "مجموعة فرش كونتور", price: 149, category: "tools", image: "https://m.media-amazon.com/images/I/71lBlbDs6TL._SL1500_.jpg", imageFallback: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=300", featured: false },
    { id: 7, name: "سيروم فيتامين سي", price: 199, category: "skincare", image: "https://m.media-amazon.com/images/I/71YkL0w0zHL._SL1500_.jpg", imageFallback: "https://images.unsplash.com/photo-1570194065650-d99fb4a4c7e1?w=300", featured: false },
    { id: 8, name: "باليت ظلال عيون 24 لون", price: 279, category: "makeup", image: "https://m.media-amazon.com/images/I/81YKOZ3Lz+L._SL1500_.jpg", imageFallback: "https://images.unsplash.com/photo-1512496015851-a90fb38f96ab?w=300", featured: false },
    { id: 9, name: "مقشر الوجه اللطيف", price: 115, category: "skincare", image: "https://m.media-amazon.com/images/I/61T6cLQN0hL._SL1500_.jpg", imageFallback: "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?w=300", featured: false },
    { id: 10, name: "مكواة تجعيد الشعر", price: 429, category: "tools", image: "https://m.media-amazon.com/images/I/61qKQNLpYEL._SL1500_.jpg", imageFallback: "https://images.unsplash.com/photo-1522338140262-f46f5913618a?w=300", featured: false }
];

// سلة التسوق
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// تحديث عدد المنتجات في السلة
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
}

// حفظ السلة
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

// إضافة منتج
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    saveCart();
    showToast('✅ تم إضافة المنتج إلى السلة');
}

// إزالة منتج
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    showToast('🗑️ تم إزالة المنتج من السلة');
    if (window.location.pathname.includes('cart.html')) {
        displayCart();
    }
}

// تحديث الكمية
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        const newQuantity = item.quantity + change;
        if (newQuantity > 0) {
            item.quantity = newQuantity;
            saveCart();
            if (window.location.pathname.includes('cart.html')) {
                displayCart();
            }
        } else {
            removeFromCart(productId);
        }
    }
}

// عرض المنتجات
function displayProducts(productsToShow, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = '';
    
    productsToShow.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" onerror="this.src='${product.imageFallback}'">
            </div>
            <div class="product-info">
                <span class="product-category">${getCategoryName(product.category)}</span>
                <h3 class="product-title">${product.name}</h3>
                <p class="product-price">${product.price.toLocaleString()} جنيه</p>
                <button class="add-to-cart" onclick="addToCart(${product.id})">
                    <i class="fas fa-shopping-cart"></i> أضف للسلة
                </button>
            </div>
        `;
        container.appendChild(productCard);
    });
}

// الحصول على اسم القسم
function getCategoryName(category) {
    const categories = {
        'makeup': '💄 مكياج',
        'tools': '🛠️ أدوات',
        'skincare': '✨ عناية بالبشرة'
    };
    return categories[category] || category;
}

// عرض المنتجات المميزة
function displayFeaturedProducts() {
    const featuredProducts = products.filter(p => p.featured);
    displayProducts(featuredProducts, 'featured-products');
}

// عرض جميع المنتجات مع فلترة
let currentFilter = 'all';
let currentSearch = '';

function displayAllProducts() {
    let filtered = [...products];
    
    if (currentFilter !== 'all') {
        filtered = filtered.filter(p => p.category === currentFilter);
    }
    
    if (currentSearch) {
        filtered = filtered.filter(p => p.name.includes(currentSearch));
    }
    
    const sortValue = document.getElementById('sort-filter')?.value;
    if (sortValue === 'price-asc') {
        filtered.sort((a, b) => a.price - b.price);
    } else if (sortValue === 'price-desc') {
        filtered.sort((a, b) => b.price - a.price);
    }
    
    const container = document.getElementById('all-products');
    if (filtered.length === 0) {
        container.innerHTML = `<div class="no-results"><i class="fas fa-search"></i><h3>لا توجد نتائج</h3><p>لم نعثر على منتجات تطابق "${currentSearch}"</p></div>`;
    } else {
        displayProducts(filtered, 'all-products');
    }
}

// عرض محتويات السلة
function displayCart() {
    const cartContainer = document.getElementById('cart-items');
    if (!cartContainer) return;
    
    if (cart.length === 0) {
        cartContainer.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <h3>🛒 سلة التسوق فارغة</h3>
                <p>أضف بعض المنتجات الجميلة إلى سلتك!</p>
                <button class="btn btn-primary" onclick="window.location.href='products.html'">
                    تسوق الآن 🛍️
                </button>
            </div>
        `;
        updateCartSummary();
        return;
    }
    
    cartContainer.innerHTML = '';
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.name}" onerror="this.src='${item.imageFallback}'">
            </div>
            <div class="cart-item-details">
                <h4>${item.name}</h4>
                <p class="cart-item-price">${item.price.toLocaleString()} جنيه</p>
            </div>
            <div class="cart-item-quantity">
                <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                <span>${item.quantity}</span>
                <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
            </div>
            <div class="remove-item" onclick="removeFromCart(${item.id})">
                <i class="fas fa-trash"></i>
            </div>
        `;
        cartContainer.appendChild(cartItem);
    });
    
    updateCartSummary();
}

// تحديث ملخص السلة
function updateCartSummary() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 500 ? 0 : 35;
    const tax = subtotal * 0.14;
    const total = subtotal + shipping + tax;
    
    const subtotalElement = document.getElementById('subtotal');
    const shippingElement = document.getElementById('shipping');
    const taxElement = document.getElementById('tax');
    const totalElement = document.getElementById('total');
    
    if (subtotalElement) subtotalElement.textContent = subtotal.toLocaleString();
    if (shippingElement) shippingElement.textContent = shipping.toLocaleString();
    if (taxElement) taxElement.textContent = tax.toLocaleString();
    if (totalElement) totalElement.textContent = total.toLocaleString();
}

// إتمام الشراء
function checkout() {
    if (cart.length === 0) {
        showToast('🛒 سلة التسوق فارغة!');
        return;
    }
    
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const total = subtotal + (subtotal * 0.14) + (subtotal > 500 ? 0 : 35);
    
    if (confirm(`✅ تأكيد الشراء\n\nالمبلغ الإجمالي: ${total.toLocaleString()} جنيه مصري\nهل تريد إتمام عملية الشراء؟`)) {
        cart = [];
        saveCart();
        showToast('🎉 تم إتمام عملية الشراء بنجاح! شكراً لتسوقك معنا');
        if (window.location.pathname.includes('cart.html')) {
            displayCart();
        }
    }
}

// النشرة البريدية
function setupNewsletter() {
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = newsletterForm.querySelector('input[type="email"]').value;
            if (email) {
                showToast('📧 شكراً لاشتراكك! ستصل أحدث العروض إلى بريدك');
                newsletterForm.reset();
            }
        });
    }
}

// عرض إشعار
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

// تهيئة الصفحة حسب الموقع
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    setupNewsletter();
    
    // الصفحة الرئيسية
    if (window.location.pathname.includes('index.html') || window.location.pathname === '/' || window.location.pathname === '') {
        displayFeaturedProducts();
    }
    
    // صفحة المنتجات
    if (window.location.pathname.includes('products.html')) {
        displayAllProducts();
        
        const categoryFilter = document.getElementById('category-filter');
        const sortFilter = document.getElementById('sort-filter');
        const searchInput = document.getElementById('search-input');
        
        if (categoryFilter) {
            categoryFilter.addEventListener('change', (e) => {
                currentFilter = e.target.value;
                displayAllProducts();
            });
        }
        
        if (sortFilter) {
            sortFilter.addEventListener('change', () => displayAllProducts());
        }
        
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                currentSearch = e.target.value;
                displayAllProducts();
            });
        }
    }
    
    // صفحة السلة
    if (window.location.pathname.includes('cart.html')) {
        displayCart();
        
        const checkoutBtn = document.getElementById('checkout-btn');
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', checkout);
        }
    }
});
