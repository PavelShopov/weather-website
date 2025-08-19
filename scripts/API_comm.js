var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// function checkCity(cityID: string): boolean {
//   return true; //TODO
// }
function getCity() {
    let el = document.getElementById("searchbar") || null;
    const city = el.value;
    console.log(city);
    return city;
}
export function loadCities() {
    return __awaiter(this, void 0, void 0, function* () {
        let el = document.getElementById("searchbar") || null;
        let citySuggestionDropdown = document.getElementById("dropdown") || null;
        let response = yield fetch("/scripts/city.list.json");
        if (!citySuggestionDropdown) {
            throw new Error("something went wrong: ");
        }
        citySuggestionDropdown.innerHTML = "";
        if (!el) {
            throw new Error("something went wrong: ");
        }
        if (el.value.length <= 2) {
            return;
        }
        if (!response.ok) {
            throw new Error("something went wrong: ");
        }
        let hashmap = new Map();
        const citySuggest = capitalizeFirstLetter(el.value);
        const citylist = yield response.json();
        // const checker 
        citylist.forEach((city) => {
            if (city.name.startsWith(citySuggest)) {
                // if(checker!){
                // citySuggestionDropdown.style.display = "block";
                // }
                let li = document.createElement("li");
                li.appendChild(document.createTextNode(city.name));
                citySuggestionDropdown.appendChild(li);
            }
        });
    });
}
function capitalizeFirstLetter(citySuggest) {
    return (citySuggest.charAt(0).toUpperCase() + citySuggest.slice(1).toLowerCase());
}
export function loadWeather() {
    return __awaiter(this, void 0, void 0, function* () {
        const cityID = getCity();
        if (!cityID) {
            return;
        }
        let citySuggestionDropdown = document.getElementById("dropdown") || null;
        if (!citySuggestionDropdown) {
            throw new Error("something went wrong: ");
        }
        citySuggestionDropdown.innerHTML = "";
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityID}&appid=e2c22b27d1547f05ad9017996b513c40`;
        let weather = yield WeatherDataApi(url);
        const weatherDisplay = document.getElementById("weatherDisplay");
        if (weatherDisplay) {
            setTexttoEmpty();
            weatherDisplay.style.display = "block";
        }
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
const setTexttoEmpty = () => {
    setText("cityName", '');
    setText("temperature", '');
    setText("humidity", '');
    setText("visibility", '');
    setText("windSpeed", '');
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
window.loadCities = loadCities;
//# sourceMappingURL=API_comm.js.map