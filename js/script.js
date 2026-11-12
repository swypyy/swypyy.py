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

    if (menuToggle && navLinks) {
        // Add the mobile interaction styles here so the menu can animate
        // without changing the existing desktop navigation styles.
        const mobileNavStyles = document.createElement("style");
        mobileNavStyles.textContent = `
            @media (max-width: 760px) {
                .menu-toggle {
                    min-width: 48px;
                    min-height: 48px;
                    transition: background-color 180ms ease, border-color 180ms ease, transform 180ms ease;
                }

                .menu-toggle:active {
                    transform: scale(0.94);
                }

                .nav-links {
                    display: flex;
                    max-height: 0;
                    overflow: hidden;
                    visibility: hidden;
                    opacity: 0;
                    transform: translateY(-8px);
                    transition: max-height 280ms ease, opacity 200ms ease, transform 200ms ease, visibility 0s linear 280ms;
                    will-change: max-height, opacity, transform;
                }

                .nav-links.active {
                    max-height: 240px;
                    visibility: visible;
                    opacity: 1;
                    transform: translateY(0);
                    transition: max-height 320ms ease, opacity 220ms ease 40ms, transform 220ms ease 40ms, visibility 0s;
                }

                .nav-links a {
                    display: flex;
                    align-items: center;
                    min-height: 48px;
                    padding: 12px 10px;
                    border-radius: 8px;
                    transition: color 160ms ease, background-color 160ms ease;
                }

                .nav-links a:active {
                    background: rgba(167, 139, 250, 0.12);
                }
            }

            @media (prefers-reduced-motion: reduce) {
                .menu-toggle,
                .nav-links,
                .nav-links a {
                    transition-duration: 0.01ms !important;
                    scroll-behavior: auto !important;
                }
            }
        `;
        document.head.appendChild(mobileNavStyles);

        const setMenuOpen = (isOpen, returnFocus = false) => {
            navLinks.classList.toggle("active", isOpen);
            menuToggle.setAttribute("aria-expanded", String(isOpen));
            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Close navigation" : "Open navigation"
            );

            menuToggle.innerHTML = isOpen
                ? '<i data-lucide="x"></i>'
                : '<i data-lucide="menu"></i>';

            if (window.lucide) {
                lucide.createIcons();
            }

            if (returnFocus) {
                menuToggle.focus();
            }
        };

        menuToggle.addEventListener("click", () => {
            const isOpen = menuToggle.getAttribute("aria-expanded") !== "true";
            setMenuOpen(isOpen);
        });

        // Close the menu after selecting a navigation link.
        navLinks.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                setMenuOpen(false);
            });
        });

        // Close on outside click or Escape.
        document.addEventListener("click", event => {
            const clickedInsideMenu = navLinks.contains(event.target);
            const clickedToggle = menuToggle.contains(event.target);

            if (!clickedInsideMenu && !clickedToggle) {
                setMenuOpen(false);
            }
        });

        document.addEventListener("keydown", event => {
            if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
                setMenuOpen(false, true);
            }
        });

        // Ensure the collapsed mobile menu is not keyboard-focusable.
        setMenuOpen(false);
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
