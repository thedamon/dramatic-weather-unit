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

export function somewhereBtwn(min, max) {
  return (Math.floor(Math.random() * max * 100) + min * 100) / 100;
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

weatherConditions.forEach(c => cloudCover(c));

export default {
  weatherConditions,
  isRaining,
  isSunny,
  cloudCover,
  isSnowing,
  isWindy,
  isLimitedVisibility,
  somewhereBtwn
};
