import axios from 'axios';
import store from 'store';
import { kebabCase } from 'change-case';
import { weatherConditions, weatherEmoji } from './weather';
const expirePlugin = require('store/plugins/expire');

import { dd } from './dddd';

const whaev = dd['¯\\_(ツ)_/¯'];

store.addPlugin(expirePlugin);

const ipUrl = 'https://ipinfo.io/json?token=84f480e53183e9';

// we don't bother with location service request because this is decorative
async function fetchLocation() {
  const res = await axios(ipUrl);
  return await res.data;
}

export async function getLocation() {
  const storedLoc = store.get('locData');
  if (storedLoc) {
    console.log('location from cache', storedLoc);
    return storedLoc;
  } else {
    const newLoc = await fetchLocation();
    const inSixtyMinutes = new Date().getTime() + 60 * 1000 * 60;
    store.set('locData', newLoc, inSixtyMinutes);
    console.log('caching location', newLoc);
    return newLoc;
  }
}

export async function getCurrentWeatherConditions(locData) {
  const storedWeather = store.get('openWeatherData');
  if (storedWeather) {
    console.log('weather from cache', storedWeather);
    return summarizeOpenWeather(storedWeather);
  } else {
    const weather = await fetchWeather(locData);
    const inTwoMinutes = new Date().getTime() + 2 * 1000 * 60;
    console.log('caching weather', weather);
    store.set('openWeatherData', weather, inTwoMinutes);
    return summarizeOpenWeather(weather);
  }
}

function summarizeOpenWeather(w) {
  const internal = getWeatherCondition(w.weather[0].description);
  console.log(internal);
  const summary = {
    sunrise: new Date(w.sys.sunrise * 1000),
    sunset: new Date(w.sys.sunset * 1000),
    timeOfDay: diurnalize(w.sys),
    visibility: w.visibility,
    wind: {
      ...describeWind(w.wind.speed),
      direction: cardinalize(w.wind.deg),
      degrees: w.wind.deg
    },
    humidity: w.main.humidity,
    temp: w.main.temp - 273.15,
    cloudCover: w.clouds.all,
    condition: w.weather[0].main,
    description: w.weather[0].description,
    // conditionName: getConditionName(w.weather[0].main),
    internal
  };
  w.summary = summary;
  return w;
}

async function fetchWeather(locData) {
  const weatherUrl = getOpenWeatherUrl(locData);
  // weatherUrl = .netlifycurrent-weather?city=locData
  const weather = await axios(weatherUrl);
  return await weather.data;
}

function getOpenWeatherUrl(locData) {
  // 'https://openweathermap.org/weather-conditions';
  return `//api.openweathermap.org/data/2.5/weather?q=${locData.city},${
    locData.country
  }&APPID=${whaev}`;
  // const locationKey =
  // accuWeatherLoc: `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?q=${locData.city},${locData.country}&apikey=${accuWeatherApiKey}`
  // accuWeather: `http://dataservice.accuweather.com/currentconditions/v1/${locationKey}`
}

function cardinalize(deg) {
  // prettier-ignore
  const directions = [
    'N', 'NNE', 'NE', 'ENE', 
    'E', 'ESE', 'SE', 'SSE', 
    'S', 'SSW', 'SW', 'WSW', 
    'W', 'WNW', 'NW', 'NNW'
  ];
  let val = parseInt(deg / 22.5 + 0.5);
  return directions[val % 16];
}

function describeWind(mps) {
  if (mps < 2.5) {
    return {
      severity: 0,
      desc: 'still'
    };
  }
  if (mps < 5) {
    return {
      severity: 1,
      desc: 'gentle breeze'
    };
  }
  if (mps < 10) {
    return {
      severity: 2,
      desc: 'light wind'
    };
  }
  if (mps < 20) {
    return {
      severity: 3,
      desc: 'windy'
    };
  }
  if (mps < 30) {
    return {
      severity: 4,
      desc: 'strong winds'
    };
  }
  if (mps >= 30) {
    return {
      severity: 5,
      desc: 'extreme wind'
    };
  }
}

