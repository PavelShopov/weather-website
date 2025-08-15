"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadWeather = loadWeather;
// function checkCity(cityID: string): boolean {
//   return true; //TODO
// }
function getCity() {
    let el = document.getElementById("searchbar") || null;
    const city = el.value;
    console.log(city);
    return city;
}
async function loadWeather() {
    console.log("enters func");
    const cityID = getCity();
    if (!cityID) {
        return;
    }
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityID}&appid=e2c22b27d1547f05ad9017996b513c40`;
    let weather = await WeatherDataApi(url);
    const weatherDisplay = document.getElementById("weatherDisplay");
    if (weatherDisplay)
        weatherDisplay.style.display = "block";
    setText("cityName", `${weather.name}, ${weather.sys.country}`);
    setText("temperature", `${(weather.main.temp - 273.15).toFixed(1)}°C`);
    setText("humidity", `${weather.main.humidity}%`);
    setText("visibility", `${(weather.visibility / 1000).toFixed(1)} km`);
    setText("windSpeed", `${weather.wind.speed.toFixed(1)} km/h`);
}
const setText = (id, text) => {
    const el = document.getElementById(id);
    if (el)
        el.textContent = text;
};
async function WeatherDataApi(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("something went wrong: " + response.statusText);
    }
    const weather = await response.json();
    return weather;
}
window.loadWeather = loadWeather;
