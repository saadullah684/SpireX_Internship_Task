
const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        price: 2500,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400"
    },
    {
        id: 2,
        name: "Smart Watch",
        price: 3500,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400"
    },
    {
        id: 3,
        name: "Running Shoes",
        price: 4500,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400"
    },
    {
        id: 4,
        name: "Backpack",
        price: 2000,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400"
    }
];

let cart = [];

const productContainer = document.getElementById("products");
const cartContainer = document.getElementById("cart-items");

function displayProducts() {
    productContainer.innerHTML = "";

    products.forEach(product => {
        productContainer.innerHTML += `
            <div class="product">
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>Rs. ${product.price}</p>
                <button onclick="addToCart(${product.id})">
                    Add to Cart
                </button>
            </div>
        `;
    });
}

function addToCart(id) {
    const product = products.find(item => item.id === id);

    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    updateCart();
}

function increaseQuantity(id) {
    const item = cart.find(item => item.id === id);
    item.quantity++;
    updateCart();
}

function decreaseQuantity(id) {
    const item = cart.find(item => item.id === id);

    if (item.quantity > 1) {
        item.quantity--;
    } else {
        removeFromCart(id);
        return;
    }

    updateCart();
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
}

function updateCart() {
    cartContainer.innerHTML = "";

    let total = 0;
    let count = 0;

    if (cart.length === 0) {
        cartContainer.innerHTML =
            '<p class="empty">Your cart is empty!</p>';
    }

    cart.forEach(item => {
        const subtotal = item.price * item.quantity;

        total += subtotal;
        count += item.quantity;

        cartContainer.innerHTML += `
            <div class="cart-item">
                <div>
                    <h3>${item.name}</h3>
                    <p>Rs. ${item.price} each</p>
                </div>

                <div class="quantity">
                    <button onclick="decreaseQuantity(${item.id})">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="increaseQuantity(${item.id})">+</button>
                </div>

                <strong>Rs. ${subtotal}</strong>

                <button class="remove"
                    onclick="removeFromCart(${item.id})">
                    Remove
                </button>
            </div>
        `;
    });

    document.getElementById("total").textContent = total;
    document.getElementById("cart-count").textContent = count;
}

displayProducts();
updateCart();
