/* -------------------------------------------------------------
   Aditya Raj Portfolio - JavaScript Logic (Valentin Gassend Style)
------------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Lucide Icons
    if (window.lucide) {
        window.lucide.createIcons();
    }

    // 2. Custom Cursor Follower Dot Logic
    const cursorDot = document.getElementById('cursor-dot');
    
    if (cursorDot) {
        let mouseX = 0;
        let mouseY = 0;
        let dotX = 0;
        let dotY = 0;
        
        // Hide default system cursor on desktop hoverable screens
        document.documentElement.style.cursor = 'none';

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        // Smooth follower animation loop (Lerp)
        function updateCursor() {
            dotX += (mouseX - dotX) * 0.16;
            dotY += (mouseY - dotY) * 0.16;

            cursorDot.style.left = `${dotX}px`;
            cursorDot.style.top = `${dotY}px`;

            requestAnimationFrame(updateCursor);
        }
        updateCursor();

        // Cursor scaling hover triggers
        function attachCursorHoverEvents() {
            const hoverables = document.querySelectorAll('a, button, .AboutIntro-tabs--item, .project-minimal-card, .credential-item, #menu-toggle, #menu-close');
            
            hoverables.forEach(item => {
                // Remove existing to avoid duplicates if re-attaching
                item.removeEventListener('mouseenter', onMouseEnter);
                item.removeEventListener('mouseleave', onMouseLeave);
                item.removeEventListener('mousedown', onMouseDown);
                item.removeEventListener('mouseup', onMouseUp);

                item.addEventListener('mouseenter', onMouseEnter);
                item.addEventListener('mouseleave', onMouseLeave);
                item.addEventListener('mousedown', onMouseDown);
                item.addEventListener('mouseup', onMouseUp);
            });
        }

        function onMouseEnter(e) {
            cursorDot.classList.add('is-hovered');
            const target = e.currentTarget;
            const labelEl = cursorDot.querySelector('.cursor-dot__label');

            if (target.classList.contains('project-minimal-card') || target.classList.contains('credential-item')) {
                labelEl.textContent = 'View';
            } else if (target.id === 'email-cta') {
                labelEl.textContent = 'Mail';
            } else if (target.id === 'menu-toggle' || target.id === 'menu-close') {
                labelEl.textContent = 'Click';
            } else {
                labelEl.textContent = 'Go';
            }
        }

        function onMouseLeave() {
            cursorDot.classList.remove('is-hovered');
        }

        function onMouseDown() {
            cursorDot.classList.add('is-pressed');
        }

        function onMouseUp() {
            cursorDot.classList.remove('is-pressed');
        }

        attachCursorHoverEvents();
        
        // Expose to window to re-trigger if needed
        window.attachCursorHoverEvents = attachCursorHoverEvents;
    }

    // 3. Fixed Frame Menu Drawer Logic
    const menuToggle = document.getElementById('menu-toggle');
    const menuDrawer = document.getElementById('menu-drawer');
    const menuClose = document.getElementById('menu-close');
    const menuLinks = document.querySelectorAll('.Menu-nav--item');

    if (menuToggle && menuDrawer) {
        menuToggle.addEventListener('click', () => {
            menuDrawer.classList.add('open');
        });
    }

    if (menuClose && menuDrawer) {
        menuClose.addEventListener('click', () => {
            menuDrawer.classList.remove('open');
        });
    }

    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (menuDrawer) {
                menuDrawer.classList.remove('open');
            }
        });
    });

    // 4. Scroll IntersectionObserver for Reveal Animations
    const revealSections = document.querySelectorAll('.reveal');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-active');
            }
        });
    }, observerOptions);

    revealSections.forEach(section => {
        sectionObserver.observe(section);
    });
});
