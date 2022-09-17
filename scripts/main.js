const current_year = new Date().getFullYear();

document.querySelector(".current_year").textContent = current_year;

let last_modif = new Date(document.lastModified);

document.querySelector("#last_modif").textContent = `Last Updated: ${last_modif.toLocaleString()}`;