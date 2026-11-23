
// Internship Data
const internships = [
    {
        id: 1,
        title: "Frontend Developer Intern",
        company: "TechSolutions",
        category: "Web Development",
        mode: "Remote",
        location: "Karachi",
        duration: "3 Months",
        stipend: "Paid",
        icon: "💻",
        description: "Work with modern frontend technologies and build responsive web interfaces.",
        skills: "HTML, CSS, JavaScript"
    },
    {
        id: 2,
        title: "AI/ML Intern",
        company: "Innovate AI",
        category: "Artificial Intelligence",
        mode: "Hybrid",
        location: "Karachi",
        duration: "3 Months",
        stipend: "Unpaid",
        icon: "🤖",
        description: "Learn machine learning concepts and work on real-world AI projects.",
        skills: "Python, Machine Learning, NumPy"
    },
    {
        id: 3,
        title: "QA Automation Intern",
        company: "QualityTech",
        category: "Software Testing",
        mode: "On-site",
        location: "Karachi",
        duration: "2 Months",
        stipend: "Paid",
        icon: "🧪",
        description: "Assist in software testing and automate test cases using Selenium.",
        skills: "Python, Selenium, Manual Testing"
    },
    {
        id: 4,
        title: "Data Analyst Intern",
        company: "DataVision",
        category: "Data Science",
        mode: "Remote",
        location: "Remote",
        duration: "3 Months",
        stipend: "Paid",
        icon: "📊",
        description: "Analyze datasets and create meaningful reports and visualizations.",
        skills: "Python, Pandas, Excel"
    },
    {
        id: 5,
        title: "Web Development Intern",
        company: "CodeCraft",
        category: "Web Development",
        mode: "On-site",
        location: "Lahore",
        duration: "3 Months",
        stipend: "Unpaid",
        icon: "🌐",
        description: "Develop and maintain websites using HTML, CSS and JavaScript.",
        skills: "HTML, CSS, JavaScript"
    },
    {
        id: 6,
        title: "Machine Learning Intern",
        company: "FutureTech",
        category: "Artificial Intelligence",
        mode: "Remote",
        location: "Remote",
        duration: "4 Months",
        stipend: "Paid",
        icon: "🧠",
        description: "Explore machine learning algorithms and develop predictive models.",
        skills: "Python, Scikit-learn, Pandas"
    }
];

// HTML Elements
const internshipGrid = document.getElementById("internshipGrid");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const modeFilter = document.getElementById("modeFilter");
const clearFilters = document.getElementById("clearFilters");
const noResults = document.getElementById("noResults");
const resultsCount = document.getElementById("resultsCount");

// Load saved applications
let applications = JSON.parse(
    localStorage.getItem("internhubApplications") || "[]"
);

// Display Internships
function displayInternships(data) {
    internshipGrid.innerHTML = "";

    resultsCount.textContent = `Showing ${data.length} internship(s)`;

    noResults.hidden = data.length !== 0;

    data.forEach(internship => {
        const alreadyApplied = applications.some(
            app => app.internshipId === internship.id
        );

        const card = document.createElement("div");
        card.className = "internship-card";

        card.innerHTML = `
            <div class="company-icon">${internship.icon}</div>

            <h3>${internship.title}</h3>
            <p class="company-name">${internship.company}</p>

            <div class="job-tags">
                <span>${internship.category}</span>
                <span>${internship.mode}</span>
            </div>

            <p class="job-description">
                ${internship.description}
            </p>

            <div class="job-footer">
                <small>📍 ${internship.location}</small>

                <div class="card-actions">
                    <button class="details-btn"
                        data-action="details"
                        data-id="${internship.id}">
                        Details
                    </button>

                    <button class="apply-btn"
                        data-action="apply"
                        data-id="${internship.id}"
                        ${alreadyApplied ? "disabled" : ""}>
                        ${alreadyApplied ? "Applied" : "Apply Now"}
                    </button>
                </div>
            </div>
        `;

        internshipGrid.appendChild(card);
    });
}

// Search and Filter
function filterInternships() {
    const searchValue = searchInput.value.toLowerCase().trim();
    const categoryValue = categoryFilter.value;
    const modeValue = modeFilter.value;

    const filtered = internships.filter(internship => {

        const matchesSearch =
            internship.title.toLowerCase().includes(searchValue) ||
            internship.company.toLowerCase().includes(searchValue) ||
            internship.category.toLowerCase().includes(searchValue);

        const matchesCategory =
            !categoryValue || internship.category === categoryValue;

        const matchesMode =
            !modeValue || internship.mode === modeValue;

        return matchesSearch && matchesCategory && matchesMode;
    });

    displayInternships(filtered);
}

searchInput.addEventListener("input", filterInternships);
categoryFilter.addEventListener("change", filterInternships);
modeFilter.addEventListener("change", filterInternships);

// Clear Filters
clearFilters.addEventListener("click", () => {
    searchInput.value = "";
    categoryFilter.value = "";
    modeFilter.value = "";

    filterInternships();
});

