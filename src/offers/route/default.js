'use strict';

const express = require(`express`);
const multer = require(`multer`);
const toStream = require(`buffer-to-stream`);

const IllegalArgumentError = require(`../../error/illegal-argument-error`);
const asyncMiddleware = require(`./async-middleware`);
const validate = require(`../validate`);

const jsonParser = express.json();
const upload = multer({storage: multer.memoryStorage()});

const PAGE_DEFAULT_LIMIT = 20;

const toPage = async (cursor, skip = 0, limit = PAGE_DEFAULT_LIMIT) => {
  const packet = await cursor.skip(skip).limit(limit).toArray();
  return {
    data: packet,
    skip,
    limit,
    total: await cursor.count()
  };
};

module.exports = (offersRouter) => {
  offersRouter.get(``, asyncMiddleware(async (req, res) => {
    const skip = parseInt(req.query.skip || 0, 10);
    const limit = parseInt(req.query.limit || PAGE_DEFAULT_LIMIT, 10);
    if (isNaN(skip) || isNaN(limit)) {
      throw new IllegalArgumentError(`Неверное значение параметра "skip" или "limit"`);
    }
    res.send(await toPage(await offersRouter.offersStore.getAllOffers(), skip, limit));
  }));

  offersRouter.post(``, jsonParser, upload.fields([{name: `avatar`, maxCount: 1}, {name: `preview`, maxCount: 1}]), asyncMiddleware(async (req, res) => {
    const {body, files} = req;
    const {features} = body;

    if (features && !Array.isArray(features)) {
      body.features = [features];
    }
    const validated = validate(body, files);

    const result = await offersRouter.offersStore.saveOffer(validated);
    const insertedId = result.insertedId;

    if (files && files.avatar) {
      await offersRouter.imagesStore.save(insertedId, toStream(files.avatar[0].buffer));
    }

    res.send(validated);
  }));
};
