'use strict';

require(`colors`);

const packageInfo = require(`../package.json`);

module.exports = {
  name: `description`,
  description: `печатает описание`,
  execute() {
    console.log(`${packageInfo.description.cyan}`);
  }
};
