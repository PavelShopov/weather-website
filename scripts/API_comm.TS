// const setText = (id: string, text: string) => {
//   const el = document.getElementById(id);
//   if (el) el.textContent = text;
// };

// async function loadWeather() {
//   try {
  //     const response = await fetch(url);
  //     if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
  
  //     const data: WeatherData = await response.json();
  
  //     setText("cityName", `${data.name}, ${data.sys.country}`);
  //     setText("temperature", `${(data.main.temp-273.15).toFixed(1)}°C`);
  //     setText("humidity", `${data.main.humidity}%`);
  //     setText("windSpeed", `${(data.wind.speed).toFixed(1)} km/h`);
  //     setText("visibility", `${(data.visibility / 1000).toFixed(1)} km`);
  
  //     const weatherDisplay = document.getElementById("weatherDisplay");
  //     if (weatherDisplay) weatherDisplay.style.display = "block";
  //   } catch (err) {
    //     console.error(err);
    //     setText("weatherDisplay", "Failed to load weather.");
    //   }
    // }
    
    // loadWeather();
    
  const API_key='e2c22b27d1547f05ad9017996b513c40';
  const city_ID= "Veles";
  const url =`https://api.openweathermap.org/data/2.5/weather?q=${city_ID}&appid=${API_key}`
  
  async function WeatherDataApi(url: string): Promise<WeatherData> {
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
  // let weather:WeatherData = WeatherDataApi(url);
  console.log(WeatherDataApi(url).catch)
