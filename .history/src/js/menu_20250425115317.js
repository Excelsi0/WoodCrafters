document.addEventListener("DOMContentLoaded", function () {
    // Получаем текущий URL страницы
    const currentPath = window.location.pathname;
    // Убираем слэш в конце, если есть
    const cleanPath = currentPath.endsWith("/")
        ? currentPath.slice(0, -1)
        : currentPath;
    // Получаем название текущей страницы из пути
    const currentPage = cleanPath.split("/").pop() || "index";

    // Находим все ссылки в меню
    const menuLinks = document.querySelectorAll(".nav__link");

    // Добавляем класс active к соответствующей ссылке
    menuLinks.forEach((link) => {
        const linkHref = link.getAttribute("href");
        // Очищаем href от .html и слэшей в конце
        const cleanHref = linkHref.replace(".html", "").replace(/\/$/, "");
        const linkPage = cleanHref.split("/").pop() || "index";

        // Проверяем совпадение с текущей страницей
        if (
            linkPage === currentPage ||
            (currentPage === "index" && linkPage === "index") ||
            (cleanPath === "/" && linkPage === "index")
        ) {
            link.classList.add("active");
        }
    });
});
