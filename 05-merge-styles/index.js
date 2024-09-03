const fs = require('fs'); // Читать файлы / Создать файлы / Обновить файлы / Удалить файлы / Переименовать файлы
const path = require('path'); // предоставляет набор функций для работы с путями в файловой системе

fs.writeFile(
  path.join(__dirname, 'project-dist', 'bundle.css'),
  '',
  function (error) {
    if (error) {
      throw error;
    }
  },
);

fs.readdir(
  path.join(__dirname, 'styles'),
  { withFileTypes: true },
  function (error, files) {
    if (error) {
      return error;
    }
    files.forEach((file) => {
      if (file.isFile()) {
        if (file.name.split('.')[1] === 'css') {
          fs.readFile(
            path.join(__dirname, 'styles', file.name),
            'utf-8',
            function (error, data) {
              if (error) {
                throw error;
              }

              fs.writeFile(
                path.join(__dirname, 'project-dist/bundle.css'),
                data,
                { flag: 'a+' },
                function (error) {
                  if (error) {
                    throw error;
                  }
                },
              );
            },
          );
        }
      }
    });
  },
);

// fs.writeFile - создаем новый файл

// fs.readdir - читаем нужную нам папку

// path.extname(file) - метод для определения расширения файла (его заменил т.к еще нужно было проверить на файл или папка)

// { withFileTypes: true } - Это логическое значение, которое указывает, будут ли файлы возвращены как объекты fs.Dirent. Значение по умолчанию — «false».

// file.isFile() - проверяем это файл?

// file.name.split('.')[1] === 'css' - смотрим расширение файла

// fs.readFile - читаем каждый файл

// { flag: 'a+' } - флаг для fs.writeFile позволяет добавлять информацию в файл а не перезаписывать ее
