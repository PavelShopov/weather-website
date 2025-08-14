"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.search_cities = search_cities;
function search_cities() {
    const searchbar = document.getElementById('searchbar');
    let list = document.querySelector('#list-holder');
    const cityList = require("city.list.json");
    if (!cityList || !searchbar || !list) {
        return;
    }
    let search = searchbar.value;
    console.log("we opened the folder " + search);
    for (let i = 0; i < cityList.length; i++) {
        let obj = cityList[i];
        if (obj.name.toLowerCase().includes(search)) {
            const elem = document.createElement("li");
            elem.innerHTML = `${obj.name}`;
            list.appendChild(elem);
        }
    }
}
const setText = (id, text) => {
    const el = document.getElementById(id);
    if (el)
        el.textContent = text;
};
async function loadWeather(city_ID) {
    // const city_ID = "Veles";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city_ID}&appid=e2c22b27d1547f05ad9017996b513c40`;
    let weather = await WeatherDataApi(url);
    setText("cityName", `${weather.name}, ${weather.sys.country}`);
    setText("temperature", `${(weather.main.temp - 273.15).toFixed(1)}°C`);
    setText("humidity", `${weather.main.humidity}%`);
    setText("visibility", `${(weather.visibility / 1000).toFixed(1)} km`);
    setText("windSpeed", `${weather.wind.speed.toFixed(1)} km/h`);
    const weatherDisplay = document.getElementById("weatherDisplay");
    if (weatherDisplay)
        weatherDisplay.style.display = "block";
}
// loadWeather();
async function WeatherDataApi(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("something went wrong: " + response.statusText);
    }
    const weather = await response.json();
    return weather;
}
