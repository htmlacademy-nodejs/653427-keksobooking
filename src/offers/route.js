'use strict';

const express = require(`express`);
const multer = require(`multer`);
// eslint-disable-next-line new-cap
const offersRouter = express.Router();
const {generateOffers} = require(`../generator/offers-generator`);
const IllegalArgumentError = require(`../error/illegal-argument-error`);
const NotFoundError = require(`../error/not-found-error`);
const {isValidDate} = require(`../utils/validation`);

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

offersRouter.post(``, jsonParser, upload.none(), (req, res) => {
  const body = req.body;

  res.send(body);
});


module.exports = {
  offersRouter,
  offers
};
