'use strict';

const TITLES = [
  `Большая уютная квартира`,
  `Маленькая неуютная квартира`,
  `Огромный прекрасный дворец`,
  `Маленький ужасный дворец`,
  `Красивый гостевой домик`,
  `Некрасивый негостеприимный домик`,
  `Уютное бунгало далеко от моря`,
  `Неуютное бунгало по колено в воде`
];

const TYPES = [
  `flat`,
  `palace`,
  `house`,
  `bungalo`
];

const CHECK_TIME = [`12:00`, `13:00`, `14:00`];

const FEATURES = [
  `wifi`,
  `dishwasher`,
  `parking`,
  `washer`,
  `elevator`,
  `conditioner`
];

const PHOTOS = [
  `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel3.jpg`
];

const WEEK_MS = 604800000;

const generateEntity = () => {
  const getRandomRange = (min, max) => Math.random() * (max - min) + min;
  const getRandomInt = (min, max) => Math.round(getRandomRange(min, max));
  const getRandomFromArray = (arr) => arr[Math.floor(arr.length * Math.random())];
  const getRandomString = () => Math.random().toString(36).substring(7);
  const getRandomUnixDate = () => Math.floor((Date.now() - getRandomInt(0, WEEK_MS)) / 1000);

  function* featuresGenerator(...features) {
    const randomLength = getRandomInt(1, features.length);
    for (let i = 0; i < randomLength; i++) {
      const nameIndex = Math.floor(Math.random() * features.length);
      yield features.splice(nameIndex, 1)[0];
    }
  }

  const location = {
    x: getRandomRange(300, 900),
    y: getRandomRange(150, 500)
  };

  return {
    author: {
      avatar: `https://robohash.org/${getRandomString()}`
    },
    offer: {
      title: getRandomFromArray(TITLES),
      address: `${location.x}, ${location.y}`,
      price: getRandomRange(1000, 1000000),
      type: getRandomFromArray(TYPES),
      rooms: getRandomInt(1, 5),
      guests: getRandomInt(1, 10),
      checkin: getRandomFromArray(CHECK_TIME),
      checkout: getRandomFromArray(CHECK_TIME),
      features: [...featuresGenerator(...FEATURES)],
      description: ``,
      photos: [...PHOTOS].sort(() => Math.random() - 0.5)
    },
    location,
    date: getRandomUnixDate()
  };
};

module.exports = {
  generateEntity,
  TITLES,
  TYPES,
  CHECK_TIME,
  FEATURES,
  PHOTOS,
  WEEK_MS
};
