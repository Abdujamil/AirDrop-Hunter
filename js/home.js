$(window).on('load', function () {
    // По умолчанию скрываем все .content блоки
    $(".content").hide();

    // Показываем контент блока "Airdrops" по умолчанию
    $("#airdrops-content").fadeIn(300); // Замените "#Airdrops" на селектор, который соответствует блоку Airdrops

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

$(".category-link").each(function () {
    var randomCount = Math.floor(Math.random() * 100);
    var badgeClass = randomCount % 2 === 0 ? "active-badge" : "inactive-badge";

    $(this).append('<span class="badge rounded-circle ' + badgeClass + '">' + randomCount + '</span>');
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


var splide = new Splide('#first-slider', {
    type: 'loop',
    perPage: 7,
    perMove: 1,
});
splide.mount();

var splide = new Splide('#second-slider', {
    type: 'loop',
    perPage: 19,
    perMove: 1,
    breakpoints: {
        1200: {
            perPage: 15,
        },
        960: {
            perPage: 11,
        },
        620: {
            perPage: 8,
        },
        480: {
            perPage: 6,
        },
        360: {
            perPage: 4,
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

const icons = document.querySelectorAll(".splide__slide img");
const cards = document.querySelectorAll(".airdrops-cards-news .card");

icons.forEach((icon) => {
    let clickCount = 0;

    icon.addEventListener("click", function () {
        clickCount++;

        if (clickCount === 2) {
            cards.forEach((card) => {
                card.style.display = "block";
            });


            clickCount = 0;
        } else {
            const cardIndex = this.getAttribute("data-card-index");

            cards.forEach((card) => {
                card.style.display = "none";
            });
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
    icon.addEventListener("dblclick", function (event) {
        event.preventDefault();
        clickCount = 0;
    });
});


var swiper = new Swiper(".mySwiper", {
    loop: true,
    pagination: {
        el: ".swiper-pagination",
        type: "fraction",
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    on: {
        init: function () {
            var firstSlideIndex = this.realIndex;
            var titleText = $.trim($(this.slides[firstSlideIndex]).find("h3").text());
            $(".title-hide-content span.title-hide-content").text(titleText);
        },
    },
});

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



const showMoreButtons = document.querySelectorAll(".read-more-state");

const modals = document.querySelectorAll(".modal");

showMoreButtons.forEach(function (button, index) {
    button.addEventListener("click", function () {

        modals[index].style.display = "block";
    });
});

const closeButtons = document.querySelectorAll(".close");
closeButtons.forEach(function (closeButton, index) {
    closeButton.addEventListener("click", function () {
        modals[index].style.display = "none";
    });
});

modals.forEach(function (modal, index) {
    modal.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
});


