'use strict';

const fieldValidationError = (fieldName, errorMessage) => ({
  error: `Validation Error`,
  fieldName,
  errorMessage
});

const isRepeating = ((element, index, array) => array.indexOf(element) !== index);
const isValidDate = (date) => date instanceof Date && !isNaN(date.getTime());

const required = (name, value) => value === undefined || value === `` ? fieldValidationError(name, `Field ${name} is required`) : null;
const minLength = (length) => (name, value) => (value && (value.length < length)) ? fieldValidationError(name, `Min length is ${length}`) : null;
const maxLength = (length) => (name, value) => (value && (value.length > length)) ? fieldValidationError(name, `Max length is ${length}`) : null;
const isString = (name, value) => typeof value !== `string` ? fieldValidationError(name, `Value must be a string`) : null;
const isNumber = (name, value) => !isFinite(value) ? fieldValidationError(name, `Value must be a number`) : null;
const isIncluded = (array) => (name, value) => !array.includes(value) ? fieldValidationError(name, `Value is not included`) : null;
const isHHmm = (name, value) => !/^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$/.test(value) ? fieldValidationError(name, `Value must be HH:mm format`) : null;
const isBetween = (min, max) => (name, value) => value < min || value > max ? fieldValidationError(name, `Value should be between ${min} and ${max}`) : null;
const isImage = (name, value) => !value.mimetype || value.mimetype.split(`/`)[0] !== `image` ? fieldValidationError(name, `Value is not an image`) : null;

const uniqueValuesArray = (name, value) => {
  return !Array.isArray(value) || value.some(isRepeating) ? fieldValidationError(name, `Value must be unique values array`) : null;
};
const allValuesIncluded = (array) => (name, value) => {
  return !Array.isArray(value) || !value.every((item) => array.includes(item)) ? fieldValidationError(name, `Values should be included`) : null;
};

const parseAddress = (addressString) => {
  const addressCoords = addressString.split(`,`);

  if (addressCoords.length !== 2) {
    throw new Error(`Not an address string`);
  }
  if (isNaN(addressCoords[0]) || isNaN(addressCoords[1])) {
    throw new Error(`Not an address string`);
  }

  return {
    x: parseInt(addressCoords[0], 10),
    y: parseInt(addressCoords[1], 10)
  };
};

const isAddress = (name, value) => {
  try {
    parseAddress(value);
    return null;
  } catch (error) {
    return fieldValidationError(name, `Not an address string`);
  }
};

module.exports = {
  required,
  minLength,
  maxLength,
  isIncluded,
  isString,
  isNumber,
  isBetween,
  isValidDate,
  isAddress,
  isRepeating,
  isImage,
  uniqueValuesArray,
  allValuesIncluded,
  parseAddress,
  isHHmm,
};
