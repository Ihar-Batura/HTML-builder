const fs = require('fs');
const path = require('path');

fs.mkdir(path.join(__dirname, 'project-dist'), (err) => {
  if (err) console.log('folder project-dist already exist');
});
fs.mkdir(path.join(__dirname, 'project-dist', 'assets'), (err) => {
    if (err) console.log('folder project-dist/assets already exist');
  });

fs.writeFile(path.join(__dirname, 'project-dist', 'index.html'), '', (err) => {
    if (err) throw err;
  });

fs.writeFile(path.join(__dirname, 'project-dist', 'style.css'), '', (err) => {
  if (err) throw err;
});

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
