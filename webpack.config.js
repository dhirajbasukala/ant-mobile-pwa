const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const SimpleProgressPlugin = require("webpack-simple-progress-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const theme = require('./src/js/config/antOverride');
// const Linter =  {
//   enforce: 'pre',
//   test: /\.jsx?$/,
//   exclude: ['node_modules'],
//   loader: 'eslint-loader'
// };

module.exports = {
  mode: "development",
  entry: [
    "react-hot-loader/patch",
    "webpack-dev-server/client?http://localhost:8081", // Setting the URL for the hot reload
    "webpack/hot/only-dev-server", // Reload only the dev server
    "./src/js/index.jsx"
  ],
  output: {
    // filename: "bundle.js",
    filename: "[name].[hash].js",
    path: path.resolve(__dirname, "dist")
  },
  devtool: "source-map",
  devServer: {
    contentBase: "./dist",
    historyApiFallback: true,
    compress: true,
    hot: true,
    inline: true,
    host: "0.0.0.0",
    port: "8081",
    stats: 'errors-only'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules\/(?!(auto-bind)\/).*/,
        loader: "babel-loader"
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            options: { sourceMap: true }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          },
          {
            loader: "less-loader",
            options: {
              javascriptEnabled: true,
              modifyVars: theme
            }
          }
        ]
      },
      {
        test: /\.(jpeg|bmp|png|svg|jpg|gif)$/,
        use: ["file-loader"]
      },
      {
        test: /\.(woff|woff2|ttf|eot|svg)(\?]?.*)?$/,
        loader: "url-loader"
      }
    ]
  },
  plugins: [
    new SimpleProgressPlugin(),
    new CleanWebpackPlugin(["dist"]),
    new HtmlWebpackPlugin({
      title: "Webpack 4 Development With hot module replacement",
      template: "src/index.html"
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new CopyWebpackPlugin([{ from: "src/assets", to: "assets" }])
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all"
        }
      }
    }
  },
  resolve: {
    extensions: [".js", ".jsx",".json"]
  }
};
