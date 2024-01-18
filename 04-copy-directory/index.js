const fs = require('fs');
const path = require('path');

fs.mkdir(path.join(__dirname, 'files-copy'), (err) => {
  if (err) console.log('folder files-copy already exist');
});
fs.readdir(path.join(__dirname, 'files-copy'), (err, files) => {
  if (err) throw err;
  for (let file of files) {
    const link = path.join(__dirname, 'files-copy', file);
    fs.unlink(link, (err) => {
      if (err) throw err;
    });
  }
});

fs.readdir(path.join(__dirname, 'files'), (err, files) => {
  if (err) throw err;
  for (let file of files) {
    const originalFile = path.join(__dirname, 'files', file);
    const copyFile = path.join(__dirname, 'files-copy', file);
    fs.copyFile(originalFile, copyFile, (err) => {
      if (err) throw err;
    });
  }
});
