import UIkit from "uikit";
import Icons from "uikit/dist/js/uikit-icons";
import "uikit/dist/css/uikit.min.css";

// Инициализируем UIkit
window.UIkit = UIkit;
UIkit.use(Icons);

import Swiper from "swiper";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "lightbox2/dist/css/lightbox.min.css";
import lightbox from "lightbox2";

// Маска для телефона
import Inputmask from "inputmask";
import "/src/fontello/css/fontello.css";
import "/src/sass/style.scss";

// Предзагрузка изображений для lightbox
document.addEventListener("DOMContentLoaded", () => {
    const lightboxLinks = document.querySelectorAll("[data-lightbox]");
    lightboxLinks.forEach((link) => {
        const img = new Image();
        img.src = link.href;
    });
});

// Инициализация lightbox с настройками
lightbox.option({
    fadeDuration: 300,
    imageFadeDuration: 300,
    resizeDuration: 300,
    wrapAround: true,
    disableScrolling: true,
    albumLabel: "Изображение %1 из %2",
});

// ловим ошибки
try {
    const swiper = new Swiper(".gallery__swiper", {
        loop: true,
        autoplay: {
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: false,
        },
        speed: 5000,
        spaceBetween: 20,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".button-next",
            prevEl: ".button-prev",
        },
        breakpoints: {
            320: { slidesPerView: 1, spaceBetween: 20 },
            576: { slidesPerView: 2, spaceBetween: 30 },
            768: { slidesPerView: 3, spaceBetween: 40 },
            1024: { slidesPerView: 4, spaceBetween: 40 },
        },
        modules: [Autoplay, Navigation, Pagination],
    });

    // Изменение скорости при наведении
    const swiperEl = document.querySelector(".gallery__swiper");
    swiperEl.addEventListener("mouseenter", () => {
        swiper.setTransition(500);
        setTimeout(() => {
            swiper.autoplay.stop();
        }, 500);
    });
    swiperEl.addEventListener("mouseleave", () => {
        swiper.setTransition(5000);
        swiper.autoplay.start();
    });

    // Быстрое переключение по кнопкам
    const nextBtn = document.querySelector(".button-next");
    const prevBtn = document.querySelector(".button-prev");
    const fastSpeed = 300;

    if (nextBtn && prevBtn) {
        nextBtn.addEventListener("click", (e) => {
            e.preventDefault();
            swiper.setTransition(fastSpeed);
            swiper.slideNext();
        });

        prevBtn.addEventListener("click", (e) => {
            e.preventDefault();
            swiper.setTransition(fastSpeed);
            swiper.slidePrev();
        });
    }
} catch (error) {
    console.error("Ошибка инициализации слайдера:", error);
}
// Слайдер партнеров
try {
    // слайдер
    const partnersSwiper = new Swiper(".partners__swiper", {
        // количество фото на странице
        slidesPerView: 1,
        // Циклический слайдер
        loop: true,
        autoplay: {
            delay: 0, // задержка между переключениями
            disableOnInteraction: false, // чтобы не останавливался при взаимодействии
        },
        speed: 2200, // скорость пролистывания (меньше — быстрее)
        slidesPerView: 1,
        spaceBetween: 20,
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
        modules: [Autoplay],
    });
} catch (error) {
    // выводим ошибки
    console.log(error);
}

// Слайдер на странице галереи
try {
    const swiperGalleryPage = new Swiper(".gallery__swiper-page", {
        loop: true,
        speed: 300,
        spaceBetween: 20,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".button-next",
            prevEl: ".button-prev",
        },
        breakpoints: {
            320: { slidesPerView: 1, spaceBetween: 20 },
            576: { slidesPerView: 2, spaceBetween: 30 },
            768: { slidesPerView: 3, spaceBetween: 40 },
            1024: { slidesPerView: 4, spaceBetween: 40 },
        },
        modules: [Navigation, Pagination],
    });
} catch (error) {
    console.error("Ошибка инициализации слайдера:", error);
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
