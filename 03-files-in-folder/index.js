const fs = require('fs');
const path = require('path');

fs.readdir(
  path.join(__dirname, 'secret-folder'),
  { withFileTypes: true },
  (err, files) => {
    if (err) throw err;
    files.forEach((file) => {
      if (file.isFile()) {
        const fileArr = file.name.split('.');
        const name = fileArr[0];
        const type = fileArr[1];
        fs.stat(
          path.join(__dirname, 'secret-folder', file.name),
          (err, stats) => {
            console.log(`${name} - ${type} - ${stats.size}b`);
          },
        );
      }
    });
  },
);