function diurnalize(sys) {
  const sunrise = new Date(sys.sunrise * 1000);
  const sunset = new Date(sys.sunset * 1000);
  const now = new Date();

  const sunriseTime = `${sunrise.getHours()}:${sunrise.getMinutes()}`;
  const sunsetTime = `${sunset.getHours()}:${sunset.getMinutes()}`;
  const nowTime = `${now.getHours()}:${now.getMinutes()}`;

  const sunriseHr = sunrise.getHours();
  const sunsetHr = sunset.getHours();
  const nowHr = now.getHours();

  if (nowHr < sunriseHr || nowHr > sunsetHr) {
    return 'night';
  }
  if (nowHr === sunriseHr) {
    return 'sunrise';
  }
  if (nowHr === sunsetHr) {
    return 'sunset';
  }
  return 'day';
}

// make sure the 'condition' is in our internal database of conditions.
function getConditionName(apiName) {
  let guess = kebabCase(apiName);
  if (weatherConditions.includes(guess)) {
    return guess;
  }

  const equivs = {
    clouds: 'cloudy',
    'partial-sun': 'partly sunny',
    'partial-clouds': 'partly cloudy'
  };

  if (equivs[guess]) {
    return equivs[guess];
  }
  console.warn(`what do I do with "${apiName}" ??`);
}

function getWeatherCondition(description) {
  console.log(description);
  return openWeatherConditions.find(cnd => cnd.description === description);
}

