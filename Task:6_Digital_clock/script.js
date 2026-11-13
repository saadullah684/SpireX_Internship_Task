
const hoursElement = document.getElementById("hours");
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");
const periodElement = document.getElementById("period");

const dayElement = document.getElementById("day");
const dateElement = document.getElementById("date");

const formatBtn = document.getElementById("formatBtn");

let is24Hour = false;

function updateClock() {

    const now = new Date();

    let hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    // Determine AM or PM
    const period = hours >= 12 ? "PM" : "AM";

    // Convert to 12-hour format
    if (!is24Hour) {
        hours = hours % 12 || 12;
    }

    // Add leading zeros
    hoursElement.textContent = String(hours).padStart(2, "0");
    minutesElement.textContent = String(minutes).padStart(2, "0");
    secondsElement.textContent = String(seconds).padStart(2, "0");

    periodElement.textContent = is24Hour ? "24-HOUR FORMAT" : period;

    // Display current day
    const options = { weekday: "long" };
    dayElement.textContent = now.toLocaleDateString("en-US", options);

    // Display current date
    const dateOptions = {
        month: "long",
        day: "2-digit",
        year: "numeric"
    };

    dateElement.textContent = now.toLocaleDateString("en-US", dateOptions);
}

// Switch between 12-hour and 24-hour format
formatBtn.addEventListener("click", function () {

    is24Hour = !is24Hour;

    formatBtn.textContent = is24Hour
        ? "Switch to 12-Hour Format"
        : "Switch to 24-Hour Format";

    updateClock();
});

// Update clock every second
updateClock();
setInterval(updateClock, 1000);
