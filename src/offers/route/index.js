'use strict';

const express = require(`express`);

const corsRoute = require(`./cors`);
const defaultRoute = require(`./default`);
const errorRoute = require(`./error`);
const dateRoute = require(`./date`);

const offersRouter = new express.Router();

corsRoute(offersRouter);
defaultRoute(offersRouter);
dateRoute(offersRouter);
errorRoute(offersRouter);

module.exports = (offersStore, imagesStore) => {
  offersRouter.offersStore = offersStore;
  offersRouter.imagesStore = imagesStore;
  return offersRouter;
};
