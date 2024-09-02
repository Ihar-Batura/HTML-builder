const fs = require('fs'); // Читать файлы / Создать файлы / Обновить файлы / Удалить файлы / Переименовать файлы
const path = require('path'); // предоставляет набор функций для работы с путями в файловой системе
const process = require('process'); // предоставляет информацию о текущем процессе Node.js и управляет им.

//создаем файл
fs.writeFile(path.join(__dirname, 'text.txt'), '', function (error) {
  if (error) {
    // если ошибка при создании файла
    return console.log(error);
  }
});

// fs.writeFile() - функция для асинхронной записи файла

//приветствие
process.stdout.write(
  'Hello my friend! \nCan you write something interesting?\n',
);

// process.stdout.write — функция низкого уровня, основанная на потоках Node.js и предоставляющая возможность тонкого контроля над выводом текста.

process.stdin.on('data', function (data) {
  fs.appendFile(
    path.join(__dirname, 'text.txt'),
    data,
    'utf-8',
    function (error) {
      if (error) {
        console.log(error);
      }
    },
  );

  // проверка на вводимое слово
  if (data.toString().trim() === 'exit') {
    process.exit();
  }
});

// process.stdin — это встроенный интерфейс прикладного программирования модуля процесса , который прослушивает пользовательский ввод. Свойство stdin объекта процесса — это читаемый поток. Он использует функцию on() для прослушивания события.

process.on('exit', () => console.log('Bye my friend, \nSee you soon...'));
process.on('SIGINT', () => {
  process.exit();
});

//process.on('SIGINT') - определяет нажатие Ctrl+C
//process.exit() - предписывает Node.js синхронно завершить процесс
