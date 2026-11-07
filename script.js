// ==========================================
// LOAD PORTFOLIO DATA USING FETCH API
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    fetch("data.json")
        .then(function (response) {

            if (!response.ok) {
                throw new Error("Unable to load data.json");
            }

            return response.json();

        })
        .then(function (data) {

            // Display portfolio content
            document.getElementById("loading").style.display = "none";
            document.getElementById("portfolioContent").style.display = "block";

            // Call all rendering functions
            displayPersonalDetails(data.personal);
            displayAbout(data.about);
            displaySkills(data.skills);
            displayProjects(data.projects);
            displayEducation(data.education);
            displayCertifications(data.certifications);
            displaySocialLinks(data.social);

            // Set current year
            document.getElementById("currentYear").textContent =
                new Date().getFullYear();

            // Contact form
            setupContactForm(data.personal.email);

        })
        .catch(function (error) {

            console.error("Portfolio Loading Error:", error);

            document.getElementById("loading").style.display = "none";
            document.getElementById("errorMessage").style.display = "block";

        });

});


// ==========================================
// DISPLAY PERSONAL DETAILS
// ==========================================

function displayPersonalDetails(personal) {

    document.getElementById("logo").textContent = personal.name;

    document.getElementById("studentName").textContent = personal.name;

    document.getElementById("studentRole").textContent = personal.role;

    document.getElementById("heroIntroduction").textContent =
        personal.introduction;

    document.getElementById("careerGoal").textContent =
        personal.careerGoal;

    document.getElementById("profileImage").src =
        personal.profileImage;

    document.getElementById("profileImage").alt =
        personal.name + " Profile Photo";

    document.getElementById("resumeButton").href =
        personal.resume;

    document.getElementById("footerName").textContent =
        personal.name;

    document.getElementById("copyrightName").textContent =
        personal.name;

}


// ==========================================
// DISPLAY ABOUT SECTION
// ==========================================

function displayAbout(about) {

    document.getElementById("aboutName").textContent =
        about.name;

    document.getElementById("aboutRole").textContent =
        about.role;

    document.getElementById("aboutDescription").textContent =
        about.description;

    document.getElementById("aboutEmail").textContent =
        about.email;

    document.getElementById("aboutPhone").textContent =
        about.phone;

    document.getElementById("aboutLocation").textContent =
        about.location;

}


// ==========================================
// DISPLAY SKILLS
// ==========================================

function displaySkills(skills) {

    const skillsContainer =
        document.getElementById("skillsContainer");

    skillsContainer.innerHTML = "";

    skills.forEach(function (skill) {

        const skillCard = document.createElement("div");

        skillCard.className = "col-lg-4 col-md-6";

        const card = document.createElement("div");
        card.className = "skill-card";

        const icon = document.createElement("div");
        icon.className = "skill-icon";

        const iconElement = document.createElement("i");
        iconElement.className = skill.icon;

        icon.appendChild(iconElement);

        const heading = document.createElement("h4");
        heading.textContent = skill.name;

        const description = document.createElement("p");
        description.textContent = skill.description;

        const progress = document.createElement("div");
        progress.className = "skill-progress";

        const progressBar = document.createElement("div");
        progressBar.className = "skill-progress-bar";

        // Limit progress between 0 and 100
        const percentage = Math.max(
            0,
            Math.min(100, Number(skill.level) || 0)
        );

        progressBar.style.width = percentage + "%";

        progress.appendChild(progressBar);

        card.appendChild(icon);
        card.appendChild(heading);
        card.appendChild(description);
        card.appendChild(progress);

        skillCard.appendChild(card);

        skillsContainer.appendChild(skillCard);

    });

}


// ==========================================
// DISPLAY PROJECTS
// ==========================================

function displayProjects(projects) {

    const projectsContainer =
        document.getElementById("projectsContainer");

    projectsContainer.innerHTML = "";

    projects.forEach(function (project) {

        const projectColumn = document.createElement("div");

        projectColumn.className = "col-lg-6 col-md-6";

        const card = document.createElement("div");
        card.className = "project-card";

        const image = document.createElement("img");

        image.src = project.image;
        image.alt = project.name;
        image.className = "project-image";

        const content = document.createElement("div");
        content.className = "project-content";

        const heading = document.createElement("h4");
        heading.textContent = project.name;

        const description = document.createElement("p");
        description.textContent = project.description;

        const technologyContainer = document.createElement("div");

        project.technologies.forEach(function (technology) {

            const badge = document.createElement("span");

            badge.className = "tech-badge";
            badge.textContent = technology;

            technologyContainer.appendChild(badge);

        });

        const link = document.createElement("a");

        link.href = project.link;
        link.className = "project-link";
        link.textContent = "View Project ";

        const linkIcon = document.createElement("i");
        linkIcon.className = "bi bi-arrow-up-right";

        link.appendChild(linkIcon);

        link.target = "_blank";
        link.rel = "noopener noreferrer";

        content.appendChild(heading);
        content.appendChild(description);
        content.appendChild(technologyContainer);
        content.appendChild(link);

        card.appendChild(image);
        card.appendChild(content);

        projectColumn.appendChild(card);

        projectsContainer.appendChild(projectColumn);

    });

}


