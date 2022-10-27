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

function doStuff(data) {
    results = data;
    let condition = results.weather[0].description;
    condition = condition.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
    let icon = results.weather[0].icon;
    let weatherIcon = getWeatherIcon(icon);
    let temp = results.main.temp+"°F";
    let windSpeed = "Wind Speed: "+results.wind.speed+" MPH";

    document.querySelector(".weather-icon").src = weatherIcon;
    document.querySelector(".condition").textContent = condition;
    // document.querySelector(".temp").textContent = temp;
    // document.querySelector(".wind-speed").textContent = windSpeed;
  };

getWeather(weather_link);