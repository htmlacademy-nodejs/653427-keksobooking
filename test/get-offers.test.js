'use strict';

const request = require(`supertest`);
const assert = require(`assert`);

const {offers} = require(`../src/offers/route`);

const app = require(`../src/server`).app;

describe(`GET /api/offers`, () => {
  it(`get all offers`, async () => {
    const response = await request(app).
    get(`/api/offers`).
    set(`Accept`, `application/json`).
    expect(200).
    expect(`Content-Type`, /json/);

    const allOffers = response.body;
    assert.equal(allOffers.length, 20);
  });

  it(`get all offers with / at the end`, async () => {
    const response = await request(app).
    get(`/api/offers/`).
    set(`Accept`, `application/json`).
    expect(200).
    expect(`Content-Type`, /json/);

    const allOffers = response.body;
    assert.equal(allOffers.length, 20);
  });


  it(`get data with query params`, async () => {
    const response = await request(app).
    get(`/api/offers?skip=5&limit=5`).
    set(`Accept`, `application/json`).
    expect(200).
    expect(`Content-Type`, /json/);

    const allOffers = response.body;
    assert.equal(allOffers[0].date, offers[5].date);
    assert.equal(allOffers.length, 5);
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
    const testDate = offers[0].date;
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
