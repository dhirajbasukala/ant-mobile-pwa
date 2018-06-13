const http = require('http');
const config = require('./config');
const express = require('express');

const middlewares = require('./middlewares');
const routes = require('./routes');

const serverConfig = config.server.production;
const app = express();
middlewares(app);
routes(app);

const server = {
  start: function start() {
    const httpServer = http.createServer(app);
    httpServer.listen(serverConfig.port, serverConfig.ip);
    console.log(`Server running at https://localhost:${serverConfig.port}`); // eslint-disable-line
  }
};

server.start();

