document.addEventListener('DOMContentLoaded', () => {

    if (typeof gsap !== 'undefined') {
        gsap.from(".hero-content img", { duration: 1, y: -50, opacity: 0 });
        gsap.from(".hero-content h1", { duration: 1, x: -50, opacity: 0 });
        gsap.from(".hero-content p", { duration: 1, x: 50, opacity: 0 });
        gsap.from(".social-links a", { duration: 1, opacity: 0, stagger: 0.2, delay: 0.5 });
        gsap.from(".hero-card", { duration: 1, opacity: 0, scale: 0.9, stagger: 0.3, delay: 0.8 });
    }

    const avatarImage = document.getElementById('avatar-image');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

      const staticAvatars = [
        'assets/avatar1.jpg', 
        'assets/avatar2.jpg', 
        'assets/avatar3.jpg',
        'assets/avatar4.jpg',
        'assets/avatar5.jpg',
        'assets/avatar6.jpg', 
        'assets/avatar7.jpg', 
        'assets/avatar8.jpg',
        'assets/avatar9.jpg', 
        'assets/avatar10.jpg',
        'assets/avatar11.jpg',
      'assets/avatar12.jpg'
      
    ];
   const gifAvatars = [
      'assets/gif1.gif', 
      'assets/gif2.gif',
      'assets/gif3.gif',
      'assets/gif4.gif',
      'assets/gif5.gif'
    ];


    let avatars = staticAvatars;
    let currentAvatarIndex = 0;

    if (avatarImage && prevBtn && nextBtn) {
        function updateAvatar() {
            gsap.to(avatarImage, {
                opacity: 0,
                duration: 0.3,
                onComplete: () => {
                    avatarImage.src = avatars[currentAvatarIndex];
                    gsap.to(avatarImage, {
                        opacity: 1,
                        duration: 0.3
                    });
                }
            });
        }

        prevBtn.addEventListener('click', () => {
            currentAvatarIndex = (currentAvatarIndex - 1 + avatars.length) % avatars.length;
            updateAvatar();
        });

        nextBtn.addEventListener('click', () => {
            currentAvatarIndex = (currentAvatarIndex + 1) % avatars.length;
            updateAvatar();
        });
    }

    const avatarModal = document.getElementById('avatar-selection-modal');
    const avatarGrid = document.getElementById('avatar-grid');
    const closeAvatarModalBtn = document.querySelector('.close-avatar-modal-btn');
    const filterButtons = document.querySelectorAll('.filter-btn');

    if (avatarImage && avatarModal && avatarGrid && closeAvatarModalBtn && filterButtons.length > 0) {
        function openAvatarModal() {
            avatarModal.classList.add('is-visible');
        }

        function closeAvatarModal() {
            avatarModal.classList.remove('is-visible');
        }
        
        function renderAvatars(type) {
            avatarGrid.innerHTML = '';
            
            let avatarsToRender = (type === 'static') ? staticAvatars : gifAvatars;

            if (avatarsToRender.length === 0) {
                avatarGrid.innerHTML = '<p class="text-center text-gray-500">Пока здесь ничего нет...</p>';
                return;
            }

            avatarsToRender.forEach((avatar, index) => {
                const li = document.createElement('li');
                li.classList.add('avatar-item');
                li.dataset.index = index;
                li.dataset.type = type;
                const img = document.createElement('img');
                img.src = avatar;
                img.alt = `Avatar ${index + 1}`;
                li.appendChild(img);
                avatarGrid.appendChild(li);
            });
        }

        renderAvatars('static');
        avatarImage.addEventListener('click', openAvatarModal);
        closeAvatarModalBtn.addEventListener('click', closeAvatarModal);

        window.addEventListener('click', (event) => {
            if (event.target === avatarModal) {
                closeAvatarModal();
            }
        });

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                renderAvatars(button.dataset.type);
            });
        });

        avatarGrid.addEventListener('click', (event) => {
            const selectedItem = event.target.closest('.avatar-item');
            if (selectedItem) {
                const selectedIndex = parseInt(selectedItem.dataset.index, 10);
                const type = selectedItem.dataset.type;
                avatars = (type === 'static') ? staticAvatars : animatedAvatars;
                currentAvatarIndex = selectedIndex;
                updateAvatar();
                closeAvatarModal();
            }
        });
    }

    const scrollTopBtn = document.getElementById("scrollTopBtn");
    if (scrollTopBtn) {
        window.addEventListener("scroll", () => {
            if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
                gsap.to(scrollTopBtn, { opacity: 1, scale: 1, visibility: "visible", duration: 0.3 });
            } else {
                gsap.to(scrollTopBtn, { opacity: 0, scale: 0.8, visibility: "hidden", duration: 0.3 });
            }
        });
        scrollTopBtn.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    const themeToggle = document.getElementById("theme-toggle");
    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            document.body.classList.toggle("dark-theme");
            const theme = document.body.classList.contains("dark-theme") ? "dark" : "light";
            localStorage.setItem("theme", theme);
        });
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === "dark") {
            document.body.classList.add("dark-theme");
        }
    }

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = this.name.value.trim();
            const email = this.email.value.trim();
            const message = this.message.value.trim();
            const successMessage = document.getElementById('contactSuccess');
            if (!name || !email || !message) {
                successMessage.innerText = "Пожалуйста, заполните все поля формы.";
                successMessage.style.color = '#e74c3c';
            } else {
                successMessage.innerText = "Сообщение отправлено!";
                successMessage.style.color = '#009e60';
                this.reset();
            }
            successMessage.style.display = 'block';
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 3000);
        });
    }
    
    const aboutBtn = document.getElementById("about-btn");
    const aboutModal = document.getElementById("about-modal");
    const modalCloseBtn = document.querySelector(".modal-close-btn");
    if (aboutBtn && aboutModal && modalCloseBtn) {
        aboutBtn.addEventListener("click", () => {
            aboutModal.style.display = "block";
        });
        modalCloseBtn.addEventListener("click", () => {
            aboutModal.style.display = "none";
        });
        window.addEventListener("click", (event) => {
            if (event.target === aboutModal) {
                aboutModal.style.display = "none";
            }
        });
    }

    const historyContainer = document.getElementById('history-container');
    if (historyContainer) {
        fetch('history.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Сетевая ошибка или файл не найден');
                }
                return response.json();
            })
            .then(data => {
                data.forEach(event => {
                    const eventDiv = document.createElement('div');
                    eventDiv.classList.add('timeline-event');
                    const eventTitle = document.createElement('h4');
                    eventTitle.innerHTML = `${event.date} <span>— ${event.title}</span>`;
                    const eventDesc = document.createElement('p');
                    eventDesc.textContent = event.description;
                    eventDiv.appendChild(eventTitle);
                    eventDiv.appendChild(eventDesc);
                    historyContainer.appendChild(eventDiv);
                });
            })
            .catch(error => {
                console.error('Ошибка при загрузке истории:', error);
            });
    }

    const textElement = document.getElementById('typewriter-text');
    if (textElement) {
        const phrases = ["Добро пожаловать", "Есть вопросы? Можешь написать в Телеграм", "Удачи!"];
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        function typeWriter() {
            const currentPhrase = phrases[phraseIndex];
            if (isDeleting) {
                textElement.textContent = currentPhrase.substring(0, charIndex--);
            } else {
                textElement.textContent = currentPhrase.substring(0, charIndex++);
            }
            let typeSpeed = 100;
            if (isDeleting) {
                typeSpeed /= 2;
            }
            if (!isDeleting && charIndex === currentPhrase.length + 1) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                typeSpeed = 500;
            }
            setTimeout(typeWriter, typeSpeed);
        }
        typeWriter();
    }

    const sections = document.querySelectorAll('.fade-in-section');
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        rootMargin: '0px',
        threshold: 0.2
    });
    sections.forEach(section => {
        observer.observe(section);
    });

    const form = document.querySelector('.contact-form');
    if (form) {
      form.addEventListener('submit', function(event) {
          event.preventDefault();
          console.log('Форма отправлена, но страница не перезагрузилась!');
      });
    }
 // --- Код для меню приложений ---
    const appMenuToggle = document.getElementById('app-menu-toggle');
    const appMenu = document.getElementById('app-menu');
    if (appMenuToggle && appMenu) {
        appMenuToggle.addEventListener('click', (event) => {
            event.stopPropagation();
            appMenu.classList.toggle('active');
        });

        document.addEventListener('click', (event) => {
            if (!appMenu.contains(event.target) && !appMenuToggle.contains(event.target)) {
                appMenu.classList.remove('active');
            }
        });
    }
    // --- Конец кода для меню приложений ---
});

