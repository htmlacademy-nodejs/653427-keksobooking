'use strict';

const request = require(`supertest`);
const assert = require(`assert`);

const app = require(`../src/server`).app;

describe(`POST /api/offers`, () => {
  it(`send offer as json`, async () => {

    const sent = {
      author: `A.Nikitochkin`
    };

    const response = await request(app).
    post(`/api/offers`).
    send(sent).
    set(`Accept`, `application/json`).
    set(`Content-Type`, `application/json`).
    expect(200).
    expect(`Content-Type`, /json/);

    const offer = response.body;
    assert.deepEqual(offer, sent);
  });

  it(`send offer as multipart/form-data`, async () => {
    const authorName = `A.Nikitochkin`;

    const response = await request(app).
    post(`/api/offers`).
    field(`author`, authorName).
    set(`Accept`, `application/json`).
    set(`Content-Type`, `multipart/form-data`).
    expect(200).
    expect(`Content-Type`, /json/);

    const offer = response.body;
    assert.deepEqual(offer, {author: authorName});
  });

});
