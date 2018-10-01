'use strict';

const packageInfo = require(`../package.json`);

module.exports = {
  name: `author`,
  description: `печатает автора проекта`,
  execute() {
    console.log(`${packageInfo.author}`);
  }
};
