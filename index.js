'use strict';

require(`dotenv`).config();

const optionModules = [
  require(`./src/server`),
  require(`./src/fill`),
  require(`./src/version`),
  require(`./src/help`),
  require(`./src/author`),
  require(`./src/license`),
  require(`./src/description`)
];

const command = process.argv[2];
const params = process.argv.slice(3);

const quitOnError = (error) => {
  console.error(error);
  process.exit(1);
};

(async () => {
  if (command) {
    const commandModule = optionModules.find((module) => command === `--${module.name}`);

    if (commandModule) {
      const awaiting = commandModule.execute(params);

      if (!awaiting) {
        process.exit(0);
      } else if (awaiting instanceof Promise) {
        await awaiting;
        process.exit(0);
      }
    } else {
      quitOnError(`Неизвестная команда ${command}.
Чтобы прочитать правила использования приложения, наберите "--help"`);
    }
  } else {
    quitOnError(`Программа была запущена без параметров`);
  }
})().catch(quitOnError);


