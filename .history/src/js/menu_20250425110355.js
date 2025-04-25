import "/src/sass/style.scss";

document.addEventListener("DOMContentLoaded", function () {
    // Получаем текущий URL страницы
    const currentPath = window.location.pathname;

    // Находим все ссылки в меню
    const menuLinks = document.querySelectorAll(".nav__link");

    // Добавляем класс active к соответствующей ссылке
    menuLinks.forEach((link) => {
        const linkHref = link.getAttribute("href");
        // Проверяем совпадение с текущей страницей
        if (
            currentPath === linkHref ||
            (currentPath === "/" && linkHref === "/") ||
            (currentPath === "/about" && linkHref === "/about") ||
            (currentPath === "/gallery" && linkHref === "/gallery") ||
            (currentPath === "/contacts" && linkHref === "/contacts")
        ) {
            link.classList.add("active");
        }
    });
});
