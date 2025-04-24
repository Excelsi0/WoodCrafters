document.addEventListener("DOMContentLoaded", function () {
    // Получаем текущий URL страницы
    const currentPath = window.location.pathname;
    const currentPage = currentPath.split("/").pop() || "index.html";

    // Находим все ссылки в меню
    const menuLinks = document.querySelectorAll(".nav__link");

    // Добавляем класс active к соответствующей ссылке
    menuLinks.forEach((link) => {
        const linkHref = link.getAttribute("href");
        // Проверяем совпадение с текущей страницей
        if (
            linkHref === currentPage ||
            (currentPage === "" && linkHref === "index.html") ||
            (currentPage === "about.html" && linkHref === "about.html") ||
            (currentPage === "gallery.html" && linkHref === "gallery.html")
        ) {
            link.classList.add("active");
        }
    });
});
