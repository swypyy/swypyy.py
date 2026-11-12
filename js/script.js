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

        menuToggle.addEventListener("click", () => {

            const isOpen = navLinks.classList.toggle("active");

            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            menuToggle.innerHTML = isOpen
                ? '<i data-lucide="x"></i>'
                : '<i data-lucide="menu"></i>';

            if (window.lucide) {
                lucide.createIcons();
            }
        });


        // Close menu after selecting a navigation link

        navLinks.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                navLinks.classList.remove("active");

                menuToggle.setAttribute("aria-expanded", "false");

                menuToggle.innerHTML =
                    '<i data-lucide="menu"></i>';

                if (window.lucide) {
                    lucide.createIcons();
                }
            });

        });


        // Close menu when clicking outside

        document.addEventListener("click", event => {

            const clickedInsideMenu =
                navLinks.contains(event.target);

            const clickedToggle =
                menuToggle.contains(event.target);

            if (!clickedInsideMenu && !clickedToggle) {

                navLinks.classList.remove("active");

                menuToggle.setAttribute("aria-expanded", "false");

                menuToggle.innerHTML =
                    '<i data-lucide="menu"></i>';

                if (window.lucide) {
                    lucide.createIcons();
                }
            }
        });

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
