'use strict';

const fs = require(`fs`);
const readline = require(`readline`);
const {promisify} = require(`util`);

const {generateOffers} = require(`./generator/offers-generator`);

const fileWriteOptions = {encoding: `utf-8`, mode: 0o644};

const access = promisify(fs.access);
const writeFile = promisify(fs.writeFile);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const ask = (prompt) => new Promise((resolve) => {
  rl.question(prompt, resolve);
});

const greetingQuestion = () => ask(`Привет пользователь! Сгенерировать данные? (y/n) \n`).then((answer) => {
  if (answer !== `y`) {
    return Promise.reject(`Пользователь отказался генерировать данные`);
  }

  return Promise.resolve();
});

const quantityQuestion = () => ask(`Сколько элементов требуется сгенерировать? \n`).then((quantity) => {
  if (isNaN(Number(quantity))) {
    return Promise.reject(`Ошибка: количество должно быть числом`);
  }

  return Promise.resolve(quantity);
});

const checkPathIsFree = (path) => access(path).then(() => false, () => true);

const pathQuestion = (quantity) => ask(`Введите путь до файла, в котором требуется сохранить данные \n`).then((path) => {
  const fullPath = `${process.cwd()}/${path}`;

  return checkPathIsFree(fullPath).then((pathIsFree) => ({fullPath, pathIsFree, quantity}));
});

const rewriteQuestion = (params) => ask(`Такой файл уже существует, перезаписать? (y/n) \n`).then((answer) => {
  if (answer !== `y`) {
    return Promise.reject(`Пользователь отказался перезаписывать файл`);
  }

  return params;
});

const saveFile = (path, quantity) => {
  return writeFile(path, JSON.stringify(generateOffers(quantity)), fileWriteOptions).then((err) => {
    if (err) {
      return Promise.reject(err);
    }

    return Promise.resolve();
  });
};

module.exports = {
  name: `generate`,
  description: `генерирует новую сущность и записывает в файл`,
  execute() {
    return greetingQuestion()
      .then(quantityQuestion)
      .then(pathQuestion)
      .then((params) => params.pathIsFree ? params : rewriteQuestion(params))
      .then(({fullPath, quantity}) => saveFile(fullPath, quantity))
      .then(() => console.log(`Файл успешно создан!`))
      .then(() => rl.close());
  }
};
