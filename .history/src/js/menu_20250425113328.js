document.addEventListener("DOMContentLoaded", function () {
    // Получаем текущий URL страницы
    const currentPath = window.location.pathname;
    const currentPage = currentPath.split("/").pop() || "index.html";

    // Находим все ссылки в меню
    const menuLinks = document.querySelectorAll(".nav__link");

    // Добавляем класс active к соответствующей ссылке
    menuLinks.forEach((link) => {
        const linkHref = link.getAttribute("href");
        const linkPage = linkHref.split("/").pop();

        // Проверяем совпадение с текущей страницей
        if (
            linkPage === currentPage ||
            (currentPage === "" && linkPage === "index.html") ||
            (currentPage === "/" && linkPage === "index.html")
        ) {
            link.classList.add("active");
        }
    });
});
