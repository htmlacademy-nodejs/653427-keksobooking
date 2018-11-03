'use strict';

const Cursor = require(`./cursor-mock`);
const offersGenerator = require(`../../src/generator/offers-generator`);

class OfferStoreMock {
  constructor(data) {
    this.data = data;
  }

  async getOffer(date) {
    return this.data.filter((it) => it.date === date)[0];
  }

  async getAllOffers() {
    return new Cursor(this.data);
  }

  async saveOffer() {
    return {
      insertedId: 42
    };
  }

}

module.exports = new OfferStoreMock(offersGenerator.generateOffers());
