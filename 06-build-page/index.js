const fs = require('fs'); // Читать файлы / Создать файлы / Обновить файлы / Удалить файлы / Переименовать файлы
const path = require('path'); // предоставляет набор функций для работы с путями в файловой системе

fs.mkdir(
  path.join(__dirname, 'project-dist'),
  { recursive: true },
  function (error) {
    if (error) {
      throw error;
    }

    fs.copyFile(
      path.join(__dirname, 'template.html'),
      path.join(__dirname, 'project-dist', 'index.html'),
      function (error) {
        if (error) {
          return error;
        }
      },
    );
  },
);

fs.writeFile(
  path.join(__dirname, 'project-dist', 'style.css'),
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
                path.join(__dirname, 'project-dist/style.css'),
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

fs.mkdir(
  path.join(__dirname, 'project-dist', 'assets'),
  { recursive: true },
  (err) => {
    if (err) throw err;
  },
);

fs.readdir(
  path.join(__dirname, 'assets'),
  { withFileTypes: true },
  function (error, files) {
    if (error) {
      throw error;
    }
    files.forEach((file) => {
      if (!file.isFile()) {
        fs.readdir(
          path.join(__dirname, 'assets', file.name),
          function (error, filesInto) {
            if (error) {
              throw error;
            }

            fs.mkdir(
              path.join(__dirname, 'project-dist/assets', file.name),
              { recursive: true },
              (err) => {
                if (err) {
                  throw err;
                }
                filesInto.forEach((fileIn) => {
                  fs.copyFile(
                    path.join(__dirname, 'assets', file.name, fileIn),
                    path.join(
                      __dirname,
                      'project-dist/assets',
                      file.name,
                      fileIn,
                    ),
                    (err) => {
                      if (err) throw err;
                    },
                  );
                });
              },
            );
          },
        );
      } else {
        fs.copyFile(
          path.join(__dirname, 'assets', file.name),
          path.join(__dirname, 'project-dist/assets', file.name),
          function (error) {
            if (error) {
              throw error;
            }
          },
        );
      }
    });
  },
);
// { recursive: true } in fs.mkdir - не будет выкидывать ошибку если папка уже создана

// fs.copyFile - копируем файл в папку project-dist и работаем (изменяем) с ним

// fs.readFile - читаем файл template.html

// fs.readdir - читае модержимое папки components

// path.extname(file) - метод для определения расширения файла

//fs.readFile - читаем каждый файл в папке components и получаем содержимое

// const template = '{{' + file.split('.')[0] + '}}'; - получаем переменную что нужно заменить

// fileContent.toString().replace(change, code); - заменяем теги шаблона на код

// { withFileTypes: true } - Это логическое значение, которое указывает, будут ли файлы возвращены как объекты fs.Dirent. Значение по умолчанию — «false».

// file.isFile() - проверяем это файл?
