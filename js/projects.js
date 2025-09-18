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

    function openAvatarModal() {
        if (avatarModal) {
            avatarModal.classList.add('is-visible');
        }
    }

    function closeAvatarModal() {
        if (avatarModal) {
            avatarModal.classList.remove('is-visible');
        }
    }
    
    function renderAvatars(type) {
        avatarGrid.innerHTML = '';
        
        let avatarsToRender = [];
        if (type === 'static') {
            avatarsToRender = staticAvatars;
        } else if (type === 'gif') {
            avatarsToRender = gifAvatars;
        }

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

    if (avatarImage && avatarModal && avatarGrid && closeAvatarModalBtn && filterButtons.length > 0) {
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
                
                const type = button.dataset.type;
                renderAvatars(type);
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

    const projectModal = document.getElementById('project-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalGithubLink = document.getElementById('modal-github-link');
    
    const closeProjectModalBtn = document.querySelector('#project-modal .close-btn');

    const detailButtons = document.querySelectorAll('.project-btn[data-id]');

    const projectsData = {
        'liria': {
            title: 'Liria',
            description: 'Платформа для создания и управления персональными блогами, ориентированная на минимализм и простоту.',
            github: 'https://liria.vercel.app'
        },
        'akirae': {
            title: 'Akirae',
            description: 'Сервис для отслеживания чтения книг и управления личной библиотекой. Включает систему рекомендаций на основе ИИ.',
            github: 'https://Akirae.vercel.app'
        },
        'checkm8': {
            title: 'Checkm8',
            description: 'Приложение для создания и управления списками задач с гибкой системой приоритетов и напоминаний.',
            github: 'https://Checkm8.vercel.app'
        },
        'orion': {
            title: 'Orion',
            description: 'Игровой движок, разработанный для создания 2D-визуальных новелл с интерактивными элементами.',
            github: 'https://orionengine.vercel.app'
        },
        'liora': {
            title: 'Liora',
            description: 'Набор инструментов для веб-разработчиков, включающий конвертер файлов, генератор QR-кодов и другие утилиты.',
            github: 'https://Liora.vercel.app'
        },
        'alarium': {
            title: 'Alarium',
            description: 'Платформа для совместной работы над проектами с встроенным чатом, досками Kanban и управлением документами.',
            github: 'https://Alarium.vercel.app'
        },
        'vektrionos': {
            title: 'VektrionOS',
            description: 'Собственный дистрибутив Linux, ориентированный на безопасность и производительность для настольных систем.',
            github: 'https://vektrion.vercel.app'
        },
        'vibra': {
            title: 'Vibra',
            description: 'Приложение для медитаций и релаксации с коллекцией звуков природы и управляемых сеансов.',
            github: 'https://vibra.vercel.app'
        },
        'aetheria': {
            title: 'Aetheria',
            description: 'Визуальный редактор для создания интерактивных презентаций и инфографики.',
            github: 'https://aetheria.vercel.app'
        },
        'akiraebot': {
            title: 'Akiraebot',
            description: 'Telegram-бот для автоматизации рутинных задач, таких как рассылка уведомлений и управление группами.',
            github: 'https://Akiraebot.vercel.app'
        },
        'animewiki': {
            title: 'Animewiki',
            description: 'База данных аниме, манги и персонажей, позволяющая пользователям отслеживать просмотренные серии и оставлять отзывы.',
            github: 'https://animewiki.vercel.app'
        },
        'clock': {
            title: 'Clock',
            description: 'Простое и минималистичное веб-приложение для таймера, секундомера и будильника.',
            github: 'https://oClock.vercel.app'
        },
        'aestris': {
            title: 'Aestris',
            description: 'Персональный сайт, посвящённый книге, с интерактивными картами и дополнительными материалами.',
            github: 'https://aestris.vercel.app'
        },
        'desmusic': {
            title: 'Desmusic',
            description: 'Десктопный музыкальный плеер с оффлайн-библиотекой и поддержкой кастомизации интерфейса.',
            github: 'https://desmusic.vercel.app'
        },
        'inkspire': {
            title: 'Inkspire',
            description: 'Инструмент для создания и визуализации ментальных карт и диаграмм, помогающий в мозговом штурме.',
            github: 'https://inkspire.vercel.app'
        },
        'tracekit': {
            title: 'Tracekit',
            description: 'Утилита для отслеживания багов и ошибок в веб-приложениях с подробными логами и отчётами.',
            github: 'https://tracekit.vercel.app'
        }
    };

    if (projectModal && closeProjectModalBtn && detailButtons.length > 0) {
        detailButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const projectId = e.currentTarget.dataset.id;
                const project = projectsData[projectId];

                if (project) {
                    modalTitle.textContent = project.title;
                    modalDescription.textContent = project.description;
                    if (project.github && project.github !== '#') {
                        modalGithubLink.href = project.github;
                        modalGithubLink.style.display = 'inline-block';
                    } else {
                        modalGithubLink.style.display = 'none';
                    }
                    projectModal.style.display = 'block';
                }
            });
        });

        closeProjectModalBtn.addEventListener('click', () => {
            projectModal.style.display = 'none';
        });

        window.addEventListener('click', (event) => {
            if (event.target === projectModal) {
                projectModal.style.display = 'none';
            }
        });

        window.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && projectModal.style.display === 'block') {
                projectModal.style.display = 'none';
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
            if (document.body.classList.contains("dark-theme")) {
                localStorage.setItem("theme", "dark");
            } else {
                localStorage.setItem("theme", "light");
            }
        });
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === "dark") {
            document.body.classList.add("dark-theme");
        }
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