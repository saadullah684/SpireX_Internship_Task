
// Mobile Navigation
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

// Close mobile menu after clicking a link
document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
    });
});

// Set minimum appointment date to today
const dateInput = document.getElementById("date");

const today = new Date();
const localToday = new Date(
    today.getTime() - today.getTimezoneOffset() * 60000
).toISOString().split("T")[0];

dateInput.min = localToday;

// Doctor selection from doctor cards
document.querySelectorAll(".doctor-btn").forEach(button => {
    button.addEventListener("click", () => {
        document.getElementById("doctor").value =
            button.dataset.doctor;
    });
});

// Appointment Form
const appointmentForm = document.getElementById("appointmentForm");
const formMessage = document.getElementById("formMessage");

appointmentForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const doctor = document.getElementById("doctor").value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;

    // Phone number validation
    const phonePattern = /^(\+92|0)?3[0-9]{9}$/;

    if (!phonePattern.test(phone)) {
        formMessage.style.color = "red";
        formMessage.textContent =
            "Please enter a valid Pakistani mobile number.";
        return;
    }

    if (date < localToday) {
        formMessage.style.color = "red";
        formMessage.textContent =
            "Please select today or a future date.";
        return;
    }

    // Show appointment confirmation
    formMessage.style.color = "green";
    formMessage.textContent =
        `Appointment request submitted successfully! Thank you, ${name}. Your selected doctor is ${doctor}.`;

    // Reset form
    appointmentForm.reset();
    dateInput.min = localToday;
});
