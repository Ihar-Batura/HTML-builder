const fs = require('fs');
const path = require('path');

// Создает папку project-dist
fs.mkdir(path.join(__dirname, 'project-dist'), (err) => {
  if (err) console.log('folder project-dist already exist');
});
// Создает папку assets
fs.mkdir(path.join(__dirname, 'project-dist', 'assets'), (err) => {
    if (err) console.log('folder project-dist/assets already exist');
  });
// Создает папку assets/fonts
fs.mkdir(path.join(__dirname, 'project-dist', 'assets', 'fonts'), (err) => {
    if (err) console.log('folder assets/fonts already exist');
  });
// Создает папку assets/img
fs.mkdir(path.join(__dirname, 'project-dist', 'assets', 'img'), (err) => {
    if (err) console.log('folder assets/img already exist');
  });
// Создает папку assets/svg
fs.mkdir(path.join(__dirname, 'project-dist', 'assets', 'svg'), (err) => {
    if (err) console.log('folder assets/svg already exist');
  });

//Создает файл index.html
fs.writeFile(path.join(__dirname, 'project-dist', 'index.html'), '', (err) => {
    if (err) throw err;
  });
//Создает файл style.css
fs.writeFile(path.join(__dirname, 'project-dist', 'style.css'), '', (err) => {
  if (err) throw err;
});
//Должен обьеденять все стили из разных файлов stales.css в один!
fs.readdir(path.join(__dirname, 'styles'), (err, files) => {
  if (err) throw err;
  for (let file of files) {
    //Перезаписывает только один файл, нужно допилить!
    fs.readFile(
      path.join(__dirname, 'styles', file),
      'utf-8',
      function (err, fileContent) {
        if (err) throw err;
        fs.writeFile(
          path.join(__dirname, 'project-dist', 'style.css'),
          fileContent,
          (err) => {
            if (err) throw err;
          },
        );
      },
    );
  }
});

//Удаляет файлы из папки fonts
fs.readdir(path.join(__dirname,'project-dist', 'assets', 'fonts'), (err, files) => {
    if (err) throw err;
    for (let file of files) {
      const link = path.join(__dirname, 'project-dist', 'assets', 'fonts', file);
      fs.unlink(link, (err) => {
        if (err) throw err;
      });
    }
  });
//Копирует файлы из папки fonts в project-dist/assets/fonts
  fs.readdir(path.join(__dirname, 'assets', 'fonts'), (err, files) => {
    if (err) throw err;
    for (let file of files) {
      const originalFile = path.join(__dirname, 'assets', 'fonts', file);
      const copyFile = path.join(__dirname, 'project-dist', 'assets', 'fonts', file);
      fs.copyFile(originalFile, copyFile, (err) => {
        if (err) throw err;
      });
    }
  });



