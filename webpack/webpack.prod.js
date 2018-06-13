const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const common = require('./webpack.common');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const webpackGlobConfig = require('./webpack.globs.js');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const theme = require(`${webpackGlobConfig.APP_DIR}/js/config/antOverride`); // eslint-disable-line

const prodConfig = merge(common, {
  mode: 'production',
  entry: ['whatwg-fetch', `${webpackGlobConfig.APP_DIR}/js/index.jsx`],
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(css)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader']
        })
      },
      {
        test: /\.(scss)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.(less)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            {
              loader: 'less-loader',
              options: {
                javascriptEnabled: true,
                modifyVars: theme
              }
            }
          ]
        })
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin([`${webpackGlobConfig.BUILD_DIR}/**/*`], {
      root: path.resolve(`${__dirname}/../..`)
    }),
    new HtmlWebpackPlugin({
      title: 'ENZA - Image Sorter',
      template: `${webpackGlobConfig.APP_DIR}/index.prod.html`,
      hash: true,
      minify: {
        collapseWhitespace: true
      }
    }),
    new CopyWebpackPlugin([
      {
        from: `${webpackGlobConfig.APP_DIR}/assets`,
        to: `${webpackGlobConfig.BUILD_DIR}/assets`
      }
    ]),
    new ExtractTextPlugin({
      filename: 'style.css'
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new BundleAnalyzerPlugin()
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  }
});

module.exports = prodConfig;
