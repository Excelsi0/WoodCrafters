document.addEventListener("DOMContentLoaded", function () {
    // Получаем текущий URL страницы
    const currentPath = window.location.pathname;
    const currentPage = currentPath.split("/").pop() || "index.html";

    // Находим все ссылки в меню
    const menuLinks = document.querySelectorAll(".nav__link");

    // Добавляем класс active к соответствующей ссылке и обрабатываем клики
    menuLinks.forEach((link) => {
        const linkHref = link.getAttribute("href");

        // Проверяем совпадение с текущей страницей
        if (
            linkHref === currentPage ||
            (currentPage === "index.html" && linkHref === "index.html") ||
            (currentPage === "about.html" && linkHref === "about.html") ||
            (currentPage === "gallery.html" && linkHref === "gallery.html") ||
            (currentPage === "contacts.html" && linkHref === "contacts.html")
        ) {
            link.classList.add("active");
        }

        // Обрабатываем клик по ссылке
        link.addEventListener("click", function (e) {
            if (linkHref === "index.html") {
                e.preventDefault();
                window.location.href = "/";
            } else if (linkHref.endsWith(".html")) {
                e.preventDefault();
                const newPath = "/" + linkHref.replace(".html", "");
                window.location.href = newPath;
            }
        });
    });
});
