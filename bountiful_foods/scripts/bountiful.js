const now = new Date();

const currentYear = now.getFullYear();

const currentDay = now.getDay();

const theHour = now.getHours();

const fullDate = new Intl.DateTimeFormat("en-UK", {dateStyle: "full"}).format(now);

document.querySelector(".currentYear").textContent = currentYear;

const lastModif = new Date(document.lastModified);

document.querySelector(".lastModif").textContent = `Last Updated: ${lastModif.toLocaleString()}`;

const hamBtn = document.querySelector("#hamBtn");

const primaryNav = document.querySelector("#primaryNav");

function toggleMenu() {
    primaryNav.classList.toggle("open")
    hamBtn.classList.toggle("open")
};

hamBtn.onclick = toggleMenu;