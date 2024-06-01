'use strict';

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
}


document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('.search-form');
  const input = form.querySelector('input[name="q"]'); 

  form.addEventListener('submit', function(event) {
    event.preventDefault();
    const searchTerm = input.value.trim(); 
    if (searchTerm !== '') {
      const found = window.find(searchTerm);
      if (!found) {
        alert(`No se encontraron coincidencias para "${searchTerm}".`);
      }
    } else {
      alert('Por favor ingrese un término de búsqueda.');
    }
  });
});


const navbar = document.querySelector("[data-navbar]");
const navToggler = document.querySelector("[data-nav-toggler]");
const navLinks = document.querySelectorAll("[data-nav-link]");

const toggleNav = function () {
  navbar.classList.toggle("active");
  this.classList.toggle("active");
}

navToggler.addEventListener("click", toggleNav);

const navClose = () => {
  navbar.classList.remove("active");
  navToggler.classList.remove("active");
}

addEventOnElements(navLinks, "click", navClose);

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

const activeEl = function () {
  if (window.scrollY > 100) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
}

window.addEventListener("scroll", activeEl);


const buttons = document.querySelectorAll("[data-btn]");

const buttonHoverRipple = function (event) {
  this.style.setProperty("--top", `${event.offsetY}px`);
  this.style.setProperty("--left", `${event.offsetX}px`);
}

addEventOnElements(buttons, "mousemove", buttonHoverRipple);

const revealElements = document.querySelectorAll("[data-reveal]");

const revealElementOnScroll = function () {
  for (let i = 0, len = revealElements.length; i < len; i++) {
    const isElementInsideWindow = revealElements[i].getBoundingClientRect().top < window.innerHeight / 1.1;

    if (isElementInsideWindow) {
      revealElements[i].classList.add("revealed");
    }
  }
}

window.addEventListener("scroll", revealElementOnScroll);

window.addEventListener("load", revealElementOnScroll);


/* MOUSE PERSONALIZADO*/

const cursor = document.querySelector("[data-cursor]");
const hoverElements = [...document.querySelectorAll("a"), ...document.querySelectorAll("button")];

const cursorMove = function (event) {
  cursor.style.top = `${event.clientY}px`;
  cursor.style.left = `${event.clientX}px`;
}

window.addEventListener("mousemove", cursorMove);

addEventOnElements(hoverElements, "mouseover", function () {
  cursor.classList.add("hovered");
});

addEventOnElements(hoverElements, "mouseout", function () {
  cursor.classList.remove("hovered");
});

const logOutButton = document.getElementById('signOut');

logOutButton.addEventListener('click', function() {

  console.log('me estoy ejecutando')
    window.location.href = '../../../CaC-Gaming-Store/index.html';
  
});
 const API= 'https://www.giantbomb.com/api/games/?api_key='
 const APICLIENT = 'df90b64922c95c7c77ce166039d8b3849d832ea0'
 const apiButton = document.getElementById('apiButton')

 document.getElementById('apiButton').addEventListener('click', async function(){
    try {
      await fetch(`${API}${APICLIENT}&limit=20&format=json`)
      .then((res) =>res.json())
      .then(data =>{
        console.log(data);
      })
    } catch (error) {
      console.error(error)
    }
 });

