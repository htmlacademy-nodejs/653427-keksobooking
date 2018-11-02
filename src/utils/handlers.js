'use strict';

const NOT_FOUND_HANDLER = (req, res) => {
  res.status(404).send(`Page was not found`);
};

const ERROR_HANDLER = (err, req, res, _next) => {
  if (err) {
    console.error(err);
    res.status(err.code || 500).send(`Внутренняя ошибка сервера`);
  }
};

module.exports = {
  NOT_FOUND_HANDLER,
  ERROR_HANDLER
};
