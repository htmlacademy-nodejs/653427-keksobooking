'use strict';

const logger = require(`../logger`);

const NOT_FOUND_HANDLER = (req, res) => {
  res.status(404).send(`Страница не найдена`);
};

const ERROR_HANDLER = (err, req, res, _next) => {
  if (err) {
    logger.error(err);
    res.status(err.code || 500).send(`Внутренняя ошибка сервера`);
  }
};

module.exports = {
  NOT_FOUND_HANDLER,
  ERROR_HANDLER
};
