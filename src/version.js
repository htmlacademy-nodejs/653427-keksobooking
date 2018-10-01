'use strict';

const packageInfo = require(`../package.json`);

module.exports = {
  name: `version`,
  description: `показывает версию проекта`,
  execute() {
    console.log(`v${packageInfo.version}`);
  }
};
