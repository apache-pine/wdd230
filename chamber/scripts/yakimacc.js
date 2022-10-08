const now = new Date();

const currentYear = now.getFullYear();

document.querySelector(".currentYear").textContent = currentYear;

let lastModif = new Date(document.lastModified);

document.querySelector("#lastModif").textContent = `Last Updated: ${lastModif.toLocaleString()}`;

let hamBtn = document.getElementById("hamBtn");

let primaryNav = document.getElementById("primaryNav");

function toggleMenu() {
    primaryNav.classList.toggle("open")
    hamBtn.classList.toggle("open")
};

hamBtn.onclick = toggleMenu;

const currentDate = document.querySelector(".currentDate");

const fullDate = new Intl.DateTimeFormat("en-UK", {dateStyle: "full"}).format(now);

currentDate.innerHTML = `<em>${fullDate}</em>`;