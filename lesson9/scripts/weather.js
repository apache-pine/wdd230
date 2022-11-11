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