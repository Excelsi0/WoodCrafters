document.addEventListener("DOMContentLoaded", function () {
    // Находим все формы на странице
    const forms = document.querySelectorAll(".contacts__form");

    // Создаем стили для индикатора загрузки
    const style = document.createElement("style");
    style.textContent = `
        .submit-loading {
            position: relative;
            pointer-events: none;
            opacity: 0.7;
        }
        .submit-loading::after {
            content: '';
            position: absolute;
            width: 20px;
            height: 20px;
            top: 50%;
            left: 50%;
            margin: -10px 0 0 -10px;
            border: 2px solid rgba(0,0,0,0.2);
            border-top-color: #000;
            border-radius: 50%;
            animation: button-loading-spinner 1s ease infinite;
        }
        @keyframes button-loading-spinner {
            from {
                transform: rotate(0turn);
            }
            to {
                transform: rotate(1turn);
            }
        }
    `;
    document.head.appendChild(style);

    forms.forEach((form) => {
        form.addEventListener("submit", async function (e) {
            e.preventDefault();

            // Находим кнопку отправки
            const submitButton = form.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;

            // Добавляем индикатор загрузки
            submitButton.classList.add("submit-loading");
            submitButton.textContent = "Отправка...";

            // Получаем данные формы
            const formData = new FormData(this);

            try {
                // Отправляем запрос
                const response = await fetch("/php/send.php", {
                    method: "POST",
                    body: formData,
                });

                if (response.ok) {
                    // Успешная отправка
                    form.reset();

                    // Находим ближайшее модальное окно
                    const modal = form.closest(".uk-modal");
                    if (modal) {
                        UIkit.modal(modal).hide();
                    }

                    // Показываем сообщение об успехе
                    UIkit.notification({
                        message: "Сообщение успешно отправлено!",
                        status: "success",
                        pos: "top-center",
                        timeout: 3000,
                    });
                } else {
                    throw new Error("Ошибка отправки");
                }
            } catch (error) {
                // Показываем сообщение об ошибке
                UIkit.notification({
                    message:
                        "Произошла ошибка при отправке сообщения. Пожалуйста, попробуйте позже.",
                    status: "danger",
                    pos: "top-center",
                    timeout: 3000,
                });
                console.error("Ошибка:", error);
            } finally {
                // Возвращаем кнопку в исходное состояние
                submitButton.classList.remove("submit-loading");
                submitButton.textContent = originalButtonText;
            }
        });
    });
});
