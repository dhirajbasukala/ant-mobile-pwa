const SimpleProgressPlugin = require('simple-progress-webpack-plugin');
const webpackGlobConfig = require('./webpack.globs.js');
const path = require('path');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

const config = {
  output: {
    path: webpackGlobConfig.BUILD_DIR,
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js(x)?$/,
        include: [webpackGlobConfig.APP_DIR],
        exclude: [path.resolve(`${__dirname}/../..`, 'node_modules')],
        loader: 'babel-loader',
        options: {
          // This is a feature of `babel-loader` for webpack (not Babel itself).
          // It enables caching results in ./node_modules/.cache/babel-loader/
          // directory for faster rebuilds.
          cacheDirectory: true,
          presets: ['env', 'react']
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]?[hash]',
              outputPath: 'images/'
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|ttf|eot|jpe?g|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      }
    ]
  },
  context: __dirname,
  target: 'web',
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
  plugins: [
    new SimpleProgressPlugin(),
    // new FaviconsWebpackPlugin({
    //   logo: `${webpackGlobConfig.APP_DIR}/assets/images/logo.svg`,
    //   emitStats: false,
    //   icons: {
    //     android: false,
    //     appleIcon: false,
    //     appleStartup: false,
    //     coast: false,
    //     favicons: true,
    //     firefox: false,
    //     opengraph: false,
    //     twitter: false,
    //     yandex: false,
    //     windows: false
    //   }
    // })
  ]
};

module.exports = config;
