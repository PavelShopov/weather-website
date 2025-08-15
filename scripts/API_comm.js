var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export function loadWeather(city_ID) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("everything leading to loadweather works, city is " + city_ID);
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city_ID}&appid=e2c22b27d1547f05ad9017996b513c40`;
        let weather = yield WeatherDataApi(url);
        const weatherDisplay = document.getElementById("weatherDisplay");
        if (weatherDisplay)
            weatherDisplay.style.display = "block";
        setText("cityName", `${weather.name}, ${weather.sys.country}`);
        setText("temperature", `${(weather.main.temp - 273.15).toFixed(1)}°C`);
        setText("humidity", `${weather.main.humidity}%`);
        setText("visibility", `${(weather.visibility / 1000).toFixed(1)} km`);
        setText("windSpeed", `${weather.wind.speed.toFixed(1)} km/h`);
    });
}
const setText = (id, text) => {
    const el = document.getElementById(id);
    if (el)
        el.textContent = text;
};
function WeatherDataApi(url) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(url);
        if (!response.ok) {
            throw new Error("something went wrong: " + response.statusText);
        }
        const weather = yield response.json();
        return weather;
    });
}
window.loadWeather = loadWeather;
//# sourceMappingURL=API_comm.js.map