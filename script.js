
// Welcome message in browser console
console.log("Welcome to Saad Ullah's Portfolio!");

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(event) {

        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            event.preventDefault();

            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});
