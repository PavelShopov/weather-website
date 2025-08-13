const API_key='e2c22b27d1547f05ad9017996b513c40';
const city_ID= "Veles";

async function fetchJson(url: string): Promise<WeatherData> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('something went wrong: ' + response.statusText);
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
  };1
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
};

/*Uncaught SyntaxError SyntaxError: Unexpected token ':'
    at wrapSafe (<node_internals>/internal/modules/cjs/loader:1669:18)
    at <anonymous> (<node_internals>/internal/modules/cjs/loader:1712:20)
    at <anonymous> (<node_internals>/internal/modules/cjs/loader:1871:10)
    at <anonymous> (<node_internals>/internal/modules/cjs/loader:1470:32)
    at <anonymous> (<node_internals>/internal/modules/cjs/loader:1290:12)
    at traceSync (<node_internals>/diagnostics_channel:322:14)
    at wrapModuleLoad (<node_internals>/internal/modules/cjs/loader:238:24)
    at executeUserEntryPoint (<node_internals>/internal/modules/run_main:154:5)
    at <anonymous> (<node_internals>/internal/main/run_main_module:33:47)
*/