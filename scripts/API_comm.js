"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadWeather = loadWeather;
// function checkCity(cityID: string): boolean {
//   return true; //TODO
// }
function getCity() {
    var el = document.getElementById("searchbar") || null;
    var city = el.value;
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
    return __awaiter(this, void 0, void 0, function () {
        var response, weather;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch(url)];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error("something went wrong: " + response.statusText);
                    }
                    return [4 /*yield*/, response.json()];
                case 2:
                    weather = _a.sent();
                    return [2 /*return*/, weather];
            }
        });
    });
}
window.loadWeather = loadWeather;
window.loadCities = loadCities;
//# sourceMappingURL=API_comm.js.map