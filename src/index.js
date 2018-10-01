'use strict';

const version = require(`./version`);
const help = require(`./help`);
const author = require(`./author`);
const license = require(`./license`);
const description = require(`./description`);

const optionModules = [version, help, author, license, description];

const command = process.argv[2];

if (command === undefined) {
  console.log(
      `Привет пользователь!
Эта программа будет запускать сервер «Кексобукинг».
Автор: Арсений Никиточкин.`);
  process.exit(0);
}

const commandModule = optionModules.find((module) => command === `--${module.name}`);

if (commandModule) {
  commandModule.execute();
  process.exit(0);
} else {
  console.error(`Неизвестная команда ${command}.
Чтобы прочитать правила использования приложения, наберите "--help"`);
  process.exit(1);
}
