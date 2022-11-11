const now = new Date();

const current_year = now.getFullYear();

const current_day = now.getDay();

const the_hour = now.getHours();

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

const banner = document.querySelector(".banner");

if (current_day == 1 || current_day == 2){
    banner.classList.toggle("open")
};

const current_date = document.querySelector(".current-date");

const full_date = new Intl.DateTimeFormat("en-UK", {dateStyle: "full"}).format(now);

current_date.innerHTML = `<em>${full_date}</em>`;

const imgOptions = {
  threshold: 0,
  rootMargin: "0px 0px 50px 0px"
};

let imagesToLoad = document.querySelectorAll("img[data-src]");
const loadImages = (image) => {
image.setAttribute("src", image.getAttribute("data-src"));
image.onload = () => {
  image.removeAttribute("data-src");
};
};

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((items, observer) => {
    items.forEach((item) => {
      if (item.isIntersecting) {
        loadImages(item.target);
        observer.unobserve(item.target);
      }
    });
  });
  imagesToLoad.forEach((img) => {
    observer.observe(img);
  });
} else {
  imagesToLoad.forEach((img) => {
    loadImages(img);
  });
};

const visits_display = document.querySelector(".last-visit");

let current_visit = Date.now();

let last_visit = Number(window.localStorage.getItem("last-visit-ls"));

let last_visit_date = new Intl.DateTimeFormat("en-US", {dateStyle: "full"}).format(new Date(last_visit));

let time_since_last = Math.round((current_visit - last_visit) / (86400000));

if (last_visit !== 0) {
  visits_display.textContent = "The last time you visited this page was "+last_visit_date+", which was "+time_since_last+" days ago. Welcome back!";
} else {
  visits_display.textContent = "This is your first time visiting this page!"
};

localStorage.setItem("last-visit-ls", current_visit)