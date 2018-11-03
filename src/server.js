'use strict';
const express = require(`express`);

const offersStore = require(`./offers/store`);
const imagesStore = require(`./images/store`);
const {NOT_FOUND_HANDLER, ERROR_HANDLER} = require(`./utils/handlers`);
const logger = require(`./logger`);

const offersRouter = require(`./offers/route`)(offersStore, imagesStore);

const {
  SERVER_PORT = 3000,
  SERVER_HOST = `localhost`
} = process.env;

const app = express();

app.use(express.static(`static`));

app.use(`/api/offers`, offersRouter);

app.use(NOT_FOUND_HANDLER);

app.use(ERROR_HANDLER);

const runServer = (port, host) => {
  port = parseInt(port, 10);
  app.listen(port, host, () => {
    logger.info(`Сервер запущен: http://${host}:${port}`);
  });
};

module.exports = {
  name: `server`,
  description: `запускает сервер`,
  execute(params) {
    runServer(params[0] || SERVER_PORT, SERVER_HOST);

    return true;
  },
  app
};
