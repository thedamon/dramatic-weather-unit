import axios from 'axios';
import store from 'store';
const expirePlugin = require('store/plugins/expire');

import { dd } from './dddd';

const whaev = dd['¯\\_(ツ)_/¯'];

store.addPlugin(expirePlugin);

const ipUrl = 'https://ipinfo.io/json';

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
    const inTenMinutes = new Date().getTime() + 10 * 1000 * 60;
    store.set('locData', newLoc, inTenMinutes);
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
    const inFiveMinutes = new Date().getTime() + 5 * 1000 * 60;
    console.log('caching weather', weather);
    store.set('openWeatherData', weather, inFiveMinutes);
    return summarizeOpenWeather(weather);
  }
}

function summarizeOpenWeather(w) {
  const summary = {
    sunrise: new Date(w.sys.sunrise * 1000),
    sunset: new Date(w.sys.sunset * 1000),
    day: diurnalize(w.sys),
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
    description: w.weather[0].description
  };
  console.log(summary);
  w.summary = summary;
  return w;
}

async function fetchWeather(locData) {
  const weatherUrl = getOpenWeatherUrl(locData);
  const weather = await axios(weatherUrl);
  return await weather.data;
}

function getOpenWeatherUrl(locData) {
  return `http://api.openweathermap.org/data/2.5/weather?q=${locData.city},${
    locData.country
  }&APPID=${whaev}`;
  // const locationKey =
  // accuWeatherLoc: `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?q=${locData.city},${locData.country}&apikey=${accuWeatherApiKey}`
  // accuWeather: `http://dataservice.accuweather.com/currentconditions/v1/${locationKey}`
}

function cardinalize(deg) {
  const directions = [
    'N',
    'NNE',
    'NE',
    'ENE',
    'E',
    'ESE',
    'SE',
    'SSE',
    'S',
    'SSW',
    'SW',
    'WSW',
    'W',
    'WNW',
    'NW',
    'NNW'
  ];
  let val = parseInt(deg / 22.5 + 0.5);
  return directions[val % 16];
}

function describeWind(mps) {
  if (mps < 5) {
    return {
      severity: 1,
      desc: 'still'
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
