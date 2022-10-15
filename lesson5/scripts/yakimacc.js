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

const weather_link = "https://api.openweathermap.org/data/2.5/weather?q=yakima,wa,usa&appid=f2cfbb52b6e01d3767725b983a37e017&units=imperial"

function getWeather(weather){
	if(weather == "Haze"){
        if(the_hour<18 && the_hour>6)
            return "images/weather-icons/animated/cloudy-day-1.svg"
        else
            return "images/weather-icons/animated/cloudy-night-1.svg"
    }
    else if(weather == "Overcast Clouds"){
        return "images/weather-icons/animated/cloudy.svg"
    }
    else if(weather == "Rain"){
        return "images/weather-icons/animated/rainy-6.svg"
    }
    else if(weather == "Mist"){
        return "images/weather-icons/animated/snowy-4.svg"
    }
    else if(weather == "Clear Sky"){
        if(the_hour<18 && the_hour>6)
            return "images/weather-icons/animated/day.svg"
        else
            return "images/weather-icons/animated/night.svg"
    }
    else if(weather == "Smoke"){
        return "images/weather-icons/animated/snowy-6.svg"
    }
    else if(weather == "Drizzle"){
        return "images/weather-icons/animated/rainy-7.svg"
    }
    else if(weather == "Thunderstorm"){
        return "images/weather-icons/animated/thunder.svg"
    }
    else{
        return "images/weather-icons/animated/weather.svg"
    }
}

const weather_request = new XMLHttpRequest();
weather_request.open("GET",weather_link,true);
weather_request.onload = function() {
    let obj = JSON.parse(this.response);
    let temp = obj.main.temp+"°F";
    let condition = obj.weather[0].description;
    condition = condition.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
    let wind = "Wind Speed: "+obj.wind.speed+" MPH";

    console.log(temp+", "+condition+", "+wind)

    document.querySelector(".weather-icon").src = getWeather(condition);
    document.querySelector(".temp").textContent = temp;
    document.querySelector(".condition").textContent = condition;
    document.querySelector(".wind").textContent = wind;
}
weather_request.send();

const viewport = window.matchMedia("(min-width: 60em)");

function change_src(viewport) {
    if (viewport.matches) {
        document.querySelector(".hero-div-img").src = "images/yakima-valley.jpg"
    } else {
        document.querySelector(".hero-div-img").src = "images/yakima-valley-thin.jpg"
    }
};

change_src(viewport);
viewport.addEventListener("change", change_src);