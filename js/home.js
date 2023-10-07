$(document).ready(function () {
    var activeTab = localStorage.getItem("activeTab");
    if (activeTab) {
        $(".category-link").removeClass("active");
        $(".content").hide();
        $(activeTab).addClass("active");
        $(activeTab.replace("-link", "")).hide();
        $(activeTab.replace("-link", "")).fadeIn(300);
    } else {
        $(".category-link:first").addClass("active");
    }


    $(".category-link").click(function (e) {
        e.preventDefault();
        var target = $(this).attr("href");

        $(".category-link").removeClass("active");
        $(this).addClass("active");
        $(".content").hide();
        $(target.replace("-link", "")).fadeIn(300);

        localStorage.setItem("activeTab", this.getAttribute("href"));
    });
});


// Генерация рандомных чисел для ссылок и добавление круглых бейджей
$(document).ready(function () {
    $(".category-link").each(function () {
        var randomCount = Math.floor(Math.random() * 100);
        $(this).append('<span class="badge rounded-circle bg-primary">' + randomCount + '</span>'); // Добавляем бейдж с рандомным числом
    });

});


$(document).ready(function () {

    var titleText = $.trim($(".airdrop-details h3").text());
    $(".title-hide-content").text(titleText);


    $(".hide-block").click(function () {
        $(".content-hide").fadeOut(300, function () {
            $(".content-show").fadeIn(300);
        });
    });

    $(".show-block").click(function () {
        $(".content-show").fadeOut(300, function () {
            $(".content-hide").fadeIn(300);
        });
    });
});


const updateTime = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const currentTime = `Today ${hours}:${minutes}`;

    document.getElementById('current-time').textContent = currentTime;
};

updateTime();
setInterval(updateTime, 60000);


var splide = new Splide('.splide', {
    type: 'loop',
    perPage: 19,
    perMove: 1,
    breakpoints: {
        960: {
            perPage: 11, // Количество элементов при ширине экрана 960px и выше
        },
    }
});

splide.mount();

const iconContainer = document.querySelector('.icon-container');


let activeSlide = null;

splide.on('click', (slide) => {
    const slides = document.querySelectorAll('.splide__slide img');
    slides.forEach((img) => {
        img.classList.remove('active');
    });


    const fireIcons = document.querySelectorAll('.fire-icon');
    fireIcons.forEach((icon) => {
        icon.remove();
    });


    activeSlide = slide.slide.querySelector('img');
    activeSlide.classList.add('active');

    const fireIcon = document.createElement('img');
    fireIcon.src = '/img/fire.svg';
    fireIcon.alt = 'fire icon';
    fireIcon.classList.add('fire-icon');
    fireIcon.style.position = 'absolute';
    fireIcon.style.top = '6px';
    fireIcon.style.right = '10px';
    activeSlide.parentElement.appendChild(fireIcon);


    activeSlide.style.backgroundColor = '#23ACDE';
    activeSlide.style.backgroundColor = '';
});

document.addEventListener("DOMContentLoaded", function () {
    const icons = document.querySelectorAll(".splide__slide img");
    const cards = document.querySelectorAll(".airdrops-cards-news .card");

    icons.forEach((icon) => {
        let clickCount = 0;

        // Добавляем обработчик события двойного клика на иконку
        icon.addEventListener("click", function () {
            clickCount++;

            // Если был двойной клик
            if (clickCount === 2) {
                // Отображаем все карточки
                cards.forEach((card) => {
                    card.style.display = "block";
                });

                // Снимаем выделение с иконки и убираем огонек
                this.style.border = "none";
                this.style.boxShadow = "none";

                // Сбрасываем счетчик кликов
                clickCount = 0;
            } else {
                // Если был одиночный клик, показываем соответствующую карточку
                const cardIndex = this.getAttribute("data-card-index");

                // Скрываем все карточки
                cards.forEach((card) => {
                    card.style.display = "none";
                });

                // Показываем выбранную карточку
                if (cardIndex !== null) {
                    const selectedCard = document.querySelector(
                        `.airdrops-cards-news .card[data-card-index="${cardIndex}"]`
                    );
                    if (selectedCard) {
                        selectedCard.style.display = "block";
                    }
                }
            }
        });

        // Добавляем обработчик события двойного клика
        icon.addEventListener("dblclick", function (event) {
            event.preventDefault();
            clickCount = 0;
        });
    });
});
