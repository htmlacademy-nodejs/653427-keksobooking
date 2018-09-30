'use strict';

module.exports = {
  name: `help`,
  description: `Показывает доступные команды`,
  execute() {
    console.log(`Доступные команды:
--help    — печатает этот текст;
--author    — печатает автора проекта;
--license    — печатает информацию о лицензии;
--description    — печатает описание;
--version — печатает версию приложения;`);
  }
};
