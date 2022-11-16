const now = new Date();

const theHour = now.getHours();

const fullDate = new Intl.DateTimeFormat("en-US", {dateStyle: "full"}).format(now);

const currentTime = now.toLocaleTimeString("en-US");

const currentYear = now.getFullYear();

document.querySelector(".current-year").textContent = currentYear;

let results = null;

const url = "https://api.openweathermap.org/data/2.5/weather?q=Fairbanks&units=imperial&appid=f2cfbb52b6e01d3767725b983a37e017";


async function getWeather(url) {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            doStuff(data);
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

function doStuff(data) {
    results = data;
    let condition = results.weather[0].description;
    condition = condition.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
    let icon = results.weather[0].icon;
    let weatherIcon = getWeatherIcon(icon);
    let temp = results.main.temp.toFixed(0);
    let feelsLike = results.main.feels_like.toFixed(0);
    let windChill = calcWindChill(results.main.temp, results.wind.speed);
    let tempMax = results.main.temp_max.toFixed(0);
    let tempMin = results.main.temp_min.toFixed(0);
    let pressure = results.main.pressure;
    let humidity = results.main.humidity;
    let windSpeed = results.wind.speed;
    let windDirect = results.wind.deg;
    let sunrise = new Date(results.sys.sunrise * 1000
        ).toLocaleTimeString("en-US");
    let sunset = new Date(results.sys.sunset * 1000
        ).toLocaleTimeString("en-US");

    document.querySelector("#weatherIcon").src = weatherIcon;
    document.querySelector("#weatherIcon").alt = condition;
    document.querySelector("#condition").textContent = condition;
    document.querySelector("#temp").textContent = temp;
    document.querySelector("#feelsLike").textContent = feelsLike;
    document.querySelector("#windChill").textContent = windChill;
    document.querySelector("#tempMax").textContent = tempMax;
    document.querySelector("#tempMin").textContent = tempMin;
    document.querySelector("#pressure").textContent = pressure;
    document.querySelector("#humidity").textContent = humidity;
    document.querySelector("#windSpeed").textContent = windSpeed;
    document.querySelector("#windDirect").textContent = windDirect;
    document.querySelector("#currentTime").textContent = currentTime;
    document.querySelector("#sunrise").textContent = sunrise;
    document.querySelector("#sunset").textContent = sunset;
    
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