// Modal Elements
const detailsModal = document.getElementById("detailsModal");
const applyModal = document.getElementById("applyModal");
const detailsContent = document.getElementById("detailsContent");
const applicationForm = document.getElementById("applicationForm");

// Open Internship Details
function showDetails(id) {
    const internship = internships.find(item => item.id === id);

    if (!internship) return;

    detailsContent.innerHTML = `
        <div class="company-icon">${internship.icon}</div>

        <h2>${internship.title}</h2>
        <p class="modal-subtitle">${internship.company}</p>

        <div class="job-tags">
            <span>${internship.category}</span>
            <span>${internship.mode}</span>
            <span>${internship.stipend}</span>
        </div>

        <h3>About Internship</h3>
        <p>${internship.description}</p>

        <br>

        <h3>Required Skills</h3>
        <p>${internship.skills}</p>

        <br>

        <p><strong>Location:</strong> ${internship.location}</p>
        <p><strong>Duration:</strong> ${internship.duration}</p>
        <p><strong>Stipend:</strong> ${internship.stipend}</p>

        <br>

        <button class="primary-btn"
            onclick="openApplication(${internship.id})">
            Apply Now →
        </button>
    `;

    detailsModal.classList.add("show");
}

// Open Application Form
function openApplication(id) {
    const internship = internships.find(item => item.id === id);

    if (!internship) return;

    const alreadyApplied = applications.some(
        app => app.internshipId === id
    );

    if (alreadyApplied) {
        alert("You have already applied for this internship.");
        return;
    }

    document.getElementById("internshipId").value = id;

    document.getElementById("applyPosition").textContent =
        `Position: ${internship.title} at ${internship.company}`;

    document.getElementById("applicationMessage").textContent = "";

    detailsModal.classList.remove("show");
    applyModal.classList.add("show");
}

// Internship Card Button Events
internshipGrid.addEventListener("click", event => {
    const button = event.target.closest("button[data-action]");

    if (!button) return;

    const id = Number(button.dataset.id);

    if (button.dataset.action === "details") {
        showDetails(id);
    }

    if (button.dataset.action === "apply") {
        openApplication(id);
    }
});

// Close Modals
document.querySelectorAll("[data-close]").forEach(button => {
    button.addEventListener("click", () => {
        document.getElementById(button.dataset.close)
            .classList.remove("show");
    });
});

// Close modal when clicking outside
document.querySelectorAll(".modal").forEach(modal => {
    modal.addEventListener("click", event => {
        if (event.target === modal) {
            modal.classList.remove("show");
        }
    });
});

// Submit Application
applicationForm.addEventListener("submit", event => {
    event.preventDefault();

    const id = Number(document.getElementById("internshipId").value);

    const internship = internships.find(item => item.id === id);

    const name = document.getElementById("studentName").value.trim();
    const email = document.getElementById("studentEmail").value.trim();
    const phone = document.getElementById("studentPhone").value.trim();
    const education = document.getElementById("studentEducation").value.trim();
    const skills = document.getElementById("studentSkills").value.trim();

    const phonePattern = /^(\+92|0)?3[0-9]{9}$/;

    if (!phonePattern.test(phone)) {
        alert("Please enter a valid Pakistani mobile number.");
        return;
    }

    if (applications.some(app => app.internshipId === id)) {
        alert("You have already applied for this internship.");
        return;
    }

    const newApplication = {
        internshipId: id,
        position: internship.title,
        company: internship.company,
        name: name,
        email: email,
        phone: phone,
        education: education,
        skills: skills,
        appliedDate: new Date().toLocaleDateString(),
        status: "Pending"
    };

    applications.push(newApplication);

    // Save application in browser
    localStorage.setItem(
        "internhubApplications",
        JSON.stringify(applications)
    );

    document.getElementById("applicationMessage").style.color = "green";

    document.getElementById("applicationMessage").textContent =
        "Application submitted successfully!";

    applicationForm.reset();

    // Refresh dashboard
    displayInternships(internships);
    displayApplications();

    setTimeout(() => {
        applyModal.classList.remove("show");
    }, 1200);
});

// Display Application Tracking
function displayApplications() {
    const table = document.getElementById("applicationTable");

    document.getElementById("totalApplications").textContent =
        applications.length;

    document.getElementById("pendingApplications").textContent =
        applications.filter(app => app.status === "Pending").length;

    document.getElementById("selectedApplications").textContent =
        applications.filter(app => app.status === "Selected").length;

    if (applications.length === 0) {
        table.innerHTML = `
            <tr>
                <td colspan="4" class="empty-table">
                    No applications yet. Explore internships to get started!
                </td>
            </tr>
        `;
        return;
    }

    table.innerHTML = "";

    applications.forEach(app => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${app.position}</td>
            <td>${app.company}</td>
            <td>${app.appliedDate}</td>
            <td><span class="status">${app.status}</span></td>
        `;

        table.appendChild(row);
    });
}

// Mobile Navigation
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
    });
});

// Initial Page Load
displayInternships(internships);
displayApplications();
