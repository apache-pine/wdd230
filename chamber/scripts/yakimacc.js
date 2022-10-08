const current_year = new Date().getFullYear();

document.querySelector(".current-year").textContent = current_year;

let last_modif = new Date(document.lastModified);

document.querySelector("#last-modif").textContent = `Last Updated: ${last_modif.toLocaleString()}`;

let hamBtn = document.getElementById("hamBtn");

let primaryNav = document.getElementById("primaryNav");

function toggleMenu() {
    primaryNav.classList.toggle("open")
    hamBtn.classList.toggle("open")
};

hamBtn.onclick = toggleMenu;