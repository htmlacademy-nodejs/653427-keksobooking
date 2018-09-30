'use strict';

const version = require(`./version`);
const help = require(`./help`);
const author = require(`./author`);
const license = require(`./license`);
const description = require(`./description`);

const Options = {
  VERSION: `--version`,
  HELP: `--help`,
  AUTHOR: `--author`,
  LICENSE: `--license`,
  DESCRIPTION: `--description`
};

const command = process.argv[2];

switch (command) {
  case Options.VERSION:
    version.execute();
    process.exit(0);
    break;
  case Options.HELP:
    help.execute();
    process.exit(0);
    break;
  case Options.AUTHOR:
    author.execute();
    process.exit(0);
    break;
  case Options.DESCRIPTION:
    description.execute();
    process.exit(0);
    break;
  case Options.LICENSE:
    license.execute();
    process.exit(0);
    break;
  case undefined:
    console.log(
        `Привет пользователь!
Эта программа будет запускать сервер «Кексобукинг».
Автор: Арсений Никиточкин.`);
    process.exit(0);
    break;
  default:
    console.error(`Неизвестная команда ${command}.
Чтобы прочитать правила использования приложения, наберите "--help"`);
    process.exit(1);
}
