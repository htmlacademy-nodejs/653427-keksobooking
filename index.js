const Options = {
  VERSION: '--version',
  HELP: '--help'
};

const command = process.argv[2];

switch (command) {
  case Options.VERSION:
    console.log('v0.0.1');
    process.exit(0);
  case Options.HELP:
    console.log(`Доступные команды:
--help    — печатает этот текст;
--version — печатает версию приложения;`);
    process.exit(0);
  case undefined:
    console.log(
      `Привет пользователь!
Эта программа будет запускать сервер «Кексобукинг».
Автор: Арсений Никиточкин.`);
    process.exit(0);
  default:
    console.error(`Неизвестная команда ${command}.
Чтобы прочитать правила использования приложения, наберите "--help"`);
    process.exit(1);
}
