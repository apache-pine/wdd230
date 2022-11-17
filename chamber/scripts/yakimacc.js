const now = new Date();

const currentYear = now.getFullYear();

const currentDay = now.getDay();

const theHour = now.getHours();

document.querySelector(".currentYear").textContent = currentYear;

const lastModif = new Date(document.lastModified);

document.querySelector("#lastModif").textContent = `Last Updated: ${lastModif.toLocaleString()}`;

const hamBtn = document.getElementById("hamBtn");

const primaryNav = document.getElementById("primaryNav");

function toggleMenu() {
    primaryNav.classList.toggle("open")
    hamBtn.classList.toggle("open")
};

hamBtn.onclick = toggleMenu;

const banner = document.querySelector(".banner");

if (currentDay == 1 || currentDay == 2){
    banner.classList.toggle("open")
};

const currentDate = document.querySelector(".currentDate");

const fullDate = new Intl.DateTimeFormat("en-UK", {dateStyle: "full"}).format(now);

currentDate.innerHTML = `<em>${fullDate}</em>`;

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

function selectResponse() {
	const s = document.querySelector('#selected');
	const sel = document.querySelector('#select-mem');
	s.style.display = "block";
	s.textContent = sel.value;
};