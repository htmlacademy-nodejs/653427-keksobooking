'use strict';

require(`colors`);

const packageInfo = require(`../package.json`);

const palette = [`red`, `green`, `blue`];

module.exports = {
  name: `version`,
  description: `показывает версию проекта`,
  execute() {
    console.log(`v${packageInfo.version.split(`.`).map((version, i) => version[palette[i]]).join(`.`)}`);
  }
};
