const path = require('path');

const rootPath = path.normalize(`${__dirname}/..`);

const app = {
  rootPath,
  publicPath:`${rootPath}/public`,
  devPath: `${rootPath}/src`
};

const server = {
  development: {
    port: process.env.PORT || 8081,
    ip: '0.0.0.0'
  },
  production: {
    port: process.env.PORT,
    ip: '0.0.0.0'
  }
};

module.exports = {
  server,
  app
};
