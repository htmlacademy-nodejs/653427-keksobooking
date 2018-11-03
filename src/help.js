'use strict';

require(`colors`);

const optionModules = [
  require(`./server`),
  require(`./fill`),
  require(`./version`),
  require(`./author`),
  require(`./license`),
  require(`./description`)
];

module.exports = {
  name: `help`,
  description: `Показывает доступные команды`,
  execute() {
    console.log(`Доступные команды:
--${`help`.grey}    — ${`печатает этот текст`.green}
${optionModules.map((module) => `--${module.name.grey} — ${module.description.green}`).join(`\n`)}`);
  },
};
