'use strict';

const version = require(`./version`);
const author = require(`./author`);
const license = require(`./license`);
const description = require(`./description`);

module.exports = {
  name: `help`,
  description: `Показывает доступные команды`,
  execute() {
    console.log(`Доступные команды:
--help    — печатает этот текст;
--${author.name}    — ${author.description};
--${license.name}    — ${license.description};
--${description.name}    — ${description.description};
--${version.name} — ${version.description};`);
  }
};
