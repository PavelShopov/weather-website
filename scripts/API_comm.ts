function getCity(): string {
  let el = (document.getElementById("searchbar") as HTMLInputElement) || null;
  const city: string = el.value;
  console.log(city);
  return city;
}

export async function loadCities(): Promise<void> {
  let el = (document.getElementById("searchbar") as HTMLInputElement) || null;
  let citySuggestionDropdown =
    (document.getElementById("dropdown") as HTMLUListElement) || null;
  let response = await fetch("/scripts/city.list.json");

  if (!citySuggestionDropdown) {
    throw new Error("something went wrong: ");
  }
  if (!el) {
    throw new Error("something went wrong: ");
  }
  if (el.value.length <= 2) {
    return;
  }
  if (!response.ok) {
    throw new Error("something went wrong: ");
  }

  citySuggestionDropdown.innerHTML = "";
  const citySuggest: string = capitalizeFirstLetter(el.value);
  const citylist: City[] = await response.json();
  let flag: boolean = false;
  let currState = new Set<string>();

  //===============================================

  // citylist.forEach((city) => {
  //   if (
  //     city.name.startsWith(citySuggest) &&
  //     !currAutocomplete.has(city.name + ", " + city.country)
  //   ) {
  //
  //       }
  //     });

  for (const city of citylist) {
    const cityInName: string = city.name + ", " + city.country;
    if (city.name.startsWith(citySuggest) && !currState.has(cityInName)) {
      currState.add(cityInName);
      const li: HTMLElement = createListEl(city);
      citySuggestionDropdown.appendChild(li);
    }
  }
}

function createListEl(city: City): HTMLElement {
  let li = document.createElement("li");
  li.appendChild(document.createTextNode(city.name + ", " + city.country));
  li.addEventListener("click", () => {
    let el = (document.getElementById("searchbar") as HTMLInputElement) || null;
    el.textContent = city.name;
    loadWeather();
  });
  return li;
}

function capitalizeFirstLetter(citySuggest: string) {
  return (
    citySuggest.charAt(0).toUpperCase() + citySuggest.slice(1).toLowerCase()
  );
}

export async function loadWeather(): Promise<void> {
  const cityID: string = getCity();
  if (!cityID) {
    return;
  }
  let citySuggestionDropdown =
    (document.getElementById("dropdown") as HTMLUListElement) || null;
  if (!citySuggestionDropdown) {
    throw new Error("something went wrong: ");
  }
  citySuggestionDropdown.innerHTML = "";

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityID}&appid=e2c22b27d1547f05ad9017996b513c40`;
  let weather: WeatherData = await WeatherDataApi(url);
  const weatherDisplay = document.getElementById("weatherDisplay");
  if (weatherDisplay) {
    setTexttoEmpty();
    weatherDisplay.style.display = "block";
  }
  ~setText("cityName", `${weather.name}, ${weather.sys.country}`);
  setText("temperature", `${(weather.main.temp - 273.15).toFixed(1)}°C`);
  setText("humidity", `${weather.main.humidity}%`);
  setText("visibility", `${(weather.visibility / 1000).toFixed(1)} km`);
  setText("windSpeed", `${weather.wind.speed.toFixed(1)} km/h`);
}

const setText = (id: string, text: string) => {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
};

const setTexttoEmpty = () => {
  setText("cityName", "");
  setText("temperature", "");
  setText("humidity", "");
  setText("visibility", "");
  setText("windSpeed", "");
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
(window as any).loadCities = loadCities;
