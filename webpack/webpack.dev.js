const merge = require('webpack-merge');
const common = require('./webpack.common');
const webpack = require('webpack');
const webpackGlobConfig = require('./webpack.globs.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const eslintLoader = {
  enforce: 'pre',
  test: /\.jsx?$/,
  exclude: ['node_modules'],
  loader: 'eslint-loader'
};

const linter = process.env.LINTER === 'true' ? eslintLoader : {};
const theme = require(`${webpackGlobConfig.APP_DIR}/js/config/antOverride`); // eslint-disable-line

const devConfig = merge(common, {
  mode: 'development',
  entry: [
    'react-hot-loader/patch',
    'webpack-hot-middleware/client?reload=true',
    'whatwg-fetch',
    `${webpackGlobConfig.APP_DIR}/js/index.jsx`
  ],
  output: {
    pathinfo: false
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true,
              modifyVars: theme
            }
          }
        ]
      },
      linter
    ]
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    proxy: {
      '/api/*': 'http://127.0.0.1:8086',
      historyApiFallback: true
    },
    compress: true,
    historyApiFallback: true,
    hot: true,
    open: true,
    stats: "errors-only"
  },
  stats: 'errors-only',
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: 'PWA',
      template: `${webpackGlobConfig.APP_DIR}/index.html`,
      hash: true,
      minify: {
        collapseWhitespace: true
      },
      inject: false
    })
  ],
  optimization: {
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false
  }
});

module.exports = devConfig;
