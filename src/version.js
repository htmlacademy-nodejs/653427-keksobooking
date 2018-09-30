'use strict';

const packageInfo = require(`../package.json`);

module.exports = {
  name: `version`,
  description: `Показывает версию проекта`,
  execute() {
    console.log(`v${packageInfo.version}`);
  }
};
