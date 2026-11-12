/* =========================================
   SWYPYY.PY - MAIN JAVASCRIPT
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {

    // ---------- LUCIDE ICONS ----------

    if (window.lucide) {
        lucide.createIcons();
    }

    // ---------- CURRENT YEAR ----------

    const yearElement = document.getElementById("current-year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // ---------- MOBILE NAVIGATION ----------

    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links");
    const navbar = menuToggle ? menuToggle.closest(".navbar") : null;

    if (menuToggle && navLinks && navbar) {
        const setMenuOpen = (isOpen, returnFocus = false) => {
            navLinks.classList.toggle("active", isOpen);
            navbar.classList.toggle("menu-open", isOpen);
            menuToggle.setAttribute("aria-expanded", String(isOpen));
            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Close navigation" : "Open navigation"
            );

            if (returnFocus) {
                menuToggle.focus();
            }
        };

        menuToggle.addEventListener("click", event => {
            event.stopPropagation();
            setMenuOpen(menuToggle.getAttribute("aria-expanded") !== "true");
        });

        navLinks.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => setMenuOpen(false));
        });

        document.addEventListener("click", event => {
            if (
                menuToggle.getAttribute("aria-expanded") === "true" &&
                !navLinks.contains(event.target) &&
                !menuToggle.contains(event.target)
            ) {
                setMenuOpen(false);
            }
        });

        document.addEventListener("keydown", event => {
            if (
                event.key === "Escape" &&
                menuToggle.getAttribute("aria-expanded") === "true"
            ) {
                setMenuOpen(false, true);
            }
        });

        // Reset the mobile drawer if the viewport changes to desktop.
        const desktopViewport = window.matchMedia("(min-width: 761px)");
        desktopViewport.addEventListener("change", () => setMenuOpen(false));
    }

    // ---------- SMOOTH SCROLLING ----------

    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener("click", event => {
            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);

            if (target) {
                event.preventDefault();
                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });

    // ---------- CONSOLE MESSAGE ----------

    console.log(
        "%cWelcome to Swypyy.py!",
        "color: #a78bfa; font-size: 18px; font-weight: bold;"
    );

    console.log(
        "%cYour Python learning journey starts here.",
        "color: #c084fc; font-size: 12px;"
    );

});
