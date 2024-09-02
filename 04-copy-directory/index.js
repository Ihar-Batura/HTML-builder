const fs = require('fs'); // Читать файлы / Создать файлы / Обновить файлы / Удалить файлы / Переименовать файлы
const path = require('path'); // предоставляет набор функций для работы с путями в файловой системе

function copyDir() {
  fs.mkdir(
    path.join(__dirname, 'files-copy'),
    { recursive: true },
    function (error) {
      if (error) {
        throw error;
      }
    },
  );

  fs.readdir(path.join(__dirname, 'files'), function (error, files) {
    if (error) {
      throw error;
    }

    files.forEach((file) => {
      fs.copyFile(
        path.join(__dirname, 'files', file),
        path.join(__dirname, 'files-copy', file),
        function (error) {
          if (error) {
            throw error;
          }
        },
      );
    });
  });
}

copyDir();

// fs.mkdir - создает новую папку files-copy

// fs.readdir - метод для чтения содержимого папки используется

// { recursive: true } - для обхода ошибки если папка уже была создана

// fs.copyFile - используется для асинхронного копирования файла из исходного пути в целевой путь. По умолчанию Node.js перезапишет файл, если он уже существует в указанном месте назначения.
