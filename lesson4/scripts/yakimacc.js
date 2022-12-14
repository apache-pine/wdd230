const now = new Date();

const current_year = now.getFullYear();

document.querySelector(".current-year").textContent = current_year;

const last_modif = new Date(document.lastModified);

document.querySelector("#last-modif").textContent = `Last Updated: ${last_modif.toLocaleString()}`;

const ham_btn = document.getElementById("ham-btn");

const primary_nav = document.getElementById("primary-nav");

function toggleMenu() {
    primary_nav.classList.toggle("open")
    ham_btn.classList.toggle("open")
};

ham_btn.onclick = toggleMenu;

const current_date = document.querySelector(".current-date");

const full_date = new Intl.DateTimeFormat("en-UK", {dateStyle: "full"}).format(now);

current_date.innerHTML = `<em>${full_date}</em>`;

const current_day = now.getDay();

