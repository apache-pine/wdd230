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

document.querySelector("#sub-date").value = full_date;

const weather_link = "https://api.openweathermap.org/data/2.5/weather?q=yakima,wa,usa&appid=f2cfbb52b6e01d3767725b983a37e017&units=imperial";

let results = null;
async function getWeather(weather_link) {
  const response = await fetch(weather_link);
  if (response.ok) {
    const data = await response.json();
    doStuff(data);
  }
}
function getWeatherIcon(icon){
	let icon_url = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    return icon_url;
};

function calcWindChill(t, s) {
  if (t <= 50 && s > 3){
      const wind_chill = Math.round(
          35.74 + 0.6215 * t - 35.75 * s **0.16 + 0.4275 * t * s ** 0.16);
      return wind_chill;
  } else {
      return "N/A";
  };
};

function doStuff(data) {
    results = data;
    let condition = results.weather[0].description;
    condition = condition.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
    let icon = results.weather[0].icon;
    let weatherIcon = getWeatherIcon(icon);
    let temp = results.main.temp;
    let windSpeed = results.wind.speed;

    document.querySelector(".weather-icon").src = weatherIcon;
    document.querySelector(".condition").textContent = condition;
    document.querySelector(".temp").textContent = temp+"°F";
    document.querySelector(".wind-speed").textContent = "Wind Speed: "+windSpeed+" MPH";
    document.querySelector(".wind-chill").textContent = 
    "Wind Chill: "+calcWindChill(temp, windSpeed)+"°F";
  };

getWeather(weather_link);


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

function selectResponse() {
	const s = document.querySelector('#selected');
	const sel = document.querySelector('#select-mem');
	s.style.display = "block";
	s.textContent = sel.value;
};