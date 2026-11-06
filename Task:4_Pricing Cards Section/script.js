
const buttons = document.querySelectorAll(".plan-btn");

buttons.forEach((button) => {

    button.addEventListener("click", () => {

        const planName = button.parentElement.querySelector("h2").textContent;

        alert("You selected the " + planName + " plan!");

    });

});
