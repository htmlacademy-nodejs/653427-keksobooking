'use strict';
const express = require(`express`);
const offersStore = require(`./offers/store`);
const imagesStore = require(`./images/store`);
const {NOT_FOUND_HANDLER, ERROR_HANDLER} = require(`./utils/handlers`);

const offersRouter = require(`./offers/route`)(offersStore, imagesStore);

const DEFAULT_PORT = 3000;

const app = express();

app.use(express.static(`static`));

app.use(`/api/offers`, offersRouter);

app.use(NOT_FOUND_HANDLER);

app.use(ERROR_HANDLER);

const runServer = (port) => {
  port = parseInt(port, 10);
  app.listen(port, () => console.log(`Server listening on port ${port}!`));
};

module.exports = {
  name: `server`,
  description: `запускает сервер`,
  execute(params) {
    const port = params[0] || DEFAULT_PORT;

    runServer(port);

    return true;
  },
  app
};
