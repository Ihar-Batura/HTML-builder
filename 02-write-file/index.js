//Import all required modules.
const fs = require('fs');
const path = require('path');
const process = require('process');

//Creat a text file
fs.writeFile(path.join(__dirname, 'text.txt'), '', (err) => {
  if (err) {
    throw err;
  }
});

//Display a welcome message in the console.
process.stdout.write('Hi, \nCan you write something interesting\n');

//Wait for user input, write the entered text to the file.
process.stdin.on('data', (data) => {
  fs.appendFile(path.join(__dirname, 'text.txt'), data, (err) => {
    if (err) {
      throw err;
    }
  });
  //Checking for the presence of the keyword `exit`.
  if (data.toString().trim() === 'exit') {
    process.exit();
  }
});

//A farewell message when the process is stopped.
process.on('exit', () => console.log('Bye,bye \nSee you later!'));
process.on('SIGINT', () => {
  process.exit();
});
