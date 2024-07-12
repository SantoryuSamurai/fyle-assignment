const work = document.querySelector(".work");
const carousel = document.querySelector(".carousel");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const sliderChildrens = [...carousel.children];
const dots = document.querySelectorAll(".dot");

let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId;

let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

sliderChildrens.slice(-cardPerView).reverse().forEach(card => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});

sliderChildrens.slice(0, cardPerView).forEach(card => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

carousel.classList.add("no-transition");
carousel.scrollLeft = carousel.offsetWidth;
carousel.classList.remove("no-transition");

const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging");

    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
    if (!isDragging) return;

    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
}

const updateDots = () => {
    console.log("in the function");

    let currentIndex = Math.round(carousel.scrollLeft / firstCardWidth) % (sliderChildrens.length / 3);

    if (currentIndex === 0) {
        let changeTo = null;
        let x_card = Math.round(carousel.scrollLeft / firstCardWidth);

        if (x_card > 9) {
            console.log("index is " + x_card);
            x_card = x_card % 9;
        }

        changeTo = x_card / 3;
        console.log(changeTo);
        console.log("Current index is " + currentIndex);

        dots.forEach((dot, index) => {
            if (index === changeTo - 1) {
                dot.classList.add("red-dot");
                dot.classList.remove("black-dot");
            } else {
                dot.classList.add("black-dot");
                dot.classList.remove("red-dot");
            }
        });
    }
}

const infiniteScroll = () => {

    if (carousel.scrollLeft === 0) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
        carousel.classList.remove("no-transition");
    }

    else if (Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition");
    }

    updateDots();

    clearTimeout(timeoutId);
    if (!work.matches(":hover")) autoPlay();
}

const autoPlay = () => {
    if (window.innerWidth < 800 || !isAutoPlay) return;

    timeoutId = setTimeout(() => {
        carousel.scrollLeft += firstCardWidth;
        updateDots();
    }, 1500);
}

updateDots();

autoPlay();

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
work.addEventListener("mouseenter", () => clearTimeout(timeoutId));
work.addEventListener("mouseleave", autoPlay);


// ----------------------form-----------------------


document.addEventListener('DOMContentLoaded', function () {
    const formGroups = document.querySelectorAll('.form-group');

    formGroups.forEach(formGroup => {
        const input = formGroup.querySelector('input');

        input.addEventListener('blur', function () {
            const inputValue = this.value.trim();
            const label = formGroup.querySelector('label');

            console.log('Input value:', inputValue);
            console.log('Label:', label);

            if (inputValue !== '') {
                label.classList.add('filled');
            } else {
                label.classList.remove('filled');
            }
        });
    });


    const closeFormBtn = document.getElementById('closeFormBtn');
    const formContainer = document.getElementById('contactFormContainer');
    const header = document.getElementById('header');

    closeFormBtn.addEventListener('click', function () {
        formContainer.style.opacity = 0;
        formContainer.style.transform = 'translate(-50%, -50%) scale(0.8)';
        setTimeout(() => {
            formContainer.style.display = 'none';
        }, 800);

        header.style.opacity = 1;
        header.style.filter = 'none';
        document.body.classList.remove('no-scroll');
    });

    document.getElementById('showFormBtn').addEventListener('click', function () {
        formContainer.style.display = 'block';
        setTimeout(() => {
            formContainer.style.opacity = 1;
            formContainer.style.transform = 'translate(-50%, -50%) scale(1)';
        }, 0);

        header.style.opacity = 0.5;
        header.style.filter = 'blur(5px)';
        document.body.classList.add('no-scroll');
    });

    document.getElementById('contactForm').addEventListener('submit', function (event) {
        event.preventDefault();

        const form = event.target;
        const formData = new FormData(form);

        fetch("https://getform.io/f/bmdpdjea", {
            method: "POST",
            body: formData,
            headers: {
                "Accept": "application/json",
            },
        })
            .then(response => {
                if (response.ok) {
                    alert('Form submitted successfully!');
                    form.reset();

                    formContainer.style.opacity = 0;
                    formContainer.style.transform = 'translate(-50%, -50%) scale(0)';
                    setTimeout(() => {
                        formContainer.style.display = 'none';
                    }, 800);

                    header.style.opacity = 1;
                    header.style.filter = 'none';
                    document.body.classList.remove('no-scroll');
                } else {
                    alert('Form submission failed. Please try again!!');
                }
            })
            .catch(error => {
                console.error('Form submission error:', error);
                alert('An error occurred. Please try again.');
            });
    });
});



function changeImage(imagePath) {
    document.getElementById('mainImage').src = imagePath;
}

function selectElement(element) {

    var elements = document.querySelectorAll('.about-photos');
    elements.forEach(function (el) {
        el.classList.remove('selected');
    });

    element.classList.add('selected');
}

document.querySelectorAll('.about-photos').forEach(function (el) {
    el.addEventListener('click', function () {
        selectElement(el);
    });
});

const contentArray = [
    {
        imagePath: 'Assets/images/fruit1.jpg',
        title: 'Genderless Kei - Japan\'s Hot',
        description: 'Set to launch on the manufacturer\'s new A330neo aircraft in 2017, it\'s offering lots of'
    },
    {
        imagePath: 'Assets/images/fruit2.png',
        title: 'Better Strategy & Quality',
        description: 'Set to launch on the manufacturer\'s new A330neo aircraft in 2017, it\'s offering lots of'
    },
    {
        imagePath: 'Assets/images/fruit3.jpg',
        title: 'Genderless Kei - Japan\'s Hot',
        description: 'Set to launch on the manufacturer\'s new A330neo aircraft in 2017, it\'s offering lots of'
    }
];

let currentIndex = 0;

function changeImagewithContent() {
    const mainImage = document.getElementById('mainImage');
    const aboutPhotos = document.querySelectorAll('.about-photos');

    mainImage.src = contentArray[currentIndex].imagePath;

    aboutPhotos.forEach((el, index) => {
        if (index === currentIndex) {
            el.classList.add('selected');
        } else {
            el.classList.remove('selected');
        }
    });

    currentIndex = (currentIndex + 1) % contentArray.length;
}

setInterval(changeImagewithContent, 3000);

document.querySelectorAll('.about-photos').forEach((el, index) => {
    el.addEventListener('click', function () {
        currentIndex = index;
        changeImagewithContent();
    });
});

window.onload = function () {
    changeImagewithContent();
};