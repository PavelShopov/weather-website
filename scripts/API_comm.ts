// function checkCity(cityID: string): boolean {
//   return true; //TODO
// }
function getCity(): string {
  let el = (document.getElementById("searchbar") as HTMLInputElement) || null;
  const city: string = el.value;  
  console.log(city);
  return city;
}

export async function loadWeather(): Promise<void> {
  console.log("enters func");
  const cityID: string = getCity();
  if (!cityID ) {
    return;
  }
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityID}&appid=e2c22b27d1547f05ad9017996b513c40`;
  let weather: WeatherData = await WeatherDataApi(url);
  const weatherDisplay = document.getElementById("weatherDisplay");
  if (weatherDisplay) weatherDisplay.style.display = "block";

  setText("cityName", `${weather.name}, ${weather.sys.country}`);
  setText("temperature", `${(weather.main.temp - 273.15).toFixed(1)}°C`);
  setText("humidity", `${weather.main.humidity}%`);
  setText("visibility", `${(weather.visibility / 1000).toFixed(1)} km`);
  setText("windSpeed", `${weather.wind.speed.toFixed(1)} km/h`);
}

const setText = (id: string, text: string) => {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
};

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
  country: "string";
  coord: {
    lon: number;
    lat: number;
  };
}
(window as any).loadWeather = loadWeather;
