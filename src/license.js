'use strict';

require(`colors`);

const packageInfo = require(`../package.json`);

module.exports = {
  name: `license`,
  description: `печатает информацию о лицензии`,
  execute() {
    console.log(`${packageInfo.license.magenta}`);
  }
};
