'use strict';

const IllegalArgumentError = require(`../../error/illegal-argument-error`);
const NotFoundError = require(`../../error/not-found-error`);
const asyncMiddleware = require(`./async-middleware`);
const logger = require(`../../logger`);
const {isValidDate} = require(`../../utils/validation`);

module.exports = (offersRouter) => {
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

    res.on(`error`, (e) => logger.error(e));
    res.on(`end`, () => res.end());
    const stream = result.stream;
    stream.on(`error`, (e) => logger.error(e));
    stream.on(`end`, () => res.end());
    stream.pipe(res);
  }));
};
