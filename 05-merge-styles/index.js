const fs = require('fs');
const path = require('path');

fs.writeFile(path.join(__dirname, 'project-dist', 'bundle.css'), '', (err) => {
  if (err) throw err;
});
fs.readdir(path.join(__dirname, 'styles'), (err, files) => {
    if (err) throw err;
    for (let file of files) {
        if (path.extname(file) === '.css') {
            fs.readFile(path.join(__dirname, 'styles', file), 'utf-8', function(err, fileContent) {
                if (err) throw err;
                fs.writeFile(path.join(__dirname, 'project-dist', 'bundle.css'), fileContent, (err) => {
                    if (err) throw err;
                })
            })
        }
    }
});