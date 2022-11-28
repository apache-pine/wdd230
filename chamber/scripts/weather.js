const weatherIcon = document.querySelector("#weatherIcon");
const conditionId = document.querySelector("#condition");
const temp = document.querySelector("#temp");
const windChill = document.querySelector("#windChill");
const windSpeed = document.querySelector("#windSpeed");

const currentTime = now.toLocaleTimeString("en-US");

let results = null;

const url = "https://api.openweathermap.org/data/2.5/weather?q=yakima,wa,usa&appid=f2cfbb52b6e01d3767725b983a37e017&units=imperial";


async function getWeather(url) {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
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
    temp.textContent = `${Math.round(results.main.temp)}°F`;
    windSpeed.textContent = `${Math.round(results.wind.speed)} MPH`;
    windChill.textContent = calcWindChill(results.main.temp, results.wind.speed);
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