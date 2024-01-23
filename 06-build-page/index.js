const fs = require('fs');
const path = require('path');

fs.mkdir(path.join(__dirname, 'project-dist'), (err) => {
  if (err) console.log('folder files-copy already exist');
});

fs.writeFile(path.join(__dirname, 'project-dist', 'style.css'), '', (err) => {
    if (err) throw err;
  });