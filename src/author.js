'use strict';

const packageInfo = require(`../package.json`);

module.exports = {
  name: `author`,
  description: `Печатает автора проекта`,
  execute() {
    console.log(`${packageInfo.author}`);
  }
};
