/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle= document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')


/*===== SHow Menu =======*/
/* Validate of constant exists */
if(navToggle){
    navToggle.addEventListener('click', ()=>{
        navMenu.classList.add('show-menu')
    })
}

/*===== Hide Menu =======*/
/* Validate of constant exists */
if(navClose){
    navClose.addEventListener('click', ()=>{
        navMenu.classList.remove('show-menu')
    })
}



/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link, #nav__button')


function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}

navLink.forEach(n =>n.addEventListener('click', linkAction))

/*=============== CHANGE BACKGROUND HEADER ===============*/
function scrollHeader(){
    const header = document.getElementById('header')
    // When the scroll is greater than 50 view port height, add the scroll-header class to teh header tag
    if(this.scrollY >=50) {
        header.classList.add('scroll-header');
    }else{
        header.classList.remove('scroll-header')
    }
    
}

window.addEventListener('scroll', scrollHeader)

/*=============== FORM POPUP ===============*/
const form = document.getElementById('waitlist__form'),
      button = document.querySelectorAll('#timer__button, #nav__button, #home__button'),
      closePopup = document.getElementById('close-popup')
button.forEach(b => b.addEventListener('click', ()=>{
    form.style.display = "flex";
}
));

closePopup.addEventListener('click', ()=>{
    form.style.display = "none";
}
);

/*=============== TIMER UPDATE ===============*/
const timer = document.getElementById('timer');
const timerDate = new Date('2025-06-27T23:59:59').getTime(); // Corrected date format

function updateTimer() {
    const now = new Date().getTime();
    const timeLeft = timerDate - now;

    if (timeLeft > 0) {
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);


        // Update the HTML element
        document.getElementById('days').textContent = days;
        document.getElementById('hours').textContent = hours;
        document.getElementById('minutes').textContent = minutes;
        document.getElementById('seconds').textContent = seconds;
    } else {
        // If the countdown is over, display "Time's up!" and stop the timer
        document.getElementById('timer').innerHTML = "<h2>Time's up!</h2>";
        clearInterval(timerInterval);
    }
}

const timerInterval = setInterval(updateTimer, 1000);
updateTimer(); // Initial call to display the timer immediately

/*=============== SHOW SCROLL UP ===============*/ 
const scrollUp = () =>{
    const scrollUp = document.getElementById('scroll-up')
    // whem the scroll is greater than 350 viewport height, them we add to the header tag
    this.scrollY >= 350 ? scrollUp.classList.add('show-scroll')
                         : scrollUp.classList.remove('show-scroll')
}

window.addEventListener('scroll',scrollUp)

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = ()=>{
    const scrollY = window.scrollY;

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 58;
        sectionId = current.getAttribute('id'),
        sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')

        if(scrollY > sectionTop &&  scrollY <= sectionTop + sectionHeight){
            sectionsClass.classList.add('active-link')
        }else{
            sectionsClass.classList.remove('active-link')
        }
    })
}

window.addEventListener('scroll', scrollActive)


/*=============== Animations ===============*/

// Select bitmoji containers and images
const leftBitmojis = document.querySelectorAll('.home__bitmoji-left img');
const rightBitmojis = document.querySelectorAll('.home__bitmoji-right img');

// Function to generate a random position within a container
function getRandomPosition(container) {
  const containerWidth = container.offsetWidth;
  const containerHeight = container.offsetHeight;

  const randomX = Math.random() * (containerWidth - 50); // Subtract bitmoji width
  const randomY = Math.random() * (containerHeight - 50); // Subtract bitmoji height

  return { x: randomX, y: randomY };
}

// Function to move bitmojis randomly within their container
function moveBitmojis(bitmojis, container) {
  bitmojis.forEach((bitmoji) => {
    const { x, y } = getRandomPosition(container);
    bitmoji.style.left = `${x}px`;
    bitmoji.style.top = `${y}px`;
  });
}

// Move bitmojis every 2 seconds
function animateBitmojis() {
  const leftContainer = document.querySelector('.home__bitmoji-left');
  const rightContainer = document.querySelector('.home__bitmoji-right');

  moveBitmojis(leftBitmojis, leftContainer);
  moveBitmojis(rightBitmojis, rightContainer);
}

setInterval(animateBitmojis, 2000);


/*=============== EMAIL JS ===============*/
const contactForm = document.getElementById('myform'),
      closeForm = document.getElementById('waitlist__form'),
      contactMessage= document.getElementById('contact-message')

const sendMail = (e) =>{
    e.preventDefault()

        // Show the loading spinner
        const loadingSpinner = document.getElementById('loading-spinner');
        loadingSpinner.classList.add('active');
    

        //ServiceID - templateID - #form - publicKey
    emailjs.sendForm('service_hf05elj', 'template_5a5zqkw', '#myform', 'wEI9A4RRU34gRgARh')
    .then(() =>{

        // Hide the loading spinner
        loadingSpinner.classList.remove('active');

        //show Message
        // contactMessage.textContent = 'Thank you for joining InterChat 😄'

        //remove message after five seconds
        // setTimeout(()=>{
        //   contactMessage.textContent =''
        // }, 2000)

        //Clear input field
        contactForm.reset();

        //Close form
        setTimeout(()=>{
            window.location.href = 'thank_you.html';
        }, 2000)

        
    })  
    .catch(() =>{
        // Hide the loading spinner
        loadingSpinner.classList.remove('active');

        // Show error message
        contactMessage.textContent = 'Message not sent (service error) 😞';

        setTimeout(()=>{
            contactMessage.textContent =''
        }, 2000)
    });

};

contactForm.addEventListener('submit', sendMail)


/*=============== Function to animate the count ===============*/

const animateCount = (element, start, end, duration) => {
    let startTime = null;

    const step = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const currentValue = Math.floor(progress * (end - start) + start);
        element.textContent = currentValue.toLocaleString(); // Format number with commas
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };

    window.requestAnimationFrame(step);
};

// Function to reveal the banner and start the count
const revealBanner = () => {
    const bannerTitle = document.querySelector('.banner__title');
    const countNumber = document.getElementById('count-number');

    const bannerPosition = bannerTitle.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.2;

    if (bannerPosition < screenPosition) {
        bannerTitle.classList.add('reveal');
        animateCount(countNumber, 0, 10000, 4000); // Count from 0 to 10,000 in 8 seconds
        window.removeEventListener('scroll', revealBanner); // Remove event listener after animation
    }
};

// Add scroll event listener
window.addEventListener('scroll', revealBanner);