
// Book Collection
const books = [
    {
        id: 1,
        title: "Atomic Habits",
        author: "James Clear",
        category: "Self-Help",
        image: "https://covers.openlibrary.org/b/isbn/9780735211292-L.jpg",
        description: "A practical guide to building good habits, breaking bad ones, and making small improvements every day."
    },
    {
        id: 2,
        title: "The Alchemist",
        author: "Paulo Coelho",
        category: "Fiction",
        image: "https://covers.openlibrary.org/b/isbn/9780061122415-L.jpg",
        description: "A young shepherd travels in search of treasure and discovers the importance of following his dreams."
    },
    {
        id: 3,
        title: "Clean Code",
        author: "Robert C. Martin",
        category: "Technology",
        image: "https://covers.openlibrary.org/b/isbn/9780132350884-L.jpg",
        description: "A guide to writing readable, maintainable and professional software code."
    },
    {
        id: 4,
        title: "Rich Dad Poor Dad",
        author: "Robert Kiyosaki",
        category: "Business",
        image: "https://covers.openlibrary.org/b/isbn/9781612680194-L.jpg",
        description: "Learn financial education, money management and the difference between assets and liabilities."
    },
    {
        id: 5,
        title: "A Brief History of Time",
        author: "Stephen Hawking",
        category: "Science",
        image: "https://covers.openlibrary.org/b/isbn/9780553380163-L.jpg",
        description: "An introduction to the universe, black holes, time and modern cosmology."
    },
    {
        id: 6,
        title: "The Psychology of Money",
        author: "Morgan Housel",
        category: "Business",
        image: "https://covers.openlibrary.org/b/isbn/9780857197689-L.jpg",
        description: "Understand how people think about money, wealth, risk and financial decisions."
    },
    {
        id: 7,
        title: "Think and Grow Rich",
        author: "Napoleon Hill",
        category: "Self-Help",
        image: "https://covers.openlibrary.org/b/isbn/9781585424337-L.jpg",
        description: "Classic principles about personal success, motivation and achieving your goals."
    },
    {
        id: 8,
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        category: "Fiction",
        image: "https://covers.openlibrary.org/b/isbn/9780743273565-L.jpg",
        description: "A classic novel exploring wealth, ambition, love and the American Dream."
    }
];

// DOM Elements
const booksContainer = document.getElementById("booksContainer");
const myLibraryContainer = document.getElementById("myLibraryContainer");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const categoryButtons = document.querySelectorAll(".category-btn");

// Load saved books from LocalStorage
let myLibrary = JSON.parse(localStorage.getItem("myLibrary")) || [];

// Display Books
function displayBooks(bookList) {

    booksContainer.innerHTML = "";

    if (bookList.length === 0) {
        booksContainer.innerHTML =
            `<p class="empty-message">No books found. Try another search!</p>`;
        return;
    }

    bookList.forEach(book => {

        const isSaved = myLibrary.includes(book.id);

        const bookCard = document.createElement("div");
        bookCard.className = "book-card";

        bookCard.innerHTML = `
            <img src="${book.image}"
                 alt="${book.title}"
                 onerror="this.onerror=null;this.src='https://placehold.co/300x400/e9f0e9/315c45?text=Book+Cover'">

            <div class="book-info">
                <span class="book-category">${book.category}</span>

                <h3>${book.title}</h3>

                <p>By ${book.author}</p>

                <div class="book-actions">
                    <button class="save-btn"
                        onclick="toggleLibrary(${book.id})">
                        ${isSaved ? "Saved ✓" : "Add to Library"}
                    </button>

                    <button class="details-btn"
                        onclick="showDetails(${book.id})">
                        Details
                    </button>
                </div>
            </div>
        `;

        booksContainer.appendChild(bookCard);
    });
}

// Display My Library
function displayMyLibrary() {

    myLibraryContainer.innerHTML = "";

    const savedBooks = books.filter(book =>
        myLibrary.includes(book.id)
    );

    if (savedBooks.length === 0) {
        myLibraryContainer.innerHTML =
            `<p class="empty-message">Your library is empty. Save your favourite books!</p>`;
        return;
    }

    savedBooks.forEach(book => {

        const bookCard = document.createElement("div");
        bookCard.className = "book-card";

        bookCard.innerHTML = `
            <img src="${book.image}"
                 alt="${book.title}"
                 onerror="this.onerror=null;this.src='https://placehold.co/300x400/e9f0e9/315c45?text=Book+Cover'">

            <div class="book-info">
                <span class="book-category">${book.category}</span>

                <h3>${book.title}</h3>

                <p>By ${book.author}</p>

                <div class="book-actions">
                    <button class="save-btn"
                        onclick="toggleLibrary(${book.id})">
                        Remove
                    </button>

                    <button class="details-btn"
                        onclick="showDetails(${book.id})">
                        Details
                    </button>
                </div>
            </div>
        `;

        myLibraryContainer.appendChild(bookCard);
    });
}

// Add or Remove Books
function toggleLibrary(bookId) {

    if (myLibrary.includes(bookId)) {

        myLibrary = myLibrary.filter(id => id !== bookId);

    } else {

        myLibrary.push(bookId);

    }

    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));

    displayBooks(getFilteredBooks());
    displayMyLibrary();
}

// Book Details
function showDetails(bookId) {

    const book = books.find(item => item.id === bookId);

    alert(
        "Book: " + book.title +
        "\nAuthor: " + book.author +
        "\nCategory: " + book.category +
        "\n\nDescription:\n" + book.description
    );
}

// Search Books
function searchBooks() {

    const searchValue = searchInput.value.toLowerCase().trim();

    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(searchValue) ||
        book.author.toLowerCase().includes(searchValue)
    );

    displayBooks(filteredBooks);

    categoryButtons.forEach(btn => btn.classList.remove("active"));
    document.querySelector('[data-category="All"]').classList.add("active");
}

// Search Button
searchBtn.addEventListener("click", searchBooks);

// Search While Typing
searchInput.addEventListener("input", searchBooks);

// Category Filtering
function getFilteredBooks() {

    const activeButton = document.querySelector(".category-btn.active");
    const category = activeButton.dataset.category;
    const searchValue = searchInput.value.toLowerCase().trim();

    return books.filter(book => {

        const matchesCategory =
            category === "All" || book.category === category;

        const matchesSearch =
            book.title.toLowerCase().includes(searchValue) ||
            book.author.toLowerCase().includes(searchValue);

        return matchesCategory && matchesSearch;
    });
}

categoryButtons.forEach(button => {

    button.addEventListener("click", () => {

        categoryButtons.forEach(btn =>
            btn.classList.remove("active")
        );

        button.classList.add("active");

        displayBooks(getFilteredBooks());

    });

});

// Initial Display
displayBooks(books);
displayMyLibrary();
