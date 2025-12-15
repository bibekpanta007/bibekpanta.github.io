/* Wait until the DOM is fully loaded */
document.addEventListener('DOMContentLoaded', () => {

    // THEME TOGGLE LOGIC
    const themeToggle = document.getElementById('theme-toggle'); // Button for theme switch
    const body = document.body;

    // Function to apply the selected theme (dark or light)
    const setTheme = (theme) => {
        if (theme === 'dark') {
            body.classList.add('dark-mode'); // Enable dark mode
            if (themeToggle) themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>'; // Change icon
        } else {
            body.classList.remove('dark-mode'); // Enable light mode
            if (themeToggle) themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>'; // Change icon
        }
        localStorage.setItem('theme', theme); // Save theme preference
    };

    // Check saved theme or system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    setTheme(savedTheme || (prefersDark ? 'dark' : 'light'));

    // Toggle theme on button click
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            setTheme(body.classList.contains('dark-mode') ? 'light' : 'dark');
        });
    }

    // TYPEWRITER EFFECT (index.html)
    const textEl = document.getElementById('typewriter'); // Element for typewriter effect
    if (textEl) {
        const texts = ["Software Development Student", "C++ Enthusiast", "Web Technology Learner"];
        let count = 0, index = 0, deleting = false;

        function type() {
            const fullText = texts[count % texts.length];
            index = deleting ? index - 1 : index + 1;
            textEl.textContent = fullText.slice(0, index) + '|';

            let speed = deleting ? 50 : 100; // Faster when deleting

            if (!deleting && index === fullText.length) {
                deleting = true; // Start deleting after finishing
                speed = 2000; // Pause before deleting
            } else if (deleting && index === 0) {
                deleting = false; // Move to next word
                count++;
                speed = 500;
            }
            setTimeout(type, speed);
        }

        setTimeout(type, 500); // Initial delay
    }

    // SCROLL ANIMATION
    // Observer to fade in elements on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                observer.unobserve(entry.target); // Animate only once
            }
        });
    }, { threshold: 0.1 });

    const scrollElements = document.querySelectorAll('section, .btn-group, footer, .skills-container');
    scrollElements.forEach(el => {
        el.style.opacity = "0"; // Start hidden
        el.style.transform = "translateY(30px)"; // Start slightly down
        el.style.transition = "all 0.8s ease-out";
        observer.observe(el); // Observe element for animation
    });

    // Highlight active navigation link based on current page
    const navLinks = document.querySelectorAll('.nav-links a');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    navLinks.forEach(link => {
        if (link.getAttribute('href').split('/').pop() === currentPage) {
            link.classList.add('active-page');
        }
    });

    // Smooth scroll for 'Contact Me' button
    const contactLink = document.querySelector('a[href="#contact"]');
    if (contactLink) {
        contactLink.addEventListener('click', e => {
            e.preventDefault();
            document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
        });
    }

    // 4. FORM VALIDATION (mailto:)
    const contactForm = document.querySelector('form[action*="mailto:"]');
    if (contactForm) {
        contactForm.addEventListener('submit', e => {
            const email = document.getElementById('email');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email.value.trim())) {
                alert("Please enter a valid email address.");
                email.focus();
                e.preventDefault(); // Prevent form submission
            }
        });
    }

    // 5. GUESSING GAME (hobby.html)
    const game = document.getElementById('guessing-game');
    if (game) {
        const secretNumber = Math.floor(Math.random() * 10) + 1; // Random number 1-10
        let attempts = 0;
        const input = document.getElementById('guessInput');
        const button = document.getElementById('checkGuessBtn');
        const message = document.getElementById('gameMessage');

        button.addEventListener('click', () => {
            const guess = parseInt(input.value);
            if (isNaN(guess) || guess < 1 || guess > 10) {
                message.textContent = 'Invalid guess (1-10 only).';
                message.style.color = '#ff4d4d';
                return;
            }
            attempts++;
            input.value = '';

            if (guess === secretNumber) {
                message.textContent = `🥳 Correct! Solved in ${attempts} attempts.`;
                message.style.color = 'var(--primary-neon)';
                input.disabled = true;
                button.disabled = true;
                button.textContent = 'GAME OVER';
            } else {
                message.textContent = guess < secretNumber ? `Too low! (${attempts})` : `Too high! (${attempts})`;
                message.style.color = 'var(--text-dim)';
            }
        });
    }

    // CHEATSHEET TAB INTERFACE (cheatsheet.html)
    window.openTab = function(evt, tabId) {
        document.querySelectorAll(".tab-content").forEach(tc => tc.classList.remove("active-content"));
        document.querySelectorAll(".tab-button").forEach(tb => tb.classList.remove("active-tab"));
        document.getElementById(tabId).classList.add("active-content");
        evt.currentTarget.classList.add("active-tab");
    };

    // Auto-select first tab on page load
    if (document.querySelector('.tab-navigation')) {
        document.querySelector('.tab-button').click();
    }

});
