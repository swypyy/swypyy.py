/* =========================================
   SWYPYY.PY - MAIN JAVASCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links");
    const body = document.body;

    const mobileBreakpoint = window.matchMedia("(max-width: 760px)");


    /* =====================================
       LUCIDE ICONS
    ===================================== */

    function refreshIcons() {
        if (window.lucide) {
            window.lucide.createIcons();
        }
    }

    refreshIcons();


    /* =====================================
       MOBILE NAVIGATION
    ===================================== */

    function setMenuOpen(isOpen) {

        if (!menuToggle || !navLinks) return;

        navLinks.classList.toggle("active", isOpen);

        menuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation" : "Open navigation"
        );

        body.classList.toggle("menu-open", isOpen);

        menuToggle.innerHTML = isOpen
            ? '<i data-lucide="x" aria-hidden="true"></i>'
            : '<i data-lucide="menu" aria-hidden="true"></i>';

        refreshIcons();
    }


    function toggleMenu() {

        const isOpen = navLinks.classList.contains("active");

        setMenuOpen(!isOpen);

    }


    if (menuToggle && navLinks) {

        // Hamburger button
        menuToggle.addEventListener("click", (event) => {

            event.stopPropagation();

            toggleMenu();

        });


        // Close after selecting a navigation link
        navLinks.querySelectorAll("a").forEach((link) => {

            link.addEventListener("click", () => {

                setMenuOpen(false);

            });

        });


        // Close when clicking outside the navigation
        document.addEventListener("click", (event) => {

            const clickedInsideMenu = navLinks.contains(event.target);
            const clickedToggle = menuToggle.contains(event.target);

            if (!clickedInsideMenu && !clickedToggle) {

                setMenuOpen(false);

            }

        });


        // Close using Escape key
        document.addEventListener("keydown", (event) => {

            if (
                event.key === "Escape" &&
                navLinks.classList.contains("active")
            ) {

                setMenuOpen(false);

                menuToggle.focus();

            }

        });


        // Close menu when switching to desktop
        function handleBreakpointChange(event) {

            if (!event.matches) {

                setMenuOpen(false);

            }

        }

        if (mobileBreakpoint.addEventListener) {

            mobileBreakpoint.addEventListener(
                "change",
                handleBreakpointChange
            );

        } else {

            // Older browser support
            mobileBreakpoint.addListener(handleBreakpointChange);

        }

    }


    /* =====================================
       FOOTER YEAR
    ===================================== */

    const yearElement = document.getElementById("current-year");

    if (yearElement) {

        yearElement.textContent = new Date().getFullYear();

    }


    /* =====================================
       SMOOTH INTERNAL NAVIGATION
    ===================================== */

    document.querySelectorAll('a[href^="#"]').forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });

});
