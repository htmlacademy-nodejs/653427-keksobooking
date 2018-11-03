'use strict';

const {postOfferScheme, filesScheme} = require(`./validation-scheme`);
const {parseAddress, required} = require(`../utils/validation`);
const {getRandomFromArray} = require(`../utils/generation`);
const {NAMES} = require(`../data/values`);

const ValidationError = require(`../error/validation-error`);

const transformData = (data, files) => {
  const date = Date.now();

  return {
    author: {
      name: data.name || getRandomFromArray(NAMES),
      avatar: files && files.avatar ? `api/offers/${date}/avatar` : null
    },
    offer: data,
    location: parseAddress(data.address),
    date
  };
};

const validateByScheme = (data, scheme) => Object.keys(scheme).reduce(
    (errors, key) => errors.concat(validateField(key, data[key], scheme[key])), []
);

const validateField = (name, value, patterns) => {
  if (!value && !patterns.find((pattern) => pattern === required)) {
    return [];
  }

  return patterns.reduce(
      (errors, pattern) => {
        const error = pattern(name, value);
        if (error) {
          errors.push(error);
        }
        return errors;
      }, []);
};

const validate = (data, files) => {
  let validationErrors = validateByScheme(data, postOfferScheme);

  if (files) {
    const fileValidationErrors = validateByScheme(files, filesScheme);
    validationErrors = validationErrors.concat(fileValidationErrors);
  }

  if (validationErrors.length > 0) {
    throw new ValidationError(validationErrors);
  }

  return transformData(data, files);
};

module.exports = validate;
