'use strict';

const request = require(`supertest`);
const assert = require(`assert`);
const express = require(`express`);

const offersStoreMock = require(`./mock/offers-store-mock`);
const imagesStoreMock = require(`./mock/images-store-mock`);
const offersRouter = require(`../src/offers/route`)(offersStoreMock, imagesStoreMock);

const app = express();

app.use(`/api/offers`, offersRouter);

const testOffer = require(`./fixtures/testOffer.js`);

describe(`POST /api/offers`, () => {
  it(`send offer as json`, async () => {
    const response = await request(app).
    post(`/api/offers`).
    send(testOffer).
    set(`Accept`, `application/json`).
    set(`Content-Type`, `application/json`).
    expect(200).
    expect(`Content-Type`, /json/);

    const offer = response.body;
    assert.equal(offer.author.name, testOffer.name);
    assert.equal(offer.author.avatar, ``);
    assert.equal(offer.offer.price, testOffer.price);
    assert.equal(typeof offer.date, `number`);
  });

  it(`send correct offer with avatar as multipart/form-data`, async () => {
    const response = await request(app).
    post(`/api/offers`).
    field(testOffer).
    attach(`avatar`, `test/fixtures/keks.png`).
    attach(`preview`, `test/fixtures/keks.png`).
    set(`Accept`, `application/json`).
    set(`Content-Type`, `multipart/form-data`).
    expect(200).
    expect(`Content-Type`, /json/);

    const offer = response.body;
    assert.equal(offer.author.name, testOffer.name);
    assert.equal(offer.offer.price, testOffer.price);
    assert.equal(offer.author.avatar, `api/offers/${offer.date}/avatar`);
  });

  it(`send incorrect offer as multipart/form-data`, async () => {
    const name = `A.Nikitochkin`;

    const response = await request(app).
    post(`/api/offers`).
    field(`name`, name).
    attach(`avatar`, `test/fixtures/keks.png`).
    attach(`preview`, `test/fixtures/keks.png`).
    set(`Accept`, `application/json`).
    set(`Content-Type`, `multipart/form-data`).
    expect(400).
    expect(`Content-Type`, /json/);
    const body = response.body;
    assert.equal(body[0].fieldName, `title`);
    assert.equal(body[0].errorMessage, `Field title is required`);
    assert.equal(body[9].fieldName, `address`);
    assert.equal(body[9].errorMessage, `Not an address string`);
  });

});