const openWeatherConditions = [
  {
    main: 'Thunderstorm',
    description: 'thunderstorm with light rain',
    icon: weatherEmoji.thunderCloudAndRain
  },
  {
    main: 'Thunderstorm',
    description: 'thunderstorm with rain',
    icon: weatherEmoji.thunderCloudAndRain
  },
  {
    main: 'Thunderstorm',
    description: 'thunderstorm with heavy rain',
    icon: weatherEmoji.thunderCloudAndRain
  },
  {
    main: 'Thunderstorm',
    description: 'light thunderstorm',
    icon: weatherEmoji.thunderCloudAndRain
  },
  {
    main: 'Thunderstorm',
    description: 'thunderstorm',
    icon: weatherEmoji.thunderCloudAndRain
  },
  {
    main: 'Thunderstorm',
    description: 'heavy thunderstorm',
    icon: weatherEmoji.thunderCloudAndRain
  },
  {
    main: 'Thunderstorm',
    description: 'ragged thunderstorm',
    icon: weatherEmoji.thunderCloudAndRain
  },
  {
    main: 'Thunderstorm',
    description: 'thunderstorm with light drizzle',
    icon: weatherEmoji.thunderCloudAndRain
  },
  {
    main: 'Thunderstorm',
    description: 'thunderstorm with drizzle',
    icon: weatherEmoji.thunderCloudAndRain
  },
  {
    main: 'Thunderstorm',
    description: 'thunderstorm with heavy drizzle',
    icon: weatherEmoji.thunderCloudAndRain
  },
  {
    main: 'Drizzle',
    description: 'light intensity drizzle',
    icon: weatherEmoji.cloudWithRain
  },
  {
    main: 'Drizzle',
    description: 'drizzle',
    icon: weatherEmoji.cloudWithRain
  },
  {
    main: 'Drizzle',
    description: 'heavy intensity drizzle',
    icon: weatherEmoji.cloudWithRain
  },
  {
    main: 'Drizzle',
    description: 'light intensity drizzle rain',
    icon: weatherEmoji.cloudWithRain
  },
  {
    main: 'Drizzle',
    description: 'drizzle rain',
    icon: weatherEmoji.cloudWithRain
  },
  {
    main: 'Drizzle',
    description: 'heavy intensity drizzle rain',
    icon: weatherEmoji.cloudWithRain
  },
  {
    main: 'Drizzle',
    description: 'shower rain and drizzle',
    icon: weatherEmoji.cloudWithRain
  },
  {
    main: 'Drizzle',
    description: 'heavy shower rain and drizzle',
    icon: weatherEmoji.cloudWithRain
  },
  {
    main: 'Drizzle',
    description: 'shower drizzle',
    icon: weatherEmoji.cloudWithRain
  },
  {
    main: 'Rain',
    description: 'light rain',
    icon: weatherEmoji.cloudWithRain
  },
  {
    main: 'Rain',
    description: 'moderate rain',
    icon: weatherEmoji.cloudWithRain
  },
  {
    main: 'Rain',
    description: 'heavy intensity rain',
    icon: weatherEmoji.cloudWithRain
  },
  {
    main: 'Rain',
    description: 'very heavy rain',
    icon: weatherEmoji.cloudWithRain
  },
  {
    main: 'Rain',
    description: 'extreme rain',
    icon: weatherEmoji.cloudWithRain
  },
  {
    main: 'Rain',
    description: 'freezing rain',
    icon: weatherEmoji.cloudWithRain
  },
  {
    main: 'Rain',
    description: 'light intensity shower rain',
    icon: weatherEmoji.cloudWithRain
  },
  {
    main: 'Rain',
    description: 'shower rain',
    icon: weatherEmoji.cloudWithRain
  },
  {
    main: 'Rain',
    description: 'heavy intensity shower rain',
    icon: weatherEmoji.cloudWithRain
  },
  {
    main: 'Rain',
    description: 'ragged shower rain',
    icon: weatherEmoji.cloudWithRain
  },
  {
    main: 'Snow',
    description: 'light snow',
    icon: weatherEmoji.cloudWithSnow
  },
  {
    main: 'Snow',
    description: 'Snow',
    icon: weatherEmoji.cloudWithSnow
  },
  {
    main: 'Snow',
    description: 'Heavy snow',
    icon: weatherEmoji.cloudWithSnow
  },
  {
    main: 'Snow',
    description: 'Sleet',
    icon: weatherEmoji.cloudWithSnow
  },
  {
    main: 'Snow',
    description: 'Light shower sleet',
    icon: weatherEmoji.cloudWithSnow
  },
  {
    main: 'Snow',
    description: 'Shower sleet',
    icon: weatherEmoji.cloudWithSnow
  },
  {
    main: 'Snow',
    description: 'Light rain and snow',
    icon: weatherEmoji.cloudWithSnow
  },
  {
    main: 'Snow',
    description: 'Rain and snow',
    icon: weatherEmoji.cloudWithSnow
  },
  {
    main: 'Snow',
    description: 'Light shower snow',
    icon: weatherEmoji.cloudWithSnow
  },
  {
    main: 'Snow',
    description: 'Shower snow',
    icon: weatherEmoji.cloudWithSnow
  },
  {
    main: 'Snow',
    description: 'Heavy shower snow',
    icon: weatherEmoji.cloudWithSnow
  },
  {
    main: 'Mist',
    description: 'mist',
    icon: weatherEmoji.fog
  },
  {
    main: 'Smoke',
    description: 'Smoke',
    icon: weatherEmoji.fog
  },
  {
    main: 'Haze',
    description: 'Haze',
    icon: weatherEmoji.fog
  },
  {
    main: 'Dust',
    description: 'sand/ dust whirls',
    icon: weatherEmoji.fog
  },
  {
    main: 'Fog',
    description: 'fog',
    icon: weatherEmoji.fog
  },
  {
    main: 'Sand',
    description: 'sand',
    icon: weatherEmoji.fog
  },
  {
    main: 'Dust',
    description: 'dust',
    icon: weatherEmoji.fog
  },
  {
    main: 'Ash',
    description: 'volcanic ash',
    icon: weatherEmoji.fog
  },
  {
    main: 'Squall',
    description: 'squalls',
    icon: weatherEmoji.fog
  },
  {
    main: 'Tornado',
    description: 'tornado',
    icon: weatherEmoji.fog
  },
  {
    main: 'Clear',
    description: 'clear sky',
    icon: weatherEmoji.sunWithRays
  },
  {
    main: 'Clouds',
    description: 'few clouds',
    cloudCover: '11-25%',
    icon: weatherEmoji.sunWithSmallCloud
  },
  {
    main: 'Clouds',
    description: 'scattered clouds',
    cloudCover: '25-50%',
    icon: weatherEmoji.sunBehindCloud
  },
  {
    main: 'Clouds',
    description: 'broken clouds',
    cloudCover: '51-84%',
    icon: weatherEmoji.sunBehindLargeCloud
  },
  {
    main: 'Clouds',
    description: 'overcast clouds',
    cloudCover: '85-100%',
    icon: weatherEmoji.cloud
  }
];
