
// JOB DATA
const jobs = [
    {
        id: 1,
        title: "Frontend Developer",
        company: "TechSolutions",
        location: "Karachi, Pakistan",
        type: "Remote",
        salary: "Rs. 60,000 - 90,000",
        description: "We are looking for a creative Frontend Developer with knowledge of HTML, CSS, JavaScript and responsive web design.",
        skills: "HTML, CSS, JavaScript"
    },
    {
        id: 2,
        title: "Python Developer",
        company: "CodeCraft",
        location: "Lahore, Pakistan",
        type: "On-site",
        salary: "Rs. 70,000 - 100,000",
        description: "Join our development team to build applications using Python, APIs and modern backend technologies.",
        skills: "Python, FastAPI, SQL"
    },
    {
        id: 3,
        title: "UI/UX Designer",
        company: "Creative Studio",
        location: "Islamabad, Pakistan",
        type: "Hybrid",
        salary: "Rs. 50,000 - 75,000",
        description: "Design attractive and user-friendly interfaces for web and mobile applications.",
        skills: "Figma, UI Design, UX Research"
    },
    {
        id: 4,
        title: "QA Engineer",
        company: "QualityTech",
        location: "Karachi, Pakistan",
        type: "On-site",
        salary: "Rs. 45,000 - 65,000",
        description: "Test software applications, identify bugs and maintain software quality through manual and automation testing.",
        skills: "Selenium, Python, Testing"
    },
    {
        id: 5,
        title: "Digital Marketing Intern",
        company: "GrowthHub",
        location: "Remote",
        type: "Remote",
        salary: "Rs. 20,000 - 30,000",
        description: "Assist with digital marketing campaigns, social media management and online growth strategies.",
        skills: "SEO, Social Media, Marketing"
    },
    {
        id: 6,
        title: "Full Stack Developer",
        company: "WebX Solutions",
        location: "Karachi, Pakistan",
        type: "Hybrid",
        salary: "Rs. 80,000 - 120,000",
        description: "Develop modern web applications using frontend and backend technologies.",
        skills: "HTML, CSS, JavaScript, Node.js"
    }
];

// HTML ELEMENTS
const jobContainer = document.getElementById("jobContainer");
const searchInput = document.getElementById("searchInput");
const locationInput = document.getElementById("locationInput");
const searchBtn = document.getElementById("searchBtn");
const jobFilter = document.getElementById("jobFilter");

// DISPLAY JOBS
function displayJobs(jobList) {

    jobContainer.innerHTML = "";

    if (jobList.length === 0) {
        jobContainer.innerHTML = `
            <p class="no-jobs">
                No jobs found. Try another search!
            </p>
        `;
        return;
    }

    jobList.forEach(job => {

        const jobCard = document.createElement("div");
        jobCard.className = "job-card";

        jobCard.innerHTML = `
            <h3>${job.title}</h3>

            <p class="company">${job.company}</p>

            <p class="job-info">
                📍 ${job.location}<br>
                💰 ${job.salary}
            </p>

            <span class="job-type">${job.type}</span>

            <button class="details-btn">
                View Details
            </button>
        `;

        jobCard.querySelector(".details-btn")
            .addEventListener("click", () => {
                showJobDetails(job.id);
            });

        jobContainer.appendChild(jobCard);
    });
}

// SEARCH AND FILTER
function filterJobs() {

    const keyword = searchInput.value.toLowerCase().trim();
    const location = locationInput.value.toLowerCase().trim();
    const selectedType = jobFilter.value;

    const filteredJobs = jobs.filter(job => {

        const matchesKeyword =
            job.title.toLowerCase().includes(keyword) ||
            job.company.toLowerCase().includes(keyword) ||
            job.skills.toLowerCase().includes(keyword);

        const matchesLocation =
            job.location.toLowerCase().includes(location);

        const matchesType =
            selectedType === "all" ||
            job.type === selectedType;

        return matchesKeyword && matchesLocation && matchesType;
    });

    displayJobs(filteredJobs);
}

// JOB DETAILS POPUP
function showJobDetails(id) {

    const job = jobs.find(item => item.id === id);

    if (!job) return;

    const modal = document.createElement("div");
    modal.className = "job-modal";

    modal.innerHTML = `
        <div class="modal-content">

            <button class="close-modal">&times;</button>

            <p class="tagline">JOB DETAILS</p>

            <h2>${job.title}</h2>

            <p class="company">${job.company}</p>

            <hr>

            <p><strong>Location:</strong> ${job.location}</p>

            <p><strong>Job Type:</strong> ${job.type}</p>

            <p><strong>Salary:</strong> ${job.salary}</p>

            <h3>Job Description</h3>

            <p>${job.description}</p>

            <h3>Required Skills</h3>

            <p>${job.skills}</p>

            <button class="apply-btn">Apply Now</button>

        </div>
    `;

    document.body.appendChild(modal);

    modal.querySelector(".close-modal")
        .addEventListener("click", () => modal.remove());

    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.remove();
        }
    });

    modal.querySelector(".apply-btn")
        .addEventListener("click", () => {
            alert("Thank you for your interest! Application feature is a demo.");
        });
}

// EVENT LISTENERS
searchBtn.addEventListener("click", filterJobs);

searchInput.addEventListener("input", filterJobs);

locationInput.addEventListener("input", filterJobs);

jobFilter.addEventListener("change", filterJobs);

// INITIAL JOB DISPLAY
displayJobs(jobs);
