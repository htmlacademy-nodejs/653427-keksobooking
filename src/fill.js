'use strict';

const readline = require(`readline`);

const {generateOffers} = require(`./generator/offers-generator`);
const offersStore = require(`./offers/store`);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const ask = (prompt) => new Promise((resolve) => {
  rl.question(prompt, resolve);
});

const quantityQuestion = async () => {
  const quantity = await ask(`Сколько элементов требуется сгенерировать? \n`);

  if (isNaN(Number(quantity))) {
    throw new Error(`Ошибка: количество должно быть числом`);
  }

  return quantity;
};

module.exports = {
  name: `fill`,
  description: `генерирует новые сущности и записывает в базу данных`,
  async execute() {
    const quantity = await quantityQuestion();
    await offersStore.saveAllOffers(generateOffers(quantity));
    console.log(`Запись в базу данных произведена успешно`);
    rl.close();
  }
};
