document.addEventListener("DOMContentLoaded", function () {
    // Получаем текущий URL страницы
    const currentPath = window.location.pathname;

    // Находим все ссылки в меню
    const menuLinks = document.querySelectorAll(".nav__link");

    // Добавляем класс active к соответствующей ссылке
    menuLinks.forEach((link) => {
        const linkPath = link.getAttribute("href");
        // Очищаем пути от .html для сравнения
        const cleanCurrentPath =
            currentPath.replace(".html", "").replace(/\/$/, "") || "/";
        const cleanLinkPath =
            linkPath.replace(".html", "").replace(/\/$/, "") || "/";

        // Проверяем совпадение путей
        if (cleanCurrentPath === cleanLinkPath) {
            link.classList.add("active");
        }
    });
});
