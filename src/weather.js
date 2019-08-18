import { somewhereBtwn } from './utils';

// TODO: use weather descriptors from openWeatherAPI so we are matchy matchy

export const weatherConditions = [
  'clear',
  'sunny',
  'partly-sunny',
  'mostly-sunny',
  'partly-cloudy',
  'mostly-cloudy',
  'cloudy',
  'overcast',
  'scattered-thunderstorms',
  'thunderstorm',
  'showers',
  'scattered-showers',
  'light-rain',
  'rain',
  'rain-and-snow',
  'light-snow',
  'snow',
  'snow-showers',
  'flurries',
  'freezing-drizzle',
  'sleet',
  'hail',
  'mist',
  'fog',
  'haze',
  'storm',
  'icy',
  'dust',
  'smoke',
  'rainbow',
  'sunshower'
];

export const weatherEmoji = {
  sunWithRays: { emoji: '☀️', path: 'sun-with-rays' },
  sunWithSmallCloud: { emoji: '🌤️', path: 'sun-with-small-cloud' },
  sunBehindCloud: { emoji: '⛅', path: 'sun-behind-cloud' },
  sunBehindLargeCloud: { emoji: '🌥', path: 'sun-behind-large-cloud' },
  cloud: { emoji: '☁️', path: 'cloud' },
  thundercloudAndRain: { emoji: '⛈', path: 'thunder-cloud-and-rain' },
  cloudWithRain: { emoji: '🌧', path: 'cloud-with-rain' },
  cloudWithSnow: { emoji: '🌨', path: 'cloud-with-snow' },
  fog: { emoji: '🌫', path: 'fog' },
  cloudWithTornado: { emoji: '🌪', path: 'cloud-with-tornado' },
  windBlowingFace: { emoji: '🌬', path: 'wind-blowing-face' },
  rainbow: { emoji: '🌈', path: 'rainbow' },
  sunBehindCloudWithRain: { emoji: '🌦', path: 'sun-behind-cloud-with-rain' }
};

export const emojiMap = {
  clear: weatherEmoji.sunWithRays,
  sunny: weatherEmoji.sunWithRays,
  'partly-sunny': weatherEmoji.sunWithSmallCloud,
  'mostly-sunny': weatherEmoji.sunWithSmallCloud,
  'partly-cloudy': weatherEmoji.sunBehindCloud,
  'mostly-cloudy': weatherEmoji.sunBehindLargeCloud,
  cloudy: weatherEmoji.cloud,
  overcast: weatherEmoji.cloud,
  'scattered-thunderstorms': weatherEmoji.thunderCloudAndRain,
  thunderstorm: weatherEmoji.thunderCloudAndRain,
  showers: weatherEmoji.cloudWithRain,
  'scattered-showers': weatherEmoji.cloudWithRain,
  'light-rain': weatherEmoji.cloudWithRain,
  rain: weatherEmoji.cloudWithRain,
  'rain-and-snow': weatherEmoji.cloudWithRain,
  'light-snow': weatherEmoji.cloudWithSnow,
  snow: weatherEmoji.cloudWithSnow,
  'snow-showers': weatherEmoji.cloudWithSnow,
  flurries: weatherEmoji.cloudWithSnow,
  'freezing-drizzle': weatherEmoji.cloudWithSnow,
  sleet: weatherEmoji.cloudWithSnow,
  hail: weatherEmoji.cloudWithSnow,
  mist: weatherEmoji.fog,
  fog: weatherEmoji.fog,
  haze: weatherEmoji.fog,
  storm: weatherEmoji.cloudWithTornado,
  icy: weatherEmoji.windBlowingFace,
  dust: weatherEmoji.fog,
  smoke: weatherEmoji.fog,
  rainbow: weatherEmoji.rainbow,
  sunshower: weatherEmoji.sunBehindCloudWithRain
};

export function isRaining(condition) {
  return (
    condition.includes('shower') ||
    condition.includes('rain') ||
    condition.includes('sleet') ||
    condition.includes('hail') ||
    condition.includes('drizzle') ||
    condition.includes('storm')
  );
}

export function isSunny(condition) {
  return (
    condition.includes('sun') ||
    condition.includes('clear') ||
    condition.includes('-cloudy')
  );
}

export function isSnowing(condition) {
  return condition.includes('snow') || condition.includes('flurries');
}

export function isWindy(condition) {
  return (
    condition.includes('wind') ||
    condition.includes('storm') ||
    ['flurries', 'sleet', 'hail'].includes(condition)
  );
}

export function isLimitedVisibility(condition) {
  return ['haze', 'fog', 'smoke', 'mist', 'dust'].includes(condition);
}

export function cloudCover(condition) {
  if (['icy', 'haze', 'fog', 'dust', 'smoke'].includes(condition))
    return somewhereBtwn(0.3, 1);
  if (['cloudy', 'mist'].includes(condition)) return 0.9;
  if (['mostly-cloudy'].includes(condition)) return 0.8;
  if (['partly-cloudy', 'scattered-showers'].includes(condition)) return 0.6;
  if (['partly-sunny'].includes(condition)) return 0.4;
  if (['sunshower', 'rainbow'].includes(condition)) return 0.3;
  if (['mostly-sunny'].includes(condition)) return 0.2;
  if (['clear', 'sunny'].includes(condition)) return 0;
  // this last is as a catch-all
  if (
    ['overcast', 'flurries', 'sleet', 'hail', 'freezing-drizzle'].includes(
      condition
    ) ||
    condition.includes('storm') ||
    condition.includes('shower') ||
    condition.includes('snow') ||
    condition.includes('rain')
  ) {
    return 1;
  }
  console.log('no cloud cover data for ' + condition);
  return 0;
}

export function weatherObject(condition) {
  return {
    isWindy: isWindy(condition),
    isSnowing: isSnowing(condition),
    isRaining: isRaining(condition),
    isSunny: isSunny(condition),
    isLimitedVisibility: isLimitedVisibility(condition),
    cloudCover: cloudCover(condition)
  };
}

weatherConditions.forEach(c => cloudCover(c));

export default {
  weatherConditions,
  weatherObject,
  isRaining,
  isSunny,
  cloudCover,
  isSnowing,
  isWindy,
  isLimitedVisibility
};
