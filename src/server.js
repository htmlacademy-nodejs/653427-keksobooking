'use strict';
const express = require(`express`);

const {offersRouter} = require(`./offers/route`);

const DEFAULT_PORT = 3000;

const NOT_FOUND_HANDLER = (req, res) => {
  res.status(404).send(`Page was not found`);
};

const ERROR_HANDLER = (err, req, res, _next) => {
  if (err) {
    console.error(err);
    res.status(err.code || 500).send(err.message);
  }
};

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
