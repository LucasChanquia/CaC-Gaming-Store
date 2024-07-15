"use strict";

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
};

const navbar = document.querySelector("[data-navbar]");
const navToggler = document.querySelector("[data-nav-toggler]");
const navLinks = document.querySelectorAll("[data-nav-link]");

const toggleNav = function () {
  navbar.classList.toggle("active");
  this.classList.toggle("active");
};

navToggler.addEventListener("click", toggleNav);

const navClose = () => {
  navbar.classList.remove("active");
  navToggler.classList.remove("active");
};

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
};

window.addEventListener("scroll", activeEl);

const buttons = document.querySelectorAll("[data-btn]");

const buttonHoverRipple = function (event) {
  this.style.setProperty("--top", `${event.offsetY}px`);
  this.style.setProperty("--left", `${event.offsetX}px`);
};

addEventOnElements(buttons, "mousemove", buttonHoverRipple);

const revealElements = document.querySelectorAll("[data-reveal]");

const revealElementOnScroll = function () {
  for (let i = 0, len = revealElements.length; i < len; i++) {
    const isElementInsideWindow =
      revealElements[i].getBoundingClientRect().top < window.innerHeight / 1.1;

    if (isElementInsideWindow) {
      revealElements[i].classList.add("revealed");
    }
  }
};

window.addEventListener("scroll", revealElementOnScroll);

window.addEventListener("load", revealElementOnScroll);

/* MOUSE PERSONALIZADO*/

const cursor = document.querySelector("[data-cursor]");
const hoverElements = [
  ...document.querySelectorAll("a"),
  ...document.querySelectorAll("button"),
];

const cursorMove = function (event) {
  cursor.style.top = `${event.clientY}px`;
  cursor.style.left = `${event.clientX}px`;
};

window.addEventListener("mousemove", cursorMove);

addEventOnElements(hoverElements, "mouseover", function () {
  cursor.classList.add("hovered");
});

addEventOnElements(hoverElements, "mouseout", function () {
  cursor.classList.remove("hovered");
});

const logOutButton = document.getElementById("signOut");

logOutButton.addEventListener("click", function () {
  window.location.href = "../../../index.html";
});

document.getElementById("createGame").addEventListener("click", function () {
  window.location.href = `../../createGame.html`;
});

document.addEventListener("DOMContentLoaded", async function () {
  const URL = "http://localhost:8080/api/games";
  const options = {
    method: "GET",
    headers: {
      Accept: "Application/json",
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await fetch(URL, options);
    const result = await response.json();
    const gamesContainer = document.getElementById("games-container");

    result.forEach((game) => {
      const box = document.createElement("div");
      box.className = "box";

      const img = document.createElement("img");
      img.src = game.image;
      img.alt = game.title;

      const overlay = document.createElement("button");
      overlay.className = "box-overlay";
      overlay.id = "overlay";
      overlay.dataset.gameId = game.id;

      const title = document.createElement("h2");
      title.textContent = game.title;

      overlay.appendChild(title);
      box.appendChild(img);
      box.appendChild(overlay);
      gamesContainer.appendChild(box);

      overlay.addEventListener("click", function () {
        localStorage.setItem("selectedGame", JSON.stringify(game));
        window.location.href = `../pages/gameDetails.html`;
      });
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});
