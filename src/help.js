'use strict';

const version = require(`./version`);
const author = require(`./author`);
const license = require(`./license`);
const description = require(`./description`);

const optionModules = [version, author, license, description];

module.exports = {
  name: `help`,
  description: `Показывает доступные команды`,
  execute() {
    console.log(`Доступные команды:
--help    — печатает этот текст;
${optionModules.map((module) => `--${module.name}  -${module.description}`).join(`\n`)}`);
  }
};