// ==========================================
// DISPLAY EDUCATION
// ==========================================

function displayEducation(education) {

    const educationContainer =
        document.getElementById("educationContainer");

    educationContainer.innerHTML = "";

    education.forEach(function (item) {

        const card = document.createElement("div");

        card.className = "education-card mb-4";

        const icon = document.createElement("div");
        icon.className = "education-icon";

        const iconElement = document.createElement("i");
        iconElement.className = "bi bi-mortarboard-fill";

        icon.appendChild(iconElement);

        const heading = document.createElement("h3");
        heading.textContent = item.college;

        const course = document.createElement("h5");
        course.textContent = item.course;

        const details = document.createElement("p");

        details.textContent =
            "Semester: " + item.semester +
            " | Academic Year: " + item.year +
            " | Status: " + item.status +
            " | Result: " + item.result;

        const description = document.createElement("p");
        description.textContent = item.description;

        card.appendChild(icon);
        card.appendChild(heading);
        card.appendChild(course);
        card.appendChild(details);
        card.appendChild(description);

        educationContainer.appendChild(card);

    });

}


// ==========================================
// DISPLAY CERTIFICATIONS
// ==========================================

function displayCertifications(certifications) {

    const container =
        document.getElementById("certificationsContainer");

    container.innerHTML = "";

    certifications.forEach(function (certificate) {

        const column = document.createElement("div");

        column.className = "col-lg-4 col-md-6";

        const card = document.createElement("div");

        card.className = "certificate-card";

        const icon = document.createElement("i");

        icon.className = certificate.icon;

        const heading = document.createElement("h4");

        heading.textContent = certificate.name;

        const provider = document.createElement("p");

        provider.textContent =
            "Provider: " + certificate.provider;

        const date = document.createElement("p");

        date.textContent =
            "Year: " + certificate.year;

        card.appendChild(icon);
        card.appendChild(heading);
        card.appendChild(provider);
        card.appendChild(date);

        if (certificate.link) {

            const link = document.createElement("a");

            link.href = certificate.link;
            link.target = "_blank";
            link.rel = "noopener noreferrer";
            link.className = "project-link";
            link.textContent = "View Certificate";

            card.appendChild(link);

        }

        column.appendChild(card);

        container.appendChild(column);

    });

}


// ==========================================
// DISPLAY SOCIAL MEDIA LINKS
// ==========================================

function displaySocialLinks(social) {

    const socialContainer =
        document.getElementById("socialLinks");

    socialContainer.innerHTML = "";

    social.forEach(function (item) {

        const link = document.createElement("a");

        link.href = item.url;

        link.target = "_blank";

        link.rel = "noopener noreferrer";

        link.title = item.name;

        link.setAttribute("aria-label", item.name);

        const icon = document.createElement("i");

        icon.className = item.icon;

        link.appendChild(icon);

        socialContainer.appendChild(link);

    });

}


// ==========================================
// CONTACT FORM VALIDATION
// ==========================================

function setupContactForm(email) {

    const contactForm =
        document.getElementById("contactForm");

    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const name =
            document.getElementById("contactName").value.trim();

        const userEmail =
            document.getElementById("contactEmail").value.trim();

        const subject =
            document.getElementById("contactSubject").value.trim();

        const message =
            document.getElementById("contactMessage").value.trim();

        const formMessage =
            document.getElementById("formMessage");

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Check empty fields
        if (!name || !userEmail || !subject || !message) {

            showFormMessage(
                "Please fill in all the fields.",
                "danger"
            );

            return;

        }

        // Validate email
        if (!emailPattern.test(userEmail)) {

            showFormMessage(
                "Please enter a valid email address.",
                "danger"
            );

            return;

        }

        // Basic length validation
        if (name.length > 100 ||
            subject.length > 150 ||
            message.length > 3000) {

            showFormMessage(
                "Please keep your details within the allowed length.",
                "danger"
            );

            return;

        }

        // Prepare email content
        const emailSubject = encodeURIComponent(subject);

        const emailBody = encodeURIComponent(
            "Name: " + name +
            "\nEmail: " + userEmail +
            "\n\nMessage:\n" + message
        );

        // Open the user's email application
        const mailtoLink =
            "mailto:" + email +
            "?subject=" + emailSubject +
            "&body=" + emailBody;

        showFormMessage(
            "Your details are valid. Opening your email application...",
            "success"
        );

        window.location.href = mailtoLink;

        contactForm.reset();

    });

}


// ==========================================
// SHOW FORM MESSAGE
// ==========================================

function showFormMessage(message, type) {

    const formMessage =
        document.getElementById("formMessage");

    formMessage.textContent = message;

    formMessage.className = "mt-3 text-" + type;

}


// ==========================================
// BACK TO TOP BUTTON
// ==========================================

const backToTop =
    document.querySelector(".back-to-top");

window.addEventListener("scroll", function () {

    if (window.scrollY > 300) {

        backToTop.classList.add("show");

    } else {

        backToTop.classList.remove("show");

    }

});


// ==========================================
// ACTIVE NAVBAR LINK
// ==========================================

const navLinks = document.querySelectorAll(".nav-link");

navLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        navLinks.forEach(function (item) {

            item.classList.remove("active");

        });

        this.classList.add("active");

    });

});