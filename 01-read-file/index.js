const fs = require('fs');
const path = require('path');

const newStream = fs.createReadStream(
  path.join(__dirname, 'text.txt'),
  'utf-8',
);
newStream.on('data', (data) => console.log(data));
