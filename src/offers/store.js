'use strict';

const logger = require(`../logger`);
const db = require(`../database/db`);

const setupCollection = async () => {
  const dBase = await db;

  const collection = dBase.collection(`offers`);
  collection.createIndex({date: -1}, {unique: true});
  return collection;
};

class OffersStore {
  constructor(collection) {
    this.collection = collection;
  }

  async getOffer(date) {
    return (await this.collection).findOne({date});
  }

  async getAllOffers() {
    return (await this.collection).find();
  }

  async saveOffer(offerData) {
    return (await this.collection).insertOne(offerData);
  }

  async saveAllOffers(offersData) {
    return (await this.collection).insertMany(offersData);
  }
}

module.exports = new OffersStore(setupCollection().
catch((e) => logger.error(`Failed to set up "offers"-collection`, e)));
