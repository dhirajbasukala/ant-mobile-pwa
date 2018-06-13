const path = require('path');

const BUILD_DIR = path.resolve(`${__dirname}/..`, 'dist');
const APP_DIR = path.resolve(`${__dirname}/..`, 'src');

module.exports = {
  BUILD_DIR,
  APP_DIR
};
