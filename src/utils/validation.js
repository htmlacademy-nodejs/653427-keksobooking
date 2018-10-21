'use strict';

const isValidDate = (date) => date instanceof Date && !isNaN(date.getTime());

module.exports = {
  isValidDate
};
