document.addEventListener("DOMContentLoaded", () => {

    // ========================================
    // INITIALIZE LUCIDE ICONS
    // ========================================

    function initializeIcons() {
        if (window.lucide && typeof window.lucide.createIcons === "function") {
            window.lucide.createIcons();
        }
    }

    initializeIcons();


    // ========================================
    // FOOTER YEAR
    // ========================================

    const yearElement = document.getElementById("current-year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }


    // ========================================
    // FULL-SCREEN MOBILE NAVIGATION
    // ========================================

    const menuBtn = document.getElementById("menuBtn");
    const closeMenuBtn = document.getElementById("closeMenuBtn");
    const mobileMenu = document.getElementById("mobileMenu");

    const mobileLinks = document.querySelectorAll(".mobile-nav-link");

    let previousFocusedElement = null;

    function isMenuOpen() {
        return mobileMenu && mobileMenu.classList.contains("active");
    }


    // Open menu
    function openMobileMenu() {
        if (!menuBtn || !mobileMenu || isMenuOpen()) return;

        previousFocusedElement = document.activeElement;

        mobileMenu.classList.add("active");
        mobileMenu.setAttribute("aria-hidden", "false");
        mobileMenu.removeAttribute("inert");

        menuBtn.setAttribute("aria-expanded", "true");
        menuBtn.setAttribute("aria-label", "Close navigation menu");

        document.body.classList.add("menu-open");

        if (closeMenuBtn) {
            closeMenuBtn.focus();
        }
    }


    // Close menu
    function closeMobileMenu(restoreFocus = true) {
        if (!menuBtn || !mobileMenu || !isMenuOpen()) return;

        mobileMenu.classList.remove("active");
        mobileMenu.setAttribute("aria-hidden", "true");
        mobileMenu.setAttribute("inert", "");

        menuBtn.setAttribute("aria-expanded", "false");
        menuBtn.setAttribute("aria-label", "Open navigation menu");

        document.body.classList.remove("menu-open");

        if (restoreFocus) {
            menuBtn.focus();
        } else if (previousFocusedElement) {
            previousFocusedElement.focus();
        }
    }


    // Hamburger button
    if (menuBtn) {
        menuBtn.addEventListener("click", openMobileMenu);
    }


    // Close button
    if (closeMenuBtn) {
        closeMenuBtn.addEventListener("click", () => {
            closeMobileMenu();
        });
    }


    // Close after selecting a navigation link
    mobileLinks.forEach((link) => {
        link.addEventListener("click", () => {
            closeMobileMenu(false);
        });
    });


    // Close when clicking outside the menu content
    if (mobileMenu) {
        mobileMenu.addEventListener("click", (event) => {
            if (event.target === mobileMenu) {
                closeMobileMenu();
            }
        });
    }


    // Close using Escape key
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && isMenuOpen()) {
            closeMobileMenu();
        }
    });


    // Close menu if the window is resized to desktop
    window.addEventListener("resize", () => {
        if (window.innerWidth > 760 && isMenuOpen()) {
            closeMobileMenu(false);
        }
    });


    // ========================================
    // SMOOTH INTERNAL NAVIGATION
    // ========================================

    document.querySelectorAll('a[href^="#"]').forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const targetElement = document.querySelector(targetId);

            if (!targetElement) return;

            event.preventDefault();

            targetElement.scrollIntoView({
                behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
                    ? "auto"
                    : "smooth",
                block: "start"
            });

        });

    });

});
