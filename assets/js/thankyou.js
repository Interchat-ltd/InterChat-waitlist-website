
/*=============== TTIMER UPDATE ===============*/

const ttimer = document.getElementById('ttimer');
// Countdown Timer
const targetDate = new Date('2025-06-27T23:59:59').getTime(); // Set your target date here

function updateCountdown() {
    const now = new Date().getTime();
    const timeLeft = targetDate - now;

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    document.getElementById("days").textContent = days;
    document.getElementById("hours").textContent = hours;
    document.getElementById("minutes").textContent = minutes;
    document.getElementById("seconds").textContent = seconds;

    if (timeLeft < 0) {
        clearInterval(timerInterval);
        document.getElementById("ttimer").innerHTML = "🎉 The wait is over!";
    }
}

// Background Color Changer
const colors = ["#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#A133FF", "#33FFF5"];
let colorIndex = 0;

function changeBackgroundColor() {
    ttimer.style.backgroundColor = colors[colorIndex];
    colorIndex = (colorIndex + 1) % colors.length;
}

// Start the timer and background color changer
const timerInterval = setInterval(updateCountdown, 1000);
const colorInterval = setInterval(changeBackgroundColor, 1000); // Change color every 2 seconds


/*=============== CAROUSEL FUNCTIONALITY ===============*/
const tcardSwiper = new Swiper('.hero-swiper', {
    loop: true, // Enable looping
    slidesPerView: 1, // Show 1 slide at a time
    spaceBetween: 20, // Space between slides

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    
    autoplay: {
        delay: 4000, // Auto-slide every 5 seconds
        disableOnInteraction: false, // Continue autoplay after user interaction
    },
});


/*=============== TESTIMONIAL SWIPER ===============*/
let testiomonialSwiper = new Swiper(".testimonial-swiper", {
    spaceBetween: 30,
    loop: 'true',

  
    // Navigation arrows
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  
});
  