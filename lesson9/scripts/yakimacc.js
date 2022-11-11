const now = new Date();

const currentYear = now.getFullYear();

const currentDay = now.getDay();

const theHour = now.getHours();

document.querySelector(".current-year").textContent = currentYear;

const lastModif = new Date(document.lastModified);

document.querySelector("#last-modif").textContent = `Last Updated: ${lastModif.toLocaleString()}`;

const hamBtn = document.getElementById("ham-btn");

const primaryNav = document.getElementById("primary-nav");

function toggleMenu() {
    primaryNav.classList.toggle("open")
    hamBtn.classList.toggle("open")
};

hamBtn.onclick = toggleMenu;

const banner = document.querySelector(".banner");

if (currentDay == 1 || currentDay == 2){
    banner.classList.toggle("open")
};

const currentDate = document.querySelector(".current-date");

const fullDate = new Intl.DateTimeFormat("en-UK", {dateStyle: "full"}).format(now);

currentDate.innerHTML = `<em>${fullDate}</em>`;

document.querySelector("#sub-date").value = fullDate;

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

const visitsDisplay = document.querySelector(".last-visit");

let currentVisit = Date.now();

let lastVisit = Number(window.localStorage.getItem("last-visit-ls"));

let lastVisitDate = new Intl.DateTimeFormat("en-US", {dateStyle: "full"}).format(new Date(lastVisit));

let timeSinceLast = Math.round((currentVisit - lastVisit) / (86400000));

if (lastVisit !== 0) {
  visitsDisplay.textContent = "The last time you visited this page was "+lastVisitDate+", which was "+timeSinceLast+" days ago. Welcome back!";
} else {
  visitsDisplay.textContent = "This is your first time visiting this page!"
};

localStorage.setItem("last-visit-ls", currentVisit)

function selectResponse() {
	const s = document.querySelector('#selected');
	const sel = document.querySelector('#select-mem');
	s.style.display = "block";
	s.textContent = sel.value;
};