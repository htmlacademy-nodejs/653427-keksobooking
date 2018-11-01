'use strict';

const {TYPES, FEATURES} = require(`../data/values`);

const {
  required,
  minLength,
  maxLength,
  isIncluded,
  isString,
  isNumber,
  isBetween,
  isAddress,
  isHHmm,
  isImage,
  uniqueValuesArray,
  allValuesIncluded
} = require(`../utils/validation`);

const postOfferScheme = {
  title: [required, isString, minLength(30), maxLength(140)],
  type: [required, isString, isIncluded(TYPES)],
  price: [required, isNumber, isBetween(1, 100000)],
  address: [required, isString, maxLength(100), isAddress],
  checkin: [required, isString, isHHmm],
  checkout: [required, isString, isHHmm],
  rooms: [required, isNumber, isBetween(0, 1000)],
  features: [uniqueValuesArray, allValuesIncluded(FEATURES)],
  name: [isString]
};

const filesScheme = {
  avatar: [isImage],
  preview: [isImage]
};

module.exports = {
  postOfferScheme,
  filesScheme
};
