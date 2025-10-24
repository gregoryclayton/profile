document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const cards = document.querySelectorAll('.card');
    const parallaxBg = document.getElementById('parallax-bg');
    const workItems = document.querySelectorAll('.work-item');
    const modal = document.getElementById('work-modal');
    const closeModal = document.querySelector('.close-modal');
    const navLinks = document.querySelectorAll('.footer-nav a, .menu-nav a');
    const menuButton = document.getElementById('menuButton');
    const menuDropdown = document.getElementById('menuDropdown');
    const dot = document.querySelector('.dot');
    const textBlob = document.getElementById('textblob');

    // Project data
    const projectData = {
        1: {
            title: "Geometric Pattern Design",
            image: "https://picsum.photos/600/400?random=1",
            description: "A series of geometric patterns created to explore the interaction between shapes and colors. This project investigates how certain arrangements can create optical illusions and visual movement.",
            client: "Art Gallery Exhibition",
            date: "June 2025",
            technologies: "Digital Illustration, Photoshop"
        },
        2: {
            title: "Motion Graphics Experiment",
            image: "https://picsum.photos/600/400?random=2",
            description: "This experimental project explores the boundaries between static and moving imagery. By carefully designing patterns that trigger visual phenomena, the static image appears to move or pulse when viewed.",
            client: "Personal Research",
            date: "March 2025",
            technologies: "After Effects, Illustrator"
        },
        3: {
            title: "Perception Study",
            image: "https://picsum.photos/600/400?random=3",
            description: "A research-driven project investigating how humans perceive depth and dimension in two-dimensional patterns. The work combines principles from psychology and visual arts to create compelling optical effects.",
            client: "University Research Department",
            date: "August 2024",
            technologies: "Processing, Generative Art"
        },
        4: {
            title: "Interactive Illusion",
            image: "https://picsum.photos/600/400?random=4",
            description: "An interactive installation that responds to viewer movement, creating dynamic optical illusions that change based on perspective and distance. This work challenges conventional viewing experiences.",
            client: "Modern Art Museum",
            date: "October 2024",
            technologies: "Projection Mapping, Arduino, Processing"
        }
    };

    // Parallax effect on scroll
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        parallaxBg.style.transform = `translateY(${scrollPosition * -0.3}px)`;

        // Card reveal animation
        cards.forEach((card, index) => {
            const cardPosition = card.offsetTop;
            const offset = 600 + (index * 100);

            if (scrollPosition > cardPosition - offset) {
                card.style.opacity = '1';
                card.style.transform = 'translateX(0)';
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateX(-50px)';
            }
        });
    });

    // Initialize card states
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateX(-50px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    // Work item click handlers
    workItems.forEach(item => {
        item.addEventListener('click', () => {
            const projectId = item.getAttribute('data-id');
            const project = projectData[projectId];

            // Update modal content
            document.getElementById('modal-title').textContent = project.title;
            document.getElementById('modal-image').src = project.image;
            document.getElementById('modal-description').innerHTML = `<p>${project.description}</p>`;
            document.getElementById('modal-client').textContent = project.client;
            document.getElementById('modal-date').textContent = project.date;
            document.getElementById('modal-tech').textContent = project.technologies;

            // Show modal
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling behind modal
        });
    });

    // Close modal logic
    closeModal.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Re-enable scrolling
    });
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Menu button toggle
    menuButton.addEventListener('click', () => {
        menuButton.classList.toggle('active');
        menuDropdown.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.menu-container') && menuDropdown.classList.contains('active')) {
            menuButton.classList.remove('active');
            menuDropdown.classList.remove('active');
        }
    });

    // Smooth scroll for anchor links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const yOffset = -20; 
                const y = targetElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
                window.scrollTo({
                    top: y,
                    behavior: 'smooth'
                });
                // Close the dropdown menu if it's open
                if (menuDropdown.classList.contains('active')) {
                    menuButton.classList.remove('active');
                    menuDropdown.classList.remove('active');
                }
            }
        });
    });

    // Dot click for textblob randomization
    if (dot && textBlob) {
        dot.addEventListener('click', randomizeTextBlob);
        dot.style.cursor = 'pointer';
        dot.title = 'Click to randomize text';
    }

    // RE-ADD: Pulsating background effect
    let intensity = 0;
    let increasing = true;
    const maxIntensity = 20; // Maximum percentage to adjust filters
    const step = 0.3;
    const interval = 50;
    // Set the background image if not already set
    if (!parallaxBg.style.backgroundImage || parallaxBg.style.backgroundImage === 'none') {
        parallaxBg.style.backgroundImage = 'url("illusion2.png")';
    }
    function updateFilters() {
        if (intensity >= maxIntensity) increasing = false;
        else if (intensity <= 0) increasing = true;
        intensity = increasing ? intensity + step : intensity - step;
        const contrastValue = 100 + intensity;
        const brightnessValue = 100 - (intensity / 2); 
        parallaxBg.style.filter = `contrast(${contrastValue}%) brightness(${brightnessValue}%)`;
    }
    setInterval(updateFilters, interval);

    // Trigger initial animation check
    window.dispatchEvent(new Event('scroll'));
});

// Function to randomize the order of words in the textblob element
function randomizeTextBlob() {
    const textBlob = document.getElementById('textblob');
    if (!textBlob) return;
    const originalHTML = textBlob.innerHTML;
    const text = textBlob.innerText;
    const words = text.split(/\s+/);
    for (let i = words.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [words[i], words[j]] = [words[j], words[i]];
    }
    const structure = originalHTML.replace(/[a-zA-Z0-9]+/g, 'WORD');
    let currentIndex = 0;
    textBlob.innerHTML = '';
    function addNextWord() {
        if (currentIndex < words.length) {
            if (currentIndex === 0) textBlob.textContent = words[currentIndex];
            else textBlob.textContent += ' ' + words[currentIndex];
            currentIndex++;
            const typingSpeed = 20 + Math.random() * 50;
            setTimeout(addNextWord, typingSpeed);
        } else {
            let structuredContent = structure;
            for (const word of words) {
                structuredContent = structuredContent.replace('WORD', word);
            }
            textBlob.innerHTML = structuredContent;
        }
    }
    addNextWord();
}
