import "/node_modules/uikit/dist/css/uikit-core.min.css";

import UIkit from "uikit";
import Icons from "uikit/dist/js/uikit-icons";
import "uikit/dist/css/uikit.min.css";
UIkit.use(Icons);

import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "lightbox2/dist/css/lightbox.min.css"; // Подключаем стили для lightbox
import lightbox from "lightbox2";

import "/src/sass/style.scss";

// Маска для телефона
import Inputmask from "inputmask";

// ловим ошибки
try {
    // слайдер
    const swiper = new Swiper(".gallery__swiper", {
        // количество фото на странице
        slidesPerView: 1,
        // Циклический слайдер
        loop: true,
        // пагинация кнопки снизу
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        // кнопки
        navigation: {
            nextEl: ".button-next",
            prevEl: ".button-prev",
        },
        // брейкпоинты
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 20,
            },
            576: {
                slidesPerView: 2,
                spaceBetween: 30,
            },
            768: {
                slidesPerView: 3,
                spaceBetween: 40,
            },
            1024: {
                slidesPerView: 4,
                spaceBetween: 40,
            },
        },
        modules: [Navigation, Pagination],
    });
} catch (error) {
    // выводим ошибки
    console.log(error);
}

// Telegram
const tgInput = document.getElementById("telegram");
tgInput.addEventListener("input", function () {
    if (!this.value.startsWith("@")) {
        this.value = "@" + this.value.replace(/^@+/, "");
    }
});

// Телефон
const phoneInput = document.getElementById("phone");

Inputmask({
    mask: "+7 (999) 999-99-99",
    showMaskOnHover: false,
    showMaskOnFocus: true,
    clearIncomplete: true,
    autoUnmask: false,
    placeholder: "_",
    onBeforePaste: function (pastedValue, opts) {
        // удаляем всё лишнее при вставке
        return pastedValue.replace(/^8/, "").replace(/\D/g, "");
    },
}).mask(phoneInput);
