// ....
const appConfig = require('./config').app;

const production = process.env.NODE_ENV === 'production';

module.exports = app => {
  if (production) {
    app.get('/*', (request, response) => {
      response.sendFile(`${appConfig.publicPath}/index.html`);
    });
  } else {
    app.get('/*', (request, response) => {
      response.sendFile(`${appConfig.devPath}/index.html`);
    });
  }
};
