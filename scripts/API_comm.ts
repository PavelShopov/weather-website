// export function search_cities() {
//   const searchbar = document.getElementById(
//     "searchbar"
//   ) as HTMLInputElement | null;
//   let list = document.querySelector("#list-holder");
//   const cityList: CityList = require("city.list.json");
//   if (!cityList || !searchbar || !list) {
//     return;
//   }
//   let search: string = searchbar.value;
//   console.log("we opened the folder " + search);
//   for (let i: number = 0; i < cityList.length; i++) {
//     let obj = cityList[i];
//     if (obj.name.toLowerCase().includes(search)) {
//       const elem = document.createElement("li");
//       elem.innerHTML = `${obj.name}`;
//       list.appendChild(elem);
//     }
//   }
// }
const setText = (id: string, text: string) => {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
};
async function cityChecker(city) :Promise<boolean> {
try {
  const cityList: CityList  = await require("city.list.json");
  if (!cityList) {
    throw Error;
  }
  for (let i = 0; i < cityList.length; i++) {
    let obj = cityList[i];
    if (obj.name.toLowerCase() == city.toLowerCase()) {
      return true;
    }
  }
  return false;
} catch {
  console.log("trouble finding city json");
  return false;
}
}
async function loadWeather(city_ID: string): Promise<void> {
  // const city_ID = "Veles";
  console.log("everything leading to loadweather works, city is " + city_ID);
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city_ID}&appid=e2c22b27d1547f05ad9017996b513c40`;
  let weather: WeatherData = await WeatherDataApi(url);
  const weatherDisplay = document.getElementById("weatherDisplay");
  if (weatherDisplay) weatherDisplay.style.display = "block";
  setText("cityName", `${weather.name}, ${weather.sys.country}`);
  setText("temperature", `${(weather.main.temp - 273.15).toFixed(1)}°C`);
  setText("humidity", `${weather.main.humidity}%`);
  setText("visibility", `${(weather.visibility / 1000).toFixed(1)} km`);
  setText("windSpeed", `${weather.wind.speed.toFixed(1)} km/h`);
}

async function WeatherDataApi(url: string): Promise<WeatherData> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("something went wrong: " + response.statusText);
  }
  const weather: WeatherData = await response.json();
  return weather;
}
interface WeatherData {
  coord: {
    lon: number;
    lat: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  };
  1;
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}
interface City {
  id: number;
  name: string;
  state: string;
  country: string;
  coord: {
    lon: number;
    lat: number;
  };
}
type CityList = City[];
