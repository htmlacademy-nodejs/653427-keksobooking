'use strict';

const assert = require(`assert`);
const {generateOffer} = require(`../src/generator/offers-generator`);
const {TITLES, TYPES, CHECK_TIME, FEATURES, PHOTOS, WEEK_MS} = require(`../src/data/values`);

const isRepeating = ((element, index, array) => array.indexOf(element) !== index);
const isIncluded = (array) => (value) => array.includes(value);
const isBetween = (value, min, max) => value >= min && value <= max;

describe(`Generated entity`, () => {
  const entity = generateOffer();
  const {author, offer, location, date} = entity;

  it(`Should be object`, () => {
    assert.equal(typeof entity, `object`);
  });

  describe(`entity.author`, () => {
    it(`Should be object`, () => {
      assert.equal(typeof author, `object`);
    });
    it(`avatar should be valid URL string`, () => {
      assert(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/.test(author.avatar));
    });
  });

  describe(`entity.offer`, () => {
    it(`Should be object`, () => {
      assert.equal(typeof offer, `object`);
    });
    it(`title should be predefined string`, () => {
      assert(TITLES.includes(offer.title));
    });
    it(`address should be composed of location`, () => {
      assert.equal(offer.address, `${location.x}, ${location.y}`);
    });
    it(`price should be from 1000 to 1000000`, () => {
      assert(isBetween(offer.price, 1000, 1000000));
    });
    it(`type should be predefined string`, () => {
      assert(TYPES.includes(offer.type));
    });
    it(`rooms should be from 1 to 5`, () => {
      assert(isBetween(offer.rooms, 1, 5));
    });
    it(`guests should be number`, () => {
      assert.equal(typeof offer.guests, `number`);
    });
    it(`checkin should be predefined string`, () => {
      assert(CHECK_TIME.includes(offer.checkin));
    });
    it(`checkout should be predefined string`, () => {
      assert(CHECK_TIME.includes(offer.checkout));
    });
    it(`features should be array of unique predefined strings`, () => {
      assert(!offer.features.some(isRepeating) && offer.features.every(isIncluded(FEATURES)));
    });
    it(`description should be empty string`, () => {
      assert.equal(offer.description, ``);
    });
    it(`photos should be array of random ordered predefined strings`, () => {
      assert.deepEqual(offer.photos.sort(), PHOTOS.sort());
    });
  });

  describe(`entity.location`, () => {
    it(`Should be object`, () => {
      assert.equal(typeof location, `object`);
    });
    it(`x should be from 300 to 900`, () => {
      assert(isBetween(location.x, 300, 900));
    });
    it(`y should be from 150 to 500`, () => {
      assert(isBetween(location.y, 150, 500));
    });
  });

  describe(`entity.date`, () => {
    it(`Should be UNIX Timestamp`, () => {
      assert(new Date() - new Date(date) <= WEEK_MS);
    });
  });
});


