const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const SimpleProgressPlugin = require("webpack-simple-progress-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const theme = require("./src/js/config/antOverride");

// console.log(theme);
module.exports = {
  entry: "./src/js/index.jsx",
  output: {
    // filename: "bundle.js",
    filename: "[name].[hash].js",
    path: path.resolve(__dirname, "dist")
  },
  mode: "production",
  devtool: "source-map",
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
          MiniCssExtractPlugin.loader,
          "css-loader"
        ]
      },
      {
        test: /\.(css|scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 2,
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
        test: /\.(css|less)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 2,
              sourceMap: true
            }
          },

          {
            loader: "less-loader",
            options: {
              sourceMap: true,
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
        use: ["file-loader"]
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
    new BundleAnalyzerPlugin(),
    new CopyWebpackPlugin([{ from: "src/assets", to: "assets" }]),
    // })
    new MiniCssExtractPlugin({
      filename: "style.css"
    })
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          chunks: "all"
         },
         styles: {
          name: 'styles',
          test: /\.(css|scss|less)$/,
          chunks: 'all',
          enforce: true
        }
      }
    },
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  stats: 'errors-only'

};
