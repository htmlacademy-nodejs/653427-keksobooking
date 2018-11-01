'use strict';

const request = require(`supertest`);
const assert = require(`assert`);
const express = require(`express`);

// const {offers} = require(`../src/offers/route`);
const offersStoreMock = require(`./mock/offers-store-mock`);
const imagesStoreMock = require(`./mock/images-store-mock`);
const offersRouter = require(`../src/offers/route`)(offersStoreMock, imagesStoreMock);

const {NOT_FOUND_HANDLER} = require(`../src/utils/handlers`);

const app = express();

app.use(`/api/offers`, offersRouter);
app.use(NOT_FOUND_HANDLER);

describe(`GET /api/offers`, () => {
  it(`get all offers`, async () => {
    const response = await request(app).
    get(`/api/offers`).
    set(`Accept`, `application/json`).
    expect(200).
    expect(`Content-Type`, /json/);

    const allOffers = response.body;
    assert.equal(allOffers.data.length, 20);
    assert.equal(allOffers.total, 40);
  });

  it(`get all offers with / at the end`, async () => {
    const response = await request(app).
    get(`/api/offers/`).
    set(`Accept`, `application/json`).
    expect(200).
    expect(`Content-Type`, /json/);

    const allOffers = response.body;
    assert.equal(allOffers.data.length, 20);
    assert.equal(allOffers.total, 40);
  });

  it(`get data with query params`, async () => {
    const response = await request(app).
    get(`/api/offers?skip=5&limit=5`).
    set(`Accept`, `application/json`).
    expect(200).
    expect(`Content-Type`, /json/);

    const allOffers = response.body;
    assert.equal(allOffers.data.length, 5);
    assert.equal(allOffers.total, 40);
  });

  it(`get data from unknown resource`, async () => {
    return await request(app).
    get(`/api/fadafsf`).
    set(`Accept`, `application/json`).
    expect(404).
    expect(`Page was not found`).
    expect(`Content-Type`, /html/);
  });
});

describe(`GET /api/offers/:date`, () => {
  it(`get offer with date`, async () => {
    const testDate = (await (await offersStoreMock.getAllOffers()).toArray())[0].date;
    const response = await request(app).
    get(`/api/offers/${testDate}`).
    set(`Accept`, `application/json`).
    expect(200).
    expect(`Content-Type`, /json/);

    const offer = response.body;
    assert.strictEqual(offer.date, testDate);
  });

  it(`get offer with invalid date`, async () => {
    return request(app).
    get(`/api/offers/invaliddate`).
    set(`Accept`, `application/json`).
    expect(400).
    expect(`Некорректный формат даты`).
    expect(`Content-Type`, /html/);
  });

  it(`get unknown offer with old date`, async () => {
    return request(app).
    get(`/api/offers/1`).
    set(`Accept`, `application/json`).
    expect(404).
    expect(`Content-Type`, /html/);
  });
});
