
const $ = (selector, root = document) =>
    root.querySelector(selector);

const $$ = (selector, root = document) =>
    [...root.querySelectorAll(selector)];


// Current year

$("#year").textContent = new Date().getFullYear();


// Mobile navigation

const menuToggle = $("#menuToggle");
const navLinks = $("#navLinks");

menuToggle.addEventListener("click", () => {

    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
    );

    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close menu" : "Open menu"
    );

});


// Close mobile menu after clicking a link

$$(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("open");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

    });

});


// Dark and light theme

const themeToggle = $("#themeToggle");

function applyTheme(theme) {

    document.body.classList.toggle(
        "light",
        theme === "light"
    );

    themeToggle.textContent =
        theme === "light" ? "☾" : "☼";

    localStorage.setItem(
        "portfolio-theme",
        theme
    );

}

applyTheme(
    localStorage.getItem("portfolio-theme") || "dark"
);

themeToggle.addEventListener("click", () => {

    const newTheme =
        document.body.classList.contains("light")
            ? "dark"
            : "light";

    applyTheme(newTheme);

});


// Scroll progress bar

const progress = $("#scrollProgress");

window.addEventListener("scroll", () => {

    const maxScroll =
        document.documentElement.scrollHeight -
        window.innerHeight;

    const percentage =
        maxScroll > 0
            ? (window.scrollY / maxScroll) * 100
            : 0;

    progress.style.width = `${percentage}%`;

}, { passive: true });


// Mouse-following background glow

const cursorGlow = $("#cursorGlow");

if (window.matchMedia("(pointer: fine)").matches) {

    window.addEventListener("pointermove", event => {

        cursorGlow.style.left =
            `${event.clientX}px`;

        cursorGlow.style.top =
            `${event.clientY}px`;

    }, { passive: true });

} else {

    cursorGlow.style.display = "none";

}


// Interactive glowing cards

$$(".glow-card").forEach(card => {

    card.addEventListener("pointermove", event => {

        const rect = card.getBoundingClientRect();

        card.style.setProperty(
            "--mouse-x",
            `${event.clientX - rect.left}px`
        );

        card.style.setProperty(
            "--mouse-y",
            `${event.clientY - rect.top}px`
        );

    });

});


// Scroll reveal animation

const revealObserver = new IntersectionObserver(
    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                revealObserver.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.12
    }
);

$$(".reveal").forEach(element => {

    revealObserver.observe(element);

});


// Animated typing text

const role = $("#typedRole");

const roles = [

    "Computer Science Student",

    "Python Developer in Progress",

    "AI & Prompt Engineering Enthusiast",

    "Aspiring Data Scientist"

];

let roleIndex = 0;
let charIndex = roles[0].length;
let deleting = true;

function typeRole() {

    const current = roles[roleIndex];

    if (deleting) {

        charIndex--;

        role.textContent =
            current.slice(0, Math.max(0, charIndex));

        if (charIndex <= 0) {

            deleting = false;

            roleIndex =
                (roleIndex + 1) % roles.length;

            setTimeout(typeRole, 350);

            return;
        }

    } else {

        const next = roles[roleIndex];

        charIndex++;

        role.textContent =
            next.slice(0, charIndex);

        if (charIndex >= next.length) {

            deleting = true;

            setTimeout(typeRole, 1500);

            return;
        }

    }

    setTimeout(
        typeRole,
        deleting ? 38 : 65
    );

}

setTimeout(typeRole, 1800);


// Project category filtering

$$(".filter-btn").forEach(button => {

    button.addEventListener("click", () => {

        $$(".filter-btn").forEach(item => {

            item.classList.remove("active");

        });

        button.classList.add("active");

        const filter = button.dataset.filter;

        $$(".project-card").forEach(card => {

            const category = card.dataset.category;

            if (
                filter === "all" ||
                category === filter
            ) {

                card.classList.remove("hide");

            } else {

                card.classList.add("hide");

            }

        });

    });

});


// Contact form

$("#contactForm").addEventListener("submit", event => {

    event.preventDefault();

    const name = $("#name").value.trim();

    const email = $("#email").value.trim();

    const message = $("#message").value.trim();

    // REPLACE THIS WITH YOUR REAL EMAIL

    const recipient = "YOUR_EMAIL@example.com";

    if (recipient.includes("YOUR_EMAIL")) {

        $("#formNote").textContent =
            "Please add your real email address in script.js first.";

        return;

    }

    const subject = encodeURIComponent(
        `Portfolio message from ${name}`
    );

    const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\n\n${message}`
    );

    window.location.href =
        `mailto:${recipient}?subject=${subject}&body=${body}`;

    $("#formNote").textContent =
        "Your email app should open with your message filled in.";

});


// Active navigation highlighting

const navObserver = new IntersectionObserver(
    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                $$(".nav-links a").forEach(link => {

                    link.classList.toggle(
                        "active",
                        link.getAttribute("href") ===
                        `#${entry.target.id}`
                    );

                });

            }

        });

    },
    {
        rootMargin: "-35% 0px -55% 0px"
    }
);

$$("main section[id]").forEach(section => {

    navObserver.observe(section);

});
