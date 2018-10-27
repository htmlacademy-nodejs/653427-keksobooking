'use strict';

const {WEEK_MS} = require(`../data/values`);

const getRandomRange = (min, max) => Math.random() * (max - min) + min;
const getRandomInt = (min, max) => Math.round(getRandomRange(min, max));
const getRandomFromArray = (arr) => arr[Math.floor(arr.length * Math.random())];
const getRandomString = () => Math.random().toString(36).substring(7);
const getRandomUnixDate = () => Math.floor((Date.now() - getRandomInt(0, WEEK_MS)));

const shuffleArray = (array) => {
  let j;
  let temp;
  for (let i = array.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = array[j];
    array[j] = array[i];
    array[i] = temp;
  }
  return array;
};

module.exports = {
  getRandomFromArray,
  getRandomInt,
  getRandomUnixDate,
  getRandomString,
  getRandomRange,
  shuffleArray
};
