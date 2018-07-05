const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('../webpack/webpack.dev');

const middlewares = require('./middlewares');
const routes = require('./routes');

const compiler = webpack(webpackConfig);
const app = express();

app.use(
  webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    stats: 'minimal'
  })
);

app.use(webpackHotMiddleware(compiler));

middlewares(app);
routes(app);

module.exports = app;
