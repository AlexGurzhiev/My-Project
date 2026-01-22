document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM loaded, window width:', window.innerWidth);

    // 1. КНОПКА "НАВЕРХ" (работает всегда)
    const scrollTopButton = document.createElement('button');
    scrollTopButton.className = 'scroll-top';
    scrollTopButton.id = 'scrollTop';
    scrollTopButton.setAttribute('aria-label', 'Наверх');
    scrollTopButton.innerHTML = '↑';
    document.body.appendChild(scrollTopButton);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTopButton.classList.add('visible');
        } else {
            scrollTopButton.classList.remove('visible');
        }
    });

    scrollTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // 2. ГАМБУРГЕР-МЕНЮ (только для мобильных)
    // Сначала проверяем ширину экрана
    if (window.innerWidth <= 1024) {
        console.log('Creating hamburger menu for mobile');

        // Находим sidebar в основном контенте
        const sidebar = document.querySelector('.sidebar');
        const menu = document.querySelector('.menu');

        if (sidebar && menu) {
            console.log('Sidebar and menu found');

            // Создаем гамбургер
            const menuToggle = document.createElement('button');
            menuToggle.className = 'menu-toggle';
            menuToggle.id = 'menuToggle';
            menuToggle.setAttribute('aria-label', 'Открыть меню');
            menuToggle.setAttribute('aria-expanded', 'false');

            // Добавляем три полоски
            for (let i = 0; i < 3; i++) {
                const line = document.createElement('span');
                line.className = 'menu-toggle__line';
                menuToggle.appendChild(line);
            }

            // Вставляем гамбургер в sidebar ПЕРЕД меню
            sidebar.insertBefore(menuToggle, menu);
            console.log('Hamburger button added');

            // Создаем оверлей
            const navOverlay = document.createElement('div');
            navOverlay.className = 'nav-overlay';
            document.body.appendChild(navOverlay);

            // Функция переключения меню
            function toggleMenu() {
                console.log('Toggle menu called');
                const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';

                menuToggle.classList.toggle('active');
                menuToggle.setAttribute('aria-expanded', !isExpanded);
                menu.classList.toggle('active');
                navOverlay.classList.toggle('active');

                // Блокируем скролл
                document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
            }

            // События
            menuToggle.addEventListener('click', function (e) {
                console.log('Hamburger clicked');
                e.stopPropagation();
                toggleMenu();
            });

            navOverlay.addEventListener('click', function () {
                console.log('Overlay clicked');
                toggleMenu();
            });

            // Закрытие по клику на ссылку
            const menuLinks = document.querySelectorAll('.menu__item');
            menuLinks.forEach(link => {
                link.addEventListener('click', function (e) {
                    console.log('Menu link clicked');
                    if (window.innerWidth <= 1024) {
                        toggleMenu();
                    }
                });
            });

            // Закрытие по Escape
            document.addEventListener('keydown', function (e) {
                if (e.key === 'Escape' && menu.classList.contains('active')) {
                    console.log('Escape pressed');
                    toggleMenu();
                }
            });

            // При ресайзе проверяем
            window.addEventListener('resize', function () {
                if (window.innerWidth > 1024 && menu.classList.contains('active')) {
                    console.log('Resized to desktop, closing menu');
                    toggleMenu();
                }
            });

            console.log('Hamburger menu setup complete');
        } else {
            console.log('ERROR: Sidebar or menu not found');
            console.log('Sidebar:', sidebar);
            console.log('Menu:', menu);
        }
    } else {
        console.log('Desktop view, skipping hamburger');
    }
});