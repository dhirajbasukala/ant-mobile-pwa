const http = require('http');
const config = require('./config');
const app = require('./server.dev.js');

const serverConfig = config.server.development;

const server = {
  start: function start() {
    const httpServer = http.createServer(app);
    httpServer.listen(serverConfig.port, serverConfig.ip);
    console.log(`Server running at https://localhost:${serverConfig.port}`); // eslint-disable-line
  }
};

server.start();