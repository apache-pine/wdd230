const now = new Date();

const theHour = now.getHours();

const fullDate = new Intl.DateTimeFormat("en-US", {dateStyle: "full"}).format(now);

const currentTime = now.toLocaleTimeString("en-US");

const currentYear = now.getFullYear();

document.querySelector(".current-year").textContent = currentYear;

const weatherIcon = document.querySelector("#weatherIcon");
const conditionId = document.querySelector("#condition");
const temp = document.querySelector("#temp");
const feelsLike = document.querySelector("#feelsLike");
const windChill = document.querySelector("#windChill");
const tempMax = document.querySelector("#tempMax");
const tempMin = document.querySelector("#tempMin");
const pressure = document.querySelector("#pressure");
const humidity = document.querySelector("#humidity");
const windSpeed = document.querySelector("#windSpeed");
const windDirect = document.querySelector("#windDirect");
const currentTimeId = document.querySelector("#currentTime");
const sunrise = document.querySelector("#sunrise");
const sunset = document.querySelector("#sunset");

let results = null;

const url = "https://api.openweathermap.org/data/2.5/weather?q=Fairbanks&units=imperial&appid=f2cfbb52b6e01d3767725b983a37e017";


async function getWeather(url) {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            displayResults(data);
        } else {
            console.log(`Response not OK ${await response.text()}`);
        }
    } catch (error) {
        console.log(`Error: ${error.message}`);
    }
};

function getWeatherIcon(icon){
	let icon_url = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    return icon_url;
};

function displayResults(data) {
    results = data;
    let condition = results.weather[0].description;
    condition = condition.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
    let icon = results.weather[0].icon;
    weatherIcon.src = getWeatherIcon(icon);
    weatherIcon.alt = condition;
    conditionId.textContent = condition;
    temp.textContent = Math.round(results.main.temp);
    feelsLike.textContent = Math.round(results.main.feels_like);
    windChill.textContent = calcWindChill(results.main.temp, results.wind.speed);
    tempMax.textContent = Math.round(results.main.temp_max);
    tempMin.textContent = Math.round(results.main.temp_min);
    pressure.textContent = results.main.pressure;
    humidity.textContent = results.main.humidity;
    windSpeed.textContent = results.wind.speed;
    windDirect.textContent = results.wind.deg;
    currentTimeId.textContent = currentTime;
    sunrise.textContent = new Date(results.sys.sunrise * 1000).toLocaleTimeString("en-US");
    sunset.textContent = new Date(results.sys.sunset * 1000).toLocaleTimeString("en-US");    
  };

function calcWindChill(t, s) {
  if (t <= 50 && s > 3){
      const wind_chill = Math.round(
          35.74 + 0.6215 * t - 35.75 * s **0.16 + 0.4275 * t * s ** 0.16);
      return `${wind_chill}°F`;
  } else {
      return "N/A";
  };
};

getWeather(url);

