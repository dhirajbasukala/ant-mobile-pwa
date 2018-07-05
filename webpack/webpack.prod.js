
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');

const PUBLIC_PATH = 'https://db-pwa.netlify.com';

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
        exclude: /\.module\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader']
        })
      },
      {
        test: /\.module\.css$/,
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
      title: 'ProQuote: A2',
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
      },
      {
        from: `${webpackGlobConfig.APP_DIR}/pwa`,
        to: `${webpackGlobConfig.BUILD_DIR}/`
      }
    ]),
    new ExtractTextPlugin({
      filename: 'style.css'
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    // new BundleAnalyzerPlugin(),
    new SWPrecacheWebpackPlugin({
      // By default, a cache-busting query parameter is appended to requests
      // used to populate the caches, to ensure the responses are fresh.
      // If a URL is already hashed by Webpack, then there is no concern
      // about it being stale, and the cache-busting can be skipped.
      cacheId: 'starlims',
      dontCacheBustUrlsMatching: /\.\w{8}\./,
      filename: 'service-worker.js',
      logger(message) {
        if (message.indexOf('Total precache size is') === 0) {
          // This message occurs for every build and is a bit too noisy.
        }
      },
      minify: false,
      navigateFallback: `${PUBLIC_PATH}`,
      staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/, /\.DS_Store/],
      stripPrefix: '/Volumes/Work stuff/dev/startlims/public/'
    })
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
  },
  stats: "errors-only"
});

module.exports = prodConfig;
