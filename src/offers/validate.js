'use strict';

const {postOfferScheme} = require(`./validation-scheme`);
const {parseAddress, required} = require(`../utils/validation`);
const {getRandomFromArray} = require(`../utils/generation`);
const {NAMES} = require(`../data/values`);

const ValidationError = require(`../error/validation-error`);

const transformData = (data) => Object.assign({}, data, {
  address: parseAddress(data.address), name: data.name || getRandomFromArray(NAMES)
});

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

const validate = (data) => {
  const validationErrors = Object.keys(postOfferScheme).reduce(
      (errors, key) => errors.concat(validateField(key, data[key], postOfferScheme[key])), []
  );

  if (validationErrors.length > 0) {
    throw new ValidationError(validationErrors);
  }

  return transformData(data);
};

module.exports = validate;
