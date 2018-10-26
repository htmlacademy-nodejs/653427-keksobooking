'use strict';

const request = require(`supertest`);
const assert = require(`assert`);

const app = require(`../src/server`).app;

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
    assert.deepEqual(offer, Object.assign({}, testOffer, {address: {x: 570, y: 472}}));
  });

  it(`send correct offer with avatar as multipart/form-data`, async () => {
    const response = await request(app).
    post(`/api/offers`).
    field(`name`, testOffer.name).
    field(`title`, testOffer.title).
    field(`address`, testOffer.address).
    field(`description`, testOffer.description).
    field(`price`, testOffer.price).
    field(`type`, testOffer.type).
    field(`rooms`, testOffer.rooms).
    field(`guests`, testOffer.guests).
    field(`checkin`, testOffer.checkin).
    field(`checkout`, testOffer.checkout).
    field(`features`, testOffer.features).
    attach(`avatar`, `test/fixtures/keks.png`).
    attach(`preview`, `test/fixtures/keks.png`).
    set(`Accept`, `application/json`).
    set(`Content-Type`, `multipart/form-data`).
    expect(200).
    expect(`Content-Type`, /json/);

    const offer = response.body;
    assert.equal(offer.name, testOffer.name);
    assert.equal(offer.price, testOffer.price);
    assert.equal(offer.avatar.mimetype, `image/png`);
    assert.equal(offer.preview.mimetype, `image/png`);
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
