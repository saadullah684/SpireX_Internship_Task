
// ===============================
// 1. FOOD MENU DATA
// ===============================

const foods = [
    {
        id: 1,
        name: "Margherita Pizza",
        category: "main",
        price: 1800,
        image: "https://images.unsplash.com/photo-1579751626657-72bc17010498?w=600",
        description: "Fresh mozzarella, tomato sauce and basil."
    },
    {
        id: 2,
        name: "Grilled Chicken",
        category: "main",
        price: 2200,
        image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=600",
        description: "Juicy grilled chicken with special herbs."
    },
    {
        id: 3,
        name: "Fresh Salad",
        category: "starter",
        price: 900,
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600",
        description: "Fresh vegetables with a healthy dressing."
    },
    {
        id: 4,
        name: "Creamy Pasta",
        category: "main",
        price: 1600,
        image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=600",
        description: "Delicious creamy pasta with parmesan."
    },
    {
        id: 5,
        name: "Chocolate Cake",
        category: "dessert",
        price: 750,
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600",
        description: "Rich chocolate cake with creamy layers."
    },
    {
        id: 6,
        name: "French Fries",
        category: "starter",
        price: 500,
        image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600",
        description: "Crispy golden fries with special seasoning."
    },
    {
        id: 7,
        name: "Cheesecake",
        category: "dessert",
        price: 850,
        image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=600",
        description: "Smooth and creamy classic cheesecake."
    },
    {
        id: 8,
        name: "Chicken Burger",
        category: "main",
        price: 1200,
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600",
        description: "Crispy chicken burger with fresh toppings."
    },
    {
        id: 9,
        name: "Garlic Bread",
        category: "starter",
        price: 600,
        image: "https://images.unsplash.com/photo-1619531040576-f9416740661b?w=600",
        description: "Toasted bread with garlic and herbs."
    }
];


// ===============================
// 2. DISPLAY FOOD ITEMS
// ===============================

const foodContainer = document.getElementById("foodContainer");

function displayFoods(foodList) {

    foodContainer.innerHTML = "";

    foodList.forEach(food => {

        const card = document.createElement("div");

        card.className = "food-card";

        card.innerHTML = `
            <img src="${food.image}" alt="${food.name}">

            <div class="food-card-content">

                <h3>${food.name}</h3>

                <p>${food.description}</p>

                <div class="food-bottom">

                    <span class="food-price">
                        Rs. ${food.price.toLocaleString("en-PK")}
                    </span>

                    <button class="add-cart">
                        Add to Cart
                    </button>

                </div>

            </div>
        `;

        card.querySelector(".add-cart")
            .addEventListener("click", () => {
                addToCart(food.id);
            });

        foodContainer.appendChild(card);
    });
}


// ===============================
// 3. FOOD CATEGORY FILTER
// ===============================

const filterButtons = document.querySelectorAll(".filter-btn");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn =>
            btn.classList.remove("active")
        );

        button.classList.add("active");

        const category = button.dataset.category;

        if (category === "all") {
            displayFoods(foods);
        } else {
            const filteredFoods = foods.filter(food =>
                food.category === category
            );

            displayFoods(filteredFoods);
        }
    });
});


// ===============================
// 4. SHOPPING CART
// ===============================

let cart = [];

function addToCart(id) {

    const selectedFood = foods.find(food => food.id === id);

    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            ...selectedFood,
            quantity: 1
        });
    }

    updateCart();

    alert(selectedFood.name + " added to cart!");
}

function updateCart() {

    const totalItems = cart.reduce(
        (total, item) => total + item.quantity, 0
    );

    const totalPrice = cart.reduce(
        (total, item) => total + item.price * item.quantity, 0
    );

    document.getElementById("cartCount").textContent = totalItems;

    document.getElementById("cartTotal").textContent =
        "Rs. " + totalPrice.toLocaleString("en-PK");
}


// ===============================
// 5. MOBILE NAVIGATION
// ===============================

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", () => {

    navMenu.classList.toggle("show");

    menuToggle.textContent =
        navMenu.classList.contains("show") ? "✕" : "☰";
});

navMenu.querySelectorAll("a").forEach(link => {

    link.addEventListener("click", () => {
        navMenu.classList.remove("show");
        menuToggle.textContent = "☰";
    });

});


// ===============================
// 6. TABLE BOOKING
// ===============================

const bookingForm = document.getElementById("bookingForm");

const bookingResult = document.getElementById(
    "bookingMessageResult"
);

const bookingDate = document.getElementById("bookingDate");

// Prevent past dates
const today = new Date();
const localToday = new Date(
    today.getTime() - today.getTimezoneOffset() * 60000
).toISOString().split("T")[0];

bookingDate.min = localToday;

bookingForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const name = document.getElementById("customerName").value;
    const date = bookingDate.value;
    const time = document.getElementById("bookingTime").value;
    const guests = document.getElementById("guests").value;

    if (date < localToday) {
        bookingResult.textContent =
            "Please select a valid future date.";

        return;
    }

    bookingResult.textContent =
        `Thank you ${name}! Your table reservation request for ${guests} guest(s) on ${date} at ${time} has been received.`;

    bookingForm.reset();

    bookingDate.min = localToday;

});


// ===============================
// 7. INITIALIZE WEBSITE
// ===============================

displayFoods(foods);

updateCart();
