const path = require('path');

const BUILD_DIR = path.resolve(`${__dirname}/..`, 'public');
const APP_DIR = path.resolve(`${__dirname}/..`, 'src');

module.exports = {
  BUILD_DIR,
  APP_DIR
};
