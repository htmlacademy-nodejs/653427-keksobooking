'use strict';

const express = require(`express`);
const multer = require(`multer`);
const toStream = require(`buffer-to-stream`);
const MongoError = require(`mongodb`).MongoError;

const {isValidDate} = require(`../utils/validation`);
const {NOT_FOUND_HANDLER} = require(`../utils/handlers`);
const validate = require(`./validate`);

const IllegalArgumentError = require(`../error/illegal-argument-error`);
const NotFoundError = require(`../error/not-found-error`);
const ValidationError = require(`../error/validation-error`);

const PAGE_DEFAULT_LIMIT = 20;
// eslint-disable-next-line new-cap
const offersRouter = express.Router();
const upload = multer({storage: multer.memoryStorage()});
const jsonParser = express.json();

const asyncMiddleware = (fn) => (req, res, next) => fn(req, res, next).catch(next);

const toPage = async (cursor, skip = 0, limit = PAGE_DEFAULT_LIMIT) => {
  const packet = await cursor.skip(skip).limit(limit).toArray();
  return {
    data: packet,
    skip,
    limit,
    total: await cursor.count()
  };
};

offersRouter.get(``, asyncMiddleware(async (req, res) => {
  const skip = parseInt(req.query.skip || 0, 10);
  const limit = parseInt(req.query.limit || PAGE_DEFAULT_LIMIT, 10);
  if (isNaN(skip) || isNaN(limit)) {
    throw new IllegalArgumentError(`Неверное значение параметра "skip" или "limit"`);
  }
  res.send(await toPage(await offersRouter.offersStore.getAllOffers(), skip, limit));
}));

offersRouter.get(`/:date`, asyncMiddleware(async (req, res) => {
  const offerDate = new Date(parseInt(req.params.date, 10));

  if (!isValidDate(offerDate)) {
    throw new IllegalArgumentError(`Некорректный формат даты`);
  }

  const found = await offersRouter.offersStore.getOffer(offerDate.getTime());
  if (!found) {
    throw new NotFoundError(`Предложение от ${offerDate.toLocaleString(`ru`)} не найдено`);
  }

  res.send(found);
}));

offersRouter.post(``, jsonParser, upload.fields([{name: `avatar`, maxCount: 1}, {name: `preview`, maxCount: 1}]), asyncMiddleware(async (req, res) => {
  const {body, files} = req;
  const {features} = body;

  if (features && !Array.isArray(features)) {
    body.features = [features];
  }
  const validated = validate(body, files);

  const result = await offersRouter.offersStore.save(validated);
  const insertedId = result.insertedId;

  if (files && files.avatar) {
    await offersRouter.imagesStore.save(insertedId, toStream(files.avatar[0].buffer));
  }

  res.send(validated);
}));

offersRouter.use((err, req, res, _next) => {
  if (err instanceof ValidationError) {
    res.status(err.code).json(err.errors);
  } else {
    res.status(err.code).send(err.message);
  }
});

offersRouter.get(`/:date/avatar`, asyncMiddleware(async (req, res) => {
  const offerDate = new Date(parseInt(req.params.date, 10));

  if (!isValidDate(offerDate)) {
    throw new IllegalArgumentError(`Некорректный формат даты`);
  }

  const found = await offersRouter.offersStore.getOffer(offerDate.getTime());
  if (!found) {
    throw new NotFoundError(`Предложение от ${offerDate.toLocaleString(`ru`)} не найдено`);
  }

  const result = await offersRouter.imagesStore.get(found._id);
  if (!result) {
    throw new NotFoundError(`Аватар для предложения от ${offerDate.toLocaleString(`ru`)} не найден`);
  }

  res.header(`Content-Type`, `image/jpg`);
  res.header(`Content-Length`, result.info.length);

  res.on(`error`, (e) => console.error(e));
  res.on(`end`, () => res.end());
  const stream = result.stream;
  stream.on(`error`, (e) => console.error(e));
  stream.on(`end`, () => res.end());
  stream.pipe(res);
}));

const ERROR_HANDLER = (err, req, res, _next) => {
  console.error(err);
  if (err instanceof ValidationError) {
    res.status(err.code).json(err.errors);
    return;
  } else if (err instanceof MongoError) {
    res.status(400).json(err.message);
    return;
  }
  res.status(err.code || 500).send(`Внутренняя ошибка сервера`);
};

offersRouter.use(ERROR_HANDLER);

offersRouter.use(NOT_FOUND_HANDLER);

module.exports = (offersStore, imagesStore) => {
  offersRouter.offersStore = offersStore;
  offersRouter.imagesStore = imagesStore;
  return offersRouter;
};
