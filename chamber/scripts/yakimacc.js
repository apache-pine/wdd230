const now = new Date();

const current_year = now.getFullYear();

document.querySelector(".current-year").textContent = current_year;

let last_modif = new Date(document.lastModified);

document.querySelector("#last-modif").textContent = `Last Updated: ${last_modif.toLocaleString()}`;

let ham_btn = document.getElementById("ham-btn");

let primary_nav = document.getElementById("primary-nav");

function toggleMenu() {
    primaryNav.classList.toggle("open")
    hamBtn.classList.toggle("open")
};

hamBtn.onclick = toggleMenu;

const currentDate = document.querySelector(".currentDate");

const fullDate = new Intl.DateTimeFormat("en-UK", {dateStyle: "full"}).format(now);

currentDate.innerHTML = `<em>${fullDate}</em>`;