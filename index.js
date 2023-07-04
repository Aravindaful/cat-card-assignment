const argv = require('minimist')(process.argv.slice(2));
const { App } = require('./app');
require('dotenv').config();
// Parsing command-line arguments
const { greeting, who, width, height, color, size, fileName } = argv;


// Creating an instance of the application and starting the merging process
const app = new App(greeting, who, width, height, color, size, fileName);
app.mergeAndSave()
  .then(() => console.log('Merge completed successfully.'))
  .catch((err) => console.error('Error while merging:', err));
