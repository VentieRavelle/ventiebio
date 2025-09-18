document.addEventListener('DOMContentLoaded', () => {

    // Регистрация плагина GSAP (выполняется один раз)
    if (typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
    }
    
    // Начальные анимации при загрузке страницы
    if (typeof gsap !== 'undefined') {
        gsap.from(".hero-content img", { duration: 1, y: -50, opacity: 0 });
        gsap.from(".hero-content h1", { duration: 1, x: -50, opacity: 0 });
        gsap.from(".hero-content p", { duration: 1, x: 50, opacity: 0 });
        gsap.from(".social-links a", { duration: 1, opacity: 0, stagger: 0.2, delay: 0.5 });
        gsap.from(".hero-card", { duration: 1, opacity: 0, scale: 0.9, stagger: 0.3, delay: 0.8 });
    }

    // --- Логика переключения аватара (кнопки) ---
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

    // --- Логика модального окна для выбора аватара ---
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
                avatars = (type === 'static') ? staticAvatars : gifAvatars;
                currentAvatarIndex = selectedIndex;
                updateAvatar();
                closeAvatarModal();
            }
        });
    }

    // --- Логика пишущей машинки ---
    const typewriterTextElement = document.getElementById('typewriter-text');
    const texts = [
        "Разработчик программного обеспечения",
        "Творец и художник",
        "Энтузиаст кибербезопасности"
    ];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeWriter() {
        const currentText = texts[textIndex];
        if (isDeleting) {
            typewriterTextElement.textContent = currentText.substring(0, charIndex--);
        } else {
            typewriterTextElement.textContent = currentText.substring(0, charIndex++);
        }

        let typingSpeed = 100;

        if (isDeleting) {
            typingSpeed /= 2;
        }

        if (!isDeleting && charIndex === currentText.length + 1) {
            typingSpeed = 2000; 
            isDeleting = true;
        } else if (isDeleting && charIndex < 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typingSpeed = 500; 
        }

        setTimeout(typeWriter, typingSpeed);
    }
    
    typeWriter();

    // --- Анимация секций при скролле ---
    const fadeInSections = document.querySelectorAll('.fade-in-section');
    fadeInSections.forEach(section => {
        gsap.from(section, {
            scrollTrigger: {
                trigger: section,
                start: "top 80%", 
                toggleActions: "play none none none"
            },
            opacity: 0,
            y: 50,
            duration: 1.5,
            ease: "power2.out"
        });
    });

    // --- Логика контактной формы ---
    const contactForm = document.getElementById('contactForm');
    const contactSuccess = document.getElementById('contactSuccess');
    
    if (contactForm && contactSuccess) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); 
            
            console.log('Form submitted. Simulating success...');

            contactForm.style.display = 'none';
            contactSuccess.style.display = 'block';
        });
    }
    
    // --- Логика переключателя темы ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            const icon = themeToggleBtn.querySelector('i');
            if (document.body.classList.contains('dark-theme')) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            } else {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            }
        });
    }

    // --- Логика кнопки "наверх" ---
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollTopBtn.style.display = 'block';
            } else {
                scrollTopBtn.style.display = 'none';
            }
        });
        
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // --- Логика меню приложений ---
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

});