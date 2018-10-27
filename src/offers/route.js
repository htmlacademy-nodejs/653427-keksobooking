'use strict';

const express = require(`express`);
const multer = require(`multer`);
// eslint-disable-next-line new-cap
const offersRouter = express.Router();
const {generateOffers} = require(`../generator/offers-generator`);
const IllegalArgumentError = require(`../error/illegal-argument-error`);
const NotFoundError = require(`../error/not-found-error`);
const {isValidDate} = require(`../utils/validation`);
const ValidationError = require(`../error/validation-error`);
const validate = require(`./validate`);

const offers = generateOffers();
const upload = multer({storage: multer.memoryStorage()});
const jsonParser = express.json();

offersRouter.get(``, (req, res) => {
  const {query: {skip = 0, limit = 20}} = req;

  res.send(offers.slice(skip).slice(0, limit));
});

offersRouter.get(`/:date`, (req, res) => {
  const offerDate = new Date(parseInt(req.params.date, 10));

  if (!isValidDate(offerDate)) {
    throw new IllegalArgumentError(`Некорректный формат даты`);
  }

  const found = offers.find((offer) => offer.date === offerDate.getTime());
  if (!found) {
    throw new NotFoundError(`Предложение от ${offerDate.toLocaleString(`ru`)} не найдено`);
  }

  res.send(found);
});

offersRouter.post(``, jsonParser, upload.fields([{name: `avatar`, maxCount: 1}, {name: `preview`, maxCount: 1}]), (req, res) => {
  const {body, files} = req;
  const {features} = body;

  if (files) {
    const {avatar, preview} = files;

    if (avatar) {
      body.avatar = avatar[0];
    }

    if (preview) {
      body.preview = preview[0];
    }
  }

  if (features && !Array.isArray(features)) {
    body.features = [features];
  }

  res.send(validate(body));
});

offersRouter.use((err, req, res, _next) => {
  if (err instanceof ValidationError) {
    res.status(err.code).json(err.errors);
  } else {
    res.status(err.code).send(err.message);
  }
});

module.exports = {
  offersRouter,
  offers
};
