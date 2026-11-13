
const container = document.querySelector(".testimonial-container");
const cards = document.querySelectorAll(".testimonial-card");

const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

let currentIndex = 0;

function showTestimonials() {

    if (window.innerWidth <= 768) {

        cards.forEach((card, index) => {
            card.style.display =
                index === currentIndex ? "block" : "none";
        });

    } else {

        cards.forEach(card => {
            card.style.display = "block";
        });

    }

}

nextBtn.addEventListener("click", () => {

    if (window.innerWidth <= 768) {
        currentIndex++;

        if (currentIndex >= cards.length) {
            currentIndex = 0;
        }

        showTestimonials();
    }

});

prevBtn.addEventListener("click", () => {

    if (window.innerWidth <= 768) {
        currentIndex--;

        if (currentIndex < 0) {
            currentIndex = cards.length - 1;
        }

        showTestimonials();
    }

});

window.addEventListener("resize", showTestimonials);

showTestimonials();
