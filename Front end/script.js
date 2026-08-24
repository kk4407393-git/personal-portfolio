/* =========================================
   API URL
========================================= */

const API_URL = "http://localhost:5000/api";


/* =========================================
   MOBILE NAVIGATION
========================================= */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {

        navLinks.classList.toggle("active");

        if (navLinks.classList.contains("active")) {
            menuToggle.textContent = "✕";
        } else {
            menuToggle.textContent = "☰";
        }

    });

}


/* =========================================
   CLOSE MOBILE MENU
   WHEN A LINK IS CLICKED
========================================= */

const navigationLinks =
    document.querySelectorAll(".nav-links a");

navigationLinks.forEach((link) => {

    link.addEventListener("click", () => {

        if (navLinks) {
            navLinks.classList.remove("active");
        }

        if (menuToggle) {
            menuToggle.textContent = "☰";
        }

    });

});


/* =========================================
   FOOTER YEAR
========================================= */

const year = document.getElementById("year");

if (year) {
    year.textContent = new Date().getFullYear();
}


/* =========================================
   CONTACT FORM
========================================= */

const contactForm =
    document.getElementById("contactForm");

const formMessage =
    document.getElementById("formMessage");


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();


            const name =
                document.getElementById("name").value.trim();

            const email =
                document.getElementById("email").value.trim();

            const message =
                document.getElementById("message").value.trim();


            /* Basic validation */

            if (!name || !email || !message) {

                formMessage.textContent =
                    "Please fill in all fields.";

                formMessage.style.color = "red";

                return;
            }


            /* Email validation */

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if (!emailPattern.test(email)) {

                formMessage.textContent =
                    "Please enter a valid email address.";

                formMessage.style.color = "red";

                return;
            }


            formMessage.textContent =
                "Sending message...";

            formMessage.style.color = "#6c63ff";


            try {

                const response = await fetch(
                    `${API_URL}/contact`,
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body: JSON.stringify({
                            name: name,
                            email: email,
                            message: message
                        })
                    }
                );


                const data =
                    await response.json();


                if (response.ok) {

                    formMessage.textContent =
                        "Message sent successfully!";

                    formMessage.style.color =
                        "green";

                    contactForm.reset();

                } else {

                    formMessage.textContent =
                        data.message ||
                        "Something went wrong.";

                    formMessage.style.color =
                        "red";
                }


            } catch (error) {

                console.error(
                    "Contact form error:",
                    error
                );

                formMessage.textContent =
                    "Backend server is not running.";

                formMessage.style.color =
                    "red";
            }

        }
    );

}


/* =========================================
   LOAD PROJECTS FROM MONGODB
========================================= */

async function loadProjects() {

    try {

        console.log(
            "Loading projects from MongoDB..."
        );


        const response = await fetch(
            `${API_URL}/projects`
        );


        if (!response.ok) {

            throw new Error(
                `HTTP error: ${response.status}`
            );

        }


        const projects =
            await response.json();


        console.log(
            "Projects received:",
            projects
        );


        displayProjects(projects);


    } catch (error) {

        console.error(
            "Error loading projects:",
            error
        );


        const container =
            document.getElementById(
                "projects-container"
            );


        if (container) {

            container.innerHTML = `
                <p class="projects-error">
                    Unable to load projects.
                    Please make sure the backend is running.
                </p>
            `;

        }

    }

}


/* =========================================
   DISPLAY PROJECTS
========================================= */

function displayProjects(projects) {

    const container =
        document.getElementById(
            "projects-container"
        );


    if (!container) {

        console.error(
            "ERROR: projects-container not found in HTML."
        );

        return;
    }


    /* Clear existing hard-coded projects */

    container.innerHTML = "";


    /* Check whether projects exist */

    if (!projects || projects.length === 0) {

        container.innerHTML = `
            <p>
                No projects found in MongoDB.
            </p>
        `;

        return;
    }


    /* Create project cards */

    projects.forEach((project) => {

        const card =
            document.createElement("div");


        card.className =
            "project-card";


        /* Technologies */

        const technologies =
            Array.isArray(project.technologies)
                ? project.technologies
                : [];


        const technologyTags =
            technologies
                .map(
                    (technology) =>
                        `<span>${technology}</span>`
                )
                .join("");


        /* Image */

        const projectImage =
            project.image &&
            project.image.trim() !== ""


                ? `
                    <img
                        src="${project.image}"
                        alt="${project.title}"
                    >
                  `


                : `
                    <div class="project-icon">
                        💻
                    </div>
                  `;


        /* GitHub */

        const githubLink =
            project.githubUrl &&
            project.githubUrl !== "#"


                ? `
                    <a
                        href="${project.githubUrl}"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        GitHub
                    </a>
                  `


                : "";


        /* Live Demo */

        const liveLink =
            project.liveUrl &&
            project.liveUrl !== "#"


                ? `
                    <a
                        href="${project.liveUrl}"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Live Demo
                    </a>
                  `


                : "";


        /* Complete project card */

        card.innerHTML = `

            <div class="project-image">

                ${projectImage}

            </div>


            <div class="project-content">

                <h3>
                    ${project.title}
                </h3>


                <p>
                    ${project.description}
                </p>


                <div class="project-tags">

                    ${technologyTags}

                </div>


                <div class="project-links">

                    ${githubLink}

                    ${liveLink}

                </div>

            </div>

        `;


        container.appendChild(card);

    });

}


/* =========================================
   LOAD PROJECTS WHEN PAGE LOADS
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadProjects();

    }
);