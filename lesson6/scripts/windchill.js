function calcWindChill(t, s) {
    if (t <= 50 && s > 3){
        const wind_chill = Math.round(
            35.74 + 0.6215 * t - 35.75 * s **0.16 + 0.4275 * t * s ** 0.16);
        return wind_chill;
    } else {
        return "N/A";
    };
};

let t = document.querySelector(".temp").textContent;

let s = document.querySelector(".wind-speed").textContent;

document.querySelector(".wind-chill").textContent = 
    "Wind Chill: "+calcWindChill(t, s)+"°F";

document.querySelector(".temp").textContent = t+"°F";

document.querySelector(".wind-speed").textContent = "Wind Speed: "+s+" MPH";