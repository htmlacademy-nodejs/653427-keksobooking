'use strict';

const MongoError = require(`mongodb`).MongoError;

const ValidationError = require(`../../error/validation-error`);
const IllegalArgumentError = require(`../../error/illegal-argument-error`);
const {NOT_FOUND_HANDLER} = require(`../../utils/handlers`);
const logger = require(`../../logger`);

module.exports = (offersRouter) => {
  const ERROR_HANDLER = (err, req, res, _next) => {
    logger.error(err);
    if (err instanceof ValidationError) {
      res.status(err.code).json(err.errors);
      return;
    } else if (err instanceof MongoError) {
      res.status(400).json(err.message);
      return;
    } else if (err instanceof IllegalArgumentError) {
      res.status(400).send(err.message);
      return;
    }
    res.status(err.code || 500).send(`Внутренняя ошибка сервера`);
  };

  offersRouter.use(ERROR_HANDLER);
  offersRouter.use(NOT_FOUND_HANDLER);
};
