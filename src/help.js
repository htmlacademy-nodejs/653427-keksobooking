'use strict';

require(`colors`);

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
--${`help`.grey}    — ${`печатает этот текст`.green}
${optionModules.map((module) => `--${module.name.grey} — ${module.description.green}`).join(`\n`)}`);
  },
};
