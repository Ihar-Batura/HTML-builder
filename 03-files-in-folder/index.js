const fs = require('fs'); // Читать файлы / Создать файлы / Обновить файлы / Удалить файлы / Переименовать файлы
const path = require('path'); // предоставляет набор функций для работы с путями в файловой системе

fs.readdir(
  path.join(__dirname, 'secret-folder'),
  { withFileTypes: true },
  (error, files) => {
    if (error) {
      throw error;
    }

    files.forEach((file) => {
      if (file.isFile()) {
        // если это файл то разбиваем его на массив имя-расширение файла
        const fileArr = file.name.split('.');

        fs.stat(
          path.join(__dirname, 'secret-folder', file.name),
          function (error, stats) {
            if (error) {
              throw error;
            }
            console.log(`${fileArr[0]} - ${fileArr[1]} - ${stats.size}b`);
          },
        );
      }
    });
  },
);

//fs.readdir - метод для чтения содержимого папки

// { withFileTypes: true } - Это логическое значение, которое указывает, будут ли файлы возвращены как объекты fs.Dirent. Значение по умолчанию — «false».

// fs.stat() используется для возврата информации о заданном файле или каталоге.
