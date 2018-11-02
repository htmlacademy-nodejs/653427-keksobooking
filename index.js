'use strict';

require(`dotenv`).config();

const optionModules = [
  require(`./src/server`),
  require(`./src/version`),
  require(`./src/help`),
  require(`./src/author`),
  require(`./src/license`),
  require(`./src/description`)
];

const command = process.argv[2];
const params = process.argv.slice(3);

if (command) {
  const commandModule = optionModules.find((module) => command === `--${module.name}`);

  if (commandModule) {
    const awaiting = commandModule.execute(params);
    if (!awaiting) {
      process.exit(0);
    }
  } else {
    console.error(`Неизвестная команда ${command}.
Чтобы прочитать правила использования приложения, наберите "--help"`);
    process.exit(1);
  }
} else {
  console.log(`Программа была запущена без параметров`);
  process.exit(1);
}


