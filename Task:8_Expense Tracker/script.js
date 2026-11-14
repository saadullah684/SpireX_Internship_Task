
const expenseForm = document.getElementById("expenseForm");
const expenseName = document.getElementById("expenseName");
const expenseAmount = document.getElementById("expenseAmount");
const expenseList = document.getElementById("expenseList");
const total = document.getElementById("total");

let expenses = [];

// Add Expense
expenseForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = expenseName.value.trim();
    const amount = Number(expenseAmount.value);

    if (name === "" || !Number.isFinite(amount) || amount <= 0) {
        alert("Please enter valid expense details!");
        return;
    }

    const expense = {
        id: Date.now(),
        name: name,
        amount: amount
    };

    expenses.push(expense);

    displayExpenses();

    expenseForm.reset();
});

// Display Expenses
function displayExpenses() {

    expenseList.innerHTML = "";

    let totalAmount = 0;

    if (expenses.length === 0) {
        expenseList.innerHTML =
            '<li class="empty">No expenses added yet.</li>';
    }

    expenses.forEach(function(expense) {

        totalAmount += expense.amount;

        const li = document.createElement("li");

        const details = document.createElement("div");
        details.className = "expense-details";

        const name = document.createElement("h4");
        name.textContent = expense.name;

        const amount = document.createElement("p");
        amount.textContent = "Expense";

        details.appendChild(name);
        details.appendChild(amount);

        const price = document.createElement("span");
        price.className = "expense-amount";
        price.textContent = "Rs. " + expense.amount.toLocaleString();

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-btn";

        deleteButton.addEventListener("click", function() {
            deleteExpense(expense.id);
        });

        li.appendChild(details);
        li.appendChild(price);
        li.appendChild(deleteButton);

        expenseList.appendChild(li);
    });

    total.textContent = "Rs. " + totalAmount.toLocaleString();
}

// Delete Expense
function deleteExpense(id) {

    expenses = expenses.filter(function(expense) {
        return expense.id !== id;
    });

    displayExpenses();
}
