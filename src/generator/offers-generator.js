'use strict';

const {
  TITLES,
  TYPES,
  CHECK_TIME,
  FEATURES,
  PHOTOS
} = require(`../data/values`);

const {
  getRandomInt,
  getRandomFromArray,
  getRandomRange,
  getRandomString,
  getRandomUnixDate,
  shuffleArray
} = require(`../utils/generation`);

function* featuresGenerator(...features) {
  const randomLength = getRandomInt(1, features.length);
  for (let i = 0; i < randomLength; i++) {
    const nameIndex = Math.floor(Math.random() * features.length);
    yield features.splice(nameIndex, 1)[0];
  }
}

const generateOffer = () => {
  const location = {
    x: Math.floor(getRandomRange(300, 900)),
    y: Math.floor(getRandomRange(150, 500))
  };

  return {
    author: {
      avatar: `https://robohash.org/${getRandomString()}`
    },
    offer: {
      title: getRandomFromArray(TITLES),
      address: `${location.x}, ${location.y}`,
      price: Math.floor(getRandomRange(1000, 100000)),
      type: getRandomFromArray(TYPES),
      rooms: getRandomInt(1, 5),
      guests: getRandomInt(1, 10),
      checkin: getRandomFromArray(CHECK_TIME),
      checkout: getRandomFromArray(CHECK_TIME),
      features: [...featuresGenerator(...FEATURES)],
      description: ``,
      photos: shuffleArray(PHOTOS)
    },
    location,
    date: getRandomUnixDate()
  };
};

const generateOffers = (quantity = 40) => [...new Array(parseInt(quantity, 10))].map(generateOffer);

module.exports = {
  generateOffer,
  generateOffers
};
