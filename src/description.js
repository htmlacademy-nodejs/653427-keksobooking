'use strict';

const packageInfo = require(`../package.json`);

module.exports = {
  name: `description`,
  description: `Печатает описание`,
  execute() {
    console.log(`${packageInfo.description}`);
  }
};
