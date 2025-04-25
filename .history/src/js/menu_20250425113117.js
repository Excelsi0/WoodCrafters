document.addEventListener("DOMContentLoaded", function () {
    // Получаем текущий путь
    let currentPath = window.location.pathname;
    // Убираем слэш в конце, если есть
    currentPath = currentPath.replace(/\/$/, "");
    // Если путь пустой, значит это главная
    if (currentPath === "") currentPath = "/";

    // Находим все ссылки в меню
    const menuLinks = document.querySelectorAll(".nav__link");

    // Добавляем класс active к соответствующей ссылке
    menuLinks.forEach((link) => {
        let linkPath = link.getAttribute("href");

        // Если это ссылка на главную
        if (linkPath === "index.html") {
            linkPath = "/";
        }

        // Проверяем совпадение путей
        if (currentPath === linkPath) {
            link.classList.add("active");
        }
    });
});
